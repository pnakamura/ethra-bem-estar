import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { PlayIcon, SparkleIcon } from '@/components/ui/icons';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden bg-gradient-to-b from-background to-muted/30"
    >
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle gradient orbs */}
        <motion.div
          className="absolute top-32 right-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-72 h-72 rounded-full bg-secondary/5 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.25, 0.35, 0.25] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle gold accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-primary/3 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-primary/8 text-primary text-sm font-medium mb-8 border border-primary/10"
          >
            <SparkleIcon size={18} />
            <span>Seu refúgio de paz interior</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] mb-8 tracking-tight"
          >
            Transforme sua{' '}
            <span className="text-primary">
              ansiedade
            </span>{' '}
            em serenidade
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Jornadas guiadas de meditação e respiração para quem busca equilíbrio real em um mundo caótico.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Button
              onClick={() => navigate('/auth?trial=true')}
              size="lg"
              className="bg-primary text-primary-foreground font-medium px-8 py-6 rounded-xl text-base shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/20 transition-all duration-500"
            >
              Experimente 7 Dias Grátis
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-border/60 text-foreground font-medium px-6 py-6 rounded-xl hover:bg-muted/50 hover:border-primary/20 transition-all duration-500"
            >
              <PlayIcon size={22} className="mr-2" />
              Ver como funciona
            </Button>
          </motion.div>
        </motion.div>

        {/* App Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center"
        >
          <div className="relative">
            {/* Phone mockup - Elegant design */}
            <motion.div
              className="relative w-64 md:w-72 h-[520px] md:h-[580px] rounded-[3rem] bg-card border border-border/50 p-2 shadow-xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-full h-full rounded-[2.5rem] bg-background overflow-hidden flex flex-col">
                {/* App header */}
                <div className="p-4 bg-muted/30 border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <SparkleIcon size={18} className="text-primary-foreground" />
                    </div>
                    <span className="font-display font-medium text-foreground">ETHRA</span>
                  </div>
                </div>

                {/* Content preview */}
                <div className="flex-1 p-4 space-y-4">
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-2">Sua Jornada</p>
                    <h3 className="text-lg font-display font-medium text-foreground">Controle da Ansiedade</h3>
                    <p className="text-xs text-muted-foreground mt-1">Dia 3 de 21</p>
                  </div>

                  {/* Progress circle */}
                  <div className="flex justify-center">
                    <motion.div
                      className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                        <span className="text-primary-foreground text-2xl font-display font-medium">14%</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Practice cards */}
                  <div className="space-y-2 mt-4">
                    {['Respiração 4-7-8', 'Meditação Guiada', 'Reflexão do Dia'].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.15, duration: 0.6 }}
                        className="p-3 rounded-xl bg-muted/50 border border-border/30 flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10" />
                        <span className="text-sm font-medium text-foreground">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating elements - Elegant cards */}
            <motion.div
              className="absolute -right-6 top-24 px-4 py-2.5 rounded-xl bg-card border border-border/50 shadow-lg"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
            >
              <p className="text-sm font-medium text-foreground">4.9 ★</p>
            </motion.div>
            <motion.div
              className="absolute -left-6 bottom-36 px-4 py-2.5 rounded-xl bg-card border border-border/50 shadow-lg"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
            >
              <p className="text-sm font-medium text-foreground">+5.000 usuários</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
