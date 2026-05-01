import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

export default function YesScreen() {
  const [phase, setPhase] = useState<"celebrate" | "share" | "contact">(
    "celebrate"
  );

  const whatsappMessage = encodeURIComponent(
    "Yes… I like you too ❤️\n\n✨ I just experienced the most beautiful birthday surprise ever!\nYou are truly something special 🌙"
  );
  const whatsappUrl = `https://wa.me/?text=${whatsappMessage}`;

  // Generate stable confetti data
  const confetti = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        angle: (i / 50) * 360,
        radius: 80 + Math.random() * 200,
        emoji: ["❤️", "🎉", "✨", "💖", "🎊", "💕", "🌸", "⭐"][i % 8],
        duration: 2 + Math.random() * 1.5,
        delay: Math.random() * 0.8,
      })),
    []
  );

  // Firework sparks
  const fireworks = useMemo(
    () =>
      Array.from({ length: 6 }, (_, fi) => ({
        id: fi,
        cx: 20 + fi * 12,
        cy: 15 + (fi % 3) * 20,
        sparks: Array.from({ length: 8 }, (_, si) => ({
          id: si,
          angle: (si / 8) * 360,
          color:
            fi % 2 === 0
              ? "oklch(0.72 0.25 330)"
              : "oklch(0.75 0.2 60)",
        })),
      })),
    []
  );

  return (
    <motion.div
      className="romantic-screen"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Fireworks */}
      {fireworks.map((fw) =>
        fw.sparks.map((spark) => {
          const rad = (spark.angle * Math.PI) / 180;
          return (
            <motion.div
              key={`fw-${fw.id}-${spark.id}`}
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
              style={{
                left: `${fw.cx}%`,
                top: `${fw.cy}%`,
                background: spark.color,
                boxShadow: `0 0 6px ${spark.color}`,
              }}
              animate={{
                x: [0, Math.cos(rad) * 60, Math.cos(rad) * 80],
                y: [0, Math.sin(rad) * 60, Math.sin(rad) * 80 + 40],
                opacity: [1, 1, 0],
                scale: [1.5, 1, 0],
              }}
              transition={{
                duration: 1.2,
                delay: fw.id * 0.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />
          );
        })
      )}

      {/* Confetti explosion */}
      {phase === "celebrate" &&
        confetti.map((c) => {
          const rad = (c.angle * Math.PI) / 180;
          return (
            <motion.div
              key={c.id}
              className="absolute text-xl pointer-events-none"
              style={{ left: "50%", top: "50%" }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{
                x: Math.cos(rad) * c.radius,
                y: Math.sin(rad) * c.radius,
                opacity: [1, 1, 0],
                scale: [0, 1.3, 0.7],
                rotate: c.angle,
              }}
              transition={{ duration: c.duration, delay: c.delay }}
            >
              {c.emoji}
            </motion.div>
          );
        })}

      <AnimatePresence mode="wait">
        {phase === "celebrate" && (
          <motion.div
            key="celebrate"
            className="z-10 text-center px-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <motion.div
              className="text-6xl mb-6 animate-heartbeat"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ❤️
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-5xl text-primary neon-text mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              You made my life beautiful ❤️
            </motion.h2>
            <p className="font-handwriting text-xl text-muted-foreground mb-8">
              This is the best day of my life...
            </p>
            <motion.button
              onClick={() => setPhase("share")}
              className="px-8 py-3 rounded-full font-display text-primary-foreground cursor-pointer"
              style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Share Your Answer ❤️
            </motion.button>
          </motion.div>
        )}

        {phase === "share" && (
          <motion.div
            key="share"
            className="z-10 text-center px-4 w-full max-w-sm mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <h3 className="font-display text-2xl text-primary neon-text mb-6">
              Send via WhatsApp ❤️
            </h3>

            {/* WhatsApp preview card */}
            <motion.div
              className="glass-strong p-5 mb-6 text-left"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center"
                  style={{ background: "var(--gradient-neon)" }}
                >
                  <span className="text-xl">❤️</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-sm text-primary truncate">
                    Birthday Surprise for Keerthana ✨
                  </p>
                  <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                    Yes… I like you too ❤️
                  </p>
                  <p className="text-muted-foreground/60 text-xs mt-1">
                    ✨ The most beautiful birthday surprise ever!
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-full font-display text-lg cursor-pointer flex items-center justify-center gap-3"
              style={{
                background: "linear-gradient(135deg, oklch(0.55 0.18 155), oklch(0.45 0.15 155))",
                boxShadow: "0 0 20px oklch(0.55 0.18 155 / 40%)",
                color: "oklch(0.98 0.01 0)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="text-2xl">💚</span>
              Open WhatsApp
            </motion.a>

            <motion.button
              onClick={() => setPhase("contact")}
              className="mt-4 text-muted-foreground text-sm underline cursor-pointer bg-transparent border-none"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Or use other ways to connect ❤️
            </motion.button>
          </motion.div>
        )}

        {phase === "contact" && (
          <motion.div
            key="contact"
            className="z-10 text-center w-full max-w-sm mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="font-display text-2xl text-primary neon-text mb-8">
              Let's Connect ❤️
            </h3>
            <div className="flex flex-col gap-4">
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl">💚</span>
                <div className="text-left">
                  <span className="font-display text-lg text-foreground block">WhatsApp</span>
                  <span className="text-muted-foreground text-xs">Pre-filled love message</span>
                </div>
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="glass px-8 py-4 flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl">📸</span>
                <div className="text-left">
                  <span className="font-display text-lg text-foreground block">Instagram</span>
                  <span className="text-muted-foreground text-xs">Send a DM</span>
                </div>
              </motion.a>
              <motion.a
                href="mailto:?subject=My%20answer%20for%20your%20love%20%E2%9D%A4%EF%B8%8F&body=Yes%E2%80%A6%20I%20like%20you%20too%20%E2%9D%A4%EF%B8%8F"
                className="glass px-8 py-4 flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl">📧</span>
                <div className="text-left">
                  <span className="font-display text-lg text-foreground block">Gmail</span>
                  <span className="text-muted-foreground text-xs">My answer for your love ❤️</span>
                </div>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final message — always visible */}
      <motion.div
        className="absolute bottom-6 z-10 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <p className="text-muted-foreground text-sm">
          No matter what your answer is…
          <br />
          You will always be special in my life ❤️
        </p>
        <motion.p
          className="text-muted-foreground/50 text-xs mt-3 animate-heartbeat"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Made with love by Tamilselvan ❤️
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
