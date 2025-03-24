// src/components/SavingsGoal.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Typography,
  TextField,
  Divider,
  LinearProgress,
  Alert,
  InputAdornment,
  IconButton,
  Tooltip,
  Avatar
} from "@mui/material";
import {
  ArrowBack,
  AttachMoney,
  Savings,
  CheckCircle,
  Edit,
  Delete,
  AddCircle
} from "@mui/icons-material";

function SavingsGoal() {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState({
    name: "",
    targetAmount: 0,
    savedAmount: 0,
    targetDate: ""
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [activeGoal, setActiveGoal] = useState(0);

  // Load goals from localStorage on component mount
  useEffect(() => {
    const savedGoals = localStorage.getItem('savingsGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  // Save goals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('savingsGoals', JSON.stringify(goals));
  }, [goals]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentGoal({
      ...currentGoal,
      [name]: name.includes('Amount') ? parseFloat(value) || 0 : value
    });
  };

  const addOrUpdateGoal = () => {
    if (!currentGoal.name) return;

    if (editingIndex !== null) {
      const updatedGoals = [...goals];
      updatedGoals[editingIndex] = currentGoal;
      setGoals(updatedGoals);
      setEditingIndex(null);
    } else {
      setGoals([...goals, currentGoal]);
    }

    setCurrentGoal({
      name: "",
      targetAmount: 0,
      savedAmount: 0,
      targetDate: ""
    });
  };

  const editGoal = (index) => {
    setCurrentGoal(goals[index]);
    setEditingIndex(index);
  };

  const deleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
    if (activeGoal === index) setActiveGoal(0);
  };

  const addToSavings = (amount) => {
    if (!goals.length) return;
    
    const updatedGoals = [...goals];
    updatedGoals[activeGoal].savedAmount += amount;
    setGoals(updatedGoals);
  };

  const calculateProgress = (goal) => {
    return goal.targetAmount > 0 
      ? Math.min((goal.savedAmount / goal.targetAmount) * 100, 100) 
      : 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "No target date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const daysRemaining = (dateString) => {
    if (!dateString) return null;
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4" sx={{ display: "flex", alignItems: "center" }}>
          <Savings color="primary" sx={{ mr: 1 }} />
          Savings Goals
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/home")}
        >
          Dashboard
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", gap: 3, flexDirection: { xs: "column", md: "row" } }}>
        {/* Goals List */}
        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
          <Typography variant="h6" gutterBottom>
            Your Goals
          </Typography>
          
          {goals.length === 0 ? (
            <Alert severity="info">No savings goals yet. Add your first goal below!</Alert>
          ) : (
            <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
              {goals.map((goal, index) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    p: 2,
                    mb: 2,
                    cursor: "pointer",
                    borderLeft: activeGoal === index ? "4px solid #1976d2" : "none",
                    backgroundColor: activeGoal === index ? "#f0f7ff" : "background.paper"
                  }}
                  onClick={() => setActiveGoal(index)}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {goal.name}
                    </Typography>
                    <Box>
                      <Tooltip title="Edit">
                        <IconButton onClick={(e) => { e.stopPropagation(); editGoal(index); }}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={(e) => { e.stopPropagation(); deleteGoal(index); }}>
                          <Delete fontSize="small" color="error" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(goal)}
                    sx={{ height: 8, my: 1 }}
                    color={calculateProgress(goal) >= 100 ? "success" : "primary"}
                  />
                  <Typography variant="body2">
                    £{goal.savedAmount.toFixed(2)} of £{goal.targetAmount.toFixed(2)} saved
                  </Typography>
                  {goal.targetDate && (
                    <Typography variant="caption" color="text.secondary">
                      Target: {formatDate(goal.targetDate)} ({daysRemaining(goal.targetDate)} days left)
                    </Typography>
                  )}
                </Paper>
              ))}
            </Box>
          )}
        </Box>

        {/* Goal Details/Form */}
        <Box sx={{ width: { xs: "100%", md: "70%" } }}>
          {goals.length > 0 ? (
            <>
              <Typography variant="h5" gutterBottom>
                {goals[activeGoal].name}
              </Typography>
              
              {calculateProgress(goals[activeGoal]) >= 100 ? (
                <Alert icon={<CheckCircle fontSize="inherit" />} severity="success" sx={{ mb: 2 }}>
                  Goal achieved! Congratulations!
                </Alert>
              ) : null}

              <LinearProgress
                variant="determinate"
                value={calculateProgress(goals[activeGoal])}
                sx={{ height: 10, mb: 2 }}
              />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography>
                  Saved: <strong>£{goals[activeGoal].savedAmount.toFixed(2)}</strong>
                </Typography>
                <Typography>
                  Target: <strong>£{goals[activeGoal].targetAmount.toFixed(2)}</strong>
                </Typography>
              </Box>
              
              <Typography color="text.secondary" gutterBottom>
                {goals[activeGoal].targetDate && (
                  <>Target Date: {formatDate(goals[activeGoal].targetDate)}</>
                )}
              </Typography>
              
              <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
                Add to Savings
              </Typography>
              
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                {[10, 20, 50, 100].map((amount) => (
                  <Button
                    key={amount}
                    variant="outlined"
                    startIcon={<AddCircle />}
                    onClick={() => addToSavings(amount)}
                  >
                    £{amount}
                  </Button>
                ))}
              </Box>
              
              <TextField
                fullWidth
                label="Custom Amount"
                type="number"
                InputProps={{
                  startAdornment: <InputAdornment position="start">£</InputAdornment>,
                }}
                sx={{ mb: 2 }}
                onChange={(e) => addToSavings(parseFloat(e.target.value) || 0)}
              />
            </>
          ) : null}

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            {editingIndex !== null ? "Edit Goal" : "Add New Goal"}
          </Typography>
          
          <TextField
            fullWidth
            label="Goal Name"
            name="name"
            value={currentGoal.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Target Amount"
            name="targetAmount"
            type="number"
            value={currentGoal.targetAmount}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Currently Saved"
            name="savedAmount"
            type="number"
            value={currentGoal.savedAmount}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Target Date"
            name="targetDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={currentGoal.targetDate}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="contained"
            startIcon={<Savings />}
            onClick={addOrUpdateGoal}
            fullWidth
            size="large"
          >
            {editingIndex !== null ? "Update Goal" : "Add Goal"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default SavingsGoal;
