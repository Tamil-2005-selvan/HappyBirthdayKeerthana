import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 700);
          return 100;
        }
        return p + Math.random() * 3 + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  // Generate stable particle data
  const particles = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 2 + Math.random() * 4,
        delay: Math.random() * 4,
        color: i % 3 === 0 ? "oklch(0.72 0.25 330)" : i % 3 === 1 ? "oklch(0.65 0.2 290)" : "oklch(0.85 0.1 350)",
      })),
    []
  );

  return (
    <motion.div
      className="romantic-screen"
      style={{ background: "var(--gradient-romantic)" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Ambient particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
            y: [0, -30, 0],
            x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}

      {/* Floating hearts around the center */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`preheart-${i}`}
          className="absolute text-lg pointer-events-none"
          style={{
            left: `${20 + i * 8}%`,
            bottom: `${15 + (i % 3) * 10}%`,
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0, 0.7, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.6,
          }}
        >
          {i % 2 === 0 ? "❤️" : "✨"}
        </motion.div>
      ))}

      {/* Heartbeat icon */}
      <motion.div
        className="text-6xl mb-8 animate-heartbeat z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
      >
        ❤️
      </motion.div>

      <motion.p
        className="font-display text-xl md:text-2xl text-center text-primary mb-8 neon-text z-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Something Special is Loading for
        <br />
        <span className="text-2xl md:text-3xl font-bold">Keerthana Shree</span>{" "}
        ❤️
      </motion.p>

      {/* Progress bar */}
      <div className="w-64 h-1.5 rounded-full overflow-hidden glass mb-4 z-10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: "var(--gradient-neon)" }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <motion.p
        className="text-muted-foreground text-sm font-body z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {Math.min(Math.floor(progress), 100)}%
      </motion.p>

      {/* Orbiting hearts */}
      <motion.div
        className="absolute w-40 h-40 pointer-events-none z-5"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {[0, 120, 240].map((deg) => (
          <motion.div
            key={deg}
            className="absolute text-sm"
            style={{
              top: "50%",
              left: "50%",
              transformOrigin: "0 0",
              transform: `rotate(${deg}deg) translateX(70px) rotate(-${deg}deg)`,
            }}
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: deg / 360 }}
          >
            💖
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
