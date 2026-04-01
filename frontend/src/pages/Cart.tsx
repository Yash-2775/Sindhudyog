import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 h-screen flex flex-col items-center justify-center text-center bg-brand-cream">
        <div className="h-32 w-32 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-premium mb-8"><ShoppingBag size={48} /></div>
        <h2 className="text-4xl font-serif font-bold text-brand-blue mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-12 max-w-sm">Looks like you haven't added any Konkan delicacies yet. Explore our fresh collection!</p>
        <Link to="/shop" className="btn-primary">Browse Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-8 md:mb-12 italic">Shopping Cart ({totalItems})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div 
                key={`${item._id}-${item.weight}`}
                layout
                className="bg-white p-5 md:p-6 rounded-[24px] md:rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-6 md:gap-8"
              >
                <div className="h-24 w-24 md:h-32 md:w-32 bg-brand-cream rounded-2xl overflow-hidden shadow-inner flex shrink-0">
                  <img src={item.image || '/placeholder.png'} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full">
                  <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <h3 className="text-lg md:text-xl font-bold text-brand-blue mb-0.5">{item.name}</h3>
                    <p className="text-xs md:text-sm text-gray-400 font-medium italic mb-2">{item.weight}</p>
                    <p className="text-brand-orange font-bold">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-4 md:gap-8">
                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full p-1 h-10 md:h-12">
                      <button onClick={() => updateQuantity(item._id, item.weight, item.quantity - 1)} className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center hover:bg-white rounded-full transition-all text-lg font-bold">-</button>
                      <span className="w-8 text-center font-bold text-sm md:text-base">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.weight, item.quantity + 1)} className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center hover:bg-white rounded-full transition-all text-lg font-bold">+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id, item.weight)}
                      className="h-10 w-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                      title="Remove Item"
                    >
                      <Trash2 size={18} className="md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-premium sticky top-24 md:top-32">
              <h2 className="text-2xl font-serif font-bold text-brand-blue mb-6 md:mb-8 italic">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 text-sm md:text-base">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm md:text-base">
                  <span>Shipping Estimate</span>
                  <span className="text-brand-green font-bold uppercase text-[10px] md:text-xs">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-gray-600 pt-4 border-t border-gray-100 italic text-sm md:text-base">
                  <span>GST (approx.)</span>
                  <span className="font-bold">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xl md:text-2xl font-bold mb-8 md:mb-10 pt-6 border-t border-gray-100">
                <span className="text-brand-blue">Total</span>
                <span className="text-brand-orange">₹{totalPrice}</span>
              </div>

              <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-3 h-14 md:h-16 text-base md:text-lg">
                Proceed to Checkout <ArrowRight size={20} />
              </Link>

              <div className="mt-8 text-center">
                <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed font-medium italic">Safe & Secure Payments. 100% Satisfaction Guaranteed on all traditional Sindhudurg treasures.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
