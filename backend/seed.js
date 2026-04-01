const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  // Mango Products
  { 
    name: 'Hapus (Alphonso Mango)', 
    category: 'Mango Products', 
    price: 1200, 
    weight: '1 Dozen', 
    description: 'World-famous Alphonso mangoes from Devgad/Ratnagiri. King of fruits.', 
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80',
    stock: 50, 
    isFeatured: true, 
    sku: 'MNG-001' 
  },
  { 
    name: 'Payari Mango', 
    category: 'Mango Products', 
    price: 800, 
    weight: '1 Dozen', 
    description: 'Sweet and juicy Payari mangoes, perfect for Aamras.', 
    image: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80',
    stock: 50, 
    sku: 'MNG-002' 
  },
  { 
    name: 'Mango Boxes (Seasonal)', 
    category: 'Mango Products', 
    price: 3500, 
    weight: '4 Dozen', 
    description: 'Bulk boxes of premium Hapus mangoes.', 
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4a62?auto=format&fit=crop&q=80',
    stock: 20, 
    sku: 'MNG-003' 
  },
  { 
    name: 'Premium Mango Hampers', 
    category: 'Mango Products', 
    price: 2500, 
    weight: 'Combo', 
    description: 'Gifting hampers with Hapus, pulp, and mango products.', 
    image: 'https://plus.unsplash.com/premium_photo-1664392100806-03f90117d60a?auto=format&fit=crop&q=80',
    isFeatured: true,
    stock: 15, 
    sku: 'MNG-004' 
  },

  // Mirchi
  { 
    name: 'Sandgi Mirchi', 
    category: 'Mirchi', 
    price: 55, 
    weight: '500g', 
    description: 'Traditional Konkani stuffed and dried chilies.', 
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'MRC-001' 
  },
  { 
    name: 'Dahi Mirchi', 
    category: 'Mirchi', 
    price: 60, 
    weight: '500g', 
    description: 'Curd-marinated and sun-dried chilies, a great accompaniment.', 
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'MRC-002' 
  },

  // Chutney
  { 
    name: 'Lasun Chutney', 
    category: 'Chutney', 
    price: 60, 
    weight: '100g', 
    variants: [{ weight: '100g', price: 60 }, { weight: '500g', price: 230 }],
    description: 'Spicy and aromatic garlic chutney from Sindhudurg.', 
    image: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'CHT-001' 
  },
  { 
    name: 'Vada Pav Chutney', 
    category: 'Chutney', 
    price: 65, 
    weight: '100g', 
    variants: [{ weight: '100g', price: 65 }, { weight: '500g', price: 290 }],
    description: 'The soul of Mumbai Vada Pav, authentic spicy dry chutney.', 
    image: 'https://images.unsplash.com/photo-1599481238640-4c1288750d7a?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'CHT-002' 
  },

  // Coconut Products
  { 
    name: 'Naral (Coconut)', 
    category: 'Coconut Products', 
    price: 35, 
    weight: 'Standard', 
    variants: [{ weight: 'Small', price: 35 }, { weight: 'Large', price: 80 }],
    description: 'Fresh, organic coconuts from the Konkan coast.', 
    image: 'https://images.unsplash.com/photo-1543362906-acfc16c67562?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'COC-001' 
  },
  { 
    name: 'Khobrel Tel (Coconut Oil)', 
    category: 'Coconut Products', 
    price: 280, 
    weight: '500ml', 
    variants: [{ weight: '500ml', price: 280 }, { weight: '900ml', price: 420 }],
    description: 'Pure, cold-pressed coconut oil for cooking and health.', 
    image: 'https://images.unsplash.com/photo-1610444317133-c4084f7071eb?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'COC-002' 
  },

  // Rice & Poha
  { 
    name: 'Ukda Tandul', 
    category: 'Rice & Poha', 
    price: 110, 
    weight: '500g', 
    variants: [{ weight: '500g', price: 110 }, { weight: '1kg', price: 140 }, { weight: '5kg', price: 600 }],
    description: 'Nutritious red-brownish boiled rice, staple of Konkan.', 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'RCP-001' 
  },
  { 
    name: 'Surya Tandul', 
    category: 'Rice & Poha', 
    price: 45, 
    weight: '500g', 
    variants: [{ weight: '500g', price: 45 }, { weight: '1kg', price: 95 }, { weight: '5kg', price: 450 }],
    description: 'Premium white rice, locally grown and full of aroma.', 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'RCP-002' 
  },
  { 
    name: 'Lal Pohe', 
    category: 'Rice & Poha', 
    price: 130, 
    weight: '500g', 
    description: 'Red rice flakes, traditional and healthy for breakfast.', 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'RCP-003' 
  },

  // Sarbat
  { 
    name: 'Kokum Sarbat', 
    category: 'Sarbat', 
    price: 150, 
    weight: '500ml', 
    variants: [{ weight: '500ml', price: 150 }, { weight: '1L', price: 250 }],
    description: 'Refreshing digestive drink made from authentic Konkan kokum.', 
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'SRB-001' 
  },
  { 
    name: 'Amla Sarbat', 
    category: 'Sarbat', 
    price: 150, 
    weight: '500ml', 
    variants: [{ weight: '500ml', price: 150 }, { weight: '1L', price: 250 }],
    description: 'Vitamin C-rich amla sarbat, pure and natural.', 
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'SRB-002' 
  },
  { 
    name: 'Aala Limbu Sarbat', 
    category: 'Sarbat', 
    price: 160, 
    weight: '500ml', 
    variants: [{ weight: '500ml', price: 160 }, { weight: '1L', price: 250 }],
    description: 'Ginger and Lemon twist for a perfect summer cooler.', 
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'SRB-003' 
  },
  { 
    name: 'Kairi Panhe', 
    category: 'Sarbat', 
    price: 150, 
    weight: '500ml', 
    description: 'Raw mango drink, a seasonal delicacy from Maharashtra.', 
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'SRB-004' 
  },

  // Pickles
  { 
    name: 'Mirchi Lonche', 
    category: 'Pickles', 
    price: 150, 
    weight: '250g', 
    variants: [{ weight: '250g', price: 150 }, { weight: '500g', price: 240 }],
    description: 'Zesty green chili pickle made with traditional spices.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-001' 
  },
  { 
    name: 'Aamba Lonche (Mango Pickle)', 
    category: 'Pickles', 
    price: 150, 
    weight: '250g', 
    variants: [{ weight: '250g', price: 150 }, { weight: '500g', price: 240 }],
    description: 'Classic raw mango pickle, just like grandma made it.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-002' 
  },
  { 
    name: 'Aamba God Lonche (Sweet Mango Pickle)', 
    category: 'Pickles', 
    price: 120, 
    weight: '200g', 
    variants: [{ weight: '200g', price: 120 }, { weight: '500g', price: 200 }],
    description: 'Sweet and tangy mango pickle, loved by kids.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-003' 
  },
  { 
    name: 'Aamba Tikhat-God Lonche', 
    category: 'Pickles', 
    price: 150, 
    weight: '250g', 
    variants: [{ weight: '250g', price: 150 }, { weight: '500g', price: 240 }],
    description: 'The perfect balance of sweet and spicy mango.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-004' 
  },
  { 
    name: 'Limbu Lonche (Lemon Pickle)', 
    category: 'Pickles', 
    price: 150, 
    weight: '250g', 
    variants: [{ weight: '250g', price: 150 }, { weight: '500g', price: 200 }],
    description: 'Authentic lemon pickle with a sun-dried flavor.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-005' 
  },
  { 
    name: 'Limbu God Lonche (Sweet Lemon)', 
    category: 'Pickles', 
    price: 120, 
    weight: '200g', 
    variants: [{ weight: '200g', price: 120 }, { weight: '500g', price: 200 }],
    description: 'Sweetened lemon pickle for fasting and meals.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-006' 
  },
  { 
    name: 'Amboshi Lonche (Dried Mango)', 
    category: 'Pickles', 
    price: 120, 
    weight: '200g', 
    variants: [{ weight: '200g', price: 120 }, { weight: '500g', price: 280 }],
    description: 'Specialty dried mango pickle, unique and flavorful.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-007' 
  },
  { 
    name: 'Lasun Lonche (Garlic Pickle)', 
    category: 'Pickles', 
    price: 150, 
    weight: '200g', 
    variants: [{ weight: '200g', price: 150 }, { weight: '500g', price: 250 }],
    description: 'Bold garlic flavor in every bite.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-008' 
  },
  { 
    name: 'Amla Chunda', 
    category: 'Pickles', 
    price: 120, 
    weight: '200g', 
    variants: [{ weight: '200g', price: 120 }, { weight: '500g', price: 250 }],
    description: 'Grated amla preserve, healthy and sweet.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-009' 
  },
  { 
    name: 'Kairi Muramba', 
    category: 'Pickles', 
    price: 120, 
    weight: '200g', 
    variants: [{ weight: '200g', price: 120 }, { weight: '500g', price: 250 }],
    description: 'Traditional Maharashtrian grated mango jam.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-010' 
  },
  { 
    name: 'Belphal Muramba', 
    category: 'Pickles', 
    price: 260, 
    weight: '500g', 
    description: 'Therapeutic and digestive Bael fruit preserve.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 50, 
    sku: 'PCK-011' 
  },
  { 
    name: 'Upwasachi Limbu Chutney', 
    category: 'Pickles', 
    price: 120, 
    weight: '200g', 
    variants: [{ weight: '200g', price: 120 }, { weight: '500g', price: 250 }],
    description: 'Special fasting-safe lemon chutney.', 
    image: 'https://images.unsplash.com/photo-1589135398305-57a488528430?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'PCK-012' 
  },

  // Masala
  { 
    name: 'Special Malvani Masala', 
    category: 'Masala', 
    price: 130, 
    weight: '100g', 
    variants: [{ weight: '100g', price: 130 }, { weight: '500g', price: 550 }],
    description: 'Our signature blend of 18+ spices, soul of Malvani cuisine.', 
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80',
    isFeatured: true,
    stock: 100, 
    sku: 'MSL-001' 
  },
  { 
    name: 'Goda Masala', 
    category: 'Masala', 
    price: 120, 
    weight: '100g', 
    variants: [{ weight: '100g', price: 120 }, { weight: '500g', price: 450 }],
    description: 'Aromatic and slightly sweet Maharashtrian black masala.', 
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'MSL-002' 
  },
  { 
    name: 'Garam Masala', 
    category: 'Masala', 
    price: 120, 
    weight: '100g', 
    variants: [{ weight: '100g', price: 120 }, { weight: '500g', price: 400 }],
    description: 'High-grade whole spices, freshly ground.', 
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'MSL-003' 
  },
  { 
    name: 'Kashmiri Mirchi Powder', 
    category: 'Masala', 
    price: 120, 
    weight: '100g', 
    variants: [{ weight: '100g', price: 120 }, { weight: '500g', price: 450 }],
    description: 'Bright red color with mild heat.', 
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'MSL-004' 
  },
  { 
    name: 'Halad (Turmeric)', 
    category: 'Masala', 
    price: 60, 
    weight: '100g', 
    variants: [{ weight: '100g', price: 60 }, { weight: '500g', price: 250 }],
    description: 'Pure, anti-inflammatory turmeric grown in healthy soil.', 
    image: 'https://images.unsplash.com/photo-1615485240384-aa037288d9ca?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'MSL-005' 
  },

  // Flours (Pith)
  { 
    name: 'Malvani Vade Pith', 
    category: 'Flours', 
    price: 120, 
    weight: '500g', 
    description: 'Instant mix for authentic Kombdi Vade.', 
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'FLR-001' 
  },
  { 
    name: 'Ghavane Pith', 
    category: 'Flours', 
    price: 110, 
    weight: '500g', 
    description: 'Perfectly ground rice flour for soft Ghavane.', 
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'FLR-002' 
  },
  { 
    name: 'Modak Pith', 
    category: 'Flours', 
    price: 120, 
    weight: '500g', 
    description: 'Fine rice flour for handmade Ukadiche Modak.', 
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'FLR-003' 
  },
  { 
    name: 'Tandul Pith', 
    category: 'Flours', 
    price: 85, 
    weight: '500g', 
    description: 'General purpose high-quality rice flour.', 
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'FLR-004' 
  },
  { 
    name: 'Thalipeeth Pith (Bhajani)', 
    category: 'Flours', 
    price: 240, 
    weight: '500g', 
    description: 'Spicier multi-grain mix for instant Thalipeeth.', 
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'FLR-005' 
  },
  { 
    name: 'Kulith Pith (Horsegram)', 
    category: 'Flours', 
    price: 240, 
    weight: '500g', 
    variants: [{ weight: '100g', price: 55 }, { weight: '500g', price: 240 }],
    description: 'High protein horsegram flour, great for soup (Shengole).', 
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'FLR-006' 
  },
  { 
    name: 'Upwas Bhajani', 
    category: 'Flours', 
    price: 250, 
    weight: '500g', 
    description: 'Fasting-safe flour mix made of Vari and Sago.', 
    image: 'https://images.unsplash.com/photo-1626082896492-766af4eb6501?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'FLR-007' 
  },

  // Cashew (Kaju)
  { 
    name: 'Konkan Kaju', 
    category: 'Cashew', 
    price: 240, 
    weight: '100g', 
    variants: [{ weight: '100g', price: 240 }, { weight: '250g', price: 320 }],
    description: 'Premium whole cashews from the Konkan region.', 
    image: 'https://images.unsplash.com/photo-1596567130024-4852003c206d?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'CSH-001' 
  },
  { 
    name: 'Salted Kaju', 
    category: 'Cashew', 
    price: 190, 
    weight: '100g', 
    variants: [{ weight: '100g', price: 190 }, { weight: '250g', price: 320 }],
    description: 'Roasted and perfectly salted cashews.', 
    image: 'https://images.unsplash.com/photo-1596567130024-4852003c206d?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'CSH-002' 
  },
  { 
    name: 'Masala Kaju', 
    category: 'Cashew', 
    price: 150, 
    weight: '100g', 
    description: 'Spicy masala coated premium cashews.', 
    image: 'https://images.unsplash.com/photo-1596567130024-4852003c206d?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'CSH-003' 
  },
  { 
    name: 'Peri Peri Kaju', 
    category: 'Cashew', 
    price: 150, 
    weight: '100g', 
    description: 'Smoky peri peri flavor for the snack lovers.', 
    image: 'https://images.unsplash.com/photo-1596567130024-4852003c206d?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'CSH-004' 
  },

  // Sweets & Snacks
  { 
    name: 'Malvani Khaja', 
    category: 'Sweets & Snacks', 
    price: 85, 
    weight: '200g', 
    description: 'Traditional sweet made from jaggery and gram flour.', 
    image: 'https://images.unsplash.com/photo-1589113103930-cb26e39bc348?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'SWT-001' 
  },
  { 
    name: 'Shengdana Ladu (Peanut)', 
    category: 'Sweets & Snacks', 
    price: 85, 
    weight: 'Box', 
    description: 'Healthiest snack made with peanuts and jaggery.', 
    image: 'https://images.unsplash.com/photo-1589113103930-cb26e39bc348?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'SWT-002' 
  },
  { 
    name: 'Shev Chivda', 
    category: 'Sweets & Snacks', 
    price: 95, 
    weight: '250g', 
    description: 'Crunchy and spicy tea-time snack.', 
    image: 'https://images.unsplash.com/photo-1589113103930-cb26e39bc348?auto=format&fit=crop&q=80',
    stock: 100, 
    sku: 'SWT-003' 
  },

  // Ghee
  { 
    name: 'Gir Cow Ghee (Bilona Method)', 
    category: 'Ghee', 
    price: 240, 
    weight: '100ml', 
    variants: [{ weight: '100ml', price: 240 }, { weight: '250ml', price: 560 }, { weight: '500ml', price: 990 }],
    description: 'Pure A2 Gir Cow Ghee, hand-churned using the Bilona method.', 
    image: 'https://images.unsplash.com/photo-1549467794-44e23cf634db?auto=format&fit=crop&q=80',
    isFeatured: true,
    stock: 100, 
    sku: 'GHE-001' 
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database Seeded Successfully with ' + products.length + ' products!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
