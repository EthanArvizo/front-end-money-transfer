import React, { useEffect, useState } from 'react';
import { useAuth } from '../../AuthContext';
import { getBalance } from '../../api/accountApi';

const Dashboard = () => {
  const { user } = useAuth(); // Access the user information from the AuthContext
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');

    const fetchBalance = async () => {
      try {
        const userId = 1001; // Replace this with the actual user ID
        const balance = await getBalance(userId);
        setBalance(balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    if (authToken && user) {
      fetchBalance();
    }
  }, [user]); // Re-run the effect when the user object changes

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      {balance !== null ? (
        <p>Your current balance: ${balance.toFixed(2)}</p>
      ) : (
        <p>Loading balance...</p>
      )}
      {/* Add more components to display other information or functionalities */}
    </div>
  );
};

export default Dashboard;