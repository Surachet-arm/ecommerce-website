import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { productService } from '../services/productService';
import { useCartStore } from '../store/cartStore';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { upsertItem } = useCartStore();
  const [payload, setPayload] = useState({ product: null, relatedProducts: [] });
  const [qty, setQty] = useState(1);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [preview, setPreview] = useState(null);

  const product = payload.product;

  useEffect(() => {
    productService.byId(id).then(({ data }) => setPayload(data));
  }, [id]);

  useEffect(() => {
    if (product) {
      productService.bulkPreview({ productId: product._id, quantity: qty }).then(({ data }) => setPreview(data));
    }
  }, [product, qty]);

  const average = useMemo(() => product?.rating?.toFixed(1) || '0.0', [product]);

  const addToCart = async () => {
    await upsertItem(product._id, qty);
    alert('Added to cart');
  };

  const submitReview = async (e) => {
    e.preventDefault();
    await productService.addReview(product._id, review);
    setReview({ rating: 5, comment: '' });
    const { data } = await productService.byId(id);
    setPayload(data);
  };

  if (!product) return <div className="container-page">Loading...</div>;

  return (
    <div className="container-page space-y-8">
      <section className="grid gap-6 md:grid-cols-2">
        <img src={`${import.meta.env.VITE_ASSET_URL || 'http://localhost:5000'}${product.images?.[0] || ''}`} alt={product.name} className="h-96 w-full rounded-xl object-cover bg-stone-100" />
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-stone-600">{product.description}</p>
          <p className="text-lg font-semibold">Price: ${product.price.toFixed(2)}</p>
          <p className="text-sm text-stone-600">Stock: {product.stock} | Rating: {average}</p>
          <p className="text-sm text-stone-600">Weight: {product.weight}kg</p>
          <div className="flex items-center gap-3">
            <input type="number" min="1" max={product.stock} className="w-24 rounded border p-2" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
            <button type="button" className="btn" onClick={addToCart}>Add to Cart</button>
          </div>
          {preview && <p className="rounded bg-brand-100 p-2 text-sm">Bulk pricing total for {qty} units: ${preview.total.toFixed(2)} (unit ${preview.unitPrice.toFixed(2)})</p>}
        </div>
      </section>

      <section className="card">
        <h2 className="mb-3 text-xl font-bold">Reviews</h2>
        <div className="space-y-2">
          {(product.reviews || []).map((r) => <p key={r._id} className="rounded bg-stone-100 p-2 text-sm"><strong>{r.name}</strong> ({r.rating}/5): {r.comment}</p>)}
        </div>
        <form onSubmit={submitReview} className="mt-4 grid gap-2 md:grid-cols-3">
          <select className="rounded border p-2" value={review.rating} onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}>{[5,4,3,2,1].map((n) => <option key={n}>{n}</option>)}</select>
          <input className="rounded border p-2 md:col-span-2" placeholder="Write a review" value={review.comment} onChange={(e) => setReview({ ...review, comment: e.target.value })} required />
          <button className="btn w-fit" type="submit">Submit Review</button>
        </form>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold">Related Products</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{payload.relatedProducts.map((p) => <ProductCard key={p._id} product={p} />)}</div>
      </section>
    </div>
  );
};

export default ProductDetailPage;
