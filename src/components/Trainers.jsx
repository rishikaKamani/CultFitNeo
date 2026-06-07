import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const trainers = [
  {
    name: 'Rahul Verma',
    role: 'Head Strength Coach',
    specialization: 'Strength Training',
    experience: '10+ Years',
    certifications: ['NSCA-CSCS', 'ACSM-CPT'],
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80',
    socials: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Ananya Rao',
    role: 'Yoga & Mobility Expert',
    specialization: 'Yoga & Mobility',
    experience: '8+ Years',
    certifications: ['RYT-500', 'FRC Mobility Specialist'],
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    socials: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Vikram Nair',
    role: 'CrossFit & Conditioning Coach',
    specialization: 'CrossFit',
    experience: '9+ Years',
    certifications: ['CrossFit L3', 'USAW-L1'],
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=80',
    socials: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Meera Pillai',
    role: 'Weight Loss Specialist',
    specialization: 'Weight Loss',
    experience: '7+ Years',
    certifications: ['ACE-CPT', 'Precision Nutrition L2'],
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=80',
    socials: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Arjun Kapoor',
    role: 'Bodybuilding Coach',
    specialization: 'Bodybuilding',
    experience: '12+ Years',
    certifications: ['IFBB Pro', 'NASM-PES'],
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    socials: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', linkedin: 'https://linkedin.com' },
  },
  {
    name: 'Deepa Krishnan',
    role: 'Functional Fitness Coach',
    specialization: 'Functional Fitness',
    experience: '6+ Years',
    certifications: ['NASM-CPT', 'TRX Certified'],
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=80',
    socials: { instagram: 'https://instagram.com', youtube: 'https://youtube.com', linkedin: 'https://linkedin.com' },
  },
]

const featured = {
  name: 'Rahul Verma',
  role: 'Head Strength Coach & Co-Founder',
  specialization: 'Strength & Performance Training',
  experience: '10+ Years',
  image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=85',
  bio: 'Rahul Verma is the driving force behind CultFitNeo\'s training philosophy. A former national-level powerlifter turned elite coach, he has spent over a decade building science-backed strength programs for athletes, executives, and everyday fitness enthusiasts. His methodology blends progressive overload, biomechanics, and mindset coaching to deliver transformations that last a lifetime.',
  achievements: [
    'National Powerlifting Champion — 2014 & 2016',
    'Coached 3 athletes to international competition',
    'Featured in Fitness India Magazine',
    'Guest lecturer at NSCA India Summit',
  ],
  certifications: ['NSCA-CSCS', 'ACSM-CPT', 'FMS Level 2', 'Precision Nutrition L1'],
  stats: [
    { value: '1200+', label: 'Clients Trained' },
    { value: '95%',   label: 'Success Rate' },
    { value: '10+',   label: 'Years Experience' },
  ],
}

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

const YoutubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const specializationColors = {
  'Strength Training':  'bg-orange-500/10 border-orange-500/20 text-orange-400',
  'Yoga & Mobility':    'bg-purple-500/10 border-purple-500/20 text-purple-400',
  'CrossFit':           'bg-blue-500/10 border-blue-500/20 text-blue-400',
  'Weight Loss':        'bg-green-500/10 border-green-500/20 text-green-400',
  'Bodybuilding':       'bg-yellow-500/10 border-yellow-500/20 text-yellow-400',
  'Functional Fitness': 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
}

