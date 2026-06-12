import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FeaturesSection() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Top: headline + description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text leading-tight">
            Your primary home might begin to feel left out.
          </h2>
          <p className="text-brand-text-2 text-sm leading-relaxed max-w-sm">
            EstateHub offers unique features, exceptional quality, and prime locations
            across Accra and beyond.
          </p>
        </div>

        {/* Three column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {/* Left: tall image */}
          <div className="rounded-2xl overflow-hidden group">
            <div className="relative h-full min-h-[400px] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80"
                alt="Feature property"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Center: text + price card */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-brand-text mb-3">
                Big things can happen in small spaces
              </h3>
              <p className="text-brand-text-2 text-sm leading-relaxed mb-5">
                With thoughtful design and smart organisation, you can transform
                any room into a haven for creativity.
              </p>
              <Link to="/listings" className="btn-secondary text-sm">
                Browse Listings
              </Link>
            </div>

            {/* Price card */}
            <div className="rounded-xl bg-brand-gray border border-brand-gray-3 p-5">
              <p className="text-xs text-brand-text-3 mb-1">Pricing Start at</p>
              <p className="text-3xl font-bold text-brand-text mb-4">
                $2,256<span className="text-base font-medium text-brand-text-3">/mo</span>
              </p>
              <Link to="/listings" className="btn-primary w-full justify-center">
                Explore Properties
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right: image + caption */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl overflow-hidden group flex-1">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80"
                  alt="Interior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <p className="text-brand-text-2 text-sm leading-relaxed">
              Whether it&apos;s creating a cosy corner for relaxation or transforming
              a small space into a workroom.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}