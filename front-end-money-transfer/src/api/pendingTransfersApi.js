import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace with your actual API base URL

const getPendingTransfersByAccountId = async (accountId, authToken) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/transfer/account/${accountId}/pending`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching pending transfers:', error);
    console.log('Request Headers:', error.config.headers); // Add this line to log headers

    throw error;
  }
};

export { getPendingTransfersByAccountId };