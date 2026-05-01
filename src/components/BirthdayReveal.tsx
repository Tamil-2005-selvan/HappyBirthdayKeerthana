import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface BirthdayRevealProps {
  onComplete: () => void;
}

const quotes = [
  "Your smile is dangerous ❤️",
  "You changed my world ❤️",
  "My favorite notification is you ❤️",
  "You make my heart skip a beat ❤️",
  "Life is better with you in it ❤️",
  "You're my favorite thought ❤️",
  "Even my dreams know you ❤️",
  "You're irreplaceable ❤️",
];

const title = "Happy 21st Birthday Keerthana Shree ❤️";

// Candle component with animated flame
function Candle({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
    >
      {/* Flame */}
      <motion.div
        className="relative w-3 h-5 mb-0"
        animate={{
          scaleX: [1, 0.8, 1.1, 0.9, 1],
          scaleY: [1, 1.1, 0.95, 1.05, 1],
          rotate: [-1, 1, -2, 1, -1],
        }}
        transition={{ duration: 1.2, repeat: Infinity, delay: delay * 0.5 }}
      >
        {/* Inner flame */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "8px",
            height: "16px",
            background: "radial-gradient(ellipse at 50% 80%, oklch(0.95 0.2 60), oklch(0.85 0.3 40), oklch(0.7 0.35 30))",
            borderRadius: "50% 50% 20% 20%",
            boxShadow: "0 0 8px oklch(0.9 0.3 50 / 80%), 0 0 16px oklch(0.85 0.2 40 / 50%)",
          }}
        />
        {/* Outer glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            width: "12px",
            height: "20px",
            background: "radial-gradient(ellipse, oklch(0.9 0.2 60 / 30%), transparent 70%)",
            borderRadius: "50% 50% 20% 20%",
          }}
        />
      </motion.div>

      {/* Wick */}
      <div
        style={{ width: "2px", height: "4px", background: "oklch(0.3 0 0)" }}
      />

      {/* Candle body */}
      <div
        style={{
          width: "10px",
          height: "28px",
          background: "linear-gradient(180deg, oklch(0.95 0.05 60), oklch(0.85 0.08 55))",
          borderRadius: "2px 2px 1px 1px",
          boxShadow: `0 0 8px oklch(0.9 0.2 50 / 40%), inset -2px 0 4px oklch(0.7 0.1 50 / 20%)`,
        }}
      />

      {/* Wax drip glow */}
      <motion.div
        style={{
          width: "14px",
          height: "4px",
          background: "oklch(0.9 0.25 330 / 30%)",
          borderRadius: "50%",
          boxShadow: `0 0 6px oklch(0.72 0.25 330 / 40%)`,
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay }}
      />
    </motion.div>
  );
}

export default function BirthdayReveal({ onComplete }: BirthdayRevealProps) {
  const [phase, setPhase] = useState<"title" | "candles" | "countdown">("title");
  const [countdown, setCountdown] = useState(20);
  const [quoteIdx, setQuoteIdx] = useState(0);

  // Stable petal data
  const petals = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 5 + Math.random() * 5,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 80,
        emoji: i % 3 === 0 ? "🌸" : i % 3 === 1 ? "🌹" : "🌺",
      })),
    []
  );

  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 2 + Math.random() * 2,
        delay: Math.random() * 3,
      })),
    []
  );

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("candles"), 5000);
    const t2 = setTimeout(() => setPhase("countdown"), 10000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown <= 0) {
      onComplete();
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, countdown, onComplete]);

  useEffect(() => {
    if (phase !== "countdown") return;
    const t = setInterval(() => setQuoteIdx((i) => (i + 1) % quotes.length), 3000);
    return () => clearInterval(t);
  }, [phase]);

  return (
    <motion.div
      className="romantic-screen"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Floating rose petals — always present */}
      {petals.map((p) => (
        <motion.div
          key={`petal-${p.id}`}
          className="absolute pointer-events-none text-xl select-none"
          style={{ left: `${p.left}%`, top: "-5%" }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, p.drift],
            rotate: [p.rotate, p.rotate + 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Sparkle particles */}
      {sparkles.map((s) => (
        <motion.div
          key={`spark-${s.id}`}
          className="absolute text-xs pointer-events-none"
          style={{ left: `${s.left}%`, top: `${s.top}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
        >
          ✨
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {phase === "title" && (
          <motion.div
            key="title"
            className="text-center z-10 px-4"
            exit={{ opacity: 0, y: -30 }}
          >
            <motion.h1 className="font-display text-3xl md:text-5xl font-bold neon-text text-primary leading-tight mb-6">
              {title.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="font-handwriting text-xl md:text-2xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
            >
              You are the most beautiful chapter of my life.
            </motion.p>
          </motion.div>
        )}

        {phase === "candles" && (
          <motion.div
            key="candles"
            className="z-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="font-display text-xl text-primary mb-6 neon-text">
              21 Candles for You 🕯️
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-xs md:max-w-sm mx-auto px-4">
              {Array.from({ length: 21 }).map((_, i) => (
                <Candle key={i} delay={i * 0.12} />
              ))}
            </div>
            <motion.p
              className="font-handwriting text-lg text-muted-foreground mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
            >
              Make a wish... 🌙
            </motion.p>
          </motion.div>
        )}

        {phase === "countdown" && (
          <motion.div
            key="countdown"
            className="z-10 text-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="text-7xl md:text-9xl font-display font-bold neon-text text-primary mb-6"
              key={countdown}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring" }}
            >
              {countdown}
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.p
                key={quoteIdx}
                className="font-handwriting text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {quotes[quoteIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
