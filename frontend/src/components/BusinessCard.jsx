import { Link } from 'react-router-dom';

const icons = { 'Beauty & Salon': '✂️', Fitness: '🏋️', Education: '📚', Healthcare: '🩺', 'Home Services': '🛠️', Consulting: '💼' };

export default function BusinessCard({ business }) {
  return (
    <article className="business-card">
      <div className="business-cover"><span>{icons[business.category] || '📅'}</span><small>{business.category}</small></div>
      <div className="business-card-body">
        <div className="business-title-row"><h3>{business.name}</h3><span className="rating">★ {business.rating}</span></div>
        <p className="muted">{business.location}</p>
        <p>{business.description}</p>
        <div className="card-bottom"><span>{business.services?.length || 0} services</span><Link className="btn btn-dark" to={`/business/${business.id}`}>View & Book</Link></div>
      </div>
    </article>
  );
}
