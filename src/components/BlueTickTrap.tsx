import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface BlueTickTrapProps { onNext: () => void; }

const REACTIONS = [
  { text: "...", delay: 0 },
  { text: "Hello?? 👀", delay: 1800 },
  { text: "I can see you've seen this... 👀", delay: 3800 },
  { text: "The double tick betrayed you 😅", delay: 5600 },
  { text: "Okay I'll wait... ⏰", delay: 7200 },
  { text: "*taps fingers on table* 😐", delay: 9000 },
  { text: "Keerthana?? 🥺", delay: 10800 },
  { text: "Fine. FINE. 😤❤️", delay: 12400 },
];

export default function BlueTickTrap({ onNext }: BlueTickTrapProps) {
  const [visible, setVisible] = useState(0);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    setShowStatus(true);
    const timers = REACTIONS.map((r, i) =>
      setTimeout(() => setVisible(i + 1), r.delay + 800)
    );
    const end = setTimeout(onNext, 15000);
    return () => { timers.forEach(clearTimeout); clearTimeout(end); };
  }, [onNext]);

  return (
    <motion.div
      className="romantic-screen py-12"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* WhatsApp-style chat header */}
      <motion.div
        className="z-10 w-full max-w-xs mx-auto glass-strong rounded-2xl overflow-hidden mb-4"
        initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <div className="px-4 py-3 flex items-center gap-3" style={{ background: "oklch(0.12 0.03 150 / 80%)" }}>
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/40">
            <img src="/photos/tamilselvan.jpg" className="w-full h-full object-cover object-top" alt="" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-display text-foreground">Tamilselvan ❤️</p>
            <motion.p className="text-xs text-green-400"
              animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              Online
            </motion.p>
          </div>
          <span className="text-muted-foreground text-xs">WhatsApp</span>
        </div>
      </motion.div>

      {/* Chat bubbles */}
      <div className="z-10 w-full max-w-xs mx-auto px-4 space-y-2 flex flex-col">
        {/* Sent message — the love letter */}
        <motion.div className="self-end max-w-[80%]"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="px-4 py-2 rounded-2xl rounded-br-sm text-sm text-white"
            style={{ background: "oklch(0.35 0.15 150)" }}>
            <p>Keerthana... nee en life la miga important person ❤️</p>
            <div className="flex items-center gap-1 justify-end mt-1">
              <span className="text-xs opacity-60">9:41 PM</span>
              {/* Blue ticks */}
              <AnimatePresence>
                {showStatus && (
                  <motion.span className="text-xs text-blue-400 font-bold"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                    ✓✓
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Seen indicator */}
        <AnimatePresence>
          {showStatus && (
            <motion.p className="self-end text-xs text-blue-400/70 pr-1"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              Seen ✓✓ 9:42 PM
            </motion.p>
          )}
        </AnimatePresence>

        {/* Reaction bubbles from "me" */}
        {REACTIONS.slice(0, visible).map((r, i) => (
          <motion.div key={i} className="self-end max-w-[80%]"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring" }}>
            <div className="px-4 py-2 rounded-2xl rounded-br-sm text-sm text-white"
              style={{ background: i === REACTIONS.length - 1 ? "oklch(0.55 0.25 330)" : "oklch(0.35 0.15 150)" }}>
              {r.text}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {visible < REACTIONS.length && visible > 0 && (
          <motion.div className="self-end px-4 py-2 rounded-2xl glass"
            animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <div className="flex gap-1 items-center">
              {[0, 1, 2].map(i => (
                <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground"
                  animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <motion.button onClick={onNext}
        className="mt-8 text-muted-foreground/40 text-xs cursor-pointer bg-transparent border-none z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}
        whileHover={{ opacity: 0.8 }}>
        Skip →
      </motion.button>
    </motion.div>
  );
}
