import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { calcBulkUnitPrice, calcShippingByWeight } from '../config/pricing.js';

export const createOrder = async (req, res) => {
  const { shippingAddress, shippingMethod, paymentMethod } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');

  if (!cart || cart.products.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  let itemsPrice = 0;
  let totalWeight = 0;

  const items = [];
  for (const line of cart.products) {
    const product = await Product.findById(line.product._id);
    if (!product || line.quantity > product.stock) {
      return res.status(400).json({ message: `Invalid stock for ${line.product.name}` });
    }

    const unitPrice = calcBulkUnitPrice(product, line.quantity);
    itemsPrice += unitPrice * line.quantity;
    totalWeight += product.weight * line.quantity;

    product.stock -= line.quantity;
    product.soldCount += line.quantity;
    await product.save();

    items.push({
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: unitPrice,
      quantity: line.quantity,
      weight: product.weight
    });
  }

  const shippingPrice = calcShippingByWeight(totalWeight, shippingMethod);
  const totalPrice = Number((itemsPrice + shippingPrice).toFixed(2));

  const order = await Order.create({
    user: req.user._id,
    items,
    totalPrice,
    shippingPrice,
    shippingAddress,
    shippingMethod,
    paymentMethod
  });

  cart.products = [];
  await cart.save();

  return res.status(201).json(order);
};

export const getOrders = async (req, res) => {
  const isAdmin = req.user.role === 'admin';
  const query = isAdmin ? {} : { user: req.user._id };
  const orders = await Order.find(query).populate('user', 'name email').sort({ createdAt: -1 });
  return res.json(orders);
};

export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  return res.json(order);
};

export const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.status = req.body.status || order.status;
  const updated = await order.save();
  return res.json(updated);
};

export const getDashboardStats = async (_req, res) => {
  const [orders, products] = await Promise.all([
    Order.find(),
    Product.find()
  ]);

  const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  return res.json({
    totalSales: Number(totalSales.toFixed(2)),
    orderCount: orders.length,
    productCount: products.length
  });
};
