import React, { useState } from 'react';
import { login } from '../../api/tenmoApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import '../../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      const authToken = response.token;
  
      setAuthData({
        authToken,
        user: response.user,
      });
  
      // Navigate to the dashboard (MoneyTransfer component)
      console.log('Navigating to /money-transfer');
      navigate('/money-transfer'); // Adjust the route based on your application structure
  
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <div className="register-link">
          Don't have an account? <a href="#">Register</a>
        </div>
      </form>
    </div>
  );
};

export default Login;