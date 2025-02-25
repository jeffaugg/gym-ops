import axios from 'axios';


const api = axios.create({
    baseURL: 'http://164.68.101.141:3001', 
});


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
