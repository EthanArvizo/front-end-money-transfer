// App.js
import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./components/auth/Login";
import HomePage from "./components/HomePage";
import DashBoard from "./components/dashboard/Dashboard";
import Register from './components/auth/Registration';

function App() {
  useEffect(() => {
    console.log("App rendered");
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
