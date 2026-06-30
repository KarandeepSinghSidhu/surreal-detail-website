'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { SERVICES, servicePath } from '@/lib/services'

export default function ServicesDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const handleMouseEnter = () => {
    clearCloseTimer()
    setOpen(true)
  }

  const handleMouseLeave = () => {
    clearCloseTimer()
    closeTimer.current = setTimeout(() => setOpen(false), 1500)
  }

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        clearCloseTimer()
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => {
      document.removeEventListener('mousedown', close)
      clearCloseTimer()
    }
  }, [])

  const linkStyle: React.CSSProperties = {
    fontSize: 18,
    fontWeight: 600,
    color: 'rgba(255,255,255)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    transition: 'color 0.2s',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  }

  return (
    <div ref={ref} style={{ position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={linkStyle}
        onMouseEnter={(e) => { e.currentTarget.style.color = '#F5830A' }}
        onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255)' }}
      >
        Services
        <span aria-hidden="true" style={{ fontSize: 18, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: 12,
          minWidth: 350,
          background: '#fff',
          zIndex: 200,
          padding: '8px 0',
        }}>
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={servicePath(s.slug)}
              style={{
                display: 'block', padding: '16px 24px',
                fontSize: 18, fontWeight: 600, color: '#111',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(245,131,10,0.08)'
                e.currentTarget.style.color = '#F5830A'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#111'
              }}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}