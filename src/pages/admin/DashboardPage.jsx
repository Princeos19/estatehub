import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, TrendingUp, Key, PlusCircle, ArrowRight } from 'lucide-react'
import { getListings } from '../../lib/api'

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-card flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-2xl font-bold text-brand-text">{value}</p>
        <p className="text-sm text-brand-text-3">{label}</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getListings().then((data) => {
      setListings(data)
      setLoading(false)
    })
  }, [])

  const forSale = listings.filter((l) => l.status === 'For Sale').length
  const forRent = listings.filter((l) => l.status === 'For Rent').length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-brand-text">Dashboard</h1>
        <p className="text-sm text-brand-text-3 mt-1">Welcome back. Here's an overview of your listings.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <StatCard icon={Home} label="Total Listings" value={loading ? '—' : listings.length} color="bg-brand-text" />
        <StatCard icon={TrendingUp} label="For Sale" value={loading ? '—' : forSale} color="bg-brand-green" />
        <StatCard icon={Key} label="For Rent" value={loading ? '—' : forRent} color="bg-blue-500" />
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h2 className="text-base font-bold text-brand-text mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link to="/admin/listings/new" className="bg-white rounded-xl p-5 shadow-card flex items-center justify-between hover:shadow-card-hover transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-green/10 rounded-lg flex items-center justify-center">
                <PlusCircle size={18} className="text-brand-green" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-text">Add New Property</p>
                <p className="text-xs text-brand-text-3">Create a new listing</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-brand-text-3 group-hover:text-brand-green transition-colors" />
          </Link>

          <Link to="/admin/listings" className="bg-white rounded-xl p-5 shadow-card flex items-center justify-between hover:shadow-card-hover transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-text/10 rounded-lg flex items-center justify-center">
                <Home size={18} className="text-brand-text" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-text">Manage Listings</p>
                <p className="text-xs text-brand-text-3">Edit or delete properties</p>
              </div>
            </div>
            <ArrowRight size={16} className="text-brand-text-3 group-hover:text-brand-green transition-colors" />
          </Link>
        </div>
      </div>

      {/* Recent listings table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-brand-text">Recent Listings</h2>
          <Link to="/admin/listings" className="text-xs text-brand-green font-semibold hover:underline">View all</Link>
        </div>
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-gray-3 bg-brand-gray">
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-text-3 uppercase tracking-wider">Property</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-text-3 uppercase tracking-wider hidden md:table-cell">Location</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-text-3 uppercase tracking-wider">Price</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-brand-text-3 uppercase tracking-wider hidden sm:table-cell">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-gray-3">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-5 py-4">
                      <div className="h-4 bg-brand-gray-3 rounded animate-pulse w-full" />
                    </td>
                  </tr>
                ))
              ) : listings.slice(0, 5).map((l) => (
                <tr key={l.id} className="hover:bg-brand-gray/50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={l.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <span className="font-medium text-brand-text truncate max-w-[140px]">{l.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-brand-text-3 hidden md:table-cell">{l.location}</td>
                  <td className="px-5 py-4 font-semibold text-brand-text">{l.priceLabel}</td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={`badge ${l.status === 'For Sale' ? 'badge-sale' : 'badge-rent'}`}>{l.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <Link to={`/admin/listings/${l.id}/edit`} className="text-xs font-semibold text-brand-green hover:underline">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
