import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Coffee, Sunset, Moon, Clock } from 'lucide-react';
import type { PreferredTime } from '@/hooks/useOnboarding';

interface TimeOption {
  id: PreferredTime;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const TIMES: TimeOption[] = [
  { id: 'morning', label: 'Ao acordar', icon: <Sun className="w-6 h-6" />, color: '#FBBF24' },
  { id: 'lunch', label: 'Durante o almoço', icon: <Coffee className="w-6 h-6" />, color: '#F97316' },
  { id: 'evening', label: 'Fim do dia', icon: <Sunset className="w-6 h-6" />, color: '#F472B6' },
  { id: 'bedtime', label: 'Antes de dormir', icon: <Moon className="w-6 h-6" />, color: '#818CF8' },
  { id: 'anytime', label: 'Quando precisar', icon: <Clock className="w-6 h-6" />, color: '#A855F7' },
];

interface TimePreferenceProps {
  selected: PreferredTime | null;
  onChange: (time: PreferredTime) => void;
}

export function TimePreference({ selected, onChange }: TimePreferenceProps) {
  return (
    <div className="w-full grid grid-cols-2 gap-3">
      {TIMES.map((time, index) => {
        const isSelected = selected === time.id;
        const isFullWidth = index === TIMES.length - 1 && TIMES.length % 2 !== 0;

        return (
          <motion.button
            key={time.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.08,
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onChange(time.id)}
            className={`
              p-4 rounded-2xl border-2 transition-all duration-300
              flex flex-col items-center gap-3 text-center
              ${isFullWidth ? 'col-span-2' : ''}
              ${isSelected 
                ? 'border-[#9B87F5] bg-[#9B87F5]/10' 
                : 'border-border bg-card hover:border-[#9B87F5]/50'
              }
            `}
            style={{
              boxShadow: isSelected ? `0 0 20px ${time.color}30` : undefined,
            }}
          >
            <motion.div 
              style={{ color: time.color }}
              animate={isSelected ? { 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              } : {}}
              transition={{ duration: 0.4 }}
            >
              {time.icon}
            </motion.div>
            <span className={`text-sm font-medium ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
              {time.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
