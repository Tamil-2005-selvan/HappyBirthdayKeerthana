import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FinalConfessionProps {
  onNext: () => void;
}

export default function FinalConfession({ onNext }: FinalConfessionProps) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <motion.div
      className="romantic-screen"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Fireflies */}
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 6,
            height: 6,
            background: i % 2 === 0 ? "oklch(0.9 0.15 80)" : "oklch(0.8 0.2 330)",
            boxShadow:
              i % 2 === 0
                ? "0 0 12px oklch(0.9 0.15 80 / 80%)"
                : "0 0 12px oklch(0.8 0.2 330 / 60%)",
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 70, 0],
            y: [0, (Math.random() - 0.5) * 70, 0],
            opacity: [0.15, 1, 0.15],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Moon */}
      <div className="absolute top-10 right-10 pointer-events-none">
        <motion.div
          className="w-24 h-24 rounded-full"
          style={{
            background: "radial-gradient(circle, oklch(0.95 0.05 80), oklch(0.85 0.08 60))",
            boxShadow: "0 0 60px oklch(0.9 0.06 70 / 40%)",
          }}
          animate={{
            boxShadow: [
              "0 0 60px oklch(0.9 0.06 70 / 40%)",
              "0 0 100px oklch(0.9 0.06 70 / 60%)",
              "0 0 60px oklch(0.9 0.06 70 / 40%)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="z-10 flex flex-col items-center text-center px-4 gap-6 w-full max-w-sm mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {/* "And I Love You" headline */}
        <motion.h2
          className="font-display text-4xl md:text-6xl font-bold text-primary neon-text"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 120 }}
        >
          And I Love You ❤️
        </motion.h2>

        {/* Photo with namaste pose — the plea */}
        <motion.div
          className="relative"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 140, damping: 14 }}
        >
          {/* Glow ring behind photo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.72 0.25 330 / 40%), transparent 70%)",
              transform: "scale(1.3)",
            }}
            animate={{ opacity: [0.5, 1, 0.5], scale: [1.2, 1.4, 1.2] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />

          {/* Photo frame */}
          <div
            className="relative overflow-hidden"
            style={{
              width: 180,
              height: 220,
              borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
              border: "3px solid oklch(0.72 0.25 330 / 60%)",
              boxShadow:
                "0 0 30px oklch(0.72 0.25 330 / 40%), 0 0 80px oklch(0.72 0.25 330 / 20%)",
            }}
          >
            <img
              src="/photos/tamilselvan.jpg"
              alt="Tamilselvan"
              className="w-full h-full object-cover object-top"
              onLoad={() => setImgLoaded(true)}
            />

            {/* Shimmer overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, transparent 40%, oklch(1 0 0 / 15%) 50%, transparent 60%)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>

          {/* Floating hearts around photo */}
          {["-top-3 -right-2", "-top-1 -left-4", "-bottom-2 right-0"].map(
            (pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} text-lg pointer-events-none`}
                animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
              >
                ❤️
              </motion.div>
            )
          )}
        </motion.div>

        {/* Tamil plea text */}
        <AnimatePresence>
          {imgLoaded && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <motion.p
                className="font-handwriting text-3xl md:text-4xl text-muted-foreground leading-relaxed"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                ஒரே ஒரு வாய்ப்பு குடுங்க...
              </motion.p>
              <motion.p
                className="text-muted-foreground/60 text-sm mt-2 italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                "Give me just one chance..."
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback if image hasn't loaded yet */}
        {!imgLoaded && (
          <motion.p
            className="font-handwriting text-3xl md:text-4xl text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            ஒரே ஒரு வாய்ப்பு குடுங்க...
          </motion.p>
        )}

        {/* Continue button */}
        <motion.button
          onClick={onNext}
          className="mt-2 px-10 py-4 rounded-full font-display text-primary-foreground cursor-pointer"
          style={{
            background: "var(--gradient-neon)",
            boxShadow: "var(--glow-pink)",
          }}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          Continue ❤️
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
