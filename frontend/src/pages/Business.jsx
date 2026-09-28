import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import { api } from '../api';

export default function Business() {
  const { id } = useParams(); const [business, setBusiness] = useState(null); const [error, setError] = useState('');
  useEffect(() => { api.business(id).then(setBusiness).catch(e => setError(e.message)); }, [id]);
  if (error) return <section className="section"><div className="container"><div className="alert error">{error}</div><Link to="/explore" className="btn btn-dark">Back to Explore</Link></div></section>;
  if (!business) return <section className="section"><div className="container empty">Loading...</div></section>;
  return <section className="section"><div className="container"><Link to="/explore" className="back-link">← Back to Explore</Link><div className="business-hero"><div className="business-logo">{business.category === 'Beauty & Salon' ? '✂️' : business.category === 'Fitness' ? '🏋️' : business.category === 'Education' ? '📚' : '📅'}</div><div><span className="eyebrow">{business.category}</span><h1>{business.name}</h1><p className="muted">{business.location} · ★ {business.rating}</p><p>{business.description}</p></div></div><div className="section-head compact"><div><span className="eyebrow">SERVICES</span><h2>Choose a service</h2></div></div><div className="service-list">{business.services.map(s => <ServiceCard key={s.id} businessId={business.id} service={s} />)}</div></div></section>;
}
