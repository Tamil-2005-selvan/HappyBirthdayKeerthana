import { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Ctx = createContext<{ isAntiGravity: boolean; toggle: () => void }>({
  isAntiGravity: false, toggle: () => {}
});
export const useAntiGravity = () => useContext(Ctx);

export function AntiGravityProvider({ children, show }: { children: ReactNode; show: boolean }) {
  const [isAntiGravity, setIsAntiGravity] = useState(false);

  return (
    <Ctx.Provider value={{ isAntiGravity, toggle: () => setIsAntiGravity(v => !v) }}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.button
            className="fixed bottom-24 right-4 z-30 w-12 h-12 rounded-full flex items-center justify-center text-xl cursor-pointer select-none"
            style={{
              background: isAntiGravity
                ? "radial-gradient(circle, oklch(0.55 0.22 240), oklch(0.4 0.18 260))"
                : "var(--gradient-neon)",
              boxShadow: isAntiGravity ? "0 0 24px oklch(0.55 0.22 240 / 70%)" : "var(--glow-pink)",
            }}
            onClick={() => setIsAntiGravity(v => !v)}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isAntiGravity ? 180 : 0, y: isAntiGravity ? [0, -6, 0] : 0 }}
            transition={{ duration: 0.5 }}
            title={isAntiGravity ? "Restore Gravity 🌍" : "Anti-Gravity Mode 🚀"}
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
          >
            {isAntiGravity ? "🚀" : "🌍"}
          </motion.button>
        )}
      </AnimatePresence>
      {/* Tooltip */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed bottom-24 right-16 z-30 pointer-events-none"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 2 }}
          >
            <div className="glass px-3 py-1 text-xs text-muted-foreground whitespace-nowrap">
              {isAntiGravity ? "🚀 Anti-gravity ON!" : "Tap 🌍 for anti-gravity"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
