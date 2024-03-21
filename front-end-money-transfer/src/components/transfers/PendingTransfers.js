import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getPendingTransfersByAccountId,
  acceptTransfer,
  denyTransfer,
} from "../../api/transfersApi";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import ButtonAppBar from "../common/ButtonAppBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getUserByAccountId, getUserById } from "../../api/accountApi";

const PendingTransfers = () => {
  const [pendingTransfers, setPendingTransfers] = useState(null);
  const { accountId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingTransfersResponse = await getPendingTransfersByAccountId(
          accountId
        );
        // Fetch sender and receiver usernames for each transfer
        const transfersWithUsernames = await Promise.all(
          pendingTransfersResponse.map(async (transfer) => {
            const senderUserDetails = await getUserByAccountId(
              transfer.accountFrom
            );
            const senderName = await getUserById(senderUserDetails.id);
            const receiverUserDetails = await getUserByAccountId(
              transfer.accountTo
            );
            const receiverName = await getUserById(receiverUserDetails.id);
            return {
              ...transfer,
              senderUsername: senderName.username,
              receiverUsername: receiverName.username,
            };
          })
        );
        setPendingTransfers(transfersWithUsernames);
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
      <Box sx={{ display: "flex", alignItems: "center", paddingLeft: 2 }}>
        <Button component={Link} to="/dashboard" startIcon={<ArrowBackIcon />}>
          Back to Dashboard
        </Button>
      </Box>
      <div>
        {pendingTransfers !== null ? (
          <List>
            {pendingTransfers.map((transfer) => (
              <ListItem key={transfer.transferId}>
                <ListItemText
                  primary={`Amount: $${transfer.amount}`}
                  secondary={`From: ${transfer.senderUsername}, To: ${transfer.receiverUsername}`}
                />
                <Button
                  component={Link}
                  to={`/transfer/${transfer.transferId}`}
                  variant="contained"
                  color="info"
                >
                  View Details
                </Button>
                <Button
                  onClick={() => handleAcceptTransfer(transfer.transferId)}
                  variant="contained"
                  color="primary"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => handleDenyTransfer(transfer.transferId)}
                  variant="contained"
                  color="error"
                >
                  Deny
                </Button>
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
