import Image from 'next/image'
import Link from 'next/link'
import type { ServiceItem } from '@/lib/services'
import { page } from '@/lib/page-styles'
import { btn } from '@/lib/styles'

export default function ServiceDetail({ service }: { service: ServiceItem }) {
  return (
    <main style={page.main}>
      <header style={{
        ...page.hero,
        position: 'relative',
        minHeight: 420,
        display: 'flex',
        alignItems: 'flex-end',
        padding: 0,
        overflow: 'hidden',
      }}>
        <Image
          src={service.image}
          alt={service.label}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.85) 100%)',
        }} />
        <div style={{ ...page.heroInner, position: 'relative', padding: '160px 48px 64px', width: '100%' }}>
          <div style={page.accent} />
          <p style={{
            fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
            color: '#F5830A', textTransform: 'uppercase', marginBottom: 12,
          }}>
            / Service
          </p>
          <h1 style={page.h1}>{service.label}</h1>
          <p style={page.lead}>{service.shortDesc}</p>
        </div>
      </header>

      <section style={page.section}>
        <div style={{
          ...page.sectionInner,
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: 64,
        }}>
          <div>
            <h2 style={page.h2}>Overview</h2>
            <p style={{ ...page.body, marginBottom: 32 }}>{service.description}</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {service.features.map((feature) => (
                <li key={feature} style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', display: 'flex', gap: 12 }}>
                  <span style={{ color: '#F5830A', flexShrink: 0 }}>—</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: '#111111',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '40px 32px',
            alignSelf: 'start',
          }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Typical duration
            </p>
            <p style={{ fontSize: 20, fontWeight: 800, marginBottom: 32 }}>{service.duration}</p>
            <Link href="/book" style={{ ...btn.base, ...btn.orange, display: 'block', textAlign: 'center', width: '100%' }}>
              Book Now →
            </Link>
            <Link href="/services" style={{
              display: 'block', textAlign: 'center', marginTop: 16,
              fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              ← All services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
