DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  bio TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email) VALUES ('admin', 'admin@test.com');
INSERT INTO users (username, email) VALUES ('test', 'test@test.com');
INSERT INTO user_profiles (user_id, first_name, last_name, phone, bio) VALUES (1, 'Admin', 'User', '123-456-7890', 'I am an admin user.');
INSERT INTO user_profiles (user_id, first_name, last_name, phone, bio) VALUES (2, 'Test', 'User', '123-456-7890', 'I am a test user.');



