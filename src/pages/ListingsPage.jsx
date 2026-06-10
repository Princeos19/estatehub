import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, List } from 'lucide-react'
import PropertyCard from '../components/ui/PropertyCard'
import PropertyListItem from '../components/ui/PropertyListItem'
import { properties } from '../data/properties'

const TYPES = ['All', 'House', 'Apartment', 'Villa', 'Commercial']
const STATUSES = ['All', 'For Sale', 'For Rent']
const BEDROOMS = ['Any', '1+', '2+', '3+', '4+', '5+']
const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
]
const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under $500k', min: 0, max: 500000 },
  { label: '$500k – $1M', min: 500000, max: 1000000 },
  { label: '$1M – $2M', min: 1000000, max: 2000000 },
  { label: '$2M – $5M', min: 2000000, max: 5000000 },
  { label: 'Above $5M', min: 5000000, max: Infinity },
]

function FilterSection({ title, children }) {
  return (
    <div className="pb-6 border-b border-brand-gray-3 last:border-0 last:pb-0">
      <p className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-3">{title}</p>
      {children}
    </div>
  )
}

function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
        active
          ? 'bg-brand-text text-white border-brand-text'
          : 'bg-white text-brand-text-2 border-brand-gray-3 hover:border-brand-text'
      }`}
    >
      {label}
    </button>
  )
}

export default function ListingsPage() {
  const [query, setQuery] = useState('')
  const [activeType, setActiveType] = useState('All')
  const [activeStatus, setActiveStatus] = useState('All')
  const [activeBedrooms, setActiveBedrooms] = useState('Any')
  const [activePriceRange, setActivePriceRange] = useState(0)
  const [sort, setSort] = useState('default')
  const [viewMode, setViewMode] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const activeFilterCount = [
    activeType !== 'All',
    activeStatus !== 'All',
    activeBedrooms !== 'Any',
    activePriceRange !== 0,
  ].filter(Boolean).length

  const resetFilters = () => {
    setQuery('')
    setActiveType('All')
    setActiveStatus('All')
    setActiveBedrooms('Any')
    setActivePriceRange(0)
    setSort('default')
  }

  const filtered = useMemo(() => {
    const priceRange = PRICE_RANGES[activePriceRange]
    const bedroomMin = activeBedrooms === 'Any' ? 0 : parseInt(activeBedrooms)

    let result = properties.filter((p) => {
      const matchesQuery =
        query === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase()) ||
        p.type.toLowerCase().includes(query.toLowerCase())
      const matchesType = activeType === 'All' || p.type === activeType
      const matchesStatus = activeStatus === 'All' || p.status === activeStatus
      const matchesBedrooms = p.bedrooms >= bedroomMin
      const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max
      return matchesQuery && matchesType && matchesStatus && matchesBedrooms && matchesPrice
    })

    if (sort === 'price-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'newest') result = [...result].sort((a, b) => b.year - a.year)
    return result
  }, [query, activeType, activeStatus, activeBedrooms, activePriceRange, sort])

  const SidebarContent = () => (
    <div className="flex flex-col gap-6">
      <FilterSection title="Property Type">
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <Pill key={t} label={t} active={activeType === t} onClick={() => setActiveType(t)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Status">
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((s) => (
            <Pill key={s} label={s} active={activeStatus === s} onClick={() => setActiveStatus(s)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex flex-col gap-2.5">
          {PRICE_RANGES.map((range, i) => (
            <button
              key={range.label}
              onClick={() => setActivePriceRange(i)}
              className={`flex items-center gap-2.5 text-sm text-left transition-colors ${
                activePriceRange === i ? 'text-brand-green font-semibold' : 'text-brand-text-2 hover:text-brand-text'
              }`}
            >
              <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${activePriceRange === i ? 'border-brand-green' : 'border-brand-gray-3'}`}>
                {activePriceRange === i && <span className="w-2 h-2 rounded-full bg-brand-green block" />}
              </span>
              {range.label}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Bedrooms">
        <div className="flex flex-wrap gap-2">
          {BEDROOMS.map((b) => (
            <Pill key={b} label={b} active={activeBedrooms === b} onClick={() => setActiveBedrooms(b)} />
          ))}
        </div>
      </FilterSection>

      {activeFilterCount > 0 && (
        <button onClick={resetFilters} className="w-full py-2.5 rounded-lg border border-red-200 text-red-500 text-sm font-medium hover:bg-red-50 transition-colors">
          Clear all filters
        </button>
      )}
    </div>
  )

  return (
    <div className="pt-16 min-h-screen bg-[#F7F7F7]">
      {/* Page hero */}
      <div className="bg-white border-b border-brand-gray-3">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
          <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-2">Browse listings</p>
          <h1 className="text-4xl font-bold text-brand-text">All Properties</h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-brand-gray-3 sticky top-16 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-text-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, location, type…"
              className="input-field pl-9 py-2.5 text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-3 hover:text-brand-text">
                <X size={13} />
              </button>
            )}
          </div>

          <div className="relative hidden md:block">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="select-field py-2.5 pr-8 text-sm min-w-[180px]">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-3 pointer-events-none" />
          </div>

          <span className="hidden md:block text-sm text-brand-text-3 whitespace-nowrap">
            {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
          </span>

          <div className="hidden md:flex items-center gap-1 border border-brand-gray-3 rounded-lg p-1">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-brand-text text-white' : 'text-brand-text-3 hover:text-brand-text'}`}>
              <Grid3X3 size={14} />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-brand-text text-white' : 'text-brand-text-3 hover:text-brand-text'}`}>
              <List size={14} />
            </button>
          </div>

          <button onClick={() => setSidebarOpen(true)} className="md:hidden btn-secondary gap-2 text-sm relative">
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-green text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-8 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 shrink-0 bg-white rounded-xl p-6 shadow-card sticky top-[120px]">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm font-bold text-brand-text">Filters</p>
              {activeFilterCount > 0 && (
                <button onClick={resetFilters} className="text-xs text-brand-text-3 hover:text-red-500 transition-colors">Reset all</button>
              )}
            </div>
            <SidebarContent />
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <p className="md:hidden text-sm text-brand-text-3 mb-4">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
            </p>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-xl shadow-card">
                <div className="w-16 h-16 rounded-full bg-brand-gray flex items-center justify-center mb-4">
                  <Search size={24} className="text-brand-text-3" />
                </div>
                <h3 className="text-lg font-bold text-brand-text mb-2">No properties found</h3>
                <p className="text-sm text-brand-text-3 mb-6 max-w-xs">Try adjusting your filters or search term.</p>
                <button onClick={resetFilters} className="btn-primary">Clear filters</button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => <PropertyCard key={p.id} property={p} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((p) => <PropertyListItem key={p.id} property={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl p-6 max-h-[85vh] overflow-y-auto md:hidden">
            <div className="flex items-center justify-between mb-6">
              <p className="text-base font-bold text-brand-text">Filters</p>
              <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-full bg-brand-gray flex items-center justify-center">
                <X size={16} />
              </button>
            </div>
            <SidebarContent />
            <button onClick={() => setSidebarOpen(false)} className="btn-primary w-full justify-center mt-6">
              Show {filtered.length} properties
            </button>
          </div>
        </>
      )}
    </div>
  )
}
