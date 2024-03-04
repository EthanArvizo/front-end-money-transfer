// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './components/auth/Login';
import HomePage from './components/HomePage';
import MoneyTransfer from './components/dashboard/MoneyTransfer';

function App() {
  useEffect(() => {
    console.log('App rendered');
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/money-transfer" element={<MoneyTransfer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;