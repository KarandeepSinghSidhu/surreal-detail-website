'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Booking } from '@/types'
import { format } from 'date-fns'

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#f59e0b',
  CONFIRMED: '#10b981',
  CANCELLED: '#ef4444',
  COMPLETED: '#6366f1',
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    fetch('/api/bookings').then((r) => r.json()).then(setBookings)
  }, [])

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/bookings/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: status as Booking['status'] } : b))
  }

  const filtered = filter === 'ALL' ? bookings : bookings.filter((b) => b.status === filter)

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'PENDING').length,
    confirmed: bookings.filter((b) => b.status === 'CONFIRMED').length,
    revenue: bookings.filter((b) => b.status !== 'CANCELLED').reduce((sum, b) => sum + (b.service?.price || 0), 0),
  }

  const panelStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0 24px 0 24px', padding: '24px 28px' }

  return (
    <div style={{ minHeight: '100vh', background: '#08082e', padding: '100px 45px 60px' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <div>
            <p style={{ color: '#1a6ab1', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Admin</p>
            <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em' }}>Dashboard</h1>
          </div>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 14 }}>← Back to site</Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 48 }}>
          {[
            { label: 'Total Bookings', value: stats.total },
            { label: 'Pending', value: stats.pending },
            { label: 'Confirmed', value: stats.confirmed },
            { label: 'Revenue (est.)', value: `$${stats.revenue.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} style={panelStyle}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 8 }}>{label}</p>
              <p style={{ fontSize: 32, fontWeight: 800 }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '8px 16px',
                borderRadius: 6,
                border: '1px solid',
                borderColor: filter === s ? '#1a6ab1' : 'rgba(255,255,255,0.12)',
                background: filter === s ? '#1a6ab1' : 'transparent',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Bookings table */}
        <div style={{ ...panelStyle, borderRadius: '0 40px 0 40px', overflow: 'hidden', padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {['Customer', 'Service', 'Date & Time', 'Status', 'Actions'].map((h) => (
                  <th key={h} style={{ textAlign: 'left', padding: '16px 20px', fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking) => (
                <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{booking.customerName}</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{booking.customerEmail}</p>
                  </td>
                  <td style={{ padding: '16px 20px', fontSize: 14 }}>{booking.service?.name}</td>
                  <td style={{ padding: '16px 20px', fontSize: 14 }}>
                    <p>{format(new Date(booking.date), 'MMM d, yyyy')}</p>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>{booking.timeSlot}</p>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ padding: '4px 10px', borderRadius: 4, fontSize: 12, fontWeight: 600, background: STATUS_COLORS[booking.status] + '22', color: STATUS_COLORS[booking.status] }}>
                      {booking.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {booking.status === 'PENDING' && (
                        <button onClick={() => updateStatus(booking.id, 'CONFIRMED')} style={{ padding: '6px 12px', borderRadius: 4, border: 'none', background: '#10b981', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Confirm</button>
                      )}
                      {booking.status === 'CONFIRMED' && (
                        <button onClick={() => updateStatus(booking.id, 'COMPLETED')} style={{ padding: '6px 12px', borderRadius: 4, border: 'none', background: '#6366f1', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Complete</button>
                      )}
                      {!['CANCELLED', 'COMPLETED'].includes(booking.status) && (
                        <button onClick={() => updateStatus(booking.id, 'CANCELLED')} style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: 12 }}>Cancel</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '40px 20px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: 14 }}>No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
