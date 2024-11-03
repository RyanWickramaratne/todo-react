import pool from './db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Function to insert a test user into the database
export async function insertTestUser() {
  const email = 'testuser@example.com';
  const passwordHash = await bcrypt.hash('password123', 10);

  await pool.query(
    `INSERT INTO account (email, password)
     VALUES ($1, $2)
     ON CONFLICT (email) DO NOTHING`,
    [email, passwordHash]
  );
}

// Function to generate a JWT token for a given email
export function getToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
}
