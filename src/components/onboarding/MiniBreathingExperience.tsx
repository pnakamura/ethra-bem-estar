import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Phase = 'idle' | 'inhale' | 'holdIn' | 'exhale' | 'holdOut' | 'complete';

const PHASE_LABELS: Record<Phase, string> = {
  idle: 'Preparar',
  inhale: 'Inspire',
  holdIn: 'Segure',
  exhale: 'Expire',
  holdOut: 'Segure',
  complete: 'Concluído!',
};

// Box Breathing: 4-4-4-4 seconds
const PATTERN = {
  inhale: 4000,
  holdIn: 4000,
  exhale: 4000,
  holdOut: 4000,
};

const TOTAL_CYCLES = 3;

// Purple gradient colors
const PHASE_COLORS: Record<Phase, { from: string; to: string }> = {
  idle: { from: '#9B87F5', to: '#7C3AED' },
  inhale: { from: '#A78BFA', to: '#8B5CF6' },
  holdIn: { from: '#8B5CF6', to: '#7C3AED' },
  exhale: { from: '#7C3AED', to: '#6D28D9' },
  holdOut: { from: '#6D28D9', to: '#5B21B6' },
  complete: { from: '#10B981', to: '#059669' },
};

interface MiniBreathingExperienceProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function MiniBreathingExperience({ onComplete, onSkip }: MiniBreathingExperienceProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [cycle, setCycle] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(4);

  const getPhaseScale = () => {
    switch (phase) {
      case 'inhale': return 1.35;
      case 'holdIn': return 1.35;
      case 'exhale': return 1;
      case 'holdOut': return 1;
      default: return 1.15;
    }
  };

  const runBreathingCycle = useCallback(() => {
    const phases: { phase: Phase; duration: number }[] = [
      { phase: 'inhale', duration: PATTERN.inhale },
      { phase: 'holdIn', duration: PATTERN.holdIn },
      { phase: 'exhale', duration: PATTERN.exhale },
      { phase: 'holdOut', duration: PATTERN.holdOut },
    ];

    let currentCycle = 0;
    let phaseIndex = 0;

    const runPhase = () => {
      if (currentCycle >= TOTAL_CYCLES) {
        setPhase('complete');
        setIsRunning(false);
        setTimeout(onComplete, 1500);
        return;
      }

      const { phase, duration } = phases[phaseIndex];
      setPhase(phase);
      setCountdown(duration / 1000);

      // Countdown timer
      let remaining = duration / 1000;
      const countdownInterval = setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
          setCountdown(remaining);
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(countdownInterval);
        phaseIndex++;
        if (phaseIndex >= phases.length) {
          phaseIndex = 0;
          currentCycle++;
          setCycle(currentCycle);
        }
        runPhase();
      }, duration);
    };

    runPhase();
  }, [onComplete]);

  const startExperience = () => {
    setIsRunning(true);
    setCycle(0);
    runBreathingCycle();
  };

  const colors = PHASE_COLORS[phase];

  return (
    <div className="w-full flex flex-col items-center justify-center px-4">
      {/* Breathing Circle - Mobile optimized size */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-8">
        {/* Outer glow ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${colors.from}30 0%, transparent 70%)`,
          }}
          animate={{
            scale: isRunning ? [1, 1.2, 1] : 1,
            opacity: isRunning ? [0.4, 0.7, 0.4] : 0.4,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Main circle with gradient */}
        <motion.div
          className="relative w-36 h-36 rounded-full flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors.from} 0%, ${colors.to} 100%)`,
            boxShadow: `0 0 40px ${colors.from}50`,
          }}
          animate={{
            scale: getPhaseScale(),
          }}
          transition={{
            duration: phase === 'inhale' || phase === 'exhale' ? 4 : 0.3,
            ease: 'easeInOut',
          }}
        >
          {/* Inner content */}
          <div className="text-center text-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                {phase === 'complete' ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Check className="w-12 h-12 mb-1" />
                  </motion.div>
                ) : isRunning ? (
                  <motion.span 
                    key={countdown}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-bold mb-1"
                  >
                    {countdown}
                  </motion.span>
                ) : null}
                <span className="text-xl font-semibold">
                  {PHASE_LABELS[phase]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Ripple rings with purple colors */}
        {isRunning && phase !== 'complete' && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${colors.from}50` }}
              animate={{
                scale: [1, 1.6],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: `2px solid ${colors.to}40` }}
              animate={{
                scale: [1, 1.9],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
                delay: 0.6,
              }}
            />
          </>
        )}
      </div>

      {/* Progress */}
      {isRunning && phase !== 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-center"
        >
          <div className="flex items-center gap-2 justify-center mb-2">
            {Array.from({ length: TOTAL_CYCLES }).map((_, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: i <= cycle ? '#9B87F5' : 'hsl(var(--muted))',
                }}
                animate={i === cycle ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            Ciclo {cycle + 1} de {TOTAL_CYCLES}
          </span>
        </motion.div>
      )}

      {/* Actions - Large buttons for mobile */}
      {!isRunning && phase !== 'complete' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 w-full max-w-xs"
        >
          <Button
            onClick={startExperience}
            size="lg"
            className="h-16 text-lg font-semibold rounded-2xl gap-3"
            style={{
              background: 'linear-gradient(135deg, #9B87F5 0%, #7C3AED 100%)',
            }}
          >
            <Play className="w-6 h-6" />
            Iniciar respiração
          </Button>
          <Button
            variant="ghost"
            onClick={onSkip}
            className="h-12 text-muted-foreground hover:text-foreground"
          >
            Pular esta etapa
          </Button>
        </motion.div>
      )}

      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-lg font-medium text-foreground mb-1">
            Excelente! 🎉
          </p>
          <p className="text-muted-foreground">
            Você completou a prática!
          </p>
        </motion.div>
      )}
    </div>
  );
}
