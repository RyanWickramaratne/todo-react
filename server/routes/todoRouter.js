import express from 'express';
import { getTasks, postTask, deleteTask } from '../controllers/TaskController.js';
import { authenticateToken } from '../helpers/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getTasks);
router.post('/', authenticateToken, postTask);
router.delete('/:id', authenticateToken, deleteTask);

export default router;
