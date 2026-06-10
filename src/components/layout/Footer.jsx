import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const footerLinks = {
  Company: ['Home', 'About', 'Properties', 'Careers', 'Contact'],
  Services: ['Buy Property', 'Rent Property', 'Sell Property', 'Valuation', 'Investment'],
  Legal: ['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'Disclaimer'],
}

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-brand-green rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">EH</span>
              </div>
              <span className="text-white font-bold text-lg">EstateHub</span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-xs">
              Discover Nature's Wonders with Expert Guidance. We connect you to your dream property across Ghana.
            </p>
            <div className="space-y-2 text-sm text-white/55">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-brand-green shrink-0" />
                <span>12345 Opeasi Dhaisi Road, Banglatown</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-brand-green shrink-0" />
                <span>+(0)39-844-8463</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-brand-green shrink-0" />
                <span>hello@estatehub.com</span>
              </div>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-brand-green hover:text-white transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-semibold text-sm mb-4">{heading}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-white/50 text-sm hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© 2025 EstateHub. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Terms & Conditions</a>
            <span>|</span>
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
