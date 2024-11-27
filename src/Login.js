import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, CircularProgress } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import GoogleIcon from '@mui/icons-material/Google';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {getDatabase, ref, set} from "firebase/database";
import { auth } from './firebase'; // Ensure firebase is properly initialized in your firebase.js

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Get the Firebase ID token (JWT)
      const idToken = await user.getIdToken();

      // Store the JWT token in localStorage
      localStorage.setItem('auth_token', idToken);

      navigate('/home'); // Redirect to the home page after login
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
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Get the Firebase ID token (JWT)
      const idToken = await user.getIdToken();

      // Store the JWT token in localStorage
      localStorage.setItem('auth_token', idToken);

      // Store user details in Firebase Realtime Database
      const db = getDatabase(); // Get a reference to the Firebase Realtime Database
      const userRef = ref(db, 'users/' + user.uid); // Reference to the user data node using their UID

      // User details to be stored in the database
      const userDetails = {
        name: user.displayName,  // Name of the user
        email: user.email,       // Email of the user
        phoneNumber: user.phoneNumber || '', // If available
        timestamp: new Date().toISOString(), // Timestamp of when the user signed in
      };

      // Write user details to the database
      await set(userRef, userDetails);

      // Redirect to the home page after successful sign-in
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