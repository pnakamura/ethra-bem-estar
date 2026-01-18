-- Add short_description and explanation columns to meditation_tracks
ALTER TABLE meditation_tracks 
ADD COLUMN IF NOT EXISTS short_description text,
ADD COLUMN IF NOT EXISTS explanation text;

-- Add explanation column to journeys
ALTER TABLE journeys 
ADD COLUMN IF NOT EXISTS explanation text;

-- Add comment for documentation
COMMENT ON COLUMN meditation_tracks.short_description IS 'Short description (1-2 lines) for card display';
COMMENT ON COLUMN meditation_tracks.explanation IS 'Scientific/detailed explanation shown on demand';
COMMENT ON COLUMN journeys.explanation IS 'Scientific/methodological explanation of the journey';