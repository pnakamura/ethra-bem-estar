import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, Check, Wind, Moon, BookOpen, Compass, Brain, Heart, Target, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { OnboardingSlide, ProgressDots } from '@/components/onboarding/OnboardingSlide';
import { GoalSelector } from '@/components/onboarding/GoalSelector';
import { ExperienceLevelSelector } from '@/components/onboarding/ExperienceLevel';
import { TimePreference } from '@/components/onboarding/TimePreference';
import { MiniBreathingExperience } from '@/components/onboarding/MiniBreathingExperience';
import { useOnboarding, type UserGoal, type ExperienceLevel } from '@/hooks/useOnboarding';

const GOAL_LABELS: Record<UserGoal, string> = {
  reduce_stress: 'Reduzir estresse',
  sleep_better: 'Dormir melhor',
  focus: 'Foco e clareza',
  self_knowledge: 'Autoconhecimento',
  emotional_balance: 'Equilíbrio emocional',
  mindfulness: 'Mindfulness',
};

const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  beginner: 'Iniciante',
  intermediate: 'Intermediário',
  advanced: 'Experiente',
};

interface Recommendation {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const getRecommendations = (goals: UserGoal[]): Recommendation[] => {
  const recs: Recommendation[] = [];

  if (goals.includes('reduce_stress')) {
    recs.push({
      icon: <Wind className="w-5 h-5" />,
      title: 'Respiração 4-7-8',
      description: 'Técnica calmante para alívio imediato',
    });
  }
  if (goals.includes('sleep_better')) {
    recs.push({
      icon: <Moon className="w-5 h-5" />,
      title: 'Meditação Noturna',
      description: 'Sons e guias para dormir melhor',
    });
  }
  if (goals.includes('focus')) {
    recs.push({
      icon: <Target className="w-5 h-5" />,
      title: 'Respiração Energizante',
      description: 'Aumente seu foco e concentração',
    });
  }
  if (goals.includes('self_knowledge')) {
    recs.push({
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Diário Emocional',
      description: 'Registre e compreenda suas emoções',
    });
  }
  if (goals.includes('emotional_balance')) {
    recs.push({
      icon: <Heart className="w-5 h-5" />,
      title: 'Jornadas Guiadas',
      description: 'Programas de 7 dias para equilíbrio',
    });
  }
  if (goals.includes('mindfulness')) {
    recs.push({
      icon: <Compass className="w-5 h-5" />,
      title: 'Guias Espirituais',
      description: 'Conversas com mentores virtuais',
    });
  }

  // Default recommendations if none match
  if (recs.length === 0) {
    recs.push({
      icon: <Wind className="w-5 h-5" />,
      title: 'Técnicas de Respiração',
      description: 'Comece com práticas simples',
    });
  }

  return recs.slice(0, 3);
};

const getPersonalizedMessage = (goals: UserGoal[], level: ExperienceLevel | null): string => {
  if (goals.includes('reduce_stress') && level === 'beginner') {
    return 'Você está no lugar certo! Vamos começar com práticas simples e poderosas para aliviar o estresse do dia a dia.';
  }
  if (goals.includes('sleep_better')) {
    return 'Noites tranquilas estão a caminho. Temos meditações especiais para ajudar você a relaxar e dormir melhor.';
  }
  if (goals.includes('focus') && level === 'advanced') {
    return 'Ótimo! Vamos aprofundar sua prática com técnicas avançadas para máxima concentração e clareza mental.';
  }
  if (goals.includes('self_knowledge')) {
    return 'A jornada do autoconhecimento começa aqui. O diário emocional e os insights vão te ajudar a se entender melhor.';
  }
  if (level === 'beginner') {
    return 'Bem-vindo(a) ao mundo da meditação! Preparamos práticas gentis para você começar sua jornada.';
  }
  if (level === 'advanced') {
    return 'Que bom ter você aqui! O ETHRA tem recursos avançados para enriquecer sua prática.';
  }
  return 'Sua jornada de bem-estar começa agora. O ETHRA vai te guiar em cada passo com práticas personalizadas.';
};

export default function Onboarding() {
  const navigate = useNavigate();
  const {
    preferences,
    currentStep,
    totalSteps,
    setCurrentStep,
    setGoals,
    setExperienceLevel,
    setPreferredTime,
    completeOnboarding,
  } = useOnboarding();

  const [breathingCompleted, setBreathingCompleted] = useState(false);

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return preferences.goals.length > 0;
      case 2: return preferences.experienceLevel !== null;
      case 3: return preferences.preferredTime !== null;
      case 4: return true;
      case 5: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    completeOnboarding();
    navigate('/');
  };

