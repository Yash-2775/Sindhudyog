import React from 'react';
import { motion } from 'framer-motion';

interface PolicyProps {
  title: string;
  content: string[];
}

const PolicyPage: React.FC<PolicyProps> = ({ title, content }) => {
  return (
    <div className="pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 md:p-20 rounded-[40px] shadow-premium border border-gray-100"
        >
          <span className="bg-brand-blue/10 text-brand-blue text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6 block">Sindhudyog Official Policy</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-blue mb-12 leading-tight italic">{title}</h1>
          
          <div className="space-y-10 text-gray-600 leading-relaxed text-lg font-medium italic">
            {content.map((p, idx) => (
              <p key={idx} className="border-l-2 border-brand-orange/20 pl-8 transition-colors hover:border-brand-orange cursor-default">{p}</p>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-gray-100 flex items-center gap-4">
             <div className="h-2 w-12 bg-brand-orange rounded-full" />
             <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed italic">Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyPage;
