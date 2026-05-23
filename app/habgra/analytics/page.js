'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const PROXY_URL = '/api/analytics-proxy'
const PAGE_SIZE = 20

function timeAgo(date) {
  const diff = Date.now() - date.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return mins + 'm ago'
  if (hours < 24) return hours + 'h ago'
  if (days < 30) return days + 'd ago'
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function BarList({ items, color }) {
  if (!items.length) return <div style={S.empty}>No data yet</div>
  const max = items[0][1]
  return items.map(([label, count], i) => (
    <div key={i} style={S.barRow}>
      <div style={S.barLabel}>{label}</div>
      <div style={S.barBg}><div style={{ ...S.barFill, width: `${(count / max) * 100}%`, background: color }} /></div>
      <div style={S.barVal}>{count}</div>
    </div>
  ))
}

function MiniChart({ days, colorFn }) {
  const max = Math.max(...days.map(d => d.count), 1)
  const [tooltip, setTooltip] = useState(null)
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
      {tooltip && (
        <div style={{
          position: 'absolute', top: -36, left: tooltip.x, transform: 'translateX(-50%)',
          background: '#222', border: '1px solid #333', borderRadius: 8,
          padding: '5px 10px', fontSize: 12, color: '#f0f0f0',
          whiteSpace: 'nowrap', zIndex: 10, pointerEvents: 'none',
        }}>
          <span style={{ color: '#888', marginRight: 6 }}>{tooltip.date}</span>
          <span style={{ fontWeight: 600, color: '#6C63FF' }}>{tooltip.count}</span>
        </div>
      )}
      {days.map((d, i) => (
        <div key={i}
          onMouseEnter={e => {
            const rect = e.currentTarget.getBoundingClientRect()
            const parentRect = e.currentTarget.parentElement.getBoundingClientRect()
            setTooltip({ x: rect.left - parentRect.left + rect.width / 2, date: d.label || '', count: d.count })
          }}
          onMouseLeave={() => setTooltip(null)}
          style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end', cursor: 'default' }}>
          <div style={{ width: '100%', height: `${Math.max((d.count / max) * 100, d.count > 0 ? 6 : 0)}%`, minHeight: 3, borderRadius: '4px 4px 0 0', background: colorFn(d, i), transition: 'height 0.8s ease', opacity: tooltip ? (tooltip.count === d.count ? 1 : 0.5) : 1 }} />
          <div style={{ fontSize: 10, color: d.isToday ? '#00D9A5' : '#555' }}>{d.isToday ? '·' : ''}</div>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const router = useRouter()
  const secretRef = useRef('cookie')
  const [allUsers, setAllUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState('Loading...')
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [userModal, setUserModal] = useState(null)
  const [notifTitle, setNotifTitle] = useState('')
  const [notifBody, setNotifBody] = useState('')
  const [notifTarget, setNotifTarget] = useState('all')
  const [notifStatus, setNotifStatus] = useState(null)
  const [sending, setSending] = useState(false)
  const [dateRange, setDateRange] = useState(30)

  useEffect(() => {
    loadAll()
    const interval = setInterval(() => loadAll(), 30000)

    const socket = new WebSocket('wss://fsrbsqhlgfdqugixqtxc.supabase.co/realtime/v1/websocket?apikey=sb_publishable_fTC_70PzCNPOs0_sNh1nEQ_Boj4EjqC&vsn=1.0.0')
    socket.onopen = () => socket.send(JSON.stringify({
      topic: 'realtime:public:user_profiles', event: 'phx_join',
      payload: { config: { broadcast: { self: true }, presence: { key: '' }, postgres_changes: [{ event: '*', schema: 'public', table: 'user_profiles' }] } },
      ref: '1'
    }))
    socket.onmessage = (e) => { if (JSON.parse(e.data).event === 'postgres_changes') loadAll(secretRef.current) }
    socket.onerror = () => {}

    return () => { clearInterval(interval); socket.close() }
  }, [])

  useEffect(() => {
    const q = searchQuery.toLowerCase()
    setFilteredUsers(allUsers.filter(u =>
      (u.email || '').toLowerCase().includes(q) ||
      (u.full_name || '').toLowerCase().includes(q)
    ))
    setCurrentPage(1)
  }, [searchQuery, allUsers])

  async function loadAll() {
    setLastUpdated('Refreshing...')
    try {
      const res = await fetch(PROXY_URL, { credentials: 'same-origin' })
      const users = await res.json()
      setAllUsers(users || [])
      setFilteredUsers(users || [])
      setLastUpdated('Updated ' + new Date().toLocaleTimeString())
      setLoading(false)
    } catch {
      setLastUpdated('Error loading data')
      setLoading(false)
    }
  }

  // Computed values
  const now = new Date()
  const rangeStart = new Date(now - dateRange * 864e5)
  const day7 = new Date(now - 7 * 864e5)
  const day30 = new Date(now - 30 * 864e5)
  const today = now.toISOString().split('T')[0]
  const total = allUsers.length
  const activeInRange = allUsers.filter(u => u.last_active && new Date(u.last_active) > rangeStart).length
  const active7 = allUsers.filter(u => u.last_active && new Date(u.last_active) > day7).length
  const activeToday = allUsers.filter(u => u.last_active && u.last_active.startsWith(today)).length
  const fcmCount = allUsers.filter(u => u.fcm_token).length
  const newInRange = allUsers.filter(u => u.created_at && new Date(u.created_at) > rangeStart).length
  const new7 = allUsers.filter(u => u.created_at && new Date(u.created_at) > day7).length
  const new30 = allUsers.filter(u => u.created_at && new Date(u.created_at) > day30).length
  const retention = total > 0 ? Math.round((activeInRange / total) * 100) : 0
  const onlineNow = allUsers.filter(u => u.is_online).length
  const mau = allUsers.filter(u => u.last_active && new Date(u.last_active) > rangeStart).length

  const dauDays = Array.from({ length: dateRange }, (_, i) => {
    const d = new Date(now); d.setDate(d.getDate() - (dateRange - 1 - i))
    const str = d.toISOString().split('T')[0]
    const label = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    return { count: allUsers.filter(u => u.last_active && u.last_active.startsWith(str)).length, isToday: i === dateRange - 1, label }
  })
  const signupDays = Array.from({ length: Math.min(dateRange, 30) }, (_, i) => {
    const d = new Date(now); d.setDate(d.getDate() - (Math.min(dateRange, 30) - 1 - i))
    const str = d.toISOString().split('T')[0]
    const label = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
    return { count: allUsers.filter(u => u.created_at && u.created_at.startsWith(str)).length, label }
  })

  function topMap(field, limit = 8) {
    const map = {}
    allUsers.forEach(u => { if (u[field]) map[u[field]] = (map[u[field]] || 0) + 1 })
    return Object.entries(map).sort((a, b) => b[1] - a[1]).slice(0, limit)
  }
  const flags = { IN: '🇮🇳', US: '🇺🇸', GB: '🇬🇧', CA: '🇨🇦', AU: '🇦🇺', DE: '🇩🇪', SG: '🇸🇬', AE: '🇦🇪', PK: '🇵🇰' }

  const fiveMinAgo = new Date(Date.now() - 5 * 60000)
  const liveUsers = allUsers.filter(u => u.is_online && u.online_at && new Date(u.online_at) > fiveMinAgo)

  const totalPages = Math.max(Math.ceil(filteredUsers.length / PAGE_SIZE), 1)
  const safePage = Math.min(Math.max(currentPage, 1), totalPages)
  const pageStart = (safePage - 1) * PAGE_SIZE
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filteredUsers.length)
  const pageUsers = filteredUsers.slice(pageStart, pageEnd)

  const notifRecipients = (notifTarget === 'active'
    ? allUsers.filter(u => u.last_active && new Date(u.last_active) > day7)
    : allUsers
  ).filter(u => u.fcm_token)

  async function sendNotification() {
    if (!notifTitle.trim() || !notifBody.trim()) return setNotifStatus({ type: 'error', text: 'Please enter both title and message' })
    if (!notifRecipients.length) return setNotifStatus({ type: 'error', text: 'No users with FCM tokens to send to' })
    setSending(true); setNotifStatus(null)
    try {
      const res = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ title: notifTitle.trim(), body: notifBody.trim(), tokens: notifRecipients.map(u => u.fcm_token) })
      })
      const result = await res.json()
      setSending(false)
      if (result.sent > 0) {
        setNotifStatus({ type: 'success', text: `✓ Sent to ${result.sent} user${result.sent !== 1 ? 's' : ''}${result.failed > 0 ? ` (${result.failed} failed)` : ''}` })
        const history = JSON.parse(localStorage.getItem('savr_notif_history') || '[]')
        history.unshift({ title: notifTitle.trim(), body: notifBody.trim(), count: result.sent, time: new Date().toISOString() })
        localStorage.setItem('savr_notif_history', JSON.stringify(history.slice(0, 20)))
        setNotifTitle(''); setNotifBody(''); setNotifTarget('all')
      } else {
        setNotifStatus({ type: 'error', text: 'Failed to send — check FCM tokens' })
      }
    } catch {
      setSending(false)
      setNotifStatus({ type: 'error', text: 'Network error — please try again' })
    }
  }

  function getHistory() {
    try { return JSON.parse(localStorage.getItem('savr_notif_history') || '[]') } catch { return [] }
  }

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#6b7280', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={S.spinner} /> Loading analytics...
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '60px', paddingBottom: 80 }}>
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @media(max-width:640px){
          .metrics-grid{grid-template-columns:repeat(2,1fr) !important;}
          .grid2{grid-template-columns:1fr !important;}
          .grid3{grid-template-columns:repeat(2,1fr) !important;}
          .analytics-main{padding:16px !important;}
          .subtopbar{padding:10px 16px !important; flex-wrap:wrap; gap:8px;}
        }
      `}</style>

      {/* Sub-topbar */}
      <div className="subtopbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 32px', borderBottom: '1px solid #1a1a1a', background: '#0a0a0a', position: 'sticky', top: 60, zIndex: 50 }}>
        <div style={{ fontSize: 12, color: '#555' }}>{lastUpdated}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#111', border: '1px solid #222', borderRadius: 10, padding: 3 }}>
          {[7, 30, 90].map(d => (
            <button key={d} onClick={() => setDateRange(d)} style={{ padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', border: dateRange === d ? '1px solid #2a2a2a' : '1px solid transparent', background: dateRange === d ? '#181818' : 'transparent', color: dateRange === d ? '#f0f0f0' : '#555' }}>
              {d}d
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: '#00D9A522', color: '#00D9A5', border: '1px solid #00D9A533', fontWeight: 500 }}>● Live</span>
          <button onClick={() => loadAll()} style={{ background: '#181818', border: '1px solid #2a2a2a', borderRadius: 10, padding: '7px 14px', color: '#888', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>↻ Refresh</button>
        </div>
      </div>

      <div className="analytics-main" style={{ padding: '28px 32px', maxWidth: 1200, margin: '0 auto' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, background: '#111', borderRadius: 12, padding: 4, width: 'fit-content', border: '1px solid #222' }}>
          {['overview', 'users', 'notifications'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '8px 18px', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize', fontFamily: 'inherit', border: activeTab === tab ? '1px solid #2a2a2a' : '1px solid transparent', background: activeTab === tab ? '#181818' : 'transparent', color: activeTab === tab ? '#f0f0f0' : '#888' }}>{tab}</button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && <>
          {/* Live users */}
          <div style={{ ...S.card, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00D9A5', animation: 'pulse 2s infinite' }} />
              <div style={S.label}>Live users right now</div>
              <div style={{ fontSize: 13, color: '#00D9A5', fontWeight: 600, marginLeft: 'auto' }}>{liveUsers.length} online</div>
            </div>
            {liveUsers.length === 0
              ? <div style={{ fontSize: 13, color: '#555', padding: '4px 0' }}>No users online right now</div>
              : liveUsers.slice(0, 5).map(u => {
                  const name = u.full_name || u.email?.split('@')[0] || '—'
                  return (
                    <div key={u.id} style={S.row}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={S.avatar}>{name.slice(0, 2).toUpperCase()}</div>
                        <div><div style={{ fontSize: 13, fontWeight: 500, color: '#f0f0f0' }}>{name}</div><div style={{ fontSize: 11, color: '#888' }}>{u.email}</div></div>
                      </div>
                      <div style={{ fontSize: 11, color: '#00D9A5' }}>● online {u.online_at ? timeAgo(new Date(u.online_at)) : ''}</div>
                    </div>
                  )
                })
            }
          </div>

          {/* Metrics grid */}
          <div className="metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
            {[
              { label: 'Total users', val: total, sub: `${newInRange} new in ${dateRange}d` },
              { label: `Active (${dateRange}d)`, val: activeInRange, sub: `${Math.round((activeInRange / Math.max(total, 1)) * 100)}% of all users`, subColor: '#00D9A5' },
              { label: 'Active today', val: activeToday, sub: 'opened app today' },
              { label: 'FCM registered', val: fcmCount, sub: `${onlineNow} online right now` },
            ].map((m, i) => (
              <div key={i} style={S.metric}>
                <div style={S.metricLabel}>{m.label}</div>
                <div style={S.metricVal}>{m.val}</div>
                <div style={{ fontSize: 12, marginTop: 6, color: m.subColor || '#888' }}>{m.sub}</div>
              </div>
            ))}
          </div>

          {/* DAU chart */}
          <div style={{ ...S.card, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div style={S.label}>DAU — Daily Active Users (last {dateRange} days)</div>
              <div style={{ fontSize: 12, color: '#888' }}>MAU: <span style={{ color: '#6C63FF', fontWeight: 600 }}>{mau}</span></div>
            </div>
            <MiniChart days={dauDays} colorFn={d => d.isToday ? '#00D9A5' : d.count > 0 ? '#6C63FF' : '#181818'} />
            <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
              {[['Today', dauDays[29]?.count, '#00D9A5'], ['7d avg', Math.round(dauDays.slice(-7).reduce((s, d) => s + d.count, 0) / 7), '#6C63FF'], ['Peak', Math.max(...dauDays.map(d => d.count), 0), '#FFB800']].map(([l, v, c]) => (
                <div key={l} style={{ fontSize: 12, color: '#888' }}>{l}: <span style={{ color: c, fontWeight: 600 }}>{v}</span></div>
              ))}
            </div>
          </div>

          {/* Signup chart + versions */}
          <div className="grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={S.card}><div style={S.label}>Signups — last 14 days</div><MiniChart days={signupDays} colorFn={(d, i) => d.count > 0 ? ['#6C63FF', '#7B73FF', '#8A84FF'][i % 3] : '#181818'} /></div>
            <div style={S.card}><div style={S.label}>App versions in use</div><BarList items={topMap('app_version', 20).map(([v, c]) => [`v${v}`, c])} color="#6C63FF" /></div>
          </div>

          <div className="grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={S.card}><div style={S.label}>Device models</div><BarList items={topMap('device_model')} color="#00D9A5" /></div>
            <div style={S.card}><div style={S.label}>Android versions</div><BarList items={topMap('android_version').map(([v, c]) => [`Android ${v}`, c])} color="#FFB800" /></div>
          </div>

          <div className="grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={S.card}><div style={S.label}>Users by country</div><BarList items={topMap('country', 10).map(([c, n]) => [`${flags[c] || '🌍'} ${c}`, n])} color="#6C63FF" /></div>
            <div style={S.card}><div style={S.label}>Users by timezone</div><BarList items={topMap('timezone').map(([tz, n]) => [tz.split('/').pop().replace(/_/g, ' '), n])} color="#00D9A5" /></div>
          </div>

          <div className="grid3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            {[[`New (last 7d)`, new7, 'New signups'], [`New (${dateRange}d)`, newInRange, 'New signups'], [`Retention (${dateRange}d)`, `${retention}%`, 'Came back after day 1']].map(([l, v, s]) => (
              <div key={l} style={S.metric}><div style={S.metricLabel}>{l}</div><div style={S.metricVal}>{v}</div><div style={{ fontSize: 12, marginTop: 6, color: '#888' }}>{s}</div></div>
            ))}
          </div>
        </>}

        {/* ── USERS ── */}
        {activeTab === 'users' && (
          <div style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div style={S.label}>All users <span style={{ color: '#555', fontWeight: 400 }}>({filteredUsers.length})</span></div>
              <input type="text" placeholder="Search by email or name..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                style={{ background: '#181818', border: '1px solid #2a2a2a', borderRadius: 8, padding: '7px 12px', color: '#f0f0f0', fontSize: 13, outline: 'none', width: 260, fontFamily: 'inherit' }} />
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>{['User', 'Version', 'Device', 'Last active', 'Status', 'FCM'].map(h => (
                    <th key={h} style={{ fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1, padding: '10px 12px', textAlign: 'left', borderBottom: '1px solid #222' }}>{h}</th>
                  ))}</tr>
                </thead>
                <tbody>
                  {pageUsers.length === 0
                    ? <tr><td colSpan={6}><div style={S.empty}>No users found</div></td></tr>
                    : pageUsers.map(u => {
                        const name = u.full_name || u.email?.split('@')[0] || '—'
                        const lastActive = u.last_active ? new Date(u.last_active) : null
                        const isActive = lastActive && (now - lastActive) < 7 * 864e5
                        return (
                          <tr key={u.id} onClick={() => setUserModal(u)} style={{ cursor: 'pointer' }}>
                            <td style={S.td}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><div style={S.avatar}>{name.slice(0, 2).toUpperCase()}</div><div><div style={{ fontSize: 13, fontWeight: 500, color: '#f0f0f0' }}>{name}</div><div style={{ fontSize: 11, color: '#888' }}>{u.email || '—'}</div></div></div></td>
                            <td style={S.td}><span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 6, background: '#181818', border: '1px solid #2a2a2a', color: '#888', fontFamily: 'monospace' }}>{u.app_version || '—'}</span></td>
                            <td style={{ ...S.td, fontSize: 12, color: '#888' }}>{u.device_model || '—'}</td>
                            <td style={{ ...S.td, fontSize: 12, color: '#888' }}>{lastActive ? timeAgo(lastActive) : 'Never'}</td>
                            <td style={S.td}><span style={{ width: 7, height: 7, borderRadius: '50%', background: isActive ? '#00D9A5' : '#555', display: 'inline-block', marginRight: 6 }} />{isActive ? 'Active' : 'Inactive'}</td>
                            <td style={S.td}>{u.fcm_token ? <span style={{ color: '#00D9A5' }}>✓</span> : <span style={{ color: '#555' }}>—</span>}</td>
                          </tr>
                        )
                      })
                  }
                </tbody>
              </table>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTop: '1px solid #222' }}>
              <div style={{ fontSize: 13, color: '#888' }}>Showing {pageStart + 1}–{pageEnd} of {filteredUsers.length}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} style={S.pageBtn}>← Prev</button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let p = i + 1
                  if (totalPages > 5) {
                    if (safePage <= 3) p = i + 1
                    else if (safePage >= totalPages - 2) p = totalPages - 4 + i
                    else p = safePage - 2 + i
                  }
                  return <button key={p} onClick={() => setCurrentPage(p)} style={{ ...S.pageBtn, background: p === safePage ? '#6C63FF' : '#181818', borderColor: p === safePage ? '#6C63FF' : '#2a2a2a', color: p === safePage ? '#fff' : '#888' }}>{p}</button>
                })}
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} style={S.pageBtn}>Next →</button>
              </div>
            </div>
          </div>
        )}

        {/* ── NOTIFICATIONS ── */}
        {activeTab === 'notifications' && <>
          <div style={{ ...S.card, marginBottom: 20 }}>
            <div style={S.label}>Notification history</div>
            {getHistory().length === 0
              ? <div style={S.empty}>No notifications sent yet</div>
              : getHistory().map((n, i) => (
                  <div key={i} style={S.row}>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 500, color: '#f0f0f0', marginBottom: 2 }}>{n.title}</div><div style={{ fontSize: 12, color: '#888' }}>{n.body}</div></div>
                    <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}><div style={{ fontSize: 12, color: '#00D9A5', fontWeight: 500 }}>{n.count} sent</div><div style={{ fontSize: 11, color: '#555' }}>{timeAgo(new Date(n.time))}</div></div>
                  </div>
                ))
            }
          </div>
          <div className="grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={S.card}>
              <div style={S.label}>Send push notification</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <select value={notifTarget} onChange={e => setNotifTarget(e.target.value)} style={S.input}><option value="all">All users</option><option value="active">Active users (last 7 days)</option></select>
                <input type="text" value={notifTitle} onChange={e => setNotifTitle(e.target.value)} placeholder="Notification title" maxLength={60} style={S.input} />
                <textarea value={notifBody} onChange={e => setNotifBody(e.target.value)} placeholder="Notification message..." maxLength={200} style={{ ...S.input, minHeight: 90, resize: 'vertical' }} />
                <div style={S.label}>Preview</div>
                <div style={{ background: '#1e1e1e', borderRadius: 16, padding: '14px 16px', border: '1px solid #2a2a2a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}><div style={{ width: 18, height: 18, borderRadius: 5, background: '#6C63FF' }} /><div style={{ fontSize: 11, color: '#888' }}>Savr · just now</div></div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 3 }}>{notifTitle || 'Notification title'}</div>
                  <div style={{ fontSize: 12, color: '#aaa', lineHeight: 1.5 }}>{notifBody || 'Notification message will appear here...'}</div>
                </div>
                <button onClick={sendNotification} disabled={sending} style={{ background: '#6C63FF', border: 'none', borderRadius: 10, padding: 13, color: '#fff', fontSize: 14, fontWeight: 600, cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.5 : 1, fontFamily: 'inherit' }}>{sending ? 'Sending...' : 'Send Notification'}</button>
                {notifStatus && <div style={{ fontSize: 13, padding: '10px 14px', borderRadius: 8, background: notifStatus.type === 'success' ? '#00D9A522' : '#FF5C5C22', color: notifStatus.type === 'success' ? '#00D9A5' : '#FF5C5C', border: `1px solid ${notifStatus.type === 'success' ? '#00D9A533' : '#FF5C5C33'}` }}>{notifStatus.text}</div>}
              </div>
            </div>
            <div style={S.card}>
              <div style={S.label}>Recipients preview</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 12 }}>{notifRecipients.length} user{notifRecipients.length !== 1 ? 's' : ''} will receive this notification</div>
              {notifRecipients.slice(0, 5).map(u => (
                <div key={u.id} style={S.row}><div style={{ fontSize: 13, color: '#f0f0f0' }}>{u.full_name || u.email?.split('@')[0] || '—'}</div><div style={{ fontSize: 11, color: '#555' }}>{u.email}</div></div>
              ))}
              {notifRecipients.length > 5 && <div style={{ fontSize: 12, color: '#555', paddingTop: 10 }}>+{notifRecipients.length - 5} more</div>}
              {notifRecipients.length === 0 && <div style={S.empty}>No users with FCM tokens yet</div>}
              <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #222' }}>
                <div style={S.label}>Tips</div>
                <div style={{ fontSize: 13, color: '#888', lineHeight: 1.8 }}>• Keep titles under 50 characters<br />• Messages under 150 characters<br />• Only users with FCM tokens will receive<br />• Notifications deliver even when app is closed</div>
              </div>
            </div>
          </div>
        </>}
      </div>

      {/* User modal */}
      {userModal && (
        <div onClick={e => e.target === e.currentTarget && setUserModal(null)} style={{ position: 'fixed', inset: 0, background: '#00000088', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#111', border: '1px solid #222', borderRadius: 20, padding: 28, width: 480, maxWidth: '90vw', maxHeight: '85vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setUserModal(null)} style={{ position: 'absolute', top: 16, right: 16, background: '#181818', border: '1px solid #2a2a2a', borderRadius: 8, padding: '6px 12px', color: '#888', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>✕ Close</button>
            {(() => {
              const u = userModal
              const name = u.full_name || u.email?.split('@')[0] || '—'
              const isOnline = u.is_online
              const isActive = u.last_active && (Date.now() - new Date(u.last_active)) < 7 * 864e5
              return <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <div style={{ ...S.avatar, width: 52, height: 52, fontSize: 18 }}>{name.slice(0, 2).toUpperCase()}</div>
                  <div><div style={{ fontSize: 18, fontWeight: 600, color: '#f0f0f0', marginBottom: 2 }}>{name}</div><div style={{ fontSize: 13, color: '#888' }}>{u.email || '—'}</div></div>
                  <div style={{ marginLeft: 'auto' }}><span style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: isOnline ? '#00D9A522' : '#181818', color: isOnline ? '#00D9A5' : '#555', border: `1px solid ${isOnline ? '#00D9A533' : '#2a2a2a'}` }}>{isOnline ? '● Online' : 'Offline'}</span></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    ['App Version', u.app_version ? 'v' + u.app_version : '—'],
                    ['Device', u.device_model || '—'],
                    ['Android', u.android_version ? 'Android ' + u.android_version : '—'],
                    ['Country', u.country || '—'],
                    ['Timezone', u.timezone?.split('/').pop().replace(/_/g, ' ') || '—'],
                    ['Signed up', u.created_at ? new Date(u.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'],
                    ['Last active', u.last_active ? timeAgo(new Date(u.last_active)) : 'Never'],
                    ['7d status', isActive ? '✅ Active' : '⚪ Inactive'],
                    ['FCM token', u.fcm_token ? '✅ Registered' : '❌ Not registered'],
                    ['Online at', u.online_at ? timeAgo(new Date(u.online_at)) : '—'],
                  ].map(([label, value]) => (
                    <div key={label} style={{ background: '#181818', borderRadius: 10, padding: '12px 14px', border: '1px solid #2a2a2a' }}>
                      <div style={{ fontSize: 10, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#f0f0f0' }}>{value}</div>
                    </div>
                  ))}
                </div>
              </>
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

const S = {
  card: { background: '#111', border: '1px solid #1a1a1a', borderRadius: 16, padding: 20 },
  metric: { background: '#111', border: '1px solid #1a1a1a', borderRadius: 14, padding: '18px 20px' },
  metricLabel: { fontSize: 11, color: '#888', marginBottom: 8, letterSpacing: 0.5 },
  metricVal: { fontSize: 28, fontWeight: 600, color: '#f0f0f0', fontFamily: 'monospace' },
  label: { fontSize: 11, fontWeight: 600, color: '#555', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1a1a1a' },
  td: { padding: 12, borderBottom: '1px solid #1a1a1a', color: '#f0f0f0', fontSize: 13 },
  barRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 },
  barLabel: { fontSize: 12, color: '#888', width: 100, flexShrink: 0 },
  barBg: { flex: 1, height: 6, background: '#181818', borderRadius: 3, overflow: 'hidden' },
  barFill: { height: 6, borderRadius: 3 },
  barVal: { fontSize: 12, color: '#888', width: 36, textAlign: 'right', fontFamily: 'monospace', flexShrink: 0 },
  empty: { textAlign: 'center', padding: 40, color: '#888', fontSize: 14 },
  avatar: { width: 32, height: 32, borderRadius: '50%', background: '#6C63FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, flexShrink: 0, color: '#fff' },
  spinner: { width: 16, height: 16, border: '2px solid #2a2a2a', borderTopColor: '#6C63FF', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  input: { background: '#181818', border: '1px solid #2a2a2a', borderRadius: 10, padding: '12px 14px', color: '#f0f0f0', fontSize: 14, fontFamily: 'inherit', outline: 'none', width: '100%' },
  pageBtn: { background: '#181818', border: '1px solid #2a2a2a', borderRadius: 8, padding: '7px 14px', color: '#888', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 },
}