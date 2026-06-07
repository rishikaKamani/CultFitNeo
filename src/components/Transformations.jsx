import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const stories = [
  {
    name: 'Arjun Sharma',
    age: 28,
    duration: '6 Months',
    result: 'Lost 18 kg',
    tag: 'Weight Loss',
    quote:
      'I tried every diet and home workout before CultFitNeo. Within 6 months I lost 18 kg and found confidence I never thought I had.',
    before: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=75',
    after:  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=75',
  },
  {
    name: 'Priya Nair',
    age: 32,
    duration: '8 Months',
    result: 'Gained 8 kg muscle',
    tag: 'Body Recomposition',
    quote:
      'From skinny-fat to strong — the trainers at CultFitNeo redesigned my entire approach to training and nutrition. Life-changing.',
    before: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=75',
    after:  'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=75',
  },
  {
    name: 'Rahul Mehta',
    age: 35,
    duration: '1 Year',
    result: 'Lost 30 kg',
    tag: 'Total Transformation',
    quote:
      'A year ago I could barely climb stairs. Today I run 10K every morning. CultFitNeo didn\'t just change my body — it changed my life.',
    before: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=75',
    after:  'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=75',
  },
]

const bannerStats = [
  { value: 5000, suffix: '+', label: 'Transformations Completed' },
  { value: 98,   suffix: '%', label: 'Success Rate' },
  { value: 4.9,  suffix: '/5', label: 'Average Member Rating', isDecimal: true },
]

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function useCounter(target, duration = 2000, started = false, isDecimal = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const val = eased * target
      setCount(isDecimal ? parseFloat(val.toFixed(1)) : Math.floor(val))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration, isDecimal])
  return count
}

