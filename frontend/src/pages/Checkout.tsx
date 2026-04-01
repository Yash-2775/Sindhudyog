import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ChevronRight, MapPin, Truck, Smartphone, Wallet, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    paymentMethod: 'COD'
  });
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  useEffect(() => {
    if (cart.length === 0 && !orderConfirmed) {
      navigate('/shop');
    }
  }, [cart, navigate, orderConfirmed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);

    try {
      const res = await axios.post('http://localhost:5000/api/orders', {
        items: cart.map(i => ({ productId: i._id, name: i.name, quantity: i.quantity, price: i.price, weight: i.weight })),
        totalAmount: totalPrice,
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod
      });

      if (res.status === 201) {
        toast.success('Order Placed Successfully!');
        setOrderConfirmed(true);
        clearCart();
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsOrdering(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="pt-32 pb-24 h-screen flex flex-col items-center justify-center text-center bg-brand-cream animate-in fade-in zoom-in duration-500">
        <div className="h-40 w-40 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green shadow-premium mb-8"><CheckCircle2 size={64} /></div>
        <h2 className="text-5xl font-serif font-bold text-brand-blue mb-4 leading-tight">Order Confirmed!</h2>
        <p className="text-gray-500 mb-12 max-w-sm text-lg leading-relaxed">Thank you for your trust in Sindhudyog. Your authentic Konkan treats will reach you soon.</p>
        <div className="flex gap-4">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/about" className="btn-outline">Track Order</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-8 md:mb-12 italic">Secure Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          {/* Shipping Details */}
          <div className="space-y-8 md:space-y-10">
            <section className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="h-10 w-10 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue"><MapPin size={20} /></div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-blue italic">Shipping Address</h2>
              </div>
              
              <div className="space-y-5 md:space-y-6">
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
                  <input required type="text" placeholder="Jayesh More" className="w-full px-5 md:px-6 py-3.5 md:py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all text-sm md:text-base font-medium" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Phone Number</label>
                  <input required type="tel" placeholder="98XXXXXXXX" className="w-full px-5 md:px-6 py-3.5 md:py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all text-sm md:text-base font-medium" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Full Address</label>
                  <textarea required rows={3} placeholder="Flat No, Building Name, Landmark, Area" className="w-full px-5 md:px-6 py-3.5 md:py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all text-sm md:text-base font-medium resize-none" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Pincode</label>
                  <input required type="text" placeholder="400XXX" className="w-full px-5 md:px-6 py-3.5 md:py-4 rounded-xl border border-gray-100 bg-gray-50 focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 outline-none transition-all text-sm md:text-base font-medium" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} />
                </div>
              </div>
            </section>

            <section className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="h-10 w-10 bg-brand-orange/10 rounded-xl flex items-center justify-center text-brand-orange"><Wallet size={20} /></div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-blue italic">Payment Method</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, paymentMethod: 'COD'})}
                  className={`p-5 md:p-6 rounded-2xl border-2 flex flex-col items-center gap-3 md:gap-4 transition-all duration-300 ${formData.paymentMethod === 'COD' ? 'border-brand-orange bg-brand-orange/5 text-brand-orange shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <Truck size={28} className="md:w-8 md:h-8" />
                  <span className="font-bold text-sm md:text-base">Cash On Delivery</span>
                </button>
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, paymentMethod: 'UPI'})}
                  className={`p-5 md:p-6 rounded-2xl border-2 flex flex-col items-center gap-3 md:gap-4 transition-all duration-300 ${formData.paymentMethod === 'UPI' ? 'border-brand-blue bg-brand-blue/5 text-brand-blue shadow-md' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <Smartphone size={28} className="md:w-8 md:h-8" />
                  <span className="font-bold text-sm md:text-base">UPI / Web Payment</span>
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Order Review */}
          <div className="space-y-8 md:space-y-10">
            <div className="bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-premium">
              <div className="flex items-center gap-4 mb-6 md:mb-8">
                <div className="h-10 w-10 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green"><ShoppingBag size={20} /></div>
                <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-blue italic">Order Review</h2>
              </div>

              <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 scrollbar-hide italic">
                {cart.map(item => (
                  <div key={item._id} className="flex justify-between items-start text-xs md:text-sm border-b border-gray-50 pb-4">
                    <div className="pr-4">
                      <h4 className="font-bold text-brand-dark leading-snug">{item.name} <span className="text-gray-400 font-normal">x {item.quantity}</span></h4>
                      <p className="text-[10px] md:text-xs text-brand-green font-medium">({item.weight})</p>
                    </div>
                    <span className="font-bold whitespace-nowrap">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 md:mb-10 border-t border-gray-100 pt-6 md:pt-8">
                <div className="flex justify-between text-gray-500 font-medium text-sm md:text-base">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-brand-green font-bold text-[10px] md:text-xs bg-brand-green/5 p-3 rounded-xl italic">
                  <span>Delivery Charge</span>
                  <span>FREE SHIPPING</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px] md:text-xs">Final Total</span>
                  <span className="text-3xl md:text-4xl font-bold text-brand-blue">₹{totalPrice}</span>
                </div>
              </div>

              <button 
                disabled={isOrdering}
                type="submit" 
                className={`w-full h-14 md:h-16 rounded-full font-bold text-base md:text-lg flex items-center justify-center gap-3 md:gap-4 transition-all duration-500 ${isOrdering ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-brand-blue text-white hover:bg-brand-blue/90 hover:shadow-premium'}`}
              >
                {isOrdering ? 'Processing Order...' : `Place ${formData.paymentMethod === 'UPI' ? 'Order & Pay' : 'Order Now'}`}
                <ChevronRight size={20} className={`${isOrdering ? 'hidden' : 'inline'}`} />
              </button>

              <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-center gap-6 text-gray-300">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck size={20} className="md:w-6 md:h-6" />
                  <span className="text-[8px] md:text-[10px] uppercase font-bold">100% Safe</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Smartphone size={20} className="md:w-6 md:h-6" />
                  <span className="text-[8px] md:text-[10px] uppercase font-bold">Encrypted</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck size={20} className="md:w-6 md:h-6" />
                  <span className="text-[8px] md:text-[10px] uppercase font-bold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
