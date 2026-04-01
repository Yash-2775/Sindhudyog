import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import PolicyPage from './pages/PolicyPage';
import SiteFooter from './components/SiteFooter';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import AdminGuard from './components/AdminGuard';

function App() {
  const privacyPolicy = ["Sindhudyog respects your privacy and is committed to protecting your personal data.", "We use your data only to process orders and improve our service.", "Your payment data is processed securely through Razorpay."];
  const refundPolicy = ["Returns are accepted within 7 days of delivery for non-perishable items.", "For perishable food items, refunds are only provided if the product is damaged or stale upon arrival.", "Proof of damage (photos) is required for processing refunds."];
  const shippingPolicy = ["Orders are shipped within 2-4 business days directly from Sindhudurg.", "Free shipping on orders above ₹1,500.", "Standard delivery takes 5-7 business days depending on location."];

  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Toaster position="bottom-right" reverseOrder={false} />
          <ScrollToTop />
          <Navbar />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/admin" 
                element={
                  <AdminGuard>
                    <Admin />
                  </AdminGuard>
                } 
              />
              <Route path="/privacy" element={<PolicyPage title="Privacy Policy" content={privacyPolicy} />} />
              <Route path="/refund" element={<PolicyPage title="Refund Policy" content={refundPolicy} />} />
              <Route path="/shipping" element={<PolicyPage title="Shipping Policy" content={shippingPolicy} />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
