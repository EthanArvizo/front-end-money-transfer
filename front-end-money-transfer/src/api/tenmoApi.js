import axiosInstance from '../services/axiosInstance';


const API_BASE_URL = 'http://localhost:8080';  // Adjust the URL based on your backend's address

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
  

    return response.data;
  } catch (error) {
    throw error;
  } 
};

