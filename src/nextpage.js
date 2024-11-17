import React, { useEffect, useState } from "react";
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import { styled } from "@mui/system";
import { Box, Typography, Button } from "@mui/material";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
export default function Nextpage() {
  const [currentImage, setCurrentImage] = useState(image1);
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  const navigate=useNavigate()
  const Buy = () =>{
    alert('You have successfully purchased the product');
    navigate('/home');
  }
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
    const images = [image1, image2, image3, image4]; // Moved inside useEffect
    const imageId = parseInt(localStorage.getItem('imageId'), 10); // Ensure imageId is a number
    const storedHeading = localStorage.getItem('Heading');
    const storedContent = localStorage.getItem('content');
  
    console.log(`imageId: ${imageId}`); // Debugging line to check imageId
    console.log(`storedHeading: ${storedHeading}`); // Debugging line to check Heading
    console.log(`storedContent: ${storedContent}`); // Debugging line to check Content
  
    if (imageId && imageId <= images.length) { // Ensure imageId is within valid range
      setCurrentImage(images[imageId - 1]); // Adjust to get correct image by subtracting 1
      setHeading(storedHeading);
      setContent(storedContent);
    } else {
      console.error("Image ID is out of bounds or invalid");
    }
  }, []); // No need to add `images` as a dependency

  return (
    <div className="signin-container">
      <Box id="home" sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#c9c7b8', padding: '2%' }}>
        <Box 
          sx={{ 
            width: '32%', 
            textAlign: 'center',
            aspectRatio: '1/2', 
          }}
        >
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
          <br/><br/>
        </Box>
        <Box sx={{ textAlign: 'left', justifyContent: 'center', justifyItems: 'left', maxWidth: '50%', marginLeft: '8%' }}>
          <Typography className='new-arrival' variant="h3" sx={{ marginBottom: '1%', textAlign: 'center', fontFamily: 'Atteron' }}>
            {heading}
          </Typography>
          <br />
          <Typography variant="body1">
            {content}
          </Typography>
          <br /><br/>
          <Box sx={{ textAlign: 'left', justifyContent: 'center', justifyItems: 'left', marginLeft: '8%' ,backgroundColor:"beige"}}>
          
          <ProductDetails>
            <Price>₹534</Price>
            <Typography variant="body1" style={{ textDecoration: 'line-through' }}>₹2099</Typography>
            <Typography variant="body2">(Rs. 1565 OFF)</Typography>
            <Typography variant="body2">inclusive of all taxes</Typography>
            
            <Button 
              variant="contained" 
              startIcon={<ShoppingCart />} 
              sx={{ marginTop: '10px', marginRight: '10px', backgroundColor:"#8c8674" }}
              onClick={Buy}
            >
              Buy
            </Button>
            <Button 
              variant="contained" 
              startIcon={<Favorite />} 
              sx={{ marginTop: '10px', backgroundColor:"#8c8674" }}
            >
              Wishlist
            </Button>
          </ProductDetails>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
