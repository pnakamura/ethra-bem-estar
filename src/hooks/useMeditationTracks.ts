import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { MeditationTrack, MeditationTrackInsert, MeditationTrackUpdate, MeditationCategory, MeditationCategoryInsert } from '@/types/admin';
import { useToast } from '@/hooks/use-toast';

export function useMeditationTracks() {
  return useQuery({
    queryKey: ['meditation-tracks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meditation_tracks')
        .select('*, category:meditation_categories(*)')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as MeditationTrack[];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - static content
    gcTime: 30 * 60 * 1000,
  });
}

export function useMeditationTrack(id: string | undefined) {
  return useQuery({
    queryKey: ['meditation-track', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('meditation_tracks')
        .select('*, category:meditation_categories(*)')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as MeditationTrack;
    },
    enabled: !!id,
  });
}

export function useMeditationCategories() {
  return useQuery({
    queryKey: ['meditation-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('meditation_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as MeditationCategory[];
    },
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useCreateMeditationTrack() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (track: MeditationTrackInsert) => {
      const { data, error } = await supabase
        .from('meditation_tracks')
        .insert(track)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meditation-tracks'] });
      toast({
        title: 'Meditação criada',
        description: 'A meditação foi criada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateMeditationTrack() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: MeditationTrackUpdate }) => {
      const { data: result, error } = await supabase
        .from('meditation_tracks')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meditation-tracks'] });
      toast({
        title: 'Meditação atualizada',
        description: 'A meditação foi atualizada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao atualizar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteMeditationTrack() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('meditation_tracks')
        .update({ deleted_at: new Date().toISOString(), is_active: false })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meditation-tracks'] });
      toast({
        title: 'Meditação removida',
        description: 'A meditação foi removida com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao remover',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useCreateMeditationCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (category: MeditationCategoryInsert) => {
      const { data, error } = await supabase
        .from('meditation_categories')
        .insert(category)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meditation-categories'] });
      toast({
        title: 'Categoria criada',
        description: 'A categoria foi criada com sucesso.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Erro ao criar',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUploadAudio() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ file, path }: { file: File; path: string }) => {
      const { data, error } = await supabase.storage
        .from('meditation-audio')
        .upload(path, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('meditation-audio')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    },
    onError: (error) => {
      toast({
        title: 'Erro no upload',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
