// src/components/BillSplitting.jsx
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
  IconButton,
  InputAdornment,
  Alert,
  Avatar
} from "@mui/material";
import {
  ArrowBack,
  PersonAdd,
  PersonRemove,
  AttachMoney
} from "@mui/icons-material";

export default function BillSplitting() {
  const navigate = useNavigate();
  const [people, setPeople] = useState([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");

  const addPerson = () => {
    if (!newPersonName.trim()) {
      setError("Please enter a name");
      return;
    }
    if (people.some(person => person.name.toLowerCase() === newPersonName.toLowerCase())) {
      setError("This person is already added");
      return;
    }
    
    setPeople([...people, { 
      name: newPersonName.trim(), 
      amountPaid: 0 
    }]);
    setNewPersonName("");
    setError("");
  };

  const removePerson = (name) => {
    setPeople(people.filter(person => person.name !== name));
  };

  const trackPayment = (name, amount) => {
    setPeople(people.map(person =>
      person.name === name ? { ...person, amountPaid: amount } : person
    ));
  };

  const calculateTotalPaid = () => {
    return people.reduce((sum, person) => sum + (Number(person.amountPaid) || 0), 0);
  };

  const calculateShare = () => {
    if (people.length === 0) return 0;
    return totalAmount / people.length;
  };

  const calculateBalance = (person) => {
    const share = calculateShare();
    return (person.amountPaid || 0) - share;
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h4">Bill Splitting</Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate("/home")}
        >
          Back to Dashboard
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Box>
          <TextField
            fullWidth
            label="Total Bill Amount (£)"
            type="number"
            value={totalAmount}
            onChange={(e) => setTotalAmount(Number(e.target.value))}
            InputProps={{
              startAdornment: <InputAdornment position="start">£</InputAdornment>,
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            label="Add Person"
            value={newPersonName}
            onChange={(e) => setNewPersonName(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={addPerson}
            sx={{ height: "56px" }}
          >
            Add
          </Button>
        </Box>

        {people.length > 0 ? (
          <List sx={{ maxHeight: "400px", overflowY: "auto" }}>
            {people.map((person) => (
              <ListItem key={person.name}>
                <Avatar sx={{ mr: 2 }}>
                  {person.name.charAt(0).toUpperCase()}
                </Avatar>
                <ListItemText primary={person.name} />
                <TextField
                  label="Paid (£)"
                  type="number"
                  size="small"
                  value={person.amountPaid}
                  onChange={(e) => trackPayment(person.name, Number(e.target.value))}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                  sx={{ width: "150px", mr: 2 }}
                />
                <IconButton
                  edge="end"
                  onClick={() => removePerson(person.name)}
                  color="error"
                >
                  <PersonRemove />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Alert severity="info">No people added yet</Alert>
        )}

        <Divider />

        <Box>
          <Typography variant="h6">Summary</Typography>
          <Typography>
            Total Bill: £{totalAmount.toFixed(2)} | 
            Total Paid: £{calculateTotalPaid().toFixed(2)} | 
            Each Pays: £{calculateShare().toFixed(2)}
          </Typography>

          {people.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Balances:</Typography>
              {people.map((person) => {
                const balance = calculateBalance(person);
                return (
                  <Box key={`balance-${person.name}`} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography>{person.name}:</Typography>
                    <Typography color={balance >= 0 ? "success.main" : "error.main"}>
                      {balance >= 0
                        ? `Gets £${balance.toFixed(2)}`
                        : `Owes £${Math.abs(balance).toFixed(2)}`}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}