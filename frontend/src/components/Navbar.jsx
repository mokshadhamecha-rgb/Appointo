import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <NavLink to="/" className="brand"><span className="brand-mark">A</span><span>Appointo</span></NavLink>
        <nav className="nav-links">
          <NavLink to="/explore" className={linkClass}>Explore</NavLink>
          <NavLink to="/bookings" className={linkClass}>My Bookings</NavLink>
          <NavLink to="/dashboard" className={linkClass}>Owner Dashboard</NavLink>
        </nav>
        <NavLink to="/add-business" className="btn btn-primary nav-cta">List Your Business</NavLink>
      </div>
    </header>
  );
}
