import { useState, useRef, useEffect } from "react";
import {
  PlayCircle,
  PauseCircle,
  SpeakerHigh,
  SpeakerSlash,
  WifiHigh,
  WifiSlash,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { getNowPlaying, type NowPlaying, FALLBACK_STREAMS } from "@/lib/radio";
import { toast } from "sonner";

interface RadioPlayerProps {
  compact?: boolean;
}

export function RadioPlayer({ compact = false }: RadioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [muted, setMuted] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bufferHealth, setBufferHealth] = useState(100);
  const [currentStreamIndex, setCurrentStreamIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reconnectTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    updateNowPlaying();
    const interval = setInterval(updateNowPlaying, 15000);
    return () => {
      clearInterval(interval);
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume / 100;
    }
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setLoading(false);
      setConnected(true);
    };

    const handleWaiting = () => {
      setLoading(true);
      setBufferHealth((prev) => Math.max(0, prev - 10));
    };

    const handlePlaying = () => {
      setLoading(false);
      setBufferHealth(100);
    };

    const handleError = () => {
      setConnected(false);
      setLoading(false);
      if (playing) {
        handleStreamError();
      }
    };

    const handleStalled = () => {
      setBufferHealth((prev) => Math.max(0, prev - 20));
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("error", handleError);
    audio.addEventListener("stalled", handleStalled);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("stalled", handleStalled);
    };
  }, [playing]);

  async function updateNowPlaying() {
    const data = await getNowPlaying();
    setNowPlaying(data);
  }

  const handleStreamError = () => {
    const nextIndex = (currentStreamIndex + 1) % FALLBACK_STREAMS.length;

    if (nextIndex === 0) {
      toast.error("Stream unavailable", {
        description:
          "Unable to connect to radio stream. Please try again later.",
      });
      setPlaying(false);
      return;
    }

    setCurrentStreamIndex(nextIndex);

    reconnectTimeoutRef.current = window.setTimeout(() => {
      if (audioRef.current && playing) {
        audioRef.current.load();
        audioRef.current.play().catch(() => {
          handleStreamError();
        });
      }
    }, 1000);
  };

  const togglePlay = async () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      setConnected(false);
    } else {
      setLoading(true);
      try {
        await audioRef.current.play();
        setPlaying(true);
        toast.success("Connected to live stream", {
          description: "Now playing HOTMESS Radio",
        });
      } catch (err) {
        console.error("Playback failed:", err);
        setLoading(false);
        toast.error("Playback failed", {
          description: "Unable to start stream. Check your connection.",
        });
      }
    }
  };

  const toggleMute = () => {
    setMuted(!muted);
    if (muted) {
      toast.success("Unmuted");
    }
  };

  if (compact) {
    return (
      <div
        className="flex items-center gap-4 bg-card border border-border p-4"
        role="region"
        aria-label="Radio player compact"
      >
        <Button
          onClick={togglePlay}
          variant="ghost"
          size="icon"
          className="text-accent relative"
          disabled={loading}
          aria-label={playing ? "Pause radio stream" : "Play radio stream"}
          aria-pressed={playing}
        >
          {loading ? (
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"
              aria-hidden="true"
            />
          ) : playing ? (
            <PauseCircle size={32} weight="fill" aria-hidden="true" />
          ) : (
            <PlayCircle size={32} weight="fill" aria-hidden="true" />
          )}
        </Button>
        <div className="flex-1 min-w-0" aria-live="polite" aria-atomic="true">
          <div className="text-sm font-bold truncate">
            {nowPlaying?.title || "Loading..."}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {nowPlaying?.artist || "..."}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {connected ? (
            <WifiHigh
              size={16}
              className="text-accent"
              aria-label="Connected"
            />
          ) : playing ? (
            <WifiSlash
              size={16}
              className="text-destructive"
              aria-label="Disconnected"
            />
          ) : null}
          <Badge
            variant="outline"
            className="border-accent text-accent"
            aria-label="Live broadcast"
          >
            LIVE
          </Badge>
        </div>
        <audio
          ref={audioRef}
          src={FALLBACK_STREAMS[currentStreamIndex]}
          preload="none"
          aria-label="Radio stream audio"
        />
      </div>
    );
  }

  return (
    <div
      className="bg-card border-2 border-accent p-8"
      role="region"
      aria-label="Radio player"
    >
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-shrink-0 relative">
          {nowPlaying?.artwork && (
            <div className="relative">
              <img
                src={nowPlaying.artwork}
                alt={`Album artwork for ${nowPlaying.title || "current track"}`}
                className={`w-48 h-48 object-cover border-2 border-paper transition-transform duration-300 ${
                  playing ? "animate-pulse" : ""
                }`}
              />
              {playing && (
                <div
                  className="absolute inset-0 border-2 border-accent animate-ping opacity-75"
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </div>

        <div className="flex-1 w-full space-y-6">
          <div aria-live="polite" aria-atomic="true">
            <div className="flex items-center gap-2 mb-2">
              <Badge
                className="bg-accent text-accent-foreground animate-pulse"
                aria-label="Currently live"
              >
                LIVE NOW
              </Badge>
              {connected && (
                <Badge variant="outline" className="border-accent text-accent">
                  <WifiHigh size={14} className="mr-1" aria-hidden="true" />
                  CONNECTED
                </Badge>
              )}
              {loading && (
                <Badge
                  variant="outline"
                  className="border-muted-foreground text-muted-foreground"
                >
                  BUFFERING...
                </Badge>
              )}
            </div>
            <h2 className="text-3xl font-bold mb-1">
              {nowPlaying?.title || "Loading..."}
            </h2>
            <p className="text-xl text-muted-foreground">
              {nowPlaying?.artist || "..."}
            </p>
            {nowPlaying?.album && (
              <p className="text-sm text-muted-foreground mt-1">
                {nowPlaying.album}
              </p>
            )}
          </div>

          {playing && (
            <div
              className="space-y-2"
              role="status"
              aria-label="Stream quality indicator"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Stream Quality</span>
                <span>{bufferHealth}%</span>
              </div>
              <div
                className="w-full h-1 bg-border overflow-hidden"
                aria-hidden="true"
              >
                <div
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${bufferHealth}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-6">
            <Button
              onClick={togglePlay}
              size="lg"
              disabled={loading}
              className="w-16 h-16 bg-accent hover:bg-accent/90 text-accent-foreground p-0 transition-transform hover:scale-105"
              aria-label={playing ? "Pause radio stream" : "Play radio stream"}
              aria-pressed={playing}
            >
              {loading ? (
                <div
                  className="animate-spin rounded-full h-10 w-10 border-b-2 border-accent-foreground"
                  aria-hidden="true"
                />
              ) : playing ? (
                <PauseCircle size={40} weight="fill" aria-hidden="true" />
              ) : (
                <PlayCircle size={40} weight="fill" aria-hidden="true" />
              )}
            </Button>

            <div className="flex-1 flex items-center gap-4">
              <Button
                onClick={toggleMute}
                variant="ghost"
                size="icon"
                className="transition-colors hover:text-accent"
                aria-label={muted ? "Unmute audio" : "Mute audio"}
                aria-pressed={muted}
              >
                {muted ? (
                  <SpeakerSlash size={24} aria-hidden="true" />
                ) : (
                  <SpeakerHigh size={24} aria-hidden="true" />
                )}
              </Button>
              <Slider
                value={[muted ? 0 : volume]}
                onValueChange={(v) => setVolume(v[0])}
                max={100}
                step={1}
                className="flex-1"
                disabled={loading}
                aria-label="Volume control"
              />
              <span
                className="text-sm text-muted-foreground w-10 text-right"
                aria-label={`Volume: ${muted ? 0 : volume} percent`}
              >
                {muted ? 0 : volume}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={FALLBACK_STREAMS[currentStreamIndex]}
        preload="none"
        aria-label="Radio stream audio"
      />
    </div>
  );
}
