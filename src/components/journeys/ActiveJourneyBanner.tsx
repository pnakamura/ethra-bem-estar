import { motion } from 'framer-motion';
import { ChevronRight, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActiveJourneyBannerProps {
  journeyTitle: string;
  journeyIcon: string;
  currentDay: number;
  totalDays: number;
  streak: number;
  themeColor?: string;
  onClick: () => void;
}

const themeColors: Record<string, string> = {
  primary: 'from-primary/20 to-primary/5 border-primary/30',
  secondary: 'from-secondary/20 to-secondary/5 border-secondary/30',
  accent: 'from-accent/20 to-accent/5 border-accent/30',
  calm: 'from-calm/20 to-calm/5 border-calm/30',
  energy: 'from-energy/20 to-energy/5 border-energy/30',
  trust: 'from-trust/20 to-trust/5 border-trust/30',
  joy: 'from-joy/20 to-joy/5 border-joy/30',
};

export function ActiveJourneyBanner({
  journeyTitle,
  journeyIcon,
  currentDay,
  totalDays,
  streak,
  themeColor = 'primary',
  onClick,
}: ActiveJourneyBannerProps) {
  const colorClass = themeColors[themeColor] || themeColors.primary;
  const progress = ((currentDay - 1) / totalDays) * 100;

  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className={cn(
        'w-full p-4 rounded-2xl bg-gradient-to-r border text-left transition-shadow hover:shadow-md',
        colorClass
      )}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="text-2xl flex-shrink-0">{journeyIcon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs text-muted-foreground">Jornada Ativa</p>
            {streak > 1 && (
              <span className="flex items-center gap-0.5 text-xs text-energy">
                <Flame className="w-3 h-3" />
                {streak}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-sm truncate">{journeyTitle}</h3>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 h-1.5 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full rounded-full bg-primary"
              />
            </div>
            <span className="text-xs text-muted-foreground font-medium">
              Dia {currentDay}/{totalDays}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <ChevronRight className="w-4 h-4 text-primary" />
        </div>
      </div>
    </motion.button>
  );
}
