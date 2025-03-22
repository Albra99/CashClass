import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./styles.css"; // Importing the manual CSS file

const data = [
  { name: "Rent", value: 500 },
  { name: "Food", value: 200 },
  { name: "Transport", value: 100 },
  { name: "Entertainment", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function App() {
  const [billAmount, setBillAmount] = useState(0);
  const [splitBetween, setSplitBetween] = useState(1);
  const [splitResult, setSplitResult] = useState(0);

  const handleSplit = () => {
    setSplitResult(billAmount / splitBetween);
  };

  return (
    <div className="container">
      <h1>CashClass - Student Budgeting</h1>

      {/* Budget Overview */}
      <div className="card">
        <h2>Budget Overview</h2>
        <p>Remaining Budget: <strong>£500</strong></p>
        <p>Spent: <span style={{ color: "red", fontWeight: "bold" }}>£400</span></p>
      </div>

      {/* Expense Breakdown */}
      <div className="card">
        <h2>Expense Breakdown</h2>
        <div className="pie-chart-container">
          <PieChart width={300} height={300}>
            <Pie data={data} dataKey="value" outerRadius={100} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>

      {/* Bill Splitting */}
      <div className="card">
        <h2>Bill Splitting</h2>
        <input
          type="number"
          placeholder="Total Bill (£)"
          value={billAmount}
          onChange={(e) => setBillAmount(Number(e.target.value))}
          className="input"
        />
        <input
          type="number"
          placeholder="Split Between (People)"
          value={splitBetween}
          onChange={(e) => setSplitBetween(Number(e.target.value))}
          className="input"
        />
        <button className="button" onClick={handleSplit}>Split Bill</button>
        <p>Each person pays: <strong>£{splitResult.toFixed(2)}</strong></p>
      </div>
    </div>
  );
}

