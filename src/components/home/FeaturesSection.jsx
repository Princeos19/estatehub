import { ArrowRight } from 'lucide-react'

export default function FeaturesSection() {
  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Top: headline + description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-text leading-tight">
            Your primary home might begin to feel left out.
          </h2>
          <div className="lg:pt-2 flex flex-col justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-green flex items-center justify-center shrink-0">
                <ArrowRight size={14} className="text-white" />
              </div>
              <p className="text-brand-text-2 text-sm leading-relaxed">
                EstateHub offers unique features, exceptional quality, and prime locations
              </p>
            </div>
          </div>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: large image card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] relative group">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80"
                alt="Feature property"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>

          {/* Center: text + small card */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-bold text-brand-text mb-3">
                Big things can happen in small spaces
              </h3>
              <p className="text-brand-text-2 text-sm leading-relaxed mb-5">
                With thoughtful design and smart organisation, you can transform any room into a haven for creativity.
              </p>
              <button className="btn-secondary text-sm">Details</button>
            </div>

            {/* Mini price card */}
            <div className="rounded-xl bg-brand-gray p-5 border border-brand-gray-3">
              <p className="text-xs text-brand-text-3 mb-1">Pricing Start at</p>
              <p className="text-2xl font-bold text-brand-text mb-3">$2256<span className="text-base font-medium">/mo</span></p>
              <button className="btn-primary w-full justify-center text-sm">
                Explore Property
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Right: tall image card */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl overflow-hidden mb-4 group">
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=700&q=80"
                  alt="Interior"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
            <p className="text-brand-text-2 text-sm leading-relaxed">
              Whether it's creating a cosy corner for relaxation or transforming a small space into a workroom.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