/* ─────────────────────────────────────────
   TRAINER CARD
───────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 55 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function TrainerCard({ trainer, index }) {
  const tagClass = specializationColors[trainer.specialization] || 'bg-[#E63946]/10 border-[#E63946]/20 text-[#E63946]'

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="group relative bg-[#1A1A1A] border border-white/8 rounded-2xl overflow-hidden
                 hover:border-[#E63946]/35 hover:-translate-y-2
                 hover:shadow-2xl hover:shadow-[#E63946]/12
                 transition-all duration-500 ease-out"
    >
      {/* Glassmorphism shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-br from-[#E63946]/5 via-transparent to-transparent pointer-events-none z-10" />

      {/* Image */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={trainer.image}
          alt={trainer.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/20 to-transparent" />

        {/* Specialization tag */}
        <div className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border backdrop-blur-sm ${tagClass}`}>
          {trainer.specialization}
        </div>

        {/* Social icons — slide up on hover */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2
                        translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                        transition-all duration-400 ease-out z-20">
          {Object.entries(trainer.socials).map(([platform, href]) => (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={platform}
              className="w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm border border-white/15
                         flex items-center justify-center text-white
                         hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-200"
            >
              {platform === 'instagram' && <InstagramIcon />}
              {platform === 'youtube'   && <YoutubeIcon />}
              {platform === 'linkedin'  && <LinkedinIcon />}
            </a>
          ))}
        </div>

        {/* Red bottom glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-20
                        bg-gradient-to-t from-[#E63946]/25 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-3">
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{trainer.name}</h3>
          <p className="text-[#E63946] text-xs font-semibold uppercase tracking-wide mt-0.5">{trainer.role}</p>
        </div>

        {/* Experience */}
        <div className="flex items-center gap-1.5 text-gray-400 text-sm">
          <svg className="w-4 h-4 text-[#E63946] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {trainer.experience} Experience
        </div>

        {/* Certifications */}
        <div className="flex flex-wrap gap-1.5">
          {trainer.certifications.map((cert) => (
            <span
              key={cert}
              className="text-[10px] font-semibold bg-white/5 border border-white/10 text-gray-400 px-2 py-1 rounded-md"
            >
              {cert}
            </span>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]
                        bg-gradient-to-r from-[#E63946] to-[#E63946]/20
                        scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   FEATURED TRAINER SPOTLIGHT
───────────────────────────────────────── */
function FeaturedTrainer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="mt-24">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest">
          <span className="w-8 h-[1px] bg-[#E63946]" />
          Trainer Spotlight
          <span className="w-8 h-[1px] bg-[#E63946]" />
        </span>
      </motion.div>

      <div className="relative bg-[#0F0F0F] border border-white/8 rounded-2xl overflow-hidden">
        {/* Red top accent */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-80 lg:h-auto min-h-[480px] overflow-hidden"
          >
            <img
              src={featured.image}
              alt={featured.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F0F0F] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/20 to-transparent lg:hidden" />

            {/* Floating stats */}
            <div className="absolute bottom-6 left-6 right-6 lg:hidden">
              <div className="grid grid-cols-3 gap-3">
                {featured.stats.map((s) => (
                  <div key={s.label} className="bg-black/70 backdrop-blur-sm border border-white/10 rounded-xl p-3 text-center">
                    <p className="text-xl font-black text-[#E63946]">{s.value}</p>
                    <p className="text-[9px] text-gray-400 uppercase tracking-wide mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center gap-6 p-8 lg:p-12"
          >
            <div>
              <p className="text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-2">{featured.specialization}</p>
              <h3 className="text-3xl md:text-4xl font-black text-white">{featured.name}</h3>
              <p className="text-gray-400 text-sm mt-1 font-medium">{featured.role}</p>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">{featured.bio}</p>

            {/* Achievements */}
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Key Achievements</p>
              <ul className="flex flex-col gap-2">
                {featured.achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-gray-400 text-sm">
                    <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[#E63946]" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                {featured.certifications.map((c) => (
                  <span key={c} className="text-xs font-semibold bg-[#E63946]/10 border border-[#E63946]/25 text-[#E63946] px-3 py-1.5 rounded-lg">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop stats */}
            <div className="hidden lg:grid grid-cols-3 gap-4 pt-2">
              {featured.stats.map((s) => (
                <div key={s.label} className="bg-white/4 border border-white/8 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-[#E63946]">{s.value}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="self-start inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-7 py-3.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-[#E63946]/30 hover:-translate-y-0.5 active:scale-95"
            >
              Train With Rahul
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function TrainerCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 relative rounded-2xl overflow-hidden border border-white/8"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=70')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/98 via-[#0F0F0F]/88 to-[#0F0F0F]/50" />
      {/* Left red border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E63946]" />

      <div className="relative px-10 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="text-center lg:text-left max-w-xl">
          <span className="text-[#E63946] text-xs font-semibold uppercase tracking-widest">Expert Coaching</span>
          <h3 className="text-2xl md:text-3xl font-black text-white mt-2 leading-tight">
            Get Personal Guidance From{' '}
            <span className="text-[#E63946]">Hyderabad's Top Fitness Coaches</span>
          </h3>
          <p className="text-gray-400 text-sm mt-3">
            Our certified trainers design programs around your body, your goals, and your schedule — so every rep counts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-8 py-4 rounded transition-all duration-200 hover:shadow-xl hover:shadow-[#E63946]/40 hover:-translate-y-0.5 active:scale-95"
          >
            Book A Consultation
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#trainers"
            className="inline-flex items-center justify-center gap-2 bg-white/8 backdrop-blur-sm hover:bg-white/15 border border-white/20 hover:border-white/40 text-white font-bold text-sm px-8 py-4 rounded transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            Meet Our Team
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Trainers() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="trainers"
      className="relative bg-[#0F0F0F] py-28 px-6 overflow-hidden"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      {/* Red glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-[#E63946] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#E63946] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-5"
          >
            <span className="w-8 h-[1px] bg-[#E63946]" />
            Expert Trainers
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5"
          >
            Train With <span className="text-[#E63946]">The Best</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            Our certified coaches are dedicated to helping you achieve your fitness goals safely and effectively.
          </motion.p>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainers.map((trainer, i) => (
            <TrainerCard key={trainer.name} trainer={trainer} index={i} />
          ))}
        </div>

        {/* ── Featured Spotlight ── */}
        <FeaturedTrainer />

        {/* ── CTA ── */}
        <TrainerCTA />
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
