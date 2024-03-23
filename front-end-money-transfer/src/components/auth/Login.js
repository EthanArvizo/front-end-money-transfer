import React, { useState, useEffect } from "react";
import { updateAuthToken } from "../../services/axiosInstance";
import { login } from "../../api/tenmoApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Grid,
  Box,
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  useEffect(() => {
    // Reset authData when the component mounts (on the login page)
    setAuthData(null);
  }, [setAuthData]);

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      const authToken = response.token;
      localStorage.setItem("authToken", authToken);
      // Update auth data with the new token
      setAuthData({
        authToken,
        user: response.user,
      });
      // Update the authorization token in the Axios instance
      updateAuthToken();
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., display an error message to the user)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span
          class="material-symbols-outlined"
          style={{ fontSize: 40, color: "green" }}
        >
          payments
        </span>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
