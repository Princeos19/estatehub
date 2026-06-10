import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PropertyCard from '../ui/PropertyCard'
import { properties } from '../../data/properties'

export default function PropertiesSection() {
  const featured = properties.slice(0, 6)

  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-4xl font-bold text-brand-text mb-2">
              Explore our premier houses
            </h2>
            <p className="text-brand-text-3 text-sm max-w-md">
              Each listing offers unique features, exceptional quality, and prime locations ensuring an exclusive living experience.
            </p>
          </div>
          <Link
            to="/listings"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-brand-text hover:text-brand-green transition-colors shrink-0"
          >
            Get All Guides
            <div className="w-7 h-7 rounded-full bg-brand-text flex items-center justify-center group-hover:bg-brand-green transition-colors">
              <ArrowRight size={13} className="text-white" />
            </div>
          </Link>
        </div>

        {/* Grid: 2 rows × 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {featured.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link to="/listings" className="btn-primary w-full justify-center">
            View All Properties
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
