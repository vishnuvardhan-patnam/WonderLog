import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

// Each user gets their own bucket-list and visited-list stored in localStorage.
// Keys are scoped by email so different users get separate lists.
const BucketListContext = createContext(null)

export function BucketListProvider({ children }) {
  const { user } = useAuth()

  // Build storage key from the current user's email (or 'guest')
  const storageKey = user ? `wl_bucket_${user.email}` : null

  const [bucketList, setBucketList] = useState([])
  const [visited, setVisited] = useState([])

  // Load saved data whenever the user changes (login / logout)
  useEffect(() => {
    if (!storageKey) {
      setBucketList([])
      setVisited([])
      return
    }
    const raw = localStorage.getItem(storageKey)
    if (raw) {
      const saved = JSON.parse(raw)
      setBucketList(saved.bucketList || [])
      setVisited(saved.visited || [])
    } else {
      setBucketList([])
      setVisited([])
    }
  }, [storageKey])

  // Persist to localStorage on every change
  useEffect(() => {
    if (!storageKey) return
    localStorage.setItem(storageKey, JSON.stringify({ bucketList, visited }))
  }, [bucketList, visited, storageKey])

  // ── Helpers ─────────────────────────────────────────────────────────────

  // country is the full country object from the REST Countries API
  function addToBucketList(country) {
    setBucketList(prev =>
      prev.find(c => c.cca3 === country.cca3) ? prev : [...prev, country]
    )
  }

  function removeFromBucketList(cca3) {
    setBucketList(prev => prev.filter(c => c.cca3 !== cca3))
  }

  function markAsVisited(country) {
    // Remove from bucket list if present, then add to visited
    setBucketList(prev => prev.filter(c => c.cca3 !== country.cca3))
    setVisited(prev =>
      prev.find(c => c.cca3 === country.cca3) ? prev : [...prev, country]
    )
  }

  function removeFromVisited(cca3) {
    setVisited(prev => prev.filter(c => c.cca3 !== cca3))
  }

  function isInBucketList(cca3) {
    return bucketList.some(c => c.cca3 === cca3)
  }

  function isVisited(cca3) {
    return visited.some(c => c.cca3 === cca3)
  }

  return (
    <BucketListContext.Provider
      value={{
        bucketList,
        visited,
        addToBucketList,
        removeFromBucketList,
        markAsVisited,
        removeFromVisited,
        isInBucketList,
        isVisited,
      }}
    >
      {children}
    </BucketListContext.Provider>
  )
}

export function useBucketList() {
  const ctx = useContext(BucketListContext)
  if (!ctx) throw new Error('useBucketList must be used inside <BucketListProvider>')
  return ctx
}
