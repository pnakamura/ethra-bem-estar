import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GuideCard } from '@/components/guide/GuideCard';
import { useGuides, useSetPreferredGuide, type SpiritualGuide } from '@/hooks/useGuides';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';

export default function GuideSelect() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data: guides, isLoading } = useGuides();
  const setPreferredGuide = useSetPreferredGuide();
  const [selectedGuide, setSelectedGuide] = useState<SpiritualGuide | null>(null);

  const isAuthenticated = !!user;

  const handleContinue = async () => {
    if (!selectedGuide || !isAuthenticated) return;
    
    await setPreferredGuide.mutateAsync(selectedGuide.id);
    navigate('/guide', { state: { guideId: selectedGuide.id } });
  };

  const handleBack = () => {
    navigate('/');
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  // Show login required message if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-10 glass border-b border-border/50">
          <div className="flex items-center gap-3 px-4 py-4 safe-top">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Escolha seu Guia</h1>
            </div>
          </div>
        </div>

        {/* Login Required Message */}
        <div className="px-4 py-12 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-sm"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <LogIn className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-3">Login Necessário</h2>
            <p className="text-muted-foreground mb-8">
              Para escolher um guia espiritual e iniciar sua jornada de autoconhecimento, 
              é necessário estar conectado à sua conta.
            </p>
            <div className="flex flex-col gap-3">
              <Button
                onClick={() => navigate('/auth')}
                className="w-full h-12 text-base font-semibold rounded-xl gap-2"
              >
                <LogIn className="w-5 h-5" />
                Fazer Login
              </Button>
              <Button
                variant="outline"
                onClick={handleBack}
                className="w-full h-12 text-base rounded-xl"
              >
                Voltar para Início
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 glass border-b border-border/50">
        <div className="flex items-center gap-3 px-4 py-4 safe-top">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Escolha seu Guia</h1>
            <p className="text-xs text-muted-foreground">Selecione a abordagem que mais ressoa com você</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-32">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Seu Guia Interior</h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Cada guia possui uma perspectiva única. Escolha aquele cuja sabedoria 
            ressoa com sua jornada de autoconhecimento.
          </p>
        </motion.div>

        {/* Guides Grid */}
        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid gap-4"
          >
            <AnimatePresence>
              {guides?.map((guide, index) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <GuideCard
                    guide={guide}
                    isSelected={selectedGuide?.id === guide.id}
                    onSelect={setSelectedGuide}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Bottom CTA */}
      <AnimatePresence>
        {selectedGuide && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 glass border-t border-border/50 safe-bottom"
          >
            <Button
              onClick={handleContinue}
              disabled={setPreferredGuide.isPending}
              className="w-full h-14 text-base font-semibold rounded-xl gap-2"
            >
              {setPreferredGuide.isPending ? (
                'Salvando...'
              ) : (
                <>
                  Continuar com {selectedGuide.name}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
