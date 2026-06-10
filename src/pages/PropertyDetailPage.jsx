import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Bed, Bath, Maximize2, MapPin, Phone, Mail } from 'lucide-react'
import { properties } from '../data/properties'

export default function PropertyDetailPage() {
  const { id } = useParams()
  const property = properties.find((p) => p.id === id)

  if (!property) {
    return (
      <div className="pt-24 text-center py-24">
        <p className="text-brand-text-3">Property not found.</p>
        <Link to="/listings" className="btn-primary mt-4 inline-flex">Back to Listings</Link>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero image */}
      <div className="aspect-[21/9] max-h-[520px] overflow-hidden">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-brand-text-3 hover:text-brand-text mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to listings
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2">
            <span className={`badge mb-3 ${property.status === 'For Sale' ? 'badge-sale' : 'badge-rent'}`}>{property.status}</span>
            <h1 className="text-3xl font-bold text-brand-text mb-2">{property.title}</h1>
            <div className="flex items-center gap-1 text-brand-text-3 text-sm mb-6">
              <MapPin size={13} /><span>{property.address}</span>
            </div>
            <p className="text-3xl font-bold text-brand-text mb-8">{property.priceLabel}</p>

            {/* Specs */}
            <div className="flex items-center gap-6 mb-8 p-5 bg-brand-gray rounded-xl">
              <div className="flex items-center gap-2 text-sm"><Bed size={16} className="text-brand-green" /><span>{property.bedrooms} Bedrooms</span></div>
              <div className="flex items-center gap-2 text-sm"><Bath size={16} className="text-brand-green" /><span>{property.bathrooms} Bathrooms</span></div>
              <div className="flex items-center gap-2 text-sm"><Maximize2 size={16} className="text-brand-green" /><span>{property.area} m²</span></div>
            </div>

            <h2 className="text-lg font-bold text-brand-text mb-3">About this property</h2>
            <p className="text-brand-text-2 text-sm leading-relaxed">{property.description}</p>
          </div>

          {/* Agent card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-card p-6 border border-brand-gray-3">
              <p className="text-xs font-semibold text-brand-text-3 uppercase tracking-widest mb-4">Listed by</p>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-sm">{property.agent.avatar}</div>
                <div>
                  <p className="font-semibold text-brand-text">{property.agent.name}</p>
                  <p className="text-xs text-brand-text-3">Licensed Agent</p>
                </div>
              </div>
              <div className="space-y-3 mb-5">
                <a href={`tel:${property.agent.phone}`} className="flex items-center gap-2 text-sm text-brand-text-2 hover:text-brand-green transition-colors">
                  <Phone size={13} />{property.agent.phone}
                </a>
                <a href={`mailto:${property.agent.email}`} className="flex items-center gap-2 text-sm text-brand-text-2 hover:text-brand-green transition-colors">
                  <Mail size={13} />{property.agent.email}
                </a>
              </div>
              <button className="btn-primary w-full justify-center">Contact Agent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
