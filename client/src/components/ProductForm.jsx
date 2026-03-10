import { useEffect, useState } from 'react';
import { categoryService } from '../services/categoryService';

const defaultForm = {
  name: '', description: '', price: 0, stock: 0, weight: 1, category: '', featured: false,
  bulkPricing: '[{"minQty":10,"discountPercent":5}]'
};

const ProductForm = ({ onSubmit, initial }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(initial || defaultForm);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    categoryService.list().then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    setForm(initial || defaultForm);
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    Array.from(files).forEach((file) => fd.append('images', file));
    onSubmit(fd);
  };

  return (
    <form className="card grid gap-3" onSubmit={submit}>
      <input className="rounded border p-2" placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <textarea className="rounded border p-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
      <div className="grid gap-3 md:grid-cols-4">
        <input type="number" step="0.01" className="rounded border p-2" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="number" className="rounded border p-2" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
        <input type="number" step="0.1" className="rounded border p-2" placeholder="Weight (kg)" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} required />
        <select className="rounded border p-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
          <option value="">Select category</option>
          {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
      </div>
      <input className="rounded border p-2" placeholder='Bulk pricing JSON e.g. [{"minQty":20,"discountPercent":8}]' value={form.bulkPricing} onChange={(e) => setForm({ ...form, bulkPricing: e.target.value })} />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
      <input type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} />
      <button className="btn w-fit" type="submit">Save Product</button>
    </form>
  );
};

export default ProductForm;
