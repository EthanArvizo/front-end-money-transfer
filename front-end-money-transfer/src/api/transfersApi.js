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
  export const getTransferDetailsById = async (transferId) => {
    try {
      const response = await axiosInstance.get(`/transfer/${transferId}`);
  
      // Check if the response has the expected properties
      if (response.data && typeof response.data === 'object') {
        // Get sender and receiver details
        await getUserByAccountId(response.data.accountFrom);
        await getUserByAccountId(response.data.accountTo);
  
        // Construct transfer details object
        const transferDetails = {
          transferId: response.data.transferId, // corrected from Id to transferId
          amount: `$${response.data.amount.toFixed(2)}`,
          accountFrom: response.data.accountFrom,
          accountTo: response.data.accountTo,
          type: response.data.transferTypeId, // Assuming transferTypeId corresponds to type
          status: response.data.transferStatusId, // Assuming transferStatusId corresponds to status
        };
  
        return transferDetails;
      }
    } catch (error) {
      console.error('Error fetching transfer details:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };
  

  export const sendTransfer = async (accountFrom, accountTo, amount) => {
    try {
      const transferData = {
        accountFrom, 
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

  export const requestTransfer = async (accountFrom, accountTo, amount) => {
    try {
      const transferData = {
        accountFrom,
        accountTo,
        amount,
      };
  
      console.log('Transfer request data:', transferData);
  
      // Your server-side endpoint for creating a transfer request
      const response = await axiosInstance.post('/transfer/request', transferData);
      console.log('Server response:', response.data);
  
      // Check if the response indicates success (you may need to adjust this based on your server's response format)
      if (response.data === 'Transfer request created successfully') {
        // Optionally, you can handle success here, log, or perform additional actions
        console.log('Transfer request created successfully');
      } else {
        // Handle other responses or errors as needed
        console.error('Error creating transfer request:', response.data);
        throw new Error('Error creating transfer request');
      }
    } catch (error) {
      // Enhance the error handling to get more information
      console.error('Error sending transfer request:', error);
  
      // Check if the error has a response
      if (error.response) {
        // Log the response status and data
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
  
      throw error;
    }
  };

  export const acceptTransfer = async (transferId) => {
    try {
      const response = await axiosInstance.post(`/transfer/accept/${transferId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error accepting transfer: ' + error.message);
    }
  };
  
  // Function to deny a transfer by transferId
  export const denyTransfer = async (transferId) => {
    try {
      const response = await axiosInstance.post(`/transfer/deny/${transferId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error denying transfer: ' + error.message);
    }
  };

