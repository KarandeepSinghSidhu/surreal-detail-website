import type { CSSProperties } from 'react'

export const page = {
  main: { background: '#0a0a0a', minHeight: '100vh' } satisfies CSSProperties,
  hero: {
    padding: '160px 48px 80px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    background: '#111111',
  } satisfies CSSProperties,
  heroInner: { maxWidth: 900, margin: '0 auto' } satisfies CSSProperties,
  accent: { width: 40, height: 3, background: '#F5830A', marginBottom: 24 } satisfies CSSProperties,
  h1: {
    fontSize: 'clamp(36px, 6vw, 64px)',
    fontWeight: 900,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase' as const,
    marginBottom: 20,
    lineHeight: 1.05,
  } satisfies CSSProperties,
  lead: {
    fontSize: 17,
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.6)',
    maxWidth: 640,
  } satisfies CSSProperties,
  section: { padding: '80px 48px' } satisfies CSSProperties,
  sectionInner: { maxWidth: 1200, margin: '0 auto' } satisfies CSSProperties,
  h2: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase' as const,
    marginBottom: 24,
  } satisfies CSSProperties,
  body: { color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: 15 } satisfies CSSProperties,
}
