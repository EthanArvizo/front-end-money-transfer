import axiosInstance from '../services/axiosInstance';
import { getUserByAccountId } from './accountApi';

// Function to get transfers by account ID
export const getTransfersByAccountId = async (accountId) => {
    try {
      const response = await axiosInstance.get(`/transfer/account/${accountId}`);
  
      // Check if the response has the expected properties
      if (Array.isArray(response.data)) {
        // Map transfer objects to include sender and receiver details
        const transfersWithUserDetails = await Promise.all(
          response.data.map(async (transfer) => {
            const senderUser = await getUserByAccountId(transfer.accountFrom);
            const receiverUser = await getUserByAccountId(transfer.accountTo);
  
            return {
              ...transfer,
              senderUser,
              receiverUser,
            };
          })
        );
  
        return transfersWithUserDetails;
      } else {
        console.error('Invalid transfers response:', response.data);
        throw new Error('Invalid transfers response');
      }
    } catch (error) {
      throw error;
    }
  };

  export const getPendingTransfersByAccountId = async (accountId) => {
    try {
      const response = await axiosInstance.get(`/transfer/account/${accountId}/pending`);
  
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

  export const sendTransfer = async (accountFrom, accountTo, amount) => {
    try {
      const transferData = {
        accountFrom, // Adding the accountFrom field
        accountTo,
        amount,
        
       
      };

      console.log('Transfer data:', transferData);
  
      // Your server-side endpoint for creating a send transfer
      const response = await axiosInstance.post('/transfer/send', transferData);
      console.log('Server response:', response.data);
  
      // Check if the response indicates success (you may need to adjust this based on your server's response format)
      if (response.data === 'Transfer created successfully') {
        // Optionally, you can handle success here, log, or perform additional actions
        console.log('Transfer created successfully');
      } else {
        // Handle other responses or errors as needed
        console.error('Error creating transfer:', response.data);
        throw new Error('Error creating transfer');
      }
    } catch (error) {
      // Enhance the error handling to get more information
      console.error('Error sending transfer:', error);
  
      // Check if the error has a response
      if (error.response) {
        // Log the response status and data
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
  
      throw error;
    }
  };