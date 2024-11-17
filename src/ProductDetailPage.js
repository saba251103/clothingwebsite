import React, { useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
} from '@mui/material';

// Helper function to generate random prices
const generateRandomPrice = () => Math.floor(Math.random() * 500) + 100;

const ProductDetailPage = () => {
  const { productSlug } = useParams(); // Extract the productSlug from the URL
  const navigate = useNavigate(); // Hook for navigation
  // Sample product data
  const products = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    name: `${productSlug.replace(/-/g, ' ')} - Product ${index + 1}`,
    price: generateRandomPrice(),
    image: `https://via.placeholder.com/300x300?text=Product+${index + 1}`,
  }));

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceFilter, setPriceFilter] = useState('');

  // Filter products based on cost
  const handleFilter = () => {
    const maxPrice = parseInt(priceFilter, 10);
    if (!isNaN(maxPrice)) {
      setFilteredProducts(products.filter((product) => product.price <= maxPrice));
    } else {
      setFilteredProducts(products); // Reset if filter is invalid
    }
  };

  // Handle "Buy Now" click
  const handleBuyNow = (product) => {
    navigate(`/payment/${product.id}`, { state: { product } });
  };

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {productSlug.replace(/-/g, ' ').toUpperCase()}
      </Typography>

      {/* Filter Section */}
      <Box sx={{ margin: '1rem 0', textAlign: 'center' }}>
        <TextField
          label="Max Price"
          type="number"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          sx={{ marginRight: '1rem', width: '200px' }}
        />
        <Button variant="contained" color="primary" onClick={handleFilter} style={{marginTop:'10px',backgroundColor:'#797c69',color:'black'}}>
          Apply Filter
        </Button>
      </Box>

      {/* Products Grid */}
      <Grid container spacing={4}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1" color="textSecondary">
                  Price: ₹{product.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained"  style={{ backgroundColor:'#797c69'}} onClick={() => handleBuyNow(product)}>
                  Buy Now
                </Button>
                <Button variant="contained" style={{ backgroundColor:'transparent',color:'black', border: '0.60px solid black',marginLeft:'47px'}} >
                  Add to cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductDetailPage;

