import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react'
import { sendContactEmail } from '../lib/email'

const contactInfo = [
  { icon: MapPin, title: 'Visit Us', lines: ['12345 Opeasi Dhaisi Road', 'East Legon, Accra, Ghana'] },
  { icon: Phone, title: 'Call Us', lines: ['+233 (0)30 000 0001', '+233 (0)24 000 0002'] },
  { icon: Mail, title: 'Email Us', lines: ['hello@estatehub.com', 'support@estatehub.com'] },
  { icon: Clock, title: 'Working Hours', lines: ['Mon – Fri: 8:00am – 6:00pm', 'Sat: 9:00am – 3:00pm'] },
]

const offices = [
  { city: 'East Legon', address: '12345 Opeasi Dhaisi Road', phone: '+233 30 000 0001' },
  { city: 'Airport Residential', address: '7 Oxford Street, Airport Res.', phone: '+233 30 000 0002' },
  { city: 'Cantonments', address: '18 Liberation Road', phone: '+233 30 000 0003' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await sendContactEmail(form)
      setSent(true)
    } catch (err) {
      setError('Failed to send message. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-brand-text">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
          <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-4">Get in touch</p>
          <h1 className="text-5xl font-bold text-white leading-tight mb-4">Contact Us</h1>
          <p className="text-white/55 text-base max-w-lg">
            Have a question about a property? Ready to buy, sell, or rent? Our team is here to help.
          </p>
        </div>
      </div>

      {/* Info cards */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map(({ icon: Icon, title, lines }) => (
            <div key={title} className="bg-white rounded-xl p-6 shadow-card border border-brand-gray-3">
              <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                <Icon size={18} className="text-brand-green" />
              </div>
              <h3 className="font-bold text-brand-text text-sm mb-2">{title}</h3>
              {lines.map((line) => <p key={line} className="text-sm text-brand-text-3">{line}</p>)}
            </div>
          ))}
        </div>
      </section>

      {/* Form + map */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-brand-text mb-2">Send us a message</h2>
            <p className="text-brand-text-3 text-sm mb-8">We&apos;ll get back to you within 24 hours.</p>

            {sent ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center">
                  <Check size={28} className="text-brand-green" />
                </div>
                <h3 className="text-lg font-bold text-brand-text">Message sent!</h3>
                <p className="text-sm text-brand-text-3 max-w-xs">
                  Thank you for reaching out. One of our agents will contact you shortly.
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
                  className="btn-primary mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">{error}</div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                    <input required type="text" placeholder="Your name" className="input-field" value={form.name} onChange={set('name')} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input required type="email" placeholder="you@email.com" className="input-field" value={form.email} onChange={set('email')} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Phone</label>
                    <input type="tel" placeholder="+233 24 000 0000" className="input-field" value={form.phone} onChange={set('phone')} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Subject <span className="text-red-400">*</span></label>
                    <select required className="select-field" value={form.subject} onChange={set('subject')}>
                      <option value="">Select a subject</option>
                      <option>Buying a Property</option>
                      <option>Selling a Property</option>
                      <option>Renting a Property</option>
                      <option>Property Valuation</option>
                      <option>Investment Advice</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-text-2 mb-1.5">Message <span className="text-red-400">*</span></label>
                  <textarea required rows={6} placeholder="Tell us how we can help you…" className="input-field resize-none" value={form.message} onChange={set('message')} />
                </div>
                <button type="submit" disabled={loading} className="btn-primary gap-2 self-start disabled:opacity-60">
                  {loading
                    ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <Send size={14} />
                  }
                  {loading ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Map + offices */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] relative bg-brand-gray-3">
              <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80" alt="Map" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-card-hover px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                    <MapPin size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-brand-text">EstateHub HQ</p>
                    <p className="text-xs text-brand-text-3">East Legon, Accra</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-brand-text mb-4">Our Offices</h3>
              <div className="flex flex-col gap-3">
                {offices.map((office) => (
                  <div key={office.city} className="flex items-start gap-4 p-4 bg-brand-gray rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin size={13} className="text-brand-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-text text-sm">{office.city}</p>
                      <p className="text-xs text-brand-text-3">{office.address}</p>
                      <p className="text-xs text-brand-green mt-0.5">{office.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}