import { useState, useEffect } from 'react';
import { getStats } from '../services/api';

const ICONS = { total: '👥', New: '🆕', Contacted: '📞', Qualified: '⭐', Converted: '✅', Lost: '❌' };
const COLORS = { total: '#a5b4fc', New: '#60a5fa', Contacted: '#f9a825', Qualified: '#a78bfa', Converted: '#34d399', Lost: '#f87171' };

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStats()
      .then((res) => setStats(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading stats...</div>;
  if (!stats) return null;

  const items = [
    { key: 'total', label: 'Total Leads', value: stats.total },
    { key: 'New', label: 'New', value: stats.New },
    { key: 'Contacted', label: 'Contacted', value: stats.Contacted },
    { key: 'Qualified', label: 'Qualified', value: stats.Qualified },
    { key: 'Converted', label: 'Converted', value: stats.Converted },
    { key: 'Lost', label: 'Lost', value: stats.Lost },
  ];

  return (
    <div className="dashboard">
      <h2>Lead Statistics</h2>
      <div className="stats-grid">
        {items.map(({ key, label, value }) => (
          <div key={key} className="stat-card">
            <div className="stat-icon">{ICONS[key]}</div>
            <div className="stat-value" style={{ color: COLORS[key] }}>{value}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      <div className="funnel-card">
        <h3>Conversion Funnel</h3>
        {['New', 'Contacted', 'Qualified', 'Converted', 'Lost'].map((s) => (
          <div key={s} className="funnel-row">
            <div className="funnel-label" style={{ color: COLORS[s] }}>{s}</div>
            <div className="funnel-bar-bg">
              <div
                className="funnel-bar-fill"
                style={{
                  width: stats.total ? `${(stats[s] / stats.total) * 100}%` : '0%',
                  background: COLORS[s],
                }}
              />
            </div>
            <div className="funnel-count">{stats[s]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
