-- Create the admin table
CREATE TABLE IF NOT EXISTS admin (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Insert default admin user
-- Password: admin123 (bcrypt-hashed)
INSERT INTO admin (username, password)
VALUES (
  'admin',
  '$2b$10$4rm0zFJ3iQK9TrTzPZLrVevTiqIvqWD25mEUDgDNGVC5hAicHnsr6'
)
ON CONFLICT (username) DO NOTHING;

CREATE TABLE about_section (
  id SERIAL PRIMARY KEY,
  profile_image TEXT,
  about_description TEXT,
  specialization TEXT[], -- array of tags
  toolkit JSONB,          -- { camera, lens, software, style }
  journey TEXT
);

CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
