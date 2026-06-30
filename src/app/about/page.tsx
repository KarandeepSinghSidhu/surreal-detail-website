import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { page } from '@/lib/page-styles'
import { btn } from '@/lib/styles'

export const metadata: Metadata = {
  title: 'About Us — Surreal Detail',
  description: 'GTechniq certified vehicle appearance specialists in Auckland. Premium products, trained installers, obsessive attention to detail.',
}

const STATS = [
  { value: '200+', label: 'Cars Detailed' },
  { value: '5★', label: 'Average Rating' },
  { value: 'GTechniq', label: 'Certified Installer' },
  { value: '5yr+', label: 'Ceramic Warranty' },
]

const BRANDS = ['GTechniq', 'Koch Chemie', 'CarPro', 'P&S', 'Rupes']

const VALUES = [
  {
    title: 'Results over shortcuts',
    body: 'Every vehicle gets the time it needs. We never rush paint correction, coating, or film installation — because the finish has to last.',
  },
  {
    title: 'Certified expertise',
    body: 'Formal GTechniq certification and dedicated PPF training mean your car is in qualified hands, not a general wash bay.',
  },
  {
    title: 'Premium products only',
    body: 'We use industry-leading chemistry and tools. No cheap compounds, no bargain film — only products we would put on our own cars.',
  },
]

export default function AboutPage() {
  return (
    <main style={page.main}>
      <PageHeader
        title="About Us"
        description="Surreal Detail was built on one belief: your car should leave looking better than the day you bought it."
        accent="grey"
      />

      <section style={page.section}>
        <div style={{
          ...page.sectionInner,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          <div>
            <div style={page.accent} />
            <h2 style={page.h2}>Who We Are</h2>
            <p style={{ ...page.body, marginBottom: 20 }}>
              Surreal Detail is an Auckland-based vehicle appearance studio specialising in paint correction,
              ceramic coatings, and paint protection film. We work with enthusiasts and everyday owners who
              want their cars protected, perfected, and maintained to the highest standard.
            </p>
            <p style={page.body}>
              As a GTechniq Certified Installer with formal PPF training, we bring factory-level processes
              to every job — from single-stage polishes to full-body film wraps.
            </p>
          </div>

          <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
            <Image
              src="/images/52F64200-1123-43FA-89F4-3D2A5ED8A5FD_1_105_c.jpeg"
              alt="Surreal Detail workshop"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section style={{ ...page.section, background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={page.sectionInner}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0 }}>
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                style={{
                  padding: '32px 24px',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 900, color: '#F5830A', letterSpacing: '-0.03em', marginBottom: 8 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={page.section}>
        <div style={page.sectionInner}>
          <div style={page.accent} />
          <h2 style={page.h2}>What We Stand For</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 40 }}>
            {VALUES.map((value) => (
              <div
                key={value.title}
                style={{
                  background: '#111111',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '40px 32px',
                }}
              >
                <h3 style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 14, color: '#fff' }}>
                  {value.title}
                </h3>
                <p style={page.body}>{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...page.section, background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ ...page.sectionInner, textAlign: 'center' }}>
          <div style={{ ...page.accent, margin: '0 auto 24px' }} />
          <h2 style={{ ...page.h2, marginBottom: 16 }}>Products We Trust</h2>
          <p style={{ ...page.body, maxWidth: 520, margin: '0 auto 36px' }}>
            We only use brands with proven performance in professional detailing environments.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 20 }}>
            {BRANDS.map((brand) => (
              <span
                key={brand}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#F5830A',
                  padding: '12px 24px',
                  border: '1px solid rgba(245,131,10,0.3)',
                }}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        ...page.section,
        background: '#F5830A',
        textAlign: 'center',
      }}>
        <div style={page.sectionInner}>
          <h2 style={{ ...page.h2, color: '#fff', marginBottom: 16 }}>Ready to get started?</h2>
          <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: 15, lineHeight: 1.75, maxWidth: 480, margin: '0 auto 32px' }}>
            Book online in minutes or browse our full service menu to find the right package for your vehicle.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/book" style={{ ...btn.base, background: '#0a0a0a', color: '#fff', borderColor: '#0a0a0a' }}>
              Book Now
            </Link>
            <Link href="/services" style={{ ...btn.base, ...btn.outline, color: '#0a0a0a', borderColor: 'rgba(0,0,0,0.35)' }}>
              View Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
