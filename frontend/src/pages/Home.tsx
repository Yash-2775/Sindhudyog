import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, ShoppingBag, Leaf, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  // Mock data as fallback to solve console errors if backend is not running yet
  const mockFeatured = [
    { _id: '1', name: 'Premium Hapus Box', price: 1200, weight: '1 Dozen', category: 'Mango Products', isFeatured: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn2IEa8339TGVOwyOJ9XaSl0866_3Lr9RpgpQPEMyLaX92aBrsdEpmywIMQACtufa-GcY-SqtdGw7cqLb8v9u-WjR4GM1u-jtFS1gcQVSqkquRDEubzqbsNqiFIqrla4r9tI6mds2UsJaS_Qze42ApEAL27nNhoHEvtStc76UZvC6akP2H_jct9RT-t3sPYOQ8xCpR7Bw5j8n35X0eqvibzpEkmnbDEFz_67OlgohkaWiGDz2NvucmgJ4HeHXtkptzUwkSvGFbs4jq' },
    { _id: '2', name: 'Malvani Masala', price: 550, weight: '500g', category: 'Masala', isFeatured: true, image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80' },
    { _id: '3', name: 'Gir Cow Ghee', price: 990, weight: '500ml', category: 'Ghee', isFeatured: true, image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbOjbi_lJZS4qQ0jlF-GWFE46An9etpY1iD3wvhTCWGLpwU7tsyM7q9xhJermYQAHK0Slycsf2SekjEteLuUqrSbxa_jmrbR-ihKlu-yxHtsc0HBIvABiRqpu-jR0YugyMHwCxN2rELsXrl3KWPUdCPryPwSa3rpibMrKVMIZVwelvoEv1_uh2Dwx85BS0Z76T_aKKdMQDUPA8CixIhHp8p_Cyb7X1fin_q_mZzoVYconW7o799-i1_YFKE3Gjv-_t2fGh9Ms0ce6c' },
    { _id: '4', name: 'Kokum Sarbat', price: 250, weight: '1L', category: 'Sarbat', isFeatured: true, image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80' },
  ];

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setFeaturedProducts(res.data.filter((p: any) => p.isFeatured).slice(0, 4));
      } catch (err) {
        console.warn('Using featured fallback.');
        setFeaturedProducts(mockFeatured);
      }
    };
    fetchFeatured();
  }, []);

  const categories = [
    { name: 'Mango Products', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn2IEa8339TGVOwyOJ9XaSl0866_3Lr9RpgpQPEMyLaX92aBrsdEpmywIMQACtufa-GcY-SqtdGw7cqLb8v9u-WjR4GM1u-jtFS1gcQVSqkquRDEubzqbsNqiFIqrla4r9tI6mds2UsJaS_Qze42ApEAL27nNhoHEvtStc76UZvC6akP2H_jct9RT-t3sPYOQ8xCpR7Bw5j8n35X0eqvibzpEkmnbDEFz_67OlgohkaWiGDz2NvucmgJ4HeHXtkptzUwkSvGFbs4jq', count: '12 Items' },
    { name: 'Masala', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80', count: '8 Items' },
    { name: 'Pickles', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSVX5FsuHAkJXFxXt2FgVxJh2KQ8HPGbLjJ_Bit0br8PdcrQpq4bDyUOQEaJPpadeDOwomCkWY5HGV-Fh_V-Vm-M_B894ElmTlLUVE9cAV8I_8eq1kj7AeI7ifY03r6z8iBQL3Jo21oEUeNpOsZxknzVyAF_NIFL5ZZj3-Qf6p6VxzpmGUDIX4eU8gcMqJXomlojvvttZj59SCtgAIoQMy3kSqyv_0eHNZVM57Maloin4PZbYua9puYk75nhGVRPuKHxqv5ETy2NFA', count: '15 Items' },
    { name: 'Coconut Products', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhqKOLV1r1RsqlUhwG9IngH9SeUh6lwYuhAUkUfe4wL72_usQonF75RvAdov7YcRRsVdkbHkco-hzIiVTxK5ggkT2pH8Ccym0YMPgLFR5I6gH8um4OZdfe7xe4n1s1YA7sJU4xX-uPXkFxu7MvI5IuzgWQiJF_1RpZtiB615yZ0NlPmyQYRtMPUdFHvj9ClREIb6rRpmBV8X0nACKf44nImZ1iBmKKKW_IQ2BWunjcbjewwBkPYEwBbZqJCZWq3yopvlDOHjo7ROU0', count: '6 Items' },
  ];

  return (
    <div className="bg-brand-cream overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[95vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="/hero_banner.png"
            alt="Konkan Orchards"
            className="w-full h-full object-cover"
          />
          {/* Refined Overlays for better image visibility */}
          <div className="absolute inset-0 bg-brand-dark/40 bg-gradient-to-r from-brand-dark/60 via-brand-dark/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-cream to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <span className="h-0.5 w-8 md:w-12 bg-brand-orange rounded-full" />
              <span className="text-brand-orange text-[10px] md:text-sm font-bold uppercase tracking-[0.3em] drop-shadow-md">Sindhudurg's finest</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold mb-6 md:mb-8 leading-[1.1] drop-shadow-xl">
              Authentic <br />
              <span className="text-brand-orange italic">Konkan</span> Legacy.
            </h1>
            <p className="text-sm md:text-xl text-white/90 mb-8 md:mb-12 leading-relaxed font-sans font-light max-w-xl border-l-2 border-brand-orange/40 pl-4 md:pl-8">
              Straight from the orchards of Sindhudurg to your doorstep. Experience the soul of coastal Maharashtra.
            </p>
            <div className="flex flex-wrap items-center gap-6 md:gap-8">
              <Link to="/shop" className="btn-primary flex items-center gap-3 text-base md:text-lg px-8 md:px-10 h-14 md:h-16 shadow-2xl hover:bg-brand-orange transition-all group">
                Shop Now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about" className="flex items-center gap-3 text-white font-bold tracking-widest uppercase text-[10px] md:text-xs hover:text-brand-orange transition-colors group">
                <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-orange transition-all">
                  <Leaf size={16} className="md:w-4.5 md:h-4.5" />
                </div>
                Our Heritage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-32 bg-brand-cream relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-orange/5 rounded-l-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-blue mb-4 md:mb-6">Explore by Category</h2>
              <p className="text-gray-500 text-base md:text-lg">Hand-picked treasures from the Konkan region, curated for quality and authenticity.</p>
            </div>
            <Link to="/shop" className="text-brand-blue font-bold flex items-center gap-2 group hover:text-brand-orange transition-colors uppercase text-[10px] md:text-xs tracking-widest">
              View All Products <ArrowRight size={16} className="md:w-[18px] md:h-[18px] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/shop?category=${cat.name}`}
                className="group cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="w-full"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] md:rounded-[32px] mb-4 md:mb-6 bg-white border border-gray-100 shadow-premium transition-all duration-500 group-hover:shadow-2xl">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white opacity-0 group-hover:opacity-100 transition duration-300 translate-y-4 group-hover:translate-y-0">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">{cat.count}</span>
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-center text-brand-dark group-hover:text-brand-blue transition-colors font-serif">{cat.name}</h3>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sindhudyog */}
      <section className="py-16 md:py-32 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-orange/10 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-24">
            <div className="relative">
              <img src="/story_img.png" alt="Konkan Journey" className="w-full h-[400px] md:h-[650px] object-cover rounded-[40px] md:rounded-[60px] shadow-2xl relative z-10" />
              <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-brand-orange p-6 md:p-10 rounded-[30px] md:rounded-[40px] z-20 shadow-2xl max-w-[180px] md:max-w-xs block">
                <h4 className="text-2xl md:text-4xl font-serif font-bold mb-1 md:mb-2 italic">100%</h4>
                <p className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-brand-dark">Purely Farm Sourced</p>
              </div>
            </div>

            <div className="space-y-8 md:space-y-12">
              <div>
                <span className="text-brand-orange font-bold text-[10px] md:text-xs uppercase tracking-[0.4em] block mb-4 md:mb-6">Our Legacy</span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 md:mb-10 leading-tight">Tradition That Stays True.</h2>
                <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-10 italic">
                  Sindhudyog is born from the soul of Sindhudurg. We are not just a brand; we are a bridge connecting you to the centuries-old traditional recipes of the Konkan coast.
                </p>
              </div>

              <div className="grid gap-6 md:gap-8">
                <div className="flex gap-4 md:gap-6 items-start group">
                  <div className="bg-white/5 h-12 w-12 md:h-16 md:w-16 min-w-[48px] md:min-w-[64px] rounded-xl md:rounded-2xl flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all duration-300 shadow-sm">
                    <Leaf size={24} className="md:w-7.5 md:h-7.5" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Sustainable Farming</h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Direct support to local farmers in the Sindhudurg district with fair-trade practices.</p>
                  </div>
                </div>
                <div className="flex gap-4 md:gap-6 items-start group">
                  <div className="bg-white/5 h-12 w-12 md:h-16 md:w-16 min-w-[48px] md:min-w-[64px] rounded-xl md:rounded-2xl flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all duration-300 shadow-sm">
                    <MapPin size={24} className="md:w-7.5 md:h-7.5" />
                  </div>
                  <div>
                    <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Authentic Origin</h4>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed">Every product is certified to be grown and processed in the heart of Konkan.</p>
                  </div>
                </div>
              </div>

              <Link to="/about" className="btn-secondary inline-flex items-center gap-3 px-8 md:px-10 h-14 md:h-16 rounded-full text-base md:text-lg shadow-xl hover:shadow-brand-green/20">
                Discover Our Heritage <ArrowRight size={20} className="md:w-[22px] md:h-[22px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Selection */}
      <section className="py-16 md:py-32 bg-brand-cream">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-12 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-blue mb-4 md:mb-6">Our Signature Bestsellers</h2>
            <p className="text-gray-500 text-base md:text-lg">Indulge in our most-loved products, tried and tested by our community of food enthusiasts.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-left">
            {featuredProducts.map((product: any) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative aspect-square overflow-hidden rounded-[30px] md:rounded-[40px] mb-6 md:mb-8 bg-white shadow-premium group-hover:shadow-2xl transition-all duration-500 border border-gray-100">
                  <img
                    src={product.image || '/placeholder.png'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-col gap-2 md:gap-3 translate-x-20 group-hover:translate-x-0 transition-transform duration-500 delay-100">
                    <button className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-full flex items-center justify-center text-brand-blue shadow-xl hover:bg-brand-blue hover:text-white transition-all"><Heart size={18} className="md:w-5 md:h-5" /></button>
                    <button className="h-10 w-10 md:h-12 md:w-12 bg-white rounded-full flex items-center justify-center text-brand-orange shadow-xl hover:bg-brand-orange hover:text-white transition-all"><ShoppingBag size={18} className="md:w-5 md:h-5" /></button>
                  </div>
                  {product.isFeatured && (
                    <span className="absolute top-4 left-4 md:top-6 md:left-6 badge-featured shadow-lg text-[8px] md:text-[10px]">Featured Selection</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-[0.3em] block mb-2 md:mb-3">{product.category}</span>
                  <h3 className="text-lg md:text-xl font-bold text-brand-dark mb-2 md:mb-3 group-hover:text-brand-blue transition-colors font-serif"><Link to={`/product/${product._id}`}>{product.name}</Link></h3>
                  <div className="flex items-center justify-between">
                    <p className="text-xl md:text-2xl font-bold text-brand-blue">₹{product.price}</p>
                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">{product.weight}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 md:mt-24">
            <Link to="/shop" className="btn-outline inline-flex items-center gap-3 px-10 md:px-12 h-14 md:h-16 rounded-full text-base md:text-lg group">
              View Complete Catalog <ArrowRight size={18} className="md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;