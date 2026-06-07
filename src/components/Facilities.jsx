import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const facilities = [
  {
    title: 'Strength Training Zone',
    desc: 'Olympic platforms, power racks, and a full free-weights floor engineered for serious lifters of every level.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    tag: 'Free Weights · Machines',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: 'Cardio Arena',
    desc: 'Latest treadmills, rowers, bikes, and ellipticals with integrated screens to keep your sessions engaging.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    tag: 'Treadmills · Bikes · Rowers',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'CrossFit Studio',
    desc: 'High-ceiling functional training space with rigs, battle ropes, sleds, and kettlebells for elite conditioning.',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=800&q=80',
    tag: 'Functional · HIIT · WODs',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: 'Boxing & Functional Training',
    desc: 'Full-size boxing ring, heavy bags, speed bags, and agility ladders for total-body athletic development.',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=800&q=80',
    tag: 'Boxing · MMA · Agility',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    title: 'Yoga & Recovery Lounge',
    desc: 'A serene, sound-proofed studio for yoga, meditation, and active recovery — your sanctuary from the grind.',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=800&q=80',
    tag: 'Yoga · Meditation · Stretch',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    title: 'Premium Locker Rooms',
    desc: 'Luxury changing suites with private showers, steam rooms, vanity stations, and secure digital lockers.',
    image: 'https://images.unsplash.com/photo-1632953748526-d45de5f0c0c7?auto=format&fit=crop&w=800&q=80',
    tag: 'Showers · Steam · Lockers',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
]

// Stagger container
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 55 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

function FacilityCard({ facility }) {
  return (
    <motion.article
      variants={cardVariants}
      className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#1A1A1A] border border-white/8
                 hover:border-[#E63946]/40 hover:-translate-y-2
                 transition-all duration-500 ease-out
                 hover:shadow-2xl hover:shadow-[#E63946]/15"
    >
      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={facility.image}
          alt={facility.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Dark gradient over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/30 to-transparent" />

        {/* Tag chip */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 text-gray-300 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full">
          {facility.tag}
        </div>

        {/* Red glow on hover — radiates from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#E63946]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Card body */}
      <div className="relative p-6 flex flex-col gap-3">

        {/* Icon + Title row */}
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-[#E63946]/10 border border-[#E63946]/20
                          flex items-center justify-center text-[#E63946]
                          group-hover:bg-[#E63946]/20 transition-colors duration-300">
            {facility.icon}
          </div>
          <h3 className="text-white font-bold text-base leading-tight">{facility.title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors duration-300">
          {facility.desc}
        </p>

        {/* Explore link */}
        <a
          href="#free-trial"
          className="flex items-center gap-1.5 text-[#E63946] text-sm font-semibold mt-1
                      opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                      transition-all duration-300"
        >
          <span>Explore</span>
          <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>

        {/* Bottom red line — slides in on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E63946] to-[#E63946]/30
                        scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.article>
  )
}

export default function Facilities() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="facilities"
      className="relative bg-[#0F0F0F] py-28 px-6 overflow-hidden"
    >
      {/* ── Background decoration ── */}

      {/* Diagonal grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #fff 1px, transparent 1px), linear-gradient(45deg, #fff 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />

      {/* Red radial glow top-right */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E63946] opacity-[0.06] rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Red radial glow bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E63946] opacity-[0.04] rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Top border line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto" ref={ref}>

        {/* ── Section header ── */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-5"
          >
            <span className="w-8 h-[1px] bg-[#E63946]" />
            Our Facilities
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5"
          >
            World-Class{' '}
            <span className="text-[#E63946]">Training Facilities</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            Everything you need to achieve your fitness goals under one roof.
          </motion.p>
        </div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {facilities.map((facility) => (
            <FacilityCard key={facility.title} facility={facility} />
          ))}
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#free-trial"
            className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-8 py-4 rounded transition-all duration-200 hover:shadow-xl hover:shadow-[#E63946]/30 hover:-translate-y-0.5 active:scale-95"
          >
            Book a Free Tour
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <span className="text-gray-600 text-sm hidden sm:block">or</span>
          <a
            href="#memberships"
            className="text-sm text-gray-400 hover:text-white font-medium underline underline-offset-4 decoration-[#E63946]/40 hover:decoration-[#E63946] transition-all duration-200"
          >
            See Membership Plans
          </a>
        </motion.div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
