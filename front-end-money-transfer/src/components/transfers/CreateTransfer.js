import React, { useState } from "react";
import UserList from "./UserList";
import { sendTransfer, requestTransfer } from "../../api/transfersApi";
import { getAccountByUserId } from "../../api/accountApi";
import { useAuth } from "../../AuthContext";

const SendTransfer = () => {
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
    <div>
      <h2>Create Transfer</h2>
      <UserList
        onSelectUser={handleUserSelect}
        loggedInUserId={authData.user.id}
      />

      {selectedUserId && (
        <div>
          <label>
            Enter the amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>

          <button onClick={handleSendTransfer} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Money"}
          </button>

          <button onClick={handleRequestTransfer} disabled={isSubmitting}>
            {isSubmitting ? "Requesting..." : "Request Money"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default SendTransfer;
