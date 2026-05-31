import { useParams, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import CountryInfo from '../components/CountryDetail/CountryInfo'
import ActionButtons from '../components/CountryDetail/ActionButtons'
import { useCountries } from '../hooks/useCountries'
import './Pages.css'

export default function CountryDetailPage() {
  const { code } = useParams()           // cca3 code from the URL
  const navigate = useNavigate()
  const { countries, loading, error } = useCountries()

  // Find the matching country by its 3-letter code
  const country = useMemo(
    () => countries.find(c => c.cca3 === code),
    [countries, code]
  )

  if (loading) {
    return (
      <div className="page detail-page">
        <div className="detail-loading">
          <div className="spinner" />
          <p>Loading country…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page detail-page">
        <p className="detail-error">Failed to load countries: {error}</p>
      </div>
    )
  }

  if (!country) {
    return (
      <div className="page detail-page">
        <p className="detail-error">Country "{code}" not found.</p>
        <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>
      </div>
    )
  }

  return (
    <div className="page detail-page">
      <button className="btn-back" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-layout">
        {/* Left column: flag + facts */}
        <div className="detail-left">
          <CountryInfo country={country} allCountries={countries} />
        </div>

        {/* Right column: bucket-list actions (sticky on desktop) */}
        <div className="detail-right">
          <div className="detail-actions-card">
            <h2 className="actions-heading">Your Travel Status</h2>
            <ActionButtons country={country} />
          </div>
        </div>
      </div>
    </div>
  )
}
