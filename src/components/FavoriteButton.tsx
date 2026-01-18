import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useToggleFavorite, useIsFavorite, FavoriteType } from '@/hooks/useFavorites';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface FavoriteButtonProps {
  type: FavoriteType;
  itemId: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

const iconSizes = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function FavoriteButton({ type, itemId, size = 'md', className }: FavoriteButtonProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isFavorite = useIsFavorite(type, itemId);
  const { mutate: toggleFavorite, isPending } = useToggleFavorite();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      toast.info('Faça login para salvar favoritos', {
        action: {
          label: 'Login',
          onClick: () => navigate('/auth'),
        },
      });
      return;
    }

    toggleFavorite({ type, itemId, isFavorite });
  };

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={handleClick}
      disabled={isPending}
      data-contentlock-allow="true"
      className={cn(
        'flex items-center justify-center rounded-full transition-colors',
        'hover:bg-muted/50 active:bg-muted',
        sizeClasses[size],
        className
      )}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <motion.div
        animate={isFavorite ? { scale: [1, 1.3, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart
          className={cn(
            iconSizes[size],
            'transition-colors duration-200',
            isFavorite
              ? 'fill-rose-500 text-rose-500'
              : 'text-muted-foreground hover:text-rose-400'
          )}
        />
      </motion.div>
    </motion.button>
  );
}
