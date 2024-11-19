import React, { useState } from 'react';
import { Box, Button, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Card, CardMedia, CardContent} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [details, setDetails] = useState('');
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const [size, setSize] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  // Handle size change
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleProceedToPay = () => {
    setShowPaymentGateway(true); // Show payment gateway when the button is clicked
  };

  const isPaymentDetailsComplete = () => {
    if (paymentMethod === 'upi' || paymentMethod === 'netbanking') {
      return details.trim().length > 0;
    }
    if (paymentMethod === 'card') {
      return (
        cardDetails.number.trim().length > 0 &&
        cardDetails.expiry.trim().length > 0 &&
        cardDetails.cvv.trim().length > 0
      );
    }
    return false;
  };

  return (
    
    <div className='newpage'>
      
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      {product ? (
        <Card sx={{ maxWidth: 600, margin: '0 auto', padding: '1rem' }}>
          {/* Product Image */}
          <CardMedia
            component="img"
            height="400"
            image={product.image}
            alt={product.name}
            sx={{ borderRadius: '8px' }}
          />

          {/* Product Details */}
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: ₹{product.price}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '1rem' }}>
              This is a premium quality product that you'll love!
            </Typography>

            {/* Size Selection and Button in One Line */}
            <Grid container spacing={2} alignItems="center" justifyContent="center">
              {/* Size Selection */}
              <Grid item>
                <FormControl>
                  <InputLabel id="size-select-label">Select Size</InputLabel>
                  <Select
                    labelId="size-select-label"
                    value={size}
                    onChange={handleSizeChange}
                    label="Select Size"
                    sx={{ minWidth: '150px' }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="S">Small</MenuItem>
                    <MenuItem value="M">Medium</MenuItem>
                    <MenuItem value="L">Large</MenuItem>
                    <MenuItem value="XL">Extra Large</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Proceed to Pay Button */}
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ padding: '0.8rem 2rem' }}
                  disabled={!size} // Disable button if no size is selected
                  onClick={handleProceedToPay}
                >
                  Proceed to Pay
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h5" color="error">
          No product details available!
        </Typography>
      )}

        {showPaymentGateway && (
          <Box sx={{ marginTop: '5rem', textAlign: 'left' }}>
            <Typography 
            variant="h4" 
            gutterBottom
            sx={{ textAlign: 'center', marginBottom: '2rem' }}
            >
              Payment Gateway
            </Typography>

            <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
              <InputLabel id="payment-method-label"
              sx={{textAlign: 'left'}}>Select Payment Method</InputLabel>
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

    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
      <Button
        variant="contained"
        color="success"
        sx={{
          padding: '0.8rem 2rem',
        }}
        onClick={() => alert('Payment Successful!')}
        disabled={!isPaymentDetailsComplete()} // Disable until details are entered
      >
        Pay Now
      </Button>
    </Box>
    </Box>)}
    </Box>
    </div>
  );
};

export default PaymentPage;



