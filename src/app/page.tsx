import Link from 'next/link'
import ServicesSection from '@/components/ServicesSection'
import NewsletterSection from '@/components/NewsletterSection'

export default function Home() {
  return (
    <main style={{ background: '#0a0a0a' }}>
      <HeroSection />
      <ServiceGrid />
      <BottomSection />
      <NewsletterSection />
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
      {/* Full-bleed photo placeholder */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #2a2a2a 0%, #0f0f0f 60%, #1a0800 100%)',
      }}>
        {/* Simulated dark car detail texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 70% 60%, rgba(245,131,10,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 20% 40%, rgba(140,140,140,0.05) 0%, transparent 50%)
          `,
        }} />
        {/* Placeholder label */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.06)', fontSize: 13, fontWeight: 500, letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>Full-bleed hero photo goes here</div>
        {/* Dark overlay for text legibility */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '0 24px', maxWidth: 820 }}>
        <h1 style={{
          fontSize: 'clamp(44px, 8vw, 96px)',
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          marginBottom: 24,
          color: '#fff',
        }}>
          Vehicle Appearance<br />Specialists
        </h1>
        <p style={{
          fontSize: 17, lineHeight: 1.75,
          color: 'rgba(255,255,255,0.65)',
          maxWidth: 540, margin: '0 auto 40px',
        }}>
          GTechniq certified paint correction, ceramic coating, and PPF installation in Auckland. Your car protected, perfected.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/book" style={{
            background: '#F5830A', color: '#fff',
            padding: '16px 40px', borderRadius: 4,
            fontWeight: 800, fontSize: 14,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Book Now</Link>
          <Link href="/#services" style={{
            border: '2px solid rgba(255,255,255,0.3)', color: '#fff',
            padding: '16px 40px', borderRadius: 4,
            fontWeight: 700, fontSize: 14,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>Our Services</Link>
        </div>
      </div>

      {/* Bottom fade into black */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
        background: 'linear-gradient(transparent, #0a0a0a)',
        zIndex: 1,
      }} />
    </section>
  )
}

const SERVICE_PANELS = [
  {
    label: 'PPF',
    desc: 'Paint Protection Film — full front, full car, or custom zones.',
    color: '#1a1a1a',
  },
  {
    label: 'Ceramic Coating',
    desc: 'GTechniq Crystal Serum Light & Ultra. Multi-year hydrophobic protection.',
    color: '#141414',
  },
  {
    label: 'Paint Correction',
    desc: 'Single and two-stage machine polish. Remove swirls, scratches, oxidation.',
    color: '#111111',
  },
  {
    label: 'Full Detail',
    desc: 'Complete interior and exterior transformation — the works.',
    color: '#0d0d0d',
  },
]

function ServiceGrid() {
  return (
    <section id="services" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', minHeight: '60vh' }}>
      {SERVICE_PANELS.map((panel, i) => (
        <ServicePanel key={panel.label} panel={panel} index={i} />
      ))}
    </section>
  )
}

function ServicePanel({ panel, index }: { panel: typeof SERVICE_PANELS[0], index: number }) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 480,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '32px 28px',
        borderRight: index < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        cursor: 'pointer',
        background: panel.color,
      }}
    >
      {/* Photo placeholder */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)`,
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.07)', fontSize: 11, letterSpacing: '0.1em',
        textTransform: 'uppercase', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ fontSize: 28, opacity: 0.4 }}>📸</div>
        {panel.label} photo
      </div>

      {/* Orange accent top bar — shown on hover via inline trick */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: '#F5830A', zIndex: 3,
        opacity: 0,
        transition: 'opacity 0.3s',
      }} className="panel-accent" />

      {/* Text */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
          color: '#F5830A', textTransform: 'uppercase', marginBottom: 12,
        }}>/ {panel.label}</div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 20 }}>
          {panel.desc}
        </p>
        <Link href="/book" style={{
          fontSize: 12, fontWeight: 700, color: '#F5830A',
          letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>Book →</Link>
      </div>
    </div>
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
      {/* About */}
      <div style={{ background: '#111111', padding: '64px 48px', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ width: 40, height: 3, background: '#F5830A', marginBottom: 28 }} />
        <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 20 }}>About Us</h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: 14, marginBottom: 16 }}>
          Surreal Detail was built on one belief: your car should leave looking better than the day you bought it.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: 14, marginBottom: 32 }}>
          As a GTechniq Certified Installer with formal PPF training, we use only Koch Chemie, CarPro, P&S, GTechniq, and Rupes.
        </p>
        <div style={{ display: 'flex', gap: 20 }}>
          {['200+ Cars', '5★ Rating', 'GTechniq'].map((b) => (
            <div key={b} style={{ fontSize: 11, color: '#F5830A', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{b}</div>
          ))}
        </div>
      </div>

      {/* FAQ */}
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

      {/* Book CTA */}
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
