import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const reviews = [
  {
    id: 1,
    name: 'Priya Reddy',
    duration: 'Member for 1 Year',
    rating: 5,
    text: 'Lost 14 kg and completely changed my lifestyle. The trainers and environment here are unlike anything I\'ve experienced. CultFitNeo didn\'t just transform my body — it transformed my mindset.',
    result: 'Lost 14 kg',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=200&q=80',
    plan: 'Elite Member',
  },
  {
    id: 2,
    name: 'Arjun Sharma',
    duration: 'Member for 8 Months',
    rating: 5,
    text: 'From 92 kg to 74 kg in 8 months. The personalized program and nutrition guidance made all the difference. My trainer Rahul pushed me beyond what I thought was possible.',
    result: 'Lost 18 kg',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=200&q=80',
    plan: 'Transformation Package',
  },
  {
    id: 3,
    name: 'Sneha Iyer',
    duration: 'Member for 6 Months',
    rating: 5,
    text: 'I was skeptical at first but the results speak for themselves. The yoga studio is beautiful, trainers are incredibly knowledgeable, and the community keeps you motivated every single day.',
    result: 'Lost 9 kg',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=200&q=80',
    plan: 'Pro Member',
  },
  {
    id: 4,
    name: 'Karan Mehta',
    duration: 'Member for 2 Years',
    rating: 5,
    text: 'Best investment I\'ve made for my health. The CrossFit studio is world-class and Coach Vikram is exceptional. I\'ve competed in two local events since joining CultFitNeo.',
    result: 'Gained 8 kg muscle',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=200&q=80',
    plan: 'Elite Member',
  },
  {
    id: 5,
    name: 'Divya Nair',
    duration: 'Member for 10 Months',
    rating: 5,
    text: 'The facilities are absolutely top-tier. Clean, modern, and always well-maintained. The nutrition guidance alone was worth the membership fee — completely overhauled my diet.',
    result: 'Lost 11 kg',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=200&q=80',
    plan: 'Pro Member',
  },
  {
    id: 6,
    name: 'Rohan Kapoor',
    duration: 'Member for 14 Months',
    rating: 5,
    text: 'CultFitNeo is what a premium gym should feel like. State-of-the-art equipment, expert coaches, and the kind of atmosphere that makes you want to come back every day. Truly elite.',
    result: 'Gained 6 kg muscle',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=200&q=80',
    plan: 'Elite Member',
  },
  {
    id: 7,
    name: 'Anushka Rao',
    duration: 'Member for 5 Months',
    rating: 5,
    text: 'Joined for weight loss, stayed for the community. The group classes are energetic and the trainers genuinely care about your progress. Already referred 3 of my friends here.',
    result: 'Lost 7 kg',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=200&q=80',
    plan: 'Basic Member',
  },
  {
    id: 8,
    name: 'Vivek Pillai',
    duration: 'Member for 18 Months',
    rating: 5,
    text: 'I run a demanding corporate job and CultFitNeo is my daily reset. The 6 AM HIIT class is incredible, the locker rooms are luxurious, and the overall vibe is just unmatched in Hyderabad.',
    result: 'Lost 22 kg',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=200&q=80',
    plan: 'Transformation Package',
  },
]

const videoTestimonials = [
  {
    name: 'Rahul Mehta',
    result: 'Lost 30 kg in 1 Year',
    duration: '1 Year Journey',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80',
    videoLength: '3:24',
  },
  {
    name: 'Priya Nair',
    result: 'Complete Body Recomposition',
    duration: '8 Month Journey',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    videoLength: '2:51',
  },
  {
    name: 'Arjun Kapoor',
    result: 'From Beginner to Competitive',
    duration: '14 Month Journey',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    videoLength: '4:07',
  },
]

const ratingBreakdown = [
  { stars: 5, percent: 88 },
  { stars: 4, percent: 9 },
  { stars: 3, percent: 2 },
  { stars: 2, percent: 0.5 },
  { stars: 1, percent: 0.5 },
]

const trustStats = [
  { value: '5000+', label: 'Active Members' },
  { value: '3500+', label: 'Positive Reviews' },
  { value: '98%',   label: 'Client Satisfaction' },
  { value: '15+',   label: 'Years Experience' },
]

