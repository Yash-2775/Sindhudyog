import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, CheckCircle2 } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success('Message sent! Our heritage specialists will contact you shortly.', {
      duration: 5000,
      icon: '🌿',
      style: {
        borderRadius: '24px',
        background: '#154212',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '14px'
      }
    });
  };

  const contactOptions = [
    { icon: <Phone size={24} />, title: "Call Us", details: ["+91 77109 03709", "+91 913XXXXXXXX"], color: "text-brand-orange" },
    { icon: <Mail size={24} />, title: "Email Our Experts", details: ["hello@sindhudyog.com", "support@sindhudyog.com"], color: "text-brand-green" },
    { icon: <MapPin size={24} />, title: "Visit Our Farm Store", details: ["Shop no 1, Sector 21, Kamothe, Panvel", "Sindhudurg, Maharashtra"], color: "text-brand-blue" }
  ];

  return (
    <div className="pt-32 bg-brand-cream min-h-screen relative overflow-hidden pb-32">
      <Toaster position="bottom-right" />
      
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif font-bold text-brand-blue mb-8 leading-tight"
          >
            Connect <br />
            <span className="text-brand-orange italic">With Us.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto"
          >
            Have questions about our traditional recipes or need bulk heritage gifting? Our team is always here to share the stories of Konkan.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-32">
          {contactOptions.map((opt, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-white rounded-[40px] shadow-sm hover:shadow-premium transition-all duration-500 border border-gray-100 group"
            >
              <div className={`h-16 w-16 rounded-2xl bg-gray-50 flex items-center justify-center ${opt.color} mb-8 group-hover:scale-110 transition-transform`}>
                 {opt.icon}
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-dark mb-4">{opt.title}</h3>
              {opt.details.map((detail, i) => (
                <p key={i} className="text-gray-500 font-medium mb-1">{detail}</p>
              ))}
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-12 rounded-[60px] shadow-premium border border-gray-100"
          >
            {!isSubmitted ? (
               <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark pl-2">Your Name</label>
                       <input 
                         required
                         type="text" 
                         className="w-full h-16 bg-gray-50 rounded-[20px] px-8 font-bold text-brand-dark focus:ring-4 focus:ring-brand-blue/5 focus:bg-white border-transparent focus:border-brand-blue transition-all outline-none"
                         placeholder="Enter full name"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark pl-2">Email Address</label>
                       <input 
                         required
                         type="email" 
                         className="w-full h-16 bg-gray-50 rounded-[20px] px-8 font-bold text-brand-dark focus:ring-4 focus:ring-brand-blue/5 focus:bg-white border-transparent focus:border-brand-blue transition-all outline-none"
                         placeholder="your@email.com"
                         value={formData.email}
                         onChange={(e) => setFormData({...formData, email: e.target.value})}
                       />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark pl-2">Inquiry Type</label>
                    <input 
                      required
                      type="text" 
                      className="w-full h-16 bg-gray-50 rounded-[20px] px-8 font-bold text-brand-dark focus:ring-4 focus:ring-brand-blue/5 focus:bg-white border-transparent focus:border-brand-blue transition-all outline-none"
                      placeholder="e.g. Bulk Order, Partnership, Product Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-dark pl-2">Message</label>
                    <textarea 
                      required
                      className="w-full h-48 bg-gray-50 rounded-[32px] p-8 font-bold text-brand-dark focus:ring-4 focus:ring-brand-blue/5 focus:bg-white border-transparent focus:border-brand-blue transition-all outline-none resize-none"
                      placeholder="Share your thoughts or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                    />
                 </div>
                 <button className="btn-primary w-full h-20 text-xl flex items-center justify-center gap-4 hover:bg-brand-dark">
                    Send Inquiry <Send size={24} />
                 </button>
               </form>
            ) : (
               <div className="py-20 text-center">
                  <div className="h-24 w-24 bg-brand-green/10 text-brand-green border-4 border-white shadow-xl rounded-full flex items-center justify-center mx-auto mb-10">
                     <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-4xl font-serif font-bold text-brand-blue mb-4">Message Transmitted.</h3>
                  <p className="text-gray-500 text-lg mb-12">We've received your inquiry and our team is already on it. Look out for an email from us shortly.</p>
                  <button onClick={() => setIsSubmitted(false)} className="text-brand-orange font-bold uppercase tracking-widest text-sm hover:underline underline-offset-8">Send another message</button>
               </div>
            )}
          </motion.div>

          <div className="space-y-12">
            <div>
              <h4 className="text-4xl font-serif font-bold text-brand-blue mb-8">Follow Our Journey</h4>
              <p className="text-gray-500 text-lg leading-relaxed mb-10 italic">
                Get behind-the-scenes glimpses into the harvests of Sindhudurg and discover new heritage flavors as they arrive.
              </p>
              <div className="flex gap-6">
                <a href="#" className="h-16 w-16 rounded-2xl bg-white shadow-premium flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-all"><Instagram size={28} /></a>
                <a href="#" className="h-16 w-16 rounded-2xl bg-white shadow-premium flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all"><Facebook size={28} /></a>
                <a href="#" className="h-16 w-16 rounded-2xl bg-white shadow-premium flex items-center justify-center text-brand-blue hover:bg-brand-blue hover:text-white transition-all"><Twitter size={28} /></a>
              </div>
            </div>
            
            <div className="bg-brand-orange/5 p-12 rounded-[50px] border border-brand-orange/10 relative overflow-hidden group">
               <div className="absolute top-0 right-0 h-24 w-24 bg-brand-orange/10 rounded-bl-[100px] transition-all group-hover:h-32 group-hover:w-32" />
               <h5 className="text-xl font-bold text-brand-orange mb-4">Urgent Inquiries?</h5>
               <p className="text-sm text-gray-600 leading-relaxed mb-8 font-medium">For immediate customer support regarding existing orders, please reach out via WhatsApp at +91 77109 03709.</p>
               <div className="h-12 w-full bg-brand-blue rounded-2xl flex items-center justify-center text-white font-bold tracking-widest uppercase text-xs">Customer Response Desk</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
