'use client'
import { useState } from 'react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  const submit = async () => {
    if (!email) return
    setStatus('loading')
    const res = await fetch('/api/email/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setStatus(res.ok ? 'done' : 'error')
  }

  return (
    <section id="contact" style={{
      background: '#111111',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '80px 48px',
    }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ width: 40, height: 3, background: '#F5830A', margin: '0 auto 24px' }} />
        <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 12 }}>
          Stay Updated
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 36, fontSize: 14, lineHeight: 1.7 }}>
          Seasonal offers, availability drops, and detailing tips.
        </p>
        {status === 'done' ? (
          <p style={{ color: '#F5830A', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontSize: 14 }}>You're in. Talk soon.</p>
        ) : (
          <div style={{ display: 'flex', gap: 0, maxWidth: 460, margin: '0 auto' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                flex: 1, padding: '14px 20px',
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRight: 'none',
                borderRadius: '4px 0 0 4px',
                color: '#fff', fontSize: 14, outline: 'none',
              }}
            />
            <button onClick={submit} disabled={status === 'loading'} style={{
              background: '#F5830A', color: '#fff',
              border: 'none', padding: '14px 28px',
              borderRadius: '0 4px 4px 0',
              fontWeight: 800, fontSize: 13,
              letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}>Subscribe</button>
          </div>
        )}
      </div>
    </section>
  )
}
