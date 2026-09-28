import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Business from './pages/Business';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import Dashboard from './pages/Dashboard';
import AddBusiness from './pages/AddBusiness';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/business/:id" element={<Business />} />
          <Route path="/booking/:businessId/:serviceId" element={<Booking />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-business" element={<AddBusiness />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="container footer-inner">
          <strong>Appointo</strong>
          <span>One Place to Book.</span>
          <span>© {new Date().getFullYear()} Appointo MVP</span>
        </div>
      </footer>
    </div>
  );
}
