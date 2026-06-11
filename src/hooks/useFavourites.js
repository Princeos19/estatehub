import { useState, useEffect, useCallback } from 'react'
import { getFavourites, addFavourite, removeFavourite } from '../lib/favourites'
import { useAuthContext } from '../context/AuthContext'

export function useFavourites() {
  const { user } = useAuthContext()
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchFavourites = useCallback(async () => {
    if (!user) { setFavourites([]); return }
    setLoading(true)
    try {
      const ids = await getFavourites(user.id)
      setFavourites(ids)
    } catch {
      setFavourites([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => { fetchFavourites() }, [fetchFavourites])

  const isFavourited = (listingId) => favourites.includes(listingId)

  const toggleFavourite = async (listingId) => {
    if (!user) return false // Signal: not logged in

    if (isFavourited(listingId)) {
      setFavourites((prev) => prev.filter((id) => id !== listingId))
      await removeFavourite(user.id, listingId)
    } else {
      setFavourites((prev) => [...prev, listingId])
      await addFavourite(user.id, listingId)
    }
    return true
  }

  return { favourites, isFavourited, toggleFavourite, loading }
}
