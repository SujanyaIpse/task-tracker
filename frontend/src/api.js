import axios from 'axios';

// Create an instance of axios with the base URL set to the backend API
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Default to localhost:5000 if not set in the environment variable
});

// Interceptor to add Authorization token (if available) to request headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const createTask = (task) => API.post('/api/tasks', task);  // Adding /api prefix here
export const fetchTasks = () => API.get('/api/tasks'); // Similarly for other routes
export const updateTask = (id, task) => API.patch(`/api/tasks/${id}`, task);

export const deleteTask = (id) => API.delete(`/api/tasks/${id}`);