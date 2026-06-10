import { Link } from 'react-router-dom'
import { Bed, Bath, Maximize2, MapPin, ArrowRight } from 'lucide-react'

export default function PropertyListItem({ property }) {
  return (
    <Link to={`/listings/${property.id}`} className="block">
      <article className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex flex-col sm:flex-row">
          {/* Image */}
          <div className="relative sm:w-64 shrink-0 overflow-hidden aspect-[4/3] sm:aspect-auto">
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <span className={`absolute top-3 left-3 badge ${property.status === 'For Sale' ? 'badge-sale' : 'badge-rent'}`}>
              {property.status}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between flex-1 p-5">
            <div>
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="text-base font-bold text-brand-text leading-snug">{property.title}</h3>
                <p className="text-lg font-bold text-brand-text shrink-0">{property.priceLabel}</p>
              </div>

              <div className="flex items-center gap-1 text-brand-text-3 text-xs mb-3">
                <MapPin size={11} />
                <span>{property.address}</span>
              </div>

              <p className="text-sm text-brand-text-2 leading-relaxed line-clamp-2 mb-4">
                {property.description}
              </p>
            </div>

            {/* Specs + CTA */}
            <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-brand-gray-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-brand-text-2">
                  <Bed size={13} className="text-brand-green" />
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-text-2">
                  <Bath size={13} className="text-brand-green" />
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-text-2">
                  <Maximize2 size={13} className="text-brand-green" />
                  <span>{property.area} m²</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-green flex items-center gap-1 hover:gap-2 transition-all">
                View details <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
