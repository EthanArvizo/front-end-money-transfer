import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Replace with your backend URL

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data; // Adjust based on your API response structure
  } catch (error) {
    throw error; // Propagate the error for handling in the component
  }
};