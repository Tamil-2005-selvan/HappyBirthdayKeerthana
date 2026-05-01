import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface AIAnalysisProps { onNext: () => void; }

const SCANS = [
  { label: "Scanning Keerthana Shree...", value: null, delay: 0 },
  { label: "Heart compatibility", value: 99, color: "oklch(0.72 0.25 330)", delay: 800 },
  { label: "Smile danger level", value: 100, color: "oklch(0.65 0.3 20)", delay: 1600 },
  { label: "Cuteness overflow risk", value: 100, color: "oklch(0.7 0.25 290)", delay: 2400 },
  { label: "Brain.exe stability", value: 12, color: "oklch(0.75 0.2 60)", delay: 3200 },
  { label: "Recovery probability", value: 3, color: "oklch(0.6 0.15 150)", delay: 4000 },
];

const CONCLUSION_LINES = [
  "📊 ANALYSIS COMPLETE",
  "🤖 CONCLUSION: This boy is completely cooked.",
  "💀 Symptoms: Can't sleep, can't eat, thinks of Keerthana 24/7",
  "⚠️  WARNING: No known cure detected",
  "💊 Prescription: 1 'Yes' from Keerthana Shree",
  "✅ Match status: விதியே இதை எழுதினது 😂",
];

export default function AIAnalysis({ onNext }: AIAnalysisProps) {
  const [visibleScans, setVisibleScans] = useState(0);
  const [showConclusion, setShowConclusion] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timers = SCANS.map((s, i) =>
      setTimeout(() => setVisibleScans(i + 1), s.delay + 400)
    );
    const t1 = setTimeout(() => setShowConclusion(true), 5200);
    return () => { timers.forEach(clearTimeout); clearTimeout(t1); };
  }, []);

  useEffect(() => {
    if (!showConclusion) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= CONCLUSION_LINES.length) {
        clearInterval(iv);
        setTimeout(() => setShowButton(true), 800);
      }
    }, 500);
    return () => clearInterval(iv);
  }, [showConclusion]);

  return (
    <motion.div
      className="romantic-screen py-12"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Scan grid bg */}
      <div className="absolute inset-0 pointer-events-none opacity-5"
        style={{ backgroundImage: "linear-gradient(oklch(0.72 0.25 330) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.25 330) 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />

      <motion.div className="text-4xl mb-4 z-10" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🤖</motion.div>

      <motion.h2 className="font-display text-xl md:text-2xl text-primary neon-text text-center mb-6 z-10 px-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        AI Love Analysis System v2.0 🤖
      </motion.h2>

      <div className="z-10 w-full max-w-xs mx-auto px-4 space-y-3">
        {SCANS.slice(0, visibleScans).map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass p-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground font-mono">{s.label}</span>
              {s.value !== null && (
                <motion.span className="text-xs font-bold" style={{ color: s.color }}
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                  {s.value}%
                </motion.span>
              )}
            </div>
            {s.value !== null && (
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "oklch(0.3 0.02 300)" }}>
                <motion.div className="h-full rounded-full" style={{ background: s.color }}
                  initial={{ width: "0%" }} animate={{ width: `${s.value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showConclusion && (
          <motion.div className="z-10 w-full max-w-xs mx-auto px-4 mt-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="glass p-4 font-mono text-xs space-y-1"
              style={{ background: "oklch(0.05 0.02 150 / 80%)", border: "1px solid oklch(0.55 0.2 150 / 30%)" }}>
              {CONCLUSION_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.p key={i} className={i === 1 ? "text-yellow-400 font-bold" : i === 5 ? "text-primary" : "text-green-400"}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {line}
                </motion.p>
              ))}
              {visibleLines < CONCLUSION_LINES.length && (
                <motion.span className="inline-block w-2 h-3 bg-green-400" animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showButton && (
          <motion.button onClick={onNext}
            className="mt-6 px-8 py-3 rounded-full font-display text-primary-foreground cursor-pointer z-10"
            style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring" }}>
            I already knew 😏 Continue ❤️
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
