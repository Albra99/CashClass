// src/components/FinancialOverview.jsx
import React from "react";

function FinancialOverview({ monthlyBudget, foodBudget, savings, onBudgetChange }) {
  const remainingFunds = monthlyBudget - (foodBudget + savings);

  return (
    <div>
      <h2>Financial Overview</h2>
      <p>Remaining Funds: £{remainingFunds}</p>
      <p>Food Budget: £{foodBudget}</p>
      <p>Savings: £{savings}</p>

      <button onClick={onBudgetChange}>Adjust Budget</button>
    </div>
  );
}

export default FinancialOverview;
