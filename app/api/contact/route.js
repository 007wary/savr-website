import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return Response.json({ error: 'All fields are required.' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'Savr Contact <onboarding@resend.dev>',
      to: '007mwnswrangwary@gmail.com',
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}