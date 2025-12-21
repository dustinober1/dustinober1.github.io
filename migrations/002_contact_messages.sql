-- Up Migration
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Down Migration
-- DROP TABLE contact_messages;
