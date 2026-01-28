import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Utensils, Sparkles, Filter, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { safeGoBack } from '@/lib/navigation';
import { BottomNavigation } from '@/components/BottomNavigation';
import { NutritionSummary } from '@/components/nutrition/NutritionSummary';
import { WaterTracker } from '@/components/nutrition/WaterTracker';
import { MealCard } from '@/components/nutrition/MealCard';
import { MealCheckModal } from '@/components/nutrition/MealCheckModal';
import { BreathingTechniqueSelector } from '@/components/dashboard/BreathingTechniqueSelector';
import { BreathPacer } from '@/components/BreathPacer';
import { ContextualHelp } from '@/components/ui/ContextualHelp';
import { useEmotionNutritionContext, useHydrationEntries } from '@/hooks/useNutrition';
import { useAuth } from '@/contexts/AuthContext';
import { useBreathingTechniques } from '@/hooks/useBreathingTechniques';
import { Skeleton } from '@/components/ui/skeleton';
import { format, isToday, isYesterday, subDays, isAfter } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { EmotionType } from '@/types/breathing';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type BreathingTechnique = NonNullable<ReturnType<typeof useBreathingTechniques>['data']>[number];
type HungerFilter = 'all' | 'physical' | 'emotional';
type PeriodFilter = 'today' | 'week' | 'all';

