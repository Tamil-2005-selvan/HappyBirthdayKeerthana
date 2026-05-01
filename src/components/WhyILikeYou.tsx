import { motion } from "framer-motion";
import { useState } from "react";

interface WhyILikeYouProps {
  onNext: () => void;
}

const reasons = [
  { front: "Your smile ❤️", back: "It lights up my whole world" },
  { front: "Your eyes ❤️", back: "I get lost in them every time" },
  { front: "Your attitude ❤️", back: "So bold, so beautiful" },
  { front: "Your voice ❤️", back: "Music to my ears" },
  { front: "Your kindness ❤️", back: "The purest heart I know" },
  { front: "Everything ❤️", back: "Every single thing about you" },
];

export default function WhyILikeYou({ onNext }: WhyILikeYouProps) {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <motion.div
      className="romantic-screen py-16"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2
        className="font-display text-2xl md:text-4xl text-primary neon-text text-center mb-10 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Why I Like You ❤️
      </motion.h2>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto px-4 z-10">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            className="cursor-pointer perspective-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            onClick={() => toggle(i)}
            style={{ perspective: "600px" }}
          >
            <motion.div
              className="glass p-6 text-center min-h-28 flex items-center justify-center"
              animate={{ rotateY: flipped.has(i) ? 180 : 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <p
                className="font-display text-sm md:text-base text-primary"
                style={{ backfaceVisibility: "hidden" }}
              >
                {flipped.has(i) ? r.back : r.front}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.p className="text-muted-foreground text-sm mt-6 z-10">
        Tap cards to flip ✨
      </motion.p>

      <motion.button
        onClick={onNext}
        className="mt-6 px-8 py-3 rounded-full font-display text-primary-foreground z-10 cursor-pointer"
        style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Next ❤️
      </motion.button>
    </motion.div>
  );
}
