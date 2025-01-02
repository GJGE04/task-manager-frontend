import axios from 'axios';

// Configuración de la URL base de la API
const API_URL = 'http://localhost:5000/api/tasks'; // Cambia esto si tu backend está en otro puerto

// Función para obtener todas las tareas
export const getTasks = async () => {
  return axios.get(API_URL); // Realiza la solicitud GET a la API
};

// Función para agregar una nueva tarea
export const addTask = async (task) => {
  return axios.post(API_URL, task); // Realiza la solicitud POST a la API
};

// Obtener una tarea por ID
export const getTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    throw error;
  }
};

// Actualizar una tarea
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response;
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    throw error;
  }
};

// Función para eliminar una tarea
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    throw error; // Opcional: Lanza el error para manejarlo en el componente
  }
};
