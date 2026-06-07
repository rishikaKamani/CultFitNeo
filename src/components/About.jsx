import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: 'Certified Trainers',
    desc: 'Our coaches hold international certifications and bring years of elite-level training experience.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Modern Equipment',
    desc: 'State-of-the-art machines and free weights sourced from globally recognized fitness brands.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    title: 'Personalized Programs',
    desc: 'Every member receives a tailored fitness roadmap aligned with their unique goals and fitness level.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    title: 'Nutrition Guidance',
    desc: 'In-house nutrition experts craft diet plans that complement your training and accelerate results.',
  },
]

// Reusable fade-in-up variant
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } },
})

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      ref={ref}
      className="relative bg-[#1A1A1A] py-28 px-6 overflow-hidden"
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Decorative blobs */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#E63946] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#E63946] opacity-[0.05] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto">

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 xl:gap-20 items-center">

          {/* ── LEFT: Image ── */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[580px]">
              <img
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80"
                alt="CultFitNeo Gym interior"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/60 via-transparent to-transparent" />
            </div>

            {/* Floating badge */}
            <motion.div
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="absolute -bottom-5 -right-5 lg:bottom-8 lg:-right-8 bg-[#E63946] text-white rounded-2xl px-6 py-5 shadow-2xl shadow-[#E63946]/30"
            >
              <p className="text-3xl font-black leading-none">15+</p>
              <p className="text-xs font-semibold uppercase tracking-wider mt-1 opacity-90">Years of Excellence</p>
            </motion.div>

            {/* Decorative border frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-[#E63946]/40 rounded-tl-2xl pointer-events-none" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-[#E63946]/40 rounded-br-2xl pointer-events-none" />
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <div className="flex flex-col gap-8">

            {/* Section label */}
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <span className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest">
                <span className="w-8 h-[1px] bg-[#E63946]" />
                About Us
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={fadeUp(0.2)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-4xl md:text-5xl font-black text-white leading-[1.1]"
            >
              Why Choose{' '}
              <span className="text-[#E63946]">CultFitNeo?</span>
            </motion.h2>

            {/* Body copy */}
            <motion.p
              variants={fadeUp(0.3)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-gray-400 text-base leading-relaxed"
            >
              CultFitNeo Gym is Hyderabad's premium fitness destination, built for those who demand
              more. We combine cutting-edge equipment, science-backed training methodologies, and
              a passionate community to deliver real, lasting transformations. Whether you're a
              beginner or a seasoned athlete, our expert trainers craft personalized programs
              backed by nutrition guidance — so every session moves you closer to your best self.
            </motion.p>

            {/* Feature cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  variants={fadeUp(0.35 + i * 0.1)}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/8 rounded-xl p-5 overflow-hidden
                             hover:border-[#E63946]/30 hover:bg-[#E63946]/5 transition-all duration-300 cursor-default"
                >
                  {/* Glassmorphism shimmer on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center text-[#E63946] group-hover:bg-[#E63946]/20 transition-colors duration-300">
                      {feat.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm mb-1">{feat.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              variants={fadeUp(0.75)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="flex items-center gap-6 pt-2"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-7 py-3.5 rounded transition-all duration-200 hover:shadow-lg hover:shadow-[#E63946]/30 hover:-translate-y-0.5 active:scale-95"
              >
                Start Your Journey
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#memberships"
                className="text-sm text-gray-400 hover:text-white font-medium underline underline-offset-4 decoration-[#E63946]/40 hover:decoration-[#E63946] transition-all duration-200"
              >
                View Plans
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