export default function Nutrition() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { data: entries, isLoading } = useEmotionNutritionContext();
  const { addWater, isAddingWater } = useHydrationEntries();
  
  const [showMealModal, setShowMealModal] = useState(false);
  const [showBreathingSelector, setShowBreathingSelector] = useState(false);
  const [showBreathPacer, setShowBreathPacer] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [hungerFilter, setHungerFilter] = useState<HungerFilter>('all');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('today');
  const [showFilters, setShowFilters] = useState(false);

  const firstName = usuario?.nome_completo?.split(' ')[0];

  // Filter entries
  const filteredEntries = useMemo(() => {
    if (!entries) return [];
    
    return entries.filter(entry => {
      // Hunger type filter
      if (hungerFilter !== 'all' && entry.hunger_type !== hungerFilter) {
        return false;
      }
      
      // Period filter
      const entryDate = new Date(entry.created_at);
      if (periodFilter === 'today' && !isToday(entryDate)) {
        return false;
      }
      if (periodFilter === 'week' && !isAfter(entryDate, subDays(new Date(), 7))) {
        return false;
      }
      
      return true;
    });
  }, [entries, hungerFilter, periodFilter]);

  // Calculate stats
  const stats = useMemo(() => {
    const todayEntries = entries?.filter(e => isToday(new Date(e.created_at))) || [];
    const physicalCount = todayEntries.filter(e => e.hunger_type === 'physical').length;
    const emotionalCount = todayEntries.filter(e => e.hunger_type === 'emotional').length;
    const total = todayEntries.length;
    const physicalPercentage = total > 0 ? Math.round((physicalCount / total) * 100) : 0;
    
    return {
      total,
      physicalCount,
      emotionalCount,
      physicalPercentage,
    };
  }, [entries]);

  // Group entries by date
  const groupedEntries = useMemo(() => {
    return filteredEntries.reduce((acc, entry) => {
      const date = new Date(entry.created_at);
      let label = format(date, 'dd/MM/yyyy');
      
      if (isToday(date)) {
        label = 'Hoje';
      } else if (isYesterday(date)) {
        label = 'Ontem';
      } else {
        label = format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
      }
      
      if (!acc[label]) {
        acc[label] = [];
      }
      acc[label].push(entry);
      return acc;
    }, {} as Record<string, typeof filteredEntries>);
  }, [filteredEntries]);

  const handleSuggestBreathing = () => {
    setShowBreathingSelector(true);
  };

  const handleTechniqueSelect = (technique: BreathingTechnique) => {
    setSelectedTechnique(technique);
    setShowBreathingSelector(false);
    setShowBreathPacer(true);
  };

  const handleQuickWater = async () => {
    try {
      await addWater(250, 'água');
      toast.success('+250ml de água! 💧');
    } catch {
      toast.error('Erro ao registrar');
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col pb-28 bg-background">
      {/* Decorative background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-nutrition/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-80 h-80 bg-[hsl(var(--water))]/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative pt-8 px-6 pb-4"
      >
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => safeGoBack(navigate, '/')}
            className="w-10 h-10 rounded-full bg-card border border-border/50 flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-foreground">Alimentação Consciente</h1>
              <ContextualHelp helpKey="mindful-eating" size="sm" />
            </div>
            <p className="text-sm text-muted-foreground">
              {firstName ? `Olá, ${firstName}! ` : ''}Como você está se alimentando hoje?
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-nutrition/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-nutrition" />
          </div>
        </div>

        {/* Quick Stats */}
        {stats.total > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-full px-3 py-1.5 w-fit"
          >
            <span className="font-medium text-foreground">{stats.total} refeições hoje</span>
            <span>•</span>
            <span className="text-green-600 dark:text-green-400">{stats.physicalPercentage}% fome física</span>
          </motion.div>
        )}
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 px-6 space-y-5 relative">
        {/* Summary Cards */}
        <div className="grid gap-4">
          <NutritionSummary />
          <WaterTracker compact />
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickWater}
            disabled={isAddingWater}
            className="flex-1 py-3 px-4 rounded-xl bg-[hsl(var(--water))]/10 border border-[hsl(var(--water))]/20 flex items-center justify-center gap-2 text-sm font-medium text-[hsl(var(--water))] disabled:opacity-50"
          >
            <Droplets className="w-4 h-4" />
            +250ml água
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "py-3 px-4 rounded-xl border flex items-center gap-2 text-sm font-medium transition-colors",
              showFilters 
                ? "bg-nutrition/10 border-nutrition/30 text-nutrition" 
                : "bg-muted/50 border-border/50 text-muted-foreground"
            )}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </motion.button>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-card border border-border/50 rounded-2xl p-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Tipo de fome</p>
                  <div className="flex gap-2">
                    {[
                      { id: 'all', label: 'Todas' },
                      { id: 'physical', label: '🍎 Física' },
                      { id: 'emotional', label: '💭 Emocional' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setHungerFilter(option.id as HungerFilter)}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-colors",
                          hungerFilter === option.id
                            ? "bg-nutrition text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-2">Período</p>
                  <div className="flex gap-2">
                    {[
                      { id: 'today', label: 'Hoje' },
                      { id: 'week', label: 'Semana' },
                      { id: 'all', label: 'Tudo' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setPeriodFilter(option.id as PeriodFilter)}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-colors",
                          periodFilter === option.id
                            ? "bg-nutrition text-white"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-nutrition" />
              Seus momentos de alimentação
            </h2>
          </div>

          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-2xl" />
              ))}
            </div>
          ) : filteredEntries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/50 rounded-3xl p-8 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-nutrition/10 flex items-center justify-center">
                <Utensils className="w-8 h-8 text-nutrition" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {hungerFilter !== 'all' || periodFilter !== 'today' 
                  ? 'Nenhum registro encontrado'
                  : 'Nenhum registro ainda'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {hungerFilter !== 'all' || periodFilter !== 'today' 
                  ? 'Tente ajustar os filtros para ver mais registros.'
                  : 'Comece a praticar alimentação consciente registrando suas refeições e emoções.'}
              </p>
              {hungerFilter === 'all' && periodFilter === 'today' && (
                <button
                  onClick={() => setShowMealModal(true)}
                  className="px-6 py-3 rounded-xl bg-nutrition text-white font-medium"
                >
                  Fazer primeiro registro
                </button>
              )}
            </motion.div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedEntries).map(([date, dateEntries]) => (
                <div key={date}>
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {date}
                  </h3>
                  <div className="space-y-3">
                    {dateEntries?.map((entry, index) => (
                      <MealCard key={entry.id} entry={entry} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>

      {/* FAB */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMealModal(true)}
        className="fixed bottom-32 right-6 w-14 h-14 rounded-full bg-nutrition text-white shadow-xl shadow-nutrition/30 flex items-center justify-center z-40"
      >
        <Plus className="w-7 h-7" />
      </motion.button>

      <BottomNavigation />

      {/* Modals */}
      <MealCheckModal
        isOpen={showMealModal}
        onClose={() => setShowMealModal(false)}
        onSuggestBreathing={handleSuggestBreathing}
      />

      <BreathingTechniqueSelector
        isOpen={showBreathingSelector}
        onClose={() => setShowBreathingSelector(false)}
        onSelect={handleTechniqueSelect}
      />

      <AnimatePresence>
        {showBreathPacer && selectedTechnique && (
          <BreathPacer
            key="breath-pacer"
            pattern={{
              inhale: selectedTechnique.inhale_ms,
              holdIn: selectedTechnique.hold_in_ms,
              exhale: selectedTechnique.exhale_ms,
              holdOut: selectedTechnique.hold_out_ms,
              name: selectedTechnique.pattern_name,
              description: selectedTechnique.pattern_description || '',
              cycles: selectedTechnique.cycles,
            }}
            emotionType={selectedTechnique.emotion_id as EmotionType}
            explanation={selectedTechnique.explanation || ''}
            colorClass={selectedTechnique.color_class || 'text-primary'}
            bgClass={selectedTechnique.bg_class || 'bg-primary/10'}
            backgroundAudioUrl={selectedTechnique.background_audio_url}
            onClose={() => setShowBreathPacer(false)}
            onComplete={() => {
              setShowBreathPacer(false);
              setShowMealModal(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
