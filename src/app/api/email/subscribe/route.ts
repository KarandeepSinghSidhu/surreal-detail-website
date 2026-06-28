export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  const { email, name } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const subscriber = await prisma.subscriber.upsert({
    where: { email },
    create: { email, name },
    update: { active: true },
  })
  return NextResponse.json(subscriber)
}
