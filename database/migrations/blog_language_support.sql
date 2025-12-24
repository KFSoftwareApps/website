-- Add language column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS language TEXT NOT NULL DEFAULT 'tr';

-- Create an index for language column to optimize filtering
CREATE INDEX IF NOT EXISTS idx_posts_language ON posts(language);

-- Update existing posts (optional, but good for consistency)
-- By default, existing posts are marked as 'tr' due to the default value.
