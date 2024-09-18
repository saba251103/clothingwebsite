import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import './App.css';
import img1 from './img2.png';
import img2 from './img3.png';
import img3 from './img4.png';
import img4 from './img5.png';
import img5 from './img6.png';
import img6 from './img7.png';
import img7 from './img8.png';
import img8 from './img9.png';
import img9 from './img10.png';
import img10 from './img11.png';
import img11 from './img12.png';
import img12 from './img13.png';

function Newpage() {
  // Product data with imported images
  const newArrivals = [
    { title: 'Oversized Tshirts', image: img1 },
    { title: 'Casual Shirts', image: img2 },
    { title: 'Luxury Handbag', image: img3 },
    { title: 'Formal Jacket', image: img11 },
    
  ];

  const latestCollection = [
    { title: 'Casual Shirts', image: img4 },
    { title: 'Jacket', image: img5 },
    { title: 'Hoodies', image: img6 },
    { title: 'Dress', image: img10 },
  ];

  const bestSellers = [
    { title: 'Formals', image: img7 },
    { title: 'Cord Sets', image: img8 },
    { title: 'Brown Pants', image: img9 },
    { title: 'Black Coats', image: img12 },
  ];

  return (
    <Box className="homepage">
      {/* New Arrivals Section */}
      <SectionWithGrid
        title="New Arrivals"
        products={newArrivals}
        bgColor="#f0f0f0"
     
      />

      {/* Latest Collection Section */}
      <SectionWithGrid
        title="Latest Collection"
        products={latestCollection}
        bgColor="#797c69"

      />

      {/* Best Sellers Section */}
      <SectionWithGrid
        title="Best Sellers"
        products={bestSellers}
        bgColor="#c9c7b8"
      
      />
    </Box>
  );
}

// Reusable Section with Product Grid
const SectionWithGrid = ({ title, products, bgColor }) => {
  return (
    <Box sx={{ backgroundColor: bgColor, padding: '4rem 2rem', textAlign: 'center' }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={4}>
        {products.map((product, index) => (
          <Grid item xs={10} sm={5} md={3} key={index}>
            <ProductCard title={product.title} image={product.image} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Product Card Component
const ProductCard = ({ title, image }) => {
  return (
    <Card sx={{ maxWidth: 705, margin: '1rem auto' }}>
      <CardMedia component="img" height="300" image={image} alt={title} />
      <CardContent>
        <Typography variant="h6" component="div">
          {title}          
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Newpage;
