import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Row from '../components/Row';
import { useUser } from '../context/UserContext';
import '../styles.css';

function Home() {
  const { user } = useUser();
  const [tasks, setTasks] = useState([]);
  const [newTaskDescription, setNewTaskDescription] = useState('');

  useEffect(() => {
    if (!user) {
      console.error('User not logged in. Token is missing.');
      return;
    }

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/tasks`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
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
  }, [user]);

  const deleteTask = (id) => {
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
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

  const addTask = () => {
    if (!newTaskDescription) {
      alert('Task description cannot be empty');
      return;
    }

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, 
      { description: newTaskDescription },
      { headers: { Authorization: `Bearer ${user.token}` } }
    )
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
    <div className="container">
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
