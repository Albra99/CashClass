// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import HomePage from "./components/HomePage";
import SavingsGoal from "./components/SavingsGoal";
import FinancialOverview from "./components/FinancialOverview";
import BillSplitting from "./components/BillSplitting";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/savings-goal"
            element={
              <PrivateRoute>
                <SavingsGoal />
              </PrivateRoute>
            }
          />
          <Route
            path="/financial-overview"
            element={
              <PrivateRoute>
                <FinancialOverview />
              </PrivateRoute>
            }
          />
          <Route
            path="/bill-splitting"
            element={
              <PrivateRoute>
                <BillSplitting />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;