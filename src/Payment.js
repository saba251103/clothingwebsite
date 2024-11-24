import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Divider,
  Grid
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate } from 'react-router-dom';

const PaymentGateway = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    bankName: '',
    accountNumber: '',
    ifsc: '',
  });

  const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Payment Successfull!`);
    navigate('/home')
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        // height: '100vh',
        padding: '1rem',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '450px',
          padding: '2rem',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h4" textAlign="center" mb={3}>
          Secure Payment Gateway
        </Typography>

        <Typography variant="body1" mb={2} textAlign="left">
          Choose your payment method:
        </Typography>

        {/* Payment Method Selection (Stacked Vertically) */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Box
            onClick={() => handlePaymentMethodSelect('card')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '1.2rem',
              // marginBottom: '1rem',
              backgroundColor: paymentMethod === 'card' ? '#f0f0f0' : 'transparent',
              borderRadius: '5px',
              width: '100%',
            }}
          >
            <CreditCardIcon sx={{ marginRight: '10px' }} />
            <Typography variant="body1">Credit/Debit Cards</Typography>
          </Box>
          <Box
            onClick={() => handlePaymentMethodSelect('upi')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '1.2rem',
              // marginBottom: '1rem',
              backgroundColor: paymentMethod === 'upi' ? '#f0f0f0' : 'transparent',
              borderRadius: '5px',
              width: '100%',
            }}
          >
            <QrCodeIcon sx={{ marginRight: '10px' }} />
            <Typography variant="body1">UPI Payment</Typography>
          </Box>
          <Box
            onClick={() => handlePaymentMethodSelect('bank')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '1.2rem',
              // marginBottom: '1rem',
              backgroundColor: paymentMethod === 'bank' ? '#f0f0f0' : 'transparent',
              borderRadius: '5px',
              width: '100%',
            }}
          >
            <AccountBalanceIcon sx={{ marginRight: '10px' }} />
            <Typography variant="body1">Bank Transfer</Typography>
          </Box>
        </Box>

        {/* Payment Form based on selected payment method */}
        {paymentMethod && (
          <form onSubmit={handleSubmit}>
            {paymentMethod === 'card' && (
              <>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  name="cardHolderName"
                  value={paymentDetails.cardHolderName}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem' }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date"
                      name="expiryDate"
                      value={paymentDetails.expiryDate}
                      onChange={handleInputChange}
                      sx={{ marginBottom: '1rem' }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={paymentDetails.cvv}
                      onChange={handleInputChange}
                      sx={{ marginBottom: '1rem' }}
                    />
                  </Grid>
                </Grid>
              </>
            )}

            {paymentMethod === 'upi' && (
              <TextField
                fullWidth
                label="UPI ID"
                name="upiId"
                value={paymentDetails.upiId}
                onChange={handleInputChange}
                sx={{ marginBottom: '1rem' }}
              />
            )}

            {paymentMethod === 'bank' && (
              <>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankName"
                  value={paymentDetails.bankName}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  fullWidth
                  label="Account Number"
                  name="accountNumber"
                  value={paymentDetails.accountNumber}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  fullWidth
                  label="IFSC Code"
                  name="ifsc"
                  value={paymentDetails.ifsc}
                  onChange={handleInputChange}
                  sx={{ marginBottom: '1rem' }}
                />
              </>
            )}

            <Button variant="contained" 
            type="submit" 
            sx={{ 
              marginTop: '1rem',
              padding: '0.5rem 1.5rem' }}>
              PAY NOW
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentGateway;
