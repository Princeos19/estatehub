import { useState, useEffect } from 'react'
import { getListingById, getSimilarListings } from '../lib/api'

export function useListing(id) {
  const [listing, setListing] = useState(null)
  const [similar, setSimilar] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    async function fetchListing() {
      try {
        setLoading(true)
        setError(null)
        const data = await getListingById(id)
        if (!cancelled) {
          setListing(data)
          const similarData = await getSimilarListings(data.type, id)
          if (!cancelled) setSimilar(similarData)
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchListing()
    return () => { cancelled = true }
  }, [id])

  return { listing, similar, loading, error }
}