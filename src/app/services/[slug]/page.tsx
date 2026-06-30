import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ServiceDetail from '@/components/ServiceDetail'
import { getServiceBySlug, SERVICES } from '@/lib/services'
import { page } from '@/lib/page-styles'
import Link from 'next/link'
import { btn } from '@/lib/styles'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) return { title: 'Service — Surreal Detail' }
  return {
    title: `${service.label} — Surreal Detail`,
    description: service.shortDesc,
  }
}

export default async function ServiceSlugPage({ params }: Props) {
  const { slug } = await params
  const service = getServiceBySlug(slug)
  if (!service) notFound()

  if (slug === 'ppf') {
    return (
      <main style={page.main}>
        <section style={{ ...page.section, background: '#111111', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ ...page.sectionInner, maxWidth: 800 }}>
            <div style={{ width: 40, height: 3, background: '#F5830A', marginBottom: 24 }} />
            <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 20 }}>
              Packages & Coverage
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
              {service.description}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
              {service.features.map((f) => (
                <li key={f} style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', display: 'flex', gap: 12 }}>
                  <span style={{ color: '#F5830A' }}>—</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/book" style={{ ...btn.base, ...btn.orange }}>Book PPF Installation →</Link>
          </div>
        </section>
      </main>
    )
  }

  return <ServiceDetail service={service} />
}
