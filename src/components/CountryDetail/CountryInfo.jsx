import './CountryDetail.css'

// Format large numbers for display
function fmt(n) {
  if (!n) return 'N/A'
  return n.toLocaleString()
}

// Extract the first value from an object like { USD: { name: 'US Dollar', symbol: '$' } }
function firstEntry(obj) {
  if (!obj) return null
  const values = Object.values(obj)
  return values.length ? values[0] : null
}

export default function CountryInfo({ country, neighbors, allCountries }) {
  // Build the list of neighboring country names from their cca3 codes
  const neighborCountries = (country.borders || [])
    .map(code => allCountries.find(c => c.cca3 === code))
    .filter(Boolean)

  const currency = firstEntry(country.currencies)
  const languageList = country.languages ? Object.values(country.languages).join(', ') : 'N/A'

  return (
    <div className="country-info">
      {/* Flag */}
      <div className="detail-flag">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`Flag of ${country.name.common}`}
        />
      </div>

      <div className="detail-main">
        <h1 className="detail-name">{country.name.common}</h1>
        {country.capital?.[0] && (
          <p className="detail-capital">📍 {country.capital[0]}</p>
        )}

        {/* Stats grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-icon">🏛️</span>
            <span className="stat-label">Capital</span>
            <span className="stat-value">{country.capital?.[0] ?? 'N/A'}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <span className="stat-label">Population</span>
            <span className="stat-value">{fmt(country.population)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🗣️</span>
            <span className="stat-label">Languages</span>
            <span className="stat-value">{languageList}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💰</span>
            <span className="stat-label">Currency</span>
            <span className="stat-value">
              {currency
                ? `${currency.name} (${Object.keys(country.currencies)[0]})`
                : 'N/A'}
            </span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🌍</span>
            <span className="stat-label">Region</span>
            <span className="stat-value">{country.region || 'N/A'}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">🕐</span>
            <span className="stat-label">Timezone</span>
            <span className="stat-value">{country.timezones?.[0] ?? 'N/A'}</span>
          </div>
        </div>

        {/* Neighboring countries */}
        {neighborCountries.length > 0 && (
          <div className="neighbors">
            <h3 className="neighbors-title">Neighboring Countries</h3>
            <div className="neighbors-list">
              {neighborCountries.map(n => (
                <span key={n.cca3} className="neighbor-chip">
                  {n.name.common}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
