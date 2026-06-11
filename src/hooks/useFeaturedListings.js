import { useState, useEffect } from 'react'
import { getFeaturedListings } from '../lib/api'

export function useFeaturedListings(limit = 6) {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function fetchFeatured() {
      try {
        setLoading(true)
        setError(null)
        const data = await getFeaturedListings(limit)
        if (!cancelled) setListings(data)
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchFeatured()
    return () => { cancelled = true }
  }, [limit])

  return { listings, loading, error }
}