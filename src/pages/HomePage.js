import React from 'react';
import TaskList from '../components/TaskList';  // Importamos el componente que muestra las tareas
import TaskForm from '../components/TaskForm';  // Importamos el formulario para agregar tareas

const HomePage = () => {
  return (
    <div>
      <h1>Gestión de Tareas</h1>
      <TaskForm onSuccess={() => window.location.reload()} />  {/* Llamamos a la función onSuccess después de agregar */}
      <TaskList />  {/* Mostramos la lista de tareas */}
    </div>
  );
};

export default HomePage;
