import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const categories = ['All', 'Gym Interior', 'Strength Training', 'Cardio Zone', 'CrossFit Studio', 'Group Classes', 'Transformations']

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=70',
    alt: 'Main gym floor',
    category: 'Gym Interior',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=70',
    alt: 'Cardio machines',
    category: 'Cardio Zone',
    span: '',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=70',
    alt: 'Strength training',
    category: 'Strength Training',
    span: '',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=600&q=70',
    alt: 'CrossFit session',
    category: 'CrossFit Studio',
    span: 'row-span-2',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=70',
    alt: 'Group yoga class',
    category: 'Group Classes',
    span: '',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=600&q=70',
    alt: 'Personal training',
    category: 'Strength Training',
    span: '',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=70',
    alt: 'Member transformation',
    category: 'Transformations',
    span: '',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=600&q=70',
    alt: 'Female trainer',
    category: 'Transformations',
    span: 'col-span-2',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=600&q=70',
    alt: 'Boxing training',
    category: 'CrossFit Studio',
    span: '',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=600&q=70',
    alt: 'Yoga studio',
    category: 'Group Classes',
    span: '',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=70',
    alt: 'Gym interior wide',
    category: 'Gym Interior',
    span: 'col-span-2',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=900&q=80',
    thumb: 'https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=600&q=70',
    alt: 'Weight rack',
    category: 'Strength Training',
    span: '',
  },
]

const tourFeatures = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    value: '20,000',
    unit: 'sq ft',
    label: 'Facility',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    value: '200+',
    unit: '',
    label: 'Premium Equipment',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    value: '24°C',
    unit: '',
    label: 'AC Training Areas',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    value: '4',
    unit: 'zones',
    label: 'Recovery Zone',
  },
]

