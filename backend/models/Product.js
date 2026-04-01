const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: String }, // e.g., "500g", "1L"
  description: { type: String },
  image: { type: String },
  stock: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  variants: [{
    weight: String,
    price: Number,
    stock: Number
  }],
  sku: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
