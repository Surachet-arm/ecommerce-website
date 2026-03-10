import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ totalSales: 0, orderCount: 0, productCount: 0 });

  useEffect(() => {
    orderService.dashboard().then(({ data }) => setStats(data));
  }, []);

  return (
    <div className="container-page space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="text-sm text-stone-500">Total Sales</p><p className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</p></div>
        <div className="card"><p className="text-sm text-stone-500">Orders</p><p className="text-2xl font-bold">{stats.orderCount}</p></div>
        <div className="card"><p className="text-sm text-stone-500">Products</p><p className="text-2xl font-bold">{stats.productCount}</p></div>
      </div>
      <div className="flex gap-3">
        <Link to="/admin/products" className="btn">Manage Products</Link>
        <Link to="/admin/orders" className="btn-outline">Manage Orders</Link>
        <Link to="/admin/users" className="btn-outline">Manage Users</Link>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
