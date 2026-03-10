import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const CartPage = () => {
  const { cart, fetchCart, removeItem, upsertItem } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="container-page">
      <h1 className="mb-4 text-2xl font-bold">Cart</h1>
      <div className="space-y-3">
        {cart.items.map((item) => (
          <div key={item._id} className="card flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-sm text-stone-600">Unit ${item.unitPrice.toFixed(2)} | Line ${item.lineTotal.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" min="1" className="w-20 rounded border p-2" value={item.quantity} onChange={(e) => upsertItem(item.product._id, Number(e.target.value))} />
              <button className="btn-outline" onClick={() => removeItem(item._id)} type="button">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 card">
        <p className="text-lg font-bold">Total: ${cart.totalPrice.toFixed(2)}</p>
        <Link to="/checkout" className="btn mt-3 inline-block">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default CartPage;
