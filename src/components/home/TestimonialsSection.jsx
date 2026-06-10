import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'

const testimonials = [
  {
    id: 1,
    name: 'Sajitur Rahman',
    role: '+44 Kingston',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    text: 'Working with this team was a pleasure. They understood our vision and helped us find a property that exceeded our expectations. We couldn\'t have done it without them!',
    stars: 5,
  },
  {
    id: 2,
    name: 'Abena Mensah',
    role: 'East Legon, Accra',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b62c?w=100&q=80',
    text: 'EstateHub made the entire process seamless. From the first viewing to signing the papers, their team was professional and responsive every step of the way.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Kwame Asante',
    role: 'Cantonments, Accra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    text: 'I was sceptical about finding a good investment property, but EstateHub guided me perfectly. The returns on my property have been excellent.',
    stars: 5,
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const total = testimonials.length
  const t = testimonials[current]

  return (
    <section className="section-pad bg-brand-gray">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-brand-text leading-tight">
              What our clients say <br /> about us
            </h2>
          </div>
          <div className="flex items-center gap-3 text-right">
            {/* Stacked avatars */}
            <div className="flex -space-x-2">
              {testimonials.map((t2) => (
                <img
                  key={t2.id}
                  src={t2.avatar}
                  alt={t2.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-brand-text">More than 500+</p>
              <p className="text-xs text-brand-text-3">Client Reviews</p>
            </div>
          </div>
        </div>

        {/* Testimonial card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={t.avatar.replace('w=100', 'w=600')}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: quote */}
          <div>
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: t.stars }).map((_, i) => (
                <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote mark */}
            <div className="text-brand-green text-6xl font-serif leading-none mb-4 select-none">"</div>

            <p className="text-brand-text text-lg leading-relaxed font-medium mb-8">
              {t.text}
            </p>

            <div className="mb-8">
              <p className="font-bold text-brand-text">{t.name}</p>
              <p className="text-sm text-brand-text-3">{t.role}</p>
            </div>

            {/* Nav arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrent((current - 1 + total) % total)}
                className="w-10 h-10 rounded-full border border-brand-gray-3 flex items-center justify-center hover:bg-brand-gray transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all ${i === current ? 'w-5 h-2 bg-brand-green' : 'w-2 h-2 bg-brand-gray-3'}`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrent((current + 1) % total)}
                className="w-10 h-10 rounded-full border border-brand-gray-3 flex items-center justify-center hover:bg-brand-gray transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
