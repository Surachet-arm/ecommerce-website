import Category from '../models/Category.js';

export const getCategories = async (_req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  return res.json(categories);
};

export const createCategory = async (req, res) => {
  if (!req.body.name) return res.status(400).json({ message: 'Category name is required' });
  const category = await Category.create({ name: req.body.name });
  return res.status(201).json(category);
};
