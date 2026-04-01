import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

const SiteFooter: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-24 pb-12 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-8 group">
              <img src="/logo.png" alt="Sindhudyog" className="h-12 w-auto brightness-200" />
              <span className="font-serif text-2xl font-bold tracking-tight">Sindhudyog</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-8 italic">
              "Exploring Kokan flavours with our curated food products." We bring authentic, homemade tradition from Sindhudurg to your doorstep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-orange transition-all duration-300"><Instagram size={20} /></a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-blue transition-all duration-300"><Facebook size={20} /></a>
              <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-blue/50 transition-all duration-300"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1 pt-4">
            <h4 className="text-lg font-serif font-bold mb-8 flex items-center gap-3">Marketplace <span className="h-0.5 w-8 bg-brand-orange rounded-full" /></h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link to="/shop" className="hover:text-brand-orange transition-colors">Mango Selection</Link></li>
              <li><Link to="/shop" className="hover:text-brand-orange transition-colors">Premium Masalas</Link></li>
              <li><Link to="/shop" className="hover:text-brand-orange transition-colors">Konkan Pickles</Link></li>
              <li><Link to="/shop" className="hover:text-brand-orange transition-colors">Rice & Flours</Link></li>
              <li><Link to="/shop" className="hover:text-brand-orange transition-colors">Sweets & Snacks</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1 md:col-span-1 pt-4">
            <h4 className="text-lg font-serif font-bold mb-8 flex items-center gap-3">The Brand <span className="h-0.5 w-8 bg-brand-green rounded-full" /></h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><Link to="/about" className="hover:text-brand-orange transition-colors">Our Legacy</Link></li>
              <li><Link to="/contact" className="hover:text-brand-orange transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-orange transition-colors">Terms of Service</Link></li>
              <li><Link to="/shipping" className="hover:text-brand-orange transition-colors">Shipping & Returns</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 md:col-span-1 pt-4">
            <h4 className="text-lg font-serif font-bold mb-8 flex items-center gap-3">Visit Us <span className="h-0.5 w-8 bg-white/20 rounded-full" /></h4>
            <ul className="space-y-6 text-gray-400">
              <li className="flex gap-4">
                <MapPin className="text-brand-orange shrink-0" />
                <span className="text-sm">Shop no 1, Tulsi Corner, plot no 87/88 A, Sector 21, Kamothe, Panvel, Maharashtra 410209</span>
              </li>
              <li className="flex gap-4">
                <Phone className="text-brand-green shrink-0" />
                <span className="text-sm font-bold">+91 77109 03709</span>
              </li>
              <li className="flex gap-4">
                <Mail className="text-brand-orange shrink-0" />
                <span className="text-sm">hello@sindhudyog.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-xs text-gray-500 uppercase tracking-widest font-bold">
          <p>© {new Date().getFullYear()} Sindhudyog. Authenticity Certified.</p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-brand-green" /> <span>Secure SSL Encrypted Checkout</span></div>
            <div className="flex items-center gap-2"><Heart size={16} className="text-brand-orange" /> <span>Made with love in Konkan</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
