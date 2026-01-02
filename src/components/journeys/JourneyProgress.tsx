import { motion } from 'framer-motion';
import { Check, Lock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface JourneyProgressProps {
  currentDay: number;
  totalDays: number;
  completedDays: number[];
  onDayClick: (day: number) => void;
  themeColor?: string;
}

export function JourneyProgress({
  currentDay,
  totalDays,
  completedDays,
  onDayClick,
  themeColor = 'primary',
}: JourneyProgressProps) {
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      accent: 'bg-accent text-accent-foreground',
      calm: 'bg-calm text-primary-foreground',
      energy: 'bg-energy text-primary-foreground',
      trust: 'bg-trust text-primary-foreground',
      joy: 'bg-joy text-foreground',
    };
    return colors[color] || colors.primary;
  };

  const progressPercent = (completedDays.length / totalDays) * 100;

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progresso</span>
          <span className="font-medium">{completedDays.length}/{totalDays} dias</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={cn('h-full rounded-full', getColorClass(themeColor))}
          />
        </div>
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: totalDays }, (_, i) => i + 1).map((day) => {
          const isCompleted = completedDays.includes(day);
          const isCurrent = day === currentDay;
          const isLocked = day > currentDay && !isCompleted;

          return (
            <motion.button
              key={day}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: day * 0.02 }}
              onClick={() => !isLocked && onDayClick(day)}
              disabled={isLocked}
              className={cn(
                'aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all',
                isCompleted && getColorClass(themeColor),
                isCurrent && !isCompleted && 'bg-primary/20 text-primary border-2 border-primary animate-pulse',
                isLocked && 'bg-muted/50 text-muted-foreground cursor-not-allowed',
                !isCompleted && !isCurrent && !isLocked && 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
              )}
            >
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : isCurrent ? (
                <Play className="w-3 h-3" />
              ) : isLocked ? (
                <Lock className="w-3 h-3" />
              ) : (
                day
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
