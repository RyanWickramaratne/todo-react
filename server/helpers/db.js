import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME || 'todo',
  password: process.env.DB_PASSWORD || '1997', // Replace with your actual password or use environment variables
  port: process.env.DB_PORT || 5432,
});

export default pool;
