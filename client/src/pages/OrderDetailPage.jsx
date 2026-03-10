import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../services/orderService';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    orderService.byId(id).then(({ data }) => setOrder(data));
  }, [id]);

  if (!order) return <div className="container-page">Loading...</div>;

  return (
    <div className="container-page max-w-4xl">
      <h1 className="mb-4 text-2xl font-bold">Order Detail</h1>
      <div className="card space-y-2">
        <p>Status: <strong>{order.status}</strong></p>
        <p>Payment: {order.paymentMethod}</p>
        <p>Shipping: {order.shippingMethod} (${order.shippingPrice.toFixed(2)})</p>
        <p>Total: ${order.totalPrice.toFixed(2)}</p>
        <div className="pt-2">
          {order.items.map((item) => <p key={item.product}>{item.name} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
