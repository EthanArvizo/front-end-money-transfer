// MoneyTransfer.js
import React, { useEffect, useState } from 'react';
import { getBalance } from '../../api/accountApi';
import { useAuth } from '../../AuthContext';
import '../../styles/Dashboard.css';


const MoneyTransfer = () => {

  const { authData } = useAuth();
  const [balance, setBalance] = useState(null);

  useEffect(() => {

    if (authData) {
      const { user, authToken } = authData;

      const fetchBalance = async () => {
        try {
          const balanceResponse = await getBalance(user.id, authToken);
          console.log('User balance response:', balanceResponse);

          if (typeof balanceResponse === 'number') {
            console.log('Setting balance:', balanceResponse);
            setBalance(balanceResponse);
          } else {
            console.error('Invalid balance value:', balanceResponse);
          }
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      };

      fetchBalance();
    }
  }, [authData]);

  return (
    <div className="dashboard-container">
      <h1 className="balance-info">Money Transfer Dashboard</h1>

      {/* Display User Balance */}
      {balance !== null ? (
        <p className="balance-info">Welcome, {authData.user.username}! Your current balance is: ${balance}</p>
      ) : (
        <p>Loading balance...</p>
      )}

      {/* Your additional dashboard content goes here */}
    </div>
  );
};

export default MoneyTransfer;
