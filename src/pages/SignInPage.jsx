import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthContext } from '../context/AuthContext'

export default function SignInPage() {
  const { signIn } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(form.email, form.password)
      navigate(from, { replace: true })
    } catch (err) {
      setError('Invalid email or password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-gray flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">EH</span>
            </div>
            <span className="text-brand-text font-bold text-xl">EstateHub</span>
          </Link>
          <h1 className="text-2xl font-bold text-brand-text">Welcome back</h1>
          <p className="text-sm text-brand-text-3 mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Email address</label>
              <input
                type="email"
                required
                autoFocus
                placeholder="you@email.com"
                className="input-field"
                value={form.email}
                onChange={set('email')}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Your password"
                  className="input-field pr-10"
                  value={form.password}
                  onChange={set('password')}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-3">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2 disabled:opacity-60">
              {loading
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Signing in…</span>
                : 'Sign In'
              }
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-brand-text-3 mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/sign-up" className="text-brand-green font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
