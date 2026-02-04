import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface GamificationStats {
  id: string;
  usuario_id: string;
  nivel: number | null;
  total_pontos: number | null;
  sequencia_atual: number | null;
  maior_sequencia: number | null;
  total_sessoes_respiracao: number | null;
  total_minutos_meditacao: number | null;
  total_checkins_emocao: number | null;
  total_entradas_diario: number | null;
  conquistas_desbloqueadas: unknown;
  ultima_atividade: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export function useGamificationStats() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['gamification-stats', user?.id],
    queryFn: async (): Promise<GamificationStats | null> => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .from('gamification_user_stats')
        .select('*')
        .eq('usuario_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching gamification stats:', error);
        toast.error('Erro ao carregar estatísticas de gamificação');
        throw error;
      }

      return data;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook to refresh gamification stats using the database function
export function useRefreshGamificationStats() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['gamification-refresh', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      const { data, error } = await supabase
        .rpc('refresh_user_gamification', { p_user_id: user.id });

      if (error) {
        console.error('Error refreshing gamification:', error);
        toast.error('Erro ao atualizar estatísticas');
        throw error;
      }

      return data;
    },
    enabled: false, // Only run manually
  });
}
