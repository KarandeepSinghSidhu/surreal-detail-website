'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { btn } from '@/lib/styles'

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

        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logo.png" alt="Surreal Detail" width={48} height={48} style={{ objectFit: 'contain' }} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#F5830A'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >{l.label}</Link>
          ))}
          <Link href="/book"
            style={{ ...btn.base, ...btn.orange }}
            onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, btn.orangeHover)}
            onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, btn.orange)}
          >Get a Free Quote</Link>
        </div>
      </div>
    </nav>
  )
}