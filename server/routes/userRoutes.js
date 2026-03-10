import express from 'express';
import { getUsers } from '../controllers/userController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
import asyncHandler from '../middleware/asyncHandler.js';

const router = express.Router();

router.get('/', protect, adminOnly, asyncHandler(getUsers));

export default router;
