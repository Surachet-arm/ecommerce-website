import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import Order from '../models/Order.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany(),
      Category.deleteMany(),
      Product.deleteMany(),
      Cart.deleteMany(),
      Order.deleteMany()
    ]);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@buildmart.com',
      password: 'Admin@123',
      role: 'admin'
    });

    await User.create({
      name: 'John Contractor',
      email: 'john@buildmart.com',
      password: 'Password@123',
      role: 'customer',
      address: {
        street: '144 Industrial Ave',
        city: 'Dallas',
        state: 'TX',
        postalCode: '75001',
        country: 'USA'
      }
    });

    const categoryDocs = await Category.insertMany([
      { name: 'Cement' },
      { name: 'Bricks' },
      { name: 'Tiles' },
      { name: 'Steel & Rebar' },
      { name: 'Paint & Coating' }
    ]);

    const byName = Object.fromEntries(categoryDocs.map((cat) => [cat.name, cat._id]));

    await Product.insertMany([
      {
        name: 'Portland Cement 50kg',
        description: 'High-strength cement suitable for foundations and structural work.',
        price: 9.5,
        stock: 600,
        weight: 50,
        images: ['/uploads/sample-cement.jpg'],
        category: byName['Cement'],
        rating: 4.6,
        numReviews: 8,
        soldCount: 180,
        featured: true,
        bulkPricing: [
          { minQty: 20, discountPercent: 5 },
          { minQty: 100, discountPercent: 10 }
        ]
      },
      {
        name: 'Clay Bricks (Pack of 100)',
        description: 'Uniform clay bricks for residential and commercial walls.',
        price: 58,
        stock: 240,
        weight: 210,
        images: ['/uploads/sample-brick.jpg'],
        category: byName['Bricks'],
        rating: 4.4,
        numReviews: 5,
        soldCount: 130,
        featured: true,
        bulkPricing: [
          { minQty: 5, discountPercent: 4 },
          { minQty: 15, discountPercent: 9 }
        ]
      },
      {
        name: 'Ceramic Floor Tiles 60x60 (Box)',
        description: 'Durable, scratch-resistant ceramic tiles ideal for high-traffic areas.',
        price: 42,
        stock: 300,
        weight: 22,
        images: ['/uploads/sample-tile.jpg'],
        category: byName['Tiles'],
        rating: 4.8,
        numReviews: 12,
        soldCount: 210,
        featured: false,
        bulkPricing: [
          { minQty: 10, discountPercent: 6 },
          { minQty: 30, discountPercent: 12 }
        ]
      },
      {
        name: 'Rebar TMT 12mm (Bundle)',
        description: 'Corrosion-resistant TMT bars used for reinforced concrete structures.',
        price: 135,
        stock: 150,
        weight: 95,
        images: ['/uploads/sample-rebar.jpg'],
        category: byName['Steel & Rebar'],
        rating: 4.5,
        numReviews: 6,
        soldCount: 90,
        featured: false,
        bulkPricing: [
          { minQty: 3, discountPercent: 3 },
          { minQty: 10, discountPercent: 8 }
        ]
      },
      {
        name: 'Weatherproof Exterior Paint 20L',
        description: 'Long-lasting exterior coating with UV and rain protection.',
        price: 89,
        stock: 180,
        weight: 24,
        images: ['/uploads/sample-paint.jpg'],
        category: byName['Paint & Coating'],
        rating: 4.2,
        numReviews: 4,
        soldCount: 72,
        featured: true,
        bulkPricing: [
          { minQty: 8, discountPercent: 5 },
          { minQty: 20, discountPercent: 11 }
        ]
      }
    ]);

    console.log('Seed completed');
    console.log('Admin login: admin@buildmart.com / Admin@123');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
