import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  SignInIcon,
  SignOutIcon,
  SettingsIcon,
  LeafIcon,
} from '@/components/ui/icons';
import {
  EmotionsIllustration,
  BreatheIllustration,
  MeditateIllustration,
  JourneyIllustration,
  JournalIllustration,
  NutritionIllustration,
  InsightsIllustration,
  StudioIllustration,
} from '@/components/ui/illustrations';
import { Button } from '@/components/ui/button';
import { BottomNavigation } from '@/components/BottomNavigation';
import { BreathPacer } from '@/components/BreathPacer';
import { MeditationPlayer } from '@/components/MeditationPlayer';
import { QuickActionCard } from '@/components/dashboard/QuickActionCard';
import { DailyGuidanceCard } from '@/components/dashboard/DailyGuidanceCard';
import { GardenWidget } from '@/components/dashboard/GardenWidget';
import { ContextualHelp } from '@/components/ui/ContextualHelp';
import { MoodCheckModal } from '@/components/dashboard/MoodCheckModal';
import { BreathingTechniqueSelector } from '@/components/dashboard/BreathingTechniqueSelector';
import { MealCheckModal } from '@/components/nutrition/MealCheckModal';
import { ActiveJourneyBanner } from '@/components/journeys/ActiveJourneyBanner';
import { useAuth } from '@/contexts/AuthContext';
import { useBreathingTechniques } from '@/hooks/useBreathingTechniques';
import { useActiveUserJourney } from '@/hooks/useUserJourney';
import { useOnboarding } from '@/hooks/useOnboarding';
import { toast } from 'sonner';
import type { EmotionType } from '@/types/breathing';

// Type for breathing technique from DB
type BreathingTechnique = NonNullable<ReturnType<typeof useBreathingTechniques>['data']>[number];