  const handleSkipToAuth = () => {
    completeOnboarding();
    navigate('/landing');
  };

  const recommendations = getRecommendations(preferences.goals);

  const renderSlide = () => {
    switch (currentStep) {
      case 0:
        return (
          <OnboardingSlide>
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
              {/* Logo Animation with sage theme */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="relative mb-8"
              >
                <motion.div
                  className="w-32 h-32 rounded-full flex items-center justify-center shadow-xl btn-primary-gradient dark:btn-glow-primary"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Leaf className="w-16 h-16 text-secondary-foreground" />
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-secondary/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="font-display text-6xl font-light text-foreground mb-3 tracking-tight dark:text-glow"
              >
                ETHRA
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="font-display text-2xl font-light mb-4 text-muted-foreground"
              >
                Encontre sua paz interior
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="font-body text-muted-foreground text-base max-w-xs"
              >
                Meditação, respiração e autoconhecimento em um só lugar
              </motion.p>
            </div>
          </OnboardingSlide>
        );

      case 1:
        return (
          <OnboardingSlide>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg btn-primary-gradient dark:btn-glow-primary"
              >
                <Brain className="w-7 h-7 text-secondary-foreground" />
              </motion.div>
              <h2 className="font-display text-3xl font-light text-foreground mb-2 dark:text-glow">
                O que te traz ao ETHRA?
              </h2>
              <p className="font-body text-muted-foreground">
                Nos conte seus objetivos para personalizar sua experiência
              </p>
            </div>
            <GoalSelector
              selected={preferences.goals}
              onChange={setGoals}
            />
          </OnboardingSlide>
        );

      case 2:
        return (
          <OnboardingSlide>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg guide-avatar dark:card-glow"
              >
                <Compass className="w-7 h-7 text-secondary dark:icon-glow-secondary" />
              </motion.div>
              <h2 className="font-display text-3xl font-light text-foreground mb-2 dark:text-glow">
                Qual sua experiência?
              </h2>
              <p className="font-body text-muted-foreground">
                Isso nos ajuda a recomendar práticas ideais para você
              </p>
            </div>
            <ExperienceLevelSelector
              selected={preferences.experienceLevel}
              onChange={setExperienceLevel}
            />
          </OnboardingSlide>
        );

      case 3:
        return (
          <OnboardingSlide>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg btn-primary-gradient dark:btn-glow-primary"
              >
                <Moon className="w-7 h-7 text-secondary-foreground" />
              </motion.div>
              <h2 className="font-display text-3xl font-light text-foreground mb-2 dark:text-glow">
                Melhor momento para praticar?
              </h2>
              <p className="font-body text-muted-foreground">
                Vamos te lembrar no horário ideal
              </p>
            </div>
            <TimePreference
              selected={preferences.preferredTime}
              onChange={setPreferredTime}
            />
          </OnboardingSlide>
        );

      case 4:
        return (
          <OnboardingSlide>
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg btn-primary-gradient dark:btn-glow-primary"
              >
                <Wind className="w-7 h-7 text-secondary-foreground" />
              </motion.div>
              <h2 className="font-display text-3xl font-light text-foreground mb-2 dark:text-glow">
                Experimente agora!
              </h2>
              <p className="font-body text-muted-foreground">
                Uma breve sessão de respiração para relaxar
              </p>
            </div>
            <MiniBreathingExperience
              onComplete={() => {
                setBreathingCompleted(true);
                handleNext();
              }}
              onSkip={handleNext}
            />
          </OnboardingSlide>
        );

      case 5:
        return (
          <OnboardingSlide>
            <div className="flex-1 flex flex-col items-center text-center px-4 py-4 overflow-y-auto">
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-24 h-24 rounded-2xl flex items-center justify-center mb-4 shadow-xl btn-primary-gradient dark:btn-glow-primary"
              >
                {breathingCompleted ? (
                  <Check className="w-12 h-12 text-secondary-foreground" />
                ) : (
                  <Leaf className="w-12 h-12 text-secondary-foreground" />
                )}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display text-4xl font-light text-foreground mb-2 dark:text-glow"
              >
                {breathingCompleted ? 'Incrível! 🌿' : 'Tudo pronto!'}
              </motion.h2>

              {/* Personalized message */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-body text-muted-foreground text-sm mb-4 max-w-xs leading-relaxed"
              >
                {getPersonalizedMessage(preferences.goals, preferences.experienceLevel)}
              </motion.p>

              {/* Profile summary card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-full max-w-xs onboarding-card mb-4"
              >
                <h3 className="font-display text-base font-medium text-foreground mb-3">Seu Perfil</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {preferences.goals.map((goal) => (
                    <span
                      key={goal}
                      className="px-3 py-1.5 rounded-full text-xs font-body font-medium btn-primary-gradient text-secondary-foreground shadow-sm"
                    >
                      {GOAL_LABELS[goal]}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs font-body text-muted-foreground">
                  <span>Nível: {preferences.experienceLevel ? EXPERIENCE_LABELS[preferences.experienceLevel] : '-'}</span>
                </div>
              </motion.div>

              {/* Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-xs mb-4"
              >
                <h3 className="font-display text-base font-medium text-foreground mb-3 text-left">
                  Recomendamos para você:
                </h3>
                <div className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={rec.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 p-4 bg-card/50 rounded-2xl border border-border/30 shadow-sm dark:card-elevated-dark"
                    >
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-secondary-foreground shadow-sm btn-primary-gradient">
                        {rec.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-body text-sm font-medium text-foreground">{rec.title}</p>
                        <p className="font-body text-xs text-muted-foreground mt-0.5">{rec.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col gap-3 w-full max-w-xs"
              >
                <Button
                  onClick={handleSkipToAuth}
                  size="lg"
                  className="h-14 text-lg font-body font-medium rounded-2xl btn-primary-gradient dark:btn-glow-primary"
                >
                  Criar conta
                </Button>
                <Button
                  variant="outline"
                  onClick={handleComplete}
                  className="h-12 rounded-2xl border-border/50 hover:bg-muted font-body text-foreground"
                >
                  Explorar primeiro
                </Button>
              </motion.div>
            </div>
          </OnboardingSlide>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden relative">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Animated organic background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-60 dark:opacity-40"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary) / 0.12) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-50 dark:opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-40 dark:opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(var(--secondary) / 0.08) 0%, transparent 60%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 4, ease: 'easeInOut' }}
        />
      </div>

      {/* Header with progress */}
      <div className="sticky top-0 z-10 px-4 py-4 safe-top header-blur">
        <div className="flex items-center justify-between mb-4">
          {currentStep > 0 && currentStep < 5 ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="rounded-full hover:bg-muted text-foreground"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          ) : (
            <div className="w-10" />
          )}

          <ProgressDots total={totalSteps} current={currentStep} />

          {currentStep < 4 && currentStep > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                completeOnboarding();
                navigate('/');
              }}
              className="text-muted-foreground text-sm font-body hover:bg-muted"
            >
              Pular
            </Button>
          ) : (
            <div className="w-10" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col px-4 pb-safe relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {renderSlide()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {currentStep < 4 && (
          <motion.div
            className="py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              size="lg"
              className="w-full h-14 text-lg font-body font-medium rounded-2xl gap-2 btn-primary-gradient dark:btn-glow-primary disabled:opacity-50"
            >
              {currentStep === 0 ? 'Começar jornada' : 'Continuar'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
