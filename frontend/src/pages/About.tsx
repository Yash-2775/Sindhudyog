import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Leaf, CheckCircle2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="pt-24 md:pt-32 pb-16 md:pb-24 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 items-center gap-10 md:gap-16 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 md:space-y-8"
          >
            <span className="bg-brand-orange/10 text-brand-orange text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest inline-block">Our Legacy Story</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-blue leading-tight italic">Rooted in Tradition, Sourced from Sindhudurg.</h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed italic">
              "Exploring Kokan flavours with our curated food products" isn't just our tagline; it's our promise to bring the authentic, homemade taste of Sindhudurg to every dining table in the country.
            </p>
            <div className="flex gap-6 pt-2 md:pt-4">
              <Link to="/shop" className="btn-primary w-full md:w-auto text-center">Browse Marketplace</Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-brand-green/20 rounded-[32px] md:rounded-[40px] blur-3xl -rotate-6 animate-pulse" />
            <img src="/story_img.png" alt="Konkan Heritage" className="relative z-10 w-full rounded-[32px] md:rounded-[40px] shadow-premium" />
          </motion.div>
        </div>

        {/* Features Grid */}
        <section className="mb-20 md:mb-32">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-4 leading-tight">The Sindhudyog Commitment</h2>
            <p className="text-gray-500 text-sm md:text-base italic">Every product we ship carries the weight of our tradition and the purity of our soil.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: <Heart className="text-brand-orange" />, title: "Authentic Recipes", desc: "No industrial processing. Our recipes are passed down through generations of Konkan grandmothers." },
              { icon: <Leaf className="text-brand-green" />, title: "Sourced Locally", desc: "We partner directly with small-scale farmers in Sindhudurg to ensure fair trade and unmatched quality." },
              { icon: <ShieldCheck className="text-brand-blue" />, title: "Zero Additives", desc: "100% natural. No artificial colors, preservatives, or synthetic flavors. Just pure, honest food." }
            ].map((f, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-8 md:p-10 rounded-[24px] md:rounded-[32px] border border-gray-100 shadow-sm hover:shadow-premium transition-all duration-300"
              >
                <div className="h-14 w-14 md:h-16 md:w-16 bg-brand-cream rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-inner">{f.icon}</div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-blue mb-4 italic">{f.title}</h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed italic">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-brand-dark text-white rounded-[40px] md:rounded-[60px] p-8 md:p-24 relative overflow-hidden mb-20 md:mb-32">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10 italic">
            <div className="space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight italic">Why We Do What We Do.</h2>
              <div className="space-y-4 md:space-y-6 text-gray-400 text-base md:text-lg leading-relaxed italic">
                <p>The Sindhudurg region is blessed with flavors that aren't found anywhere else. But slowly, industrial food is replacing these handcrafted traditions.</p>
                <p>We started Sindhudyog to bridge that gap. To ensure that when you crave a Malvani Vade or a Kokum Sarbat, you get the real thing - not a chemical mimicry.</p>
                <p>Every purchase you make supports a local family in Konkan and helps keep these ancient culinary traditions alive for the next generation.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 py-6 md:py-8 border-y border-white/5 italic">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => <div key={i} className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-brand-dark overflow-hidden"><img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Customer" /></div>)}
                </div>
                <p className="text-[10px] md:text-sm font-bold text-brand-orange text-center sm:text-left">TRUSTED BY 5,000+ KONKAN FLAVOUR LOVERS</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 italic">
              <div className="bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-sm self-end">
                <h4 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">12+</h4>
                <p className="text-[10px] md:text-sm font-medium text-gray-500 uppercase tracking-widest leading-relaxed italic">Authentic Spices</p>
              </div>
              <div className="bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-2xl md:text-4xl font-bold text-brand-orange mb-1 md:mb-2">50+</h4>
                <p className="text-[10px] md:text-sm font-medium text-gray-500 uppercase tracking-widest leading-relaxed italic">Konkan Farmers</p>
              </div>
              <div className="bg-white/5 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-sm">
                <h4 className="text-2xl md:text-4xl font-bold text-brand-green mb-1 md:mb-2">100%</h4>
                <p className="text-[10px] md:text-sm font-medium text-gray-500 uppercase tracking-widest leading-relaxed italic">Homemade Quality</p>
              </div>
              <div className="bg-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 backdrop-blur-md self-start md:transform md:translate-y-8">
                <CheckCircle2 className="text-brand-orange mb-3 md:mb-4 w-6 h-6 md:w-8 md:h-8" />
                <p className="text-[10px] md:text-sm font-bold italic leading-relaxed">Geographically Certified Origin</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 md:py-20 bg-white rounded-[32px] md:rounded-[40px] shadow-premium mb-8 md:mb-12 px-6">
          <ShoppingBag className="mx-auto mb-6 md:mb-8 text-brand-blue w-10 h-10 md:w-12 md:h-12" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-blue mb-4 md:mb-6 italic">Ready to Taste the Real Konkan?</h2>
          <p className="text-gray-500 text-sm md:text-base mb-8 md:mb-10 max-w-lg mx-auto italic">Explore our collection of fresh pickles, pure oils, and traditional masalas sourced directly from the heart of Sindhudurg.</p>
          <Link to="/shop" className="btn-primary w-full md:w-auto inline-block">Explore Marketplace</Link>
        </section>
      </div>
    </div>
  );
};

export default About;
