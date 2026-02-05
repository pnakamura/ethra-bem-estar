import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import React from 'react';
import type { IconProps } from '@phosphor-icons/react';

interface IllustrationProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

interface QuickActionCardProps {
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  illustration?: React.FC<IllustrationProps>;
  emoji?: string;
  label: string;
  description?: string;
  color: 'primary' | 'secondary' | 'accent' | 'joy' | 'trust' | 'calm' | 'meditate' | 'nutrition' | 'journey' | 'studio';
  onClick: () => void;
  delay?: number;
}

const colorClasses = {
  primary: {
    bg: 'bg-primary/8',
    iconBg: 'bg-primary/15',
    text: 'text-primary',
    border: 'border-primary/15 hover:border-primary/30',
  },
  secondary: {
    bg: 'bg-secondary/8',
    iconBg: 'bg-secondary/15',
    text: 'text-secondary',
    border: 'border-secondary/15 hover:border-secondary/30',
  },
  accent: {
    bg: 'bg-accent/8',
    iconBg: 'bg-accent/15',
    text: 'text-accent',
    border: 'border-accent/15 hover:border-accent/30',
  },
  joy: {
    bg: 'bg-[hsl(var(--joy)/0.08)]',
    iconBg: 'bg-[hsl(var(--joy)/0.15)]',
    text: 'text-[hsl(var(--joy))]',
    border: 'border-[hsl(var(--joy)/0.15)] hover:border-[hsl(var(--joy)/0.3)]',
  },
  trust: {
    bg: 'bg-[hsl(var(--trust)/0.08)]',
    iconBg: 'bg-[hsl(var(--trust)/0.15)]',
    text: 'text-[hsl(var(--trust))]',
    border: 'border-[hsl(var(--trust)/0.15)] hover:border-[hsl(var(--trust)/0.3)]',
  },
  calm: {
    bg: 'bg-[hsl(var(--calm)/0.08)]',
    iconBg: 'bg-[hsl(var(--calm)/0.15)]',
    text: 'text-[hsl(var(--calm))]',
    border: 'border-[hsl(var(--calm)/0.15)] hover:border-[hsl(var(--calm)/0.3)]',
  },
  meditate: {
    bg: 'bg-[hsl(var(--meditate)/0.08)]',
    iconBg: 'bg-[hsl(var(--meditate)/0.15)]',
    text: 'text-[hsl(var(--meditate))]',
    border: 'border-[hsl(var(--meditate)/0.15)] hover:border-[hsl(var(--meditate)/0.3)]',
  },
  nutrition: {
    bg: 'bg-[hsl(var(--nutrition)/0.08)]',
    iconBg: 'bg-[hsl(var(--nutrition)/0.15)]',
    text: 'text-[hsl(var(--nutrition))]',
    border: 'border-[hsl(var(--nutrition)/0.15)] hover:border-[hsl(var(--nutrition)/0.3)]',
  },
  journey: {
    bg: 'bg-[hsl(var(--surprise)/0.08)]',
    iconBg: 'bg-[hsl(var(--surprise)/0.15)]',
    text: 'text-[hsl(var(--surprise))]',
    border: 'border-[hsl(var(--surprise)/0.15)] hover:border-[hsl(var(--surprise)/0.3)]',
  },
  studio: {
    bg: 'bg-violet-500/8',
    iconBg: 'bg-violet-500/15',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-400/15 hover:border-violet-400/30',
  },
};

export function QuickActionCard({
  icon: Icon,
  illustration: Illustration,
  emoji,
  label,
  description,
  color,
  onClick,
  delay = 0,
}: QuickActionCardProps) {
  const colors = colorClasses[color];

  const renderContent = () => {
    if (Illustration) {
      // Responsive size: 40px on mobile, 48px on larger screens
      return <Illustration size={48} className={colors.text} strokeWidth={1.1} />;
    }
    if (emoji) {
      return <span className="text-2xl sm:text-3xl">{emoji}</span>;
    }
    if (Icon) {
      return <Icon size={28} className={colors.text} />;
    }
    return null;
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl',
        'border bg-card shadow-sm',
        'transition-all duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        'min-h-[110px] sm:min-h-[120px] w-full',
        'hover:shadow-md',
        colors.border
      )}
    >
      {/* Icon/Illustration Container */}
      <div className={cn(
        'w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-2',
        Illustration ? 'bg-transparent' : colors.iconBg
      )}>
        {renderContent()}
      </div>

      {/* Label */}
      <span className="text-sm font-medium text-foreground leading-tight text-center">
        {label}
      </span>

      {/* Description - optional */}
      {description && (
        <span className="text-xs text-muted-foreground mt-1 text-center line-clamp-1">
          {description}
        </span>
      )}
    </motion.button>
  );
}
