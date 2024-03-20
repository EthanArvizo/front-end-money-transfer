import React, { useEffect, useState } from "react";
import { getAccountByUserId } from "../../api/accountApi";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import ButtonAppBar from "../common/ButtonAppBar";
import { Button, Typography, Box, Grid, Card, CardContent } from "@mui/material";

const Dashboard = () => {
  const { authData } = useAuth();
  const [balance, setBalance] = useState(null);
  const [accountId, setAccountId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (authData) {
        const { user, authToken } = authData;
        try {
          // Fetch account details using userId
          const accountResponse = await getAccountByUserId(user.id, authToken);
          setAccountId(accountResponse.accountId);
          setBalance(accountResponse.balance);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [authData]);

  return (
    <>
      <ButtonAppBar title="Dashboard" />
      <Box sx={{ padding: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={12}>
            {authData && accountId !== null ? (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Welcome, {authData.user.username}!
                  </Typography>
                  <Typography variant="body1">
                    Your current balance is: ${balance}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography variant="body1">Loading data...</Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {authData && accountId !== null && (
              <Link to={`/account/${accountId}/pending`}>
                <Button variant="contained" color="primary">
                  View Pending Transfers
                </Button>
              </Link>
            )}
          </Grid>
          <Grid item xs={12}>
            {accountId !== null && (
              <Link to={`/transfer/account/${accountId}`}>
                <Button variant="contained" color="primary">
                  Transfer History
                </Button>
              </Link>
            )}
          </Grid>
          <Grid item xs={12}>
            <Link to="/send-transfer">
              <Button variant="contained" color="primary">
                Create Transfer
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
