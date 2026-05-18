'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin', {
      headers: { 'x-admin-token': password }
    })

    if (res.ok) {
      localStorage.setItem('admin_token', password)
      router.push('/admin/posts')
    } else {
      setError('Wrong password. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6" style={{ paddingTop: '80px' }}>
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Admin</h1>
          <p className="text-gray-400">Savr website dashboard</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Enter admin password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#6C63FF] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          <button
            onClick={handleLogin}
            disabled={loading || !password}
            className="w-full bg-[#6C63FF] hover:bg-[#5a52d5] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {loading ? 'Checking...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}