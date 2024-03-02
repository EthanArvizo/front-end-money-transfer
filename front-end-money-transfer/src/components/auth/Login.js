import React, { useState } from 'react';
import { login } from '../../api/tenmoApi'; // Adjust the path based on your actual project structure

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await login(username, password);
      // Handle successful login (e.g., store user token, navigate to dashboard)
    } catch (error) {
      // Handle login error (e.g., display error message)
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