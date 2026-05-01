import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

interface ScratchCardProps { onNext: () => void; }

export default function ScratchCard({ onNext }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pct, setPct] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const isDown = useRef(false);

  const W = 280, H = 170;

  // Draw gold overlay
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#C9A84C");
    g.addColorStop(0.45, "#FFD700");
    g.addColorStop(0.55, "#FFF0A0");
    g.addColorStop(1, "#B8860B");
    ctx.fillStyle = g;
    ctx.roundRect(0, 0, W, H, 16);
    ctx.fill();

    ctx.fillStyle = "rgba(120,80,0,0.35)";
    ctx.font = "bold 15px serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to Reveal ✦", W / 2, H / 2 - 12);
    ctx.font = "13px serif";
    ctx.fillText("🪙  Hidden love message  🪙", W / 2, H / 2 + 12);
  }, []);

  const scratch = useCallback((cx: number, cy: number) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(cx, cy, 32, 0, Math.PI * 2);
    ctx.fill();

    // Sample transparency
    const data = ctx.getImageData(0, 0, W, H).data;
    let t = 0;
    for (let i = 3; i < data.length; i += 16) if (data[i] < 128) t++;
    const p = Math.round((t / (W * H / 4)) * 100);
    setPct(Math.min(p, 100));
    if (p > 60) setRevealed(true);
  }, [revealed]);

  const pos = (e: React.MouseEvent | React.TouchEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    if ("touches" in e) return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    return { x: (e as React.MouseEvent).clientX - r.left, y: (e as React.MouseEvent).clientY - r.top };
  };

  return (
    <motion.div
      className="romantic-screen"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      {/* Coin sparkles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div key={i} className="absolute text-xl pointer-events-none"
          style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 20}%` }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, 180, 360] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.4 }}>
          🪙
        </motion.div>
      ))}

      <motion.h2 className="font-display text-2xl text-primary neon-text text-center mb-2 z-10"
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        A Secret Message 💌
      </motion.h2>
      <motion.p className="text-muted-foreground text-sm text-center mb-6 z-10"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Scratch to reveal... 🪙
      </motion.p>

      {/* Card */}
      <div className="z-10 relative" style={{ width: W, height: H }}>
        {/* Hidden message */}
        <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center text-center px-5"
          style={{ background: "linear-gradient(135deg, oklch(0.12 0.05 330), oklch(0.08 0.03 300))", border: "2px solid oklch(0.72 0.25 330 / 30%)" }}>
          <motion.div className="text-4xl mb-2"
            animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>💖</motion.div>
          <p className="font-handwriting text-xl text-primary neon-text leading-tight">
            என்னோட மனசு முழுக்க நீயே... ❤️
          </p>
          <p className="text-muted-foreground/80 text-xs mt-2 italic">
            "My heart is filled with only you"
          </p>
        </div>

        {/* Scratch overlay */}
        {!revealed && (
          <canvas ref={canvasRef} width={W} height={H}
            className="absolute inset-0 rounded-2xl cursor-crosshair select-none"
            style={{ touchAction: "none", boxShadow: "0 8px 40px oklch(0.8 0.2 60 / 30%)" }}
            onMouseDown={e => { isDown.current = true; const p = pos(e); scratch(p.x, p.y); }}
            onMouseMove={e => { if (isDown.current) { const p = pos(e); scratch(p.x, p.y); } }}
            onMouseUp={() => { isDown.current = false; }}
            onTouchStart={e => { e.preventDefault(); isDown.current = true; const p = pos(e); scratch(p.x, p.y); }}
            onTouchMove={e => { e.preventDefault(); const p = pos(e); scratch(p.x, p.y); }}
            onTouchEnd={() => { isDown.current = false; }}
          />
        )}
      </div>

      {/* Progress */}
      {!revealed && pct > 3 && (
        <motion.p className="z-10 text-muted-foreground text-xs mt-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {pct}% revealed...
        </motion.p>
      )}

      {/* Revealed celebration */}
      <AnimatePresence>
        {revealed && (
          <motion.div className="z-10 text-center mt-6"
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring" }}>
            {/* Burst particles */}
            {Array.from({ length: 16 }).map((_, i) => {
              const angle = (i / 16) * 360;
              const rad = angle * Math.PI / 180;
              return (
                <motion.div key={i} className="absolute text-lg pointer-events-none"
                  style={{ left: "50%", top: "60%" }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ x: Math.cos(rad) * 100, y: Math.sin(rad) * 100, opacity: 0 }}
                  transition={{ duration: 1, delay: i * 0.03 }}>
                  🪙
                </motion.div>
              );
            })}
            <motion.div className="text-5xl mb-3"
              animate={{ rotate: [-5, 5, -5], scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}>🎉</motion.div>
            <p className="text-muted-foreground mb-5 font-display text-sm">You found the secret! ❤️</p>
            <motion.button onClick={onNext}
              className="px-10 py-4 rounded-full font-display text-primary-foreground cursor-pointer"
              style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
              whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
              Continue ❤️
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {!revealed && (
        <motion.button onClick={onNext}
          className="mt-10 text-muted-foreground/40 text-xs cursor-pointer bg-transparent border-none z-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 6 }}
          whileHover={{ opacity: 0.7 }}>
          Skip →
        </motion.button>
      )}
    </motion.div>
  );
}
