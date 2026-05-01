import { motion } from "framer-motion";
import { useState } from "react";

interface LoveQuizProps {
  onNext: () => void;
}

export default function LoveQuiz({ onNext }: LoveQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const options = ["Smile", "Eyes", "Voice", "Everything"];

  const handleSelect = (opt: string) => {
    setSelected(opt);
    setTimeout(() => setShowResult(true), 500);
  };

  return (
    <motion.div
      className="romantic-screen"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {!showResult ? (
        <div className="z-10 text-center px-4 w-full max-w-sm">
          <motion.h2
            className="font-display text-xl md:text-3xl text-primary neon-text mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Love Quiz ❤️
          </motion.h2>
          <p className="text-muted-foreground mb-8">
            What is my favorite thing about you?
          </p>
          <div className="flex flex-col gap-3">
            {options.map((opt, i) => (
              <motion.button
                key={opt}
                className={`glass p-4 text-left cursor-pointer font-display text-lg transition-all ${
                  selected === opt ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleSelect(opt)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {opt} {opt === "Everything" ? "💖" : ""}
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          className="z-10 text-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring" }}
        >
          {selected === "Everything" ? (
            <>
              <div className="text-6xl mb-4">🎉</div>
              <p className="font-display text-2xl text-primary neon-text mb-2">Correct!</p>
              <p className="text-muted-foreground">I love EVERYTHING about you ❤️</p>
              {/* Heart explosion */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 300,
                    y: (Math.random() - 0.5) * 300,
                    opacity: 0,
                    scale: 0,
                  }}
                  transition={{ duration: 1.5, delay: Math.random() * 0.3 }}
                >
                  ❤️
                </motion.div>
              ))}
            </>
          ) : (
            <>
              <p className="font-display text-2xl text-primary neon-text mb-2">Close!</p>
              <p className="text-muted-foreground">
                The answer is... <strong>Everything</strong> ❤️
              </p>
            </>
          )}
          <motion.button
            onClick={onNext}
            className="mt-8 px-8 py-3 rounded-full font-display text-primary-foreground cursor-pointer"
            style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Continue ❤️
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
