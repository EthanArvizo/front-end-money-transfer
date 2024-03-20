import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  CircularProgress,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import { getTransferDetailsById } from "../../api/transfersApi";
import { getUserByAccountId, getUserById } from "../../api/accountApi";

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

        if (
          transferDetails &&
          transferDetails.accountFrom &&
          transferDetails.accountTo
        ) {
          const senderUserDetails = await getUserByAccountId(
            transferDetails.accountFrom
          );
          const senderName = await getUserById(senderUserDetails.id);
          setSenderUsername(senderName.username);

          const receiverUserDetails = await getUserByAccountId(
            transferDetails.accountTo
          );
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
    return <CircularProgress />;
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Transfer Details
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Transfer ID: {transfer.transferId}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Amount: {transfer.amount}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">From: {senderUsername}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">To: {receiverUsername}</Typography>
          </Grid>
          {/* Add more details here as needed */}
        </Grid>
      </Paper>
    </Box>
  );
};

export default TransferDetails;
