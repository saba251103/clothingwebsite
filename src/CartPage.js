import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CartPage = () => {
  // Sample cart data
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Oversized T-shirt', price: 25.99, quantity: 2, image: 'path/to/image1.jpg' },
    { id: 2, name: 'Casual Shirt', price: 30.49, quantity: 1, image: 'path/to/image2.jpg' },
    { id: 3, name: 'Luxury Handbag', price: 99.99, quantity: 1, image: 'path/to/image3.jpg' },
  ]);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  // Update item quantity
  const updateQuantity = (id, change) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>

      {cartItems.length > 0 ? (
        <Grid container spacing={3}>
          {cartItems.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item.id}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography>Price: ${item.price}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </Button>
                    <Typography>{item.quantity}</Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </Button>
                  </Box>
                </CardContent>
                <Box sx={{ textAlign: 'right', padding: '1rem' }}>
                  <IconButton color="error" onClick={() => removeItem(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">Your cart is empty.</Typography>
      )}

      <Box sx={{ marginTop: '2rem', textAlign: 'right' }}>
        <Typography variant="h5">Total: ${calculateTotal()}</Typography>
        <Button variant="contained" color="success" sx={{ marginTop: '1rem' }}>
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartPage;
