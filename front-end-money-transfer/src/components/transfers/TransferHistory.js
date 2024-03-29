import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { getTransfersByAccountId } from "../../api/transfersApi";
import { getUserByAccountId, getUserById } from "../../api/accountApi";
import { Link, useParams } from "react-router-dom";
import ButtonAppBar from "../common/ButtonAppBar";
import { Box, List, ListItem, ListItemText, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

            const amountWithDecimals = parseFloat(transfer.amount).toFixed(2);

            return (
              <ListItem key={transfer.transferId} button component={Link} to={`/transfer/${transfer.transferId}`}>
                <ListItemText primary={`$${amountWithDecimals} from ${senderUsername.username} to ${receiverUsername.username}`} />
              </ListItem>
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
    <>
      <ButtonAppBar title="Transfer History" />
      <Box sx={{ padding: 2 }}>
        <Button component={Link} to="/dashboard" startIcon={<ArrowBackIcon />}>
          Back to Dashboard
        </Button>
        <List>
          {renderedTransfers}
        </List>
      </Box>
    </>
  );
};

export default TransferHistory;
