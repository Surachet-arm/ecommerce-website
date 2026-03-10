import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    weight: { type: Number, required: true }
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: { type: String, default: 'USA' }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [orderItemSchema],
    totalPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    shippingAddress: addressSchema,
    shippingMethod: { type: String, enum: ['standard', 'express', 'pickup'], default: 'standard' },
    paymentMethod: { type: String, required: true }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
