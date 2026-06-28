export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendBookingReminder } from '@/lib/email'
import { format, addDays, startOfDay, endOfDay } from 'date-fns'

export async function POST() {
  const tomorrow = addDays(new Date(), 1)

  const bookings = await prisma.booking.findMany({
    where: {
      date: { gte: startOfDay(tomorrow), lte: endOfDay(tomorrow) },
      status: 'CONFIRMED',
      reminderSent: false,
    },
    include: { service: true },
  })

  const results = await Promise.allSettled(
    bookings.map(async (booking: typeof bookings[number]) => {
      await sendBookingReminder({
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        serviceName: booking.service.name,
        date: format(booking.date, 'EEEE, MMMM d yyyy'),
        timeSlot: booking.timeSlot,
      })
      await prisma.booking.update({ where: { id: booking.id }, data: { reminderSent: true } })
    })
  )

  return NextResponse.json({ sent: results.filter((r: PromiseSettledResult<void>) => r.status === 'fulfilled').length })
}
