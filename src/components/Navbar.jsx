import React, { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Facilities',  href: '#facilities' },
  { label: 'Trainers',    href: '#trainers' },
  { label: 'Programs',    href: '#programs' },
  { label: 'Memberships', href: '#memberships' },
  { label: 'Contact',     href: '#contact' },
]

// Section ids in DOM order for IntersectionObserver tracking
const sectionIds = ['home','about','facilities','trainers','programs','memberships',
  'transformations','gallery','testimonials','free-trial','contact']

const labelBySection = {
  home: 'Home', about: 'About', facilities: 'Facilities',
  trainers: 'Trainers', programs: 'Programs', memberships: 'Memberships',
  transformations: 'Memberships', gallery: 'Memberships',
  testimonials: 'Memberships', 'free-trial': 'Memberships', contact: 'Contact',
}

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  // Navbar background after scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Auto-highlight active section via IntersectionObserver
  useEffect(() => {
    const observers = []
    const visible = new Map()

    const decide = () => {
      // Pick the topmost visible section
      for (const id of sectionIds) {
        if (visible.get(id)) {
          setActiveLink(labelBySection[id] || 'Home')
          return
        }
      }
    }

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(([entry]) => {
        visible.set(id, entry.isIntersecting)
        decide()
      }, { threshold: 0.2 })
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (e, label) => {
    setActiveLink(label)
    setMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0F0F0F]/95 backdrop-blur-md shadow-lg shadow-black/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo → #home */}
        <a href="#home" className="flex items-center gap-2 group" onClick={e => handleNavClick(e, 'Home')}>
          <span className="w-8 h-8 bg-[#E63946] rounded flex items-center justify-center text-white font-black text-lg leading-none select-none">
            C
          </span>
          <span className="text-white font-extrabold text-xl tracking-tight">
            CultFit<span className="text-[#E63946]">Neo</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={e => handleNavClick(e, label)}
              className={`relative text-sm font-medium tracking-wide transition-colors duration-200 group
                ${activeLink === label ? 'text-[#E63946]' : 'text-gray-300 hover:text-white'}`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-[#E63946] transition-all duration-300
                  ${activeLink === label ? 'w-full' : 'w-0 group-hover:w-full'}`}
              />
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#memberships"
          onClick={e => handleNavClick(e, 'Memberships')}
          className="hidden md:inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white text-sm font-semibold px-5 py-2.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-[#E63946]/30 active:scale-95"
        >
          Join Now
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
        >
          <span className={`block h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-[7px]' : 'w-6'}`} />
          <span className={`block h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
          <span className={`block h-[2px] bg-white rounded transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-[7px]' : 'w-6'}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${menuOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="bg-[#0F0F0F]/98 backdrop-blur-md border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={e => handleNavClick(e, label)}
              className={`py-3 text-sm font-medium border-b border-white/5 transition-colors duration-200
                ${activeLink === label ? 'text-[#E63946]' : 'text-gray-300 hover:text-white'}`}
            >
              {label}
            </a>
          ))}
          <a
            href="#memberships"
            onClick={e => handleNavClick(e, 'Memberships')}
            className="mt-3 bg-[#E63946] hover:bg-[#c62d39] text-white text-sm font-semibold px-5 py-3 rounded text-center transition-colors duration-200"
          >
            Join Now
          </a>
        </nav>
      </div>
    </header>
  )
}
