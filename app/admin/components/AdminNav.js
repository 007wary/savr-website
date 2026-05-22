'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin'

  function logout() {
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
      background: '#0A0A0F',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      height: '60px',
      display: 'flex', alignItems: 'center',
      padding: '0 32px',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%', maxWidth: '1200px', margin: '0 auto',
      }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6C63FF' }} />
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>Savr</span>
          <span style={{ color: '#6b7280', fontSize: 13, marginLeft: 4 }}>Admin</span>
        </div>

        {/* Nav tabs */}
        {!isLoginPage && (
          <div style={{
            display: 'flex', gap: 4,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 10, padding: 4,
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            {[
              { label: 'Posts', href: '/admin/posts' },
              { label: 'Analytics', href: '/admin/analytics' },
            ].map(({ label, href }) => {
              const active = pathname.startsWith(href)
              return (
                <Link key={href} href={href} style={{
                  padding: '6px 18px', borderRadius: 7,
                  fontSize: 13, fontWeight: 500,
                  textDecoration: 'none',
                  background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: active ? '#fff' : '#6b7280',
                  border: active ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
                  transition: 'all 0.2s',
                }}>{label}</Link>
              )
            })}
          </div>
        )}

        {/* Logout / spacer */}
        {!isLoginPage ? (
          <button onClick={logout} style={{
            background: 'rgba(255,255,255,0.05)', color: '#9ca3af',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '7px 16px', borderRadius: 10,
            cursor: 'pointer', fontSize: 13, fontWeight: 500,
            fontFamily: 'inherit',
          }}>Logout</button>
        ) : (
          <div style={{ width: 80 }} />
        )}

      </div>
    </div>
  )
}