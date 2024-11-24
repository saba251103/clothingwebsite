import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ref, push } from "firebase/database";
import { db } from "./firebase";
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

import img1 from './images/img_1.png';
import img2 from './images/img_2.png';
import img3 from './images/img_3.png';
import img4 from './images/img_4.png';
import img5 from './images/img_5.png';
import img6 from './images/img_6.png';
import img7 from './images/img_7.png';
import img8 from './images/img_8.png';
import img9 from './images/img_9.png';
import img10 from './images/img_10.png';
import img11 from './images/img_11.png';
import img12 from './images/img_12.png';
import img13 from './images/img_13.png';
import img14 from './images/img_14.png';
import img15 from './images/img_15.png';
import img16 from './images/img_16.png';
import img17 from './images/img_17.png';
import img18 from './images/img_18.png';
import img19 from './images/img_19.png';
import img20 from './images/img_20.png';
import img21 from './images/img_21.png';
import img22 from './images/img_22.png';
import img23 from './images/img_23.png';
import img24 from './images/img_24.png';
import img25 from './images/img_25.png';
import img26 from './images/img_26.png';
import img27 from './images/img_27.png';

const ProductDetailPage = () => {
  const { productSlug } = useParams(); // Extract the productSlug from the URL
  const navigate = useNavigate(); // Hook for navigation

  const categoryData = {
    'oversized-tshirts': [
      { id: 1, name: 'Chill Oversized Tee', price: 549, image: img1 },
      { id: 2, name: 'Vibe Oversized Tee', price: 629, image: img2 },
      { id: 3, name: 'Comfy Oversized Tee', price: 720, image: img3 },
      { id: 4, name: 'Street Style Tee', price: 530, image: img4 },
      { id: 5, name: 'Relaxed Fit Tee', price: 410, image: img5 },
      { id: 6, name: 'Urban Oversized Tee', price: 575, image: img6 },
      { id: 7, name: 'Loose Fit Tee', price: 399, image: img7 },
      { id: 8, name: 'Casual Oversized Tee', price: 430, image: img8 },
      { id: 9, name: 'Laid-back Oversized Tee', price: 395, image: img9 },
    ],
    'casual-shirts': [
      { id: 1, name: 'Vintage Casual Shirt', price: 879, image: img10 },
      { id: 2, name: 'Slim Fit Casual Shirt', price: 1050, image: img11 },
      { id: 3, name: 'Crisp White Shirt', price: 980, image: img12 },
      { id: 4, name: 'Bold Pattern Shirt', price: 1020, image: img13 },
      { id: 5, name: 'Subtle Striped Shirt', price: 950, image: img14 },
      { id: 6, name: 'Muted Tone Shirt', price: 925, image: img15 },
      { id: 7, name: 'Linen Blend Shirt', price: 970, image: img16 },
      { id: 8, name: 'Soft Cotton Shirt', price: 945, image: img17 },
      { id: 9, name: 'Relaxed Collar Shirt', price: 900, image: img18 },
    ],
    'luxury-handbag': [
      { id: 1, name: 'Elegant Leather Bag', price: 4999, image: img19 },
      { id: 2, name: 'Classic Tote Bag', price: 6990, image: img20 },
      { id: 3, name: 'Modern Sling Bag', price: 7199, image: img21 },
      { id: 4, name: 'Chic Shoulder Bag', price: 6899, image: img22 },
      { id: 5, name: 'Designer Clutch', price: 7399, image: img23 },
      { id: 6, name: 'Luxury Backpack', price: 7799, image: img24 },
      { id: 7, name: 'Statement Purse', price: 7599, image: img25 },
      { id: 8, name: 'Trendy Satchel', price: 7299, image: img26 },
      { id: 9, name: 'Minimalist Bag', price: 6999, image: img27 },
    ],
   'formal-jacket': [
      { id: 1, name: 'Vintage Casual Shirt', price: 879, image: img10 },
      { id: 2, name: 'Slim Fit Casual Shirt', price: 1050, image: img11 },
      { id: 3, name: 'Crisp White Shirt', price: 980, image: img12 },
      { id: 4, name: 'Bold Pattern Shirt', price: 1020, image: img13 },
      { id: 5, name: 'Subtle Striped Shirt', price: 950, image: img14 },
      { id: 6, name: 'Muted Tone Shirt', price: 925, image: img15 },
      { id: 7, name: 'Linen Blend Shirt', price: 970, image: img16 },
      { id: 8, name: 'Soft Cotton Shirt', price: 945, image: img17 },
      { id: 9, name: 'Relaxed Collar Shirt', price: 900, image: img18 },
    ],
  };

  const products = categoryData[productSlug] || [];
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
    <div name="home">
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilter}
            style={{ marginTop: '10px', backgroundColor: '#797c69', color: 'white' }}
          >
            Apply Filter
          </Button>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia component="img" height="300" image={product.image} alt={product.name} />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    Price: ₹{product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#797c69' }}
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'black',
                      border: '0.60px solid black',
                    }}
                    onClick={() => {
                      // Add quantity to the product object and push to cart
                      push(ref(db, 'cart'), {
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default ProductDetailPage;
