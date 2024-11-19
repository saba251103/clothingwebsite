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

function App() {
  return (
    <div className="App">
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
          
        <Route 
        path="/cart" 
        element={
          <ProtectedRoute>
        <CartPage />
        </ProtectedRoute>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
