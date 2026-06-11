import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuthContext } from '../context/AuthContext'

export default function SignUpPage() {
  const { signUp } = useAuthContext()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    try {
      await signUp(form.email, form.password, form.fullName)
      setSuccess(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-brand-gray flex items-center justify-center px-4 pt-16">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowRight size={24} className="text-brand-green" />
          </div>
          <h2 className="text-2xl font-bold text-brand-text mb-2">Check your email</h2>
          <p className="text-sm text-brand-text-3 mb-6">
            We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account.
          </p>
          <Link to="/sign-in" className="btn-primary w-full justify-center">
            Go to Sign In
          </Link>
        </div>
      </div>
    )
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
          <h1 className="text-2xl font-bold text-brand-text">Create your account</h1>
          <p className="text-sm text-brand-text-3 mt-1">Save properties and track enquiries</p>
        </div>

        <div className="bg-white rounded-2xl shadow-card p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                autoFocus
                placeholder="Your full name"
                className="input-field"
                value={form.fullName}
                onChange={set('fullName')}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Email address</label>
              <input
                type="email"
                required
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
                  placeholder="Min. 6 characters"
                  className="input-field pr-10"
                  value={form.password}
                  onChange={set('password')}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-3">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Confirm Password</label>
              <input
                type="password"
                required
                placeholder="Repeat your password"
                className="input-field"
                value={form.confirm}
                onChange={set('confirm')}
              />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2 disabled:opacity-60">
              {loading
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Creating account…</span>
                : 'Create Account'
              }
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-brand-text-3 mt-6">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-brand-green font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
