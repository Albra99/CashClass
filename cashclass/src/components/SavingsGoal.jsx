// src/components/SavingsGoal.jsx
import React, { useState } from "react";

function SavingsGoal() {
  const [goalAmount, setGoalAmount] = useState(0);
  const [savedAmount, setSavedAmount] = useState(0);

  const progress = (savedAmount / goalAmount) * 100;

  return (
    <div>
      <h2>Savings Goal</h2>
      <input
        type="number"
        placeholder="Enter Savings Goal Amount"
        value={goalAmount}
        onChange={(e) => setGoalAmount(Number(e.target.value))}
      />
      <p>Saved: £{savedAmount}</p>
      <p>Progress: {progress.toFixed(2)}%</p>
    </div>
  );
}

export default SavingsGoal;
