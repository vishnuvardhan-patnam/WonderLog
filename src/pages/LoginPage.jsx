import LoginForm from '../components/Auth/LoginForm'
import './Pages.css'

export default function LoginPage() {
  return (
    <div className="auth-page">
      {/* Decorative background blobs */}
      <div className="auth-blob blob-1" />
      <div className="auth-blob blob-2" />
      <LoginForm />
    </div>
  )
}
