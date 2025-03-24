// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import FinancialOverview from "./components/FinancialOverview";
import BillSplitting from "./components/BillSplitting";
import SavingsGoal from "./components/SavingsGoal";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  // Listen for storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(sessionStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        
        {/* Protected routes */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/financial-overview" 
          element={isAuthenticated ? <FinancialOverview /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/bill-splitting" 
          element={isAuthenticated ? <BillSplitting /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/savings-goal" 
          element={isAuthenticated ? <SavingsGoal /> : <Navigate to="/login" replace />} 
        />
        
        {/* Redirects */}
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} 
        />
      </Routes>
    </Router>
  );
};

export default App;