export interface NowPlaying {
  title: string;
  artist: string;
  album?: string;
  artwork?: string;
  startedAt: string;
}

export interface Show {
  id: string;
  title: string;
  host: string;
  description: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  isLive?: boolean;
}

type Track = Pick<NowPlaying, "title" | "artist" | "album">;

const MOCK_SHOWS: Show[] = [
  {
    id: "show_001",
    title: "DAWN PATROL",
    host: "Marcus Steel",
    description: "Industrial techno and dark ambient to start your day with purpose.",
    startTime: "06:00",
    endTime: "09:00",
    dayOfWeek: 1,
  },
  {
    id: "show_002",
    title: "CONCRETE JUNGLE",
    host: "Diesel",
    description: "Underground hip-hop, grime, and UK drill.",
    startTime: "12:00",
    endTime: "14:00",
    dayOfWeek: 1,
  },
  {
    id: "show_003",
    title: "AFTER HOURS",
    host: "Night Wolf",
    description: "Deep house and melodic techno for late night drives.",
    startTime: "22:00",
    endTime: "02:00",
    dayOfWeek: 1,
  },
  {
    id: "show_004",
    title: "RUSH HOUR",
    host: "DJ Chrome",
    description: "High-energy drum & bass and breakbeat.",
    startTime: "17:00",
    endTime: "19:00",
    dayOfWeek: 2,
  },
  {
    id: "show_005",
    title: "SUNDAY SERVICE",
    host: "Father Time",
    description: "Soul, jazz, and neo-soul for contemplation.",
    startTime: "10:00",
    endTime: "13:00",
    dayOfWeek: 0,
  },
];

const MOCK_TRACKS: Track[] = [
  { title: "Machine Dreams", artist: "Surgeon", album: "Breaking The Frame" },
  { title: "Street Philosophy", artist: "Skepta", album: "Konnichiwa" },
  { title: "Midnight Drive", artist: "Amelie Lens", album: "Contradiction" },
  { title: "Urban Decay", artist: "Ben Klock", album: "One" },
  { title: "Concrete Heart", artist: "Nina Kraviz", album: "RAW Convict" },
];

function getZonedParts(date = new Date(), timeZone = "Europe/London") {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    hour12: false,
  });

  const parts = fmt.formatToParts(date);
  const hh = Number(parts.find(p => p.type === "hour")?.value ?? "0");
  const mm = Number(parts.find(p => p.type === "minute")?.value ?? "0");
  const wdShort = (parts.find(p => p.type === "weekday")?.value ?? "Sun").slice(0, 3);

  const weekdayMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return { minutes: hh * 60 + mm, dayOfWeek: weekdayMap[wdShort] ?? 0 };
}

function hmToMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function isShowLiveAt(show: Show, dayOfWeek: number, minutes: number): boolean {
  const start = hmToMinutes(show.startTime);
  const end = hmToMinutes(show.endTime);
  const overnight = end <= start;

  if (!overnight) {
    return show.dayOfWeek === dayOfWeek && minutes >= start && minutes < end;
  }

  const sameDayLive = show.dayOfWeek === dayOfWeek && minutes >= start;
  const nextDay = (show.dayOfWeek + 1) % 7;
  const nextDayLive = nextDay === dayOfWeek && minutes < end;
  return sameDayLive || nextDayLive;
}

export async function getNowPlaying(timeZone = "Europe/London"): Promise<NowPlaying> {
  await new Promise(r => setTimeout(r, 100));

  const t = MOCK_TRACKS[Math.floor(Math.random() * MOCK_TRACKS.length)];

  const artwork =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'>
         <rect width='100%' height='100%' fill='black'/>
         <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
               font-family='sans-serif' font-size='18' fill='white'>
           ${t.artist} — ${t.title}
         </text>
       </svg>`
    );

  const startedAt = new Date(Date.now() - Math.floor(Math.random() * 180000)).toISOString();

  return { ...t, artwork, startedAt };
}

export function getSchedule(timeZone = "Europe/London"): Show[] {
  const { dayOfWeek, minutes } = getZonedParts(new Date(), timeZone);
  return MOCK_SHOWS.map(s => ({ ...s, isLive: isShowLiveAt(s, dayOfWeek, minutes) }));
}

export function getCurrentAndNextShow(timeZone = "Europe/London"): {
  current?: Show;
  next?: { show: Show; startsInMinutes: number };
} {
  const now = new Date();
  const { dayOfWeek, minutes } = getZonedParts(now, timeZone);

  const withWindows = MOCK_SHOWS.map(s => {
    const start = hmToMinutes(s.startTime);
    const end = hmToMinutes(s.endTime);
    const overnight = end <= start;

    const windows: Array<{ day: number; start: number; end: number }> = [];

    if (!overnight) {
      windows.push({ day: s.dayOfWeek, start, end });
    } else {
      windows.push({ day: s.dayOfWeek, start, end: 24 * 60 });
      windows.push({ day: (s.dayOfWeek + 1) % 7, start: 0, end });
    }
    return { show: s, windows };
  });

  let current: Show | undefined;
  for (const w of withWindows) {
    if (w.windows.some(win => win.day === dayOfWeek && minutes >= win.start && minutes < win.end)) {
      current = { ...w.show, isLive: true };
      break;
    }
  }

  let next: { show: Show; startsInMinutes: number } | undefined;
  for (let lookAhead = 0; lookAhead < 48 * 60; lookAhead++) {
    const futureMinutes = (minutes + lookAhead) % (24 * 60);
    const futureDay = (dayOfWeek + Math.floor((minutes + lookAhead) / (24 * 60))) % 7;

    for (const w of withWindows) {
      for (const win of w.windows) {
        if (win.day === futureDay && futureMinutes === win.start) {
          next = { show: { ...w.show, isLive: false }, startsInMinutes: lookAhead };
          break;
        }
      }
      if (next) break;
    }
    if (next) break;
  }

  return { current, next };
}

export const STREAM_URL = "https://ice1.somafm.com/groovesalad-128-mp3";
export const FALLBACK_STREAMS = [
  "https://ice1.somafm.com/groovesalad-128-mp3",
  "https://ice2.somafm.com/groovesalad-128-mp3",
  "https://ice6.somafm.com/groovesalad-128-mp3",
];

export async function tryPlayWithFailover(
  audio: HTMLAudioElement,
  urls: string[],
  timeoutMs = 4000
): Promise<string> {
  for (const url of urls) {
    try {
      audio.src = url;
      const playPromise = audio.play();

      if (playPromise) await playPromise;

      const ok = await new Promise<boolean>(resolve => {
        let done = false;
        const t = setTimeout(() => {
          if (!done) {
            done = true;
            resolve(false);
          }
        }, timeoutMs);
        audio.addEventListener(
          "canplay",
          () => {
            if (!done) {
              done = true;
              clearTimeout(t);
              resolve(true);
            }
          },
          { once: true }
        );
      });

      if (ok) return url;
    } catch {
      // try next
    }
  }
  throw new Error("All streams failed");
}
