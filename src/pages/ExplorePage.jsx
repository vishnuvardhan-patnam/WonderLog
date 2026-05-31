import { useState, useMemo } from 'react'
import SearchBar from '../components/Explore/SearchBar'
import CountryGrid from '../components/Explore/CountryGrid'
import { useCountries } from '../hooks/useCountries'
import './Pages.css'

// All unique regions from the REST Countries data
const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

export default function ExplorePage() {
  const { countries, loading, error } = useCountries()
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [sort, setSort] = useState('name') // 'name' | 'population' | 'area'

  // Filter + sort countries whenever the query, region, or sort changes
  const filtered = useMemo(() => {
    let result = countries

    // Region filter
    if (region !== 'All') {
      result = result.filter(c => c.region === region)
    }

    // Search filter (name, capital, region)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      result = result.filter(
        c =>
          c.name.common.toLowerCase().includes(q) ||
          c.capital?.[0]?.toLowerCase().includes(q) ||
          c.region?.toLowerCase().includes(q)
      )
    }

    // Sort
    result = [...result].sort((a, b) => {
      if (sort === 'population') return (b.population || 0) - (a.population || 0)
      if (sort === 'area')       return (b.area || 0) - (a.area || 0)
      return a.name.common.localeCompare(b.name.common)
    })

    return result
  }, [countries, query, region, sort])

  return (
    <div className="page explore-page">
      {/* Page header */}
      <div className="explore-header">
        <div>
          <h1 className="page-title">Explore</h1>
          <p className="page-sub">
            {loading ? 'Loading…' : `${filtered.length} countries`}
          </p>
        </div>

        {/* Search + sort controls */}
        <div className="explore-controls">
          <SearchBar value={query} onChange={setQuery} />
          <select
            className="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
            aria-label="Sort countries"
          >
            <option value="name">A–Z Name</option>
            <option value="population">Population ↓</option>
            <option value="area">Area ↓</option>
          </select>
        </div>
      </div>

      {/* Region filter chips */}
      <div className="region-filters" role="group" aria-label="Filter by region">
        {REGIONS.map(r => (
          <button
            key={r}
            className={`region-chip ${region === r ? 'active' : ''}`}
            onClick={() => setRegion(r)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Country grid */}
      <CountryGrid countries={filtered} loading={loading} error={error} />
    </div>
  )
}
