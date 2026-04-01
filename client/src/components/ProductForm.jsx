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
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);

  const loadCategories = async () => {
    const { data } = await categoryService.list();
    setCategories(data);
    return data;
  };

  useEffect(() => {
    loadCategories();
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

  const createCategory = async () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) {
      setCategoryError('กรุณากรอกชื่อหมวดหมู่');
      return;
    }

    try {
      setIsCreatingCategory(true);
      setCategoryError('');
      const { data: createdCategory } = await categoryService.create({ name: trimmedName });
      await loadCategories();
      setForm((current) => ({ ...current, category: current.category || createdCategory._id }));
      setNewCategoryName('');
    } catch (error) {
      setCategoryError(error.response?.data?.message || 'สร้างหมวดหมู่ไม่สำเร็จ');
    } finally {
      setIsCreatingCategory(false);
    }
  };

  return (
    <form className="card grid gap-3" onSubmit={submit}>
      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <input
          className="rounded border p-2"
          placeholder="เพิ่มหมวดหมู่ใหม่"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button className="btn" type="button" onClick={createCategory} disabled={isCreatingCategory}>
          {isCreatingCategory ? 'กำลังเพิ่ม...' : 'เพิ่มหมวดหมู่'}
        </button>
      </div>
      {categoryError && <p className="text-sm text-red-600">{categoryError}</p>}
      <input className="rounded border p-2" placeholder="ชื่อสินค้า" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
      <textarea className="rounded border p-2" placeholder="รายละเอียดสินค้า" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
      <div className="grid gap-3 md:grid-cols-4">
        <input type="number" step="0.01" className="rounded border p-2" placeholder="ราคา" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input type="number" className="rounded border p-2" placeholder="จำนวนคงเหลือ" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
        <input type="number" step="0.1" className="rounded border p-2" placeholder="น้ำหนัก (กก.)" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} required />
        <select className="rounded border p-2" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required>
          <option value="">เลือกหมวดหมู่</option>
          {categories.map((cat) => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
      </div>
      <input className="rounded border p-2" placeholder='ราคาส่ง JSON เช่น [{"minQty":20,"discountPercent":8}]' value={form.bulkPricing} onChange={(e) => setForm({ ...form, bulkPricing: e.target.value })} />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> สินค้าแนะนำ</label>
      <input type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} />
      <button className="btn w-fit" type="submit">บันทึกสินค้า</button>
    </form>
  );
};

export default ProductForm;
