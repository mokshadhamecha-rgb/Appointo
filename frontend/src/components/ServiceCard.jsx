import { Link } from 'react-router-dom';

export default function ServiceCard({ businessId, service }) {
  return (
    <div className="service-card">
      <div><h3>{service.name}</h3><p className="muted">{service.description || 'Professional appointment service.'}</p></div>
      <div className="service-meta"><strong>₹{Number(service.price).toLocaleString('en-IN')}</strong><span>{service.duration} min</span><Link className="btn btn-primary" to={`/booking/${businessId}/${service.id}`}>Book Now</Link></div>
    </div>
  );
}
