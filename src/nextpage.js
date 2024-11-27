import React, { useEffect, useState } from "react";
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import { ref, get, update, push } from "firebase/database";
import { db } from './firebase'; // Ensure this is correctly configured
import { useNavigate } from "react-router-dom";
import SidebarChatbot from './SidebarChatbot';
export default function Nextpage() {
  const [currentImage, setCurrentImage] = useState(image1);
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const [itemId, setItemId] = useState('');
  const navigate = useNavigate();

  const ProductDetails = styled(Box)({
    textAlign: 'left',
    padding: '20px',
  });

  const Price = styled(Typography)({
    color: 'red',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    marginBottom: '10px',
  });

  useEffect(() => {
    const images = [image1, image2, image3, image4];
    const imageId = parseInt(localStorage.getItem('imageId'), 10);
    const storedHeading = localStorage.getItem('Heading');
    const storedContent = localStorage.getItem('content');

    if (imageId && imageId <= images.length) {
      setCurrentImage(images[imageId - 1]);
      setHeading(storedHeading || "Default Heading");
      setContent(storedContent || "Default Content");
      setItemId(imageId*50);
    } else {
      console.error("Invalid imageId. Setting defaults.");
    }
  }, []);

  const handleBuyNow = (product) => {
    if (!product) {
      console.error("Product data is missing.");
      return;
    }
    navigate(`/payment/${product.id}`, { state: { product } });
  };

  const handleAddToCart = (product) => {
    if (!product) {
      console.error("Product data is missing.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      window.alert("Please log in to add items to your cart.");
      return;
    }

    const userId = user.uid;
    const cartRef = ref(db, `users/${userId}/cart`);

    get(cartRef)
      .then((snapshot) => {
        const cartData = snapshot.val();
        let itemExists = false;

        if (cartData) {
          for (const key in cartData) {
            if (cartData[key].id === product.id) {
              const itemRef = ref(db, `users/${userId}/cart/${key}`);
              const updatedQuantity = cartData[key].quantity + 1;
              update(itemRef, { quantity: updatedQuantity })
                .then(() => {
                  window.alert("Item quantity updated in cart.");
                })
                .catch((error) => {
                  console.error("Error updating quantity: ", error);
                });
              itemExists = true;
              break;
            }
          }
        }

        if (!itemExists) {
          const newCartItem = { ...product, quantity: 1 };
          const newItemKey = push(cartRef).key;
          const updates = {};
          updates[`users/${userId}/cart/${newItemKey}`] = newCartItem;

          update(ref(db), updates)
            .then(() => {
              window.alert("Item added to cart.");
            })
            .catch((error) => {
              console.error("Error adding item to cart: ", error);
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching cart data: ", error);
      });
      navigate('/cart');
  };

  return (
    <div className="signin-container">
      <Box id="home" sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#c9c7b8', padding: '2%' }}>
        <Box sx={{ width: '32%', textAlign: 'center', aspectRatio: '1/2' }}>
          <img
            src={currentImage}
            alt="Product"
            style={{
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          <br /><br />
        </Box>
        <Box sx={{ textAlign: 'left', justifyContent: 'center', maxWidth: '50%', marginLeft: '8%' }}>
          <Typography variant="h3" sx={{ marginBottom: '1%', textAlign: 'center', fontFamily: 'Atteron' }}>
            {heading}
          </Typography>
          <Typography variant="body1">{content}</Typography>
          <br /><br />
          <ProductDetails>
            <Price>₹534</Price>
            <Typography variant="body1" style={{ textDecoration: 'line-through' }}>₹2099</Typography>
            <Typography variant="body2">(Rs. 1565 OFF)</Typography>
            <Typography variant="body2">Inclusive of all taxes</Typography>
            <Button
              variant="contained"
              sx={{ marginTop: '10px', marginRight: '10px', backgroundColor: "#8c8674" }}
              onClick={() => handleBuyNow({ id: itemId, name: heading, price: 534, image: currentImage })}
            >
              Buy
            </Button>
            <Button
              variant="contained"
              sx={{ marginTop: '10px', backgroundColor: "#8c8674" }}
              onClick={() => handleAddToCart({ id: itemId, name: heading, price: 534, image: currentImage })}
            >
              Add To Cart
            </Button>
          </ProductDetails>
        </Box>
      </Box>
      <SidebarChatbot/>
    </div>
  );
}