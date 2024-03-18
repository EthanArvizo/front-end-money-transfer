import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { getTransfersByAccountId } from "../../api/transfersApi";
import { getUserByAccountId, getUserById } from "../../api/accountApi";
import { Link, useParams } from "react-router-dom";

const TransferHistory = () => {
  const { authData } = useAuth();
  const { accountId } = useParams();
  const [transfers, setTransfers] = useState([]);
  const [renderedTransfers, setRenderedTransfers] = useState([]);

  useEffect(() => {
    const fetchTransferHistory = async () => {
      if (authData && authData.user) {
        try {
          const transferHistory = await getTransfersByAccountId(
            accountId,
            authData.user.authToken
          );
          setTransfers(transferHistory);
        } catch (error) {
          console.error("Error fetching transfer history:", error);
        }
      }
    };

    fetchTransferHistory();
  }, [authData, accountId]);

  useEffect(() => {
    const renderTransfers = async () => {
      const rendered = await Promise.all(
        transfers.map(async (transfer) => {
          try {
            // Fetch user details for sender
            const senderUserDetails = await getUserByAccountId(
              transfer.accountFrom,
              authData.user.authToken
            );

            // Fetch username for sender
            const senderUsername = await getUserById(
              senderUserDetails.id,
              authData.user.authToken
            );

            // Fetch user details for receiver
            const receiverUserDetails = await getUserByAccountId(
              transfer.accountTo,
              authData.user.authToken
            );

            // Fetch username for receiver
            const receiverUsername = await getUserById(
              receiverUserDetails.id,
              authData.user.authToken
            );

            return (
              <li key={transfer.transferId}>
                <Link to={`/transfer/${transfer.transferId}`}>
                  {`${transfer.amount} from ${senderUsername.username} to ${receiverUsername.username}`}
                </Link>
              </li>
            );
          } catch (error) {
            console.error("Error fetching user details:", error);
            return null;
          }
        })
      );

      setRenderedTransfers(rendered.filter((item) => item !== null));
    };

    renderTransfers();
  }, [transfers, authData]);

  return (
    <div>
      <h2>Transfer History</h2>
      <ul>{renderedTransfers}</ul>
    </div>
  );
};

export default TransferHistory;
