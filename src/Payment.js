import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import { ref, push, set, remove } from "firebase/database";

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, cartItems = [], totalBill = 0 } = location.state || {};

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
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let tempErrors = {};
    if (paymentMethod === 'card') {
      if (!paymentDetails.cardHolderName.trim()) tempErrors.cardHolderName = "Cardholder name is required.";
      if (!/^\d{16}$/.test(paymentDetails.cardNumber)) tempErrors.cardNumber = "Card number must be 16 digits.";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentDetails.expiryDate)) tempErrors.expiryDate = "Expiry date must be in MM/YY format.";
      if (!/^\d{3,4}$/.test(paymentDetails.cvv)) tempErrors.cvv = "CVV must be 3 or 4 digits.";
    }

    if (paymentMethod === 'upi') {
      if (!paymentDetails.upiId.trim()) tempErrors.upiId = "UPI ID is required.";
      if (!/^\w+@\w+$/.test(paymentDetails.upiId)) tempErrors.upiId = "UPI ID must follow the format xyz@bank.";
    }

    if (paymentMethod === 'bank') {
      if (!paymentDetails.bankName.trim()) tempErrors.bankName = "Bank name is required.";
      if (!/^\d{10,}$/.test(paymentDetails.accountNumber)) tempErrors.accountNumber = "Account number must be at least 10 digits.";
      if (!/^[A-Z]{4}\d{7}$/.test(paymentDetails.ifsc)) tempErrors.ifsc = "Invalid IFSC code.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setErrors({}); // Reset errors when switching payment methods
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateInputs()) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user ? user.uid : null; // Ensure user is logged in

        if (!userId) {
          alert('You need to be logged in to complete the payment.');
          return;
        }

        // Prepare order details based on product or cartItems
        const orderDetails = product
          ? [product] // Single product purchase
          : cartItems; // Cart purchase

        const order = {
          paymentMethod,
          paymentDetails: { ...paymentDetails },
          items: orderDetails, // Product or cart items
          totalAmount: product ? product.price : totalBill, // Single or cart total amount
          timestamp: new Date().toISOString(),
        };

        if (!product && cartItems.length === 0) {
          alert('No items to process for payment!');
          navigate('/cart');
          return;
        }

        // Save order to Realtime Database under user's orders
        const ordersRef = ref(db, `users/${userId}/orders`);
        const newOrderRef = push(ordersRef); // Push new order

        await set(newOrderRef, order); // Set order data in database

      // Empty the cart ONLY if the order is from the cart
      if (cartItems.length > 0 && !product) {
        const cartRef = ref(db, `users/${userId}/cart`);
        await remove(cartRef); // Remove all items from the cart
        console.log('Cart emptied after successful order placement.');
      }

        alert('Payment Successful! Your order has been placed.');
        navigate('/home');
      } catch (error) {
        console.error('Error saving order to Firebase Realtime Database:', error);
        alert('An error occurred while saving your order. Please try again.');
      }
    }
  };  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
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

        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <Box
            onClick={() => handlePaymentMethodSelect('card')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '1.2rem',
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
              backgroundColor: paymentMethod === 'bank' ? '#f0f0f0' : 'transparent',
              borderRadius: '5px',
              width: '100%',
            }}
          >
            <AccountBalanceIcon sx={{ marginRight: '10px' }} />
            <Typography variant="body1">Bank Transfer</Typography>
          </Box>
        </Box>

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
                  error={!!errors.cardHolderName}
                  helperText={errors.cardHolderName}
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={paymentDetails.cardNumber}
                  onChange={handleInputChange}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  sx={{ marginBottom: '1rem' }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiry Date (MM/YY)"
                      name="expiryDate"
                      value={paymentDetails.expiryDate}
                      onChange={handleInputChange}
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate}
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
                      error={!!errors.cvv}
                      helperText={errors.cvv}
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
                error={!!errors.upiId}
                helperText={errors.upiId}
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
                  error={!!errors.bankName}
                  helperText={errors.bankName}
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  fullWidth
                  label="Account Number"
                  name="accountNumber"
                  value={paymentDetails.accountNumber}
                  onChange={handleInputChange}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  fullWidth
                  label="IFSC Code"
                  name="ifsc"
                  value={paymentDetails.ifsc}
                  onChange={handleInputChange}
                  error={!!errors.ifsc}
                  helperText={errors.ifsc}
                  sx={{ marginBottom: '1rem' }}
                />
              </>
            )}

            <Button
              variant="contained"
              type="submit"
              sx={{
                marginTop: '1rem',
                padding: '0.5rem 1.5rem',
              }}
            >
              PAY NOW
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
};

export default PaymentGateway;
