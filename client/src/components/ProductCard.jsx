import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <article className="card flex h-full flex-col">
    <img
      src={`${import.meta.env.VITE_ASSET_URL || 'http://localhost:5000'}${product.images?.[0] || ''}`}
      alt={product.name}
      className="mb-3 h-44 w-full rounded-md object-cover bg-stone-100"
    />
    <h3 className="text-base font-semibold">{product.name}</h3>
    <p className="mt-1 text-sm text-stone-600">{product.category?.name}</p>
    <p className="mt-1 text-lg font-bold text-brand-700">฿{product.price.toFixed(2)}</p>
    <p className="text-xs text-stone-500">คงเหลือ: {product.stock}</p>
    <Link to={`/product/${product._id}`} className="btn mt-auto text-center">ดูรายละเอียด</Link>
  </article>
);

export default ProductCard;
