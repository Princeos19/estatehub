import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown } from 'lucide-react'

const filterTabs = ['All', 'House', 'Find Us', 'Apartment']

export default function HeroSection() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState({ lookingFor: '', price: '', location: '', rooms: '' })

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/listings')
  }

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85"
          alt="Hero property"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay — gradient from dark bottom to transparent top-right */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Tag pills */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {['Real Estate', 'Real Rental', 'Real Market'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
            Build Your Future,{' '}
            <br />
            One Property{' '}
            <span className="text-brand-green">at a Time.</span>
          </h1>

          {/* Sub-copy (right-aligned info, like the design) */}
          <div className="flex items-start gap-8 mb-10">
            <p className="text-white/65 text-sm leading-relaxed max-w-sm">
              Own One Property at a Time. Own Your Future. Own Your Life. Own Your Space One
              Property at a Time. Own Your Works One Property at a Time and Elevate Your Living.
            </p>
          </div>
        </div>

        {/* Search card */}
        <div className="bg-white rounded-2xl shadow-[0_8px_48px_rgba(0,0,0,0.18)] p-6 max-w-4xl">
          <p className="text-xs font-semibold text-brand-text-3 uppercase tracking-widest mb-4">
            Find the best place
          </p>

          {/* Fields row */}
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-brand-text-3 mb-1.5">Looking for</label>
                <input
                  type="text"
                  placeholder="Short type"
                  className="input-field"
                  value={search.lookingFor}
                  onChange={(e) => setSearch({ ...search, lookingFor: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-text-3 mb-1.5">Price</label>
                <div className="relative">
                  <select
                    className="select-field pr-8"
                    value={search.price}
                    onChange={(e) => setSearch({ ...search, price: e.target.value })}
                  >
                    <option value="">Price</option>
                    <option>Under $200k</option>
                    <option>$200k – $500k</option>
                    <option>$500k – $1M</option>
                    <option>Above $1M</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-3 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-text-3 mb-1.5">Locations</label>
                <div className="relative">
                  <select
                    className="select-field pr-8"
                    value={search.location}
                    onChange={(e) => setSearch({ ...search, location: e.target.value })}
                  >
                    <option value="">Location</option>
                    <option>East Legon</option>
                    <option>Airport Residential</option>
                    <option>Trasacco Valley</option>
                    <option>Cantonments</option>
                    <option>Labone</option>
                    <option>Ridge</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-3 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-brand-text-3 mb-1.5">Number of rooms</label>
                <div className="relative">
                  <select
                    className="select-field pr-8"
                    value={search.rooms}
                    onChange={(e) => setSearch({ ...search, rooms: e.target.value })}
                  >
                    <option value="">2-5+ rooms</option>
                    <option>1 room</option>
                    <option>2 rooms</option>
                    <option>3 rooms</option>
                    <option>4 rooms</option>
                    <option>5+ rooms</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-3 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Filter tabs + search button */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-1">
                <span className="text-xs text-brand-text-3 font-medium mr-2">Filter:</span>
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-brand-text text-white'
                        : 'text-brand-text-2 hover:bg-brand-gray'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button type="submit" className="btn-primary gap-2">
                <Search size={14} />
                Search Properties
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
