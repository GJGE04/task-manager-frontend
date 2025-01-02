import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTasks, deleteTask, updateTask  } from '../services/api'; 
import { useNavigate } from 'react-router-dom'; 
import TaskItem from './TaskItem';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  const [filter, setFilter] = useState('all');

  // Función para obtener las tareas desde la API
  const fetchTasks = async () => {
    try {
      const response = await getTasks(); 
      setTasks(response.data); 
    } catch (err) {
      setError('Error al cargar las tareas');
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchTasks(); 
  }, []);

  if (loading) {
    return <div>Cargando tareas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  // Función para manejar la eliminación de la tarea
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await deleteTask(id); 
        // Después de eliminar, actualizamos la lista de tareas
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } catch (error) {
        console.error('Error al eliminar la tarea:', error);
      }
    }
  };
  
  // Función para alternar el estado de completado de una tarea
  const handleToggle = async (id) => {
    const task = tasks.find(t => t._id === id);
    if (task) {
      const updatedTask = { ...task, completed: !task.completed }; 
      try {
        await updateTask(id, updatedTask); 
        setTasks((prevTasks) => 
          prevTasks.map(t => t._id === id ? { ...t, completed: updatedTask.completed } : t)
        );
      } catch (error) {
        console.error('Error al actualizar la tarea:', error);
      }
    }
  };
  
  // Función para navegar a la página de edición
  const handleEdit = (id) => {
    navigate(`/edit/${id}`); 
  };
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true; // 'all' muestra todas las tareas
  });

  return (
    <div>
      <h2>Lista de Tareas</h2>
	  
	  <div>
        <label>Filtrar tareas: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>
	  
      <Link to="/tasks/new">
        <button>Agregar nueva tarea</button>
      </Link>
	  
      {tasks.length === 0 ? (
        <p>No hay tareas disponibles</p>
      ) : (
        <ul>
          {filteredTasks.map((task) => (
		 
            <TaskItem 
              key={task._id} 
              task={task} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
			  onToggle={handleToggle}
            />
			
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
