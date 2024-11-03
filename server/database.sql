CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL
);

INSERT INTO task (description) VALUES ('Sample Task 1'), ('Sample Task 2');
