import api from './api';

export const cartService = {
  get: () => api.get('/cart'),
  add: (payload) => api.post('/cart', payload),
  remove: (id) => api.delete(`/cart/${id}`)
};
