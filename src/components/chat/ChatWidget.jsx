import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, X, Send, Bed, Bath, MapPin, Sparkles } from 'lucide-react'
import { getListings } from '../../lib/api'

const WELCOME_MESSAGE = {
  role: 'assistant',
  content: "Hi! I'm your EstateHub assistant. I can help you find properties, answer questions about buying or renting, or just chat about what you're looking for. What can I help with today?",
}

function parseMessage(content, listings) {
  const regex = /\[PROPERTY:([a-zA-Z0-9-]+)\]/g
  const propertyIds = []
  let match
  while ((match = regex.exec(content)) !== null) {
    propertyIds.push(match[1])
  }
  const cleanText = content.replace(regex, '').trim()
  const properties = propertyIds
    .map((id) => listings.find((l) => l.id === id))
    .filter(Boolean)
  return { text: cleanText, properties }
}

function MiniPropertyCard({ property }) {
  return (
    <Link
      to={`/listings/${property.id}`}
      className="flex gap-3 bg-white rounded-xl border border-brand-gray-3 p-3 hover:shadow-card transition-shadow"
    >
      <img src={property.image} alt={property.title} className="w-16 h-16 rounded-lg object-cover shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-brand-text truncate">{property.priceLabel}</p>
        <p className="text-xs text-brand-text-2 truncate">{property.title}</p>
        <div className="flex items-center gap-1 text-xs text-brand-text-3 mt-1">
          <MapPin size={10} />
          <span className="truncate">{property.location}</span>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1 text-xs text-brand-text-3">
            <Bed size={11} className="text-brand-green" />{property.bedrooms}
          </span>
          <span className="flex items-center gap-1 text-xs text-brand-text-3">
            <Bath size={11} className="text-brand-green" />{property.bathrooms}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [listings, setListings] = useState([])
  const scrollRef = useRef(null)

  useEffect(() => {
    if (open && listings.length === 0) {
      getListings().then(setListings).catch(() => setListings([]))
    }
  }, [open, listings.length])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          listings,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to get response')

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
      }])
    } finally {
      setLoading(false)
    }
  }

  const suggestions = [
    'Show me 3-bedroom houses',
    "What's available for rent?",
    'Properties in East Legon',
  ]

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full shadow-card-hover flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-brand-text rotate-90' : 'bg-brand-green hover:scale-105'
        }`}
        aria-label="Open chat"
      >
        {open ? <X size={22} className="text-white" /> : <MessageCircle size={22} className="text-white" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-card-hover border border-brand-gray-3 flex flex-col overflow-hidden">
          <div className="bg-brand-text px-5 py-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-green flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">EstateHub Assistant</p>
              <p className="text-white/50 text-xs">Powered by AI · Always here to help</p>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-brand-gray">
            {messages.map((msg, i) => {
              if (msg.role === 'user') {
                return (
                  <div key={i} className="self-end max-w-[85%]">
                    <div className="bg-brand-green text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm">
                      {msg.content}
                    </div>
                  </div>
                )
              }

              const { text, properties } = parseMessage(msg.content, listings)
              return (
                <div key={i} className="self-start max-w-[90%] flex flex-col gap-2">
                  <div className="bg-white text-brand-text rounded-2xl rounded-bl-md px-4 py-2.5 text-sm shadow-subtle">
                    {text}
                  </div>
                  {properties.map((p) => <MiniPropertyCard key={p.id} property={p} />)}
                </div>
              )
            })}

            {loading && (
              <div className="self-start">
                <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-subtle flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-brand-text-3 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-brand-text-3 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-brand-text-3 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 mt-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="text-left text-xs text-brand-text-2 bg-white border border-brand-gray-3 rounded-full px-3 py-2 hover:border-brand-green hover:text-brand-green transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-brand-gray-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about properties…"
              className="flex-1 bg-brand-gray rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full bg-brand-green flex items-center justify-center text-white disabled:opacity-50 transition-opacity shrink-0"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}