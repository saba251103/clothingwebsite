import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ref, push, update, get } from "firebase/database";
import { getAuth } from "firebase/auth";
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
  IconButton
} from '@mui/material';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { X, Facebook, Instagram } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import logo from './logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
import img28 from './images/img_28.png';
import img29 from './images/img_29.png';
import img30 from './images/img_30.png';
import img31 from './images/img_31.png';
import img32 from './images/img_32.png';
import img33 from './images/img_33.png';
import img34 from './images/img_34.png';
import img35 from './images/img_35.png';
import img36 from './images/img_36.png';
import img37 from './images/img_37.png';
import img38 from './images/img_38.png';
import img39 from './images/img_39.png';
import img40 from './images/img_40.png';
import img41 from './images/img_41.png';
import img42 from './images/img_42.png';
import img43 from './images/img_43.png';
import img44 from './images/img_44.png';
import img45 from './images/img_45.png';
import img46 from './images/img_46.png';
import img47 from './images/img_47.png';
import img48 from './images/img_48.png';
import img49 from './images/img_49.png';
import img50 from './images/img_50.png';
import img51 from './images/img_51.png';
import img52 from './images/img_52.png';
import img53 from './images/img_53.png';
import img54 from './images/img_54.png';
import img55 from './images/img_55.png';
import img56 from './images/img_56.png';
import img57 from './images/img_57.png';
import img58 from './images/img_58.png';
import img59 from './images/img_59.png';
import img60 from './images/img_60.png';
import img61 from './images/img_61.png';
import img62 from './images/img_62.png';
import img63 from './images/img_63.png';
import img64 from './images/img_64.png';
import img65 from './images/img_65.png';
import img66 from './images/img_66.png';
import img67 from './images/img_67.png';
import img68 from './images/img_68.png';
import img69 from './images/img_69.png';
import img70 from './images/img_70.png';
import img71 from './images/img_71.png';
import img72 from './images/img_72.png';
import img73 from './images/img_73.png';
import img74 from './images/img_74.png';
import img75 from './images/img_75.png';
import img76 from './images/img_76.png';
import img77 from './images/img_77.png';
import img78 from './images/img_78.png';
import img79 from './images/img_79.png';
import img80 from './images/img_80.png';
import img81 from './images/img_81.png';
import img82 from './images/img_82.png';
import img83 from './images/img_83.png';
import img84 from './images/img_84.png';
import img85 from './images/img_85.png';
import img86 from './images/img_86.jpeg';
import img87 from './images/img_87.jpeg';
import img88 from './images/img_88.jpeg';
import img89 from './images/img_89.jpeg';
import img90 from './images/img_90.jpeg';
import img91 from './images/img_91.png';
import img92 from './images/img_92.png';
import img93 from './images/img_93.png';
import img94 from './images/img_94.png';
import img95 from './images/img_95.png';
import img96 from './images/img_96.png';
import img97 from './images/img_97.png';
import img98 from './images/img_98.png';
import img99 from './images/img_99.png';
import img100 from './images/img_100.jpeg';
import img101 from './images/img_101.jpeg';
import img102 from './images/img_102.jpeg';
import img103 from './images/img_103.jpeg';
import img104 from './images/img_104.jpeg';
import img105 from './images/img_105.jpeg';
import img106 from './images/img_106.jpeg';
import img107 from './images/img_107.jpeg';
import img108 from './images/img_108.jpeg';


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
    
      {id: 1, name: "Classic Black Jacket", price: 4999, image: img28},
      {id: 2, name: "Modern Grey Jacket", price: 5499, image: img29},
      {id: 3, name: "Slim Fit Navy Jacket", price: 5999, image: img30},
      {id: 4, name: "Textured Brown Jacket", price: 6999, image: img31},
      {id: 5, name: "Formal Jacket", price: 6499, image: img32},
      {id: 6, name: "Classic White Jacket", price: 5999, image: img33},
      {id: 7, name: "Beige Formal Jacket", price: 7299, image: img34},
      {id: 8, name: "Pinstripe Formal Jacket", price: 7499, image: img35},
      {id: 9, name: "Darling Red Jacket", price: 6499, image: img36}
    
  ],    
