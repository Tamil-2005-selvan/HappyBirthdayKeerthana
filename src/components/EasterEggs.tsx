import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

const loveQuotes = [
  "You are my universe ❤️",
  "Every star reminds me of you ✨",
  "You make my heart sing 🎵",
  "My favorite person is you ❤️",
  "You are magic personified ✨",
  "Just thinking of you makes me smile ❤️",
  "You are the reason I believe in love 🌙",
  "Missing you is my constant state ❤️",
  "Your laugh is my favorite sound 💕",
  "You are my happy place ❤️",
];

const secretMessage =
  "You are the most beautiful surprise life ever gave me... even the stars envy your smile. 🌙❤️";

export default function EasterEggs() {
  const [starQuote, setStarQuote] = useState<string | null>(null);
  const [moonMsg, setMoonMsg] = useState(false);
  const [missYou, setMissYou] = useState(false);
  const [heartRain, setHeartRain] = useState(false);
  const [heartRainId, setHeartRainId] = useState(0);

  const lastTap = useRef(0);

  const handleScreenClick = useCallback(() => {
    const now = Date.now();
    if (now - lastTap.current < 350) {
      setMissYou(true);
      setTimeout(() => setMissYou(false), 2500);
    }
    lastTap.current = now;
  }, []);

  // Shake detection
  useEffect(() => {
    let lastX = 0,
      lastY = 0,
      lastZ = 0;
    let lastShake = 0;
    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const x = acc.x ?? 0,
        y = acc.y ?? 0,
        z = acc.z ?? 0;
      const delta =
        Math.abs(x - lastX) + Math.abs(y - lastY) + Math.abs(z - lastZ);
      lastX = x;
      lastY = y;
      lastZ = z;
      const now = Date.now();
      if (delta > 30 && now - lastShake > 2000) {
        lastShake = now;
        setHeartRain(true);
        setHeartRainId((id) => id + 1);
        setTimeout(() => setHeartRain(false), 3500);
      }
    };
    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  return (
    <>
      {/* Double-tap overlay */}
      <div
        className="fixed inset-0 z-0"
        onClick={handleScreenClick}
        style={{ pointerEvents: "all", background: "transparent" }}
      />

      {/* Interactive stars */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.button
          key={`easter-star-${i}`}
          className="fixed bg-transparent border-none cursor-pointer z-20 text-lg leading-none p-1"
          style={{
            left: `${5 + i * 9.5}%`,
            top: `${6 + (i % 4) * 15}%`,
            filter: "drop-shadow(0 0 6px oklch(0.9 0.15 330))",
          }}
          onClick={(e) => {
            e.stopPropagation();
            const q = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
            setStarQuote(q);
            setTimeout(() => setStarQuote(null), 2500);
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            delay: i * 0.25,
          }}
        >
          ✦
        </motion.button>
      ))}

      {/* Interactive moon */}
      <motion.button
        className="fixed top-10 right-6 md:right-16 bg-transparent border-none cursor-pointer z-20"
        style={{ width: 64, height: 64 }}
        onClick={(e) => {
          e.stopPropagation();
          setMoonMsg(true);
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.95 0.05 80), oklch(0.85 0.08 60))",
            boxShadow:
              "0 0 40px oklch(0.9 0.06 70 / 50%), 0 0 100px oklch(0.9 0.06 70 / 20%)",
          }}
        />
      </motion.button>

      {/* Star quote popup */}
      <AnimatePresence>
        {starQuote && (
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 glass-strong px-6 py-4 max-w-xs text-center pointer-events-none"
            style={{ transform: "translate(-50%, -50%)" }}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring" }}
          >
            <p className="font-handwriting text-lg text-primary neon-text">
              {starQuote}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Moon secret message modal */}
      <AnimatePresence>
        {moonMsg && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: "oklch(0 0 0 / 65%)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMoonMsg(false)}
          >
            <motion.div
              className="glass-strong p-8 max-w-sm text-center"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5 }}
              transition={{ type: "spring" }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌙
              </motion.div>
              <p className="font-handwriting text-xl text-primary neon-text leading-relaxed">
                {secretMessage}
              </p>
              <p className="text-muted-foreground text-xs mt-6">
                Tap outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "I miss you" toast */}
      <AnimatePresence>
        {missYou && (
          <motion.div
            className="fixed bottom-16 left-1/2 z-50 glass-strong px-8 py-3 pointer-events-none"
            style={{ transform: "translateX(-50%)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
          >
            <p className="font-handwriting text-lg text-primary neon-text">
              I miss you ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart rain (shake) */}
      <AnimatePresence>
        {heartRain && (
          <div
            key={heartRainId}
            className="fixed inset-0 z-40 pointer-events-none overflow-hidden"
          >
            {Array.from({ length: 35 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl select-none"
                style={{ left: `${Math.random() * 100}%`, top: "-5%" }}
                initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                animate={{
                  y: "115vh",
                  opacity: [1, 1, 0],
                  rotate: (Math.random() - 0.5) * 360,
                  scale: [1, 1.3, 0.8],
                }}
                transition={{
                  duration: 2 + Math.random() * 1.5,
                  delay: Math.random() * 0.8,
                  ease: "easeIn",
                }}
              >
                {["❤️", "💕", "💖", "💗", "💓"][i % 5]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
