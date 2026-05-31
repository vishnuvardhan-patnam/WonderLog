import { Link } from 'react-router-dom'
import { useBucketList } from '../../context/BucketListContext'
import './BucketList.css'

export default function WishList() {
  const { bucketList, removeFromBucketList, markAsVisited } = useBucketList()

  if (bucketList.length === 0) {
    return (
      <div className="bl-empty">
        <span>🌎</span>
        <p>Your wish list is empty!</p>
        <p className="bl-empty-sub">
          <Link to="/explore">Explore countries</Link> and tap the heart icon to add them.
        </p>
      </div>
    )
  }

  return (
    <ul className="bl-list">
      {bucketList.map(country => (
        <li key={country.cca3} className="bl-item">
          {/* Flag thumbnail */}
          <Link to={`/country/${country.cca3}`} className="bl-flag-link">
            <img
              src={country.flags?.svg || country.flags?.png}
              alt={country.name.common}
              className="bl-flag"
            />
          </Link>

          {/* Info */}
          <div className="bl-info">
            <Link to={`/country/${country.cca3}`} className="bl-name">
              {country.name.common}
            </Link>
            <span className="bl-sub">{country.capital?.[0]} · {country.region}</span>
          </div>

          {/* Actions */}
          <div className="bl-actions">
            <button
              className="bl-action-btn visited"
              onClick={() => markAsVisited(country)}
              title="Mark as visited"
            >
              ✅ Visited
            </button>
            <button
              className="bl-action-btn remove"
              onClick={() => removeFromBucketList(country.cca3)}
              title="Remove"
              aria-label="Remove from wish list"
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
