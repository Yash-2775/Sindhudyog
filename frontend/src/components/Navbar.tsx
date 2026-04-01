import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Lock, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const isLightPage = location.pathname !== '/';
  const isAdmin = localStorage.getItem('sindhudyog_admin') === 'true';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const getTextColor = () => {
    if (isScrolled) return 'text-brand-blue';
    if (isLightPage) return 'text-brand-blue';
    return 'md:text-white text-brand-blue';
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin');
    } else {
      setIsAdminModalOpen(true);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPass === 'admin123') { // Simple secret key
      localStorage.setItem('sindhudyog_admin', 'true');
      toast.success('Admin access granted', { icon: '🔑' });
      setIsAdminModalOpen(false);
      navigate('/admin');
    } else {
      toast.error('Incorrect access key');
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-100 flex justify-center pointer-events-none pt-4 md:pt-6">
      <nav
        className={`pointer-events-auto transition-all duration-500 ease-in-out flex items-center justify-between gap-4 md:gap-16 
        ${isScrolled
            ? 'bg-white/90 backdrop-blur-2xl shadow-premium rounded-full border border-white/40 px-6 md:px-10 py-3 md:py-4 max-w-[95%] md:max-w-7xl'
            : 'bg-transparent w-full max-w-7xl px-6 md:px-8 py-4 md:py-6'
          }`}
      >
        {/* Logo Section */}
        <div className="flex-1 flex items-center justify-start min-w-[120px] md:min-w-[200px]">
          <Link to="/" className="flex items-center gap-2 md:gap-3 shrink-0 group">
            <div className="h-9 w-9 md:h-12 md:w-12 bg-white rounded-xl md:rounded-2xl shadow-sm flex items-center justify-center p-1 group-hover:scale-105 transition-transform duration-300">
              <img src="/logo.png" alt="Sindhudyog" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`text-base md:text-xl font-serif font-black tracking-tight leading-none ${getTextColor()}`}>
                Sindhudyog
              </span>
              <span className={`text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-60 leading-none mt-1 ${getTextColor()}`}>
                Purely Konkan
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-12 shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 border-b-2 hover:text-brand-orange relative group
              ${location.pathname === link.path
                  ? 'text-brand-orange border-brand-orange'
                  : `${getTextColor()} border-transparent`
                }`}
            >
              {link.name}
              <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-0 h-1 bg-brand-orange transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          ))}
        </div>

        {/* Icons Section */}
        <div className="flex-1 flex items-center justify-end gap-3 md:gap-8 min-w-[120px] md:min-w-[200px]">
          <button className={`hidden sm:block transition-all duration-300 hover:scale-110 active:scale-95 ${getTextColor()}`}>
            <Search size={20} className="md:w-[22px] md:h-[22px]" />
          </button>

          <Link to="/cart" className="relative group hover:scale-110 active:scale-95 transition-all duration-300">
            <div className={`p-2 md:p-2.5 rounded-xl h-10 w-10 md:h-11 md:w-11 flex items-center justify-center relative ${isScrolled ? 'bg-brand-blue/5' : 'bg-white/10'}`}>
              <ShoppingCart size={20} className={`md:w-[22px] md:h-[22px] ${getTextColor()}`} />
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-orange text-white text-[9px] md:text-[10px] font-black h-4 w-4 md:h-5 md:w-5 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Admin Restricted Access Point */}
          <button 
            onClick={handleAdminClick}
            className={`transition-all duration-300 hover:scale-110 active:scale-95 ${getTextColor()} ${isAdmin ? 'text-brand-orange' : ''}`}
          >
            <User size={20} className="md:w-[22px] md:h-[22px]" />
          </button>

          <button
            className={`lg:hidden p-2 rounded-xl transition-all duration-300 ${isScrolled ? 'bg-brand-blue/5 text-brand-blue' : `bg-white/10 ${getTextColor()}`}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {isAdminModalOpen && (
          <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdminModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] md:rounded-[40px] shadow-2xl p-8 md:p-10 max-w-md w-full border border-white mx-4"
            >
              <div className="h-14 w-14 md:h-16 md:w-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange mb-6 md:mb-8">
                 <Lock size={26} className="md:w-[30px] md:h-[30px]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-blue mb-4">Admin Verification</h3>
              <p className="text-gray-500 mb-6 md:mb-8 font-medium text-sm md:text-base">Please enter the master access key to proceed to the management dashboard.</p>
              
              <form onSubmit={handleAdminLogin} className="space-y-4 md:space-y-6">
                <input 
                  type="password"
                  placeholder="Access Key"
                  autoFocus
                  className="w-full h-14 md:h-16 bg-gray-50 rounded-2xl px-6 font-bold text-brand-blue border-2 border-transparent focus:border-brand-orange focus:bg-white outline-none transition-all"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                />
                <button className="btn-primary w-full h-14 md:h-16 flex items-center justify-center gap-3">
                  Verify & Enter <ArrowRight size={20} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Popover */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-90"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="lg:hidden absolute top-[calc(100%+16px)] left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-2xl p-8 z-100 border border-white"
            >
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-2xl font-serif font-black border-b border-gray-100 pb-4 transition-colors ${location.pathname === link.path ? 'text-brand-orange' : 'text-brand-blue'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex items-center justify-between pt-2">
                  <button onClick={handleAdminClick} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Master Panel</button>
                  <div className="flex gap-3">
                    <div className="h-9 w-9 bg-brand-cream rounded-full flex items-center justify-center text-brand-blue"><Search size={18} /></div>
                    <div onClick={handleAdminClick} className="h-9 w-9 bg-brand-cream rounded-full flex items-center justify-center text-brand-blue"><User size={18} /></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
