import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useAuthContext } from '../context/AuthContext'
import { getFavouriteListings } from '../lib/favourites'
import PropertyCard from '../components/ui/PropertyCard'
import { PropertyCardSkeleton } from '../components/ui/Skeletons'

export default function FavouritesPage() {
  const { user } = useAuthContext()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getFavouriteListings(user.id)
      .then((data) => {
        // Shape the raw listings data
        setListings(data.map((row) => ({
          id: row.id,
          title: row.title,
          price: row.price,
          priceLabel: row.price_label,
          location: row.location,
          address: row.address,
          bedrooms: row.bedrooms,
          bathrooms: row.bathrooms,
          area: row.area,
          type: row.type,
          status: row.status,
          image: row.image,
          images: row.images || [row.image],
          description: row.description,
          featured: row.featured,
          year: row.year,
          agent: {
            name: row.agent_name,
            phone: row.agent_phone,
            email: row.agent_email,
            avatar: row.agent_avatar,
          },
        })))
      })
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div className="pt-16 min-h-screen bg-brand-gray">
      <div className="bg-white border-b border-brand-gray-3">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <Heart size={16} className="text-red-500 fill-red-500" />
            </div>
            <h1 className="text-4xl font-bold text-brand-text">Saved Properties</h1>
          </div>
          <p className="text-brand-text-3 text-sm">
            {loading ? '...' : `${listings.length} saved ${listings.length === 1 ? 'property' : 'properties'}`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <PropertyCardSkeleton key={i} />)}
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl shadow-card">
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <Heart size={24} className="text-red-300" />
            </div>
            <h3 className="text-lg font-bold text-brand-text mb-2">No saved properties yet</h3>
            <p className="text-sm text-brand-text-3 mb-6 max-w-xs">
              Browse properties and tap the heart icon to save your favourites here.
            </p>
            <Link to="/listings" className="btn-primary">Browse Properties</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((p) => <PropertyCard key={p.id} property={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
