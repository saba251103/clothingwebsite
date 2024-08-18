import React from 'react';
import { TextField, Button, Paper, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import WcIcon from '@mui/icons-material/Wc';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
function SignupPage() {
    const navigate=useNavigate()
    const goTohome = ()=>{
        navigate('/home');
    };
  return (
    <div >
      <Paper className="signup-form">
        <Typography variant="h4" color="#797c69" gutterBottom>
          Create an Account
        </Typography>
        <form>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <PersonOutlineIcon color="action" />,
            }}
            required
          />
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
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <PhoneIcon color="action" />,
            }}
            required
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              startAdornment={<WcIcon color="action" />}
              required
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            margin="normal"
            InputProps={{
              startAdornment: <HomeIcon color="action" />,
            }}
            multiline
            rows={3}
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
            onClick={goTohome}
          >
            Sign Up
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default SignupPage;
