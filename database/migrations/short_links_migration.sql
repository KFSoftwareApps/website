-- Add short_code column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS short_code TEXT UNIQUE;

-- Generate random short codes for existing posts (6 characters)
UPDATE posts 
SET short_code = lower(substring(md5(random()::text), 1, 6))
WHERE short_code IS NULL;

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_posts_short_code ON posts (short_code);
