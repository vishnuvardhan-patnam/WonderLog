import { createContext, useContext, useState, useEffect } from 'react'

// Auth context holds user info and login/logout helpers.
// Token is persisted in localStorage so the session survives a refresh.
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Rehydrate from localStorage on first render
    const stored = localStorage.getItem('wl_user')
    return stored ? JSON.parse(stored) : null
  })

  const [token, setToken] = useState(() => localStorage.getItem('wl_token') || null)

  // Keep localStorage in sync whenever user/token change
  useEffect(() => {
    if (user && token) {
      localStorage.setItem('wl_user', JSON.stringify(user))
      localStorage.setItem('wl_token', token)
    } else {
      localStorage.removeItem('wl_user')
      localStorage.removeItem('wl_token')
    }
  }, [user, token])

  // ── Local user store (replaces Reqres.in which is now unreliable) ─────────
  // Registered accounts are saved in localStorage under 'wl_accounts'.
  // This is intentionally simple — a real app would use a real backend.
  function getAccounts() {
    try {
      return JSON.parse(localStorage.getItem('wl_accounts') || '{}')
    } catch {
      return {}
    }
  }

  function saveAccount(email, password) {
    const accounts = getAccounts()
    accounts[email] = password
    localStorage.setItem('wl_accounts', JSON.stringify(accounts))
  }

  // Generate a fake JWT-like token so the rest of the app behaves identically
  function makeToken(email) {
    return btoa(email + ':' + Date.now())
  }

  // ── Login ────────────────────────────────────────────────────────────────
  async function login(email, password) {
    if (!email || !password) throw new Error('Email and password are required.')

    // Demo account always works with any password — matches the old Reqres behaviour
    const DEMO_EMAIL = 'eve.holt@reqres.in'
    if (email === DEMO_EMAIL) {
      const tok = makeToken(email)
      setToken(tok)
      setUser({ email, name: email.split('@')[0] })
      return { token: tok }
    }

    // For all other accounts check they registered first
    const accounts = getAccounts()
    if (!accounts[email]) {
      throw new Error('No account found for this email. Please sign up first.')
    }
    if (accounts[email] !== password) {
      throw new Error('Incorrect password.')
    }

    const tok = makeToken(email)
    setToken(tok)
    setUser({ email, name: email.split('@')[0] })
    return { token: tok }
  }

  // ── Register ─────────────────────────────────────────────────────────────
  async function register(email, password) {
    if (!email || !password) throw new Error('Email and password are required.')

    const accounts = getAccounts()
    if (accounts[email]) {
      throw new Error('An account with this email already exists. Please sign in.')
    }

    saveAccount(email, password)

    const tok = makeToken(email)
    setToken(tok)
    setUser({ email, name: email.split('@')[0] })
    return { token: tok }
  }

  function logout() {
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — throws a clear error if used outside the provider
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
