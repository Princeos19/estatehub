import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { faqs } from '../../data/properties'

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-brand-gray-3">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className={`text-sm font-semibold transition-colors ${isOpen ? 'text-brand-green' : 'text-brand-text'}`}>
          {faq.question}
        </span>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-brand-green' : 'bg-brand-gray-3'}`}>
          {isOpen
            ? <Minus size={13} className="text-white" />
            : <Plus size={13} className="text-brand-text-2" />
          }
        </div>
      </button>
      {isOpen && (
        <div className="pb-5">
          <p className="text-sm text-brand-text-2 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQSection() {
  const [openId, setOpenId] = useState('1')

  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: heading */}
          <div className="lg:sticky lg:top-24">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text leading-tight mb-4">
              Frequently asked questions
            </h2>
            <p className="text-brand-text-3 text-sm leading-relaxed max-w-sm">
              Our experts guide you in making informed real estate investment decisions based on your objectives, environment, and financial advice to find a property tailored to different preferences and budgets.
            </p>
          </div>

          {/* Right: accordion */}
          <div>
            {faqs.map((faq) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
