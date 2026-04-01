const Order = require('../models/Order');

// Create new order
exports.createOrder = async (req, res) => {
  const { items, totalAmount, customer, paymentMethod } = req.body;
  const orderId = 'SIN-' + Date.now();
  
  const order = new Order({
    orderId,
    items,
    totalAmount,
    customer,
    paymentMethod,
    paymentStatus: paymentMethod === 'UPI' ? 'Pending' : 'Completed' // COD logic simplified
  });

  try {
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all orders (Admin only)
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update order status (Admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
