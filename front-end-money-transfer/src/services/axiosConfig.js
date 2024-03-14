import axios from 'axios';

const getAuthToken = () => {
  // Your logic to obtain the auth token, for example, from localStorage
  return localStorage.getItem('authToken');
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Set common headers for every request
    const authToken = getAuthToken();
    config.headers.common['Authorization'] = `Bearer ${authToken}`;
    config.baseURL = 'http://localhost:8080';

    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

export default axios;