import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import type { BreathingTechnique } from '@/types/admin';

export type FavoriteType = 'breathing' | 'meditation' | 'journey';

// Hook para listar favoritos de respiração (apenas IDs)
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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook para listar favoritos de respiração COM detalhes completos
export function useFavoriteBreathingsWithDetails() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorite-breathings-details', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_favorite_breathings')
        .select(`
          breathing_id,
          created_at,
          breathing_techniques (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || [])
        .map(item => item.breathing_techniques)
        .filter(Boolean) as BreathingTechnique[];
    },
    enabled: !!user,
  });
}

// Hook para listar favoritos de meditação (apenas IDs)
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
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Hook para listar favoritos de meditação COM detalhes completos
export function useFavoriteMeditationsWithDetails() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorite-meditations-details', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_favorite_meditations')
        .select(`
          meditation_id,
          created_at,
          meditation_tracks (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || [])
        .map(item => item.meditation_tracks)
        .filter(Boolean) as Array<{
          id: string;
          title: string;
          description: string | null;
          duration_ms: number;
          duration_display: string;
          narration_audio_url: string | null;
          background_audio_url: string | null;
          thumbnail_url: string | null;
        }>;
    },
    enabled: !!user,
  });
}

// Hook para listar favoritos de jornadas (apenas IDs)
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

// Hook para listar favoritos de jornadas COM detalhes completos
export function useFavoriteJourneysWithDetails() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorite-journeys-details', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_favorite_journeys')
        .select(`
          journey_id,
          created_at,
          journeys (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || [])
        .map(item => item.journeys)
        .filter(Boolean) as Array<{
          id: string;
          title: string;
          subtitle: string | null;
          description: string;
          icon: string | null;
          duration_days: number;
          difficulty: string | null;
          is_premium: boolean | null;
          theme_color: string | null;
        }>;
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
      queryClient.invalidateQueries({ queryKey: [`favorite-${type}s`] });
      queryClient.invalidateQueries({ queryKey: [`favorite-${type}s-details`] });

      toast.success(isFavorite ? 'Removido dos favoritos' : 'Adicionado aos favoritos', {
        duration: 2000,
      });
    },
    onError: (error) => {
      logger.error('Erro ao atualizar favorito:', error);
      toast.error('Erro ao atualizar favorito');
    },
  });
}
