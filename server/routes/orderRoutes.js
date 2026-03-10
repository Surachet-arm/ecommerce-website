import express from 'express';
import {
  createOrder,
  getDashboardStats,
  getOrderById,
  getOrders,
  updateOrderStatus
} from '../controllers/orderController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.post('/', protect, asyncHandler(createOrder));
router.get('/', protect, asyncHandler(getOrders));
router.get('/dashboard/stats', protect, adminOnly, asyncHandler(getDashboardStats));
router.get('/:id', protect, asyncHandler(getOrderById));
router.put('/:id/status', protect, adminOnly, asyncHandler(updateOrderStatus));

export default router;
