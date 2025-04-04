DROP TABLE IF EXISTS admin_users CASCADE;

CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) unique NOT NULL,
  password_digest VARCHAR(255) NOT NULL CHECK (LENGTH(password_digest) >= 7),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  admin_role_id INTEGER REFERENCES admin_roles(id) ON DELETE CASCADE
);