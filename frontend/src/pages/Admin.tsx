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
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-brand-blue mb-12 leading-tight">Sindhudyog Command Center <span className="text-brand-orange text-lg block font-sans uppercase tracking-[0.3em] font-bold mt-2">Executive Dashboard</span></h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col justify-between h-56 group hover:bg-brand-blue hover:text-white transition-all duration-500">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-blue-200">Total Revenue</h4>
            <div className="space-y-4">
              <p className="text-4xl font-bold italic">₹{orders.reduce((acc, o: any) => acc + o.totalAmount, 0).toLocaleString()}</p>
              <div className="flex items-center gap-2 text-brand-green group-hover:text-white font-bold text-sm"><TrendingUp size={16} /> +12% this month</div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col justify-between h-56 group hover:bg-brand-orange hover:text-white transition-all duration-500">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-orange-100">Total Orders</h4>
            <div className="space-y-4">
              <p className="text-4xl font-bold italic">{orders.length}</p>
              <div className="flex items-center gap-2 text-brand-orange group-hover:text-white font-bold text-sm"><ShoppingBag size={16} /> Processing Now</div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col justify-between h-56 group hover:bg-brand-green hover:text-white transition-all duration-500">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-green-100">Active SKUs</h4>
            <div className="space-y-4">
              <p className="text-4xl font-bold italic">{products.length}</p>
              <div className="flex items-center gap-2 text-brand-green group-hover:text-white font-bold text-sm"><Package size={16} /> Full Inventory</div>
            </div>
          </div>
          <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col justify-between h-56 group hover:bg-brand-dark hover:text-white transition-all duration-500">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-400">Total Customers</h4>
            <div className="space-y-4">
              <p className="text-4xl font-bold italic">3,420+</p>
              <div className="flex items-center gap-2 text-brand-dark group-hover:text-white font-bold text-sm"><Users size={16} /> Verified Users</div>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex gap-10 mb-12 border-b border-gray-100">
          <button onClick={() => setActiveTab('orders')} className={`pb-4 text-sm uppercase tracking-widest font-bold transition-all ${activeTab === 'orders' ? 'text-brand-orange border-b-4 border-brand-orange' : 'text-gray-300 hover:text-brand-blue'}`}>Manage Orders</button>
          <button onClick={() => setActiveTab('products')} className={`pb-4 text-sm uppercase tracking-widest font-bold transition-all ${activeTab === 'products' ? 'text-brand-orange border-b-4 border-brand-orange' : 'text-gray-300 hover:text-brand-blue'}`}>Product Stock</button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'orders' ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              {orders.length > 0 ? orders.map((order: any) => (
                <div key={order._id} className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-premium flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-brand-orange font-bold text-sm uppercase tracking-widest">{order.orderId}</span>
                      <span className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.paymentStatus === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{order.paymentStatus}</span>
                    </div>
                    <div className="space-y-0.5">
                       <h3 className="text-2xl font-serif font-bold text-brand-blue">{order.customer.name}</h3>
                       <div className="flex items-center gap-4 text-gray-400 text-xs font-bold leading-relaxed"><Smartphone size={14} /> {order.customer.phone} | <MapPin size={14} /> {order.customer.pincode}</div>
                    </div>
                    <p className="text-gray-500 font-medium text-sm leading-relaxed line-clamp-1">{order.items.map((i: any) => `${i.name} (${i.quantity})`).join(', ')}</p>
                  </div>

                  <div className="flex items-center gap-10">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-brand-blue italic">₹{order.totalAmount}</p>
                      <p className="text-[10px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <select 
                      value={order.orderStatus} 
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`h-12 px-6 rounded-2xl font-bold text-sm outline-none border transition-all ${order.orderStatus === 'Delivered' ? 'bg-brand-green text-white' : 'bg-brand-cream text-brand-blue hover:border-brand-blue'}`}
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
                <div className="py-24 text-center text-gray-300">No orders received yet. Waiting for market action...</div>
              )}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-brand-blue/5 border-2 border-dashed border-brand-blue/20 rounded-[40px] flex flex-col items-center justify-center p-12 text-brand-blue gap-6 cursor-pointer hover:bg-brand-blue/10 transition-all">
                <Plus size={48} className="animate-pulse" />
                <span className="font-bold uppercase tracking-widest text-sm leading-relaxed">Add Premium Product</span>
              </div>
              {products.map((p: any) => (
                <div key={p._id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-premium group">
                  <div className="h-44 w-full bg-brand-cream/50 rounded-3xl mb-6 overflow-hidden relative">
                    <img src={p.image || '/placeholder.png'} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-all" />
                    <div className="absolute top-4 right-4 flex gap-2 translate-y-20 group-hover:translate-y-0 transition-transform">
                      <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-premium hover:bg-brand-blue hover:text-white transition-all"><Edit2 size={18} /></button>
                      <button className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-premium hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  <div>
                     <span className="text-[10px] font-bold text-brand-orange uppercase tracking-widest">{p.sku}</span>
                     <h4 className="text-xl font-serif font-bold text-brand-blue mb-4 leading-snug line-clamp-1">{p.name}</h4>
                     <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold italic">₹{p.price}</span>
                        <div className="flex items-center gap-2">
                           <span className={`h-2 w-2 rounded-full ${p.stock > 10 ? 'bg-brand-green' : 'bg-brand-orange'}`}></span>
                           <span className="text-xs font-bold text-gray-400">Inventory: {p.stock}</span>
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
