import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

const bulkPriceSchema = new mongoose.Schema(
  {
    minQty: { type: Number, required: true },
    discountPercent: { type: Number, required: true }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String }],
    weight: { type: Number, required: true, default: 1 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    soldCount: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    bulkPricing: [bulkPriceSchema],
    reviews: [reviewSchema]
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
