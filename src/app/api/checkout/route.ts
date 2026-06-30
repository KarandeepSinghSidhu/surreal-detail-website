import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

let stripeClient: Stripe | null = null

function getStripeClient() {
  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('your-')) {
    return null
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-06-24.dahlia',
    })
  }

  return stripeClient
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {}

  try {
    body = (await req.json().catch(() => ({}))) as Record<string, unknown>
    const { bookingId, amount, serviceName } = body
    const bookingIdValue = typeof bookingId === 'string' ? bookingId : ''
    const serviceNameValue = typeof serviceName === 'string' ? serviceName : undefined

    if (!bookingIdValue) {
      return NextResponse.json({ error: 'Missing booking information' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const fallbackUrl = `${appUrl}/book?success=1&bookingId=${bookingIdValue}`

    const normalizedAmount = Number(amount)
    const unitAmount = Number.isFinite(normalizedAmount) && normalizedAmount > 0 ? Math.round(normalizedAmount * 100) : 5000

    const stripe = getStripeClient()

    if (!stripe) {
      return NextResponse.json({
        url: fallbackUrl,
        skipped: true,
        reason: 'Stripe is not configured.',
      })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'nzd',
            product_data: {
              name: serviceNameValue || 'Surreal Detail booking deposit',
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      success_url: fallbackUrl,
      cancel_url: `${appUrl}/book?canceled=1&bookingId=${bookingIdValue}`,
      metadata: { bookingId: bookingIdValue },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout session error:', error)
    return NextResponse.json({
      url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/book?success=1&bookingId=${String(body.bookingId || '')}`,
      skipped: true,
      reason: 'Stripe checkout is temporarily unavailable.',
    })
  }
}
