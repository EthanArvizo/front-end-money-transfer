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