import React, { useState } from 'react';
import { Box, Button, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, } from '@mui/material';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [details, setDetails] = useState('');

  const handlePayment = () => {
    alert('Payment Successful!');
  };

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Payment Gateway
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
        <InputLabel id="payment-method-label">Select Payment Method</InputLabel>
        <Select
          labelId="payment-method-label"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <MenuItem value="upi">UPI</MenuItem>
          <MenuItem value="card">Credit/Debit Card</MenuItem>
          <MenuItem value="netbanking">Net Banking</MenuItem>
        </Select>
      </FormControl>

      {paymentMethod === 'upi' && (
        <TextField
          label="Enter UPI ID"
          variant="outlined"
          fullWidth
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          sx={{ marginBottom: '1.5rem' }}
        />
      )}

      {paymentMethod === 'card' && (
        <>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            sx={{ marginBottom: '1rem' }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Expiry Date"
                placeholder="MM/YY"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="CVV"
                variant="outlined"
                fullWidth
                type="password"
              />
            </Grid>
          </Grid>
        </>
      )}

      {paymentMethod === 'netbanking' && (
        <TextField
          label="Enter Bank Account Number"
          variant="outlined"
          fullWidth
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          sx={{ marginBottom: '1.5rem' }}
        />
      )}

      <Button
        variant="contained"
        color="success"
        sx={{ padding: '0.8rem 2rem', marginTop: '1.5rem' }}
        onClick={handlePayment}
        disabled={!paymentMethod}
      >
        Pay Now
      </Button>
    </Box>
  );
};

export default PaymentPage;