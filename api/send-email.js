export const config = { runtime: 'edge' }

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { type, name, email, phone, subject, message, propertyTitle, agentEmail } = await req.json()

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    const toEmail = type === 'enquiry'
      ? (agentEmail || 'hello@estatehub.com')
      : 'hello@estatehub.com'

    const emailSubject = type === 'enquiry'
      ? `New Property Enquiry — ${propertyTitle}`
      : `New Contact Message — ${subject}`

    const htmlBody = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #111111; padding: 24px; border-radius: 12px 12px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 20px;">${type === 'enquiry' ? 'New Property Enquiry' : 'New Contact Message'}</h1>
          <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 14px;">${type === 'enquiry' ? propertyTitle : subject}</p>
        </div>
        <div style="background: #F7F7F7; padding: 24px; border-radius: 0 0 12px 12px;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #888;">From: <strong style="color: #111;">${name}</strong></p>
          <p style="margin: 0 0 8px; font-size: 13px; color: #888;">Email: <a href="mailto:${email}" style="color: #3D8B37;">${email}</a></p>
          ${phone ? `<p style="margin: 0 0 8px; font-size: 13px; color: #888;">Phone: <strong style="color: #111;">${phone}</strong></p>` : ''}
          <p style="margin: 16px 0 8px; font-size: 13px; color: #888;">Message:</p>
          <p style="margin: 0; font-size: 14px; color: #111; line-height: 1.6;">${message}</p>
          <div style="margin-top: 24px;">
            <a href="mailto:${email}" style="background: #3D8B37; color: white; padding: 12px 24px; border-radius: 999px; text-decoration: none; font-size: 14px; font-weight: 600;">Reply to ${name}</a>
          </div>
        </div>
      </div>
    `

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'EstateHub <onboarding@resend.dev>',
        to: [toEmail],
        reply_to: email,
        subject: emailSubject,
        html: htmlBody,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to send email')
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}