/* ─────────────────────────────────────────
   BEFORE / AFTER SLIDER
───────────────────────────────────────── */
function BeforeAfterSlider({ before, after, name }) {
  const containerRef = useRef(null)
  const [sliderPos, setSliderPos] = useState(50) // percent
  const dragging = useRef(false)

  const clamp = (v) => Math.min(100, Math.max(0, v))

  const getPercent = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    return clamp(((clientX - rect.left) / rect.width) * 100)
  }, [])

  // Mouse
  const onMouseDown = (e) => { e.preventDefault(); dragging.current = true }
  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return
    setSliderPos(getPercent(e.clientX))
  }, [getPercent])
  const onMouseUp = () => { dragging.current = false }

  // Touch
  const onTouchStart = (e) => { dragging.current = true }
  const onTouchMove = useCallback((e) => {
    if (!dragging.current) return
    setSliderPos(getPercent(e.touches[0].clientX))
  }, [getPercent])
  const onTouchEnd = () => { dragging.current = false }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [onMouseMove, onTouchMove])

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] rounded-xl overflow-hidden select-none cursor-col-resize"
      aria-label={`Before and after transformation of ${name}`}
    >
      {/* AFTER (full width behind) */}
      <img
        src={after}
        alt={`${name} after transformation`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* BEFORE (clipped left portion) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${name} before transformation`}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        {/* Before label */}
        <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/15">
          Before
        </span>
      </div>

      {/* After label */}
      <span className="absolute top-3 right-3 bg-[#E63946]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
        After
      </span>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
        style={{ left: `calc(${sliderPos}% - 1px)` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
        style={{ left: `${sliderPos}%` }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div className="w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center gap-0.5 border-2 border-[#E63946]">
          <svg className="w-3 h-3 text-[#E63946] -rotate-90" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5 8l4-4 1.4 1.4L7.8 8l2.6 2.6L9 12zm6 0l-4 4-1.4-1.4L8.2 8 5.6 5.4 7 4z" />
          </svg>
        </div>
      </div>

      {/* Instruction hint — fades out after interaction would happen */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none">
        <span className="bg-black/60 backdrop-blur-sm text-gray-300 text-[10px] font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
          Drag to compare
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   STORY CARD
───────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
}

function StoryCard({ story, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="group relative bg-[#1A1A1A] border border-white/8 rounded-2xl overflow-hidden
                 hover:border-[#E63946]/35 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#E63946]/12
                 transition-all duration-500 ease-out flex flex-col"
    >
      {/* Glassmorphism hover shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-gradient-to-br from-[#E63946]/5 via-transparent to-transparent pointer-events-none z-10" />

      {/* Slider */}
      <div className="p-4 pb-0">
        <BeforeAfterSlider before={story.before} after={story.after} name={story.name} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-6 flex-1">

        {/* Tag + result */}
        <div className="flex items-center justify-between">
          <span className="bg-[#E63946]/10 border border-[#E63946]/25 text-[#E63946] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {story.tag}
          </span>
          <span className="text-white font-black text-sm">{story.result}</span>
        </div>

        {/* Name + meta */}
        <div>
          <h3 className="text-white font-bold text-lg leading-tight">{story.name}</h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {story.duration}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="text-gray-500 text-xs">Age {story.age}</span>
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-gray-400 text-sm leading-relaxed italic border-l-2 border-[#E63946]/40 pl-4 group-hover:text-gray-300 transition-colors duration-300 flex-1">
          "{story.quote}"
        </blockquote>

        {/* Star rating */}
        <div className="flex items-center gap-1 pt-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-[#E63946]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-gray-500 text-xs ml-1">5.0</span>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E63946] to-[#E63946]/20
                        scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   BANNER STAT ITEM
───────────────────────────────────────── */
function BannerStat({ stat, index, started }) {
  const count = useCounter(stat.value, 1800 + index * 150, started, stat.isDecimal)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2 px-8 relative"
    >
      {/* Vertical divider (not on last) */}
      {index < bannerStats.length - 1 && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-12 w-px bg-white/10" />
      )}
      <div className="flex items-end gap-0.5 leading-none">
        <span className="text-4xl md:text-5xl font-black text-white tabular-nums">
          {stat.isDecimal ? count.toFixed(1) : count.toLocaleString()}
        </span>
        <span className="text-2xl font-black text-[#E63946] mb-0.5">{stat.suffix}</span>
      </div>
      <span className="text-gray-400 text-xs font-medium uppercase tracking-widest text-center">
        {stat.label}
      </span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Transformations() {
  const bannerRef = useRef(null)
  const bannerInView = useInView(bannerRef, { once: true, margin: '-60px' })

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="transformations"
      className="relative bg-[#1A1A1A] py-28 px-6 overflow-hidden"
    >
      {/* ── Decorative background ── */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#E63946] opacity-[0.04] blur-[130px] rounded-full pointer-events-none" aria-hidden="true" />
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
            Success Stories
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5"
          >
            Real Transformations.{' '}
            <span className="text-[#E63946]">Real Results.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            Thousands of members have transformed their lives with CultFitNeo Gym.
          </motion.p>
        </div>

        {/* ── Story Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {stories.map((story, i) => (
            <StoryCard key={story.name} story={story} index={i} />
          ))}
        </div>

        {/* ── Stats Banner ── */}
        <div ref={bannerRef} className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={bannerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative bg-[#0F0F0F] border border-white/8 rounded-2xl overflow-hidden"
          >
            {/* Red top accent */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />

            <div className="flex flex-col md:flex-row items-center justify-around gap-8 py-12 px-6">
              {bannerStats.map((stat, i) => (
                <BannerStat key={stat.label} stat={stat} index={i} started={bannerInView} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 relative rounded-2xl overflow-hidden"
        >
          {/* CTA background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=70')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F] via-[#0F0F0F]/90 to-[#0F0F0F]/60" />
          {/* Red left border glow */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E63946]" />

          <div className="relative px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <p className="text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-3">
                Begin Your Journey
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
                Your Transformation{' '}
                <span className="text-[#E63946]">Starts Today</span>
              </h3>
              <p className="text-gray-400 text-sm mt-3 max-w-md">
                Join thousands who've already changed their lives. Your best self is one decision away.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a
                href="#free-trial"
                className="group inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-8 py-4 rounded transition-all duration-200 hover:shadow-xl hover:shadow-[#E63946]/40 hover:-translate-y-0.5 active:scale-95"
              >
                Start Free Trial
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 bg-white/8 backdrop-blur-sm hover:bg-white/15 border border-white/20 hover:border-white/40 text-white font-bold text-sm px-8 py-4 rounded transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                <svg className="w-4 h-4 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Talk To A Trainer
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
