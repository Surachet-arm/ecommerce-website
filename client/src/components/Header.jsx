import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { cart } = useCartStore();

  const cartCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const onLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-2xl font-bold text-brand-700">สุรเชษฐมาร์ท</Link>
        <nav className="flex items-center gap-4 text-sm font-semibold">
          <NavLink to="/products" className="hover:text-brand-700">สินค้า</NavLink>
          <NavLink to="/cart" className="hover:text-brand-700">ตะกร้า ({cartCount})</NavLink>
          {user ? (
            <>
              <NavLink to="/orders" className="hover:text-brand-700">คำสั่งซื้อ</NavLink>
              <NavLink to="/profile" className="hover:text-brand-700">โปรไฟล์</NavLink>
              {user.role === 'admin' && <NavLink to="/admin" className="hover:text-brand-700">หลังบ้าน</NavLink>}
              <button type="button" onClick={onLogout} className="btn-outline">ออกจากระบบ</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-brand-700">เข้าสู่ระบบ</NavLink>
              <NavLink to="/register" className="btn">สมัครสมาชิก</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
