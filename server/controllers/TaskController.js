import Task from '../models/Task.js';
import ApiError from '../helpers/ApiError.js';

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.getAllTasks(req.user.id);
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const postTask = async (req, res, next) => {
  const { description } = req.body;
  if (!description) {
    return res.status(400).json({ error: 'Task description is required' });
  }

  try {
    const newTask = await Task.insertTask(description, req.user.id);
    res.status(201).json(newTask);
  } catch (err) {
    console.error('Error adding task:', err);
    next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id; // Check that this is defined
  console.log(`Attempting to delete task with ID: ${id} for user ID: ${userId}`);

  try {
    if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
      return res.status(400).json({ error: 'Invalid task ID format' });
    }

    const result = await Task.deleteTaskById(id, userId);
    if (result === 0) {
      return next(new ApiError('Task not found or unauthorized', 404));
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Error deleting task:', err);
    next(err);
  }
};

