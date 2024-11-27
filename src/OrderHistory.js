import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
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
  Paper,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user ? user.uid : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    const ordersRef = ref(db, `users/${userId}/orders`);

    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const ordersArray = Object.entries(data).map(([orderId, order]) => ({
          orderId,
          ...order,
        }));
        setOrders(ordersArray);
      } else {
        setOrders([]);
      }
    });

    return () => unsubscribe();
  }, [userId]);

  if (!userId) {
    return (
      <Box textAlign="center" mt={5}>
        <Typography variant="h5" color="error">
          Please log in to view your order history.
        </Typography>
      </Box>
    );
  }

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
    <Box sx={{ padding: "2rem", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h3"
        fontWeight="bold"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <ShoppingCartOutlinedIcon fontSize="large" sx={{ marginRight: "0.5rem" }} />
        Order History
      </Typography>

      {orders.length > 0 ? (
        <Grid container spacing={3} mt={2}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} key={order.orderId}>
              <Paper elevation={3} sx={{ padding: "1rem", borderRadius: "8px" }}>
                <Typography variant="h6" fontWeight="bold">
                  Order ID: {order.orderId}
                </Typography>
                <Typography variant="body2" color="textSecondary" mb={1}>
                  Placed on: {new Date(order.timestamp).toLocaleString()}
                </Typography>
                <Divider sx={{ my: 1 }} />
                <List>
                  {order.items.map((item, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar
                          src={item.image}
                          alt={item.name}
                          sx={{ width: 50, height: 50 }}
                          variant="square"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.name}
                        secondary={`Price: ₹${item.price} | Quantity: ${item.quantity}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body1" fontWeight="bold">
                  Total Amount: ₹{order.totalAmount}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Payment Method: {order.paymentMethod.toUpperCase()}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" textAlign="center" mt={5}>
          No orders found.
        </Typography>
      )}
    </Box>
    <SidebarChatbot />
    </div>
  );
};

export default OrderHistory;