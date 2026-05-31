import { useState, useEffect } from 'react'

// restcountries.com returns HTTP 400 in India and some other regions
// due to IP-based geo-blocking. We use a GitHub-hosted mirror of the
// same dataset (mledoze/countries) which is always accessible, then
// add flag URLs from flagcdn.com (a free flag CDN, no key needed).

const MIRROR_URL =
  'https://raw.githubusercontent.com/mledoze/countries/master/countries.json'

// Approximate populations (top 30 by population; rest default to 0)
// This lets us show meaningful numbers without a separate API call.
const POP_MAP = {
  CHN:1412000000,IND:1380004385,USA:331002651,IDN:273523615,PAK:220892340,
  BRA:212559417,NGA:206139589,BGD:164689383,RUS:145912025,ETH:114963588,
  MEX:128932753,JPN:125836021,PHL:109581078,EGY:102334404,COD:89561403,
  VNM:97338579,IRN:83992949,TUR:84339067,DEU:83783942,THA:69799978,
  GBR:67886011,FRA:65273511,TZA:59734218,ZAF:59308690,MMR:54409800,
  KEN:53771296,KOR:51269185,COL:50882891,ESP:46754778,UGA:45741007,
  ARG:45195774,DZA:43851044,SDN:43849260,IRQ:40222493,UKR:43733762,
  CAN:37742154,MAR:36910560,SAU:34813871,POL:37846611,MOZ:31255435,
  PER:32971854,AGO:32866272,YEM:29825964,GHA:31072940,AFG:38928346,
  VEN:28435943,NER:24206644,AUS:25499884,PRK:25778816,MYS:32365999,
}

let cachedCountries = null

export function useCountries() {
  const [countries, setCountries] = useState(cachedCountries || [])
  const [loading, setLoading] = useState(!cachedCountries)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (cachedCountries) return
    let cancelled = false

    async function fetchCountries() {
      setLoading(true)
      setError(null)

      try {
        // 1. Try the official REST Countries API first
        //    (works outside India; fast and has all fields)
        let data = null
        try {
          const res = await fetch('https://restcountries.com/v3.1/all')
          if (res.ok) {
            data = await res.json()
          }
        } catch { /* blocked — fall through */ }

        // 2. Fall back to the GitHub mirror + flagcdn.com
        if (!data || !Array.isArray(data) || data.length === 0) {
          const res = await fetch(MIRROR_URL)
          if (!res.ok) throw new Error('Could not load country data.')
          const raw = await res.json()

          // Normalise to the same shape the rest of the app expects
          data = raw.map(c => ({
            name:       c.name,                       // { common, official, native }
            cca2:       c.cca2,
            cca3:       c.cca3,
            capital:    c.capital || [],
            population: POP_MAP[c.cca3] || 0,
            region:     c.region || '',
            subregion:  c.subregion || '',
            // flagcdn.com serves SVG/PNG flags free, keyed on ISO 2-letter code
            flags: {
              svg: `https://flagcdn.com/${c.cca2?.toLowerCase()}.svg`,
              png: `https://flagcdn.com/w320/${c.cca2?.toLowerCase()}.png`,
              alt: `Flag of ${c.name?.common}`,
            },
            currencies: c.currencies || {},
            languages:  c.languages  || {},
            timezones:  c.timezones  || ['UTC'],
            borders:    c.borders    || [],
            area:       c.area       || 0,
          }))
        }

        const sorted = data
          .filter(c => c?.name?.common)
          .sort((a, b) => a.name.common.localeCompare(b.name.common))

        cachedCountries = sorted
        if (!cancelled) {
          setCountries(sorted)
          setError(null)
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load countries.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchCountries()
    return () => { cancelled = true }
  }, [])

  return { countries, loading, error }
}
