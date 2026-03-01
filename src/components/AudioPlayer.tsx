import { useTTS } from "@/hooks/useTTS";
import { Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  text: string;
  label?: string;
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const speeds = [1, 1.25, 1.5];

const AudioPlayer = ({ text, label = "Ouvir" }: AudioPlayerProps) => {
  const { isPlaying, progress, currentTime, duration, rate, togglePlay, stop, changeRate, isSupported } = useTTS({
    text,
  });

  if (!isSupported) return null;

  return (
    <div className="bg-secondary/50 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground flex items-center gap-2">
          🎧 {label}
        </p>
        <div className="flex items-center gap-1">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => changeRate(s)}
              className={`text-xs px-2 py-1 rounded-lg transition-colors ${
                rate === s
                  ? "bg-gold/20 text-gold font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gold h-full rounded-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-gold/10 hover:bg-gold/20 text-gold"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>
          {(isPlaying || progress > 0) && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
              onClick={stop}
            >
              <Square className="w-4 h-4" />
            </Button>
          )}
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
    </div>
  );
};

export default AudioPlayer;
