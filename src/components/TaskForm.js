import React, { useState } from 'react';
import { addTask } from '../services/api'; // Importa la función para agregar tareas
import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate


const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Función que se ejecuta cuando se envía el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title) {
      const task = { title, description };
	  console.log('Tarea a enviar:', task); // Debugging: Ver los datos antes de enviarlos
      try {
        await addTask(task); // Llamada a la API para agregar la tarea
        setTitle(''); // Limpiamos el campo de título
        setDescription(''); // Limpiamos el campo de descripción
		navigate('/');
      } catch (err) {
        console.error('Error al agregar tarea:', err);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Agregar tarea</button>
    </form>
  );
};

export default TaskForm;
