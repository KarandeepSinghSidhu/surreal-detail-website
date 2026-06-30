export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { SERVICES as staticServices } from '@/lib/services'

export async function GET() {
  try {
    const services = await prisma.service.findMany({ where: { active: true }, orderBy: { price: 'asc' } })
    if (services.length > 0) return NextResponse.json(services)
  } catch (error) {
    console.error('Failed to load services from database:', error)
  }

  const fallbackServices = staticServices.map((service) => ({
    id: service.slug,
    name: service.label,
    description: service.shortDesc,
    duration: 60,
    price: 0,
    category: service.slug,
    active: true,
  }))

  return NextResponse.json(fallbackServices)
}
