import './App.css';
import Home from './home';
import SignupPage from './signup';
import Login from './Login';
import Nextpage from './nextpage';
import Newpage from './newpage';
import PaymentPage from './PaymentPage';
import ProductDetailPage from './ProductDetailPage';
import Colortest from './colortest'; // Import the Colortest component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import CartPage from './CartPage';
import { CartProvider } from './CartContext';
import ReactDOM from 'react-dom';
import React from 'react';

ReactDOM.render(
  <React.StrictMode>
   <CartProvider>
     <App />
   </CartProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/products/:productSlug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<Login />} />

          {/* Protected Routes (only accessible with valid JWT) */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/nextpage" 
            element={
              <ProtectedRoute>
                <Nextpage />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/newpage" 
            element={
              <ProtectedRoute>
                <Newpage />
              </ProtectedRoute>
            }
          />
          {/* Dynamic Route for Product Details */}
          <Route 
            path="/newpage/:productSlug" 
            element={
              <ProtectedRoute>
                <ProductDetailPage />
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/payment/:productId" 
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          {/* New Route for Colortest */}
          <Route 
            path="/colortest" 
            element={
              <ProtectedRoute>
                <Colortest />
              </ProtectedRoute>
            }
          />
          

        </Routes>
      </Router>
    </div>
  );
}

export default App;
