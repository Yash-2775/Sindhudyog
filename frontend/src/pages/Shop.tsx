import React, { useState, useEffect } from 'react';
import { Star, ShoppingBag, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialCategory = searchParams.get('category') || 'All';

  // Premium mock data with all products (including Ghee and Sweets/Snacks)
  const mockProducts = [
    { _id: '1', name: 'Alphonso Mango', price: 1200, weight: '1 Dozen', category: 'Mango Products', rating: '4.9', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn2IEa8339TGVOwyOJ9XaSl0866_3Lr9RpgpQPEMyLaX92aBrsdEpmywIMQACtufa-GcY-SqtdGw7cqLb8v9u-WjR4GM1u-jtFS1gcQVSqkquRDEubzqbsNqiFIqrla4r9tI6mds2UsJaS_Qze42ApEAL27nNhoHEvtStc76UZvC6akP2H_jct9RT-t3sPYOQ8xCpR7Bw5j8n35X0eqvibzpEkmnbDEFz_67OlgohkaWiGDz2NvucmgJ4HeHXtkptzUwkSvGFbs4jq' },
    { _id: '2', name: 'Malvani Masala', price: 240, weight: '250G', category: 'Masala', rating: '4.8', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDldtF4MGZc7D-iemMurifsjIhV7mzUcFCI4F1QLKRSXf3wje2L6L3EvqWxjJBZ5FZHaQ-WBgH_vqSPNw_bFSWnEnMNQkdO5KzcWm6IokVoy46hxAT5Xfuq9PvCgWhb-zswuALKT06RNduIsXfTVHyv75bGfhZpFsf_diBQuPBl2ScqYNXcxthEbn1kHITmxokE5-PloV2jToWWGNC7bd3IeLUywW9GztQ2ge2L-vUSKO1yveEShXjmJZ04JvkbFkxwnKWytZEfziLK' },
    { _id: '3', name: 'Red Rice Poha', price: 85, weight: '500G', category: 'Rice & Poha', rating: '4.8', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf4f0xvk1ag9xqCb6gd6DF8iT6UzIFD6mbKl4Z0yEmJ9lGy8cQqfBV2do8wo6G7vSO7HSDUuFUA4fhrGV5vZzI_-M-xPWtm0g0e2aSw6IZDgwSkcyzkXLU1zo_sKMdmS2BWG-43reA7ORCySpKKHoCIw6TxZMDKY2n_toRvle68iaijEfk4z0sx4H7LZqwT5eZhuQhkOkvt7VT6rFtMhlik0QU9EHu5v61axyiaIuaoe6kXr1-R01u4bSTlKmG7qlscwzfAEOL4ZlK' },
    { _id: '4', name: 'Lemon Pickle', price: 180, weight: '500G', category: 'Pickles', rating: '4.7', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSVX5FsuHAkJXFxXt2FgVxJh2KQ8HPGbLjJ_Bit0br8PdcrQpq4bDyUOQEaJPpadeDOwomCkWY5HGV-Fh_V-Vm-M_B894ElmTlLUVE9cAV8I_8eq1kj7AeI7ifY03r6z8iBQL3Jo21oEUeNpOsZxknzVyAF_NIFL5ZZj3-Qf6p6VxzpmGUDIX4eU8gcMqJXomlojvvttZj59SCtgAIoQMy3kSqyv_0eHNZVM57Maloin4PZbYua9puYk75nhGVRPuKHxqv5ETy2NFA' },
    { _id: '7', name: 'Cold Pressed Coconut Oil', price: 450, weight: '1L', category: 'Coconut Products', rating: '4.9', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhqKOLV1r1RsqlUhwG9IngH9SeUh6lwYuhAUkUfe4wL72_usQonF75RvAdov7YcRRsVdkbHkco-hzIiVTxK5ggkT2pH8Ccym0YMPgLFR5I6gH8um4OZdfe7xe4n1s1YA7sJU4xX-uPXkFxu7MvI5IuzgWQiJF_1RpZtiB615yZ0NlPmyQYRtMPUdFHvj9ClREIb6rRpmBV8X0nACKf44nImZ1iBmKKKW_IQ2BWunjcbjewwBkPYEwBbZqJCZWq3yopvlDOHjo7ROU0' },
    { _id: '15', name: 'Gir Cow Ghee', price: 990, weight: '500ml', category: 'Ghee', rating: '5.0', image: 'https://images.unsplash.com/photo-1549467794-44e23cf634db?auto=format&fit=crop&q=80' },
    { _id: '16', name: 'Malvani Khaja', price: 85, weight: '200g', category: 'Sweets & Snacks', rating: '4.8', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Zn5kwB9wLZmr6X6R_ALp7kCuaRzVK7tOpVH1hDUVXtGS9x5EaKMgaTrGX4x_iw3wgNZ7cT_usj0g0x2d10_zjXGCX94sUUor_BZjpRlX34CZkwOQ-rpqEM0drwILl0IZ7Fp7WS6GORXz16r633kIyGVeJXbII2PZSDQdFKtLL8NlXTJUzu7-iMRJDban-GhqB6-tyD2bU4pkqgkwgQU2I9onWtrRVQcDoIbZNmKGFlNRZZrA4PLLFMdwWEqO8P9kj5mVh-X7RT9r' },
    { _id: '17', name: 'Shengdana Ladu', price: 85, weight: '250g', category: 'Sweets & Snacks', rating: '4.8', image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?auto=format&fit=crop&q=80' },
    { _id: '18', name: 'Special Shev Chivda', price: 95, weight: '250g', category: 'Sweets & Snacks', rating: '4.7', image: 'https://images.unsplash.com/photo-1601050690597-df056fb04791?auto=format&fit=crop&q=80' },
    { _id: '8', name: 'Modak Pith (Rice Flour)', price: 70, weight: '500G', category: 'Rice & Poha', rating: '4.8', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzs5d0_KXfwdz2_qtfwzFirYeoP-WMuNuUcbxyTFVRqLL5a2pmff7Qj4Ru15Baecc6YH1LwqqsMGVvZxuHspDmclWzAqNRfqbXx2tFbp5NEZoief8SjnlXHx8RjdLHrR15dU3CMC8pQHucUKh2B5BN2D47nXyuV-2lGnG5liY3pqdlD1JtrgIej2fC_NW7Up_BjUXc7PCkDy6I0Js9Jwglb0gBk9uZzM5Q3IRNn2pL3HB88vhIEUa9A6slPEM15aDHvP9YhZNep1Y5' },
    { _id: '9', name: 'Premium Salted Kaju', price: 680, weight: '500G', category: 'Cashew', rating: '4.9', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9SC9MWASsObqzCiEp3Sl8Id7iZiQ9pbpXdZ2rsljRrl31RXzJwHmon4iS_KzPH029VGaLBrmsgVxxfuPf88r0mJQH-Kulc3W9_iCcMgg4oeWq06ACQLCj5a5VttKwVKIPpxS9R0ihEkX-ev-E-cmMaWNuaw7JNkxxPjD_ePP9QhQ-o0-68gxEG3ImcJGHQ1-8TQcWTiqwSqLWrK-9owMcYR2p3QQvfW3OTTfTw5N8m4j-vbxhwhR_dzh01UEYP-OjH0nWE0s5qzuq' },
  ];

  const [products, setProducts] = useState<any[]>(mockProducts); 
  const [filteredProducts, setFilteredProducts] = useState<any[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isLoading, setIsLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        if (res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      } catch (err) {
        console.warn('Backend not running, using extended mock gallery.');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;
    if (searchTerm) {
      result = result.filter((p: any) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategory !== 'All') {
      result = result.filter((p: any) => p.category === selectedCategory);
    }
    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, products]);

  const categories = ['All', 'Mango Products', 'Masala', 'Pickles', 'Coconut Products', 'Rice & Poha', 'Sweets & Snacks', 'Ghee'];

  const handleQuickOrder = (product: any) => {
    addToCart({ ...product, quantity: 1, _id: product._id });
    navigate('/checkout');
  };

  return (
    <div className="pt-20 bg-brand-cream min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-40 -left-20 w-96 h-96 bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        
        {/* Hero Title */}
        <header className="py-16 md:py-24 text-center max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-6 text-brand-dark"
          >
            The Konkan Gallery
          </motion.h1>
          <p className="text-lg font-sans text-on-surface-variant max-w-lg mx-auto leading-relaxed">
            Discover the authentic flavors of Sindhudurg, curated for the modern connoisseur of heritage and health.
          </p>
        </header>

        {/* Filter Bar */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center gap-3 py-2 scrollbar-hide overflow-x-auto lg:overflow-visible">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 shadow-sm
                  ${selectedCategory === cat 
                    ? 'bg-primary text-white shadow-lg scale-105' 
                    : 'bg-white hover:bg-surface-container-high text-brand-dark'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20 pb-32">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product: any) => (
              <motion.div 
                key={product._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-4/5 bg-white rounded-2xl overflow-hidden mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:translate-y-[-8px] border border-gray-100">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    src={product.image} 
                    alt={product.name} 
                  />
                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-brand-dark/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                     <button 
                        onClick={(e) => { e.preventDefault(); addToCart({ ...product, quantity: 1, _id: product._id }); }}
                        className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-primary shadow-xl hover:bg-primary hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                        title="Add to Bag"
                      >
                        <ShoppingBag size={20} />
                      </button>
                      <button 
                        onClick={(e) => { e.preventDefault(); handleQuickOrder(product); }}
                        className="px-6 h-12 bg-primary text-white rounded-full font-bold text-sm shadow-xl hover:bg-brand-dark transition-all transform translate-y-4 group-hover:translate-y-0"
                      >
                        Order Now
                      </button>
                  </div>
                </div>

                <div className="flex justify-between items-start mb-2 px-1">
                  <h3 className="text-2xl font-serif text-brand-dark leading-tight group-hover:text-primary transition-colors">
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </h3>
                  <div className="flex items-center gap-1.5 pt-1.5">
                    <Star className="text-primary" size={14} fill="currentColor" />
                    <span className="text-[13px] font-bold font-sans text-brand-dark">{product.rating}</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline mt-auto px-1">
                  <p className="text-2xl font-bold font-sans text-primary">₹{product.price}</p>
                  <span className="text-[11px] tracking-[0.2em] font-black text-secondary uppercase font-sans">
                    {product.weight}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
};

export default Shop;
