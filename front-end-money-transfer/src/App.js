import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Login from "./components/auth/Login";
import HomePage from "./HomePage";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/auth/Registration";
import TransferHistory from "./components/transfers/TransferHistory";
import SendTransfer from "./components/transfers/SendTransfer";
import TransferDetails from "./components/transfers/TransferDetails";

function App() {
  useEffect(() => {
    console.log("App rendered");
    // You can perform initial authentication check here
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transfer/account/:accountId" element={<TransferHistory />} />
          <Route path="/transfer/:transferId" element={<TransferDetails />} /> 
          <Route path="/send-transfer" element={<SendTransfer />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;