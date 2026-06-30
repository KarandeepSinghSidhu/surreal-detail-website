import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
const configuredFromEmail = process.env.RESEND_FROM_EMAIL?.trim()
const fallbackFromEmail = process.env.RESEND_FALLBACK_FROM_EMAIL?.trim() || 'onboarding@resend.dev'

export const resend = resendApiKey ? new Resend(resendApiKey) : null

function getResendSenderEmail() {
  if (configuredFromEmail && configuredFromEmail !== 'your-resend-email' && !configuredFromEmail.includes('surrealdetail.co.nz')) {
    return configuredFromEmail
  }

  return fallbackFromEmail
}

function getResendConfigError() {
  if (!resendApiKey || resendApiKey === 'your-resend-api-key') {
    return 'Resend is not configured. Set RESEND_API_KEY to a real API key from Resend.'
  }

  const senderEmail = getResendSenderEmail()
  if (!senderEmail || senderEmail === 'your-resend-email') {
    return 'Resend sender email is not configured. Set RESEND_FROM_EMAIL to a verified sender address.'
  }

  return null
}

async function sendEmail(payload: Record<string, unknown>) {
  const configError = getResendConfigError()
  if (configError) {
    return { error: configError }
  }

  if (!resend) {
    return { error: 'Resend client is not available.' }
  }

  const senderEmail = getResendSenderEmail()
  return resend.emails.send({ ...payload, from: senderEmail } as never)
}

export async function sendBookingConfirmation({
  customerName,
  customerEmail,
  serviceName,
  date,
  timeSlot,
  bookingId,
}: {
  customerName: string
  customerEmail: string
  serviceName: string
  date: string
  timeSlot: string
  bookingId: string
}) {
  return sendEmail({
    to: customerEmail,
    subject: `Booking Confirmed — ${serviceName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0c48; color: #fff; padding: 40px; border-radius: 12px;">
        <h1 style="color: #fff; font-size: 28px; margin-bottom: 8px;">Booking Confirmed</h1>
        <p style="color: #a0aec0; margin-bottom: 32px;">Surreal Detail</p>
        <p>Hi ${customerName},</p>
        <p>Your booking is confirmed. Here are your details:</p>
        <div style="background: #1a1a6e; padding: 24px; border-radius: 8px; margin: 24px 0;">
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${timeSlot}</p>
          <p><strong>Booking ID:</strong> ${bookingId}</p>
        </div>
        <p>We'll send you a reminder 24 hours before your appointment.</p>
        <p style="color: #a0aec0; font-size: 14px; margin-top: 40px;">Surreal Detail · Auckland, NZ</p>
      </div>
    `,
  })
}

export async function sendContactMessage({
  customerName,
  customerEmail,
  phone,
  message,
}: {
  customerName: string
  customerEmail: string
  phone?: string
  message: string
}) {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return { id: 'local-dev' }
  }

  return sendEmail({
    to: process.env.RESEND_TO_EMAIL || customerEmail,
    subject: `New contact form message from ${customerName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0f1115; color: #fff; border-radius: 12px;">
        <h2 style="margin-bottom: 12px;">New Contact Message</h2>
        <p><strong>Name:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p style="margin-top: 16px;"><strong>Message:</strong></p>
        <p style="line-height: 1.6;">${message}</p>
      </div>
    `,
  })
}

export async function sendBookingReminder({
  customerName,
  customerEmail,
  serviceName,
  date,
  timeSlot,
}: {
  customerName: string
  customerEmail: string
  serviceName: string
  date: string
  timeSlot: string
}) {
  return sendEmail({
    to: customerEmail,
    subject: `Reminder: Your detailing appointment is tomorrow`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0c48; color: #fff; padding: 40px; border-radius: 12px;">
        <h1 style="font-size: 28px;">See you tomorrow</h1>
        <p>Hi ${customerName}, just a reminder about your appointment:</p>
        <div style="background: #1a1a6e; padding: 24px; border-radius: 8px; margin: 24px 0;">
          <p><strong>Service:</strong> ${serviceName}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${timeSlot}</p>
        </div>
        <p>If you need to reschedule, please contact us as soon as possible.</p>
        <p style="color: #a0aec0; font-size: 14px; margin-top: 40px;">Surreal Detail · Auckland, NZ</p>
      </div>
    `,
  })
}

export async function sendMarketingEmail({
  subscribers,
  subject,
  html,
}: {
  subscribers: string[]
  subject: string
  html: string
}) {
  const results = await Promise.allSettled(
    subscribers.map((email) =>
      sendEmail({
        to: email,
        subject,
        html,
      })
    )
  )
  return results
}
