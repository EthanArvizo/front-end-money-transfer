import axiosInstance from '../services/axiosConfig';

// Function to get transfers by account ID
export const getTransfersByAccountId = async (accountId) => {
    try {
      const response = await axiosInstance.get(`/transfer/account/${accountId}`);
  
      // Check if the response has the expected properties
      if (Array.isArray(response.data)) {
        // Return the array of transfers
        return response.data;
      } else {
        console.error('Invalid transfers response:', response.data);
        throw new Error('Invalid transfers response');
      }
    } catch (error) {
      throw error;
    }
  };