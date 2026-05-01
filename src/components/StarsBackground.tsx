import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAntiGravity } from "./AntiGravityContext";

// Fixed star positions (stable across renders)
const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 1 + Math.random() * 3,
  delay: Math.random() * 5,
  duration: 2 + Math.random() * 4,
  depth: (i % 3) + 1,
}));

// 12 interactive constellation stars
const CONST_STARS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: 8 + (i % 4) * 24 + Math.random() * 6,
  y: 12 + Math.floor(i / 4) * 28 + Math.random() * 6,
}));

export default function StarsBackground() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState<number[]>([]);
  const [secret, setSecret] = useState(false);
  const { isAntiGravity } = useAntiGravity();

  // Device tilt + mouse parallax
  useEffect(() => {
    const onOrientation = (e: DeviceOrientationEvent) => {
      setOffset({
        x: Math.max(-1, Math.min(1, (e.gamma ?? 0) / 30)),
        y: Math.max(-1, Math.min(1, (e.beta ?? 0) / 30)),
      });
    };
    const onMouse = (e: MouseEvent) => {
      setOffset({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("deviceorientation", onOrientation);
    window.addEventListener("mousemove", onMouse);
    return () => {
      window.removeEventListener("deviceorientation", onOrientation);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  const handleConstStar = (id: number) => {
    if (clicked.includes(id)) return;
    const next = [...clicked, id];
    setClicked(next);
    if (next.length >= 5) {
      setSecret(true);
      setTimeout(() => { setSecret(false); setClicked([]); }, 4000);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Parallax stars */}
      {STARS.map(s => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: `oklch(0.95 0.05 ${280 + (s.id % 60)})`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            transform: `translate(${offset.x * s.depth * 8}px, ${offset.y * s.depth * 8}px)`,
            transition: "transform 0.4s ease-out",
            filter: isAntiGravity ? "brightness(1.8) hue-rotate(180deg)" : undefined,
          }}
        />
      ))}

      {/* SVG constellation lines */}
      <svg className="absolute inset-0 w-full h-full">
        {clicked.map((id, i) => {
          if (i === 0) return null;
          const a = CONST_STARS[clicked[i - 1]];
          const b = CONST_STARS[id];
          return (
            <motion.line
              key={`l${i}`}
              x1={`${a.x}%`} y1={`${a.y}%`}
              x2={`${b.x}%`} y2={`${b.y}%`}
              stroke="oklch(0.85 0.2 330)"
              strokeWidth="1.5"
              strokeOpacity={0.6}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          );
        })}
      </svg>

      {/* Interactive constellation stars */}
      {CONST_STARS.map(s => (
        <motion.button
          key={s.id}
          className="absolute pointer-events-auto cursor-pointer"
          style={{
            left: `${s.x}%`, top: `${s.y}%`,
            width: 24, height: 24,
            transform: "translate(-50%, -50%)",
            background: "transparent",
            border: "none",
          }}
          onClick={() => handleConstStar(s.id)}
          whileHover={{ scale: 1.8 }}
          whileTap={{ scale: 0.7 }}
        >
          <motion.div
            className="w-3 h-3 rounded-full mx-auto"
            style={{
              background: clicked.includes(s.id) ? "oklch(0.9 0.3 330)" : "oklch(0.8 0.06 280)",
              boxShadow: clicked.includes(s.id) ? "0 0 14px oklch(0.9 0.3 330)" : "0 0 4px oklch(0.8 0.06 280)",
            }}
            animate={clicked.includes(s.id) ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.4 }}
          />
        </motion.button>
      ))}

      {/* Anti-gravity vortex overlay */}
      <AnimatePresence>
        {isAntiGravity && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.4 0.2 260 / 10%), transparent 70%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: [0, 360] }}
            exit={{ opacity: 0 }}
            transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 } }}
          />
        )}
      </AnimatePresence>

      {/* Constellation secret message */}
      <AnimatePresence>
        {secret && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-strong px-8 py-6 text-center pointer-events-auto"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring" }}
            >
              <div className="text-4xl mb-3">⭐</div>
              <p className="font-handwriting text-2xl text-primary neon-text">Constellation found! ✨</p>
              <p className="text-muted-foreground text-sm mt-2">"Our love story is written in the stars" ❤️</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
