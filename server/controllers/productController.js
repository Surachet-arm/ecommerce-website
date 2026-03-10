import Product from '../models/Product.js';
import { calcBulkUnitPrice } from '../config/pricing.js';

export const getProducts = async (req, res) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 8);
  const search = req.query.search || '';
  const category = req.query.category || '';
  const featured = req.query.featured === 'true';
  const bestSelling = req.query.bestSelling === 'true';

  const query = {
    name: { $regex: search, $options: 'i' }
  };

  if (category) query.category = category;
  if (featured) query.featured = true;

  const sort = bestSelling ? { soldCount: -1 } : { createdAt: -1 };

  const count = await Product.countDocuments(query);
  const products = await Product.find(query)
    .populate('category', 'name')
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);

  return res.json({
    products,
    page,
    pages: Math.ceil(count / limit),
    total: count
  });
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name');
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const related = await Product.find({ category: product.category._id, _id: { $ne: product._id } }).limit(4);
  return res.json({ product, relatedProducts: related });
};

export const createProduct = async (req, res) => {
  const payload = req.body;
  const files = req.files || [];

  const product = await Product.create({
    name: payload.name,
    description: payload.description,
    price: payload.price,
    stock: payload.stock,
    weight: payload.weight,
    category: payload.category,
    featured: payload.featured === 'true' || payload.featured === true,
    bulkPricing: payload.bulkPricing ? JSON.parse(payload.bulkPricing) : [],
    images: files.map((f) => `/uploads/${f.filename}`)
  });

  return res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const files = req.files || [];
  Object.assign(product, {
    name: req.body.name ?? product.name,
    description: req.body.description ?? product.description,
    price: req.body.price ?? product.price,
    stock: req.body.stock ?? product.stock,
    weight: req.body.weight ?? product.weight,
    category: req.body.category ?? product.category,
    featured: req.body.featured !== undefined ? (req.body.featured === 'true' || req.body.featured === true) : product.featured,
  });

  if (req.body.bulkPricing) {
    product.bulkPricing = JSON.parse(req.body.bulkPricing);
  }

  if (files.length > 0) {
    product.images = files.map((f) => `/uploads/${f.filename}`);
  }

  const updated = await product.save();
  return res.json(updated);
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  await product.deleteOne();
  return res.json({ message: 'Product deleted' });
};

export const addReview = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const existing = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
  if (existing) return res.status(400).json({ message: 'Product already reviewed by this user' });

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

  await product.save();
  return res.status(201).json({ message: 'Review added' });
};

export const getBulkPreview = async (req, res) => {
  const { productId, quantity } = req.query;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const qty = Number(quantity || 1);
  const unitPrice = calcBulkUnitPrice(product, qty);
  return res.json({ unitPrice, total: Number((unitPrice * qty).toFixed(2)) });
};
