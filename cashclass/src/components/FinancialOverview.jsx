// src/components/FinancialOverview.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  Alert,
  IconButton,
  InputAdornment
} from "@mui/material";
import { ArrowBack, AttachMoney } from "@mui/icons-material";

function FinancialOverview() {
  const navigate = useNavigate();
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [foodBudget, setFoodBudget] = useState(300);
  const [savings, setSavings] = useState(200);
  const [editing, setEditing] = useState(false);
  const [tempValues, setTempValues] = useState({
    monthly: 0,
    food: 0,
    savings: 0
  });

  const remainingFunds = monthlyBudget - (foodBudget + savings);

  const handleEditClick = () => {
    setTempValues({
      monthly: monthlyBudget,
      food: foodBudget,
      savings: savings
    });
    setEditing(true);
  };

  const handleSaveClick = () => {
    setMonthlyBudget(tempValues.monthly);
    setFoodBudget(tempValues.food);
    setSavings(tempValues.savings);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditing(false);
  };

  const handleChange = (field) => (e) => {
    setTempValues({
      ...tempValues,
      [field]: Number(e.target.value)
    });
  };

  const getBudgetStatus = () => {
    if (remainingFunds < 0) {
      return "You're over budget!";
    } else if (remainingFunds === 0) {
      return "Budget perfectly allocated!";
    } else {
      return "You have funds remaining";
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Financial Overview</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/home")}
        >
          Dashboard
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      {editing ? (
        <Box component="form" sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Monthly Budget"
            value={tempValues.monthly}
            onChange={handleChange("monthly")}
            type="number"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Food Budget"
            value={tempValues.food}
            onChange={handleChange("food")}
            type="number"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              )
            }}
          />

          <TextField
            fullWidth
            label="Savings"
            value={tempValues.savings}
            onChange={handleChange("savings")}
            type="number"
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AttachMoney />
                </InputAdornment>
              )
            }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <>
          <Alert
            severity={
              remainingFunds < 0
                ? "error"
                : remainingFunds === 0
                ? "success"
                : "info"
            }
            sx={{ mb: 3 }}
          >
            {getBudgetStatus()}
          </Alert>

          <List>
            <ListItem>
              <ListItemText
                primary="Monthly Budget"
                secondary={`£${monthlyBudget.toFixed(2)}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Food Budget"
                secondary={`£${foodBudget.toFixed(2)}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary="Savings"
                secondary={`£${savings.toFixed(2)}`}
              />
            </ListItem>
            <Divider />
            <ListItem sx={{ bgcolor: "#f5f5f5" }}>
              <ListItemText
                primary="Remaining Funds"
                secondary={
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: "bold",
                      color: remainingFunds < 0 ? "error.main" : "success.main"
                    }}
                  >
                    £{remainingFunds.toFixed(2)}
                  </Typography>
                }
              />
            </ListItem>
          </List>

          <Button
            variant="contained"
            onClick={handleEditClick}
            sx={{ mt: 2 }}
          >
            Adjust Budget
          </Button>
        </>
      )}

      <Divider sx={{ my: 3 }} />

      <Typography variant="body2" color="text.secondary">
        Breakdown: £{foodBudget.toFixed(2)} (Food) + £{savings.toFixed(2)} (Savings) = £
        {(foodBudget + savings).toFixed(2)} of £{monthlyBudget.toFixed(2)} budget
      </Typography>
    </Paper>
  );
}

export default FinancialOverview;