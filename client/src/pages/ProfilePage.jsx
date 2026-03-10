import { useState } from 'react';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';

const ProfilePage = () => {
  const { user, refreshProfile } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    address: user?.address || { street: '', city: '', state: '', postalCode: '', country: 'USA' }
  });

  const submit = async (e) => {
    e.preventDefault();
    await authService.updateProfile(form);
    await refreshProfile();
    alert('Profile updated');
  };

  return (
    <div className="container-page max-w-3xl">
      <h1 className="mb-4 text-2xl font-bold">Profile</h1>
      <form className="card grid gap-3" onSubmit={submit}>
        <input className="rounded border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="rounded border p-2" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="rounded border p-2" type="password" placeholder="New password (optional)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <input className="rounded border p-2" placeholder="Street" value={form.address.street || ''} onChange={(e) => setForm({ ...form, address: { ...form.address, street: e.target.value } })} />
        <div className="grid gap-3 md:grid-cols-3">
          <input className="rounded border p-2" placeholder="City" value={form.address.city || ''} onChange={(e) => setForm({ ...form, address: { ...form.address, city: e.target.value } })} />
          <input className="rounded border p-2" placeholder="State" value={form.address.state || ''} onChange={(e) => setForm({ ...form, address: { ...form.address, state: e.target.value } })} />
          <input className="rounded border p-2" placeholder="Postal code" value={form.address.postalCode || ''} onChange={(e) => setForm({ ...form, address: { ...form.address, postalCode: e.target.value } })} />
        </div>
        <button className="btn w-fit" type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
