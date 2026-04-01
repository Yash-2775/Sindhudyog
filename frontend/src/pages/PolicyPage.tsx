import React from 'react';
import { motion } from 'framer-motion';

interface PolicyProps {
  title: string;
  content: string[];
}

const PolicyPage: React.FC<PolicyProps> = ({ title, content }) => {
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-20 rounded-[32px] md:rounded-[40px] shadow-premium border border-gray-100"
        >
          <span className="bg-brand-blue/10 text-brand-blue text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mb-6 block w-max">Sindhudyog Official Policy</span>
          <h1 className="text-3xl md:text-6xl font-serif font-bold text-brand-blue mb-8 md:mb-12 leading-tight italic">{title}</h1>
          
          <div className="space-y-8 md:space-y-10 text-gray-600 leading-relaxed text-base md:text-lg font-medium italic">
            {content.map((p, idx) => (
              <p key={idx} className="border-l-2 border-brand-orange/20 pl-6 md:pl-8 transition-colors hover:border-brand-orange cursor-default italic">{p}</p>
            ))}
          </div>

          <div className="mt-12 md:mt-20 pt-8 md:pt-10 border-t border-gray-100 flex items-center gap-4">
             <div className="h-1.5 w-10 md:h-2 md:w-12 bg-brand-orange rounded-full" />
             <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed italic">Last Updated: {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PolicyPage;
