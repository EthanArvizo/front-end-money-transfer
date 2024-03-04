import React, { useState } from 'react';
import { login } from '../../api/tenmoApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { getBalance } from '../../api/accountApi'; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      const authToken = response.token;

      

      // Attempt to fetch the balance
      const balanceResponse = await getBalance(response.user.id, authToken);
      console.log('User balance:', balanceResponse);

      setAuthData({
        authToken,
        user: response.user,
      });

      // Handle successful login (e.g., navigate to dashboard)
      console.log('Login successful:', response);

      // Example: navigate to the dashboard (adjust this based on your routing)
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;