import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, Button, Card, CardMedia, CardContent, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';

const PaymentPage = () => {
  const location = useLocation();
  const { product } = location.state || {};

  const [size, setSize] = useState('');

  // Handle size change
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  return (
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
                  onClick={() => alert('Payment Successful!')}
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
    </Box>
  );
};

export default PaymentPage;



