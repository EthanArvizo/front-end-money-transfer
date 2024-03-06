import React, { useState } from 'react';
import { registerUser } from '../../api/tenmoApi'; // Adjust the import path as needed
import '../../styles/Registration.css';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    registerUser(username, password);
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