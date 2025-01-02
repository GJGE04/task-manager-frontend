// Usaremos Context API o Redux para manejar el estado de las tareas en toda la aplicación. 
import React, { createContext, useContext, useState, useEffect } from 'react';			
import axios from 'axios';

const TaskContext = createContext();

export const useTasks = () => {
  return useContext(TaskContext);
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const response = await axios.post('/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await axios.put(`/api/tasks/${id}`, updatedTask);
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.find(task => task._id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(id, updatedTask);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};

