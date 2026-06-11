import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Bed, Bath, Maximize2, MapPin, Phone, Mail,
  Calendar, Heart, Share2, ChevronLeft, ChevronRight, Check
} from 'lucide-react'
import { useListing } from '../hooks/useListing'
import { useFavourites } from '../hooks/useFavourites'
import { useAuthContext } from '../context/AuthContext'
import { submitEnquiry } from '../lib/favourites'
import PropertyCard from '../components/ui/PropertyCard'
import { PropertyCardSkeleton, DetailSkeleton } from '../components/ui/Skeletons'

function SpecBadge({ icon: Icon, label, value }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5 p-4 bg-brand-gray rounded-xl text-center">
      <div className="w-9 h-9 rounded-full bg-white shadow-subtle flex items-center justify-center">
        <Icon size={16} className="text-brand-green" />
      </div>
      <p className="text-xs text-brand-text-3">{label}</p>
      <p className="text-sm font-bold text-brand-text">{value}</p>
    </div>
  )
}

function ContactForm({ agent, listingId }) {
  const { user, profile } = useAuthContext()
  const navigate = useNavigate()
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: profile?.full_name || '',
    email: user?.email || '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitEnquiry({
        userId: user?.id || null,
        listingId,
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      })
      setSent(true)
    } catch (err) {
      alert('Failed to send: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center text-center py-6 gap-3">
        <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center">
          <Check size={20} className="text-brand-green" />
        </div>
        <p className="font-bold text-brand-text text-sm">Message sent!</p>
        <p className="text-xs text-brand-text-3">{agent.name} will get back to you shortly.</p>
        <button onClick={() => setSent(false)} className="text-xs text-brand-green underline mt-1">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {!user && (
        <div className="p-3 bg-brand-gray rounded-lg text-xs text-brand-text-2 text-center">
          <Link to="/sign-in" className="text-brand-green font-semibold hover:underline">Sign in</Link>
          {' '}to track your enquiries
        </div>
      )}
      <input required type="text" placeholder="Your name" className="input-field py-2.5 text-sm" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input required type="email" placeholder="Email address" className="input-field py-2.5 text-sm" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="tel" placeholder="Phone number (optional)" className="input-field py-2.5 text-sm" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
      <textarea rows={4} placeholder="I am interested in this property and would like to arrange a viewing..." className="input-field py-2.5 text-sm resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
        {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Send Message'}
      </button>
    </form>
  )
}

export default function PropertyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { listing, similar, loading, error } = useListing(id)
  const { isFavourited, toggleFavourite } = useFavourites()
  const { user } = useAuthContext()
  const [activeImage, setActiveImage] = useState(0)

  const favourited = listing ? isFavourited(listing.id) : false

  const handleHeart = async () => {
    const success = await toggleFavourite(listing.id)
    if (!success) navigate('/sign-in', { state: { from: `/listings/${id}` } })
  }

  if (loading) {
    return (
      <div className="pt-16 min-h-screen bg-[#F7F7F7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2"><DetailSkeleton /></div>
            <div className="lg:col-span-1"><div className="bg-white rounded-2xl shadow-card h-96 animate-pulse" /></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 pt-20">
        <p className="text-brand-text-3 text-sm">{error || 'Property not found.'}</p>
        <Link to="/listings" className="btn-primary">Back to Listings</Link>
      </div>
    )
  }

  const images = listing.images?.length ? listing.images : [listing.image]
  const prevImage = () => setActiveImage((activeImage - 1 + images.length) % images.length)
  const nextImage = () => setActiveImage((activeImage + 1) % images.length)

  return (
    <div className="pt-16 min-h-screen bg-[#F7F7F7]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-gray-3">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center gap-2 text-sm">
          <Link to="/" className="text-brand-text-3 hover:text-brand-text transition-colors">Home</Link>
          <span className="text-brand-gray-3">/</span>
          <Link to="/listings" className="text-brand-text-3 hover:text-brand-text transition-colors">Properties</Link>
          <span className="text-brand-gray-3">/</span>
          <span className="text-brand-text font-medium truncate max-w-[200px]">{listing.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Back + actions */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-brand-text-2 hover:text-brand-text transition-colors font-medium">
            <ArrowLeft size={15} /> Back to listings
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleHeart}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                favourited ? 'bg-red-50 border-red-200 text-red-500' : 'bg-white border-brand-gray-3 text-brand-text-3 hover:text-red-500'
              }`}
            >
              <Heart size={15} className={favourited ? 'fill-red-500' : ''} />
            </button>
            <button className="w-9 h-9 rounded-full border bg-white border-brand-gray-3 text-brand-text-3 hover:text-brand-text flex items-center justify-center transition-colors">
              <Share2 size={15} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-card">
              <div className="relative aspect-[16/9] overflow-hidden group">
                <img src={images[activeImage]} alt={listing.title} className="w-full h-full object-cover transition-all duration-500" />
                <span className={`absolute top-4 left-4 badge text-sm px-4 py-1.5 ${listing.status === 'For Sale' ? 'badge-sale' : 'badge-rent'}`}>{listing.status}</span>
                {images.length > 1 && (
                  <>
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-text shadow-card hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                      <ChevronLeft size={18} />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-text shadow-card hover:bg-white transition-colors opacity-0 group-hover:opacity-100">
                      <ChevronRight size={18} />
                    </button>
                    <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/50 text-white text-xs backdrop-blur-sm">{activeImage + 1} / {images.length}</span>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-3 p-4">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)} className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${activeImage === i ? 'border-brand-green' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title + price */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-brand-text leading-tight mb-2">{listing.title}</h1>
                  <div className="flex items-center gap-1.5 text-brand-text-3 text-sm">
                    <MapPin size={14} className="text-brand-green" />
                    <span>{listing.address}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-bold text-brand-text">{listing.priceLabel}</p>
                  {listing.status === 'For Rent' && <p className="text-sm text-brand-text-3">per month</p>}
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <SpecBadge icon={Bed} label="Bedrooms" value={listing.bedrooms} />
              <SpecBadge icon={Bath} label="Bathrooms" value={listing.bathrooms} />
              <SpecBadge icon={Maximize2} label="Area" value={`${listing.area} m²`} />
              <SpecBadge icon={Calendar} label="Year Built" value={listing.year} />
            </div>

            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="text-lg font-bold text-brand-text mb-4">About this property</h2>
              <p className="text-brand-text-2 text-sm leading-relaxed mb-4">{listing.description}</p>
              <p className="text-brand-text-2 text-sm leading-relaxed">Located in one of Accra&apos;s most sought-after neighbourhoods, this property offers unparalleled access to top schools, hospitals, shopping centres, and major transport routes.</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 shadow-card">
              <h2 className="text-lg font-bold text-brand-text mb-4">Property features</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {['Swimming Pool','Private Garage','Security System','Generator Backup','Fibre Internet','Air Conditioning','Solar Panels','Borehole Water','Landscaped Garden'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-brand-text-2">
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-brand-green" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: agent card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-card overflow-hidden lg:sticky lg:top-[100px]">
              <div className="bg-brand-text p-6 text-white">
                <p className="text-xs text-white/50 uppercase tracking-widest mb-3">Listed by</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-sm shrink-0">{listing.agent.avatar}</div>
                  <div>
                    <p className="font-bold text-white">{listing.agent.name}</p>
                    <p className="text-xs text-white/55">Licensed Real Estate Agent</p>
                  </div>
                </div>
              </div>
              <div className="p-5 border-b border-brand-gray-3">
                <div className="flex flex-col gap-3">
                  <a href={`tel:${listing.agent.phone}`} className="flex items-center gap-3 text-sm text-brand-text-2 hover:text-brand-green transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-brand-gray flex items-center justify-center group-hover:bg-brand-green/10 transition-colors">
                      <Phone size={13} className="text-brand-green" />
                    </div>
                    {listing.agent.phone}
                  </a>
                  <a href={`mailto:${listing.agent.email}`} className="flex items-center gap-3 text-sm text-brand-text-2 hover:text-brand-green transition-colors group">
                    <div className="w-8 h-8 rounded-full bg-brand-gray flex items-center justify-center group-hover:bg-brand-green/10 transition-colors">
                      <Mail size={13} className="text-brand-green" />
                    </div>
                    {listing.agent.email}
                  </a>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-bold text-brand-text mb-4">Send a message</p>
                <ContactForm agent={listing.agent} listingId={listing.id} />
              </div>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        {similar.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-text">Similar properties</h2>
              <Link to="/listings" className="text-sm font-semibold text-brand-green hover:underline">View all</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading
                ? [...Array(3)].map((_, i) => <PropertyCardSkeleton key={i} />)
                : similar.map((p) => <PropertyCard key={p.id} property={p} />)
              }
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
