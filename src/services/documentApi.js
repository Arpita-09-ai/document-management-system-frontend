import axios from 'axios';

const documentApi = axios.create({
  baseURL: 'https://document-management-system-b3ao.onrender.com/api/documents',
});

export default documentApi;