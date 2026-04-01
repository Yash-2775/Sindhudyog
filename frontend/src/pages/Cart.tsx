import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
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
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-brand-blue mb-12">Shopping Cart ({totalItems})</h1>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div 
                key={`${item._id}-${item.weight}`}
                layout
                className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-8"
              >
                <div className="h-32 w-32 bg-brand-cream rounded-2xl overflow-hidden shadow-inner flex shrink-0">
                  <img src={item.image || '/placeholder.png'} alt={item.name} className="w-full h-full object-contain p-2" />
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row items-center justify-between w-full">
                  <div className="text-center sm:text-left mb-6 sm:mb-0">
                    <h3 className="text-xl font-bold text-brand-blue mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-500 font-medium italic mb-2">{item.weight}</p>
                    <p className="text-brand-orange font-bold">₹{item.price}</p>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="flex items-center bg-gray-50 border border-gray-100 rounded-full p-1 h-12">
                      <button onClick={() => updateQuantity(item._id, item.weight, item.quantity - 1)} className="h-10 w-10 flex items-center justify-center hover:bg-white rounded-full transition-all">-</button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.weight, item.quantity + 1)} className="h-10 w-10 flex items-center justify-center hover:bg-white rounded-full transition-all">+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item._id, item.weight)}
                      className="h-10 w-10 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-300"
                      title="Remove Item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-premium sticky top-32">
              <h2 className="text-2xl font-serif font-bold text-brand-blue mb-8">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Estimate</span>
                  <span className="text-brand-green font-bold uppercase text-xs">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-gray-600 pt-4 border-t border-gray-100 italic">
                  <span>GST (approx.)</span>
                  <span className="font-bold">Included</span>
                </div>
              </div>

              <div className="flex justify-between items-center text-2xl font-bold mb-10 pt-6 border-t border-gray-100">
                <span className="text-brand-blue">Total</span>
                <span className="text-brand-orange">₹{totalPrice}</span>
              </div>

              <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-3 h-14 text-lg">
                Proceed to Checkout <ArrowRight size={20} />
              </Link>

              <div className="mt-8 text-center">
                <p className="text-xs text-gray-400 leading-relaxed font-medium">Safe & Secure Payments with Razorpay. 100% Satisfaction Guaranteed on all Sindhudurg authentic products.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
