CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL
);

INSERT INTO task (description) VALUES ('Sample Task 1'), ('Sample Task 2');





CREATE TABLE account (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
