import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import SidebarChatbot from './SidebarChatbot';

const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [details, setDetails] = useState('');
  const [size, setSize] = useState('');
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleProceedToPay = () => {
    navigate('/payment-gateway', { state: { product, cartItems: [product], totalBill: product?.price || 0 } });
  };  

  return (
    <div className="newpage">
      <Box
        sx={{
          padding: '2rem',
          textAlign: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {product ? (
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
            }}
          >
            {/* Product Image */}
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              sx={{
                width: { xs: '100%', md: '50%' },
                height: 'auto',
                objectFit: 'cover',
              }}
            />

            {/* Product Details */}
            <CardContent
              sx={{
                padding: '2rem',
                width: { xs: '100%', md: '50%' },
                textAlign: 'left',
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {product.name}
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                gutterBottom
                sx={{ marginBottom: '1.5rem' }}
              >
                Price: ₹{product.price}
              </Typography>
              <Typography
                variant="body1"
                color="textSecondary"
                sx={{
                  marginBottom: '2rem',
                  lineHeight: 1.8,
                }}
              >
                Experience premium quality with this product! It's made with
                love and designed to meet your expectations.
              </Typography>

              {/* Size Selection */}
              <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
                <InputLabel id="size-select-label">Select Size</InputLabel>
                <Select
                  labelId="size-select-label"
                  value={size}
                  onChange={handleSizeChange}
                  label="Select Size"
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

              {/* Proceed to Pay Button */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: '0.8rem',
                  fontSize: '1rem',
                  backgroundColor: '#00796b',
                  '&:hover': { backgroundColor: '#004d40' },
                }}
                disabled={!size}
                onClick={handleProceedToPay}
              >
                Proceed to Pay
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h5" color="error">
            No product details available!
          </Typography>
        )}
      </Box>
      <SidebarChatbot />
    </div>
  );
};

export default PaymentPage;
