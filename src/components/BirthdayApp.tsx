import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AchievementProvider, useAchievements } from "./AchievementSystem";
import { AntiGravityProvider } from "./AntiGravityContext";
import FloatingHearts from "./FloatingHearts";
import StarsBackground from "./StarsBackground";
import EasterEggs from "./EasterEggs";
import Preloader from "./Preloader";
import EntryPortal from "./EntryPortal";
import BirthdayReveal from "./BirthdayReveal";
import GlitchMoment from "./GlitchMoment";
import AIAnalysis from "./AIAnalysis";
import PhotoMemories from "./PhotoMemories";
import MemoryTimeline from "./MemoryTimeline";
import WhyILikeYou from "./WhyILikeYou";
import SecretCounter from "./SecretCounter";
import LoveLetter from "./LoveLetter";
import BlueTickTrap from "./BlueTickTrap";
import VoiceMessage from "./VoiceMessage";
import MusicMemory from "./MusicMemory";
import LoveQuiz from "./LoveQuiz";
import ScratchCard from "./ScratchCard";
import FinalConfession from "./FinalConfession";
import DecisionScreen from "./DecisionScreen";
import YesScreen from "./YesScreen";

type Screen =
  | "preloader" | "entry" | "birthday" | "glitch" | "ai"
  | "photos" | "timeline" | "whyilikeyou" | "counter"
  | "loveletter" | "bluetick" | "voice" | "music" | "quiz"
  | "scratch" | "confession" | "decision" | "yes";

// Inner app that has access to achievement context
function InnerApp() {
  const [screen, setScreen] = useState<Screen>("preloader");
  const { unlock } = useAchievements();

  const go = useCallback((s: Screen) => () => {
    setScreen(s);
    unlock(s); // fire achievement for every new screen
  }, [unlock]);

  const showEasterEggs = screen !== "preloader";
  const showGravityBtn = screen !== "preloader" && screen !== "birthday" && screen !== "glitch";

  return (
    <AntiGravityProvider show={showGravityBtn}>
      <div
        className="relative min-h-dvh overflow-hidden"
        style={{ background: "var(--gradient-romantic)" }}
      >
        <StarsBackground />
        {screen !== "preloader" && screen !== "glitch" && <FloatingHearts count={12} />}
        {showEasterEggs && <EasterEggs />}

        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
          >
            {screen === "preloader"   && <Preloader       onComplete={go("entry")} />}
            {screen === "entry"       && <EntryPortal     onEnter={go("birthday")} />}
            {screen === "birthday"    && <BirthdayReveal  onComplete={go("glitch")} />}
            {screen === "glitch"      && <GlitchMoment    onRecover={go("ai")} />}
            {screen === "ai"          && <AIAnalysis      onNext={go("photos")} />}
            {screen === "photos"      && <PhotoMemories   onNext={go("timeline")} />}
            {screen === "timeline"    && <MemoryTimeline  onNext={go("whyilikeyou")} />}
            {screen === "whyilikeyou" && <WhyILikeYou    onNext={go("counter")} />}
            {screen === "counter"     && <SecretCounter   onNext={go("loveletter")} />}
            {screen === "loveletter"  && <LoveLetter      onNext={go("bluetick")} />}
            {screen === "bluetick"    && <BlueTickTrap    onNext={go("voice")} />}
            {screen === "voice"       && <VoiceMessage    onNext={go("music")} />}
            {screen === "music"       && <MusicMemory     onNext={go("quiz")} />}
            {screen === "quiz"        && <LoveQuiz        onNext={go("scratch")} />}
            {screen === "scratch"     && <ScratchCard     onNext={go("confession")} />}
            {screen === "confession"  && <FinalConfession onNext={go("decision")} />}
            {screen === "decision"    && <DecisionScreen  onYes={go("yes")} />}
            {screen === "yes"         && <YesScreen />}
          </motion.div>
        </AnimatePresence>
      </div>
    </AntiGravityProvider>
  );
}

export default function BirthdayApp() {
  return (
    <AchievementProvider>
      <InnerApp />
    </AchievementProvider>
  );
}
