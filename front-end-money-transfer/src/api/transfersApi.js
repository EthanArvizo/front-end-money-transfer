import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace with your actual API base URL

const getPendingTransfersByAccountId = async (accountId, authToken) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/transfer/account/${accountId}/pending`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Check if the response has the expected properties
    if (Array.isArray(response.data)) {
      // Return the array of pending transfers
      return response.data;
    } else {
      console.error('Invalid pending transfers response:', response.data);
      throw new Error('Invalid pending transfers response');
    }
  } catch (error) {
    throw error;
  }
};

export { getPendingTransfersByAccountId };