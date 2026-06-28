export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation } from '@/lib/email'
import { format } from 'date-fns'

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: { service: true },
    orderBy: { date: 'desc' },
  })
  return NextResponse.json(bookings)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { serviceId, customerName, customerEmail, customerPhone, date, timeSlot, notes } = body

  if (!serviceId || !customerName || !customerEmail || !customerPhone || !date || !timeSlot) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const existing = await prisma.booking.findFirst({
    where: { date: new Date(date), timeSlot, status: { not: 'CANCELLED' } },
  })
  if (existing) {
    return NextResponse.json({ error: 'This time slot is already booked' }, { status: 409 })
  }

  const booking = await prisma.booking.create({
    data: { serviceId, customerName, customerEmail, customerPhone, date: new Date(date), timeSlot, notes },
    include: { service: true },
  })

  try {
    await sendBookingConfirmation({
      customerName,
      customerEmail,
      serviceName: booking.service.name,
      date: format(new Date(date), 'EEEE, MMMM d yyyy'),
      timeSlot,
      bookingId: booking.id,
    })
  } catch (e) {
    console.error('Email failed:', e)
  }

  return NextResponse.json(booking, { status: 201 })
}
