import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'https://document-management-system-b3ao.onrender.com/api',
});

export default baseApi;