export async function POST(request) {
  try {
    const token = request.headers.get('x-admin-token')
    if (token !== process.env.ADMIN_PASSWORD) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, excerpt, slug } = await request.json()

    const apiKey = process.env.MAILCHIMP_API_KEY
    const server = process.env.MAILCHIMP_SERVER
    const audienceId = process.env.MAILCHIMP_AUDIENCE_ID

    // Fetch all newsletter subscribers from Mailchimp
    const mcRes = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members?tag=newsletter&count=1000&status=subscribed`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`anystring:${apiKey}`).toString('base64')}`,
        },
      }
    )

    const mcData = await mcRes.json()
    const members = mcData.members || []

    if (members.length === 0) {
      return Response.json({ message: 'No subscribers to notify.' }, { status: 200 })
    }

    const postUrl = `https://savrappindia.vercel.app/blog/${slug}`

    const htmlContent = `
      <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;background:#ffffff;">
        <div style="background:#6C63FF;padding:24px 32px;">
          <span style="font-size:20px;font-weight:700;color:#ffffff;letter-spacing:0.05em;">SAVR</span>
        </div>
        <div style="padding:40px 32px;">
          <p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6C63FF;margin:0 0 16px;">New Post</p>
          <h1 style="font-size:22px;font-weight:700;color:#111111;margin:0 0 16px;line-height:1.4;">${title}</h1>
          <p style="font-size:15px;line-height:1.7;color:#555555;margin:0 0 32px;">${excerpt}</p>
          <a href="${postUrl}"
            style="display:inline-block;background:#6C63FF;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:8px;font-size:14px;font-weight:600;">
            Read Post
          </a>
        </div>
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
            You are receiving this because you subscribed at savrappindia.vercel.app.
            &nbsp;|&nbsp; &copy; 2026 Wary Dev. All rights reserved.
          </p>
        </div>
      </div>
    `

    // Send to each subscriber
    const results = await Promise.allSettled(
      members.map(member =>
        fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: { name: 'Savr', email: '007mwnswrangwary@gmail.com' },
            to: [{ email: member.email_address }],
            subject: `New on Savr Blog: ${title}`,
            htmlContent,
          }),
        })
      )
    )

    const sent = results.filter(r => r.status === 'fulfilled').length

    return Response.json({ message: `Notified ${sent} of ${members.length} subscribers.` }, { status: 200 })

  } catch (err) {
    console.error('Notify error:', err)
    return Response.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}