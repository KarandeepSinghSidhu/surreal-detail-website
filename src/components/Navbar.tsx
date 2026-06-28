'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/#services', label: 'Services' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px',
      background: scrolled ? 'rgba(0,0,0,0.95)' : '#0a0a0a',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      transition: 'background 0.3s',
    }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 80 }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* SD monogram replicating the logo colours */}
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <rect width="38" height="38" rx="4" fill="#111"/>
            {/* Grey S top */}
            <path d="M10 10 Q10 6 14 6 L26 6 Q30 6 30 10 L30 14 Q30 18 26 18 L14 18" stroke="#8C8C8C" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
            {/* Orange D bottom */}
            <path d="M12 20 L20 20 Q30 20 30 28 L30 28 Q30 34 20 34 L12 34 Z" fill="#F5830A"/>
            {/* Diagonal slash */}
            <line x1="28" y1="8" x2="10" y2="34" stroke="#F5830A" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <div>
            <div style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.02em', lineHeight: 1 }}>SURREAL</div>
            <div style={{ fontWeight: 400, fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)', lineHeight: 1, marginTop: 2 }}>DETAILING</div>
          </div>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F5830A'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >{l.label}</Link>
          ))}
          <Link href="/book" style={{
            background: '#F5830A', color: '#fff',
            padding: '12px 28px', borderRadius: 4,
            fontSize: 13, fontWeight: 800,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#d4700a'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#F5830A'}
          >Get a Free Quote</Link>
        </div>
      </div>
    </nav>
  )
}
