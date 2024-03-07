import React, { useState } from 'react';
import { registerUser } from '../../api/tenmoApi'; // Adjust the import path as needed
import '../../styles/Registration.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      // Call the registerUser function and await its result
      await registerUser(username, password);
  
      // Registration successful, you can redirect the user to the login page or show a success message
      console.log('Registration successful!');
    } catch (error) {
      // Registration failed, handle the error and provide feedback to the user
      console.error('Registration failed:', error);
      // You might want to display an error message to the user
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-heading">Register</h1>
      <form className="registration-form">
        <div className="registration-group">
          <label className="registration-label" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="registration-input"
          />
        </div>
        <div className="registration-group">
          <label className="registration-label" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="registration-input"
          />
        </div>
        <button type="button" onClick={handleRegister} className="registration-button">
          Register
        </button>
      </form>
      <div className="registration-link">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;