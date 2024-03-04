import React, { useState, useEffect } from 'react';
import { login } from '../../api/tenmoApi';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [balance] = useState(null); // Define setBalance function
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
      navigate('/money-transfer'); // Adjust the route based on your application structure
  
      console.log('Login successful:', response);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (e.g., display an error message to the user)
    }
  };

  useEffect(() => {
    if (balance !== null) {
      console.log('User balance:', balance);
    }
  }, [balance]);

  return (
    <div>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>

      {/* Display the balance */}
      {balance !== null && <p>User balance: {balance}</p>}
    </div>
  );
};

export default Login;