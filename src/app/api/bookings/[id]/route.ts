export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const booking = await prisma.booking.update({
    where: { id },
    data: { status: body.status },
    include: { service: true },
  })
  return NextResponse.json(booking)
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.booking.update({
    where: { id },
    data: { status: 'CANCELLED' },
  })
  return NextResponse.json({ success: true })
}
