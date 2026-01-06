import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Flower2, TreePine } from 'lucide-react';
import type { ExperienceLevel as ExperienceLevelType } from '@/hooks/useOnboarding';

interface ExperienceOption {
  id: ExperienceLevelType;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const EXPERIENCES: ExperienceOption[] = [
  { 
    id: 'beginner', 
    label: 'Iniciante', 
    description: 'Nunca pratiquei meditação',
    icon: <Sprout className="w-8 h-8" />,
    color: '#34D399'
  },
  { 
    id: 'intermediate', 
    label: 'Intermediário', 
    description: 'Já experimentei algumas vezes',
    icon: <Flower2 className="w-8 h-8" />,
    color: '#A78BFA'
  },
  { 
    id: 'advanced', 
    label: 'Experiente', 
    description: 'Pratico regularmente',
    icon: <TreePine className="w-8 h-8" />,
    color: '#8B5CF6'
  },
];

interface ExperienceLevelProps {
  selected: ExperienceLevelType | null;
  onChange: (level: ExperienceLevelType) => void;
}

export function ExperienceLevelSelector({ selected, onChange }: ExperienceLevelProps) {
  return (
    <div className="w-full space-y-3">
      {EXPERIENCES.map((exp, index) => {
        const isSelected = selected === exp.id;

        return (
          <motion.button
            key={exp.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              delay: index * 0.12,
              type: 'spring',
              stiffness: 300,
              damping: 25
            }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(exp.id)}
            className={`
              w-full p-5 rounded-2xl border-2 transition-all duration-300
              flex items-center gap-4 text-left
              ${isSelected 
                ? 'border-[#9B87F5] bg-[#9B87F5]/10' 
                : 'border-border bg-card hover:border-[#9B87F5]/50'
              }
            `}
            style={{
              boxShadow: isSelected ? `0 0 25px ${exp.color}25` : undefined,
            }}
          >
            <motion.div 
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ 
                backgroundColor: isSelected ? exp.color : 'hsl(var(--muted))',
                color: isSelected ? 'white' : exp.color
              }}
              animate={isSelected ? { rotate: [0, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {exp.icon}
            </motion.div>
            <div className="flex-1">
              <h3 className={`font-semibold ${isSelected ? 'text-foreground' : 'text-foreground'}`}>
                {exp.label}
              </h3>
              <p className="text-sm text-muted-foreground">{exp.description}</p>
            </div>
            <div 
              className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${isSelected ? 'border-[#9B87F5]' : 'border-muted-foreground/30'}
              `}
              style={{ backgroundColor: isSelected ? exp.color : 'transparent' }}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="w-3 h-3 rounded-full bg-white"
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
