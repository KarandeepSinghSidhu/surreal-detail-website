'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { btn } from '@/lib/styles'
import ServicesDropdown from '@/components/ServicesDropdown'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 28px',
      background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
    }}>
      <div style={{ maxWidth: 1400, margin: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 88 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logos/logoBig.png" alt="Surreal Detail" width={300} height={100} priority style={{ objectFit: 'contain' }} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginLeft: 'auto' }}>

          <Link href="/about"
            style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255)', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#F5830A'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255)'}
          >About</Link>

          <ServicesDropdown />

          <Link href="/contact"
            style={{ fontSize: 18, fontWeight: 600, color: 'rgba(255,255,255)', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#F5830A'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255)'}
          >Contact</Link>

          <Link href="/book"
            style={{ ...btn.base, ...btn.orange, padding: '10px 20px' }}
            onMouseEnter={e => Object.assign((e.currentTarget as HTMLElement).style, btn.orangeHover)}
            onMouseLeave={e => Object.assign((e.currentTarget as HTMLElement).style, btn.orange)}
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  )
}