const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;
const STORE_PATH = path.join(__dirname, 'data', 'store.json');

app.use(cors({ origin: true }));
app.use(express.json());

function readStore() { return JSON.parse(fs.readFileSync(STORE_PATH, 'utf8')); }
function writeStore(store) { fs.writeFileSync(STORE_PATH, JSON.stringify(store, null, 2)); }
function nextId(items) { return items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1; }

app.get('/', (req, res) => res.json({ name: 'Appointo API', status: 'running' }));
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/businesses', (req, res) => {
  const store = readStore();
  const q = String(req.query.q || '').toLowerCase();
  const category = String(req.query.category || '').toLowerCase();
  const result = store.businesses.filter(b => {
    const matchesQ = !q || `${b.name} ${b.category} ${b.location} ${b.description} ${b.services.map(s => s.name).join(' ')}`.toLowerCase().includes(q);
    const matchesCategory = !category || b.category.toLowerCase() === category;
    return matchesQ && matchesCategory;
  });
  res.json(result);
});

app.get('/api/businesses/:id', (req, res) => {
  const store = readStore();
  const business = store.businesses.find(b => b.id === Number(req.params.id));
  if (!business) return res.status(404).json({ error: 'Business not found' });
  res.json(business);
});

app.post('/api/businesses', (req, res) => {
  const { name, category, location, description = '', rating = 0 } = req.body;
  if (!name || !category || !location) return res.status(400).json({ error: 'Name, category and location are required' });
  const store = readStore();
  const business = { id: nextId(store.businesses), name: String(name).trim(), category: String(category).trim(), location: String(location).trim(), description: String(description).trim(), rating: Number(rating) || 0, services: [] };
  store.businesses.push(business); writeStore(store); res.status(201).json(business);
});

app.post('/api/businesses/:id/services', (req, res) => {
  const { name, description = '', duration, price } = req.body;
  const store = readStore();
  const business = store.businesses.find(b => b.id === Number(req.params.id));
  if (!business) return res.status(404).json({ error: 'Business not found' });
  if (!name || !Number(duration) || Number(price) < 0) return res.status(400).json({ error: 'Valid service name, duration and price are required' });
  const allServices = store.businesses.flatMap(b => b.services || []);
  const service = { id: nextId(allServices), name: String(name).trim(), description: String(description).trim(), duration: Number(duration), price: Number(price) };
  business.services.push(service); writeStore(store); res.status(201).json(business);
});

app.get('/api/bookings', (req, res) => {
  const store = readStore();
  const result = store.bookings.map(b => {
    const business = store.businesses.find(x => x.id === b.business_id);
    const service = business?.services.find(x => x.id === b.service_id);
    return { ...b, business_name: business?.name || 'Unknown business', service_name: service?.name || 'Unknown service' };
  }).sort((a,b) => `${b.booking_date} ${b.booking_time}`.localeCompare(`${a.booking_date} ${a.booking_time}`));
  res.json(result);
});

app.post('/api/bookings', (req, res) => {
  const { business_id, service_id, customer_name, customer_email, booking_date, booking_time } = req.body;
  if (!business_id || !service_id || !customer_name || !customer_email || !booking_date || !booking_time) return res.status(400).json({ error: 'All booking fields are required' });
  const store = readStore();
  const business = store.businesses.find(b => b.id === Number(business_id));
  const service = business?.services.find(s => s.id === Number(service_id));
  if (!business || !service) return res.status(404).json({ error: 'Business or service not found' });
  const requestedStart = new Date(`${booking_date}T${booking_time}:00`);
  const requestedEnd = new Date(requestedStart.getTime() + Number(service.duration) * 60000);
  if (Number.isNaN(requestedStart.getTime())) return res.status(400).json({ error: 'Invalid date or time' });
  const conflict = store.bookings.some(existing => {
    if (existing.business_id !== Number(business_id) || existing.booking_date !== booking_date || existing.status === 'cancelled') return false;
    const existingService = business.services.find(s => s.id === existing.service_id);
    const start = new Date(`${existing.booking_date}T${existing.booking_time}:00`);
    const end = new Date(start.getTime() + Number(existingService?.duration || 30) * 60000);
    return requestedStart < end && start < requestedEnd;
  });
  if (conflict) return res.status(409).json({ error: 'This time overlaps an existing booking' });
  const booking = { id: nextId(store.bookings), business_id: Number(business_id), service_id: Number(service_id), customer_name: String(customer_name).trim(), customer_email: String(customer_email).trim(), booking_date, booking_time, status: 'confirmed', created_at: new Date().toISOString() };
  store.bookings.push(booking); writeStore(store); res.status(201).json({ message: 'Booking created successfully', booking });
});

app.patch('/api/bookings/:id', (req, res) => {
  const allowed = ['confirmed', 'completed', 'cancelled'];
  const { status } = req.body;
  if (!allowed.includes(status)) return res.status(400).json({ error: 'Invalid status' });
  const store = readStore();
  const booking = store.bookings.find(b => b.id === Number(req.params.id));
  if (!booking) return res.status(404).json({ error: 'Booking not found' });
  booking.status = status; writeStore(store); res.json(booking);
});

app.listen(PORT, () => console.log(`Appointo API running on port ${PORT}`));
