import User from '../models/User.js';
import generateToken from '../config/jwt.js';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already registered' });

  const user = await User.create({ name, email, password });
  return res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role)
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    address: user.address,
    token: generateToken(user._id, user.role)
  });
};

export const getProfile = async (req, res) => {
  return res.json(req.user);
};

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.address = req.body.address || user.address;
  if (req.body.password) user.password = req.body.password;

  const updated = await user.save();
  return res.json({
    _id: updated._id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    address: updated.address,
    token: generateToken(updated._id, updated.role)
  });
};
