import { motion, type TargetAndTransition } from 'framer-motion';
import { cn } from '@/lib/utils';

export type AvatarState = 'idle' | 'thinking' | 'speaking' | 'empathic' | 'curious' | 'encouraging' | 'reflective';

interface GuideAvatarProps {
  emoji: string;
  state?: AvatarState;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-9 h-9 text-lg',
  md: 'w-10 h-10 text-xl',
  lg: 'w-12 h-12 text-2xl',
};

export function GuideAvatar({
  emoji,
  state = 'idle',
  size = 'sm',
  className,
}: GuideAvatarProps) {
  const getAnimation = (): TargetAndTransition => {
    switch (state) {
      case 'thinking':
        return {
          scale: [1, 1.08, 1],
          transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };
      case 'speaking':
        return {
          scale: [1, 1.03, 1],
          transition: {
            duration: 0.6,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };
      case 'empathic':
        return {
          scale: 1.05,
          transition: { duration: 0.4, ease: 'easeOut' as const },
        };
      case 'curious':
        return {
          rotate: [0, 3, -3, 0],
          transition: {
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 1,
            ease: 'easeInOut' as const,
          },
        };
      case 'encouraging':
        return {
          scale: [1, 1.12, 1],
          transition: {
            duration: 0.5,
            repeat: 2,
            ease: 'easeOut' as const,
          },
        };
      case 'reflective':
        return {
          y: [0, -2, 0],
          transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut' as const,
          },
        };
      default:
        return {
          scale: 1,
          transition: { duration: 0.3 },
        };
    }
  };

  const getStateClass = () => {
    switch (state) {
      case 'thinking':
      case 'reflective':
        return 'dark:guide-avatar-thinking';
      case 'speaking':
        return 'dark:guide-avatar-speaking';
      case 'empathic':
      case 'encouraging':
        return 'dark:guide-avatar-empathic';
      case 'curious':
        return 'dark:guide-avatar-speaking';
      default:
        return '';
    }
  };

  return (
    <motion.div
      className={cn(
        'flex-shrink-0 rounded-full flex items-center justify-center transition-shadow duration-300',
        'guide-avatar',
        sizeClasses[size],
        getStateClass(),
        className
      )}
      animate={getAnimation()}
    >
      <motion.span
        animate={state === 'thinking' || state === 'reflective' ? {
          opacity: [1, 0.7, 1],
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {emoji}
      </motion.span>
    </motion.div>
  );
}
