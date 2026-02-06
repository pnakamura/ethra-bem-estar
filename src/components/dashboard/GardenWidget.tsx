import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Award, TrendingUp, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useGardenState } from '@/hooks/useGardenState';
import { GardenCreatures } from './GardenCreatures';
import { GardenBackground } from './GardenBackground';
import { ContextualHelp } from '@/components/ui/ContextualHelp';

interface GardenWidgetProps {
  isLoading?: boolean;
}

const motivationalTips = [
  "Cada respiração consciente é uma semente de paz 🌱",
  "Seu jardim interior floresce com cada momento de presença 🌸",
  "A consistência é o sol que faz sua prática crescer ☀️",
  "Pequenos passos diários criam grandes transformações 🦋",
  "Seu progresso é único - celebre cada conquista! ✨",
  "A jornada interior é o caminho mais belo 🏔️",
  "Cuide de você como cuida de um jardim precioso 🌻"
];

export function GardenWidget({ isLoading: externalLoading }: GardenWidgetProps) {
  const [showTip, setShowTip] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  
  const {
    currentStreak,
    bestStreak,
    level,
    totalPoints,
    currentStage,
    nextStage,
    progressToNextStage,
    unlockedCreatures,
    timeOfDay,
    weatherEffect,
    isLoading: statsLoading
  } = useGardenState();

  const isLoading = externalLoading || statsLoading;

  const handlePlantTap = () => {
    setCurrentTip((prev) => (prev + 1) % motivationalTips.length);
    setShowTip(true);
    setTimeout(() => setShowTip(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-card border border-border/50 p-4 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-muted rounded-2xl" />
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-muted rounded w-24" />
            <div className="h-4 bg-muted rounded w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 20 }}
      className="garden-widget relative rounded-2xl bg-card border border-border/50 dark:border-border/60 overflow-hidden shadow-lg"
    >
      {/* Dynamic Background */}
      <GardenBackground 
        timeOfDay={timeOfDay}
        weatherEffect={weatherEffect}
        stageGlowColor={currentStage.glowColor}
      />

      {/* Help Button */}
      <div className="absolute top-3 right-3 z-20">
        <ContextualHelp helpKey="garden-widget" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-5">
        {/* Row 1: Plant + Streak + Level */}
        <div className="flex items-center gap-4 mb-4">
          {/* Plant Container */}
          <motion.button
            onClick={handlePlantTap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'relative w-16 h-16 rounded-xl flex items-center justify-center shrink-0',
              'bg-gradient-to-br shadow-lg transition-all duration-300',
              currentStage.bgClass
            )}
          >
            {/* Glow effect */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className={cn(
                'absolute inset-0 rounded-xl blur-xl',
                currentStage.bgClass
              )}
            />
            
            {/* Plant emoji - 15% larger */}
            <motion.span
              className="text-5xl relative z-10 filter drop-shadow-lg"
              animate={{ 
                y: [0, -4, 0],
                rotate: [-2, 2, -2],
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            >
              {currentStage.plant}
            </motion.span>

            {/* Sparkle effect on rainbow weather */}
            {weatherEffect === 'rainbow' && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1" />
              </motion.div>
            )}

            {/* Creatures */}
            <GardenCreatures creatures={unlockedCreatures} />
          </motion.button>

          {/* Main Stats */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <Flame className={cn(
                'w-5 h-5 shrink-0',
                currentStreak > 0 ? 'text-secondary' : 'text-muted-foreground'
              )} />
              <span className="text-xl font-bold text-foreground">
                {currentStreak} {currentStreak === 1 ? 'dia' : 'dias'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {currentStage.name}
            </p>
          </div>

          {/* Level Badge */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-background/60 px-2.5 py-1.5 rounded-lg shrink-0">
            <Award className="w-4 h-4" />
            <span className="font-medium">Nv. {level}</span>
          </div>
        </div>

        {/* Row 2: Stage message */}
        <p className="text-sm text-muted-foreground dark:text-muted-enhanced mb-4 line-clamp-1">
          {currentStage.message}
        </p>

        {/* Row 3: Progress to next stage */}
        {nextStage && (
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Próximo: {nextStage.plant} {nextStage.name}
              </span>
              <span className="font-medium text-primary">
                {nextStage.minStreak - currentStreak} dias
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressToNextStage}%` }}
                transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
          </div>
        )}

        {/* Row 4: Secondary stats */}
        <div className="flex items-center justify-between pt-3 border-t border-border/40 dark:border-border/50">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{totalPoints} pontos</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>Recorde: {bestStreak}🔥</span>
          </div>
        </div>

        {/* Motivational Tip Popup */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className="absolute left-4 right-4 bottom-full mb-2 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-3 shadow-lg"
            >
              <p className="text-sm text-center text-foreground">
                {motivationalTips[currentTip]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
