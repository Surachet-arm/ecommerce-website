import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.list().then(({ data }) => setOrders(data));
  }, []);

  return (
    <div className="container-page">
      <h1 className="mb-4 text-2xl font-bold">Orders</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="card flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">Order #{order._id.slice(-6)}</p>
              <p className="text-sm text-stone-600">Status: {order.status} | Total: ${order.totalPrice.toFixed(2)}</p>
            </div>
            <Link to={`/orders/${order._id}`} className="btn-outline w-fit">Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
