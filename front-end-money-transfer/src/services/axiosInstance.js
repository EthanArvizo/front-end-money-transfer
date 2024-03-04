import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',  // Your backend URL
  withCredentials: true,
});

export default axiosInstance;