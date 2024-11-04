import pool from '../helpers/db.js';

class Task {
  static async getAllTasks(userId) {
    const result = await pool.query('SELECT * FROM task WHERE user_id = $1', [userId]);
    return result.rows;
  }

  static async insertTask(description, userId) {
    const result = await pool.query(
      'INSERT INTO task (description, user_id) VALUES ($1, $2) RETURNING *',
      [description, userId]
    );
    return result.rows[0];
  }

  static async deleteTaskById(id, userId) {
    if (!Number.isInteger(Number(id))) {
      throw new Error('Invalid task ID format');
    }

    const result = await pool.query('DELETE FROM task WHERE id = $1 AND user_id = $2', [id, userId]);
    return result.rowCount;
  }
}

export default Task;
