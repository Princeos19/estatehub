import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import PropertyCard from '../components/ui/PropertyCard'
import { properties } from '../data/properties'

export default function ListingsPage() {
  const [query, setQuery] = useState('')

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="pt-20 min-h-screen bg-brand-gray">
      {/* Page header */}
      <div className="bg-white border-b border-brand-gray-3">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <h1 className="text-4xl font-bold text-brand-text mb-2">All Properties</h1>
          <p className="text-brand-text-3 text-sm">{filtered.length} properties found</p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border-b border-brand-gray-3 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-3" />
            <input
              type="text"
              placeholder="Search by name or location…"
              className="input-field pl-9 py-2.5 text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="btn-secondary gap-2 text-sm">
            <SlidersHorizontal size={14} />
            Filters
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-brand-text-3 text-sm">No properties match your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
