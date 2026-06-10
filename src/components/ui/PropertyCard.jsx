import { Link } from 'react-router-dom'
import { Bed, Bath, Maximize2, MapPin } from 'lucide-react'

export default function PropertyCard({ property }) {
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
          {/* Badge */}
          <span className={`absolute top-3 left-3 ${property.status === 'For Sale' ? 'badge-sale' : 'badge-rent'}`}>
            {property.status}
          </span>
        </div>

        {/* Info */}
        <div className="p-5">
          {/* Price */}
          <p className="text-xl font-bold text-brand-text mb-1">
            {property.priceLabel}
            {property.status === 'For Rent' && (
              <span className="text-sm font-normal text-brand-text-3">/mo</span>
            )}
          </p>

          {/* Title */}
          <h3 className="text-sm font-semibold text-brand-text mb-1 truncate">{property.title}</h3>

          {/* Address */}
          <div className="flex items-center gap-1 text-brand-text-3 text-xs mb-4">
            <MapPin size={11} />
            <span className="truncate">{property.address}</span>
          </div>

          {/* Specs */}
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
