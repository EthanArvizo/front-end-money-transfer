import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data from local storage
    localStorage.removeItem('authToken');
    // Clear authentication data from context
    setAuthData(null);
    // Redirect to the login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;