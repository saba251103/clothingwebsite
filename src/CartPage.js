import React from 'react';
import { useCart } from './CartContext';
import { Box, Typography, Grid, Card, CardMedia, CardContent, CardActions, Button, Divider } from '@mui/material';

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom textAlign="center">
        Your Cart
      </Typography>

      {/* Cart Items */}
      {cart.length > 0 ? (
        <Grid container spacing={4}>
          {cart.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <CardMedia component="img" height="300" image={item.image} alt={item.name} />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    Price: ₹{item.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h5" color="textSecondary" textAlign="center">
          Your cart is empty.
        </Typography>
      )}

      {/* Bill Summary */}
      {cart.length > 0 && (
        <Box sx={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Bill Summary
          </Typography>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
            <Typography variant="body1">Total Items:</Typography>
            <Typography variant="body1">{cart.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <Typography variant="body1">Total Price:</Typography>
            <Typography variant="body1">₹{totalPrice}</Typography>
          </Box>
          <Divider />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '1rem' }}
            onClick={() => alert('Proceed to Checkout')}
          >
            Checkout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