/* ─────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────── */
function Lightbox({ image, images, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
        onClick={onClose}
      >
        {/* Image */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl w-full max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl px-6 py-4">
            <p className="text-white font-semibold text-sm">{image.alt}</p>
            <p className="text-[#E63946] text-xs font-semibold uppercase tracking-widest mt-0.5">{image.category}</p>
          </div>
        </motion.div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white transition-all duration-200"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Prev */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#E63946] border border-white/15 hover:border-[#E63946] flex items-center justify-center text-white transition-all duration-200"
          aria-label="Previous"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Next */}
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-[#E63946] border border-white/15 hover:border-[#E63946] flex items-center justify-center text-white transition-all duration-200"
          aria-label="Next"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm border border-white/10 text-gray-400 text-xs font-medium px-4 py-1.5 rounded-full">
          {images.findIndex(i => i.id === image.id) + 1} / {images.length}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────
   GALLERY GRID ITEM
───────────────────────────────────────── */
function GalleryItem({ image, index, onClick }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-xl cursor-pointer bg-[#1A1A1A] ${image.span}`}
      onClick={() => onClick(image)}
    >
      {/* Skeleton shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] via-white/5 to-[#1A1A1A] animate-pulse" />
      )}

      <img
        src={image.thumb}
        alt={image.alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out
          group-hover:scale-110
          ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ minHeight: '200px' }}
        loading="lazy"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-all duration-400" />

      {/* Hover content */}
      <div className="absolute inset-0 flex flex-col justify-end p-4
                      translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                      transition-all duration-400 ease-out">
        <span className="text-[#E63946] text-[10px] font-bold uppercase tracking-widest mb-1">
          {image.category}
        </span>
        <p className="text-white font-semibold text-sm leading-tight">{image.alt}</p>
      </div>

      {/* Zoom icon */}
      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-white/15
                      flex items-center justify-center text-white
                      opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                      transition-all duration-300">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
        </svg>
      </div>

      {/* Red glow bottom on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#E63946]/20 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   VIRTUAL TOUR
───────────────────────────────────────── */
function VirtualTour() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [playing, setPlaying] = useState(false)

  return (
    <div ref={ref} className="mt-24">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-5">
          <span className="w-8 h-[1px] bg-[#E63946]" />
          Virtual Tour
          <span className="w-8 h-[1px] bg-[#E63946]" />
        </span>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-black text-white"
        >
          Take A <span className="text-[#E63946]">Virtual Tour</span>
        </motion.h3>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

        {/* Main tour image / video area */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer min-h-[340px]"
          onClick={() => setPlaying(true)}
        >
          <img
            src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80"
            alt="CultFitNeo gym tour"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            style={{ minHeight: '340px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full bg-[#E63946]/30 animate-ping" />
              <div className="absolute inset-[-8px] rounded-full bg-[#E63946]/15 animate-pulse" />
              <div className="w-18 h-18 w-[72px] h-[72px] rounded-full bg-[#E63946] flex items-center justify-center shadow-2xl shadow-[#E63946]/40 relative z-10">
                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-white font-bold text-lg">CultFitNeo — Full Facility Walkthrough</p>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              4 min tour · Hyderabad, Telangana
            </p>
          </div>

          {/* Top-right badge */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm border border-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            4K Tour
          </div>
        </motion.div>

        {/* Info cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4"
        >
          {tourFeatures.map((feat, i) => (
            <motion.div
              key={feat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group flex items-center gap-4 bg-[#1A1A1A] border border-white/8 rounded-xl p-5
                         hover:border-[#E63946]/30 hover:bg-[#E63946]/5 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E63946]/10 border border-[#E63946]/20
                              flex items-center justify-center text-[#E63946]
                              group-hover:bg-[#E63946]/20 transition-colors duration-300">
                {feat.icon}
              </div>
              <div>
                <div className="flex items-end gap-1 leading-none">
                  <span className="text-2xl font-black text-white">{feat.value}</span>
                  {feat.unit && <span className="text-sm font-bold text-[#E63946] mb-0.5">{feat.unit}</span>}
                </div>
                <p className="text-gray-500 text-xs font-medium mt-1">{feat.label}</p>
              </div>
            </motion.div>
          ))}

          {/* Schedule visit button */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-auto w-full flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#E63946]/30 hover:-translate-y-0.5 active:scale-95"
          >
            Schedule A Visit
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

      {/* Video modal placeholder */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6"
            onClick={() => setPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.88 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.88 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl aspect-video bg-[#1A1A1A] rounded-2xl overflow-hidden flex items-center justify-center border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80"
                alt="Gym tour"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <p className="text-white font-bold text-xl">Virtual Tour Coming Soon</p>
                <p className="text-gray-400 text-sm">Book an in-person tour for the full experience</p>
                <a
                  href="#contact"
                  onClick={() => setPlaying(false)}
                  className="mt-3 inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200"
                >
                  Book In-Person Tour
                </a>
              </div>
              <button
                onClick={() => setPlaying(false)}
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
   MAIN SECTION
───────────────────────────────────────── */
export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxImage, setLightboxImage] = useState(null)
  const headerRef = useRef(null)
  const ctaRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  const filtered = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory)

  const handleLightboxNav = useCallback((dir) => {
    if (!lightboxImage) return
    const idx = filtered.findIndex(i => i.id === lightboxImage.id)
    const next = (idx + dir + filtered.length) % filtered.length
    setLightboxImage(filtered[next])
  }, [lightboxImage, filtered])

  return (
    <section
      id="gallery"
      className="relative bg-[#0F0F0F] py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(45deg, #fff 1px, transparent 1px), linear-gradient(-45deg, #fff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#E63946] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-12 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-5"
          >
            <span className="w-8 h-[1px] bg-[#E63946]" />
            Gallery
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5"
          >
            Experience <span className="text-[#E63946]">CultFitNeo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            Take a closer look at Hyderabad's premium fitness destination.
          </motion.p>
        </div>

        {/* ── Filter Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wide transition-all duration-250
                ${activeCategory === cat
                  ? 'bg-[#E63946] text-white shadow-lg shadow-[#E63946]/25'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/25 hover:bg-white/8'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Masonry Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[180px] gap-3"
          >
            {filtered.map((image, i) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={i}
                onClick={setLightboxImage}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Virtual Tour ── */}
        <VirtualTour />

        {/* ── CTA Banner ── */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 relative rounded-2xl overflow-hidden border border-white/8"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=65')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/97 via-[#0F0F0F]/88 to-[#0F0F0F]/60" />
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />

          <div className="relative px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <span className="text-[#E63946] text-xs font-semibold uppercase tracking-widest">Visit Us</span>
              <h3 className="text-3xl md:text-4xl font-black text-white mt-2 leading-tight">
                See It. Feel It.{' '}
                <span className="text-[#E63946]">Experience It.</span>
              </h3>
              <p className="text-gray-400 text-sm mt-3 max-w-md">
                Words and photos don't do it justice. Come see Hyderabad's most premium gym in person.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#E63946]/40 hover:-translate-y-0.5 active:scale-95"
              >
                Schedule A Visit
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white/8 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/40 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          images={filtered}
          onClose={() => setLightboxImage(null)}
          onPrev={() => handleLightboxNav(-1)}
          onNext={() => handleLightboxNav(1)}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
