import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const load = () => orderService.list().then(({ data }) => setOrders(data));

  useEffect(() => {
    load();
  }, []);

  const changeStatus = async (id, status) => {
    await orderService.updateStatus(id, { status });
    load();
  };

  return (
    <div className="container-page">
      <h1 className="mb-4 text-2xl font-bold">Manage Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">Order #{order._id.slice(-6)}</p>
              <p className="text-sm text-stone-600">{order.user?.email} | ${order.totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="rounded border p-2" value={order.status} onChange={(e) => changeStatus(order._id, e.target.value)}>
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <Link to={`/orders/${order._id}`} className="btn-outline">Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
