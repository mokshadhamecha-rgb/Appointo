import { Link } from 'react-router-dom';

const categories = [
  ['✂️', 'Beauty & Salon'], ['🏋️', 'Fitness'], ['📚', 'Education'], ['🩺', 'Healthcare'], ['🛠️', 'Home Services'], ['💼', 'Consulting']
];

export default function Home() {
  return <>
    <section className="hero"><div className="container hero-grid">
      <div><span className="eyebrow">APPOINTMENTS, SIMPLIFIED</span><h1>Book your time.<br /><span>Skip the waiting.</span></h1><p>Discover trusted businesses, choose a service, pick a time and get booked in minutes.</p><div className="hero-actions"><Link to="/explore" className="btn btn-primary btn-large">Explore Businesses</Link><Link to="/add-business" className="btn btn-ghost btn-large">List Your Business</Link></div><div className="trust-row"><span>✓ No phone calls</span><span>✓ Instant confirmation</span><span>✓ Simple booking</span></div></div>
      <div className="hero-card"><div className="floating-chip">● Available today</div><div className="mock-window"><div className="mock-top"><span>Appointo</span><span>9:41</span></div><div className="mock-business"><div className="mock-icon">✂️</div><div><strong>Glow Beauty Studio</strong><small>Beauty & Salon</small></div></div><div className="mock-service"><span>Hair Styling</span><strong>₹400</strong></div><div className="mock-calendar"><span>MON</span><b>18</b><span>SEP</span></div><div className="mock-slots"><span>10:00</span><span className="selected">10:30</span><span>11:00</span><span>11:30</span></div><button>Confirm Booking</button></div></div>
    </div></section>
    <section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">BROWSE BY CATEGORY</span><h2>Find a service for almost anything.</h2></div><Link to="/explore" className="text-link">See all →</Link></div><div className="category-grid">{categories.map(([icon, name]) => <Link to={`/explore?category=${encodeURIComponent(name)}`} className="category-tile" key={name}><span>{icon}</span><strong>{name}</strong><small>Explore services</small></Link>)}</div></div></section>
    <section className="section section-soft"><div className="container stats"><div><strong>1 place</strong><span>for your appointments</span></div><div><strong>6+ categories</strong><span>and growing</span></div><div><strong>24/7</strong><span>booking access</span></div></div></section>
  </>;
}
