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
    const footer = `
      <div style="border-top:1px solid #eeeeee;padding:24px 32px;background:#f9f9f9;">
        <table style="width:100%;border-collapse:collapse;">
          <tr>
            <td style="vertical-align:middle;">
              <span style="font-size:14px;font-weight:700;color:#6C63FF;letter-spacing:0.05em;">SAVR</span>
              <p style="font-size:12px;color:#999999;margin:4px 0 0;">Your Money, In Control.</p>
            </td>
            <td style="text-align:right;vertical-align:middle;">
              <a href="https://savrappindia.vercel.app" style="font-size:12px;color:#6C63FF;text-decoration:none;">savrappindia.vercel.app</a>
            </td>
          </tr>
        </table>
        <p style="font-size:11px;color:#bbbbbb;margin:16px 0 0;">
          ${isAppUser
            ? 'You are receiving this because you signed up for Savr on Android.'
            : 'You are receiving this because you subscribed at savrappindia.vercel.app.'
          }
          &nbsp;|&nbsp; &copy; 2026 Wary Dev. All rights reserved.
        </p>
      </div>
    `

    const newsletterHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;background:#ffffff;">
        <div style="background:#6C63FF;padding:24px 32px;">
          <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">SAVR</span>
        </div>
        <div style="padding:40px 32px;">
          <h1 style="font-size:24px;font-weight:700;color:#111111;margin:0 0 16px;">You are on the list.</h1>
          <p style="font-size:15px;line-height:1.7;color:#555555;margin:0 0 12px;">
            Thanks for subscribing. You will hear from us when there is something worth reading — app updates, money tips, and the occasional behind-the-scenes post from building Savr.
          </p>
          <p style="font-size:15px;line-height:1.7;color:#555555;margin:0 0 32px;">
            We keep it minimal. No spam, ever.
          </p>
          <a href="https://play.google.com/store/apps/details?id=com.saver.savr"
            style="display:inline-block;background:#6C63FF;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:8px;font-size:14px;font-weight:600;">
            Download Savr — Free
          </a>
        </div>
        ${footer}
      </div>
    `

    const appHtml = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;background:#ffffff;">
        <div style="background:#6C63FF;padding:24px 32px;">
          <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">SAVR</span>
        </div>
        <div style="padding:40px 32px;">
          <h1 style="font-size:24px;font-weight:700;color:#111111;margin:0 0 16px;">Welcome to Savr.</h1>
          <p style="font-size:15px;line-height:1.7;color:#555555;margin:0 0 12px;">
            Your finances are now offline-first, private, and in your control. Everything stays on your device — no servers storing your transactions, no loan upsells, no data sharing.
          </p>
          <p style="font-size:15px;line-height:1.7;color:#555555;margin:0 0 32px;">
            Start by adding your first expense. It takes less than 10 seconds.
          </p>
          <a href="https://play.google.com/store/apps/details?id=com.saver.savr"
            style="display:inline-block;background:#6C63FF;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:8px;font-size:14px;font-weight:600;">
            Open Savr
          </a>
        </div>
        ${footer}
      </div>
    `

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
        htmlContent: isAppUser ? appHtml : newsletterHtml,
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