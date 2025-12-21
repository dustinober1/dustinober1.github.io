-- Up Migration
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  anonymous_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ebook_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  ebook_id VARCHAR(50) NOT NULL,
  chapter_id VARCHAR(100),
  scroll_position FLOAT DEFAULT 0,
  time_spent INTEGER DEFAULT 0,
  last_read TIMESTAMP DEFAULT NOW(),
  is_completed BOOLEAN DEFAULT FALSE,
  bookmarks JSONB DEFAULT '[]'::jsonb,
  notes JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, ebook_id)
);

-- Down Migration
-- DROP TABLE ebook_progress;
-- DROP TABLE users;
