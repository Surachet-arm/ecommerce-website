import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { calcBulkUnitPrice } from '../config/pricing.js';

export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, products: [] });
    cart = await Cart.findById(cart._id).populate('products.product');
  }

  const items = cart.products.map((item) => {
    const unitPrice = calcBulkUnitPrice(item.product, item.quantity);
    return {
      _id: item._id,
      product: item.product,
      quantity: item.quantity,
      unitPrice,
      lineTotal: Number((unitPrice * item.quantity).toFixed(2))
    };
  });

  const totalPrice = items.reduce((sum, i) => sum + i.lineTotal, 0);
  return res.json({ items, totalPrice: Number(totalPrice.toFixed(2)) });
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const qty = Number(quantity || 1);

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  if (qty > product.stock) return res.status(400).json({ message: 'Quantity exceeds stock' });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, products: [] });

  const existing = cart.products.find((p) => p.product.toString() === productId);
  if (existing) {
    existing.quantity = qty;
  } else {
    cart.products.push({ product: productId, quantity: qty });
  }

  await cart.save();
  return res.json({ message: 'Cart updated' });
};

export const removeCartItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.products = cart.products.filter((item) => item._id.toString() !== req.params.id);
  await cart.save();
  return res.json({ message: 'Item removed' });
};
