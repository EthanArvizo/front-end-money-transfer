import axios from 'axios';
import getAuthToken from './getAuthToken';

const authToken = getAuthToken();

const instance = axios.create({
  baseURL: 'http://localhost:8080', // Replace with your API's base URL
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Set common headers for every request
    if (!config.headers) {
      config.headers = {};
    }

    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

export default instance;