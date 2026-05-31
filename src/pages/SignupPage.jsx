import SignupForm from '../components/Auth/SignupForm'
import './Pages.css'

export default function SignupPage() {
  return (
    <div className="auth-page">
      <div className="auth-blob blob-1" />
      <div className="auth-blob blob-2" />
      <SignupForm />
    </div>
  )
}
