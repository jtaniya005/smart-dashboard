const COLORS = {
  New:       { bg: '#1e3a5f', color: '#60a5fa' },
  Contacted: { bg: '#3d2e05', color: '#f9a825' },
  Qualified: { bg: '#2e1f5e', color: '#a78bfa' },
  Converted: { bg: '#064e3b', color: '#34d399' },
  Lost:      { bg: '#450a0a', color: '#f87171' },
};

export default function StatusBadge({ status }) {
  const c = COLORS[status] || COLORS.New;
  return (
    <span style={{ background: c.bg, color: c.color, borderRadius: 20, padding: '3px 12px', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>
      {status}
    </span>
  );
}
