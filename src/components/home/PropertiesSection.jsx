import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PropertyCard from '../ui/PropertyCard'
import { PropertyCardSkeleton } from '../ui/Skeletons'
import { useFeaturedListings } from '../../hooks/useFeaturedListings'

export default function PropertiesSection() {
  const { listings, loading, error } = useFeaturedListings(6)

  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-4xl font-bold text-brand-text mb-2">
              Explore our premier houses
            </h2>
            <p className="text-brand-text-3 text-sm max-w-md">
              Each listing offers unique features, exceptional quality, and prime locations
              ensuring an exclusive living experience.
            </p>
          </div>
          <Link
            to="/listings"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-brand-text hover:text-brand-green transition-colors shrink-0"
          >
            Get All Guides
            <div className="w-7 h-7 rounded-full bg-brand-text flex items-center justify-center">
              <ArrowRight size={13} className="text-white" />
            </div>
          </Link>
        </div>

        {error && (
          <div className="mt-10 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            Failed to load properties: {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {loading
            ? [...Array(6)].map((_, i) => <PropertyCardSkeleton key={i} />)
            : listings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
          }
        </div>

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