'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Service, BookingFormData } from '@/types'
import { format } from 'date-fns'

type Step = 'service' | 'datetime' | 'details' | 'confirm' | 'done'

function BookingFlow() {
  const searchParams = useSearchParams()
  const [step, setStep] = useState<Step>('service')
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' })
  const [bookingId, setBookingId] = useState('')

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch('/api/services')
        const data = await res.json()
        const list = Array.isArray(data) ? data : []
        setServices(list)
        const preselect = searchParams.get('service')
        if (preselect) {
          const s = list.find((item: Service) => item.id === preselect || item.name.toLowerCase() === preselect.toLowerCase())
          if (s) { setSelectedService(s); setStep('datetime') }
        }
      } catch {
        setError('We could not load services right now. Please try again shortly.')
      }
    }

    loadServices()
  }, [searchParams])

  useEffect(() => {
    if (!selectedDate) return
    setLoading(true)
    fetch(`/api/availability?date=${selectedDate}`)
      .then((r) => r.json())
      .then((d) => { setAvailableSlots(d.slots || []); setLoading(false) })
      .catch(() => { setAvailableSlots([]); setLoading(false) })
  }, [selectedDate])

  const submit = async () => {
    if (!selectedService || !selectedDate || !selectedSlot || !form.name || !form.email || !form.phone) {
      setError('Please complete your details before confirming the booking.')
      return
    }

    setLoading(true)
    setError('')
    const payload: BookingFormData = {
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes: form.notes,
    }

    try {
      const res = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      setLoading(false)
      if (res.ok) {
        setBookingId(data.id)
        setStep('done')
      } else {
        setError(data.error || 'We could not create the booking. Please try again.')
      }
    } catch {
      setLoading(false)
      setError('Booking failed. Please try again.')
    }
  }

  const stepStyle = { padding: '120px 45px', minHeight: '100vh', background: '#000000' }
  const containerStyle = { maxWidth: 680, margin: '0 auto' }
  const cardStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0 40px 0 40px', padding: 32, cursor: 'pointer', transition: 'border-color 0.2s' }
  const btnStyle = { background: '#666060', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: '0 40px 0 40px', fontWeight: 700, fontSize: 15, cursor: 'pointer' }
  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '12px 16px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box' as const }

  if (step === 'done') return (
    <div style={stepStyle}>
      <div style={{ ...containerStyle, textAlign: 'center', paddingTop: 80 }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>✓</div>
        <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>You're booked.</h1>
        <p style={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 8 }}>Confirmation sent to {form.email}</p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>Booking ID: {bookingId}</p>
      </div>
    </div>
  )

  return (
    <div style={stepStyle}>
      <div style={containerStyle}>
        <p style={{ color: '#ffffff', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
          Step {['service','datetime','details','confirm'].indexOf(step) + 1} of 4
        </p>

        {step === 'service' && (
          <>
            <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 48 }}>Choose a service.</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {services.map((s) => (
                <div
                  key={s.id}
                  style={cardStyle}
                  onClick={() => { setSelectedService(s); setStep('datetime') }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#ffffff')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{s.name}</h3>
                      <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14 }}>{s.description}</p>
                    </div>
                    <span style={{ fontWeight: 800, fontSize: 20, marginLeft: 24, flexShrink: 0 }}>${s.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {step === 'datetime' && (
          <>
            <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Pick a date.</h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 40 }}>{selectedService?.name}</p>
            <div style={{ marginBottom: 32 }}>
              <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => { setSelectedDate(e.target.value); setSelectedSlot('') }}
                style={{ ...inputStyle, colorScheme: 'dark' }}
              />
            </div>
            {selectedDate && (
              <div style={{ marginBottom: 40 }}>
                <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>Available times</label>
                {loading ? <p style={{ color: 'rgba(255,255,255,0.4)' }}>Loading...</p> : availableSlots.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.4)' }}>No slots available. Choose another date.</p>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                    {availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        style={{
                          padding: '10px 20px',
                          borderRadius: selectedSlot === slot ? '0 20px 0 20px' : '20px 0 20px 0',
                          border: '1px solid',
                          borderColor: selectedSlot === slot ? '#1a6ab1' : 'rgba(255,255,255,0.15)',
                          background: selectedSlot === slot ? '#1a6ab1' : 'transparent',
                          color: '#fff',
                          cursor: 'pointer',
                          fontSize: 14,
                          fontWeight: 500,
                        }}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep('service')} style={{ ...btnStyle, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>Back</button>
              {selectedDate && selectedSlot && <button onClick={() => setStep('details')} style={btnStyle}>Continue</button>}
            </div>
          </>
        )}

        {step === 'details' && (
          <>
            <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 48 }}>Your details.</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
              {[
                { key: 'name', label: 'Full name', type: 'text', placeholder: 'John Smith' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'john@example.com' },
                { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+64 21 000 0000' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{label}</label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>Notes (optional)</label>
                <textarea
                  placeholder="Vehicle make/model, specific concerns..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>
            </div>
            {error ? <p style={{ color: '#ffb5b5', marginBottom: 20, fontSize: 14 }}>{error}</p> : null}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep('datetime')} style={{ ...btnStyle, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>Back</button>
              <button onClick={() => setStep('confirm')} disabled={!form.name || !form.email || !form.phone} style={btnStyle}>Review Booking</button>
            </div>
          </>
        )}

        {step === 'confirm' && (
          <>
            <h1 style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 48 }}>Confirm booking.</h1>
            <div style={{ background: 'rgba(26,106,177,0.15)', border: '1px solid rgba(26,106,177,0.3)', borderRadius: '0 40px 0 40px', padding: 32, marginBottom: 40 }}>
              {[
                ['Service', selectedService?.name],
                ['Date', selectedDate ? format(new Date(selectedDate), 'EEEE, MMMM d yyyy') : ''],
                ['Time', selectedSlot],
                ['Name', form.name],
                ['Email', form.email],
                ['Phone', form.phone],
                ['Price', `$${selectedService?.price}`],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>{label}</span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{value}</span>
                </div>
              ))}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 32 }}>A confirmation will be sent to your email. You'll receive a reminder 24 hours before.</p>
            {error ? <p style={{ color: '#ffb5b5', marginBottom: 20, fontSize: 14 }}>{error}</p> : null}
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep('details')} style={{ ...btnStyle, background: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}>Back</button>
              <button onClick={submit} disabled={loading} style={btnStyle}>{loading ? 'Booking...' : 'Confirm Booking'}</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function BookPage() {
  return (
    <Suspense>
      <BookingFlow />
    </Suspense>
  )
}
