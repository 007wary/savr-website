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

    const url = `https://${server}.api.mailchimp.com/3.0/lists/${audienceId}/members`

    const response = await fetch(url, {
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
    })

    const data = await response.json()

    // Already subscribed — not an error, handle gracefully
    if (response.status === 400 && data.title === 'Member Exists') {
      return Response.json(
        { error: 'This email is already subscribed.' },
        { status: 409 }
      )
    }

    if (!response.ok) {
      console.error('Mailchimp error:', data)
      return Response.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    return Response.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('Newsletter error:', err)
    return Response.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}