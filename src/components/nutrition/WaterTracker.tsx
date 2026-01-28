import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Plus, Coffee, Leaf, GlassWater, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useHydrationEntries } from '@/hooks/useNutrition';
import { toast } from 'sonner';
import { ContextualHelp } from '@/components/ui/ContextualHelp';

interface WaterTrackerProps {
  goal?: number; // in ml
  compact?: boolean;
}

type LiquidType = 'água' | 'café' | 'chá' | 'suco' | 'outro';

const WATER_AMOUNTS = [150, 250, 350, 500];

const liquidTypeConfig: Record<LiquidType, { icon: React.ReactNode; label: string; color: string }> = {
  'água': { 
    icon: <Droplets className="w-4 h-4" />, 
    label: 'Água', 
    color: 'hsl(var(--water))' 
  },
  'café': { 
    icon: <Coffee className="w-4 h-4" />, 
    label: 'Café', 
    color: 'hsl(25, 60%, 45%)' 
  },
  'chá': { 
    icon: <Leaf className="w-4 h-4" />, 
    label: 'Chá', 
    color: 'hsl(120, 40%, 45%)' 
  },
  'suco': { 
    icon: <GlassWater className="w-4 h-4" />, 
    label: 'Suco', 
    color: 'hsl(35, 80%, 50%)' 
  },
  'outro': { 
    icon: <Droplets className="w-4 h-4" />, 
    label: 'Outro', 
    color: 'hsl(var(--muted-foreground))' 
  },
};

