import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Go back to where they were, or fall back to /explore
  const from = location.state?.from?.pathname || '/explore'

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    try {
      setError('')
      setLoading(true)
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Quick-fill for the demo credentials
  function fillDemo() {
    setEmail('eve.holt@reqres.in')
    setPassword('cityslicka')
  }

  return (
    <div className="auth-card">
      {/* Brand header */}
      <div className="auth-brand">
        <span className="auth-globe">🌍</span>
        <h1 className="auth-title">WanderLog</h1>
        <p className="auth-subtitle">Your journey. Your bucket list.</p>
      </div>

      <h2 className="auth-heading">Welcome back!</h2>
      <p className="auth-hint">Sign in to continue your adventures.</p>

      {/* Demo credentials helper */}
      <button type="button" className="demo-hint" onClick={fillDemo}>
        🔑 Use demo credentials
      </button>

      {error && (
        <div className="auth-error" role="alert">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="field-group">
          <label htmlFor="login-email">Email</label>
          <div className="input-wrap">
            <span className="input-icon">✉️</span>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="login-password">
            Password
            <Link to="/forgot" className="forgot-link">Forgot password?</Link>
          </label>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="toggle-pw"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>

      <div className="auth-divider"><span>or</span></div>

      <button className="btn-google" disabled>
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google"
          width="18" height="18"
        />
        Continue with Google
      </button>

      <p className="auth-switch">
        Don't have an account?{' '}
        <Link to="/signup">Create account</Link>
      </p>
    </div>
  )
}
