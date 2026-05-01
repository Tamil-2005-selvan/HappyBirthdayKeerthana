import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface MusicMemoryProps {
  onNext: () => void;
}

// The Spotify track ID from the link the user provided
const TRACK_ID = "6CvW7N8JjBHmwEfGz2Yxhk";

const LYRICS_LINES = [
  {
    tamil: "ஓ... பக்கத்துல நான் படுக்க,",
    english: "Oh… as I lie beside you,",
  },
  {
    tamil: "வலி சொல்லாம ஓ...",
    english: "bearing the pain in silence…",
  },
  {
    tamil: "ரத்தத்துல பெத்தெடுக்க",
    english: "to bring life forth through my blood,",
  },
  {
    tamil: "விதி விடுமா?",
    english: "will destiny allow it?",
  },
];

export default function MusicMemory({ onNext }: MusicMemoryProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // Reveal lyrics one line at a time, in sync with the song playing
  useEffect(() => {
    const delays = [2000, 4500, 7000, 9500];
    const timers = delays.map((delay, i) =>
      setTimeout(() => setVisibleLines(i + 1), delay)
    );
    const buttonTimer = setTimeout(() => setShowButton(true), 12000);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <motion.div
      className="romantic-screen py-12"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Ambient sound-wave particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${i * 5}%`,
            bottom: "0",
            width: 3,
            background:
              i % 2 === 0
                ? "oklch(0.72 0.25 330 / 40%)"
                : "oklch(0.65 0.2 290 / 30%)",
            borderRadius: "2px 2px 0 0",
          }}
          animate={{
            height: [
              `${10 + Math.random() * 20}px`,
              `${40 + Math.random() * 80}px`,
              `${10 + Math.random() * 20}px`,
            ],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 0.8 + Math.random() * 0.6,
            repeat: Infinity,
            delay: Math.random() * 0.5,
          }}
        />
      ))}

      {/* Header */}
      <motion.h2
        className="font-display text-2xl md:text-3xl text-primary neon-text text-center mb-2 z-10 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Songs That Remind Me Of You ❤️
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-sm text-center mb-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Close your eyes and feel this song...
      </motion.p>

      {/* Spotify embed — auto-plays the specific track */}
      <motion.div
        className="z-10 w-full max-w-sm mx-auto px-4 mb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{ boxShadow: "0 0 30px oklch(0.72 0.25 330 / 30%)" }}
        >
          <iframe
            src={`https://open.spotify.com/embed/track/${TRACK_ID}?utm_source=generator&theme=0&autoplay=1`}
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="eager"
            style={{ borderRadius: "16px" }}
            title="Song for Keerthana"
          />
        </div>
      </motion.div>

      {/* Lyrics card */}
      <motion.div
        className="z-10 w-full max-w-sm mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div
          className="glass-strong p-6 rounded-2xl relative overflow-hidden"
          style={{
            border: "1px solid oklch(0.72 0.25 330 / 20%)",
          }}
        >
          {/* Musical note decoration */}
          <motion.div
            className="absolute top-3 right-4 text-2xl opacity-20 pointer-events-none"
            animate={{ rotate: [-5, 5, -5], y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🎵
          </motion.div>

          {/* Lyric label */}
          <p className="text-muted-foreground/60 text-xs uppercase tracking-widest mb-4">
            ♪ Lyrics
          </p>

          {/* Lines revealed one by one */}
          <div className="space-y-4">
            {LYRICS_LINES.map((line, i) => (
              <AnimatePresence key={i}>
                {visibleLines > i && (
                  <motion.div
                    initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    {/* Highlight current line */}
                    <motion.p
                      className="font-handwriting text-xl md:text-2xl leading-snug"
                      style={{
                        color:
                          visibleLines - 1 === i
                            ? "oklch(0.9 0.15 330)"
                            : "oklch(0.75 0.08 330)",
                      }}
                      animate={
                        visibleLines - 1 === i
                          ? { opacity: [0.8, 1, 0.8] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {line.tamil}
                    </motion.p>
                    <p className="text-muted-foreground/70 text-xs italic mt-0.5 pl-1">
                      {line.english}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>

          {/* Glimmer bar below lyrics */}
          {visibleLines > 0 && (
            <motion.div
              className="mt-5 h-px w-full rounded-full"
              style={{ background: "var(--gradient-neon)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3 }}
            />
          )}
        </div>
      </motion.div>

      {/* Continue button — appears after lyrics finish */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            onClick={onNext}
            className="mt-6 px-10 py-4 rounded-full font-display text-primary-foreground cursor-pointer z-10"
            style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring" }}
          >
            Continue ❤️
          </motion.button>
        )}
      </AnimatePresence>

      {/* Skip button — always visible */}
      <motion.button
        onClick={onNext}
        className="mt-3 text-muted-foreground/50 text-xs cursor-pointer bg-transparent border-none z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        whileHover={{ opacity: 1, scale: 1.02 }}
      >
        Skip →
      </motion.button>
    </motion.div>
  );
}
