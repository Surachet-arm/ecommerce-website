import api from './api';

export const orderService = {
  create: (payload) => api.post('/orders', payload),
  list: () => api.get('/orders'),
  byId: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, payload) => api.put(`/orders/${id}/status`, payload),
  dashboard: () => api.get('/orders/dashboard/stats')
};
