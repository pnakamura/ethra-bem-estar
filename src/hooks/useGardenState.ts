import { useMemo } from 'react';
import { useGamificationStats } from './useGamificationStats';

export interface GardenStage {
  id: number;
  plant: string;
  name: string;
  message: string;
  bgClass: string;
  glowColor: string;
  minStreak: number;
}

export interface GardenCreature {
  id: string;
  emoji: string;
  name: string;
  animation: 'float' | 'bounce' | 'fly' | 'crawl' | 'pulse';
  unlockedAt: number; // achievements count or specific condition
}

export const GARDEN_STAGES: GardenStage[] = [
  {
    id: 0,
    plant: '🌱',
    name: 'Semente',
    message: 'Plante sua primeira semente de consciência',
    bgClass: 'from-stone-400/20 to-stone-500/10',
    glowColor: 'shadow-stone-500/20',
    minStreak: 0
  },
  {
    id: 1,
    plant: '🌿',
    name: 'Broto',
    message: 'Seu broto começa a crescer!',
    bgClass: 'from-emerald-400/20 to-green-500/10',
    glowColor: 'shadow-emerald-500/30',
    minStreak: 1
  },
  {
    id: 2,
    plant: '🌷',
    name: 'Flor',
    message: 'Uma bela flor desabrocha',
    bgClass: 'from-pink-400/20 to-rose-500/10',
    glowColor: 'shadow-pink-500/30',
    minStreak: 4
  },
  {
    id: 3,
    plant: '🌻',
    name: 'Girassol',
    message: 'Seu girassol brilha com força!',
    bgClass: 'from-yellow-400/20 to-amber-500/10',
    glowColor: 'shadow-yellow-500/30',
    minStreak: 8
  },
  {
    id: 4,
    plant: '🌳',
    name: 'Árvore',
    message: 'Uma árvore majestosa se ergue',
    bgClass: 'from-green-500/20 to-emerald-600/10',
    glowColor: 'shadow-green-500/30',
    minStreak: 15
  },
  {
    id: 5,
    plant: '🏯',
    name: 'Jardim Zen',
    message: 'Você alcançou a paz interior',
    bgClass: 'from-purple-400/20 to-violet-500/10',
    glowColor: 'shadow-purple-500/30',
    minStreak: 31
  }
];

export const GARDEN_CREATURES: GardenCreature[] = [
  { id: 'caterpillar', emoji: '🐛', name: 'Lagarta', animation: 'crawl', unlockedAt: 1 },
  { id: 'butterfly', emoji: '🦋', name: 'Borboleta', animation: 'fly', unlockedAt: 2 },
  { id: 'bee', emoji: '🐝', name: 'Abelha', animation: 'float', unlockedAt: 3 },
  { id: 'bird', emoji: '🐦', name: 'Pássaro', animation: 'fly', unlockedAt: 4 },
  { id: 'frog', emoji: '🐸', name: 'Sapinho', animation: 'bounce', unlockedAt: 5 },
  { id: 'peacock', emoji: '🦚', name: 'Pavão', animation: 'pulse', unlockedAt: 6 }
];

export function useGardenState() {
  const { data: stats, isLoading } = useGamificationStats();

  const currentStreak = stats?.sequencia_atual ?? 0;
  const bestStreak = stats?.melhor_sequencia ?? 0;
  const level = stats?.nivel ?? 1;
  const totalPoints = stats?.total_pontos ?? 0;
  const achievementsUnlocked = stats?.conquistas_desbloqueadas ?? 0;

  const currentStage = useMemo(() => {
    // Find the highest stage the user has reached
    for (let i = GARDEN_STAGES.length - 1; i >= 0; i--) {
      if (currentStreak >= GARDEN_STAGES[i].minStreak) {
        return GARDEN_STAGES[i];
      }
    }
    return GARDEN_STAGES[0];
  }, [currentStreak]);

  const nextStage = useMemo(() => {
    const currentIndex = GARDEN_STAGES.findIndex(s => s.id === currentStage.id);
    if (currentIndex < GARDEN_STAGES.length - 1) {
      return GARDEN_STAGES[currentIndex + 1];
    }
    return null;
  }, [currentStage]);

  const progressToNextStage = useMemo(() => {
    if (!nextStage) return 100;
    const currentMin = currentStage.minStreak;
    const nextMin = nextStage.minStreak;
    const progress = ((currentStreak - currentMin) / (nextMin - currentMin)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  }, [currentStage, nextStage, currentStreak]);

  const unlockedCreatures = useMemo(() => {
    return GARDEN_CREATURES.filter(c => achievementsUnlocked >= c.unlockedAt);
  }, [achievementsUnlocked]);

  const timeOfDay = useMemo((): 'morning' | 'afternoon' | 'evening' | 'night' => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  }, []);

  const weatherEffect = useMemo((): 'cloudy' | 'clearing' | 'sunny' | 'rainbow' => {
    // Weather based on recent activity and streak
    if (currentStreak === 0) return 'cloudy';
    if (currentStreak >= 7) return 'rainbow';
    if (currentStreak >= 3) return 'sunny';
    return 'clearing';
  }, [currentStreak]);

  return {
    // Stats
    currentStreak,
    bestStreak,
    level,
    totalPoints,
    achievementsUnlocked,
    
    // Garden state
    currentStage,
    nextStage,
    progressToNextStage,
    unlockedCreatures,
    
    // Environment
    timeOfDay,
    weatherEffect,
    
    // Loading
    isLoading
  };
}
