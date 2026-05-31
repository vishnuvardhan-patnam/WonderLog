import { Link } from 'react-router-dom'
import { useBucketList } from '../../context/BucketListContext'
import './BucketList.css'

export default function VisitedList() {
  const { visited, removeFromVisited, addToBucketList } = useBucketList()

  if (visited.length === 0) {
    return (
      <div className="bl-empty">
        <span>🗺️</span>
        <p>No visited countries yet!</p>
        <p className="bl-empty-sub">
          Find a country and click <strong>Mark as Visited</strong>.
        </p>
      </div>
    )
  }

  // World-coverage stat: total population of visited countries
  const totalPop = visited.reduce((sum, c) => sum + (c.population || 0), 0)
  const worldPop = 8_000_000_000
  const coverage = ((totalPop / worldPop) * 100).toFixed(1)

  return (
    <>
      {/* Coverage stat banner */}
      <div className="coverage-banner">
        <span className="coverage-stat">{coverage}%</span>
        <span className="coverage-label">of world population in your visited countries</span>
      </div>

      <ul className="bl-list">
        {visited.map(country => (
          <li key={country.cca3} className="bl-item">
            <Link to={`/country/${country.cca3}`} className="bl-flag-link">
              <img
                src={country.flags?.svg || country.flags?.png}
                alt={country.name.common}
                className="bl-flag"
              />
            </Link>

            <div className="bl-info">
              <Link to={`/country/${country.cca3}`} className="bl-name">
                {country.name.common}
              </Link>
              <span className="bl-sub">{country.capital?.[0]} · {country.region}</span>
            </div>

            <div className="bl-actions">
              <button
                className="bl-action-btn wishlist"
                onClick={() => {
                  removeFromVisited(country.cca3)
                  addToBucketList(country)
                }}
                title="Move back to wish list"
              >
                🤍 Wish List
              </button>
              <button
                className="bl-action-btn remove"
                onClick={() => removeFromVisited(country.cca3)}
                title="Remove"
                aria-label="Remove from visited"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}
