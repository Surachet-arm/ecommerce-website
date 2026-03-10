import express from 'express';
import { addToCart, getCart, removeCartItem } from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', protect, asyncHandler(getCart));
router.post('/', protect, asyncHandler(addToCart));
router.delete('/:id', protect, asyncHandler(removeCartItem));

export default router;
