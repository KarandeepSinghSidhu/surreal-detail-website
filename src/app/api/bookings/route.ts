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
  const { serviceId, serviceName, customerName, customerEmail, customerPhone, date, timeSlot, notes } = body

  if (!serviceId || !customerName || !customerEmail || !customerPhone || !date || !timeSlot) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const bookingDate = new Date(`${date}T12:00:00`)

  const existing = await prisma.booking.findFirst({
    where: { date: bookingDate, timeSlot, status: { not: 'CANCELLED' } },
  })
  if (existing) {
    return NextResponse.json({ error: 'This time slot is already booked' }, { status: 409 })
  }

  const service = await prisma.service.upsert({
    where: { id: serviceId },
    update: {},
    create: {
      id: serviceId,
      name: serviceName || serviceId,
      description: 'Booked through the website',
      duration: 60,
      price: 0,
      category: 'detailing',
    },
  })

  const booking = await prisma.booking.create({
    data: { serviceId: service.id, customerName, customerEmail, customerPhone, date: bookingDate, timeSlot, notes },
    include: { service: true },
  })

  try {
    await sendBookingConfirmation({
      customerName,
      customerEmail,
      serviceName: booking.service.name,
      date: format(bookingDate, 'EEEE, MMMM d yyyy'),
      timeSlot,
      bookingId: booking.id,
    })
  } catch (e) {
    console.error('Email failed:', e)
  }

  return NextResponse.json(booking, { status: 201 })
}
