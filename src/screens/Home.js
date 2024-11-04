import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from '../components/Row'; // Ensure this path is correct
import { useUser } from '../context/UserContext';

function Home() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    if (!user) {
      console.error('User not logged in. Token is missing.');
      return;
    }

    console.log('Fetching tasks with user token:', user.token);
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(response => {
      console.log('Tasks fetched successfully:', response.data);
      setTasks(response.data);
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
      if (error.response) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert('Network error: Unable to fetch data');
      }
    });
  }, [user]);

  const deleteTask = (id) => {
    console.log(`Attempting to delete task with ID: ${id}`);
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(() => {
      console.log(`Task with ID ${id} deleted successfully.`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    })
    .catch(error => {
      console.error(`Error deleting task with ID ${id}:`, error);
      if (error.response) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert('Network error: Unable to delete task');
      }
    });
  };

  const addTask = () => {
    if (!newTaskDescription) {
      alert('Task description cannot be empty');
      return;
    }

    console.log('Adding new task:', newTaskDescription);
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, { description: newTaskDescription }, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(response => {
      console.log('New task added successfully:', response.data);
      setTasks([...tasks, response.data]);
      setNewTaskDescription('');
    })
    .catch(error => {
      console.error('Error adding task:', error);
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

export default Home;