export default function Home() {
  const navigate = useNavigate();
  const { usuario, loading: authLoading, signOut } = useAuth();
  const { data: activeJourney } = useActiveUserJourney();
  const { isComplete: onboardingComplete, isLoading: onboardingLoading } = useOnboarding();

  const [showMoodModal, setShowMoodModal] = useState(false);
  const [showBreathingSelector, setShowBreathingSelector] = useState(false);
  const [showBreathPacer, setShowBreathPacer] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showMealModal, setShowMealModal] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);

  // Redirect to onboarding if not logged in and not completed
  useEffect(() => {
    if (!authLoading && !onboardingLoading && !usuario && !onboardingComplete) {
      navigate('/onboarding', { replace: true });
    }
  }, [authLoading, onboardingLoading, usuario, onboardingComplete, navigate]);

  const firstName = usuario?.nome_completo?.split(' ')[0];

  // Memoized date calculations
  const { formattedDate, greeting } = useMemo(() => {
    const today = new Date();
    const dateString = today.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
    const formatted = dateString.charAt(0).toUpperCase() + dateString.slice(1);
    const hour = today.getHours();
    const greet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
    return { formattedDate: formatted, greeting: greet };
  }, []);

  const handleSessionComplete = useCallback((technique: string, duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    const timeStr = minutes > 0 ? `${minutes}min ${seconds}s` : `${seconds}s`;

    toast.success(`${technique} concluída!`, {
      description: `Você praticou por ${timeStr}. Continue assim!`,
      duration: 5000,
    });

    setShowBreathPacer(false);
    setShowMeditation(false);
    setSelectedTechnique(null);
  }, []);

  const handleTechniqueSelect = useCallback((technique: BreathingTechnique) => {
    setSelectedTechnique(technique);
    setShowBreathingSelector(false);
    setShowBreathPacer(true);
  }, []);

  // Memoized Quick Actions handlers
  const handleMoodCheck = useCallback(() => setShowMoodModal(true), []);
  const handleBreathing = useCallback(() => setShowBreathingSelector(true), []);
  const handleMeditation = useCallback(() => setShowMeditation(true), []);
  const handleNutrition = useCallback(() => setShowMealModal(true), []);
  const handleJournal = useCallback(() => navigate('/journal'), [navigate]);
  const handleInsights = useCallback(() => navigate('/insights'), [navigate]);
  const handleJourneys = useCallback(() => navigate('/journeys'), [navigate]);
  const handleAnimationStudio = useCallback(() => navigate('/animation-studio'), [navigate]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
  }), []);

  return (
    <div className="min-h-[100dvh] flex flex-col pb-32 bg-background relative overflow-hidden">
      {/* Subtle Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/4 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-secondary/4 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-40 right-0 w-[300px] h-[300px] rounded-full bg-accent/3 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, delay: 4, ease: 'easeInOut' }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative pt-12 px-6 pb-8 z-10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary/10 border border-primary/20"
            >
              <LeafIcon size={32} className="text-primary" />
            </motion.div>
            <div>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-xl font-medium text-foreground"
              >
                {greeting}{firstName ? `, ${firstName}` : ''}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-sm text-muted-foreground"
              >
                {formattedDate}
              </motion.p>
            </div>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="flex items-center gap-2"
          >
            {!usuario ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/auth')}
                className="gap-2 h-11 px-4 text-sm font-medium rounded-xl"
              >
                <SignInIcon size={18} />
                Entrar
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                {usuario.tipo_usuario === 'socio' && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate('/admin')}
                    className="w-11 h-11 rounded-xl bg-muted/50 hover:bg-muted"
                  >
                    <SettingsIcon size={22} className="text-muted-foreground" />
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await signOut();
                    navigate('/');
                  }}
                  className="gap-2 h-11 px-4 text-sm font-medium rounded-xl"
                >
                  <SignOutIcon size={18} />
                  Sair
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 px-6 space-y-8 relative z-10"
      >
        {/* Active Journey Banner */}
        {activeJourney && (
          <motion.div variants={itemVariants}>
            <ActiveJourneyBanner
              journeyTitle={activeJourney.journey.title}
              journeyIcon={activeJourney.journey.icon}
              currentDay={activeJourney.current_day}
              totalDays={activeJourney.journey.duration_days}
              streak={activeJourney.streak_count}
              themeColor={activeJourney.journey.theme_color}
              onClick={handleJourneys}
            />
          </motion.div>
        )}

        {/* Garden Widget - Gamification */}
        <motion.div variants={itemVariants}>
          <GardenWidget />
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center gap-2 mb-5">
            <h2 className="section-title text-base font-semibold text-muted-foreground dark:text-foreground/85 uppercase tracking-wider flex items-center gap-2">
              <span className="section-indicator w-2 h-2 rounded-full bg-primary" />
              Ações rápidas
            </h2>
            <ContextualHelp helpKey="quick-actions" size="sm" variant="subtle" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <QuickActionCard
              illustration={EmotionsIllustration}
              label="Emoções"
              color="joy"
              onClick={handleMoodCheck}
              delay={0.1}
            />
            <QuickActionCard
              illustration={BreatheIllustration}
              label="Respirar"
              color="calm"
              onClick={handleBreathing}
              delay={0.15}
            />
            <QuickActionCard
              illustration={MeditateIllustration}
              label="Meditar"
              color="meditate"
              onClick={handleMeditation}
              delay={0.2}
            />
            <QuickActionCard
              illustration={JourneyIllustration}
              label="Jornadas"
              color="journey"
              onClick={handleJourneys}
              delay={0.25}
            />
            <QuickActionCard
              illustration={JournalIllustration}
              label="Diário"
              color="trust"
              onClick={handleJournal}
              delay={0.3}
            />
            <QuickActionCard
              illustration={NutritionIllustration}
              label="Nutrição"
              color="nutrition"
              onClick={handleNutrition}
              delay={0.35}
            />
            <QuickActionCard
              illustration={InsightsIllustration}
              label="Insights"
              color="secondary"
              onClick={handleInsights}
              delay={0.4}
            />
            {usuario?.tipo_usuario === 'socio' && (
              <QuickActionCard
                illustration={StudioIllustration}
                label="Studio"
                color="studio"
                onClick={handleAnimationStudio}
                delay={0.45}
              />
            )}
          </div>
        </motion.section>

        {/* Daily Guidance Card */}
        <motion.div variants={itemVariants}>
          <DailyGuidanceCard onGuideClick={() => navigate('/guide')} />
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-4" />
      </motion.main>

      {/* Floating Action Button - Enhanced size and interaction */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleMoodCheck}
        className="fixed bottom-28 right-6 w-[60px] h-[60px] rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center z-40 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
        aria-label="Fazer check-in emocional"
      >
        <PlusIcon size={28} />
      </motion.button>

      <BottomNavigation />

      {/* Mood Check Modal */}
      <MoodCheckModal
        isOpen={showMoodModal}
        onClose={() => setShowMoodModal(false)}
      />

      {/* Meal Check Modal */}
      <MealCheckModal
        isOpen={showMealModal}
        onClose={() => setShowMealModal(false)}
        onSuggestBreathing={() => {
          setShowMealModal(false);
          setShowBreathingSelector(true);
        }}
      />

      {/* Breathing Technique Selector */}
      <BreathingTechniqueSelector
        isOpen={showBreathingSelector}
        onClose={() => setShowBreathingSelector(false)}
        onSelect={handleTechniqueSelect}
      />

      {/* Overlays */}
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
            onComplete={(duration) => handleSessionComplete(selectedTechnique.pattern_name, duration)}
          />
        )}

        {showMeditation && (
          <MeditationPlayer
            key="meditation-player"
            onClose={() => setShowMeditation(false)}
            onComplete={(duration) => handleSessionComplete('Meditação', duration)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
