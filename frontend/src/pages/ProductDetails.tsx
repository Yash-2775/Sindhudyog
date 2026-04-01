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
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-12 overflow-hidden whitespace-nowrap">
          <Link to="/" className="hover:text-brand-blue transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop" className="hover:text-brand-blue transition-colors">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-brand-blue font-bold truncate">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white rounded-[40px] overflow-hidden shadow-card border border-gray-100 flex items-center justify-center relative p-8">
              {product.isFeatured && <span className="absolute top-8 left-8 badge-featured">Best Seller</span>}
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
              <span className="bg-brand-green/10 text-brand-green text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">{product.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-blue mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center gap-1 text-brand-orange">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />)}
              </div>
              <span className="text-gray-400 text-sm font-medium">4.8 (124 reviews) | 1.2k Sold</span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-brand-blue">₹{currentPrice}</span>
              <span className="text-xl text-gray-400 line-through">₹{Math.floor(currentPrice * 1.3)}</span>
              <span className="bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded-md">SAVE 30%</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-10 italic">
              {product.description || "Authentic Konkan product, traditionally handcrafted in the Sindhudurg region. 100% natural and made with local ingredients."}
            </p>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-10">
                <span className="text-brand-dark font-bold text-sm block mb-4 uppercase tracking-wider">Select Size/Weight</span>
                <div className="flex flex-wrap gap-4">
                  {product.variants.map((v: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 border-2 ${
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
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center bg-white border border-gray-100 rounded-full h-14 p-1 shadow-sm shrink-0">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  className="h-12 w-12 flex items-center justify-center text-brand-blue hover:bg-gray-50 rounded-full transition-all"
                > - </button>
                <span className="w-12 text-center text-lg font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => Math.min(99, prev + 1))}
                  className="h-12 w-12 flex items-center justify-center text-brand-blue hover:bg-gray-50 rounded-full transition-all"
                > + </button>
              </div>
              <button 
                onClick={() => addToCart({ ...product, price: currentPrice, weight: currentWeight, quantity })}
                className="flex-1 h-14 bg-brand-blue text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-brand-blue/90 hover:shadow-premium transition-all"
              >
                <ShoppingCart size={22} /> Add to Cart
              </button>
              <button className="h-14 w-14 flex items-center justify-center border border-gray-100 text-gray-400 hover:text-brand-orange hover:border-brand-orange/30 rounded-full bg-white shadow-sm transition-all shrink-0">
                <Heart size={22} />
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-gray-100 italic">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-sm"><ShieldCheck /></div>
                <span className="text-[10px] uppercase font-bold text-gray-400">100% Homemade</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-brand-blue shadow-sm"><Truck /></div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Fresh Stock</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-sm"><MapPin /></div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Sindhudurg Origin</span>
              </div>
              <div className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-brand-green shadow-sm"><Apple /></div>
                <span className="text-[10px] uppercase font-bold text-gray-400">Authentic Taste</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
