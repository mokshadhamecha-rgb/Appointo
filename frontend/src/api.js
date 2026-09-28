const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

export const api = {
  businesses: () => request('/businesses'),
  business: (id) => request(`/businesses/${id}`),
  bookings: () => request('/bookings'),
  createBooking: (payload) => request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  updateBooking: (id, status) => request(`/bookings/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  createBusiness: (payload) => request('/businesses', { method: 'POST', body: JSON.stringify(payload) }),
  createService: (businessId, payload) => request(`/businesses/${businessId}/services`, { method: 'POST', body: JSON.stringify(payload) }),
};
