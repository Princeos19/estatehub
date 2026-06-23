import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    id: '1',
    question: 'What types of properties do you sell?',
    answer: 'We specialise in residential, commercial, and luxury properties, offering a wide range of options to suit every buyer, renter, and investor. Properties range across different price points, catering to various budgets and investment goals.',
  },
  {
    id: '2',
    question: 'How do I know if a property is a good investment?',
    answer: 'Our expert advisors provide detailed market analysis, rental yield projections, and capital appreciation forecasts to help you make informed investment decisions.',
  },
  {
    id: '3',
    question: 'Do I need to hire a real estate agent?',
    answer: 'While not mandatory, working with one of our licensed agents significantly simplifies the process. They handle negotiations, paperwork, due diligence, and ensure you get the best value.',
  },
  {
    id: '4',
    question: "What's the process for buying a property?",
    answer: 'The process involves: (1) Browse and shortlist properties, (2) Book a private viewing, (3) Make an offer, (4) Legal due diligence, (5) Sign purchase agreement, (6) Pay and transfer title deeds.',
  },
  {
    id: '5',
    question: 'Can I tour a property before purchasing?',
    answer: 'Absolutely. We offer both in-person and virtual tours for all our listed properties. Simply contact the listing agent or use the "Book a Tour" button on any property page.',
  },
]

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
          <div className="lg:sticky lg:top-24">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-text leading-tight mb-4">
              Frequently asked questions
            </h2>
            <p className="text-brand-text-3 text-sm leading-relaxed max-w-sm">
              Our experts guide you in making informed real estate investment decisions
              based on your objectives, environment, and financial preferences.
            </p>
          </div>
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
