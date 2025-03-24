// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import FinancialOverview from "./components/FinancialOverview";
import BillSplitting from "./components/BillSplitting";
import SavingsGoal from "./components/SavingsGoal";

const App = () => {
  const isAuthenticated = !!sessionStorage.getItem("username");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/financial-overview" 
          element={isAuthenticated ? <FinancialOverview /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/bill-splitting" 
          element={isAuthenticated ? <BillSplitting /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/savings-goal" 
          element={isAuthenticated ? <SavingsGoal /> : <Navigate to="/login" />} 
        />
        
        {/* Redirects */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;