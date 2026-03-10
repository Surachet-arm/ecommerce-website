import { Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoute from '../components/AdminRoute';
import HomePage from '../pages/HomePage';
import ProductListPage from '../pages/ProductListPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import OrdersPage from '../pages/OrdersPage';
import OrderDetailPage from '../pages/OrderDetailPage';
import AdminDashboardPage from '../pages/AdminDashboardPage';
import AdminProductsPage from '../pages/AdminProductsPage';
import AdminOrdersPage from '../pages/AdminOrdersPage';
import AdminUsersPage from '../pages/AdminUsersPage';

const appRoutes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'product/:id', element: <ProductDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'cart', element: <CartPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'orders/:id', element: <OrderDetailPage /> }
        ]
      },
      {
        element: <AdminRoute />,
        children: [
          { path: 'admin', element: <AdminDashboardPage /> },
          { path: 'admin/products', element: <AdminProductsPage /> },
          { path: 'admin/orders', element: <AdminOrdersPage /> },
          { path: 'admin/users', element: <AdminUsersPage /> }
        ]
      },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
];

export default appRoutes;
