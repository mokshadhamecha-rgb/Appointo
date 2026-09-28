import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BusinessCard from '../components/BusinessCard';
import { api } from '../api';

export default function Explore() {
  const [businesses, setBusinesses] = useState([]); const [loading, setLoading] = useState(true); const [error, setError] = useState('');
  const [params] = useSearchParams(); const [query, setQuery] = useState(''); const [category, setCategory] = useState(params.get('category') || 'All');
  useEffect(() => { api.businesses().then(setBusinesses).catch(e => setError(e.message)).finally(() => setLoading(false)); }, []);
  const categories = ['All', ...new Set(businesses.map(b => b.category))];
  const filtered = useMemo(() => businesses.filter(b => (category === 'All' || b.category === category) && `${b.name} ${b.category} ${b.location}`.toLowerCase().includes(query.toLowerCase())), [businesses, query, category]);
  return <section className="section"><div className="container"><div className="page-heading"><span className="eyebrow">DISCOVER</span><h1>Explore businesses</h1><p>Find the right service and book a time that works for you.</p></div><div className="filters"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search businesses or services..." /><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></div>{loading && <div className="empty">Loading businesses...</div>}{error && <div className="alert error">{error}. Start the Appointo backend on port 5000.</div>}{!loading && !error && <><div className="result-line">{filtered.length} business{filtered.length !== 1 ? 'es' : ''} found</div><div className="business-grid">{filtered.map(b => <BusinessCard key={b.id} business={b} />)}</div>{filtered.length === 0 && <div className="empty">No businesses match your search.</div>}</>}</div></section>;
}
