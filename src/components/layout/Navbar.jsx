import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Heart, LogOut, User, ChevronDown } from 'lucide-react'
import { useAuthContext } from '../../context/AuthContext'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Properties', to: '/listings' },
  { label: 'Contact Us', to: '/contact' },
]

function UserMenu({ user, profile, signOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef()
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user.email[0].toUpperCase()

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-white text-xs font-bold">
          {initials}
        </div>
        <span className="text-white text-sm font-medium hidden md:block max-w-[120px] truncate">
          {profile?.full_name || user.email}
        </span>
        <ChevronDown size={13} className="text-white/60" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-card-hover border border-brand-gray-3 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-brand-gray-3">
            <p className="text-xs font-bold text-brand-text truncate">{profile?.full_name || 'My Account'}</p>
            <p className="text-xs text-brand-text-3 truncate">{user.email}</p>
          </div>
          <div className="py-1">
            <Link
              to="/favourites"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-brand-text-2 hover:bg-brand-gray hover:text-brand-text transition-colors"
            >
              <Heart size={14} className="text-red-400" />
              Saved Properties
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-brand-text-2 hover:bg-brand-gray hover:text-red-500 transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, profile, signOut } = useAuthContext()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#111111]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-green rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">EH</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">EstateHub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-white bg-white/10' : 'text-white/75 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Auth CTA */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <UserMenu user={user} profile={profile} signOut={signOut} />
          ) : (
            <>
              <Link to="/sign-in" className="text-white/75 hover:text-white text-sm font-medium transition-colors px-3 py-2">
                Sign In
              </Link>
              <Link to="/sign-up" className="btn-primary text-sm">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111111] border-t border-white/10 px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10' : 'text-white/75'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <Link to="/favourites" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-white/75 flex items-center gap-2">
                <Heart size={14} /> Saved Properties
              </Link>
              <button onClick={async () => { await signOut(); setMobileOpen(false) }} className="px-4 py-3 rounded-lg text-sm font-medium text-red-400 text-left">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/sign-in" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-lg text-sm font-medium text-white/75">Sign In</Link>
              <Link to="/sign-up" onClick={() => setMobileOpen(false)} className="btn-primary mt-1 w-full justify-center">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
