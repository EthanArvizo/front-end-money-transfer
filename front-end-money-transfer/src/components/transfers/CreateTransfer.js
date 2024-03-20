import React, { useState } from "react";
import UserList from "./UserList";
import { sendTransfer, requestTransfer } from "../../api/transfersApi";
import { getAccountByUserId } from "../../api/accountApi";
import { useAuth } from "../../AuthContext";
import ButtonAppBar from "../common/ButtonAppBar";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography
} from "@mui/material";

const CreateTransfer = () => {
  const { authData } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleUserSelect = async (userId) => {
    setSelectedUserId(userId);
  };

  const handleSendTransfer = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      if (!selectedUserId || !amount || !authData) {
        throw new Error("Please select a user and enter an amount.");
      }

      const loggedInUserAccount = await getAccountByUserId(authData.user.id);
      const selectedUserAccount = await getAccountByUserId(selectedUserId);

      await sendTransfer(
        loggedInUserAccount.accountId,
        selectedUserAccount.accountId,
        amount
      );

      setSuccessMessage("Transfer successfully sent.");
    } catch (error) {
      console.error("Error sending transfer:", error.message);
      setError("Error sending transfer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestTransfer = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      setSuccessMessage(null);

      if (!selectedUserId || !amount || !authData) {
        throw new Error("Please select a user and enter an amount.");
      }

      const loggedInUserAccount = await getAccountByUserId(authData.user.id);
      const selectedUserAccount = await getAccountByUserId(selectedUserId);

      await requestTransfer(
        loggedInUserAccount.accountId,
        selectedUserAccount.accountId,
        amount
      );

      setSuccessMessage("Transfer request successfully sent.");
    } catch (error) {
      console.error("Error requesting transfer:", error.message);
      setError("Error requesting transfer. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ButtonAppBar title="Create Transfer" />
      <Box p={2}>
        <UserList
          onSelectUser={handleUserSelect}
          loggedInUserId={authData.user.id}
        />
  
        {selectedUserId && (
          <Box mt={2}>
            <TextField
              label="Enter the amount"
              type="text" // Change the type to 'text'
              value={'$' + amount} // Prepend '$' to the amount value
              onChange={(e) => setAmount(e.target.value.substring(1))} // Exclude the '$' when setting the amount
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            />
  
            <Button
              onClick={handleSendTransfer}
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : (
                "Send Money"
              )}
            </Button>
  
            <Button
              onClick={handleRequestTransfer}
              disabled={isSubmitting}
              variant="contained"
              color="primary"
            >
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : (
                "Request Money"
              )}
            </Button>
  
            <Box mt={2}>
              {error && (
                <Typography color="error">{error}</Typography>
              )}
              {successMessage && (
                <Typography color="success">{successMessage}</Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CreateTransfer;
