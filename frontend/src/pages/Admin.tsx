import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, ShoppingBag, Plus, Trash2, Edit2, TrendingUp, Users, MapPin, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products'>('orders');
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/orders'),
          axios.get('http://localhost:5000/api/products')
        ]);
        setOrders(ordersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}/status`, { orderStatus: status });
      setOrders((prev: any) => prev.map((o: any) => o._id === id ? { ...o, orderStatus: status } : o));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center text-brand-blue font-serif text-2xl italic">Syncing Premium Data...</div>;

  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-8 md:mb-12 leading-tight italic">Sindhudyog Command Center <span className="text-brand-orange text-sm md:text-lg block font-sans uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold mt-2">Executive Dashboard</span></h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 italic">
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col justify-between h-48 md:h-56 group hover:bg-brand-blue hover:text-white transition-all duration-500">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-blue-200">Total Revenue</h4>
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-bold italic">₹{orders.reduce((acc, o: any) => acc + o.totalAmount, 0).toLocaleString()}</p>
              <div className="flex items-center gap-2 text-brand-green group-hover:text-white font-bold text-[10px] md:text-sm"><TrendingUp size={16} /> +12% this month</div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col justify-between h-48 md:h-56 group hover:bg-brand-orange hover:text-white transition-all duration-500">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-orange-100">Total Orders</h4>
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-bold italic">{orders.length}</p>
              <div className="flex items-center gap-2 text-brand-orange group-hover:text-white font-bold text-[10px] md:text-sm"><ShoppingBag size={16} /> Processing Now</div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col justify-between h-48 md:h-56 group hover:bg-brand-green hover:text-white transition-all duration-500">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-green-100">Active SKUs</h4>
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-bold italic">{products.length}</p>
              <div className="flex items-center gap-2 text-brand-green group-hover:text-white font-bold text-[10px] md:text-sm"><Package size={16} /> Full Inventory</div>
            </div>
          </div>
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col justify-between h-48 md:h-56 group hover:bg-brand-dark hover:text-white transition-all duration-500">
            <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-400">Total Customers</h4>
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-bold italic">3,420+</p>
              <div className="flex items-center gap-2 text-brand-dark group-hover:text-white font-bold text-[10px] md:text-sm"><Users size={16} /> Verified Users</div>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-8 md:gap-10 mb-10 md:mb-12 border-b border-gray-100 overflow-x-auto scrollbar-hide shrink-0">
          <button onClick={() => setActiveTab('orders')} className={`pb-4 text-[10px] md:text-xs uppercase tracking-widest font-black transition-all whitespace-nowrap ${activeTab === 'orders' ? 'text-brand-orange border-b-4 border-brand-orange' : 'text-gray-300 hover:text-brand-blue'}`}>Manage Orders</button>
          <button onClick={() => setActiveTab('products')} className={`pb-4 text-[10px] md:text-xs uppercase tracking-widest font-black transition-all whitespace-nowrap ${activeTab === 'products' ? 'text-brand-orange border-b-4 border-brand-orange' : 'text-gray-300 hover:text-brand-blue'}`}>Product Stock</button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6 md:space-y-8">
              {orders.length > 0 ? orders.map((order: any) => (
                <div key={order._id} className="bg-white p-6 md:p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 md:gap-8 italic">
                  <div className="space-y-3 md:space-y-4 w-full">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-brand-orange font-bold text-[10px] md:text-sm uppercase tracking-widest">{order.orderId}</span>
                      <span className={`px-4 py-1 rounded-full text-[8px] md:text-[10px] font-bold uppercase tracking-widest ${order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{order.paymentStatus}</span>
                    </div>
                    <div className="space-y-1">
                       <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-blue italic">{order.customer.name}</h3>
                       <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-400 text-[10px] md:text-xs font-bold leading-relaxed"><span className="flex items-center gap-1.5 shrink-0"><Smartphone size={14} /> {order.customer.phone}</span> <span className="flex items-center gap-1.5 shrink-0"><MapPin size={14} /> {order.customer.pincode}</span></div>
                    </div>
                    <p className="text-gray-500 font-medium text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-1 italic">{order.items.map((i: any) => `${i.name} (${i.quantity})`).join(', ')}</p>
                  </div>

                  <div className="flex flex-row sm:flex-row lg:flex-row items-center justify-between lg:justify-end gap-6 md:gap-10 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                    <div className="text-left lg:text-right">
                      <p className="text-xl md:text-2xl font-bold text-brand-blue italic">₹{order.totalAmount}</p>
                      <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <select 
                      value={order.orderStatus} 
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`h-10 md:h-12 px-4 md:px-6 rounded-xl md:rounded-2xl font-bold text-[10px] md:text-sm outline-none border transition-all ${order.orderStatus === 'Delivered' ? 'bg-brand-green text-white' : 'bg-brand-cream text-brand-blue hover:border-brand-blue'}`}
                    >
                      <option value="Placed">Placed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              )) : (
                <div className="py-20 md:py-24 text-center text-gray-300 italic font-medium">No orders received yet. Waiting for market action...</div>
              )}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 italic">
              <div className="bg-brand-blue/5 border-2 border-dashed border-brand-blue/20 rounded-[32px] md:rounded-[40px] flex flex-col items-center justify-center p-10 md:p-12 text-brand-blue gap-4 md:gap-6 cursor-pointer hover:bg-brand-blue/10 transition-all group">
                <Plus size={40} className="animate-pulse group-hover:scale-110 transition-transform" />
                <span className="font-bold uppercase tracking-widest text-[10px] md:text-xs leading-relaxed italic">Add Premium Product</span>
              </div>
              {products.map((p: any) => (
                <div key={p._id} className="bg-white p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-gray-100 shadow-premium group italic">
                  <div className="h-36 md:h-44 w-full bg-brand-cream/50 rounded-2xl md:rounded-3xl mb-4 md:mb-6 overflow-hidden relative">
                    <img src={p.image || '/placeholder.png'} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-2 md:translate-y-20 group-hover:translate-y-0 transition-transform duration-300">
                      <button className="h-9 w-9 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-premium hover:bg-brand-blue hover:text-white transition-all"><Edit2 size={16} /></button>
                      <button className="h-9 w-9 md:h-10 md:w-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-premium hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16} /></button>
                    </div>
                  </div>
                  <div>
                     <span className="text-[8px] md:text-[10px] font-bold text-brand-orange uppercase tracking-widest italic">{p.sku}</span>
                     <h4 className="text-lg md:text-xl font-serif font-bold text-brand-blue mb-4 leading-snug line-clamp-1 italic">{p.name}</h4>
                     <div className="flex justify-between items-center">
                        <span className="text-xl md:text-2xl font-bold italic">₹{p.price}</span>
                        <div className="flex items-center gap-2">
                           <span className={`h-1.5 w-1.5 md:h-2 md:w-2 rounded-full ${p.stock > 10 ? 'bg-brand-green' : 'bg-brand-orange'}`}></span>
                           <span className="text-[10px] md:text-xs font-bold text-gray-400">Inventory: {p.stock}</span>
                        </div>
                     </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;
