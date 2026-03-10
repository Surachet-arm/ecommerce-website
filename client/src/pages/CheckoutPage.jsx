import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { useCartStore } from '../store/cartStore';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { clearCartLocal } = useCartStore();
  const [form, setForm] = useState({
    shippingAddress: { street: '', city: '', state: '', postalCode: '', country: 'USA' },
    shippingMethod: 'standard',
    paymentMethod: 'card'
  });

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await orderService.create(form);
    clearCartLocal();
    navigate(`/orders?created=${data._id}`);
  };

  return (
    <div className="container-page max-w-3xl">
      <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
      <form className="card grid gap-3" onSubmit={submit}>
        <input className="rounded border p-2" placeholder="Street" value={form.shippingAddress.street} onChange={(e) => setForm({ ...form, shippingAddress: { ...form.shippingAddress, street: e.target.value } })} required />
        <div className="grid gap-3 md:grid-cols-3">
          <input className="rounded border p-2" placeholder="City" value={form.shippingAddress.city} onChange={(e) => setForm({ ...form, shippingAddress: { ...form.shippingAddress, city: e.target.value } })} required />
          <input className="rounded border p-2" placeholder="State" value={form.shippingAddress.state} onChange={(e) => setForm({ ...form, shippingAddress: { ...form.shippingAddress, state: e.target.value } })} required />
          <input className="rounded border p-2" placeholder="Postal code" value={form.shippingAddress.postalCode} onChange={(e) => setForm({ ...form, shippingAddress: { ...form.shippingAddress, postalCode: e.target.value } })} required />
        </div>
        <select className="rounded border p-2" value={form.shippingMethod} onChange={(e) => setForm({ ...form, shippingMethod: e.target.value })}>
          <option value="standard">Standard</option>
          <option value="express">Express</option>
          <option value="pickup">Pickup</option>
        </select>
        <select className="rounded border p-2" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}>
          <option value="card">Credit/Debit Card</option>
          <option value="bank-transfer">Bank Transfer</option>
          <option value="cash-on-delivery">Cash on Delivery</option>
        </select>
        <button className="btn w-fit" type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
