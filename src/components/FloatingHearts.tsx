import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAntiGravity } from "./AntiGravityContext";

export default function FloatingHearts({ count = 15 }: { count?: number }) {
  const { isAntiGravity } = useAntiGravity();

  const hearts = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 20,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      opacity: 0.15 + Math.random() * 0.4,
      emoji: ["❤️", "💖", "💕", "💗"][i % 4],
      drift: (Math.random() - 0.5) * 40,
    })),
    [count]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map(h => (
        <motion.div
          key={`${h.id}-${isAntiGravity}`}
          className="absolute"
          style={{
            left: `${h.left}%`,
            fontSize: h.size,
            opacity: h.opacity,
            [isAntiGravity ? "top" : "bottom"]: isAntiGravity ? "110%" : "-10%",
          }}
          animate={{
            y: isAntiGravity ? [0, -(window.innerHeight + 200)] : [0, -(window.innerHeight + 200)],
            x: [0, h.drift, 0],
            rotate: isAntiGravity ? [0, 360] : [0, -20, 20, 0],
            scale: isAntiGravity ? [1, 2, 0] : [1, 1.1, 1],
          }}
          transition={{
            duration: isAntiGravity ? h.duration * 0.5 : h.duration,
            delay: h.delay * (isAntiGravity ? 0.3 : 1),
            repeat: Infinity,
            ease: isAntiGravity ? "easeIn" : "easeInOut",
          }}
        >
          {isAntiGravity ? "🚀" : h.emoji}
        </motion.div>
      ))}
    </div>
  );
}
