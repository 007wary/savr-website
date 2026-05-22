const SUPABASE_URL = 'https://fsrbsqhlgfdqugixqtxc.supabase.co/functions/v1/analytics-proxy'

export async function GET(request) {
  const token = request.cookies.get('admin_session')?.value
  if (token !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const res = await fetch(SUPABASE_URL, {
    headers: {
      'Content-Type': 'application/json',
      'x-dashboard-secret': process.env.ANALYTICS_SECRET,
    }
  })

  const data = await res.json()
  return Response.json(data)
}

export async function POST(request) {
  const token = request.cookies.get('admin_session')?.value
  if (token !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()

  const res = await fetch(SUPABASE_URL + '?action=notify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-dashboard-secret': process.env.ANALYTICS_SECRET,
    },
    body: JSON.stringify(body)
  })

  const data = await res.json()
  return Response.json(data)
}