import CountryCard from './CountryCard'
import './Explore.css'

// Renders the grid of country cards, or empty/loading states
export default function CountryGrid({ countries, loading, error }) {
  if (loading) {
    return (
      <div className="grid-state">
        <div className="spinner" />
        <p>Loading countries…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid-state error">
        <span className="grid-state-icon">😕</span>
        <p>Failed to load countries.</p>
        <p className="grid-state-sub">{error}</p>
      </div>
    )
  }

  if (countries.length === 0) {
    return (
      <div className="grid-state">
        <span className="grid-state-icon">🔍</span>
        <p>No countries match your search.</p>
      </div>
    )
  }

  return (
    <div className="country-grid">
      {countries.map(country => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  )
}
