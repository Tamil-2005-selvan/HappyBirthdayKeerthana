import { motion } from "framer-motion";

interface MemoryTimelineProps {
  onNext: () => void;
}

const memories = [
  { icon: "👀", title: "First time I saw you", desc: "My heart skipped a beat that day..." },
  { icon: "💬", title: "First chat", desc: "Every word felt magical..." },
  { icon: "😊", title: "First smile", desc: "That smile... unforgettable." },
  { icon: "🌙", title: "First late-night talk", desc: "Time stopped when we talked..." },
  { icon: "💭", title: "First overthinking", desc: "You were always on my mind..." },
  { icon: "💔", title: "First time missing you", desc: "That's when I knew it was real..." },
];

export default function MemoryTimeline({ onNext }: MemoryTimelineProps) {
  return (
    <motion.div
      className="romantic-screen py-16"
      style={{ background: "var(--gradient-romantic)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h2
        className="font-display text-2xl md:text-4xl text-primary neon-text text-center mb-12 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Our Memory Timeline ❤️
      </motion.h2>

      <div className="relative z-10 max-w-md mx-auto px-6">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary opacity-30" />

        {memories.map((m, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-4 mb-8 relative"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.3 }}
          >
            <div className="w-16 h-16 rounded-full glass flex items-center justify-center text-2xl shrink-0 relative z-10">
              {m.icon}
            </div>
            <div className="glass p-4 flex-1">
              <h3 className="font-display text-lg text-primary">{m.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{m.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        onClick={onNext}
        className="mt-8 px-8 py-3 rounded-full font-display text-primary-foreground z-10 cursor-pointer"
        style={{ background: "var(--gradient-neon)", boxShadow: "var(--glow-pink)" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Continue ❤️
      </motion.button>
    </motion.div>
  );
}
