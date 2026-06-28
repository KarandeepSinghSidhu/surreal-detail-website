export default function StatsBar() {
  const stats = [
    { value: '200+', label: 'Cars Detailed' },
    { value: '5★', label: 'Average Rating' },
    { value: 'GTechniq', label: 'Certified Installer' },
    { value: '5yr+', label: 'Ceramic Warranty' },
  ]
  return (
    <div style={{
      background: '#111111',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 48px',
    }}>
      <div style={{
        maxWidth: 1320, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {stats.map((s, i) => (
          <div key={s.label} style={{
            padding: '28px 0',
            borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            paddingLeft: i > 0 ? 40 : 0,
            paddingRight: 40,
          }}>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#F5830A', letterSpacing: '-0.03em', marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
