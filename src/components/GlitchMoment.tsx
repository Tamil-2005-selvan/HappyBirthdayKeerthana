import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface GlitchMomentProps {
  onRecover: () => void;
}

const hackerLines = [
  "SCANNING... beauty_level.exe",
  "WARNING: cuteness overflow detected",
  "ERROR CODE: 0x00FF_BEAUTY_OVERFLOW",
  "SYSTEM: cannot compute...",
  "ABORT? [Y/N]: N",
  "OVERLOADING emotional_module...",
  "FATAL: heart.exe has stopped responding",
  "REBOOTING... with more love ❤️",
];

export default function GlitchMoment({ onRecover }: GlitchMomentProps) {
  const [phase, setPhase] = useState<"glitch" | "hacker" | "error" | "recover">("glitch");
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hacker"), 1200);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "hacker") return;
    const interval = setInterval(() => {
      setVisibleLines((n) => {
        if (n >= hackerLines.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("error"), 600);
          return n;
        }
        return n + 1;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "error") return;
    const t = setTimeout(() => setPhase("recover"), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <motion.div
      className="romantic-screen"
      style={{
        background: phase === "glitch" || phase === "hacker" ? "#000" : "var(--gradient-romantic)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* RGB scanlines */}
      {(phase === "glitch" || phase === "hacker") && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0 0 0 / 30%) 3px)",
            backgroundSize: "100% 4px",
          }}
        />
      )}

      <AnimatePresence mode="wait">
        {phase === "glitch" && (
          <motion.div
            key="glitch"
            className="text-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              animate={{
                x: [0, -6, 6, -4, 4, 0],
                filter: [
                  "none",
                  "drop-shadow(4px 0 oklch(0.7 0.3 0)) drop-shadow(-4px 0 oklch(0.5 0.3 240))",
                  "none",
                  "drop-shadow(-3px 0 oklch(0.7 0.3 120)) drop-shadow(3px 0 oklch(0.5 0.3 300))",
                  "none",
                ],
              }}
              transition={{ duration: 0.3, repeat: Infinity }}
            >
              <p className="font-mono text-4xl md:text-6xl text-red-500 font-bold mb-4">
                ERROR...
              </p>
            </motion.div>
            <motion.p
              className="font-mono text-sm text-red-400/70"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.4, repeat: Infinity }}
            >
              SYSTEM MALFUNCTION
            </motion.p>
          </motion.div>
        )}

        {phase === "hacker" && (
          <motion.div
            key="hacker"
            className="z-10 w-full max-w-sm md:max-w-md mx-auto px-4 font-mono text-sm text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="glass p-6 text-left" style={{ background: "oklch(0.05 0.02 150 / 80%)" }}>
              <p className="text-green-300 mb-3">$ sudo analyze --target keerthana_shree</p>
              {hackerLines.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={i}
                  className={`mb-1 ${i >= hackerLines.length - 2 ? "text-yellow-400" : "text-green-400"}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line}
                </motion.p>
              ))}
              {visibleLines < hackerLines.length && (
                <motion.span
                  className="inline-block w-2 h-4 bg-green-400"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>
        )}

        {phase === "error" && (
          <motion.div
            key="error"
            className="text-center z-10 px-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring" }}
          >
            <motion.p
              className="font-display text-3xl md:text-5xl text-primary neon-text mb-4"
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Too Much Beauty Detected ❤️
            </motion.p>
            <p className="font-mono text-sm text-muted-foreground">
              System cannot handle this level of cuteness
            </p>
            <p className="font-mono text-xs text-muted-foreground/60 mt-2">
              Initiating emergency recovery protocol...
            </p>
          </motion.div>
        )}

        {phase === "recover" && (
          <motion.div
            key="recover"
            className="text-center z-10 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" }}
          >
            <motion.div
              className="text-5xl mb-6"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💖
            </motion.div>
            <p className="text-muted-foreground mb-6 font-display text-lg">
              System recovering... with extra love
            </p>
            <motion.button
              onClick={onRecover}
              className="px-10 py-4 rounded-full font-display text-xl text-primary-foreground cursor-pointer"
              style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["var(--glow-pink)", "0 0 50px oklch(0.72 0.25 330 / 70%)", "var(--glow-pink)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to Recover ❤️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
