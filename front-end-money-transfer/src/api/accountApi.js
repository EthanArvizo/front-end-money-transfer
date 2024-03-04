import axios from 'axios';

const getBalance = async (userId, authToken) => {
  try {
    const response = await axios({
      method: 'get',
      url: `http://localhost:8080/account/${userId}`,
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

export { getBalance };