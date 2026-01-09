import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GardenBackgroundProps {
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  weatherEffect: 'cloudy' | 'clearing' | 'sunny' | 'rainbow';
  stageGlowColor: string;
}

export function GardenBackground({ 
  timeOfDay, 
  weatherEffect, 
  stageGlowColor 
}: GardenBackgroundProps) {
  const timeGradients = {
    morning: 'from-amber-200/30 via-rose-100/20 to-sky-200/30',
    afternoon: 'from-sky-300/30 via-blue-200/20 to-cyan-100/30',
    evening: 'from-orange-300/30 via-pink-200/20 to-purple-300/30',
    night: 'from-indigo-400/30 via-purple-300/20 to-slate-400/30'
  };

  return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      {/* Base gradient based on time */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br transition-colors duration-1000',
        timeGradients[timeOfDay]
      )} />

      {/* Weather effects */}
      {weatherEffect === 'sunny' && (
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-yellow-300/40 blur-xl"
        />
      )}

      {weatherEffect === 'rainbow' && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            className="absolute top-0 right-0 w-full h-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255,0,0,0.1), rgba(255,165,0,0.1), rgba(255,255,0,0.1), rgba(0,128,0,0.1), rgba(0,0,255,0.1), rgba(75,0,130,0.1), rgba(238,130,238,0.1))'
            }}
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-yellow-300/50 blur-xl"
          />
        </>
      )}

      {weatherEffect === 'cloudy' && (
        <>
          <motion.div
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute top-2 left-4 w-12 h-6 rounded-full bg-gray-300/30 blur-md"
          />
          <motion.div
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute top-6 right-8 w-8 h-4 rounded-full bg-gray-400/20 blur-md"
          />
        </>
      )}

      {/* Particles/Stars for night */}
      {timeOfDay === 'night' && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 2 + i * 0.5, 
                repeat: Infinity,
                delay: i * 0.3
              }}
              className="absolute w-1 h-1 rounded-full bg-white"
              style={{
                top: `${10 + i * 15}%`,
                left: `${15 + i * 18}%`
              }}
            />
          ))}
        </>
      )}

      {/* Stage-specific glow */}
      <div className={cn(
        'absolute inset-0 opacity-30',
        stageGlowColor
      )} />

      {/* Ground/grass effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-green-800/10 to-transparent" />
    </div>
  );
}
