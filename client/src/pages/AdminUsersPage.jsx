import { useEffect, useState } from 'react';
import { userService } from '../services/userService';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService.list().then(({ data }) => setUsers(data));
  }, []);

  return (
    <div className="container-page">
      <h1 className="mb-4 text-2xl font-bold">Manage Users</h1>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user._id} className="card flex items-center justify-between">
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-stone-600">{user.email}</p>
            </div>
            <p className="rounded bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-900">{user.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsersPage;
