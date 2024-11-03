import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './routes/todoRouter.js';

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the todoRouter for handling task-related routes
app.use('/tasks', todoRouter);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app; // Export the app for testing
