import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, error, loading } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    const ok = await register(form);
    if (ok) navigate('/');
  };

  return (
    <div className="container-page max-w-md">
      <h1 className="mb-4 text-2xl font-bold">สมัครสมาชิก</h1>
      <form className="card grid gap-3" onSubmit={submit}>
        <input className="rounded border p-2" placeholder="ชื่อ" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className="rounded border p-2" type="email" placeholder="อีเมล" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="rounded border p-2" type="password" placeholder="รหัสผ่าน" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn" type="submit" disabled={loading}>สร้างบัญชี</button>
      </form>
      <p className="mt-3 text-sm">มีบัญชีอยู่แล้ว? <Link className="text-brand-700" to="/login">เข้าสู่ระบบ</Link></p>
    </div>
  );
};

export default RegisterPage;
