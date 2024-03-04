import axiosInstance from '../services/axiosInstance';

const API_BASE_URL = 'http://localhost:8080';

export const getBalance = async (userId, authToken) => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/account/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      // Extract and return only the balance
      return response.data.balance;
    } catch (error) {
      throw error;
    }
  };