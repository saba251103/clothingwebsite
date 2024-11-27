import React, { useEffect, useState } from "react";
import { ref, onValue, update, remove, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { X, Facebook, Instagram } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SidebarChatbot from "./SidebarChatbot";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;

  // Fetch cart data from Firebase
  useEffect(() => {
    const cartRef = ref(db, `users/${userId}/cart`);
  
    const unsubscribe = onValue(cartRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const items = Object.entries(data).map(([id, item]) => ({
          id,
          ...item,
        }));
        setCartItems(items);
  
        // Calculate total bill
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalBill(total);
      } else {
        setCartItems([]);
        setTotalBill(0);
      }
    });
  
    return () => unsubscribe();
  }, []);

  // Update item quantity
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) {
      window.alert("Quantity cannot be less than 1.");
      return;
    }
  
    const cartRef = ref(db, `users/${userId}/cart`);
    // Fetch cart items once
    get(cartRef)
      .then((snapshot) => {
        const cartItems = snapshot.val(); // Retrieve all cart items
        if (cartItems) {
          for (const key in cartItems) {
            if (cartItems[key].id === id) {
              // Found the matching item
              const itemRef = ref(db, `users/${userId}/cart/${key}`); // Reference to the specific cart item
              update(itemRef, { quantity: newQuantity })
                .then(() => {
                  // Quantity updated successfully
                })
                .catch((error) => {
                  console.error("Error updating quantity: ", error);
                  window.alert("Failed to update quantity.");
                });
              break; // Exit the loop once the item is found
            }
          }
        } else {
          console.log("Cart is empty or item not found.");
          window.alert("Cart is empty or item not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        window.alert("Failed to retrieve cart data.");
      });
  };  

  // Remove item from cart
  const handleRemoveItem = (id) => {
    const cartRef = ref(db, `users/${userId}/cart`);
  
    // Get all items in the cart
    get(cartRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Iterate through the items in the cart to find the matching id
          snapshot.forEach((childSnapshot) => {
            const item = childSnapshot.val();
            const itemId = childSnapshot.key; // This is the unique key of the item
  
            if (item.id === id) {
              // If the item id matches, remove the item using its unique key
              remove(ref(db, `users/${userId}/cart/${itemId}`))
                .then(() => {
                  window.alert("Item removed from cart.");
                })
                .catch((error) => {
                  console.error("Error removing item: ", error);
                  window.alert("Failed to remove item.");
                });
            }
          });
        } else {
          console.log("No items found in cart.");
        }
      })
      .catch((error) => {
        console.error("Error fetching cart items: ", error);
        window.alert("Failed to retrieve cart data.");
      });
  };
  
  const openInstagram = () => {
    window.open('https://www.instagram.com', '_blank');
  };

  const openFacebook = () => {
    window.open('https://www.facebook.com', '_blank');
  };

  const openX = () =>{
    window.open('https://www.x.com', '_blank');
  };

  const goToHomepage = () => {
    navigate('/home'); // Redirects to the homepage (root path)
  };

  const goToCart = () => {
    navigate('/cart'); // Replace with your cart page path
  };

  const navigate = useNavigate();

  return (
    <div className='home'>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'white'}}>
        <Toolbar>
        <IconButton
        size="large"
        edge="start"
        aria-label="home"
        color= '#c9c7b8'
        sx={{ mr: 2 }}
        onClick={goToHomepage}
      >
        <HomeIcon />
        </IconButton>

        <IconButton
          size="large"
          edge="start"
          color="#c9c7b8" 
          aria-label="cart"
          sx={{ mr: 2 }}
          onClick={goToCart}>
        <ShoppingCartIcon />
        </IconButton>
          <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
            >
              <img src={logo} alt="displaying logo That Trifecta Muse" width={200} />
            </Typography>

            <IconButton
            size="large"
            edge="start"
            color="#c9c7b8"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openInstagram}
          >
        <Instagram/>
          </IconButton>
          
          <IconButton
            size="large"
            edge="start"
            color="#c9c7b8"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openX}
          >
        <X/>
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="#c9c7b8"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={openFacebook}
          >
        <Facebook/>

          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
    <br/>
    <Box sx={{ padding: "2rem", minHeight: "100vh", backgroundColor: "#f0f0f0" }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ShoppingCartOutlinedIcon fontSize="large" sx={{ marginRight: "0.5rem" }} />
        My Cart
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: "1rem" }}>
        {/* Cart Items Section */}
        <Grid item xs={12} md={8}>
          {cartItems.length > 0 ? (
            <Stack spacing={2}>
              {cartItems.map((item) => (
                <Paper
                  key={item.id}
                  elevation={3}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1rem",
                    borderRadius: "8px",
                  }}
                >
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    sx={{ width: 100, height: 100, marginRight: "1rem" }}
                    variant="rounded"
                  />
                  <Box flex="1">
                    <Typography variant="h6" fontWeight="bold">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Price: ₹{item.price} x {item.quantity}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "0.5rem",
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography
                        variant="body1"
                        sx={{
                          margin: "0 1rem",
                          minWidth: "30px",
                          textAlign: "center",
                        }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        color="primary"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </Button>
                </Paper>
              ))}
            </Stack>
          ) : (
            <Typography variant="h6" color="textSecondary" textAlign="center">
              Your cart is empty.
            </Typography>
          )}
        </Grid>

        {/* Summary Section */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              padding: "1.5rem",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ marginBottom: "1rem" }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <Typography variant="body1">Items in Cart:</Typography>
              <Typography variant="body1">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <Typography variant="body1">Total Price:</Typography>
              <Typography variant="body1" fontWeight="bold">
                ₹{totalBill}
              </Typography>
            </Box>
            <Divider sx={{ marginBottom: "1rem" }} />
            <Button
              variant="contained"
              fullWidth
              disabled={cartItems.length === 0}
              style={{ backgroundColor: "#797c69" }}
              onClick={() => {
                if (cartItems.length === 0) {
                  alert('Your cart is empty!');
                  return;
                }
                navigate('/payment-gateway', { state: { cartItems, totalBill } });
              }}              
            >
              Proceed to Payment
            </Button>
          </Paper>
          <Button
              variant="outlined"
              fullWidth
              sx={{ marginTop: "1rem", color: "#1976d2", borderColor: "#1976d2" }}
              onClick={() => navigate('/order-history')}
            >
              View Previous Orders
            </Button>
        </Grid>
      </Grid>
    </Box>
    <SidebarChatbot />
    </div>
  );
};

export default CartPage;