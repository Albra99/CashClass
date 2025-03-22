// src/App.jsx
import React, { useState } from "react";
import AccountSetup from "./components/AccountSetup";
import FinancialOverview from "./components/FinancialOverview";
import SavingsGoal from "./components/SavingsGoal";
import BillSplitting from "./components/BillSplitting";

function App() {
  const [accountData, setAccountData] = useState(null);

  const handleAccountSetupSubmit = (data) => {
    setAccountData(data);
  };

  return (
    <div>
      <h1>CashClass - Student Budgeting</h1>
      
      {!accountData ? (
        <AccountSetup onSubmit={handleAccountSetupSubmit} />
      ) : (
        <div>
          <FinancialOverview
            monthlyBudget={accountData.loanAmount + accountData.incomeSources}
            foodBudget={100}
            savings={accountData.savingsGoal}
            onBudgetChange={() => alert("Change your budget here!")}
          />
          <SavingsGoal />
          <BillSplitting />
        </div>
      )}
    </div>
  );
}

export default App;