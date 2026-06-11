import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, Save, X } from 'lucide-react'
import { getListingById, createListing, updateListing } from '../../lib/api'
import ImageUploader from '../../components/admin/ImageUploader'

const EMPTY_FORM = {
  title: '',
  price: '',
  price_label: '',
  location: '',
  address: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  type: 'House',
  status: 'For Sale',
  images: [],
  description: '',
  featured: false,
  year: new Date().getFullYear(),
  agent_name: '',
  agent_phone: '',
  agent_email: '',
  agent_avatar: '',
}

function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-brand-text-3 mt-1">{hint}</p>}
    </div>
  )
}

export default function ListingFormPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(id)

  const [form, setForm] = useState(EMPTY_FORM)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEditing)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!isEditing) return

    getListingById(id).then((listing) => {
      setForm({
        title: listing.title || '',
        price: listing.price || '',
        price_label: listing.priceLabel || '',
        location: listing.location || '',
        address: listing.address || '',
        bedrooms: listing.bedrooms || '',
        bathrooms: listing.bathrooms || '',
        area: listing.area || '',
        type: listing.type || 'House',
        status: listing.status || 'For Sale',
        images: listing.images?.length ? listing.images : listing.image ? [listing.image] : [],
        description: listing.description || '',
        featured: listing.featured || false,
        year: listing.year || new Date().getFullYear(),
        agent_name: listing.agent?.name || '',
        agent_phone: listing.agent?.phone || '',
        agent_email: listing.agent?.email || '',
        agent_avatar: listing.agent?.avatar || '',
      })
      setFetching(false)
    }).catch(() => setFetching(false))
  }, [id, isEditing])

  const set = (field) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handlePriceChange = (e) => {
    const val = e.target.value
    const num = parseFloat(val)
    setForm((prev) => ({
      ...prev,
      price: val,
      price_label: isNaN(num) ? '' : `$${num.toLocaleString()}`,
    }))
  }

  const handleImagesChange = (urls) => {
    setForm((prev) => ({ ...prev, images: urls }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (form.images.length === 0) {
      setError('Please upload at least one image.')
      return
    }

    setLoading(true)

    const payload = {
      ...form,
      price: parseFloat(form.price),
      bedrooms: parseInt(form.bedrooms),
      bathrooms: parseInt(form.bathrooms),
      area: parseInt(form.area),
      year: parseInt(form.year),
      image: form.images[0],       // first image = main image
      images: form.images,
    }

    try {
      if (isEditing) {
        await updateListing(id, payload)
        setSuccess('Listing updated successfully!')
      } else {
        await createListing(payload)
        setSuccess('Listing created successfully!')
        setTimeout(() => navigate('/admin/listings'), 1200)
      }
    } catch (err) {
      setError('Failed to save: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/listings" className="w-9 h-9 rounded-full bg-white border border-brand-gray-3 flex items-center justify-center text-brand-text-3 hover:text-brand-text shadow-subtle transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-brand-text">
            {isEditing ? 'Edit Listing' : 'Add New Property'}
          </h1>
          <p className="text-sm text-brand-text-3 mt-0.5">
            {isEditing ? 'Update the details below.' : 'Fill in the details to create a new listing.'}
          </p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center justify-between">
          {error}
          <button onClick={() => setError('')}><X size={14} /></button>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 flex items-center justify-between">
          {success}
          <button onClick={() => setSuccess('')}><X size={14} /></button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Basic info */}
        <div className="bg-white rounded-xl p-6 shadow-card flex flex-col gap-4">
          <p className="text-sm font-bold text-brand-text border-b border-brand-gray-3 pb-3">Basic Information</p>

          <Field label="Property Title" required>
            <input type="text" required className="input-field" placeholder="e.g. Modern 4-Bedroom Family Home" value={form.title} onChange={set('title')} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price (USD)" required hint="Label is auto-generated">
              <input type="number" required className="input-field" placeholder="e.g. 450000" value={form.price} onChange={handlePriceChange} />
            </Field>
            <Field label="Price Label">
              <input type="text" className="input-field bg-brand-gray" readOnly value={form.price_label} placeholder="Auto-generated" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Property Type" required>
              <select className="select-field" value={form.type} onChange={set('type')}>
                {['House', 'Apartment', 'Villa', 'Commercial'].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Status" required>
              <select className="select-field" value={form.status} onChange={set('status')}>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </Field>
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" checked={form.featured} onChange={set('featured')} className="w-4 h-4 accent-brand-green" />
            <label htmlFor="featured" className="text-sm text-brand-text-2 cursor-pointer">Mark as featured (shows on homepage)</label>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl p-6 shadow-card flex flex-col gap-4">
          <p className="text-sm font-bold text-brand-text border-b border-brand-gray-3 pb-3">Location</p>
          <Field label="Area / Neighbourhood" required>
            <input type="text" required className="input-field" placeholder="e.g. East Legon, Accra" value={form.location} onChange={set('location')} />
          </Field>
          <Field label="Full Address" required>
            <input type="text" required className="input-field" placeholder="e.g. 12 Maple Drive, East Legon" value={form.address} onChange={set('address')} />
          </Field>
        </div>

        {/* Specs */}
        <div className="bg-white rounded-xl p-6 shadow-card flex flex-col gap-4">
          <p className="text-sm font-bold text-brand-text border-b border-brand-gray-3 pb-3">Property Specs</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Bedrooms" required>
              <input type="number" required min="0" className="input-field" placeholder="0" value={form.bedrooms} onChange={set('bedrooms')} />
            </Field>
            <Field label="Bathrooms" required>
              <input type="number" required min="0" className="input-field" placeholder="0" value={form.bathrooms} onChange={set('bathrooms')} />
            </Field>
            <Field label="Area (m²)" required>
              <input type="number" required min="0" className="input-field" placeholder="0" value={form.area} onChange={set('area')} />
            </Field>
            <Field label="Year Built">
              <input type="number" className="input-field" placeholder="2024" value={form.year} onChange={set('year')} />
            </Field>
          </div>
        </div>

        {/* Images — now using uploader */}
        <div className="bg-white rounded-xl p-6 shadow-card flex flex-col gap-4">
          <p className="text-sm font-bold text-brand-text border-b border-brand-gray-3 pb-3">
            Photos <span className="text-red-400">*</span>
          </p>
          <ImageUploader
            images={form.images}
            onChange={handleImagesChange}
          />
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl p-6 shadow-card flex flex-col gap-4">
          <p className="text-sm font-bold text-brand-text border-b border-brand-gray-3 pb-3">Description</p>
          <Field label="Property Description">
            <textarea rows={4} className="input-field resize-none" placeholder="Describe the property…" value={form.description} onChange={set('description')} />
          </Field>
        </div>

        {/* Agent */}
        <div className="bg-white rounded-xl p-6 shadow-card flex flex-col gap-4">
          <p className="text-sm font-bold text-brand-text border-b border-brand-gray-3 pb-3">Agent Details</p>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Agent Name" required>
              <input type="text" required className="input-field" placeholder="e.g. Kofi Mensah" value={form.agent_name} onChange={set('agent_name')} />
            </Field>
            <Field label="Initials" required hint="2 letters, shown as avatar">
              <input type="text" required maxLength={2} className="input-field" placeholder="KM" value={form.agent_avatar} onChange={set('agent_avatar')} />
            </Field>
            <Field label="Phone">
              <input type="tel" className="input-field" placeholder="+233 24 000 0000" value={form.agent_phone} onChange={set('agent_phone')} />
            </Field>
            <Field label="Email">
              <input type="email" className="input-field" placeholder="agent@estatehub.com" value={form.agent_email} onChange={set('agent_email')} />
            </Field>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-3 pb-8">
          <button type="submit" disabled={loading} className="btn-primary gap-2 disabled:opacity-60">
            {loading
              ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <Save size={15} />
            }
            {loading ? 'Saving…' : isEditing ? 'Save Changes' : 'Create Listing'}
          </button>
          <Link to="/admin/listings" className="btn-secondary">Cancel</Link>
        </div>

      </form>
    </div>
  )
}
