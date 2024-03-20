import React, { useEffect, useState } from "react";
import {
  getPendingTransfersByAccountId,
  acceptTransfer,
  denyTransfer,
} from "../../api/transfersApi";
import { useParams } from "react-router-dom";
import { List, ListItem, ListItemText, Button, CircularProgress } from "@mui/material";
import ButtonAppBar from "../common/ButtonAppBar";

const PendingTransfers = () => {
  const [pendingTransfers, setPendingTransfers] = useState(null);
  const { accountId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingTransfersResponse = await getPendingTransfersByAccountId(
          accountId
        );
        setPendingTransfers(pendingTransfersResponse);
      } catch (error) {
        console.error("Error fetching pending transfers:", error);
      }
    };

    fetchData();
  }, [accountId]);

  const handleAcceptTransfer = async (transferId) => {
    try {
      await acceptTransfer(transferId);
      // After accepting the transfer, fetch updated pending transfers
      const updatedPendingTransfers = await getPendingTransfersByAccountId(
        accountId
      );
      setPendingTransfers(updatedPendingTransfers);
    } catch (error) {
      console.error("Error accepting transfer:", error);
    }
  };

  const handleDenyTransfer = async (transferId) => {
    try {
      await denyTransfer(transferId);
      // After denying the transfer, fetch updated pending transfers
      const updatedPendingTransfers = await getPendingTransfersByAccountId(
        accountId
      );
      setPendingTransfers(updatedPendingTransfers);
    } catch (error) {
      console.error("Error denying transfer:", error);
    }
  };

  return (
    <>
      <ButtonAppBar title="Pending Transfers" />
      <div>
        {pendingTransfers !== null ? (
          <List>
            {pendingTransfers.map((transfer) => (
              <ListItem key={transfer.transferId}>
                <ListItemText primary={`Transfer ID: ${transfer.transferId}, Amount: $${transfer.amount}`} />
                <Button onClick={() => handleAcceptTransfer(transfer.transferId)} variant="contained" color="primary">Accept</Button>
                <Button onClick={() => handleDenyTransfer(transfer.transferId)} variant="contained" color="error">Deny</Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <CircularProgress />
        )}
      </div>
    </>
  );
};

export default PendingTransfers;
