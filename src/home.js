import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Instagram } from '@mui/icons-material';
import { X } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material';
import logo from './logo.png';
import front from './front.png';
import about from './about.png';
import { useNavigate } from 'react-router-dom';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';
import image4 from './image4.png';
import {Avatar,Paper} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SidebarChatbot from './SidebarChatbot';
import './App.css';

export default function Home() {
    const navigate = useNavigate();
    const goToHomepage = () => {
      navigate('/home'); // Redirects to the homepage (root path)
    };
    const goTonext = () =>{
      navigate('/newpage');
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

      const goToCart = () => {
        navigate('/cart'); // Replace with your cart page path
      };

      const navigateToNextPage = (id) => {
        const selectedContent = Imagecontent[id]; // Adjust index by subtracting 1
        if (selectedContent) {
          localStorage.setItem('imageId', id+1);
          localStorage.setItem('Heading', selectedContent.heading);
          localStorage.setItem('content', selectedContent.content);
          navigate('/nextpage');
        } else {
          console.error("Invalid ID provided");
        }
      };
      
      const clickcolortest = () => {
        console.log('clicked');
        navigate('/colortest');
      };
      const clickchatbot = () => {
        console.log('chatbot used');
        navigate('/chatbot')
      };
      const Imagecontent = [
        {
          heading: 'Sunny Side Up Style',
          content: 'Embrace the warmth of autumn with our electric orange jacket paired with a crisp white tee. This dynamic duo effortlessly blends comfort and cool, perfect for a casual day or a night out.',
        },
        {
          heading: 'Embrace the minimalist aesthetic',
          content: 'This beige shirt embodies the clean lines and understated elegance of Japanese fashion. Perfect when paired with classic black trousers for a sophisticated, modern outfit.',
        },
        {
          heading: 'Indulge in luxury',
          content: "This black dress features exquisite ruffles that add a touch of drama and sophistication to your look. Perfect for a night out or a special occasion.",
        },
        {
          heading: 'Soft and sophisticated',
          content: "This ensemble of a delicate pink turtleneck, matching jacket, and breezy light blue pants creates a harmonious yet unexpected look. Perfect for a day of exploring.",
        },
      ];
      

        const testimonials = [
            {
              name: 'John Doe',
              content: 'This is the best shopping experience I’ve ever had!',
            },
            {
              name: 'Jane Smith',            
              content: 'Amazing products with top-notch customer service!',
            },
            {
              name: 'Emily Johnson',
              content: 'I love the variety and quality of the collections!',
            },
            {
              name:'Hermoine Granger',
              content: "This website has undeniably transformed Harry and Ron's style",
            },
            {
              name: 'Ron Weasly',
              content: 'I never knew I could look this good!',
            },
            {
              name:'Luna Lovegood',
              content: 'I love the way the clothes make me feel like a unicorn',
            },
            {
              name:'Neville LongBottom',
              content: 'I never knew I could be this stylish',
            },
          ];
          
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
    
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ marginTop: 2 ,backgroundColor:"#797c69",color:'black'}}>
          <Box sx={{height:'100px',justifyContent:"center",alignContent:'center'}}>
            <Button href="#home" title="Home" sx={{color:'black'}}>Home</Button>
            <Button href="#latest" title="Latest" sx={{color:'black'}}>New Collection</Button>
            <Button href="#about" title="About Us" sx={{color:'black'}}>About Us</Button>
            <Button href="#testimonials" title="Testimonial" sx={{color:'black'}}>Testimonial</Button>
            <Button href="#contact" title="Contact Us" sx={{color:'black'}}>Contact Us</Button>
            <Button title="Color Test" sx={{color:'black'}} onClick={clickcolortest}>Color Test</Button>
            <Button title="chatbot" sx={{color:'black'}} onClick={clickchatbot}>ChatBot</Button>
        
            </Box>
        </AppBar>
    </Box>
    <br/>
    <Box 
  id="home" 
  sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#c9c7b8', 
    padding: '2%' 
  }}
>
  <img
    src={front}
    alt="A girl"
    style={{ maxWidth: '55%', marginRight: '5%' }}
  />
  <Box 
    sx={{ 
      textAlign: 'center', // Center align text
      justifyContent: 'center', 
      maxWidth: '50%' 
    }}
  >
    <Typography 
      variant="h5" 
      sx={{ fontFamily: 'Anahaw' }}
    >
      Let's Shop
    </Typography>
    <Typography 
      className='new-arrival' 
      variant="h3" 
      sx={{ fontFamily: 'Atteron', margin: '0 auto' }}
    >
      New <br />
      Arrivals<br />
      _________
    </Typography>
    <br />
    <Typography variant="body1">
      Welcome to That Trifecta Muse! Explore our latest collection and find your perfect style.
    </Typography>
    <br />
    <Button
      variant="outlined"
      id='1'
      sx={{ 
        color: 'black', 
        borderColor: 'black', 
        display: 'block', 
        mx: 'auto' // Center button horizontally
      }}
      onClick={goTonext}
    >
      Shop Now
    </Button>
  </Box>
