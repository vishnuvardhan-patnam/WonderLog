import { Link } from 'react-router-dom'
import { useBucketList } from '../../context/BucketListContext'
import './Explore.css'

// Format large numbers nicely (e.g. 125360000 → 125.36M)
function formatPop(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + 'B'
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(2) + 'M'
  if (n >= 1_000)         return (n / 1_000).toFixed(2) + 'K'
  return String(n)
}

export default function CountryCard({ country }) {
  const { isInBucketList, isVisited, addToBucketList, markAsVisited } = useBucketList()

  const inBucket  = isInBucketList(country.cca3)
  const hasVisited = isVisited(country.cca3)

  const capital = country.capital?.[0] ?? 'N/A'

  function handleWishlist(e) {
    e.preventDefault() // prevent Link navigation
    if (!inBucket && !hasVisited) addToBucketList(country)
  }

  function handleVisited(e) {
    e.preventDefault()
    markAsVisited(country)
  }

  return (
    <Link to={`/country/${country.cca3}`} className="country-card">
      {/* Flag */}
      <div className="card-flag">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`Flag of ${country.name.common}`}
          loading="lazy"
        />
        {hasVisited && <span className="card-badge visited">✓ Visited</span>}
        {inBucket && !hasVisited && <span className="card-badge wish">♡ Wishlist</span>}
      </div>

      {/* Info */}
      <div className="card-body">
        <h3 className="card-name">{country.name.common}</h3>
        <p className="card-meta">
          <span>📍 {capital}</span>
          <span>👥 {formatPop(country.population)}</span>
        </p>
        <p className="card-region">{country.region}</p>
      </div>

      {/* Quick action buttons */}
      <div className="card-actions">
        <button
          className={`card-btn wishlist ${inBucket ? 'active' : ''}`}
          onClick={handleWishlist}
          title="Add to bucket list"
          aria-label={inBucket ? 'In bucket list' : 'Add to bucket list'}
        >
          {inBucket ? '❤️' : '🤍'}
        </button>
        <button
          className={`card-btn visited-btn ${hasVisited ? 'active' : ''}`}
          onClick={handleVisited}
          title="Mark as visited"
          aria-label={hasVisited ? 'Visited' : 'Mark as visited'}
        >
          {hasVisited ? '✅' : '☑️'}
        </button>
      </div>
    </Link>
  )
}
