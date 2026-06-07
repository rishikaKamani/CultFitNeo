import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Facilities from './components/Facilities'
import Transformations from './components/Transformations'
import Trainers from './components/Trainers'
import Memberships from './components/Memberships'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Programs from './components/Programs'
import FreeTrial from './components/FreeTrial'
import Contact, { WhatsAppButton } from './components/Contact'

function Footer() {
  const waMsg = encodeURIComponent("Hello, I'm interested in joining CultFitNeo Gym. Please share membership details.")
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/8 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <a href="#home" className="flex items-center gap-2">
              <span className="w-8 h-8 bg-[#E63946] rounded flex items-center justify-center text-white font-black text-lg leading-none select-none">C</span>
              <span className="text-white font-extrabold text-xl tracking-tight">CultFit<span className="text-[#E63946]">Neo</span></span>
            </a>
            <p className="text-gray-500 text-sm leading-relaxed">
              Hyderabad's premium fitness destination. Elite training, world-class coaches, and a community that pushes you beyond limits.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/cultfitneo', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
                { label: 'YouTube',   href: 'https://www.youtube.com/@cultfitneo',  path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                { label: 'Facebook',  href: 'https://www.facebook.com/cultfitneo',  path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Home',        href: '#home' },
                { label: 'About Us',    href: '#about' },
                { label: 'Facilities',  href: '#facilities' },
                { label: 'Trainers',    href: '#trainers' },
                { label: 'Programs',    href: '#programs' },
                { label: 'Memberships', href: '#memberships' },
                { label: 'Gallery',     href: '#gallery' },
                { label: 'Contact',     href: '#contact' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-gray-500 hover:text-[#E63946] text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#E63946] transition-all duration-200" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-5">Programs</p>
            <ul className="flex flex-col gap-3">
              {['Weight Loss', 'Strength & Muscle', 'CrossFit Training', 'Functional Fitness', 'Yoga & Mobility', 'Personal Training', '90-Day Challenge'].map(p => (
                <li key={p}>
                  <a href="#programs" className="text-gray-500 hover:text-[#E63946] text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-3 h-[1px] bg-[#E63946] transition-all duration-200" />
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white font-bold text-sm uppercase tracking-widest mb-5">Contact</p>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-gray-500 text-sm">
                <svg className="w-4 h-4 text-[#E63946] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                <span>Banjara Hills, Road No. 12<br />Hyderabad, Telangana – 500034</span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-500 hover:text-[#E63946] text-sm transition-colors duration-200">
                  <svg className="w-4 h-4 text-[#E63946] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:info@cultfitneo.com" className="flex items-center gap-3 text-gray-500 hover:text-[#E63946] text-sm transition-colors duration-200">
                  <svg className="w-4 h-4 text-[#E63946] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                  info@cultfitneo.com
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/919876543210?text=${waMsg}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} CultFitNeo Gym. All rights reserved. · Banjara Hills, Hyderabad
          </p>
          <div className="flex items-center gap-5">
            <a href="#free-trial" className="text-gray-600 hover:text-[#E63946] text-xs transition-colors duration-200">Free Trial</a>
            <a href="#memberships" className="text-gray-600 hover:text-[#E63946] text-xs transition-colors duration-200">Memberships</a>
            <a href="#contact" className="text-gray-600 hover:text-[#E63946] text-xs transition-colors duration-200">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Facilities />
      <Transformations />
      <Trainers />
      <Memberships />
      <Gallery />
      <Testimonials />
      <Programs />
      <FreeTrial />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
