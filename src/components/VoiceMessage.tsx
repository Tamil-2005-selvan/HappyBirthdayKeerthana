import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface VoiceMessageProps {
  onNext: () => void;
}

export default function VoiceMessage({ onNext }: VoiceMessageProps) {
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bars] = useState(() =>
    Array.from({ length: 40 }, () => 0.2 + Math.random() * 0.8)
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const animFrameRef = useRef<number>(0);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const onLoaded = () => setDuration(audio.duration);
    const onEnded = () => { setIsPlaying(false); setProgress(0); };
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
    };
  }, [audioUrl]);

  useEffect(() => {
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      className="romantic-screen"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Ambient particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-lg pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {["🎵", "🎶", "♪", "♫"][i % 4]}
        </motion.div>
      ))}

      <motion.h2
        className="font-display text-2xl md:text-4xl text-primary neon-text text-center mb-3 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Play My Heart ❤️
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-sm text-center mb-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        A voice message just for you
      </motion.p>

      <div className="z-10 w-full max-w-sm mx-auto px-4">
        <AnimatePresence mode="wait">
          {!audioUrl ? (
            <motion.div
              key="upload"
              className="glass p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎙️
              </motion.div>
              <p className="font-display text-lg text-primary mb-2">
                Upload Voice Message
              </p>
              <p className="text-muted-foreground text-sm mb-6">
                Record a voice note and upload it here
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleFile}
              />
              <motion.button
                onClick={() => fileRef.current?.click()}
                className="px-8 py-3 rounded-full font-display text-primary-foreground cursor-pointer"
                style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Choose Audio File
              </motion.button>

              <div className="mt-4">
                <motion.button
                  onClick={onNext}
                  className="text-muted-foreground text-sm underline cursor-pointer bg-transparent border-none"
                  whileHover={{ scale: 1.02 }}
                >
                  Skip for now
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="player"
              className="glass-strong p-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              {/* Hidden audio element */}
              <audio ref={audioRef} src={audioUrl} />

              {/* Waveform visualization */}
              <div className="flex items-center justify-center gap-0.5 h-16 mb-6">
                {bars.map((height, i) => {
                  const isActive = i / bars.length <= progress;
                  const isAnimating = isPlaying && Math.abs(i / bars.length - progress) < 0.15;
                  return (
                    <motion.div
                      key={i}
                      className="rounded-full w-1"
                      style={{
                        background: isActive
                          ? "var(--gradient-neon)"
                          : "oklch(0.4 0.08 320 / 40%)",
                        minHeight: "4px",
                      }}
                      animate={{
                        height: isAnimating
                          ? [
                              `${height * 40}px`,
                              `${height * 60}px`,
                              `${height * 30}px`,
                            ]
                          : `${height * 40}px`,
                      }}
                      transition={
                        isAnimating
                          ? { duration: 0.3, repeat: Infinity, delay: i * 0.02 }
                          : { duration: 0.2 }
                      }
                    />
                  );
                })}
              </div>

              {/* Progress bar */}
              <div
                className="w-full h-1 rounded-full mb-2 overflow-hidden cursor-pointer"
                style={{ background: "oklch(0.3 0.05 300 / 50%)" }}
                onClick={(e) => {
                  if (!audioRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const ratio = (e.clientX - rect.left) / rect.width;
                  audioRef.current.currentTime = ratio * audioRef.current.duration;
                  setProgress(ratio);
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-neon)", width: `${progress * 100}%` }}
                />
              </div>

              {/* Time display */}
              <div className="flex justify-between text-xs text-muted-foreground mb-6">
                <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Play / Pause button */}
              <div className="flex items-center justify-center gap-4">
                <motion.button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl cursor-pointer"
                  style={{
                    background: "var(--gradient-neon)",
                    boxShadow: "var(--glow-pink)",
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={isPlaying ? { boxShadow: ["var(--glow-pink)", "0 0 40px oklch(0.72 0.25 330 / 80%)", "var(--glow-pink)"] } : {}}
                  transition={isPlaying ? { duration: 1.5, repeat: Infinity } : {}}
                >
                  {isPlaying ? "⏸️" : "▶️"}
                </motion.button>
              </div>

              <motion.p
                className="font-handwriting text-center text-muted-foreground mt-4 text-sm"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {isPlaying ? "Listening to my heart... ❤️" : "Press play ❤️"}
              </motion.p>

              <div className="flex gap-3 mt-6">
                <motion.button
                  onClick={() => { setAudioUrl(null); setIsPlaying(false); }}
                  className="py-2 px-4 rounded-full glass cursor-pointer text-muted-foreground text-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Change
                </motion.button>
                <motion.button
                  onClick={onNext}
                  className="flex-1 py-3 rounded-full font-display text-primary-foreground text-sm cursor-pointer"
                  style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue ❤️
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
