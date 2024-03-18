import axiosInstance from "../services/axiosInstance";

const getBalance = async (userId) => {
  try {
    const response = await axiosInstance.get(`/account/${userId}`);

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
      console.error("Invalid balance response:", response.data);
      throw new Error("Invalid balance response");
    }
  } catch (error) {
    throw error;
  }
};

const getAccountByUserId = async (userId) => {
  try {
    const response = await axiosInstance.get(`/account/${userId}`);

    // Check if the response has the expected properties
    if (response.data && response.data.accountId !== undefined) {
      // Return the account details
      return response.data;
    } else {
      console.error("Invalid account details response:", response.data);
      throw new Error("Invalid account details response");
    }
  } catch (error) {
    throw error;
  }
};

export default getAccountByUserId;

const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}`);

    // Check if the response has the expected properties
    if (
      response.data &&
      response.data.id !== undefined &&
      response.data.username !== undefined
    ) {
      // Return the user details
      return response.data;
    } else {
      console.error("Invalid user details response:", response.data);
      throw new Error("Invalid user details response");
    }
  } catch (error) {
    throw error;
  }
};

const getUserByAccountId = async (accountId) => {
  try {
    // Assuming you have an endpoint like /user/byAccount/{accountId}
    const response = await axiosInstance.get(`/account/byAccount/${accountId}`);

    // Check if the response has the expected properties
    if (response.data && response.data.id !== undefined) {
      // Return the user details
      return response.data;
    } else {
      console.error("Invalid user response:", response.data);
      throw new Error("Invalid user response");
    }
  } catch (error) {
    throw error;
  }
};

export { getBalance, getAccountByUserId, getUserById, getUserByAccountId };
