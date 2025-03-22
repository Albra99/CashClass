// src/components/AccountSetup.jsx
import React, { useState } from "react";

function AccountSetup({ onSubmit }) {
  const [loanAmount, setLoanAmount] = useState(0);
  const [incomeSources, setIncomeSources] = useState(0);
  const [rent, setRent] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [savingsGoal, setSavingsGoal] = useState(0);

  const handleSubmit = () => {
    onSubmit({ loanAmount, incomeSources, rent, utilities, savingsGoal });
  };

  return (
    <div>
      <h2>Account Setup</h2>
      <input
        type="number"
        placeholder="Enter Student Loan Amount"
        value={loanAmount}
        onChange={(e) => setLoanAmount(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Other Income"
        value={incomeSources}
        onChange={(e) => setIncomeSources(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Monthly Rent"
        value={rent}
        onChange={(e) => setRent(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Monthly Utilities Bill"
        value={utilities}
        onChange={(e) => setUtilities(Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Savings Goal Amount"
        value={savingsGoal}
        onChange={(e) => setSavingsGoal(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>Save & Continue</button>
    </div>
  );
}

export default AccountSetup;
