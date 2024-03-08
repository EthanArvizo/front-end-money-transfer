import React, { useEffect, useState } from 'react';
import {getAccountByUserId } from '../../api/accountApi';
import { getPendingTransfersByAccountId } from '../../api/transfersApi';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';
import '../../styles/Dashboard.css';

const Dashboard = () => {
  const { authData } = useAuth();
  const [balance, setBalance] = useState(null);
  const [accountId, setAccountId] = useState(null);
  const [pendingTransfers, setPendingTransfers] = useState(null);
  const [showPendingTransfers, setShowPendingTransfers] = useState(false);

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

          // Fetch pending transfers using accountId from transfersApi
          const pendingTransfersResponse = await getPendingTransfersByAccountId(accountResponse.accountId, authToken);
          console.log('Pending transfers response:', pendingTransfersResponse);
          setPendingTransfers(pendingTransfersResponse);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [authData]);

  return (
    <div className="dashboard-container">
      <h1 className="balance-info">Money Transfer Dashboard</h1>

      {/* Display User Balance and Account ID */}
      {balance !== null && accountId !== null ? (
        <div>
          <p className="balance-info">Welcome, {authData.user.username}! Your current balance is: ${balance}</p>
        </div>
      ) : (
        <p>Loading data...</p>
      )}

      {/* Display Pending Transfers Button */}
      <button onClick={() => setShowPendingTransfers(!showPendingTransfers)}>
        {showPendingTransfers ? 'Hide Pending Transfers' : 'Show Pending Transfers'}
      </button>

      {/* Display Pending Transfers */}
      {showPendingTransfers && pendingTransfers !== null ? (
        <div>
          <h2 className="balance-info">Pending Transfers</h2>
          <ul>
            {pendingTransfers.map((transfer) => (
              <li key={transfer.transferId}>
                Transfer ID: {transfer.transferId}, Amount: ${transfer.amount}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {/* Link to TransferHistory */}
      <Link to={`/transfer/account/${accountId}`}>Transfer History</Link>

      {/* Your additional dashboard content goes here */}
    </div>
  );
};

export default Dashboard;