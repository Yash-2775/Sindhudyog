import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Truck, ShieldCheck, MapPin, ChevronRight, Apple } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        if (res.data.variants && res.data.variants.length > 0) {
          setSelectedVariant(res.data.variants[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-2xl font-serif text-brand-blue">Loading Premium Product Details...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center text-2xl font-serif text-brand-blue">Product not found</div>;

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentWeight = selectedVariant ? selectedVariant.weight : product.weight;

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[10px] md:text-sm text-gray-500 mb-8 md:mb-12 overflow-hidden whitespace-nowrap">
          <Link to="/" className="hover:text-brand-blue transition-colors shrink-0">Home</Link>
          <ChevronRight size={12} className="md:w-[14px] md:h-[14px]" />
          <Link to="/shop" className="hover:text-brand-blue transition-colors shrink-0">Shop</Link>
          <ChevronRight size={12} className="md:w-[14px] md:h-[14px]" />
          <span className="text-brand-blue font-bold truncate">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white rounded-[32px] md:rounded-[40px] overflow-hidden shadow-card border border-gray-100 flex items-center justify-center relative p-6 md:p-8">
              {product.isFeatured && <span className="absolute top-4 left-4 md:top-8 md:left-8 badge-featured text-[10px] md:text-xs">Best Seller</span>}
              <motion.img 
                transition={{ duration: 0.5 }}
                src={product.image || '/placeholder.png'} 
                alt={product.name} 
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-4">
              <span className="bg-brand-green/10 text-brand-green text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-blue mb-4 leading-tight italic">{product.name}</h1>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="flex items-center gap-0.5 text-brand-orange">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className="md:w-[18px] md:h-[18px]" fill={i < 4 ? "currentColor" : "none"} />)}
              </div>
              <span className="text-gray-400 text-xs md:text-sm font-medium">4.8 (124 reviews) | 1.2k Sold</span>
            </div>

            <div className="flex items-baseline gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="text-3xl md:text-4xl font-bold text-brand-blue">₹{currentPrice}</span>
              <span className="text-lg md:text-xl text-gray-400 line-through">₹{Math.floor(currentPrice * 1.3)}</span>
              <span className="bg-brand-orange text-white text-[10px] font-bold px-2 py-1 rounded-md">SAVE 30%</span>
            </div>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 md:mb-10 italic">
              {product.description || "Authentic Konkan product, traditionally handcrafted in the Sindhudurg region. 100% natural and made with local ingredients."}
            </p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8 md:mb-10">
                <span className="text-brand-dark font-bold text-[10px] md:text-sm block mb-4 uppercase tracking-wider">Select Size/Weight</span>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all duration-300 border-2 ${
                        selectedVariant?.weight === v.weight 
                        ? 'border-brand-blue bg-brand-blue text-white shadow-premium' 
                        : 'border-gray-100 bg-white text-gray-500 hover:border-brand-blue hover:text-brand-blue'
                      }`}
                    >
                      {v.weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 md:mb-12">
              <div className="flex items-center bg-white border border-gray-100 rounded-full h-14 p-1 shadow-sm shrink-0">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="h-12 w-12 flex items-center justify-center text-brand-blue hover:bg-gray-50 rounded-full transition-all text-2xl"
                > - </button>
                <span className="w-10 text-center text-lg font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => Math.min(99, prev + 1))}
                  className="h-12 w-12 flex items-center justify-center text-brand-blue hover:bg-gray-50 rounded-full transition-all text-2xl"
                > + </button>
              </div>
              <button 
                onClick={() => addToCart({ ...product, price: currentPrice, weight: currentWeight, quantity })}
                className="flex-1 h-14 bg-brand-blue text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-brand-blue/90 hover:shadow-premium transition-all text-base md:text-lg"
              >
                <ShoppingCart size={20} className="md:w-[22px] md:h-[22px]" /> Add to Cart
              </button>
              <button className="h-14 w-14 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-brand-orange hover:border-brand-orange/30 rounded-full bg-white shadow-sm transition-all shrink-0">
                <Heart size={20} className="md:w-[22px] md:h-[22px]" />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 md:pt-10 border-t border-gray-100 italic">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-brand-green shadow-sm"><ShieldCheck size={20} className="md:w-6 md:h-6" /></div>
                <span className="text-[8px] md:text-[10px] uppercase font-bold text-gray-400">100% Homemade</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-brand-blue shadow-sm"><Truck size={20} className="md:w-6 md:h-6" /></div>
                <span className="text-[8px] md:text-[10px] uppercase font-bold text-gray-400">Fresh Stock</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-brand-orange shadow-sm"><MapPin size={20} className="md:w-6 md:h-6" /></div>
                <span className="text-[8px] md:text-[10px] uppercase font-bold text-gray-400">Sindhudurg Origin</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-brand-green shadow-sm"><Apple size={20} className="md:w-6 md:h-6" /></div>
                <span className="text-[8px] md:text-[10px] uppercase font-bold text-gray-400">Authentic Taste</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
