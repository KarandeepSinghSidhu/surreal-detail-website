'use client'

import Image from 'next/image'
import Link from 'next/link'
import HeroBackground from '@/components/HeroBackground'
import { SERVICES } from '@/lib/services'
import { servicePath } from '@/lib/services'

const FEATURED_SERVICES = SERVICES.slice(0, 4)

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a' }}>
      <HeroSection />
      <ServiceGrid />
      <BottomSection />
    </main>
  )
}

function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <HeroBackground />

      <div style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: '100%' }}>
        <h1 style={{
          fontSize: 'clamp(44px, 8vw, 62px)',
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          marginBottom: 24,
          color: '#fff',
        }}>
          Premium Vehicle Detailing &<br></br>Paint Protection Auckland
        </h1>
        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          
          <Link href="/book" style={{
            background: '#F5830A', color: '#fff',
            padding: '16px 40px', borderRadius: 50,
            fontWeight: 700, fontSize: 18,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            width: '250px',
            display: 'inline-block', textAlign: 'center',alignSelf: 'center',
          }}>Book Now </Link>
          
          <Link href="/services" style={{
            border: '2px solid rgba(255,255,255)', color: '#fff',
            padding: '16px 40px', borderRadius: 50,
            fontWeight: 700, fontSize: 18,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            width: '250px',
          }}>Our Services</Link>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(transparent, #0a0a0a)',
        zIndex: 1,
      }} />
    </section>
  )
}

const SERVICE_PANELS = FEATURED_SERVICES.map((s) => ({
  label: s.label,
  desc: s.shortDesc,
  image: s.image,
  href: servicePath(s.slug),
}))

function ServiceGrid() {
  return (
    <section id="services" style={{ background: '#f1f2f4', padding: '100px 24px 120px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', marginBottom: 56 }}>
        <h2 style={{
          fontSize: 'clamp(36px, 5vw, 52px)',
          fontWeight: 900,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color: '#0a0a0a',
          marginBottom: 24,
        }}>
          Car Detailing Services
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: '#3a3a3a' }}>
          By using the best materials, products, and techniques, we can achieve the very best result.
          Whether you choose a car coating, polishing treatment, interior cleaning, or another detailing
          service, at Surreal Detail your car is treated with the utmost care.
        </p>
      </div>

      <div style={{
        maxWidth: 1400, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24,
      }}>
        {SERVICE_PANELS.map((panel) => (
          <ServicePanel key={panel.label} panel={panel} />
        ))}
      </div>
    </section>
  )
}

function ServicePanel({ panel }: { panel: typeof SERVICE_PANELS[0] }) {
  return (
    <Link
      href={panel.href}
      className="service-panel"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 420,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '28px',
        cursor: 'pointer',
        background: '#141414',
        transform: 'translateY(0)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
      }}
      onMouseEnter={(e) => {
        const target = e.currentTarget as HTMLAnchorElement
        target.style.transform = 'translateY(-8px)'
        target.style.boxShadow = '0 18px 40px rgba(0,0,0,0.24)'
        const overlay = target.querySelector('[data-overlay]') as HTMLDivElement | null
        if (overlay) overlay.style.background = 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.9) 100%)'
        const detail = target.querySelector('[data-description]') as HTMLDivElement | null
        if (detail) detail.style.opacity = '1'
        const title = target.querySelector('[data-title]') as HTMLDivElement | null
        if (title) title.style.transform = 'translateY(-8px)'
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget as HTMLAnchorElement
        target.style.transform = 'translateY(0)'
        target.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'
        const overlay = target.querySelector('[data-overlay]') as HTMLDivElement | null
        if (overlay) overlay.style.background = 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)'
        const detail = target.querySelector('[data-description]') as HTMLDivElement | null
        if (detail) detail.style.opacity = '0'
        const title = target.querySelector('[data-title]') as HTMLDivElement | null
        if (title) title.style.transform = 'translateY(0)'
      }}
    >
      <Image
        src={panel.image}
        alt={panel.label}
        fill
        sizes="25vw"
        style={{ objectFit: 'cover' }}
      />

      <div
        data-overlay
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)',
          zIndex: 1,
          transition: 'background 0.25s ease',
        }}
      />

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: '#F5830A', zIndex: 3,
        opacity: 0,
        transition: 'opacity 0.3s',
      }} className="panel-accent" />

      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div
          data-title
          style={{
            fontSize: 28, fontWeight: 800, color: '#fff',
            lineHeight: 1.15,
            transition: 'transform 0.25s ease',
          }}
        >
          {panel.label}
        </div>
        <div
          data-description
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.9)',
            opacity: 0,
            transform: 'translateY(12px)',
            transition: 'opacity 0.25s ease, transform 0.25s ease',
            maxWidth: 250,
          }}
        >
          {panel.desc}
        </div>
      </div>
    </Link>
  )
}

function BottomSection() {
  const faqs = [
    { q: 'How long does ceramic coating take?', a: 'Full paint correction + coating is typically 2–3 days. Coating-only is 1 day.' },
    { q: 'Do I need paint correction before PPF?', a: 'Highly recommended. Any defects trapped under film are permanent.' },
    { q: 'How long does PPF last?', a: 'Quality PPF lasts 7–10 years with proper maintenance.' },
    { q: 'Do you offer a warranty?', a: 'Yes — GTechniq coatings come with manufacturer warranty. PPF includes installer warranty.' },
  ]

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', minHeight: 480 }}>
      <div style={{ background: '#111111', padding: '64px 48px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 40, height: 3, background: '#F5830A', marginBottom: 28 }} />
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 20 }}>About Us</h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
          Surreal Detail was built on one belief: your car should leave looking better than the day you bought it.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: 14, marginBottom: 32 }}>
          As a GTechniq Certified Installer with formal PPF training, we use only Koch Chemie, CarPro, P&S, GTechniq, and Rupes.
        </p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          {['200+ Cars', '5★ Rating', 'GTechniq'].map((b) => (
            <div key={b} style={{ fontSize: 11, color: '#F5830A', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{b}</div>
          ))}
          <Link href="/about" style={{ fontSize: 12, fontWeight: 700, color: '#F5830A', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Learn more →
          </Link>
        </div>
      </div>

      <div style={{ background: '#0f0f0f', padding: '64px 48px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 40, height: 3, background: '#8C8C8C', marginBottom: 28 }} />
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 32 }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {faqs.map((faq) => (
            <div key={faq.q}>
              <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 6, color: '#fff' }}>{faq.q}</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: '#F5830A',
        padding: '64px 48px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ width: 40, height: 3, background: 'rgba(0,0,0,0.3)', marginBottom: 28 }} />
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 16, color: '#fff' }}>
            Request Appointment
          </h2>
          <p style={{ color: 'rgba(0,0,0,0.5)', lineHeight: 1.8, fontSize: 14, marginBottom: 32 }}>
            Pick your service, choose your date, and lock it in. Confirmation sent instantly to your inbox.
          </p>
        </div>
        <Link href="/book" style={{
          background: '#0a0a0a', color: '#fff',
          padding: '16px 32px', borderRadius: 4,
          fontWeight: 800, fontSize: 14,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          display: 'inline-block', textAlign: 'center',
        }}>Book Now →</Link>
      </div>
    </section>
  )
}
