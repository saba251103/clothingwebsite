import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, CircularProgress } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from './firebase';  // Ensure firebase is properly initialized in your firebase.js

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Handle email and password sign-in
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(false);
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      navigate('/home');
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Display loading spinner or error messages */}
          {loading && <CircularProgress />}
          {error && <Typography color="error">{errorMessage}</Typography>}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#797c69', marginTop: '20px' }}
            type="submit"
            disabled={loading}
          >
            Sign In
          </Button>
          
          <Button
            fullWidth
            variant="contained"
            color="primary"
            style={{ backgroundColor: '#797c69', marginTop: '20px' }}
            onClick={handleGoogleSignIn}
            disabled={loading}
            startIcon={<GoogleIcon />}
          >
            Sign In with Google
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
