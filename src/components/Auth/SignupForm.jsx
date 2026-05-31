import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function SignupForm() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim() || !password.trim() || !confirm.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    try {
      setError('')
      setLoading(true)
      await register(email, password)
      navigate('/explore', { replace: true })
    } catch (err) {
      // Reqres only registers a fixed set of test emails; show a helpful note
      setError(err.message + ' (Tip: try eve.holt@reqres.in)')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card">
      <div className="auth-brand">
        <span className="auth-globe">🌍</span>
        <h1 className="auth-title">WanderLog</h1>
        <p className="auth-subtitle">Your journey. Your bucket list.</p>
      </div>

      <h2 className="auth-heading">Create your account</h2>
      <p className="auth-hint">Start tracking your travel adventures.</p>

      {error && (
        <div className="auth-error" role="alert">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="field-group">
          <label htmlFor="signup-email">Email</label>
          <div className="input-wrap">
            <span className="input-icon">✉️</span>
            <input
              id="signup-email"
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
          <label htmlFor="signup-password">Password</label>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input
              id="signup-password"
              type="password"
              placeholder="Min 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="signup-confirm">Confirm Password</label>
          <div className="input-wrap">
            <span className="input-icon">🔒</span>
            <input
              id="signup-confirm"
              type="password"
              placeholder="Repeat password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account?{' '}
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}
