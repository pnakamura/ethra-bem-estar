-- Criar função específica para updated_at (em inglês)
CREATE OR REPLACE FUNCTION public.update_updated_at_english()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path TO ''
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

-- Recriar triggers para breathing_techniques
DROP TRIGGER IF EXISTS update_breathing_techniques_updated_at ON public.breathing_techniques;
CREATE TRIGGER update_breathing_techniques_updated_at
BEFORE UPDATE ON public.breathing_techniques
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_english();

-- Recriar triggers para meditation_tracks
DROP TRIGGER IF EXISTS update_meditation_tracks_updated_at ON public.meditation_tracks;
CREATE TRIGGER update_meditation_tracks_updated_at
BEFORE UPDATE ON public.meditation_tracks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_english();