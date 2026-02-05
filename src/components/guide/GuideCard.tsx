import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { SpiritualGuide } from '@/hooks/useGuides';

interface GuideCardProps {
  guide: SpiritualGuide;
  isSelected?: boolean;
  onSelect: (guide: SpiritualGuide) => void;
}

export function GuideCard({ guide, isSelected, onSelect }: GuideCardProps) {
  const topics = Array.isArray(guide.topics) ? guide.topics : [];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(guide)}
      className={cn(
        'relative cursor-pointer rounded-2xl p-5 transition-all duration-300',
        'guide-card',
        isSelected && 'guide-card-selected'
      )}
    >
      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center shadow-lg btn-primary-gradient"
        >
          <Check className="w-4 h-4 text-secondary-foreground" />
        </motion.div>
      )}

      {/* Avatar */}
      <div className="text-4xl mb-3">{guide.avatar_emoji}</div>

      {/* Name and approach */}
      <h3 className="font-display font-medium text-lg text-foreground mb-1 dark:text-glow">{guide.name}</h3>
      <p className="text-sm text-muted-foreground font-body font-medium mb-2">{guide.approach}</p>

      {/* Description */}
      <p className="text-sm font-body text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
        {guide.description}
      </p>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5">
        {topics.slice(0, 3).map((topic, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary-foreground dark:bg-secondary/20 dark:text-foreground border-secondary/20 font-body"
          >
            {topic}
          </Badge>
        ))}
        {topics.length > 3 && (
          <Badge
            variant="outline"
            className="text-xs px-2 py-0.5 border-border/50 text-muted-foreground font-body"
          >
            +{topics.length - 3}
          </Badge>
        )}
      </div>
    </motion.div>
  );
}
