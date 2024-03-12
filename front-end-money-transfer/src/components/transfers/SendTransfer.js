import React, { useState } from 'react';
import UserList from './UserList';
import { sendTransfer } from '../../api/transfersApi';
import { getAccountByUserId } from '../../api/accountApi';
import { useAuth } from '../../AuthContext';

const SendTransfer = () => {
  const { authData } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleUserSelect = async (userId) => {
    console.log('Selected User ID:', userId);

    try {
      const account = await getAccountByUserId(userId);
      console.log('Account details:', account);
      // Do something with account details if needed

      setSelectedUserId(userId);
    } catch (error) {
      console.error('Error getting account details:', error.message);
    }
  };

  const handleSendTransfer = async () => {
    if (selectedUserId && amount && authData) {
      try {
        setIsSubmitting(true);
        setError(null);

        // Get the account details for the logged-in user
        const loggedInUserAccount = await getAccountByUserId(authData.user.id);

        // Get the account details for the selected user
        const selectedUserAccount = await getAccountByUserId(selectedUserId);

        // Assuming sendTransfer returns the updated balance or success message
        await sendTransfer(loggedInUserAccount.accountId, selectedUserAccount.accountId, amount);

        // Handle success, e.g., show a success message or redirect
        console.log('Transfer successful');
      } catch (error) {
        // Handle error, e.g., display an error message
        console.error('Error sending transfer:', error.message);
        setError('Error sending transfer. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Handle incomplete form, e.g., show a validation message
      setError('Please select a user and enter an amount.');
    }
  };

  return (
    <div>
      <h2>Send Transfer</h2>
      <UserList onSelectUser={handleUserSelect} />

      {selectedUserId && (
        <div>
          <label>
            Enter the amount:
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>

          <button onClick={handleSendTransfer} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Money'}
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default SendTransfer;