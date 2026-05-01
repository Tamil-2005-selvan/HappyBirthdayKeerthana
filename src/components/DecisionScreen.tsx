import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";

interface DecisionScreenProps {
  onYes: () => void;
}

const noMessages = [
  "Sure ah? 😌",
  "Think once again ❤️",
  "I can wait ❤️",
  "Please don't break my heart 😌",
  "One more chance? 🥺",
];

export default function DecisionScreen({ onYes }: DecisionScreenProps) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [noSize, setNoSize] = useState(1);
  const [yesSize, setYesSize] = useState(1);
  const [hideNo, setHideNo] = useState(false);

  const moveNo = useCallback(() => {
    setNoPos({
      x: (Math.random() - 0.5) * 260,
      y: (Math.random() - 0.5) * 260,
    });
  }, []);

  const handleNo = useCallback(() => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    setYesSize((s) => s + 0.18);
    setNoSize((s) => Math.max(0.4, s - 0.1));

    if (newCount >= 5) {
      setHideNo(true);
      return;
    }

    moveNo();
  }, [noCount, moveNo]);

  return (
    <motion.div
      className="romantic-screen"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Floating hearts background */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-xl pointer-events-none"
          style={{ left: `${10 + i * 11}%`, bottom: "-5%" }}
          animate={{ y: [0, -window.innerHeight - 50], opacity: [0, 1, 0] }}
          transition={{
            duration: 6 + i,
            delay: i * 0.8,
            repeat: Infinity,
          }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.h2
        className="font-display text-2xl md:text-4xl text-primary neon-text text-center mb-4 z-10 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        So... what do you say? ❤️
      </motion.h2>

      <AnimatePresence mode="wait">
        {noCount > 0 && noCount < 5 && (
          <motion.p
            key={noCount}
            className="text-primary font-handwriting text-xl z-10 mb-6 neon-text text-center"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring" }}
          >
            {noMessages[noCount - 1]}
          </motion.p>
        )}
      </AnimatePresence>

      <div
        className="flex gap-8 items-center z-10 relative"
        style={{ minHeight: "140px" }}
      >
        {/* YES button — grows bigger */}
        <motion.button
          onClick={onYes}
          className="px-10 py-4 rounded-full font-display text-xl font-bold text-primary-foreground cursor-pointer"
          style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
          animate={{
            scale: yesSize,
            boxShadow: [
              "var(--glow-pink)",
              "0 0 50px oklch(0.72 0.25 330 / 70%)",
              "var(--glow-pink)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: yesSize + 0.12 }}
          whileTap={{ scale: yesSize - 0.05 }}
        >
          YES ❤️
        </motion.button>

        {/* NO button — runs away */}
        {!hideNo && (
          <motion.button
            onClick={handleNo}
            onHoverStart={moveNo}
            className="px-8 py-3 rounded-full font-display text-lg glass cursor-pointer text-muted-foreground"
            animate={{
              x: noPos.x,
              y: noPos.y,
              scale: noSize,
            }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
            whileTap={{ scale: noSize - 0.05 }}
          >
            NO 💔
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {hideNo && (
          <motion.div
            className="text-center z-10 mt-6"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <p className="text-primary font-handwriting text-xl neon-text">
              Smart choice 😉❤️
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              I knew you would say yes 💖
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
