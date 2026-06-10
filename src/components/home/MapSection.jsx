import { ArrowRight, MapPin } from 'lucide-react'

export default function MapSection() {
  return (
    <section className="section-pad bg-brand-gray">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: map visual */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-card-hover aspect-[4/3] bg-[#e8f0e4] relative">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Property map"
                className="w-full h-full object-cover opacity-80"
              />
              {/* Map pin overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-card-hover px-4 py-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center">
                    <MapPin size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-brand-text">East Legon</p>
                    <p className="text-xs text-brand-text-3">Accra, Ghana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: copy */}
          <div>
            <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-4">
              Best Value
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text leading-tight mb-6">
              Discover Properties with the Best Value
            </h2>
            <p className="text-brand-text-2 text-sm leading-relaxed mb-8 max-w-sm">
              From minimalist retreats to compact solutions, smart spaces inspire big ideas proving that you don't need much room.
            </p>
            <button className="btn-primary">
              Browse All Properties
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
