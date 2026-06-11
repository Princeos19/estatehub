import { ArrowRight, Award, Users, Home, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { value: '100%', label: 'Client Satisfaction' },
  { value: '500+', label: 'Properties Sold' },
  { value: '150+', label: 'Cities Covered' },
  { value: '12+', label: 'Years Experience' },
]

const team = [
  {
    name: 'Kofi Mensah',
    role: 'Senior Sales Agent',
    bio: 'Specialises in luxury residential properties across East Legon and Cantonments.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Ama Owusu',
    role: 'Rental Specialist',
    bio: 'Expert in short and long-term rentals across Airport Residential and Osu.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b62c?w=400&q=80',
  },
  {
    name: 'Kwame Asante',
    role: 'Investment Advisor',
    bio: 'Guides investors to high-yield properties in Trasacco Valley and Labone.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
]

const values = [
  {
    icon: Award,
    title: 'Excellence',
    desc: 'We hold ourselves to the highest standards in every transaction, ensuring premium outcomes for every client.',
  },
  {
    icon: Users,
    title: 'Client First',
    desc: 'Every decision we make starts with what is best for our clients — buyers, sellers, renters, and investors alike.',
  },
  {
    icon: Home,
    title: 'Local Expertise',
    desc: 'Deep roots in Accra\'s property market give us unmatched insight into neighbourhood values and trends.',
  },
  {
    icon: TrendingUp,
    title: 'Results Driven',
    desc: 'We don\'t just list properties — we close deals, maximise returns, and deliver measurable outcomes.',
  },
]

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-white">

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-text">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24">
          <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-4">Who we are</p>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-2xl">
            Ghana&apos;s Most Trusted Real Estate Partner
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-xl mb-8">
            Since 2012, EstateHub has been connecting people with exceptional properties across
            Accra and beyond. We combine deep local knowledge with a passion for outstanding
            client experiences.
          </p>
          <Link to="/listings" className="btn-primary">
            Browse Properties <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-brand-gray-3">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`py-10 px-8 text-center ${i < stats.length - 1 ? 'border-r border-brand-gray-3' : ''}`}
              >
                <p className="text-4xl font-bold text-brand-text mb-1">{stat.value}</p>
                <p className="text-sm text-brand-text-3">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-pad">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-4">Our Story</p>
              <h2 className="text-4xl font-bold text-brand-text leading-tight mb-6">
                Built on Trust, Driven by Results
              </h2>
              <p className="text-brand-text-2 text-sm leading-relaxed mb-4">
                EstateHub was founded in 2012 by a group of property professionals who believed
                the Ghanaian real estate market deserved a higher standard of service. We started
                with a small office in East Legon and a commitment to putting clients first.
              </p>
              <p className="text-brand-text-2 text-sm leading-relaxed mb-4">
                Over a decade later, we have facilitated over 500 successful property
                transactions, built relationships with Ghana&apos;s leading developers, and assembled
                a team of specialists who bring genuine expertise to every deal.
              </p>
              <p className="text-brand-text-2 text-sm leading-relaxed">
                Whether you are buying your first home, expanding your investment portfolio, or
                searching for the perfect rental, EstateHub is your partner from search to keys.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"
                  alt="EstateHub office"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-card-hover p-5 max-w-[200px]">
                <p className="text-3xl font-bold text-brand-text">12+</p>
                <p className="text-sm text-brand-text-3">Years serving Ghana&apos;s property market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-brand-gray">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-3">What we stand for</p>
            <h2 className="text-4xl font-bold text-brand-text">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-card">
                <div className="w-11 h-11 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-brand-green" />
                </div>
                <h3 className="font-bold text-brand-text mb-2">{title}</h3>
                <p className="text-sm text-brand-text-2 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-brand-green uppercase tracking-widest mb-3">
              The people behind EstateHub
            </p>
            <h2 className="text-4xl font-bold text-brand-text">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="font-bold text-brand-text">{member.name}</h3>
                <p className="text-xs text-brand-green font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-brand-text-3 leading-relaxed max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-xl">
            Ready to find your perfect property?
          </h2>
          <p className="text-white/60 text-sm mb-8 max-w-md">
            Our team is ready to guide you through every step of your property journey.
          </p>
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link to="/listings" className="btn-primary">
              Browse Properties <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn-secondary bg-transparent text-white border-white/30 hover:bg-white/10">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
