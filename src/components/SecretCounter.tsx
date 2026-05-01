import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SecretCounterProps {
  onNext: () => void;
}

// Set a meaningful start date
const START_DATE = new Date("2024-01-01T00:00:00");

export default function SecretCounter({ onNext }: SecretCounterProps) {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = now.getTime() - START_DATE.getTime();
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTime({ days, hours, minutes, seconds });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <motion.div
      className="romantic-screen"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2
        className="font-display text-xl md:text-3xl text-primary neon-text text-center mb-4 z-10 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        I have been waiting for you for...
      </motion.h2>

      <div className="flex gap-3 md:gap-6 z-10 mt-6">
        {units.map((u, i) => (
          <motion.div
            key={u.label}
            className="glass-strong p-4 md:p-6 text-center min-w-16 md:min-w-24"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.15, type: "spring" }}
          >
            <motion.p
              className="font-display text-3xl md:text-5xl font-bold text-primary neon-text"
              key={u.value}
            >
              {u.value}
            </motion.p>
            <p className="text-muted-foreground text-xs md:text-sm mt-2">{u.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        className="font-handwriting text-lg text-muted-foreground mt-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        ...and I'd wait forever ❤️
      </motion.p>

      <motion.button
        onClick={onNext}
        className="mt-8 px-8 py-3 rounded-full font-display text-primary-foreground z-10 cursor-pointer"
        style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Continue ❤️
      </motion.button>
    </motion.div>
  );
}
