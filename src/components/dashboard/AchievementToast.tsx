import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AchievementToastProps {
  achievement: {
    title: string;
    description: string;
    emoji?: string;
  } | null;
  onDismiss: () => void;
}

export function AchievementToast({ achievement, onDismiss }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.3 },
        colors: ['#14b8a6', '#a855f7', '#f59e0b', '#ec4899']
      });

      // Auto dismiss after 4 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onDismiss, 300);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="fixed top-4 left-4 right-4 z-50 max-w-sm mx-auto"
          onClick={() => {
            setIsVisible(false);
            setTimeout(onDismiss, 300);
          }}
        >
          <div className="bg-gradient-to-r from-primary to-secondary p-[2px] rounded-2xl shadow-2xl">
            <div className="bg-card rounded-2xl p-4">
              <div className="flex items-center gap-4">
                {/* Icon */}
                <motion.div
                  animate={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
                >
                  {achievement.emoji ? (
                    <span className="text-3xl">{achievement.emoji}</span>
                  ) : (
                    <Trophy className="w-7 h-7 text-primary" />
                  )}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span className="text-xs font-semibold text-secondary uppercase tracking-wide">
                      Conquista Desbloqueada!
                    </span>
                  </div>
                  <h4 className="font-bold text-foreground truncate">
                    {achievement.title}
                  </h4>
                  <p className="text-sm text-muted-foreground truncate">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Progress bar animation */}
              <motion.div 
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 4, ease: 'linear' }}
                className="h-1 bg-primary/30 rounded-full mt-3 origin-left"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
