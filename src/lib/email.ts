import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

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
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
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
  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
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
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL!,
        to: email,
        subject,
        html,
      })
    )
  )
  return results
}
