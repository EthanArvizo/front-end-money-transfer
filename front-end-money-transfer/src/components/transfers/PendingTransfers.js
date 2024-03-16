import React, { useEffect, useState } from 'react';
import { getPendingTransfersByAccountId, acceptTransfer, denyTransfer } from '../../api/transfersApi';
import { useParams } from 'react-router-dom';

const PendingTransfers = () => {
  const [pendingTransfers, setPendingTransfers] = useState(null);
  const { accountId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingTransfersResponse = await getPendingTransfersByAccountId(accountId);
        setPendingTransfers(pendingTransfersResponse);
      } catch (error) {
        console.error('Error fetching pending transfers:', error);
      }
    };

    fetchData();
  }, [accountId]);

  const handleAcceptTransfer = async (transferId) => {
    try {
      await acceptTransfer(transferId);
      // After accepting the transfer, fetch updated pending transfers
      const updatedPendingTransfers = await getPendingTransfersByAccountId(accountId);
      setPendingTransfers(updatedPendingTransfers);
    } catch (error) {
      console.error('Error accepting transfer:', error);
    }
  };

  const handleDenyTransfer = async (transferId) => {
    try {
      await denyTransfer(transferId);
      // After denying the transfer, fetch updated pending transfers
      const updatedPendingTransfers = await getPendingTransfersByAccountId(accountId);
      setPendingTransfers(updatedPendingTransfers);
    } catch (error) {
      console.error('Error denying transfer:', error);
    }
  };

  return (
    <div>
      <h2>Pending Transfers</h2>
      {pendingTransfers !== null ? (
        <ul>
          {pendingTransfers.map((transfer) => (
            <li key={transfer.transferId}>
              Transfer ID: {transfer.transferId}, Amount: ${transfer.amount}
              <button onClick={() => handleAcceptTransfer(transfer.transferId)}>Accept</button>
              <button onClick={() => handleDenyTransfer(transfer.transferId)}>Deny</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading pending transfers...</p>
      )}
    </div>
  );
};

export default PendingTransfers;
