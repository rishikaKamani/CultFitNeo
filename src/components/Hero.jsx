import React, { useEffect, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  // Trigger animation after mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1920&q=85')",
        }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay — heavier at bottom for text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-[#0F0F0F]"
        aria-hidden="true"
      />

      {/* Red accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#E63946]" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-4xl mx-auto">

        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 bg-[#E63946]/10 border border-[#E63946]/30 text-[#E63946] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0ms' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] animate-pulse" />
          Premium Fitness Center · Hyderabad
        </div>

        {/* Main heading */}
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '150ms' }}
        >
          Transform Your Body.
          <br />
          <span className="text-[#E63946]">Transform Your Life.</span>
        </h1>

        {/* Subheading */}
        <p
          className={`text-gray-300 text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto mb-12 leading-relaxed transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          Join Hyderabad's most premium fitness destination. Elite training,
          world-class coaches, and a community that pushes you beyond limits.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '450ms' }}
        >
          {/* Primary CTA */}
          <a
            href="#free-trial"
            className="group relative inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-base px-8 py-4 rounded overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#E63946]/40 hover:-translate-y-0.5 active:scale-95 min-w-[200px] justify-center"
          >
            {/* shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-600 ease-in-out" />
            <span>Start Free Trial</span>
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>

          {/* Secondary CTA */}
          <a
            href="#memberships"
            className="group inline-flex items-center gap-2 bg-transparent border-2 border-white/30 hover:border-white text-white font-bold text-base px-8 py-4 rounded transition-all duration-300 hover:bg-white/5 hover:-translate-y-0.5 active:scale-95 min-w-[200px] justify-center backdrop-blur-sm"
          >
            <span>View Membership Plans</span>
            <svg className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </div>

        {/* Stats strip */}
        <div
          className={`mt-20 grid grid-cols-3 gap-6 sm:gap-10 max-w-lg mx-auto transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { value: '2000+', label: 'Active Members' },
            { value: '15+',   label: 'Expert Trainers' },
            { value: '98%',   label: 'Success Rate' },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-3xl sm:text-4xl font-black text-white">{value}</span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 ${
          visible ? 'opacity-60' : 'opacity-0'
        }`}
        style={{ transitionDelay: '800ms' }}
        aria-hidden="true"
      >
        <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-5 h-8 border border-gray-500 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-1.5 bg-[#E63946] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
