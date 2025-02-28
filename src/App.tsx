import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import FavoritesList from './pages/FavoritesList';
import AboutUs from './pages/AboutUs';
import Home from './pages/Home';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';

const MainContent = () => {
  return (
    <Box 
      component="main" 
      sx={{ 
        flexGrow: 1,
        position: 'relative',
        zIndex: 1,
        '& > *:not(:first-child)': {
          paddingTop: { xs: '56px', sm: '64px' }
        }
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inicio" element={<Home />} />
        <Route path="/productos" element={<ProductList />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/favoritos" element={<FavoritesList />} />
        <Route path="/nosotros" element={<AboutUs />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <MainContent />
        <Home/>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