/* ─────────────────────────────────────────
   STARS
───────────────────────────────────────── */
function Stars({ count = 5, size = 'sm' }) {
  const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5'
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${sz} ${i < count ? 'text-[#E63946]' : 'text-white/15'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   REVIEW CARD
───────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <div className="group relative flex-shrink-0 w-[340px] bg-white/4 backdrop-blur-sm border border-white/8 rounded-2xl p-6 flex flex-col gap-4 hover:border-[#E63946]/30 hover:bg-[#E63946]/5 hover:-translate-y-1 transition-all duration-300 cursor-default">
      {/* Glassmorphism shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />

      {/* Quote icon */}
      <svg className="w-8 h-8 text-[#E63946]/30" fill="currentColor" viewBox="0 0 32 32">
        <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7c0-1.657 1.343-3 3-3V8zm18 0c-3.314 0-6 2.686-6 6v10h10V14h-7c0-1.657 1.343-3 3-3V8z" />
      </svg>

      {/* Review text */}
      <p className="text-gray-300 text-sm leading-relaxed flex-1 italic">"{review.text}"</p>

      {/* Result tag */}
      <span className="inline-flex self-start items-center gap-1.5 bg-[#E63946]/10 border border-[#E63946]/20 text-[#E63946] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        {review.result}
      </span>

      {/* Divider */}
      <div className="h-px bg-white/8" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={review.image}
          alt={review.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-[#E63946]/30"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate">{review.name}</p>
          <p className="text-gray-500 text-[11px]">{review.duration}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Stars count={review.rating} />
          <span className="text-[#E63946] text-[10px] font-semibold">{review.plan}</span>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E63946] to-[#E63946]/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-b-2xl" />
    </div>
  )
}

/* ─────────────────────────────────────────
   TESTIMONIAL CAROUSEL
───────────────────────────────────────── */
function TestimonialCarousel() {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = reviews.length
  const visibleCount = 3 // how many scroll per nav step

  // Auto-scroll every 3.5s
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % total)
    }, 3500)
    return () => clearInterval(id)
  }, [paused, total])

  const prev = () => setIndex(i => (i - 1 + total) % total)
  const next = () => setIndex(i => (i + 1) % total)

  // Build infinite list: duplicate reviews around current
  const extended = [...reviews, ...reviews, ...reviews]
  const offset = total // start from middle copy

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Track */}
      <div className="overflow-hidden px-1 py-4">
        <motion.div
          ref={trackRef}
          className="flex gap-5"
          animate={{ x: -((index % total) * 360) }}
          transition={{ type: 'spring', stiffness: 220, damping: 30 }}
        >
          {extended.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </motion.div>
      </div>

      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#1A1A1A] to-transparent pointer-events-none z-10" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#1A1A1A] to-transparent pointer-events-none z-10" />

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full bg-white/8 border border-white/12 hover:bg-[#E63946] hover:border-[#E63946] text-white transition-all duration-200 flex items-center justify-center"
          aria-label="Previous"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex gap-1.5">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                i === index % total
                  ? 'w-6 h-2 bg-[#E63946]'
                  : 'w-2 h-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 rounded-full bg-white/8 border border-white/12 hover:bg-[#E63946] hover:border-[#E63946] text-white transition-all duration-200 flex items-center justify-center"
          aria-label="Next"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   GOOGLE REVIEWS SHOWCASE
───────────────────────────────────────── */
function GoogleReviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Left: big rating */}
      <div className="bg-[#0F0F0F] border border-white/8 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />

        {/* Google logo text */}
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-6 h-6" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-white font-bold text-sm">Google Reviews</span>
        </div>

        <div className="flex items-end gap-2">
          <span className="text-7xl font-black text-white">4.9</span>
          <span className="text-3xl font-black text-[#E63946] mb-2">/5</span>
        </div>

        <Stars count={5} size="lg" />

        <p className="text-gray-400 text-sm">
          Based on <span className="text-white font-bold">3,500+</span> verified reviews
        </p>

        <a
          href="#"
          className="mt-2 inline-flex items-center gap-1.5 text-[#E63946] text-xs font-semibold hover:underline"
        >
          See all reviews on Google
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>

      {/* Right: breakdown bars */}
      <div className="bg-[#0F0F0F] border border-white/8 rounded-2xl p-8 flex flex-col justify-center gap-4">
        <p className="text-white font-bold text-base mb-2">Rating Breakdown</p>
        {ratingBreakdown.map((row, i) => (
          <motion.div
            key={row.stars}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-1 w-14 flex-shrink-0">
              <span className="text-gray-400 text-xs font-medium">{row.stars}</span>
              <svg className="w-3 h-3 text-[#E63946]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="flex-1 h-2 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${row.percent}%` } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-[#E63946] rounded-full"
              />
            </div>
            <span className="text-gray-500 text-xs w-10 text-right flex-shrink-0">{row.percent}%</span>
          </motion.div>
        ))}

        <div className="mt-3 pt-4 border-t border-white/8 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-1.821-.41-3.545-1.14-5.09" />
            </svg>
          </div>
          <div>
            <p className="text-white text-sm font-semibold">97% recommend CultFitNeo</p>
            <p className="text-gray-500 text-xs">Based on member exit surveys</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   TRUST STATS
───────────────────────────────────────── */
function TrustStats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
      {trustStats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="group bg-[#0F0F0F] border border-white/8 rounded-xl p-6 text-center
                     hover:border-[#E63946]/30 hover:-translate-y-1 transition-all duration-300"
        >
          <p className="text-3xl font-black text-white mb-1">{s.value}</p>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">{s.label}</p>
          <div className="mt-3 h-[2px] w-8 bg-[#E63946]/40 mx-auto rounded-full group-hover:w-full group-hover:bg-[#E63946] transition-all duration-400" />
        </motion.div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   VIDEO TESTIMONIALS
───────────────────────────────────────── */
function VideoTestimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [playing, setPlaying] = useState(null)

  return (
    <div ref={ref} className="mt-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <span className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-4">
          <span className="w-8 h-[1px] bg-[#E63946]" />
          Video Stories
          <span className="w-8 h-[1px] bg-[#E63946]" />
        </span>
        <h3 className="text-2xl md:text-3xl font-black text-white">
          Hear It From <span className="text-[#E63946]">Our Members</span>
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videoTestimonials.map((v, i) => (
          <motion.div
            key={v.name}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#1A1A1A] border border-white/8
                       hover:border-[#E63946]/35 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#E63946]/12
                       transition-all duration-500"
            onClick={() => setPlaying(v.name)}
          >
            {/* Thumbnail */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={v.image}
                alt={v.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#E63946]/30 animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
                  <div className="w-14 h-14 rounded-full bg-[#E63946]/90 group-hover:bg-[#E63946] backdrop-blur-sm flex items-center justify-center shadow-xl shadow-[#E63946]/40 relative z-10 transition-all duration-300 group-hover:scale-110">
                    <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Duration badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/15">
                {v.videoLength}
              </div>
            </div>

            {/* Card content */}
            <div className="p-5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h4 className="text-white font-bold text-base">{v.name}</h4>
                <Stars count={5} />
              </div>
              <p className="text-[#E63946] text-xs font-semibold uppercase tracking-wide">{v.result}</p>
              <p className="text-gray-500 text-xs">{v.duration}</p>
            </div>

            {/* Red hover glow */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E63946] to-[#E63946]/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
          </motion.div>
        ))}
      </div>

      {/* Video modal */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setPlaying(null)}
          >
            <motion.div
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.88 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/10 p-10 text-center"
              onClick={e => e.stopPropagation()}
            >
              <p className="text-white font-bold text-xl mb-2">{playing}'s Story</p>
              <p className="text-gray-400 text-sm mb-6">Full video testimonial coming soon. Book a tour to meet our members in person.</p>
              <a
                href="#contact"
                onClick={() => setPlaying(null)}
                className="inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200"
              >
                Book A Gym Visit
              </a>
              <button
                onClick={() => setPlaying(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function TestimonialCTA() {
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
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=65')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/97 via-[#0F0F0F]/90 to-[#0F0F0F]/65" />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />

      <div className="relative px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
            <Stars count={5} size="lg" />
            <span className="text-white font-bold text-sm">4.9/5 from 3,500+ reviews</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
            Join Thousands Of <span className="text-[#E63946]">Happy Members</span>
          </h3>
          <p className="text-gray-400 text-sm mt-3 max-w-md">
            Hyderabad's most trusted gym. Real results. Real community. Real transformation.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#E63946]/40 hover:-translate-y-0.5 active:scale-95"
          >
            Start Free Trial
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#memberships"
            className="inline-flex items-center justify-center gap-2 bg-white/8 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/40 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            Become A Member
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Testimonials() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="testimonials"
      className="relative bg-[#1A1A1A] py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-1/4 right-0 w-[500px] h-[400px] bg-[#E63946] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[300px] bg-[#E63946] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-14 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-5"
          >
            <span className="w-8 h-[1px] bg-[#E63946]" />
            Member Reviews
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5"
          >
            What Our Members <span className="text-[#E63946]">Say</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            Thousands of Hyderabad residents trust CultFitNeo Gym for their fitness journey.
          </motion.p>
        </div>

        {/* ── Carousel ── */}
        <TestimonialCarousel />

        {/* ── Google Reviews ── */}
        <GoogleReviews />

        {/* ── Trust Stats ── */}
        <TrustStats />

        {/* ── Video Testimonials ── */}
        <VideoTestimonials />

        {/* ── CTA ── */}
        <TestimonialCTA />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
