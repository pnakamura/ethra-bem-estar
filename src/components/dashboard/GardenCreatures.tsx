import { motion } from 'framer-motion';
import { GardenCreature } from '@/hooks/useGardenState';

interface GardenCreaturesProps {
  creatures: GardenCreature[];
}

const creatureAnimations: Record<string, { [key: string]: number[] }> = {
  float: { y: [0, -8, 0] },
  bounce: { y: [0, -12, 0] },
  fly: { x: [0, 10, 0, -10, 0], y: [0, -5, 0, -3, 0] },
  crawl: { x: [0, 5, 0] },
  pulse: { scale: [1, 1.1, 1] }
};

const creatureTransitions: Record<string, { duration: number; repeat: number; ease: 'easeInOut' | 'easeOut' | 'linear' }> = {
  float: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  bounce: { duration: 0.6, repeat: Infinity, ease: 'easeOut' },
  fly: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  crawl: { duration: 2, repeat: Infinity, ease: 'linear' },
  pulse: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
};

const creaturePositions = [
  { top: '10%', left: '10%' },
  { top: '15%', right: '15%' },
  { bottom: '20%', left: '15%' },
  { bottom: '25%', right: '10%' },
  { top: '40%', left: '5%' },
  { top: '35%', right: '5%' }
];

export function GardenCreatures({ creatures }: GardenCreaturesProps) {
  if (creatures.length === 0) return null;

  return (
    <>
      {creatures.map((creature, index) => {
        const position = creaturePositions[index % creaturePositions.length];
        const animation = creatureAnimations[creature.animation];
        const transition = creatureTransitions[creature.animation];

        return (
          <motion.div
            key={creature.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="absolute z-10 text-xl pointer-events-none select-none"
            style={position}
            title={creature.name}
          >
            <motion.span
              animate={animation}
              transition={transition}
              className="inline-block filter drop-shadow-lg"
            >
              {creature.emoji}
            </motion.span>
          </motion.div>
        );
      })}
    </>
  );
}
