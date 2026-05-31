import './Explore.css'

// Controlled search input — the parent holds the query string in state.
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="search"
        placeholder="Search countries…"
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Search countries"
      />
      {value && (
        <button
          className="search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}
