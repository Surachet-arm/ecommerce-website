import { create } from 'zustand';
import { authService } from '../services/authService';

export const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: '',

  hydrateUser: () => {
    const cached = localStorage.getItem('buildmart_user');
    if (cached) set({ user: JSON.parse(cached) });
  },

  login: async (payload) => {
    set({ loading: true, error: '' });
    try {
      const { data } = await authService.login(payload);
      localStorage.setItem('buildmart_user', JSON.stringify(data));
      set({ user: data, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'เข้าสู่ระบบไม่สำเร็จ', loading: false });
      return false;
    }
  },

  register: async (payload) => {
    set({ loading: true, error: '' });
    try {
      const { data } = await authService.register(payload);
      localStorage.setItem('buildmart_user', JSON.stringify(data));
      set({ user: data, loading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || 'สมัครสมาชิกไม่สำเร็จ', loading: false });
      return false;
    }
  },

  refreshProfile: async () => {
    try {
      const { data } = await authService.profile();
      const merged = { ...get().user, ...data };
      localStorage.setItem('buildmart_user', JSON.stringify(merged));
      set({ user: merged });
    } catch {
      localStorage.removeItem('buildmart_user');
      set({ user: null });
    }
  },

  logout: () => {
    localStorage.removeItem('buildmart_user');
    set({ user: null });
  }
}));
