import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PrimaryEmotion, getIntensityLabel } from '@/data/plutchik-emotions';

interface EmotionIntensitySliderProps {
  emotion: PrimaryEmotion;
  value: number;
  onChange: (value: number) => void;
}

export function EmotionIntensitySlider({ emotion, value, onChange }: EmotionIntensitySliderProps) {
  const steps = [1, 2, 3, 4, 5];
  const intensityLabel = getIntensityLabel(emotion, value);

  // Labels para cada nível
  const getStepLabel = (step: number) => {
    if (step <= 2) return emotion.lowIntensity.label;
    if (step <= 4) return emotion.midIntensity.label;
    return emotion.highIntensity.label;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl border border-border/50"
      style={{ 
        backgroundColor: `${emotion.bgColor}`,
      }}
    >
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, white 0%, transparent 50%, ${emotion.color}20 100%)`
        }}
      />

      {/* Content */}
      <div className="relative p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <motion.div 
              className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-white/50 shadow-sm"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-2xl">{emotion.icon}</span>
            </motion.div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground text-sm truncate">{emotion.label}</p>
              <p className="text-xs text-muted-foreground truncate">{emotion.survivalFunction.split(' ')[0]}</p>
            </div>
          </div>
          
          {/* Current intensity badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={intensityLabel}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
              style={{ 
                backgroundColor: emotion.color,
                color: 'white',
                boxShadow: `0 4px 12px ${emotion.color}40`
              }}
            >
              {intensityLabel}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-white/60 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ backgroundColor: emotion.color }}
            initial={false}
            animate={{ width: `${(value / 5) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          {/* Glow effect */}
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full blur-sm opacity-50"
            style={{ backgroundColor: emotion.color }}
            initial={false}
            animate={{ width: `${(value / 5) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </div>

        {/* Step buttons */}
        <div className="flex justify-between gap-1 sm:gap-2">
          {steps.map((step) => {
            const isActive = step === value;
            const isPast = step < value;
            
            return (
              <motion.button
                key={step}
                onClick={() => onChange(step)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'relative flex-1 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-primary/50',
                  isActive && 'shadow-lg',
                  !isActive && !isPast && 'bg-white/50 text-muted-foreground hover:bg-white/70'
                )}
                style={{
                  backgroundColor: isActive 
                    ? emotion.color 
                    : isPast 
                      ? `${emotion.color}30`
                      : undefined,
                  color: isActive 
                    ? 'white' 
                    : isPast 
                      ? emotion.color.replace('hsl', 'hsl').replace(')', ', 0.8)')
                      : undefined,
                  boxShadow: isActive 
                    ? `0 4px 15px ${emotion.color}50`
                    : undefined
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId={`active-${emotion.id}`}
                    className="absolute inset-0 rounded-xl"
                    style={{ 
                      background: `linear-gradient(135deg, ${emotion.color}, ${emotion.color}dd)`,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                
                <span className="relative z-10">{step}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Labels de intensidade */}
        <div className="flex justify-between items-center text-[10px] sm:text-xs text-muted-foreground px-1">
          <span className="truncate max-w-[80px] sm:max-w-none">{emotion.lowIntensity.label}</span>
          <span className="hidden sm:block text-center truncate">{emotion.midIntensity.label}</span>
          <span className="truncate max-w-[80px] sm:max-w-none text-right">{emotion.highIntensity.label}</span>
        </div>
      </div>
    </motion.div>
  );
}