'latest-casual-shirts': [
    
      {id: 1, name: "Checked Blue Shirt", price: 2499, image: img37},
      {id: 2, name: "Slim Fit Shirt", price: 1999, image: img38},
      {id: 3, name: "Floral Print Shirt", price: 2999, image: img39},
      {id: 4, name: "Pastel Earthy Shirt", price: 2299, image: img40},
      {id: 5, name: "Casual Shirt", price: 2699, image: img41},
      {id: 6, name: "Classic Blue Shirt", price: 2199, image: img42},
      {id: 7, name: "Grey Shirt", price: 2799, image: img43},
      {id: 8, name: "White Linen Shirt", price: 2399, image: img44},
      {id: 9, name: "Bold Yellow Shirt", price: 2599, image: img45}
    
  ],
  'latest-jacket': [
    
      {id: 1, name: "Winter Puffer Jacket", price: 7999, image: img46},
      {id: 2, name: "Hooded  Jacket", price: 5499, image: img47},
      {id: 3, name: "Stylish Biker Jacket", price: 8999, image: img48},
      {id: 4, name: "Olive Green Jacket", price: 6999, image: img49},
      {id: 5, name: "Casual Jacket", price: 9999, image: img50},
      {id: 6, name: "Suede Tan Jacket", price: 8999, image: img51},
      {id: 7, name: "Black Jacket", price: 5999, image: img52},
      {id: 8, name: "Lavender Jacket", price: 12999, image: img53},
      {id: 9, name: "Classic Coat", price: 14999, image: img54}
    
  ],
  'latest-hoodies': [
    
      {id: 1, name: "Oversized Grey Hoodie", price: 2999, image: img55},
      {id: 2, name: "Black Zipper Hoodie", price: 3499, image: img56},
      {id: 3, name: "Red Graphic Hoodie", price: 3999, image: img57},
      {id: 4, name: "Neutral Beige Hoodie", price: 2799, image: img58},
      {id: 5, name: "Basic Navy Hoodie", price: 2499, image: img59},
      {id: 6, name: "Vintage Logo Hoodie", price: 3499, image: img60},
      {id: 7, name: "Cropped Grey Hoodie", price: 2999, image: img61},
      {id: 8, name: "Warm Fleece Hoodie", price: 4499, image: img62},
      {id: 9, name: "Pastel Pink Hoodie", price: 3699, image: img63}
    
  ],
  'latest-dress': [
    
      {id: 1, name: "Elegant Red Dress", price: 8999, image: img64},
      {id: 2, name: "Floral Maxi Dress", price: 7499, image: img65},
      {id: 3, name: "Casual Blue Midi Dress", price: 6599, image: img66},
      {id: 4, name: "Velvet Evening Dress", price: 11999, image: img67},
      {id: 5, name: "Boho Chic Dress", price: 6499, image: img68},
      {id: 6, name: "Striped Sundress", price: 5499, image: img69},
      {id: 7, name: "White Summer Dress", price: 4999, image: img70},
      {id: 8, name: "Black Cocktail Dress", price: 10999, image: img71},
      {id: 9, name: "Gold Sequin Dress", price: 12999, image: img72}
    
  ],
    'best-formals': [
      {id: 1, name: "Tailored Black Suit", price: 14999, image: img73},
      {id: 2, name: "Slim Fit Grey Suit", price: 12999, image: img74},
      {id: 3, name: "Navy Blue Tuxedo", price: 17999, image: img75},
      {id: 4, name: "Classic Whites", price: 9999, image: img76},
      {id: 5, name: "Formal Charcoal Suit", price: 13999, image: img77},
      {id: 6, name: "Pinstripe Navy Suit", price: 16999, image: img78},
      {id: 7, name: "Grey Suit", price: 11999, image: img79},
      {id: 8, name: "Modern Fit Black Tuxedo", price: 18999, image: img80},
      {id: 9, name: "Beige Formal Blazer", price: 10999, image: img81}
    ],
    'best-cord-sets': [
      {id: 1, name: "Tan Corduroy Set", price: 7999, image: img82},
      {id: 2, name: "Olive Green Cord Set", price: 8499, image: img83},
      {id: 3, name: "Black Velvet Cord Set", price: 9999, image: img84},
      {id: 4, name: "Beige Lounge Cord Set", price: 8999, image: img85},
      {id: 5, name: "Maroon Ribbed Cord Set", price: 9499, image: img86},
      {id: 6, name: "Grey Knitted Cord Set", price: 8799, image: img87},
      {id: 7, name: "Rust Brown Cord Set", price: 8199, image: img88},
      {id: 8, name: "Pastel Pink Cord Set", price: 7999, image: img89},
      {id: 9, name: "Navy Blue Cord Set", price: 8899, image: img90}
    ],
    'best-brown-pants': [
      {id: 1, name: "Classic Tan Chinos", price: 3999, image: img91},
      {id: 2, name: "Slim Fit Dark Brown Pants", price: 4599, image: img92},
      {id: 3, name: "Casual Light Brown Trousers", price: 3499, image: img93},
      {id: 4, name: "Beige Formal Pants", price: 4199, image: img94},
      {id: 5, name: "Walnut Brown Corduroy Pants", price: 4999, image: img95},
      {id: 6, name: "Chocolate Slim Fit Pants", price: 4399, image: img96},
      {id: 7, name: "Rust Brown Joggers", price: 2999, image: img97},
      {id: 8, name: "Espresso Casual Pants", price: 4699, image: img98},
      {id: 9, name: "Mocha Relaxed Fit Pants", price: 3799, image: img99}
    ],
    'best-black-coats': [
      {id: 1, name: "Classic Black Overcoat", price: 15999, image: img100},
      {id: 2, name: "Black Coat", price: 16999, image: img101},
      {id: 3, name: "Black Trench Coat", price: 19999, image: img102},
      {id: 4, name: "Slim Fit Black Wool Coat", price: 14999, image: img103},
      {id: 5, name: "Velvet Black Coat", price: 18999, image: img104},
      {id: 6, name: "Charcoal Black Overcoat", price: 13999, image: img105},
      {id: 7, name: "Casual Black Peacoat", price: 12999, image: img106},
      {id: 8, name: "Leather Black Coat", price: 17999, image: img107},
      {id: 9, name: "Longline Black Coat", price: 19999, image: img108}
    ]
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

  const handleAddToCart = (newItem) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;  // Get the current user's unique ID
    const cartRef = ref(db, `users/${userId}/cart`);
  
    // Fetch current cart data
    get(cartRef)
      .then((snapshot) => {
        const cartData = snapshot.val();
  
        let itemExists = false;
        if (cartData) {
          for (const key in cartData) {
            if (cartData[key].id === newItem.id) {
              // If item exists, increment its quantity
              const itemRef = ref(db, `users/${userId}/cart/${key}`);
              const updatedQuantity = cartData[key].quantity + 1;
              update(itemRef, { quantity: updatedQuantity })
                .then(() => {
                  window.alert("Item quantity updated in cart.");
                })
                .catch((error) => {
                  console.error("Error updating quantity: ", error);
                  window.alert("Failed to update item quantity.");
                });
              itemExists = true;
              break;
            }
          }
        }
  
        if (!itemExists) {
          // If item does not exist, add it to the cart
          const newCartItem = { ...newItem, quantity: 1 };
          const newItemRef = ref(db, `users/${userId}/cart`);
          const newItemKey = push(newItemRef).key; // Generate a new unique key
          const updates = {};
          updates[`users/${userId}/cart/${newItemKey}`] = newCartItem;
  
          update(ref(db), updates)
            .then(() => {
              window.alert("Item added to cart.");
            })
            .catch((error) => {
              console.error("Error adding item to cart: ", error);
              window.alert("Failed to add item to cart.");
            });
        }
      })
      .catch((error) => {
        console.error("Error fetching cart data: ", error);
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
                    onClick={() => handleAddToCart(product)}
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