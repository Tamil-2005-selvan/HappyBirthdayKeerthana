import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Achievement { id: string; title: string; desc: string; icon: string; }

const ALL: Record<string, Achievement> = {
  entry:       { id: "entry",       icon: "🚪", title: "Adventure Begins!",    desc: "You opened the surprise ❤️" },
  birthday:    { id: "birthday",    icon: "🎂", title: "Birthday Girl!",        desc: "Happy 21st Keerthana! 🎂" },
  glitch:      { id: "glitch",      icon: "💻", title: "System Survivor",       desc: "Survived the glitch 💻" },
  ai:          { id: "ai",          icon: "🤖", title: "AI Analyzed!",          desc: "Science says: 99% compatible 😂" },
  photos:      { id: "photos",      icon: "📸", title: "Memory Lane",           desc: "Walked through memories 📸" },
  timeline:    { id: "timeline",    icon: "⏰", title: "Time Traveler",         desc: "Relived every moment ⏰" },
  whyilikeyou: { id: "whyilikeyou", icon: "💖", title: "Reason Unlocked",       desc: "Now you know why ❤️" },
  counter:     { id: "counter",     icon: "⏱️", title: "Time Keeper",          desc: "Counted every second ⏱️" },
  loveletter:  { id: "loveletter",  icon: "💌", title: "Love Reader",           desc: "Read the letter 💌" },
  bluetick:    { id: "bluetick",    icon: "✓✓", title: "Blue Ticked!",          desc: "She saw it… 👀" },
  voice:       { id: "voice",       icon: "🎙️", title: "Voice Heard",          desc: "Listened with your heart 🎙️" },
  music:       { id: "music",       icon: "🎵", title: "Song Felt",             desc: "Let the music in 🎵" },
  quiz:        { id: "quiz",        icon: "🎯", title: "Quiz Master",           desc: "You know me well 🎯" },
  scratch:     { id: "scratch",     icon: "🪙", title: "Secret Revealed!",      desc: "You scratched the card 🪙" },
  confession:  { id: "confession",  icon: "💕", title: "Confession Heard",      desc: "My heart is yours 💕" },
  decision:    { id: "decision",    icon: "😅", title: "Almost Said No 😅",     desc: "But you didn't 😌" },
  yes:         { id: "yes",         icon: "🏆", title: "100% Complete!",        desc: "You made my day ❤️" },
};

const Ctx = createContext<{ unlock: (id: string) => void }>({ unlock: () => {} });
export const useAchievements = () => useContext(Ctx);

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const [done, setDone] = useState(new Set<string>());

  const unlock = useCallback((id: string) => {
    if (done.has(id) || !ALL[id]) return;
    setDone(p => new Set([...p, id]));
    setQueue(p => [...p, ALL[id]]);
    setTimeout(() => setQueue(p => p.filter(a => a.id !== id)), 3800);
  }, [done]);

  return (
    <Ctx.Provider value={{ unlock }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {queue.map(a => (
            <motion.div
              key={a.id}
              className="glass-strong flex items-center gap-3 px-4 py-3 min-w-[220px]"
              style={{ border: "1px solid oklch(0.72 0.25 330 / 40%)", boxShadow: "0 0 20px oklch(0.72 0.25 330 / 25%)" }}
              initial={{ x: 260, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 260, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              <span className="text-2xl shrink-0">{a.icon}</span>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Achievement Unlocked!</p>
                <p className="text-sm font-display text-foreground truncate">{a.title}</p>
                <p className="text-xs text-muted-foreground truncate">{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}
