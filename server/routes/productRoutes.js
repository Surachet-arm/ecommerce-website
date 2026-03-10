import express from 'express';
import {
  addReview,
  createProduct,
  deleteProduct,
  getBulkPreview,
  getProductById,
  getProducts,
  updateProduct
} from '../controllers/productController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', asyncHandler(getProducts));
router.get('/bulk-preview', asyncHandler(getBulkPreview));
router.get('/:id', asyncHandler(getProductById));
router.post('/', protect, adminOnly, upload.array('images', 5), asyncHandler(createProduct));
router.put('/:id', protect, adminOnly, upload.array('images', 5), asyncHandler(updateProduct));
router.delete('/:id', protect, adminOnly, asyncHandler(deleteProduct));
router.post('/:id/reviews', protect, asyncHandler(addReview));

export default router;
