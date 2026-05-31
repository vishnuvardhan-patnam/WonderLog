import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  // Helper to add active class
  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link'

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/explore" className="navbar-brand">
          <span className="brand-icon">🌍</span>
          <span className="brand-name">WanderLog</span>
        </Link>

        {/* Nav links (only shown when logged in) */}
        {user && (
          <nav className="navbar-links">
            <Link to="/explore" className={isActive('/explore')}>Explore</Link>
            <Link to="/bucketlist" className={isActive('/bucketlist')}>Bucket List</Link>
          </nav>
        )}

        {/* User area */}
        {user && (
          <div className="navbar-user">
            <div className="user-avatar" title={user.email}>
              {user.name?.[0]?.toUpperCase() || '?'}
            </div>
            <span className="user-name">{user.name}</span>
            <button className="btn-logout" onClick={handleLogout}>Sign out</button>
          </div>
        )}
      </div>
    </header>
  )
}
