import axios from "axios";
import getAuthToken from "./getAuthToken";

const instance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your API's base URL
});

// Function to update the authorization token
export const updateAuthToken = () => {
  instance.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${getAuthToken()}`;
};

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Set common headers for every request
    if (!config.headers) {
      config.headers = {};
    }

    // Include the authorization token
    updateAuthToken();

    return config;
  },
  function (error) {
    // Handle request error
    return Promise.reject(error);
  }
);

export default instance;
