import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface EntryPortalProps {
  onEnter: () => void;
}

export default function EntryPortal({ onEnter }: EntryPortalProps) {
  const [burst, setBurst] = useState(false);

  const handleClick = () => {
    setBurst(true);
    setTimeout(onEnter, 900);
  };

  return (
    <motion.div
      className="romantic-screen stars-bg"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ scale: 1.3, opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Heart burst explosion on click */}
      <AnimatePresence>
        {burst && (
          <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center">
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * 360;
              const radius = 80 + Math.random() * 120;
              const rad = (angle * Math.PI) / 180;
              return (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{ left: "50%", top: "50%" }}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    x: Math.cos(rad) * radius,
                    y: Math.sin(rad) * radius,
                    opacity: [1, 1, 0],
                    scale: [0, 1.4, 0.8],
                    rotate: angle,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  {["❤️", "💖", "💕", "✨"][i % 4]}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {/* Moon (interactive — easter egg handles click in EasterEggs.tsx overlay) */}
      <div className="absolute top-12 right-8 md:right-20 z-10 pointer-events-none">
        <motion.div
          className="w-20 h-20 rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.95 0.05 80), oklch(0.85 0.08 60))",
            boxShadow:
              "0 0 40px oklch(0.9 0.06 70 / 50%), 0 0 100px oklch(0.9 0.06 70 / 20%)",
          }}
          animate={{ boxShadow: ["0 0 40px oklch(0.9 0.06 70 / 50%)", "0 0 70px oklch(0.9 0.06 70 / 70%)", "0 0 40px oklch(0.9 0.06 70 / 50%)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="text-center z-10"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.p
          className="font-handwriting text-2xl text-primary mb-2 neon-text"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          A Surprise Awaits...
        </motion.p>
        <p className="text-muted-foreground text-sm mb-12">
          for someone truly special
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        onClick={handleClick}
        className="relative z-10 px-12 py-5 rounded-full font-display text-xl font-bold text-primary-foreground cursor-pointer animate-float"
        style={{
          background: "var(--gradient-neon)",
          boxShadow: "var(--glow-pink)",
        }}
        whileHover={{
          scale: 1.08,
          boxShadow: "0 0 50px oklch(0.72 0.25 330 / 70%)",
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.6 }}
        disabled={burst}
      >
        Click Here ❤️
        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--gradient-neon)" }}
          animate={{ scale: [1, 1.4, 1.4], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        {/* Outer pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: "var(--gradient-neon)" }}
          animate={{ scale: [1, 1.7, 1.7], opacity: [0.3, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
      </motion.button>

      <motion.p
        className="text-muted-foreground/50 text-xs mt-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        ✨ Tap the stars & moon for secrets ✨
      </motion.p>
    </motion.div>
  );
}
