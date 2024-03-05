import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace with your actual API base URL

const getBalance = async (userId, authToken) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/account/${userId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Check if the response has the expected properties
    if (
      response.data &&
      response.data.accountId !== undefined &&
      response.data.id !== undefined &&
      response.data.balance !== undefined
    ) {
      // Return the balance
      return response.data.balance;
    } else {
      console.error('Invalid balance response:', response.data);
      throw new Error('Invalid balance response');
    }
  } catch (error) {
    throw error;
  }
};

const getAccountByUserId = async (userId, authToken) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/account/${userId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    // Check if the response has the expected properties
    if (response.data && response.data.accountId !== undefined) {
      // Return the account details
      return response.data;
    } else {
      console.error('Invalid account details response:', response.data);
      throw new Error('Invalid account details response');
    }
  } catch (error) {
    throw error;
  }
};



export { getBalance, getAccountByUserId};
