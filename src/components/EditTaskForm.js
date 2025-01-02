import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getTaskById, updateTask } from '../services/api'; 

const EditTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  // Cargar los datos de la tarea para editar
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTaskById(id); 
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed); 
      } catch (error) {
        console.error('Error al obtener la tarea:', error);
      }
    };

    fetchTask(); // Llamada a la API para cargar la tarea
  }, [id]);

  // Manejar el envío del formulario de edición
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = { title, description, completed };
    try {
      await updateTask(id, updatedTask); 
      navigate('/'); // Usamos navigate() para redirigir al usuario a la lista de tareas
    } catch (error) {
      console.error('Error al actualizar la tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Editar Tarea</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la tarea"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción (opcional)"
      />
      <div>
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted((prevState) => !prevState)}
          />
          Tarea completada
        </label>
      </div>
      <button type="submit">Actualizar tarea</button>
    </form>
  );
};

export default EditTaskForm;
