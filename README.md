# Todo Project

A simple Todo application built using Node.js, Express, PostgreSQL, and React.

## Project Structure

The project consists of a backend API and a frontend client:
- **Backend**: Node.js, Express, PostgreSQL
- **Frontend**: React, Axios for HTTP requests

## Features

- User Registration and Authentication (JWT-based).
- Add, Delete, and View Tasks for an authenticated user.
- Error handling for invalid input and unauthorized actions.

## Requirements

- Node.js
- PostgreSQL

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd todo-project
```

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables by creating a `.env` file:
   ```plaintext
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=todo
   DB_NAME_TEST=todo_test
   DB_HOST=localhost
   DB_PORT=5432
   JWT_SECRET_KEY=your_jwt_secret
   ```

4. Set up PostgreSQL database:
   ```sql
   CREATE DATABASE todo;
   CREATE DATABASE todo_test;
   ```
   Create the necessary tables as outlined in your `Task` and `Account` models.

5. Run the server:
   ```bash
   npm start
   ```

6. Run tests:
   ```bash
   npm test
   ```

### 3. Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:
   ```plaintext
   REACT_APP_BACKEND_URL=http://localhost:3001
   ```

4. Run the client:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication

- **POST /register**: Register a new user.
- **POST /login**: Login and receive a JWT token.

### Tasks (Protected Routes)

- **GET /tasks**: Get all tasks for the authenticated user.
- **POST /tasks**: Create a new task.
- **DELETE /tasks/:id**: Delete a task by ID.

## Testing

Run all backend tests using Mocha and Chai:
```bash
cd server
npm run test
```

## Troubleshooting

If tests are failing due to token or user ID issues, ensure:
1. The JWT token includes both `id` and `email`.
2. The `authenticateToken` middleware correctly attaches `req.user.id`.
3. The `delete` test case retrieves the correct user ID and task ID.

## License

This project is open-source. Feel free to modify and use for your own purposes.
