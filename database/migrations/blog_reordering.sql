-- Add display_order column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create an index for faster sorting
CREATE INDEX IF NOT EXISTS idx_posts_display_order ON posts(display_order);
