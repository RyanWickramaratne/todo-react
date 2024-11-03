import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from './components/Row'; // Adjust the path if needed

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Fetch tasks when the component mounts
  useEffect(() => {
    axios.get('http://localhost:3001/')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        if (error.response) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert('Network error: Unable to fetch data');
        }
      });
  }, []);

  // Function to delete a task by ID
  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      })
      .catch(error => {
        if (error.response) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert('Network error: Unable to delete task');
        }
      });
  };

  // Function to add a new task
  const addTask = () => {
    if (!newTaskDescription) {
      alert('Task description cannot be empty');
      return;
    }

    axios.post('http://localhost:3001/tasks', { description: newTaskDescription })
      .then(response => {
        setTasks([...tasks, response.data]);
        setNewTaskDescription('');
      })
      .catch(error => {
        if (error.response) {
          alert(`Error: ${error.response.data.error}`);
        } else {
          alert('Network error: Unable to add task');
        }
      });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {tasks.map(task => (
          <Row key={task.id} item={task} deleteTask={deleteTask} />
        ))}
      </ul>
      <input
        type="text"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add Task</button>
    </div>
  );
}

export default App;
