import { create } from 'zustand';
import { cartService } from '../services/cartService';

export const useCartStore = create((set, get) => ({
  cart: { items: [], totalPrice: 0 },
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data } = await cartService.get();
      set({ cart: data, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  upsertItem: async (productId, quantity) => {
    await cartService.add({ productId, quantity });
    return get().fetchCart();
  },

  removeItem: async (id) => {
    await cartService.remove(id);
    return get().fetchCart();
  },

  clearCartLocal: () => set({ cart: { items: [], totalPrice: 0 } })
}));
