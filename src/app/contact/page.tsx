import type { Metadata } from 'next'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import { page } from '@/lib/page-styles'
import { btn } from '@/lib/styles'

export const metadata: Metadata = {
  title: 'Contact — Surreal Detail',
  description: 'Get in touch with Surreal Detail for bookings, consultations, and vehicle protection services in Auckland.',
}

export default function ContactPage() {
  return (
    <main style={page.main}>
      <PageHeader
        title="Contact Us"
        description="Book your next detail, coating, or PPF install. We’ll reply quickly with availability and the right next step."
      />

      <section style={page.section}>
        <div style={{ ...page.sectionInner, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div style={page.accent} />
            <h2 style={page.h2}>Let’s talk about your car</h2>
            <p style={{ ...page.body, marginBottom: 28 }}>
              Whether you’re protecting a new car, restoring a tired finish, or planning a full PPF package, we’ll help you choose the right service.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)', padding: '24px 28px' }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F5830A', marginBottom: 8 }}>Phone</p>
                <a href="tel:+64210000000" style={{ color: '#fff', fontSize: 16 }}>+64 21 000 0000</a>
              </div>
              <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)', padding: '24px 28px' }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F5830A', marginBottom: 8 }}>Email</p>
                <a href="mailto:hello@surrealdetail.co.nz" style={{ color: '#fff', fontSize: 16 }}>hello@surrealdetail.co.nz</a>
              </div>
              <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)', padding: '24px 28px' }}>
                <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#F5830A', marginBottom: 8 }}>Location</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>Auckland, New Zealand</p>
              </div>
            </div>
          </div>

          <div style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.06)', padding: '40px 32px' }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>Start your booking</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 24 }}>
              Choose a service and we’ll help you lock in the right date and package.
            </p>
            <Link href="/book" style={{ ...btn.base, ...btn.orange, display: 'inline-block' }}>
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
