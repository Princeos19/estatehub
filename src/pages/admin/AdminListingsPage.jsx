import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PlusCircle, Pencil, Trash2, X, AlertTriangle } from 'lucide-react'
import { getListings, deleteListing } from '../../lib/api'

function DeleteModal({ listing, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-card-hover p-6 max-w-sm w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <AlertTriangle size={18} className="text-red-500" />
          </div>
          <div>
            <p className="font-bold text-brand-text">Delete listing?</p>
            <p className="text-xs text-brand-text-3">This action cannot be undone.</p>
          </div>
        </div>
        <p className="text-sm text-brand-text-2 mb-6 bg-brand-gray rounded-lg px-4 py-3">
          "{listing?.title}" in {listing?.location}
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-secondary flex-1 justify-center">Cancel</button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 text-white text-sm font-semibold rounded-full hover:bg-red-600 transition-colors disabled:opacity-60"
          >
            {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Trash2 size={14} />}
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminListingsPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  const fetchListings = async () => {
    setLoading(true)
    const data = await getListings()
    setListings(data)
    setLoading(false)
  }

  useEffect(() => { fetchListings() }, [])

  const handleDelete = async () => {
    setDeleteLoading(true)
    try {
      await deleteListing(deleteTarget.id)
      setListings((prev) => prev.filter((l) => l.id !== deleteTarget.id))
      setSuccessMsg(`"${deleteTarget.title}" deleted successfully.`)
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      alert('Failed to delete: ' + err.message)
    } finally {
      setDeleteLoading(false)
      setDeleteTarget(null)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Listings</h1>
          <p className="text-sm text-brand-text-3 mt-1">{listings.length} properties total</p>
        </div>
        <Link to="/admin/listings/new" className="btn-primary gap-2">
          <PlusCircle size={15} />
          Add Property
        </Link>
      </div>

      {/* Success toast */}
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center justify-between">
          {successMsg}
          <button onClick={() => setSuccessMsg('')}><X size={14} /></button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brand-gray-3 bg-brand-gray">
              <th className="text-left px-5 py-3 text-xs font-semibold text-brand-text-3 uppercase tracking-wider">Property</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-brand-text-3 uppercase tracking-wider hidden lg:table-cell">Location</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-brand-text-3 uppercase tracking-wider">Price</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-brand-text-3 uppercase tracking-wider hidden md:table-cell">Type</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-brand-text-3 uppercase tracking-wider hidden sm:table-cell">Status</th>
              <th className="px-5 py-3 text-right text-xs font-semibold text-brand-text-3 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-gray-3">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="px-5 py-4">
                    <div className="h-4 bg-brand-gray-3 rounded animate-pulse" />
                  </td>
                </tr>
              ))
            ) : listings.map((l) => (
              <tr key={l.id} className="hover:bg-brand-gray/40 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={l.image} alt="" className="w-12 h-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-brand-text truncate max-w-[160px]">{l.title}</p>
                      <p className="text-xs text-brand-text-3 truncate max-w-[160px]">{l.address}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-brand-text-3 text-xs hidden lg:table-cell">{l.location}</td>
                <td className="px-5 py-4 font-semibold text-brand-text">{l.priceLabel}</td>
                <td className="px-5 py-4 text-brand-text-3 hidden md:table-cell">{l.type}</td>
                <td className="px-5 py-4 hidden sm:table-cell">
                  <span className={`badge ${l.status === 'For Sale' ? 'badge-sale' : 'badge-rent'}`}>{l.status}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      to={`/admin/listings/${l.id}/edit`}
                      className="w-8 h-8 rounded-lg bg-brand-gray flex items-center justify-center text-brand-text-3 hover:bg-brand-green hover:text-white transition-colors"
                    >
                      <Pencil size={13} />
                    </Link>
                    <button
                      onClick={() => setDeleteTarget(l)}
                      className="w-8 h-8 rounded-lg bg-brand-gray flex items-center justify-center text-brand-text-3 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete modal */}
      {deleteTarget && (
        <DeleteModal
          listing={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleteLoading}
        />
      )}
    </div>
  )
}
