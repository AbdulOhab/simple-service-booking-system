import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: { //collecting Json formate responce 
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage
api.interceptors.request.use((config) => {
  // collecting data from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
