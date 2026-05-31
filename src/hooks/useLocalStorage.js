import { useState } from 'react'

// Generic hook that keeps a piece of state in sync with localStorage.
// Useful for persisting small UI preferences (sort order, dark-mode, etc.)
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  function setValue(value) {
    try {
      // Allow value to be a function (same API as useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      console.warn('useLocalStorage: could not write to localStorage', err)
    }
  }

  return [storedValue, setValue]
}
