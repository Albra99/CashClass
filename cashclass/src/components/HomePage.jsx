// src/components/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Avatar,
  Card,
  CardContent,
  Divider,
  Stack,
  useTheme
} from "@mui/material";
import {
  Savings,
  Receipt,
  PieChart,
  TrendingUp,
  AccountBalanceWallet,
  CalendarMonth,
  Notifications
} from "@mui/icons-material";

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Sample data - replace with your actual data
  const budgetData = {
    remaining: 1250,
    spent: 750,
    categories: [
      { name: "Food", amount: 300, color: theme.palette.primary.main },
      { name: "Transport", amount: 150, color: theme.palette.secondary.main },
      { name: "Entertainment", amount: 100, color: theme.palette.error.main },
      { name: "Bills", amount: 200, color: theme.palette.warning.main }
    ]
  };

  const quickActions = [
    { icon: <Receipt />, label: "Add Expense", path: "/expenses" },
    { icon: <AccountBalanceWallet />, label: "Accounts", path: "/accounts" },
    { icon: <CalendarMonth />, label: "Schedule", path: "/schedule" },
    { icon: <Notifications />, label: "Reminders", path: "/reminders" }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Welcome back, Student!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's your financial overview
          </Typography>
        </Box>
        <Avatar sx={{ 
          bgcolor: theme.palette.primary.main,
          width: 56,
          height: 56
        }}>
          S
        </Avatar>
      </Box>

      {/* Main Dashboard */}
      <Grid container spacing={3}>
        {/* Budget Summary */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mb: 3
            }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Monthly Budget
              </Typography>
              <Typography variant="h5">
                £{budgetData.remaining + budgetData.spent}
              </Typography>
            </Box>

            <Box sx={{ 
              height: 12, 
              backgroundColor: theme.palette.grey[200],
              borderRadius: 6,
              mb: 2,
              overflow: 'hidden'
            }}>
              {budgetData.categories.map((category, index) => (
                <Box
                  key={category.name}
                  sx={{
                    height: '100%',
                    width: `${(category.amount / (budgetData.remaining + budgetData.spent)) * 100}%`,
                    backgroundColor: category.color,
                    display: 'inline-block'
                  }}
                />
              ))}
            </Box>

            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={6}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography color="text.secondary">Remaining</Typography>
                    <Typography variant="h5" color="success.main">
                      £{budgetData.remaining}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography color="text.secondary">Spent</Typography>
                    <Typography variant="h5" color="error.main">
                      £{budgetData.spent}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Button 
              variant="contained" 
              fullWidth
              sx={{ py: 1.5, borderRadius: 2 }}
              onClick={() => navigate("/financial-overview")}
            >
              View Full Budget
            </Button>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Quick Actions
            </Typography>
            <Stack spacing={2}>
              {quickActions.map((action) => (
                <Button
                  key={action.label}
                  variant="outlined"
                  startIcon={action.icon}
                  fullWidth
                  sx={{ 
                    py: 1.5,
                    justifyContent: 'flex-start',
                    borderRadius: 2
                  }}
                  onClick={() => navigate(action.path)}
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Features */}
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
            Features
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
                onClick={() => navigate("/savings-goal")}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.success.light,
                    mr: 2
                  }}>
                    <Savings />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Savings Goals
                  </Typography>
                </Box>
                <Typography color="text.secondary">
                  Track your savings progress and set financial targets
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
                onClick={() => navigate("/bill-splitting")}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.info.light,
                    mr: 2
                  }}>
                    <Receipt />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Bill Splitting
                  </Typography>
                </Box>
                <Typography color="text.secondary">
                  Easily split bills with friends and track shared expenses
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 3, 
                  borderRadius: 3,
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
                onClick={() => navigate("/financial-overview")}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 2
                }}>
                  <Avatar sx={{ 
                    bgcolor: theme.palette.warning.light,
                    mr: 2
                  }}>
                    <PieChart />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Financial Insights
                  </Typography>
                </Box>
                <Typography color="text.secondary">
                  View spending patterns and budget analytics
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
              Recent Activity
            </Typography>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
              backgroundColor: theme.palette.grey[100],
              borderRadius: 2
            }}>
              <Typography color="text.secondary">
                Your recent transactions will appear here
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;