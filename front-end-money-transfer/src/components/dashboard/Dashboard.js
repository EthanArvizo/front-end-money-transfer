import React, { useEffect, useState } from 'react';
import { getAccountByUserId } from '../../api/accountApi';
import { useAuth } from '../../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const { authData, setAuthData } = useAuth();
  const [balance, setBalance] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authData) {
      const { user, authToken } = authData;

      const fetchData = async () => {
        try {
          // Fetch account details using userId
          const accountResponse = await getAccountByUserId(user.id, authToken);
          console.log('User account response:', accountResponse);
          setAccountId(accountResponse.accountId);
          setBalance(accountResponse.balance);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [authData]);

  const handleLogout = () => {
    // Clear authentication data from local storage
    localStorage.removeItem('authToken');
    // Clear authentication data from context
    setAuthData(null);
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h1 className="balance-info">Money Transfer Dashboard</h1>

      {/* Display User Balance and Account ID */}
      {authData && accountId !== null ? (
        <div>
          <p className="balance-info">Welcome, {authData.user.username}! Your current balance is: ${balance}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      {/* Link to Pending Transfers */}
      {authData ? (
        <Link to={`/account/${accountId}/pending`}>
          <button>View Pending Transfers</button>
        </Link>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}

      {/* Link to TransferHistory */}
      <Link to={`/transfer/account/${accountId}`}>
        <button>Transfer History</button>
      </Link>

      {/* Link to Create Transfer */}
      <Link to="/send-transfer">
        <button>Create Transfer</button>
      </Link>

      {/* Logout option */}
      {authData && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
};

export default Dashboard;
