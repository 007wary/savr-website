export async function POST(request) {
  try {
    const { email, tag } = await request.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const normalised = email.toLowerCase().trim()
    const apiKey = process.env.MAILCHIMP_API_KEY
    const server = process.env.MAILCHIMP_SERVER
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

    const mcResponse = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: normalised,
          status: 'subscribed',
          tags: [tag || 'newsletter'],
        }),
      }
    )

    const mcData = await mcResponse.json()

    if (mcResponse.status === 400 && mcData.title === 'Member Exists') {
      return Response.json(
        { error: 'This email is already subscribed.' },
        { status: 409 }
      )
    }

    if (!mcResponse.ok) {
      console.error('Mailchimp error:', mcData)
      return Response.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    const isAppUser = tag === 'app-user'

    await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Savr', email: '007mwnswrangwary@gmail.com' },
        to: [{ email: normalised }],
        subject: isAppUser ? 'Welcome to Savr.' : 'You are on the list.',
        htmlContent: isAppUser
          ? '<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#111"><p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6C63FF;margin:0 0 24px">Savr</p><h1 style="font-size:22px;font-weight:700;margin:0 0 16px">Welcome to Savr.</h1><p style="font-size:15px;line-height:1.7;color:#444;margin:0 0 16px">Your finances are now offline-first, private, and in your control.</p><p style="font-size:15px;line-height:1.7;color:#444;margin:0 0 32px">No loan upsells. No data sharing. Just you and your money.</p><a href="https://play.google.com/store/apps/details?id=com.saver.savr" style="display:inline-block;background:#6C63FF;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">Open Savr</a><p style="font-size:12px;color:#999;margin:40px 0 0">You are receiving this because you signed up for Savr.</p></div>'
          : '<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 24px;color:#111"><p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6C63FF;margin:0 0 24px">Savr</p><h1 style="font-size:22px;font-weight:700;margin:0 0 16px">You are on the list.</h1><p style="font-size:15px;line-height:1.7;color:#444;margin:0 0 16px">You will hear from us when there is something worth reading — app updates, money tips, and the occasional behind-the-scenes post.</p><p style="font-size:15px;line-height:1.7;color:#444;margin:0 0 32px">In the meantime, download Savr and take control of your finances.</p><a href="https://play.google.com/store/apps/details?id=com.saver.savr" style="display:inline-block;background:#6C63FF;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;font-weight:600">Download Savr</a><p style="font-size:12px;color:#999;margin:40px 0 0">You are receiving this because you subscribed at savrappindia.vercel.app.</p></div>',
      }),
    })

    return Response.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('Newsletter error:', err)
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
