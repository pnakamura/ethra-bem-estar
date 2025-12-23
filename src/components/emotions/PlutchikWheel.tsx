import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { primaryEmotions, PrimaryEmotion, getIntensityLabel } from '@/data/plutchik-emotions';

interface SelectedEmotion {
  id: string;
  intensity: number;
}

interface PlutchikWheelProps {
  selectedEmotions: SelectedEmotion[];
  onSelect: (emotionId: string) => void;
  onIntensityChange?: (emotionId: string, intensity: number) => void;
}

export function PlutchikWheel({ 
  selectedEmotions, 
  onSelect,
}: PlutchikWheelProps) {
  const getSelectedEmotion = (id: string) => 
    selectedEmotions.find(e => e.id === id);

  const isSelected = (id: string) => 
    selectedEmotions.some(e => e.id === id);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Wheel Container */}
      <div className="relative aspect-square">
        {/* Decorative rings */}
        <div className="absolute inset-4 rounded-full border border-border/30" />
        <div className="absolute inset-12 rounded-full border border-border/20" />
        
        {/* Center hub with glow effect */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-soft" />
            <div className="relative w-24 h-24 rounded-full glass-card flex items-center justify-center p-2">
              <span className="text-xs font-medium text-center text-muted-foreground leading-tight">
                Como você<br />se sente?
              </span>
            </div>
          </div>
        </motion.div>

        {/* Emotion Petals */}
        {primaryEmotions.map((emotion, index) => {
          const angle = (index * 360) / 8 - 90;
          const radius = 40;
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
          const selected = isSelected(emotion.id);
          const selectedData = getSelectedEmotion(emotion.id);

          return (
            <motion.button
              key={emotion.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.1 + index * 0.05,
                type: 'spring',
                stiffness: 260,
                damping: 20
              }}
              onClick={() => onSelect(emotion.id)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
              style={{
                left: `${x}%`,
                top: `${y}%`,
              }}
            >
              {/* Glow effect for selected */}
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 rounded-full blur-lg opacity-50"
                  style={{ backgroundColor: emotion.color }}
                />
              )}
              
              {/* Main petal */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'relative flex flex-col items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full transition-all duration-300',
                  selected 
                    ? 'ring-2 ring-offset-2 ring-offset-background shadow-lg ring-primary' 
                    : 'shadow-md hover:shadow-lg'
                )}
                style={{
                  backgroundColor: selected ? emotion.color : emotion.bgColor,
                }}
              >
                {/* Selection indicator */}
                {selected && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md z-20"
                  >
                    <Check className="w-3.5 h-3.5 text-primary-foreground" strokeWidth={3} />
                  </motion.div>
                )}
                
                {/* Emoji */}
                <motion.span 
                  className="text-3xl"
                  animate={selected ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {emotion.icon}
                </motion.span>
              </motion.div>
              
              {/* Label */}
              <motion.span 
                className={cn(
                  'absolute -bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-semibold whitespace-nowrap transition-colors duration-200',
                  selected ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                )}
              >
                {selectedData 
                  ? getIntensityLabel(emotion, selectedData.intensity)
                  : emotion.label
                }
              </motion.span>
            </motion.button>
          );
        })}
      </div>

      {/* Selected Emotions Pills */}
      {selectedEmotions.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-wrap gap-2 justify-center"
        >
          {selectedEmotions.map((selected, index) => {
            const emotion = primaryEmotions.find(e => e.id === selected.id);
            if (!emotion) return null;
            
            return (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm shadow-sm"
                style={{ 
                  backgroundColor: `${emotion.color}20`,
                  border: `1px solid ${emotion.color}40`
                }}
              >
                <span className="text-lg">{emotion.icon}</span>
                <span className="font-medium text-foreground">
                  {getIntensityLabel(emotion, selected.intensity)}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Helper text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 text-center text-xs text-muted-foreground"
      >
        Toque para selecionar • Até 3 emoções
      </motion.p>
    </div>
  );
}