import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, MessageCircle, Compass, Leaf, Wind } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logger } from '@/lib/logger';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    logger.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating leaves */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: -50,
              rotate: 0,
              opacity: 0.3 
            }}
            animate={{ 
              y: window.innerHeight + 50,
              rotate: 360,
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ 
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear'
            }}
            className="absolute"
          >
            <Leaf 
              className="w-6 h-6 text-primary/30"
              style={{ transform: `scale(${0.5 + Math.random()})` }}
            />
          </motion.div>
        ))}

        {/* Gentle wind particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`wind-${i}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ 
              x: window.innerWidth + 20,
              opacity: [0, 0.4, 0],
            }}
            transition={{ 
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'linear'
            }}
            className="absolute"
            style={{ top: `${15 + i * 10}%` }}
          >
            <Wind className="w-4 h-4 text-muted-foreground/20" />
          </motion.div>
        ))}

        {/* Gradient orbs */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-secondary/15 blur-3xl"
        />
      </div>

      {/* Main content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-md"
      >
        {/* 404 Number with animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-6"
        >
          <span className="text-8xl font-bold bg-gradient-to-br from-primary via-primary/70 to-secondary bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-6"
        >
          <div className="relative inline-block">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center"
            >
              <Compass className="w-16 h-16 text-primary" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-primary/20"
            />
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-2 mb-8"
        >
          <h1 className="text-2xl font-semibold text-foreground">
            Caminho não encontrado
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Parece que você se aventurou por um caminho inexplorado. 
            Vamos te guiar de volta ao seu jardim interior.
          </p>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button asChild size="lg" className="w-full gap-2">
            <Link to="/">
              <Home className="w-4 h-4" />
              Voltar ao Início
            </Link>
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline" className="gap-2">
              <Link to="/guide">
                <MessageCircle className="w-4 h-4" />
                Guia
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/journeys/explore">
                <Compass className="w-4 h-4" />
                Explorar
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Subtle path hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-xs text-muted-foreground/60"
        >
          Caminho tentado: <code className="px-1.5 py-0.5 bg-muted rounded text-xs">{location.pathname}</code>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
