// src/components/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Alert,
  Divider
} from "@mui/material";
import { Lock, Person, Email, PersonAdd } from "@mui/icons-material";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState(""); // Add full name field
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      
      // Create user
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with full name
      await updateProfile(user, {
        displayName: fullName
      });
      
      navigate("/home");
    } catch (err) {
      setError("Failed to create account. " + err.message);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.default",
        p: 2
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PersonAdd />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* Add Full Name Field */}
          <TextField
            margin="normal"
            required
            fullWidth
            label="Full Name"
            autoComplete="name"
            autoFocus
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            InputProps={{
              startAdornment: <Person sx={{ mr: 1, color: "action.active" }} />
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: <Email sx={{ mr: 1, color: "action.active" }} />
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: "action.active" }} />
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: <Lock sx={{ mr: 1, color: "action.active" }} />
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign Up
          </Button>
          
          <Divider sx={{ my: 2 }}>OR</Divider>
          
          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="outlined"
            sx={{ py: 1.5 }}
          >
            Already have an account? Sign In
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterPage;