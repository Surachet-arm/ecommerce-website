import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import MaterialCalculator from '../components/MaterialCalculator';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    productService.list({ featured: true, limit: 4 }).then(({ data }) => setFeatured(data.products));
    productService.list({ bestSelling: true, limit: 4 }).then(({ data }) => setBestSelling(data.products));
    categoryService.list().then(({ data }) => setCategories(data));
  }, []);

  return (
    <div className="container-page space-y-10">
      <section className="rounded-2xl bg-gradient-to-r from-brand-700 to-brand-900 p-8 text-white">
        <h1 className="text-3xl font-bold">วัสดุก่อสร้างพร้อมส่ง รวดเร็วและไว้ใจได้</h1>
        <p className="mt-2 max-w-2xl text-stone-200">ปูน อิฐ กระเบื้อง เหล็ก และวัสดุเคลือบผิว ครบในที่เดียว พร้อมราคาส่งและค่าจัดส่งตามน้ำหนักที่ชัดเจน</p>
        <Link to="/products" className="btn mt-4 inline-block bg-white text-brand-900 hover:bg-stone-100">เลือกซื้อสินค้า</Link>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">สินค้าแนะนำ</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{featured.map((p) => <ProductCard key={p._id} product={p} />)}</div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">สินค้าขายดี</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{bestSelling.map((p) => <ProductCard key={p._id} product={p} />)}</div>
      </section>

      <section className="card">
        <h2 className="mb-4 text-2xl font-bold">เลือกดูตามหมวดหมู่</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link key={cat._id} to={`/products?category=${cat._id}`} className="rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-900">{cat.name}</Link>
          ))}
        </div>
      </section>

      <MaterialCalculator />
    </div>
  );
};

export default HomePage;
