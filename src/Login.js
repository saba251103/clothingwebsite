import React from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  const signup = () => {
    navigate('/signup');
  };

  return (
    <div className="signin-container">
      <Paper elevation={3} className="signin-form">
        <Typography variant="h4" color="#797c69" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSignIn}>
          <TextField
            fullWidth
            label="Email Address"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <PersonOutlineIcon color="action" />,
            }}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <LockOpenIcon color="action" />,
            }}
            required
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#797c69', marginTop: '20px' }}
            type="submit"
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#797c69', marginTop: '20px' }}
            onClick={signup}
          >
            Sign Up if you don't have an account
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default Login;
