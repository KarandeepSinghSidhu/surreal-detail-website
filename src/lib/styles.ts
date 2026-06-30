export const btn = {
  base: {
    display: 'inline-block',
    padding: '12px 28px',
    borderRadius: 50,
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    transition: 'background 0.2s, border-color 0.2s',
    textDecoration: 'none',
    border: '2px solid transparent',
  },
  orange: {
    background: '#F5830A',
    color: '#fff',
    borderColor: '#F5830A',
  },
  orangeHover: {
    background: '#d4700a',
    borderColor: '#d4700a',
  },
  outline: {
    background: 'transparent',
    color: '#fff',
    borderColor: 'rgba(255,255,255,0.35)',
  },
  outlineHover: {
    borderColor: '#fff',
  },
}