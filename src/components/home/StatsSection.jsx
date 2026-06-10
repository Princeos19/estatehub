const stats = [
  { value: '100%', label: 'Satisfactions Clients' },
  { value: '500+', label: 'Property Sells' },
  { value: '150+', label: 'Countries & Cities' },
  { value: '2,00+', label: 'Positive Reviews' },
]

export default function StatsSection() {
  return (
    <section className="bg-white border-y border-brand-gray-3">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-10 px-8 text-center ${
                i < stats.length - 1 ? 'border-r border-brand-gray-3' : ''
              }`}
            >
              <p className="text-4xl font-bold text-brand-text mb-1">{stat.value}</p>
              <p className="text-sm text-brand-text-3">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
