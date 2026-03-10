# BuildMart - Construction Materials E-commerce

Full-stack e-commerce application for construction materials using React + Express + MongoDB.

## Tech Stack

- Frontend: Vite, React, TailwindCSS, React Router, Axios, Zustand
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt, Multer

## Project Structure

```text
root/
? client/
³  ? src/
³  ³  ? components/
³  ³  ? pages/
³  ³  ? services/
³  ³  ? store/
³  ³  ? router/
³  ³  ? App.jsx
³  ³  À main.jsx
? server/
³  ? controllers/
³  ? models/
³  ? routes/
³  ? middleware/
³  ? config/
³  ? scripts/
³  À server.js
À README.md
```

## Features

- Customer storefront with home, product listing, product detail, cart, checkout, profile, and order history
- Admin dashboard for stats, product CRUD (with image upload), order status management, and user management
- Authentication with JWT
- Bulk pricing by quantity tiers
- Shipping calculation based on total order weight
- Material calculator for cement, bricks, and tiles
- Seed data for categories, products, admin/customer users

## API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `PUT /api/auth/profile`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (admin)
- `PUT /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)
- `POST /api/products/:id/reviews`

### Categories
- `GET /api/categories`
- `POST /api/categories` (admin)

### Cart
- `GET /api/cart`
- `POST /api/cart`
- `DELETE /api/cart/:id`

### Orders
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/status` (admin)
- `GET /api/orders/dashboard/stats` (admin)

### Users
- `GET /api/users` (admin)

## MongoDB Schemas

- User: name, email, password, role, address
- Product: name, description, price, stock, images, category, rating, bulkPricing, weight, reviews
- Category: name
- Cart: user, products
- Order: user, items, totalPrice, status, shippingAddress, paymentMethod, shippingMethod

## Setup

1. Install dependencies

```bash
npm install
npm --prefix server install
npm --prefix client install
```

2. Configure environment

- Server env: `server/.env`
- Client env: `client/.env`

3. Seed database

```bash
npm run seed
```

4. Run app (client + server)

```bash
npm run dev
```

- Client: `http://localhost:5173`
- Server: `http://localhost:5000`

## Seed Credentials

- Admin: `admin@buildmart.com` / `Admin@123`
- Customer: `john@buildmart.com` / `Password@123`

## Notes

- Uploaded product images are stored in `server/uploads/`
- If you use real image URLs in seed data, update the `images` field values in `server/scripts/seed.js`
