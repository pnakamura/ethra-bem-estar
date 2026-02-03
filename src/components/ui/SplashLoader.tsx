import { motion } from 'framer-motion';

export function SplashLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5 animate-pulse" />
      
      {/* Logo/Brand animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10"
      >
        {/* Breathing circle animation */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-glow"
        />
        
        {/* Inner pulse */}
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm" />
        </motion.div>
      </motion.div>

      {/* Loading text */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-6 text-sm text-muted-foreground font-medium tracking-wide"
      >
        Carregando...
      </motion.p>

      {/* Progress dots */}
      <div className="flex gap-1.5 mt-3">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            className="w-2 h-2 rounded-full bg-primary"
          />
        ))}
      </div>
    </div>
  );
}
