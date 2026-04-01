import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../services/orderService';

const statusLabel = {
  pending: 'รอดำเนินการ',
  processing: 'กำลังเตรียมสินค้า',
  shipped: 'จัดส่งแล้ว',
  delivered: 'ส่งสำเร็จ',
  cancelled: 'ยกเลิกแล้ว'
};

const paymentLabel = {
  card: 'บัตรเครดิต/เดบิต',
  'bank-transfer': 'โอนผ่านธนาคาร',
  'cash-on-delivery': 'เก็บเงินปลายทาง'
};

const shippingLabel = {
  standard: 'จัดส่งมาตรฐาน',
  express: 'จัดส่งด่วน',
  pickup: 'รับสินค้าที่ร้าน'
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    orderService.byId(id).then(({ data }) => setOrder(data));
  }, [id]);

  if (!order) return <div className="container-page">กำลังโหลด...</div>;

  return (
    <div className="container-page max-w-4xl">
      <h1 className="mb-4 text-2xl font-bold">รายละเอียดคำสั่งซื้อ</h1>
      <div className="card space-y-2">
        <p>สถานะ: <strong>{statusLabel[order.status] || order.status}</strong></p>
        <p>การชำระเงิน: {paymentLabel[order.paymentMethod] || order.paymentMethod}</p>
        <p>การจัดส่ง: {shippingLabel[order.shippingMethod] || order.shippingMethod} (฿{order.shippingPrice.toFixed(2)})</p>
        <p>รวมทั้งหมด: ฿{order.totalPrice.toFixed(2)}</p>
        <div className="pt-2">
          {order.items.map((item) => <p key={item.product}>{item.name} x {item.quantity} = ฿{(item.price * item.quantity).toFixed(2)}</p>)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
