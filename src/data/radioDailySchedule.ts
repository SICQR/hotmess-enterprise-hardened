/**
 * Simplified daily schedule for HOTMESS Radio. Each day has a list of
 * shows with start times. The Radio page can use this to render a
 * weekly timetable or current day lineup.
 */

export interface DailyShow {
  time: string;
  show: string;
}

export interface DaySchedule {
  day: string;
  lineup: DailyShow[];
}

export const radioDailySchedule: DaySchedule[] = [
  {
    day: "Monday",
    lineup: [
      { time: "08:00", show: "Wake the Mess" },
      { time: "12:00", show: "Dial‑A‑Daddy" },
      { time: "18:00", show: "Wake the Mess (Reprise)" },
    ],
  },
  {
    day: "Tuesday",
    lineup: [
      { time: "08:00", show: "Wake the Mess" },
      { time: "20:00", show: "Dial‑A‑Daddy" },
    ],
  },
  {
    day: "Wednesday",
    lineup: [
      { time: "08:00", show: "Wake the Mess" },
      { time: "15:00", show: "Dial‑A‑Daddy" },
    ],
  },
  {
    day: "Thursday",
    lineup: [
      { time: "08:00", show: "Wake the Mess" },
      { time: "19:00", show: "Dial‑A‑Daddy" },
    ],
  },
  {
    day: "Friday",
    lineup: [
      { time: "08:00", show: "Wake the Mess" },
      { time: "22:00", show: "Dial‑A‑Daddy" },
    ],
  },
  {
    day: "Saturday",
    lineup: [
      { time: "10:00", show: "Wake the Mess (Weekend Edition)" },
      { time: "20:00", show: "Live DJ Set" },
    ],
  },
  {
    day: "Sunday",
    lineup: [
      { time: "10:00", show: "Hand N Hand" },
      { time: "17:00", show: "Chillout Mix" },
    ],
  },
];
