import axios from 'axios';

// Criação da instância do Axios
const api = axios.create({
    baseURL: 'http://localhost:3000', // Substitua pela URL do seu backend
});

// Interceptor para adicionar o token JWT no cabeçalho de todas as requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

export default api;