export function WaterTracker({ goal = 2000, compact = false }: WaterTrackerProps) {
  const { totalToday, waterToday, otherLiquidsToday, addWater, isAddingWater } = useHydrationEntries();
  const [selectedAmount, setSelectedAmount] = useState(250);
  const [selectedLiquid, setSelectedLiquid] = useState<LiquidType>('água');
  const [showCelebration, setShowCelebration] = useState<'50' | '100' | null>(null);
  const [previousWaterToday, setPreviousWaterToday] = useState(waterToday);

  // Water percentage is based on water only (health recommendation)
  const waterPercentage = Math.min((waterToday / goal) * 100, 100);
  const glasses = Math.floor(waterToday / 250);

  // Check for milestones
  useEffect(() => {
    const previousPercentage = (previousWaterToday / goal) * 100;
    const currentPercentage = (waterToday / goal) * 100;

    if (previousPercentage < 50 && currentPercentage >= 50 && currentPercentage < 100) {
      setShowCelebration('50');
      setTimeout(() => setShowCelebration(null), 3000);
    } else if (previousPercentage < 100 && currentPercentage >= 100) {
      setShowCelebration('100');
      setTimeout(() => setShowCelebration(null), 3000);
    }

    setPreviousWaterToday(waterToday);
  }, [waterToday, previousWaterToday, goal]);

  const handleAddWater = async () => {
    try {
      await addWater(selectedAmount, selectedLiquid);
      const liquidLabel = liquidTypeConfig[selectedLiquid].label;
      toast.success(`+${selectedAmount}ml de ${liquidLabel}! 💧`);
    } catch (error) {
      toast.error('Erro ao registrar');
    }
  };

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[hsl(var(--water)/0.1)] border border-[hsl(var(--water)/0.2)] rounded-2xl p-4 relative overflow-hidden"
      >
        {/* Celebration overlay */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--water)/0.9)] z-10 rounded-2xl"
            >
              <div className="text-center text-white">
                <Sparkles className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                <p className="font-bold">
                  {showCelebration === '50' ? '50% da meta!' : 'Meta atingida! 🎉'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl bg-[hsl(var(--water)/0.2)] flex items-center justify-center"
            >
              <Droplets className="w-5 h-5 text-[hsl(var(--water))]" />
            </motion.div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-semibold text-foreground">
                  {waterToday}ml / {goal}ml
                </p>
                <ContextualHelp helpKey="water-tracker" size="sm" variant="subtle" />
              </div>
              <p className="text-xs text-muted-foreground">
                {glasses} copos de água hoje
                {otherLiquidsToday > 0 && ` • +${otherLiquidsToday}ml outros`}
              </p>
            </div>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleAddWater}
            disabled={isAddingWater}
            className="w-10 h-10 rounded-xl bg-[hsl(var(--water))] text-white flex items-center justify-center disabled:opacity-50 shadow-lg shadow-[hsl(var(--water)/0.3)]"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${waterPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-[hsl(var(--water))] rounded-full relative"
          >
            {/* Animated shine effect */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-3xl p-6 relative overflow-hidden"
    >
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-[hsl(var(--water)/0.95)] z-10 rounded-3xl"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
              className="text-center text-white"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
              >
                <Sparkles className="w-12 h-12 mx-auto mb-3" />
              </motion.div>
              <p className="text-2xl font-bold mb-1">
                {showCelebration === '50' ? '50% da meta!' : 'Meta atingida!'}
              </p>
              <p className="text-sm opacity-90">
                {showCelebration === '50' ? 'Continue assim! 💪' : 'Excelente hidratação! 🎉'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--water)/0.15)] flex items-center justify-center">
          <Droplets className="w-6 h-6 text-[hsl(var(--water))]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground">Hidratação</h3>
            <ContextualHelp helpKey="water-tracker" size="sm" />
          </div>
          <p className="text-sm text-muted-foreground">
            {glasses} copos de água
            {otherLiquidsToday > 0 && ` • +${otherLiquidsToday}ml outros`}
          </p>
        </div>
      </div>

      {/* Visual progress */}
      <div className="relative h-40 mb-6 flex items-end justify-center">
        <div className="relative w-24 h-32 border-4 border-[hsl(var(--water)/0.3)] rounded-b-3xl rounded-t-lg overflow-hidden">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${waterPercentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[hsl(var(--water))] to-[hsl(var(--water)/0.6)]"
          />
          
          {/* Water waves effect */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 right-0 h-full"
            style={{ 
              clipPath: 'ellipse(60% 8% at 50% 100%)',
              backgroundColor: 'hsl(var(--water) / 0.4)',
            }}
          />
        </div>
        
        {/* Percentage label */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-0 right-0 bg-[hsl(var(--water)/0.1)] px-3 py-1 rounded-full"
        >
          <span className="text-sm font-bold text-[hsl(var(--water))]">{Math.round(waterPercentage)}%</span>
        </motion.div>
      </div>

      {/* Stats */}
      <div className="text-center mb-6">
        <motion.p 
          key={waterToday}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-foreground"
        >
          {waterToday}ml
        </motion.p>
        <p className="text-sm text-muted-foreground">de água / {goal}ml</p>
        {otherLiquidsToday > 0 && (
          <p className="text-xs text-muted-foreground mt-1">
            + {otherLiquidsToday}ml de outros líquidos
          </p>
        )}
      </div>

      {/* Liquid type selector */}
      <div className="mb-4">
        <p className="text-xs text-muted-foreground mb-2">Tipo de líquido</p>
        <div className="flex gap-2">
          {(Object.keys(liquidTypeConfig) as LiquidType[]).map((liquid) => {
            const config = liquidTypeConfig[liquid];
            return (
              <motion.button
                key={liquid}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLiquid(liquid)}
                className={cn(
                  'flex-1 py-2.5 px-2 rounded-xl text-xs font-medium transition-all flex flex-col items-center gap-1',
                  selectedLiquid === liquid
                    ? 'text-white shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                )}
                style={selectedLiquid === liquid ? { backgroundColor: config.color } : {}}
              >
                {config.icon}
                <span>{config.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Amount selector */}
      <div className="flex gap-2 mb-4">
        {WATER_AMOUNTS.map((amount) => (
          <motion.button
            key={amount}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedAmount(amount)}
            className={cn(
              'flex-1 py-2 rounded-xl text-sm font-medium transition-all',
              selectedAmount === amount
                ? 'text-white shadow-lg'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            )}
            style={selectedAmount === amount ? { backgroundColor: liquidTypeConfig[selectedLiquid].color } : {}}
          >
            {amount}ml
          </motion.button>
        ))}
      </div>

      {/* Add button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        onClick={handleAddWater}
        disabled={isAddingWater}
        className="w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg"
        style={{ 
          backgroundColor: liquidTypeConfig[selectedLiquid].color,
          boxShadow: `0 8px 24px ${liquidTypeConfig[selectedLiquid].color}40`
        }}
      >
        <Plus className="w-5 h-5" />
        Adicionar {selectedAmount}ml de {liquidTypeConfig[selectedLiquid].label}
      </motion.button>
    </motion.div>
  );
}
