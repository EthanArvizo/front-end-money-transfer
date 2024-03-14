import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Set your API base URL here
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const authToken = localStorage.getItem('authToken'); // Fetch the authToken from localStorage
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosInstance;