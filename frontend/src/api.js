import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/auth', // Express Backend
    withCredentials: true // 👈 Cookies automatic bhejne ke liye
});

export default api;