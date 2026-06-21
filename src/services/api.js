import axios from 'axios';

const api = axios.create({
  baseURL: 'https://document-management-system-b3ao.onrender.com/api/auth',
});

export default api;