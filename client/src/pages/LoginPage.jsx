import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, loading } = useAuthStore();
  const [form, setForm] = useState({ email: '', password: '' });

  const submit = async (e) => {
    e.preventDefault();
    const ok = await login(form);
    if (ok) navigate('/');
  };

  return (
    <div className="container-page max-w-md">
      <h1 className="mb-4 text-2xl font-bold">เข้าสู่ระบบ</h1>
      <form className="card grid gap-3" onSubmit={submit}>
        <input className="rounded border p-2" type="email" placeholder="อีเมล" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="rounded border p-2" type="password" placeholder="รหัสผ่าน" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="btn" type="submit" disabled={loading}>เข้าสู่ระบบ</button>
        <div>บัญชีสำหรับทดลอง</div>
        <tr>บัญชี admin</tr>
        <tr>surachet@gmail.com</tr>
        <tr>12345</tr>
        <tr>บัญชี user</tr>
        <tr>test@gmail.com</tr>
        <tr>1234</tr>
      </form>
      <p className="mt-3 text-sm">ยังไม่มีบัญชี? <Link className="text-brand-700" to="/register">สมัครสมาชิก</Link></p>
    </div>
  );
};

export default LoginPage;
