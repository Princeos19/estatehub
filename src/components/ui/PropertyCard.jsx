import { Link, useNavigate } from 'react-router-dom'
import { Bed, Bath, MapPin, Heart } from 'lucide-react'
import { useFavourites } from '../../hooks/useFavourites'
import { useAuthContext } from '../../context/AuthContext'

export default function PropertyCard({ property }) {
  const { user } = useAuthContext()
  const { isFavourited, toggleFavourite } = useFavourites()
  const navigate = useNavigate()
  const favourited = isFavourited(property.id)

  const handleHeart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const success = await toggleFavourite(property.id)
    if (!success) navigate('/sign-in', { state: { from: '/listings' } })
  }

  return (
    <Link to={`/listings/${property.id}`} className="block">
      <article className="property-card group">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Status badge */}
          <span className={`absolute top-3 left-3 ${property.status === 'For Sale' ? 'badge-sale' : 'badge-rent'}`}>
            {property.status}
          </span>
          {/* Heart button */}
          <button
            onClick={handleHeart}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-subtle ${
              favourited
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-brand-text-3 hover:text-red-500'
            }`}
          >
            <Heart size={14} className={favourited ? 'fill-white' : ''} />
          </button>
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="text-xl font-bold text-brand-text mb-1">
            {property.priceLabel}
            {property.status === 'For Rent' && (
              <span className="text-sm font-normal text-brand-text-3">/mo</span>
            )}
          </p>
          <h3 className="text-sm font-semibold text-brand-text mb-1 truncate">{property.title}</h3>
          <div className="flex items-center gap-1 text-brand-text-3 text-xs mb-4">
            <MapPin size={11} />
            <span className="truncate">{property.address}</span>
          </div>
          <div className="flex items-center gap-4 pt-4 border-t border-brand-gray-3">
            <div className="flex items-center gap-1.5 text-xs text-brand-text-2">
              <Bed size={13} className="text-brand-green" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-brand-text-2">
              <Bath size={13} className="text-brand-green" />
              <span>{property.bathrooms} Bathroom</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
