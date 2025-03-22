import React, { useState } from "react";
import SavingsGoal from './SavingsGoal';
import FinancialOverview from './FinancialOverview';
import BillSplitting from './BillSplitting';

const HomePage = () => {
  const [selectedComponent, setSelectedComponent] = useState("savings-goal");

  return (
    <div className="home-container">
      <h1>Welcome to Your Dashboard</h1>

      <div className="navigation-links">
        <button onClick={() => setSelectedComponent("savings-goal")}>Savings Goal</button>
        <button onClick={() => setSelectedComponent("financial-overview")}>Financial Overview</button>
        <button onClick={() => setSelectedComponent("bill-splitting")}>Bill Splitting</button>
      </div>

      <div className="component-display">
        {selectedComponent === "savings-goal" && <SavingsGoal />}
        {selectedComponent === "financial-overview" && <FinancialOverview />}
        {selectedComponent === "bill-splitting" && <BillSplitting />}
      </div>
    </div>
  );
};

export default HomePage;
