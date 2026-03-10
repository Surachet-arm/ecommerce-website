import User from '../models/User.js';

export const getUsers = async (_req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  return res.json(users);
};
