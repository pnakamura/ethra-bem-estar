import React from 'react';
import { motion } from 'framer-motion';
import { Check, Brain, Moon, Target, Sparkles, Heart, Leaf } from 'lucide-react';
import type { UserGoal } from '@/hooks/useOnboarding';

interface GoalOption {
  id: UserGoal;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const GOALS: GoalOption[] = [
  { id: 'reduce_stress', label: 'Reduzir estresse', icon: <Brain className="w-6 h-6" />, color: '#9B87F5' },
  { id: 'sleep_better', label: 'Dormir melhor', icon: <Moon className="w-6 h-6" />, color: '#6366F1' },
  { id: 'focus', label: 'Foco e clareza', icon: <Target className="w-6 h-6" />, color: '#FBBF24' },
  { id: 'self_knowledge', label: 'Autoconhecimento', icon: <Sparkles className="w-6 h-6" />, color: '#EC4899' },
  { id: 'emotional_balance', label: 'Equilíbrio emocional', icon: <Heart className="w-6 h-6" />, color: '#F97316' },
  { id: 'mindfulness', label: 'Mindfulness', icon: <Leaf className="w-6 h-6" />, color: '#10B981' },
];

interface GoalSelectorProps {
  selected: UserGoal[];
  onChange: (goals: UserGoal[]) => void;
  maxSelections?: number;
}

export function GoalSelector({ selected, onChange, maxSelections = 3 }: GoalSelectorProps) {
  const toggleGoal = (goalId: UserGoal) => {
    if (selected.includes(goalId)) {
      onChange(selected.filter(g => g !== goalId));
    } else if (selected.length < maxSelections) {
      onChange([...selected, goalId]);
    }
  };

  return (
    <div className="w-full space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Selecione até {maxSelections} objetivos
      </p>
      <div className="grid grid-cols-2 gap-3">
        {GOALS.map((goal, index) => {
          const isSelected = selected.includes(goal.id);
          const isDisabled = !isSelected && selected.length >= maxSelections;

          return (
            <motion.button
              key={goal.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: index * 0.08,
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              whileHover={{ scale: isDisabled ? 1 : 1.03 }}
              whileTap={{ scale: isDisabled ? 1 : 0.97 }}
              onClick={() => toggleGoal(goal.id)}
              disabled={isDisabled}
              className={`
                relative p-4 rounded-2xl border-2 transition-all duration-300
                flex flex-col items-center gap-3 text-center
                ${isSelected 
                  ? 'border-[#9B87F5] bg-[#9B87F5]/10' 
                  : 'border-border bg-card hover:border-[#9B87F5]/50'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{
                boxShadow: isSelected ? `0 0 20px ${goal.color}30` : undefined,
              }}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: goal.color }}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
              )}
              <motion.div 
                style={{ color: goal.color }}
                animate={isSelected ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {goal.icon}
              </motion.div>
              <span className={`text-sm font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                {goal.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