</Box>

<br/>      
<Box id="latest" sx={{ backgroundColor: '#797c69', padding: '2%' }}>
      <Typography
        className='new-arrival'
        variant="h3"
        sx={{
          marginBottom: '1%',
          textAlign: 'center',
          fontFamily: 'Atteron',
          color: 'white',
        }}
      >
        ..... Latest Collection .....
      </Typography>
      <br/>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '2%',backgroundColor: '#c9c7b8' }}>
      <br/><br/>
  {[image1, image2, image3, image4].map((image, index) => (
    
    <Box 
      key={index} 
      sx={{ 
        width: '22%', 
        textAlign: 'center',
        aspectRatio: '1/2', 
      }}
    >
        <br/>
        <img
        id={`${(index+1)*50}`}
        src={image}
        alt={`Shop New Item ${index + 1}`}
        onClick={() => navigateToNextPage(index)} // Change to `index + 1` to match the ID logic
        style={{
          width: '100%',
          height: '100%', 
          cursor: 'pointer',
          objectFit: 'cover',
          borderRadius: '10px',
        }}
      />
      <br/><br/>
      <Typography variant="body2"></Typography>
    </Box>
  ))}
  <br/>
    <Button
    fullWidth
    sx={{
    backgroundColor: '#dee2d4', 
    padding: '2%',
    color:'black',
    }}
    >
         <Button variant="body2" sx={{ textAlign: 'center', fontFamily: 'Anahaw' }} onClick={goTonext}>
           
   Check out more such collections..
   </Button>
</Button>
</Box>

    </Box>
          <Box id="about" sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#c9c7b8', padding: '2%' }} >
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: 'Menu', padding: '2%' }}>
          <img
            src={about}
            style={{ maxWidth: '50%' }}
            alt='about us'
          />
           <Box sx={{ textAlign: 'justify', justifyContent: 'center', justifyItems: 'center', maxWidth: '60%', marginLeft: '5%', marginRight: '3%' }}>
            <Typography className='new-arrival' variant="h3" sx={{ marginBottom: '1%', textAlign: 'center', fontFamily: 'Atteron' }}>
              About <br />
              Us
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center', fontFamily: 'Anahaw' }}>
              Trifecta: Where Code Meets Couture
            </Typography>
            <br />
            <Typography variant="body2">
            That Trifecta Muse is more than just a clothing store; it's a lifestyle. We're passionate about crafting apparel that empowers individuals to express their unique style. Our collections are designed to inspire confidence and make you feel extraordinary.

            We believe that fashion should be accessible, sustainable, and a source of joy. That's why we're committed to creating high-quality pieces that not only look great but also feel amazing to wear.

Join us on this fashion journey as we redefine trends and celebrate individuality.
            </Typography>
            <br />
          </Box>
        </Box>
      </Box>

      <br />
      <Box id="testimonials" sx={{ padding: '5%', backgroundColor: '#f4f4f4' }}>
      <Typography
        variant="h4"
        sx={{ marginBottom: '2%', textAlign: 'center', fontFamily: 'Atteron', color: '#8c8674' }}
      >
        What Our Customers Say
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', overflowX: 'auto', gap: '20px' }}>
        {testimonials.map((testimonial, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px',
              backgroundColor: '#8c8674',
              color: 'white',
              borderRadius: '8px',
              minWidth: '300px',
              maxWidth: '300px',
              textAlign: 'center',
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <Avatar
              src={testimonial.image}
              alt={testimonial.name}
              sx={{ width: 60, height: 60, marginRight: '15px' }}
            />
            <Box>
              <Typography variant="body2">
                "{testimonial.content}"
              </Typography>
              <Typography variant="subtitle2" sx={{ marginTop: '10px' }}>
                - {testimonial.name}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
    <br/>
      <Box>
        <Box id="contact" sx={{backgroundColor:'#797c69'}}>
            <br/>
          <footer className="footer">
          <Box sx={{justifyContent:'left',textAlign:'left',marginLeft:'25px'}}>
          <Typography variant="h4">Contact Us</Typography>
          <Typography  variant="body1">Email: support@thattrifectamuse.com</Typography >
          <Typography  variant="body1">Phone: +123-456-7890</Typography >
          <Typography  variant="body1">Address: 123 Fashion St, Trendy City, Fashionland</Typography >
        </Box>

          </footer>
          <Box sx={{ marginTop: 6 }}>
            <Typography variant="body2">&copy; 2024 Trifecta. All rights reserved.</Typography>
            <br/>
          </Box>
        </Box>
      </Box>
      <SidebarChatbot/>
    </div>
  );
}