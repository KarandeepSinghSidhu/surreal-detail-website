import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { SERVICES } from '@/lib/services'
import { page } from '@/lib/page-styles'
import { btn } from '@/lib/styles'

export const metadata: Metadata = {
  title: 'Services — Surreal Detail',
  description: 'PPF, ceramic coating, paint correction, full details and more. GTechniq certified in Auckland.',
}

export default function ServicesPage() {
  return (
    <main style={page.main}>
      <PageHeader
        title="Our Services"
        description="From paint protection and ceramic coatings to full transformations — every service is performed with GTechniq-certified products and professional-grade equipment."
      />

      <section style={page.section}>
        <div style={{ ...page.sectionInner, display: 'flex', flexDirection: 'column', gap: 48 }}>
          {SERVICES.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                gap: 0,
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  minHeight: 360,
                  order: i % 2 === 0 ? 0 : 1,
                }}
              >
                <Image
                  src={service.image}
                  alt={service.label}
                  fill
                  sizes="(max-width: 900px) 100vw, 50vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div style={{ padding: '48px 44px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p style={{
                  fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
                  color: '#F5830A', textTransform: 'uppercase', marginBottom: 12,
                }}>
                  / {service.label}
                </p>
                <h2 style={{ ...page.h2, fontSize: 24, marginBottom: 16 }}>{service.label}</h2>
                <p style={{ ...page.body, marginBottom: 24 }}>{service.description}</p>

                <ul style={{ listStyle: 'none', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {service.features.map((feature) => (
                    <li key={feature} style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', display: 'flex', gap: 10 }}>
                      <span style={{ color: '#F5830A', flexShrink: 0 }}>—</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 24 }}>
                  Typical duration: {service.duration}
                </p>

                <Link href={`/services/${service.slug}`} style={{ ...btn.base, ...btn.orange, alignSelf: 'flex-start' }}>
                  Learn more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section style={{
        ...page.section,
        background: '#F5830A',
        textAlign: 'center',
      }}>
        <div style={page.sectionInner}>
          <h2 style={{ ...page.h2, color: '#fff', marginBottom: 16 }}>Not sure which service?</h2>
          <p style={{ color: 'rgba(0,0,0,0.5)', fontSize: 15, lineHeight: 1.75, maxWidth: 480, margin: '0 auto 32px' }}>
            Get in touch for a free consultation. We&apos;ll assess your vehicle and recommend the right package.
          </p>
          <Link href="/book" style={{ ...btn.base, background: '#0a0a0a', color: '#fff', borderColor: '#0a0a0a' }}>
            Get a Free Quote
          </Link>
        </div>
      </section>
    </main>
  )
}
