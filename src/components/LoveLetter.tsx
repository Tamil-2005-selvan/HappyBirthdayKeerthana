import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface LoveLetterProps {
  onNext: () => void;
}

const letterLines = [
  "Keerthi,",
  "",
  "எனக்கு உன்ன மட்டும் ரொம்ப பிடிக்கும்...",
  "",
  "உன்ன பார்க்கும் போது வந்த அந்த feeling...",
  "வேற எந்த பொண்ண பார்த்தாலும் வரல...",
  "",
  "உனக்காக நான் இன்னும் எவ்வளவு நாளானாலும்",
  "wait பண்ணுவேன்...",
  "",
  "இப்போ சொல்லு...",
  "உனக்கும் என்ன பிடிச்சிருக்கா? ❤️",
];

export default function LoveLetter({ onNext }: LoveLetterProps) {
  const [opened, setOpened] = useState(false);
  const [showButton, setShowButton] = useState(false);

  return (
    <motion.div
      className="romantic-screen py-12"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Ambient ink drops */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-sm pointer-events-none opacity-30"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
          animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          ✒️
        </motion.div>
      ))}

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.div
            key="gift"
            className="text-center z-10 cursor-pointer"
            onClick={() => setOpened(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{
                y: [0, -12, 0],
                rotate: [-3, 3, -3],
              }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              🎁
            </motion.div>
            <p className="font-display text-2xl text-primary neon-text">
              OPEN 🎁
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              Tap to open your special letter
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            className="z-10 w-full max-w-md mx-auto px-4"
            initial={{ scale: 0, rotateX: 90, y: 50 }}
            animate={{ scale: 1, rotateX: 0, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            {/* Paper */}
            <div
              className="p-6 md:p-8 rounded-2xl relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, oklch(0.94 0.04 65), oklch(0.89 0.05 55), oklch(0.92 0.03 60))",
                boxShadow:
                  "0 20px 60px oklch(0 0 0 / 50%), inset 0 1px 0 oklch(1 0 0 / 50%)",
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              {/* Paper lines */}
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 29px, oklch(0.4 0.05 250 / 40%) 30px)",
                  backgroundOrigin: "content-box",
                  paddingTop: "10px",
                }}
              />

              {/* Red margin line */}
              <div
                className="absolute left-12 top-0 bottom-0 w-px opacity-20"
                style={{ background: "oklch(0.6 0.3 20)" }}
              />

              {/* Letter content — line by line animation */}
              <div className="relative pl-4">
                {letterLines.map((line, i) => (
                  <motion.p
                    key={i}
                    className="font-handwriting text-lg md:text-xl mb-1 leading-relaxed"
                    style={{ color: "oklch(0.2 0.06 300)" }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.25 }}
                    onAnimationComplete={() => {
                      if (i === letterLines.length - 1) {
                        setTimeout(() => setShowButton(true), 500);
                      }
                    }}
                  >
                    {line || "\u00A0"}
                  </motion.p>
                ))}
              </div>

              {/* Ink stamp */}
              <motion.div
                className="text-right mt-4"
                initial={{ opacity: 0, rotate: -15, scale: 0 }}
                animate={{ opacity: 0.6, rotate: -15, scale: 1 }}
                transition={{ delay: letterLines.length * 0.25 + 0.5 }}
              >
                <span className="text-3xl">💌</span>
              </motion.div>
            </div>

            <AnimatePresence>
              {showButton && (
                <motion.button
                  onClick={onNext}
                  className="mt-6 px-8 py-3 rounded-full font-display text-primary-foreground cursor-pointer mx-auto block"
                  style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring" }}
                >
                  Continue ❤️
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
