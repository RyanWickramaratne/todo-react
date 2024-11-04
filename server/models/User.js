import pool from '../helpers/db.js';

class User {
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM account WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async createUser(email, hashedPassword) {
    const result = await pool.query(
      'INSERT INTO account (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    );
    return result.rows[0];
  }
}

export default User;
