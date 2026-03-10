import api from './api';

export const productService = {
  list: (params) => api.get('/products', { params }),
  byId: (id) => api.get(`/products/${id}`),
  create: (formData) => api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, formData) => api.put(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id) => api.delete(`/products/${id}`),
  addReview: (id, payload) => api.post(`/products/${id}/reviews`, payload),
  bulkPreview: (params) => api.get('/products/bulk-preview', { params })
};
