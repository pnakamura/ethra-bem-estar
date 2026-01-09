import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, Wind, Music, Compass, Sparkles } from 'lucide-react';
import { BottomNavigation } from '@/components/BottomNavigation';
import { BreathPacer } from '@/components/BreathPacer';
import { MeditationPlayer } from '@/components/MeditationPlayer';
import { BreathingTechniqueSelector } from '@/components/dashboard/BreathingTechniqueSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useFavoriteBreathingsWithDetails, useFavoriteMeditationsWithDetails, useFavoriteJourneysWithDetails } from '@/hooks/useFavorites';
import { useCreateBreathingSession } from '@/hooks/useBreathingSessions';
import { toast } from 'sonner';
import type { BreathingTechnique } from '@/types/admin';

export default function Favorites() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const { data: favoriteBreathings, isLoading: isLoadingBreathings } = useFavoriteBreathingsWithDetails();
  const { data: favoriteMeditations, isLoading: isLoadingMeditations } = useFavoriteMeditationsWithDetails();
  const { data: favoriteJourneys, isLoading: isLoadingJourneys } = useFavoriteJourneysWithDetails();
  
  const createBreathingSession = useCreateBreathingSession();

  const [showBreathPacer, setShowBreathPacer] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showBreathingSelector, setShowBreathingSelector] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState<BreathingTechnique | null>(null);
  const [breathingStartTime, setBreathingStartTime] = useState<number>(0);
  const [selectedMeditationId, setSelectedMeditationId] = useState<string | null>(null);

  const handleBreathingClick = (technique: BreathingTechnique) => {
    setSelectedTechnique(technique);
    setBreathingStartTime(Date.now());
    setShowBreathPacer(true);
  };

  const handleBreathingComplete = () => {
    if (selectedTechnique) {
      const durationMs = Date.now() - breathingStartTime;
      createBreathingSession.mutate({
        technique_name: selectedTechnique.pattern_name,
        technique_id: selectedTechnique.id,
        duration_ms: durationMs,
        cycles_completed: selectedTechnique.cycles,
      });
    }
    setShowBreathPacer(false);
    setSelectedTechnique(null);
  };

  const handleMeditationClick = (meditationId: string) => {
    setSelectedMeditationId(meditationId);
    setShowMeditation(true);
  };

  const handleMeditationComplete = () => {
    setShowMeditation(false);
    setSelectedMeditationId(null);
    toast.success('Meditação concluída!');
  };

  const handleJourneyClick = (journeyId: string) => {
    navigate('/journeys');
  };

  if (!user) {
    return (
      <div className="min-h-[100dvh] flex flex-col pb-28">
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <Heart className="w-16 h-16 text-muted-foreground mx-auto" />
            <h2 className="text-xl font-semibold">Faça login para ver seus favoritos</h2>
            <Button onClick={() => navigate('/auth')}>Entrar</Button>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  const totalFavorites = (favoriteBreathings?.length || 0) + (favoriteMeditations?.length || 0) + (favoriteJourneys?.length || 0);

  return (
    <div className="min-h-[100dvh] flex flex-col pb-28">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-rose-500/8 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-primary/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative pt-8 px-6 pb-4"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
              Meus Favoritos
            </h1>
            <p className="text-sm text-muted-foreground">
              {totalFavorites} {totalFavorites === 1 ? 'item salvo' : 'itens salvos'}
            </p>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 px-6 relative">
        <Tabs defaultValue="breathings" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="breathings" className="flex items-center gap-1.5">
              <Wind className="w-4 h-4" />
              <span className="hidden sm:inline">Respirações</span>
              {favoriteBreathings && favoriteBreathings.length > 0 && (
                <span className="text-xs bg-primary/20 text-primary px-1.5 rounded-full">
                  {favoriteBreathings.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="meditations" className="flex items-center gap-1.5">
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">Meditações</span>
              {favoriteMeditations && favoriteMeditations.length > 0 && (
                <span className="text-xs bg-primary/20 text-primary px-1.5 rounded-full">
                  {favoriteMeditations.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="journeys" className="flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span className="hidden sm:inline">Jornadas</span>
              {favoriteJourneys && favoriteJourneys.length > 0 && (
                <span className="text-xs bg-primary/20 text-primary px-1.5 rounded-full">
                  {favoriteJourneys.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Breathings Tab */}
          <TabsContent value="breathings" className="space-y-3">
            {isLoadingBreathings ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-2xl" />)}
              </div>
            ) : favoriteBreathings && favoriteBreathings.length > 0 ? (
              favoriteBreathings.map((technique, idx) => (
                <motion.button
                  key={technique.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleBreathingClick(technique)}
                  className="w-full p-4 rounded-2xl bg-card border border-border/50 flex items-center gap-4 text-left hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wind className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{technique.label}</h3>
                    <p className="text-sm text-muted-foreground truncate">{technique.pattern_name}</p>
                  </div>
                  <FavoriteButton type="breathing" itemId={technique.id} size="sm" />
                </motion.button>
              ))
            ) : (
              <EmptyState
                icon={<Wind className="w-12 h-12" />}
                title="Nenhuma respiração favorita"
                description="Explore técnicas de respiração e salve as suas preferidas"
                actionLabel="Explorar Técnicas"
                onAction={() => setShowBreathingSelector(true)}
              />
            )}
          </TabsContent>

          {/* Meditations Tab */}
          <TabsContent value="meditations" className="space-y-3">
            {isLoadingMeditations ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-20 rounded-2xl" />)}
              </div>
            ) : favoriteMeditations && favoriteMeditations.length > 0 ? (
              favoriteMeditations.map((track, idx) => (
                <motion.button
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleMeditationClick(track.id)}
                  className="w-full p-4 rounded-2xl bg-card border border-border/50 flex items-center gap-4 text-left hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Music className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{track.title}</h3>
                    <p className="text-sm text-muted-foreground">{track.duration_display}</p>
                  </div>
                  <FavoriteButton type="meditation" itemId={track.id} size="sm" />
                </motion.button>
              ))
            ) : (
              <EmptyState
                icon={<Music className="w-12 h-12" />}
                title="Nenhuma meditação favorita"
                description="Explore meditações guiadas e salve as suas preferidas"
                actionLabel="Explorar Meditações"
                onAction={() => setShowMeditation(true)}
              />
            )}
          </TabsContent>

          {/* Journeys Tab */}
          <TabsContent value="journeys" className="space-y-3">
            {isLoadingJourneys ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 rounded-2xl" />)}
              </div>
            ) : favoriteJourneys && favoriteJourneys.length > 0 ? (
              favoriteJourneys.map((journey, idx) => (
                <motion.button
                  key={journey.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => handleJourneyClick(journey.id)}
                  className="w-full p-4 rounded-2xl bg-card border border-border/50 flex items-center gap-4 text-left hover:border-primary/30 transition-colors"
                >
                  <span className="text-3xl">{journey.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{journey.title}</h3>
                      {journey.is_premium && (
                        <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {journey.duration_days} dias • {journey.difficulty || 'Iniciante'}
                    </p>
                  </div>
                  <FavoriteButton type="journey" itemId={journey.id} size="sm" />
                </motion.button>
              ))
            ) : (
              <EmptyState
                icon={<Compass className="w-12 h-12" />}
                title="Nenhuma jornada favorita"
                description="Explore jornadas de transformação e salve as suas preferidas"
                actionLabel="Explorar"
                onAction={() => navigate('/journeys')}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <BottomNavigation />

      {/* Breathing Pacer Overlay */}
      <AnimatePresence>
        {showBreathPacer && selectedTechnique && (
          <BreathPacer
            pattern={{
              inhale: selectedTechnique.inhale_ms,
              holdIn: selectedTechnique.hold_in_ms,
              exhale: selectedTechnique.exhale_ms,
              holdOut: selectedTechnique.hold_out_ms,
              name: selectedTechnique.pattern_name,
              description: selectedTechnique.description,
              cycles: selectedTechnique.cycles,
            }}
            emotionType="meditate"
            colorClass={selectedTechnique.color_class || undefined}
            bgClass={selectedTechnique.bg_class || undefined}
            backgroundAudioUrl={selectedTechnique.background_audio_url || undefined}
            explanation={selectedTechnique.explanation || undefined}
            onClose={() => {
              setShowBreathPacer(false);
              setSelectedTechnique(null);
            }}
            onComplete={handleBreathingComplete}
          />
        )}
      </AnimatePresence>

      {/* Meditation Player Overlay */}
      <AnimatePresence>
        {showMeditation && (
          <MeditationPlayer
            onClose={() => {
              setShowMeditation(false);
              setSelectedMeditationId(null);
            }}
            onComplete={handleMeditationComplete}
            initialTrackId={selectedMeditationId || undefined}
          />
        )}
      </AnimatePresence>

      {/* Breathing Technique Selector */}
      <BreathingTechniqueSelector
        isOpen={showBreathingSelector}
        onClose={() => setShowBreathingSelector(false)}
        onSelect={(technique) => {
          setShowBreathingSelector(false);
          handleBreathingClick(technique as BreathingTechnique);
        }}
      />
    </div>
  );
}

function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  actionLabel: string; 
  onAction: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="text-muted-foreground mx-auto mb-3">{icon}</div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <Button variant="outline" onClick={onAction}>
        {actionLabel}
      </Button>
    </motion.div>
  );
}
