import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';

const ProductListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ products: [], page: 1, pages: 1 });
  const [categories, setCategories] = useState([]);

  const page = Number(searchParams.get('page') || 1);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const load = () => {
    productService.list({ page, search, category }).then(({ data: res }) => setData(res));
  };

  useEffect(() => {
    load();
    categoryService.list().then(({ data }) => setCategories(data));
  }, [page, search, category]);

  return (
    <div className="container-page">
      <h1 className="mb-4 text-2xl font-bold">สินค้า</h1>
      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <input className="rounded border p-2" placeholder="ค้นหาสินค้า" value={search} onChange={(e) => setSearchParams({ search: e.target.value, category, page: 1 })} />
        <select className="rounded border p-2" value={category} onChange={(e) => setSearchParams({ search, category: e.target.value, page: 1 })}>
          <option value="">ทุกหมวดหมู่</option>
          {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{data.products.map((p) => <ProductCard key={p._id} product={p} />)}</div>
      <Pagination page={data.page} pages={data.pages} onPageChange={(p) => setSearchParams({ search, category, page: p })} />
    </div>
  );
};

export default ProductListPage;
