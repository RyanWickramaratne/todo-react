import express from 'express';
import cors from 'cors';

import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo',
  password: '1997', // Replace with your actual password
  port: 5432,
});

// Test GET endpoint
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM task');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST endpoint to add a new task
app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO task (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE endpoint to remove a task by id
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM task WHERE id = $1', [id]);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
