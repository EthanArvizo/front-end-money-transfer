import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './components/auth/Login';
import HomePage from './components/HomePage';
import MoneyTransfer from './components/dashboard/MoneyTransfer'; // Import the MoneyTransfer component

function App() {
  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/money-transfer" element={<MoneyTransfer />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;