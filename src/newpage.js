import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Instagram } from '@mui/icons-material';
import { X } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material';
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link for navigation
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
import SidebarChatbot from './SidebarChatbot';

function Newpage() {

  // Product data with imported images
  const newArrivals = [
    { title: 'Oversized Tshirts', image: img1, link: 'oversized-tshirts' },
    { title: 'Casual Shirts', image: img2, link: 'casual-shirts' },
    { title: 'Luxury Handbag', image: img3, link: 'luxury-handbag' },
    { title: 'Formal Jacket', image: img11, link: 'formal-jacket' },
  ];

  const latestCollection = [
    { title: 'Casual Shirts', image: img4, link: 'latest-casual-shirts' },
    { title: 'Jacket', image: img5, link: 'latest-jacket' },
    { title: 'Hoodies', image: img6, link: 'latest-hoodies' },
    { title: 'Dress', image: img10, link: 'latest-dress' },
  ];

  const bestSellers = [
    { title: 'Formals', image: img7, link: 'best-formals' },
    { title: 'Cord Sets', image: img8, link: 'best-cord-sets' },
    { title: 'Brown Pants', image: img9, link: 'best-brown-pants' },
    { title: 'Black Coats', image: img12, link: 'best-black-coats' },
  ];

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
    
    {/* <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ marginTop: 2 ,backgroundColor:"#797c69",color:'black'}}>
          <Box sx={{height:'100px',justifyContent:"center",alignContent:'center'}}>
            <Button href="/home/#home" title="Home" sx={{color:'black'}}>Home</Button>
            <Button href="/newpage" title="Latest" sx={{color:'black'}}>New Collection</Button>
            <Button href="/home/#about" title="About Us" sx={{color:'black'}}>About Us</Button>
            <Button href="/home/#testimonials" title="Testimonial" sx={{color:'black'}}>Testimonial</Button>
            <Button href="/home/#contact" title="Contact Us" sx={{color:'black'}}>Contact Us</Button>
            <Button title="Color Test" sx={{color:'black'}} onClick={clickcolortest}>Color Test</Button>
            </Box>
        </AppBar>
    </Box> */}
    <br/>
    <Box className="homepage">
      {/* New Arrivals Section */}
      <SectionWithGrid title="New Arrivals" products={newArrivals} bgColor="#f0f0f0" />

      {/* Latest Collection Section */}
      <SectionWithGrid title="Latest Collection" products={latestCollection} bgColor="#797c69" />

      {/* Best Sellers Section */}
      <SectionWithGrid title="Best Sellers" products={bestSellers} bgColor="#c9c7b8" />
    </Box>
    </div>
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
            <ProductCard title={product.title} image={product.image} link={product.link} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Product Card Component
const ProductCard = ({ title, image, link }) => {
  return (
    <Card sx={{ maxWidth: 705, margin: '1rem auto' }}>
      <Link
        to={`/newpage/${link}`}
        style={{
          textDecoration: 'none',
          color: 'black', // Set the text color to black
        }}
      >
        <CardMedia component="img" height="300" image={image} alt={title} />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </CardContent>
      </Link>
      <SidebarChatbot/>
    </Card>
  );
};

export default Newpage;
