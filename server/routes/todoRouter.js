import express from 'express';
import pool from '../helpers/db.js';
import { emptyOrRows } from '../helpers/utils.js';

const router = express.Router();

// GET endpoint to fetch all tasks
router.get('/', async (req, res, next) => {
    try {
      const result = await pool.query('SELECT * FROM task');
      res.status(200).json(result.rows);
    } catch (err) {
      next(err);
    }
  });
  

// POST endpoint to add a new task
router.post('/', async (req, res, next) => {
  const { description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO task (description) VALUES ($1) RETURNING *',
      [description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

// DELETE endpoint to remove a task by ID
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM task WHERE id = $1', [id]);
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
});

export default router;
