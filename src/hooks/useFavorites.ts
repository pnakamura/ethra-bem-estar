import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export type FavoriteType = 'breathing' | 'meditation' | 'journey';

const tableMap: Record<FavoriteType, string> = {
  breathing: 'user_favorite_breathings',
  meditation: 'user_favorite_meditations',
  journey: 'user_favorite_journeys',
};

const columnMap: Record<FavoriteType, string> = {
  breathing: 'breathing_id',
  meditation: 'meditation_id',
  journey: 'journey_id',
};

// Hook para listar favoritos de respiração
export function useFavoriteBreathings() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorite-breathings', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_favorite_breathings')
        .select('breathing_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

// Hook para listar favoritos de meditação
export function useFavoriteMeditations() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorite-meditations', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_favorite_meditations')
        .select('meditation_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

// Hook para listar favoritos de jornadas
export function useFavoriteJourneys() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorite-journeys', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_favorite_journeys')
        .select('journey_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });
}

// Hook para verificar se um item é favorito
export function useIsFavorite(type: FavoriteType, itemId: string) {
  const { data: breathings } = useFavoriteBreathings();
  const { data: meditations } = useFavoriteMeditations();
  const { data: journeys } = useFavoriteJourneys();

  if (type === 'breathing') {
    return breathings?.some(f => f.breathing_id === itemId) ?? false;
  }
  if (type === 'meditation') {
    return meditations?.some(f => f.meditation_id === itemId) ?? false;
  }
  if (type === 'journey') {
    return journeys?.some(f => f.journey_id === itemId) ?? false;
  }
  return false;
}

// Hook para toggle de favorito
export function useToggleFavorite() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ type, itemId, isFavorite }: { type: FavoriteType; itemId: string; isFavorite: boolean }) => {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      if (type === 'breathing') {
        if (isFavorite) {
          const { error } = await supabase
            .from('user_favorite_breathings')
            .delete()
            .eq('user_id', user.id)
            .eq('breathing_id', itemId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('user_favorite_breathings')
            .insert({ user_id: user.id, breathing_id: itemId });
          if (error) throw error;
        }
      } else if (type === 'meditation') {
        if (isFavorite) {
          const { error } = await supabase
            .from('user_favorite_meditations')
            .delete()
            .eq('user_id', user.id)
            .eq('meditation_id', itemId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('user_favorite_meditations')
            .insert({ user_id: user.id, meditation_id: itemId });
          if (error) throw error;
        }
      } else if (type === 'journey') {
        if (isFavorite) {
          const { error } = await supabase
            .from('user_favorite_journeys')
            .delete()
            .eq('user_id', user.id)
            .eq('journey_id', itemId);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('user_favorite_journeys')
            .insert({ user_id: user.id, journey_id: itemId });
          if (error) throw error;
        }
      }
    },
    onSuccess: (_, { type, isFavorite }) => {
      // Invalidar queries relacionadas
      const queryKey = `favorite-${type}s`;
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos', {
        duration: 2000,
      });
    },
    onError: (error) => {
      console.error('Erro ao atualizar favorito:', error);
      toast.error('Erro ao atualizar favorito');
    },
  });
}
