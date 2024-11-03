# Todo App Project

A simple Todo app using Node.js, Express, and PostgreSQL, with Mocha and Chai for testing. This RESTful API supports creating, reading, and deleting tasks.

## Structure

```
/server
  |-- index.js           # Main server file
  |-- index.test.js      # Test file
  |-- package.json       # Project config
  |-- /test              # Optional test folder
```

## Features

- **Create Tasks**
- **Read Tasks**
- **Delete Tasks**
- **Error Handling**
- **Automated Testing**

## Prerequisites

- **Node.js** (v14+)
- **npm**
- **PostgreSQL**

## Setup

1. **Clone and install**:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app/server
   npm install
   ```

2. **Database setup**:
   Create a `todo` database and run:
   ```sql
   CREATE TABLE task (
     id SERIAL PRIMARY KEY,
     description TEXT NOT NULL
   );
   ```

3. **Start the server**:
   ```bash
   npm run devStart
   ```

## Running Tests

1. Ensure the server is not already running.
2. Run:
   ```bash
   npm test
   ```

## API Endpoints

### Get all tasks
**GET** `/`

### Create a task
**POST** `/tasks`
- **Body**:
  ```json
  {
    "description": "Your task"
  }
  ```

### Delete a task
**DELETE** `/tasks/:id`

## Notes

- Adjust PostgreSQL settings in `index.js` as needed.
- Tests cover core functionality and error handling.

## License

Licensed under MIT. See `LICENSE` for details.
