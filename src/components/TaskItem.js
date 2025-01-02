import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete, onEdit, onToggle }) => {
  return (
    <li key={task._id} style={styles.item}>
      <h3>{task.title}</h3>
      <p>{task.description ? task.description : 'Sin descripción'}</p> 
      
      <div style={styles.checkboxContainer}>
        {/* Etiqueta para el checkbox con texto descriptivo */}
        <label htmlFor={`checkbox-${task._id}`} style={styles.checkboxLabel}>
          <input 
            type="checkbox" 
            id={`checkbox-${task._id}`}
            checked={task.completed} 
            onChange={() => onToggle(task._id)} // Llamar a onToggle para alternar el estado
            style={styles.checkbox}
          />
          <span>{task.completed ? 'Completada' : 'Pendiente'}</span>
        </label>
      </div>

      <p>{new Date(task.createdAt).toLocaleDateString()}</p>

      <div className="button-container" style={styles.buttonContainer}>
        {/* Botón para eliminar tarea */}
        <button onClick={() => onDelete(task._id)} style={styles.button}>Eliminar</button>
        
        {/* Enlace para editar tarea */}
        <Link to={`/tasks/edit/${task._id}`} style={styles.editLink}>
          <button style={styles.button}>Editar</button>
        </Link>
      </div>
    </li>
  );
};

// Estilos básicos para el componente
const styles = {
  item: {
    listStyleType: 'none',
    border: '1px solid #ddd',
    padding: '16px',
    marginBottom: '8px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  checkbox: {
    marginRight: '10px',
  },
  buttonContainer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '8px 12px',
    marginRight: '10px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  editLink: {
    textDecoration: 'none',
  }
};

export default TaskItem;
