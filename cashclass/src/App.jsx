import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage"; // Import LoginPage component
import HomePage from "./components/HomePage"; // Import HomePage component
import SavingsGoal from "./components/SavingsGoal"; // Import SavingsGoal component
import FinancialOverview from "./components/FinancialOverview"; // Import FinancialOverview component
import BillSplitting from "./components/BillSplitting"; // Import BillSplitting component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Login Page route */}
        <Route path="/home" element={<HomePage />} /> {/* HomePage route */}
        <Route path="/savings-goal" element={<SavingsGoal />} /> {/* Savings Goal route */}
        <Route path="/financial-overview" element={<FinancialOverview />} /> {/* Financial Overview route */}
        <Route path="/bill-splitting" element={<BillSplitting />} /> {/* Bill Splitting route */}
      </Routes>
    </Router>
  );
};

export default App;