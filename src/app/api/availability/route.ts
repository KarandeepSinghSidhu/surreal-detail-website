export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { TIME_SLOTS } from '@/lib/utils'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const date = searchParams.get('date')

  if (!date) return NextResponse.json({ error: 'Date required' }, { status: 400 })

  const blocked = await prisma.blockedDate.findUnique({ where: { date: new Date(date) } })
  if (blocked) return NextResponse.json({ slots: [] })

  const bookings = await prisma.booking.findMany({
    where: { date: new Date(date), status: { not: 'CANCELLED' } },
    select: { timeSlot: true },
  })

  const bookedSlots = bookings.map((b: { timeSlot: string }) => b.timeSlot)
  const available = TIME_SLOTS.filter((slot) => !bookedSlots.includes(slot))

  return NextResponse.json({ slots: available })
}
