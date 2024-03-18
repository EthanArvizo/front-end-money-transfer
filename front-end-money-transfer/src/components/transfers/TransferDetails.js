import React, { useState, useEffect } from "react";
import { getTransferDetailsById } from "../../api/transfersApi";
import { getUserByAccountId, getUserById } from "../../api/accountApi";
import { useParams } from "react-router-dom";

const TransferDetails = () => {
  const { transferId } = useParams();
  const [transfer, setTransfer] = useState(null);
  const [senderUsername, setSenderUsername] = useState("");
  const [receiverUsername, setReceiverUsername] = useState("");

  useEffect(() => {
    const fetchTransferDetails = async () => {
      try {
        const transferDetails = await getTransferDetailsById(transferId);
        setTransfer(transferDetails);

        // Check if transferDetails contains valid accountFrom and accountTo values
        if (
          transferDetails &&
          transferDetails.accountFrom &&
          transferDetails.accountTo
        ) {
          // Fetch sender user details
          const senderUserDetails = await getUserByAccountId(
            transferDetails.accountFrom
          );
          // Fetch username for sender
          const senderName = await getUserById(senderUserDetails.id);
          setSenderUsername(senderName.username);

          // Fetch user details for receiver
          const receiverUserDetails = await getUserByAccountId(
            transferDetails.accountTo
          );
          // Fetch username for receiver
          const receiverName = await getUserById(receiverUserDetails.id);
          setReceiverUsername(receiverName.username);
        } else {
          console.error(
            "Invalid accountFrom or accountTo values in transfer details:",
            transferDetails
          );
        }
      } catch (error) {
        console.error("Error fetching transfer details:", error);
      }
    };

    fetchTransferDetails();
  }, [transferId]);

  if (!transfer) {
    return <div>Loading transfer details...</div>;
  }

  return (
    <div>
      <h2>Transfer Details</h2>
      <p>Transfer ID: {transfer.transferId}</p>
      <p>Amount: {transfer.amount}</p>
      <p>From: {senderUsername}</p>
      <p>To: {receiverUsername}</p>
      {/* Add more details here as needed */}
    </div>
  );
};

export default TransferDetails;
