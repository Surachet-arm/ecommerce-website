import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import { productService } from '../services/productService';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => {
    productService.list({ limit: 200 }).then(({ data }) => setProducts(data.products));
  };

  useEffect(() => {
    load();
  }, []);

  const create = async (fd) => {
    await productService.create(fd);
    load();
  };

  const update = async (fd) => {
    await productService.update(editing._id, fd);
    setEditing(null);
    load();
  };

  const remove = async (id) => {
    await productService.remove(id);
    load();
  };

  const initialEdit = editing && {
    name: editing.name,
    description: editing.description,
    price: editing.price,
    stock: editing.stock,
    weight: editing.weight,
    category: editing.category?._id || editing.category,
    featured: editing.featured,
    bulkPricing: JSON.stringify(editing.bulkPricing || [])
  };

  return (
    <div className="container-page space-y-6">
      <h1 className="text-2xl font-bold">Manage Products</h1>
      <ProductForm onSubmit={editing ? update : create} initial={initialEdit} />
      {editing && <button type="button" className="btn-outline" onClick={() => setEditing(null)}>Cancel Edit</button>}
      <div className="space-y-2">
        {products.map((p) => (
          <div key={p._id} className="card flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-stone-600">${p.price.toFixed(2)} | Stock {p.stock}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="btn-outline" onClick={() => setEditing(p)}>Edit</button>
              <button type="button" className="btn-outline border-red-600 text-red-600" onClick={() => remove(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsPage;
