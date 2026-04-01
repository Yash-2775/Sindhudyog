const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number,
      weight: String
    }
  ],
  totalAmount: { type: Number, required: true },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  paymentMethod: { type: String, enum: ['COD', 'UPI'], default: 'COD' },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
  orderStatus: { type: String, enum: ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Placed' },
  razorpayOrder: {
    id: String,
    status: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
