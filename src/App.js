import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import EditTaskForm from './components/EditTaskForm';

import { Button } from '@chakra-ui/react';

const App = () => {
  return (
    <Router>
      <div>
        {/* Definición de las rutas */}
        <Routes>
          {/* Ruta para la lista de tareas */}
          <Route path="/" element={<TaskList />} />
          
          {/* Ruta para crear una nueva tarea */}
          <Route path="/tasks/new" element={<TaskForm />} />
          
          {/* Ruta para editar una tarea */}
          <Route path="/tasks/edit/:id" element={<EditTaskForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
