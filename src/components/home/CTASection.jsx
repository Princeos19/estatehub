import { ArrowRight } from 'lucide-react'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80"
          alt="CTA background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 max-w-2xl">
          Ready to Make Your Dream Property a Reality?
        </h2>
        <p className="text-white/60 text-sm mb-10 max-w-md">
          Explore a curated selection of properties that align with your lifestyle and investment goals.
        </p>
        <button className="btn-dark bg-white text-brand-text hover:bg-brand-gray">
          Get Started
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  )
}
