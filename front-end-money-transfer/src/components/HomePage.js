import React from 'react';
import { Link } from 'react-router-dom';
import Login from './auth/Login'; // Adjust the path based on your actual project structure

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to My App!</h1>
      <p>Please log in to access your account:</p>
      <Login />
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
};

export default HomePage;