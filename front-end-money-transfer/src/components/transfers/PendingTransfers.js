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
  Collapse,
} from "@mui/material";
import ButtonAppBar from "../common/ButtonAppBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TransferDetails from "../transfers/TransferDetails"; // Import TransferDetails component

const PendingTransfers = () => {
  const [pendingTransfers, setPendingTransfers] = useState(null);
  const { accountId } = useParams();
  const [selectedTransfer, setSelectedTransfer] = useState(null); // Track the selected transfer

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
      const updatedPendingTransfers = await getPendingTransfersByAccountId(
        accountId
      );
      setPendingTransfers(updatedPendingTransfers);
    } catch (error) {
      console.error("Error denying transfer:", error);
    }
  };

  const handleViewDetails = (transferId) => {
    setSelectedTransfer((prevTransferId) => {
      if (prevTransferId === transferId) {
        return null; // Clear the selection if it's already the same
      } else {
        return transferId; // Set the selected transfer
      }
    });
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
              <React.Fragment key={transfer.transferId}>
                <ListItem>
                  <ListItemText
                    primary={`Transfer ID: ${transfer.transferId}, Amount: $${transfer.amount}`}
                  />
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
                  <Button
                    onClick={() => handleViewDetails(transfer.transferId)}
                    variant="outlined"
                  >
                    View Details
                  </Button>
                </ListItem>
                <Collapse
                  in={selectedTransfer === transfer.transferId}
                  timeout="auto"
                  unmountOnExit
                >
                  {selectedTransfer === transfer.transferId && (
                    <TransferDetails transferId={transfer.transferId} />
                  )}
                </Collapse>
              </React.Fragment>
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
