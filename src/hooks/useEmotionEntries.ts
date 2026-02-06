import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { logger } from '@/lib/logger';
import type { Json } from '@/integrations/supabase/types';

export interface EmotionEntry {
  id: string;
  user_id: string;
  selected_emotions: Array<{ id: string; intensity: number }>;
  detected_dyads: Array<{ result: string; label: string; description: string }>;
  recommended_treatment: Record<string, unknown> | null;
  free_text: string | null;
  created_at: string;
}

export interface CreateEmotionEntryData {
  selected_emotions: Array<{ id: string; intensity: number }>;
  detected_dyads?: Array<{ result: string; label: string; description: string }>;
  recommended_treatment?: unknown;
  free_text?: string;
}

export function useEmotionEntries() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['emotion-entries', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('emotion_entries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as EmotionEntry[];
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateEmotionEntry() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (entryData: CreateEmotionEntryData) => {
      if (!user) throw new Error('Usuário não autenticado');

      // Convert to JSON-compatible format
      const insertData = {
        user_id: user.id,
        selected_emotions: JSON.parse(JSON.stringify(entryData.selected_emotions)) as Json,
        detected_dyads: JSON.parse(JSON.stringify(entryData.detected_dyads || [])) as Json,
        recommended_treatment: entryData.recommended_treatment 
          ? (JSON.parse(JSON.stringify(entryData.recommended_treatment)) as Json)
          : null,
        free_text: entryData.free_text || null,
      };

      const { data, error } = await supabase
        .from('emotion_entries')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return data as unknown as EmotionEntry;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['emotion-entries'] });
    },
    onError: (error) => {
      logger.error('Error creating emotion entry:', error);
      toast.error('Erro ao salvar registro de emoções');
    },
  });
}

export function useRecentEmotionStats() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['emotion-stats', user?.id],
    queryFn: async () => {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from('emotion_entries')
        .select('*')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as EmotionEntry[];
    },
    enabled: !!user,
  });
}
