import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';

const statusLabel = {
  pending: 'รอดำเนินการ',
  processing: 'กำลังเตรียมสินค้า',
  shipped: 'จัดส่งแล้ว',
  delivered: 'ส่งสำเร็จ',
  cancelled: 'ยกเลิกแล้ว'
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.list().then(({ data }) => setOrders(data));
  }, []);

  return (
    <div className="container-page">
      <h1 className="mb-4 text-2xl font-bold">คำสั่งซื้อของฉัน</h1>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="card flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">คำสั่งซื้อ #{order._id.slice(-6)}</p>
              <p className="text-sm text-stone-600">สถานะ: {statusLabel[order.status] || order.status} | รวม: ฿{order.totalPrice.toFixed(2)}</p>
            </div>
            <Link to={`/orders/${order._id}`} className="btn-outline w-fit">ดูรายละเอียด</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
