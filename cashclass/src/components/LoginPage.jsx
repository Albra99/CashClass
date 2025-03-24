import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  Divider,
  Alert,
  Stack
} from "@mui/material";
import { Lock, Person, Email } from "@mui/icons-material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError("");
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      
      // Update profile if name was provided
      if (fullName.trim()) {
        await updateProfile(user, {
          displayName: fullName.trim()
        });
      }
      
      navigate("/home");
    } catch (err) {
      setError("Failed to sign in. " + err.message);
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
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <Lock />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to CashClass
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            label="Full Name (Optional)"
            autoComplete="name"
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: <Person sx={{ mr: 1, color: "action.active" }} />
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign In
          </Button>
          
          <Divider sx={{ my: 2 }}>OR</Divider>
          
          <Stack spacing={1}>
            <Button
              component={Link}
              to="/register"
              fullWidth
              variant="outlined"
              sx={{ py: 1.5 }}
            >
              Create New Account
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;