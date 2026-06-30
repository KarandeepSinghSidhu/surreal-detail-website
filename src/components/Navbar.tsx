'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { btn } from '@/lib/styles'
import ServicesDropdown from '@/components/ServicesDropdown'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkBaseStyle = {
    fontSize: 14,
    fontWeight: 600,
    color: 'rgba(255,255,255)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
    transition: 'color 0.2s',
    position: 'relative' as const,
    paddingBottom: 6,
  }

  const isActive = (href: string) => pathname === href

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 28px',
      background: scrolled ? 'rgba(0,0,0,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      transition: 'background 0.3s, backdrop-filter 0.3s, border-color 0.3s',
    }}>
      <div style={{ maxWidth: 1400, margin: '10px auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 88 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/logos/logoBig.png" alt="Surreal Detail" width={300} height={100} priority style={{ objectFit: 'contain' }} />
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginLeft: 'auto' }}>
          <Link
            href="/about"
            style={{
              ...linkBaseStyle,
              color: isActive('/about') ? '#fff' : 'rgba(255,255,255,0.92)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.setProperty('--nav-underline-opacity', '1')
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = isActive('/about') ? '#fff' : 'rgba(255,255,255,0.92)'
              e.currentTarget.style.setProperty('--nav-underline-opacity', isActive('/about') ? '1' : '0')
            }}
          >
            <span style={{ position: 'relative', display: 'inline-block' }}>
              About
              <span style={{
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: -6,
                width: '100%',
                height: 1,
                background: '#fff',
                opacity: isActive('/about') ? 1 : 0,
                transition: 'opacity 0.2s',
              }} />
            </span>
          </Link>

          <ServicesDropdown />

          <Link
            href="/contact"
            style={{
              ...linkBaseStyle,
              color: isActive('/contact') ? '#fff' : 'rgba(255,255,255,0.92)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.setProperty('--nav-underline-opacity', '1')
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = isActive('/contact') ? '#fff' : 'rgba(255,255,255,0.92)'
              e.currentTarget.style.setProperty('--nav-underline-opacity', isActive('/contact') ? '1' : '0')
            }}
          >
            <span style={{ position: 'relative', display: 'inline-block' }}>
              Contact
              <span style={{
                content: '""',
                position: 'absolute',
                left: 0,
                bottom: -6,
                width: '100%',
                height: 1,
                background: '#fff',
                opacity: isActive('/contact') ? 1 : 0,
                transition: 'opacity 0.2s',
              }} />
            </span>
          </Link>

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