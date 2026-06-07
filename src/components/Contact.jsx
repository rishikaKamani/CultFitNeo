import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────── */
function useCounter(target, started, duration = 1800) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return count
}

/* ─────────────────────────────────────────
   OPEN STATUS — computed from real time
───────────────────────────────────────── */
function useOpenStatus() {
  const [status, setStatus] = useState(() => {
    const now = new Date()
    const day = now.getDay() // 0=Sun, 6=Sat
    const hour = now.getHours()
    const min = now.getMinutes()
    const totalMins = hour * 60 + min
    if (day === 0) return totalMins >= 360 && totalMins < 1260  // Sun 6AM–9PM
    return totalMins >= 300 && totalMins < 1380                 // Mon–Sat 5AM–11PM
  })
  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      const day = now.getDay()
      const totalMins = now.getHours() * 60 + now.getMinutes()
      if (day === 0) setStatus(totalMins >= 360 && totalMins < 1260)
      else setStatus(totalMins >= 300 && totalMins < 1380)
    }, 60000)
    return () => clearInterval(id)
  }, [])
  return status
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const contactCards = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: 'Address',
    lines: ['CultFitNeo Gym', 'Banjara Hills, Road No. 12', 'Hyderabad, Telangana – 500034'],
    action: { label: 'Get Directions', href: 'https://maps.google.com/?q=Banjara+Hills+Hyderabad', external: true },
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: 'Phone',
    lines: ['+91 98765 43210', '+91 91234 56789'],
    action: { label: 'Call Now', href: 'tel:+919876543210' },
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: 'Email',
    lines: ['info@cultfitneo.com', 'support@cultfitneo.com'],
    action: { label: 'Email Us', href: 'mailto:info@cultfitneo.com' },
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Working Hours',
    lines: ['Mon – Sat: 5:00 AM – 11:00 PM', 'Sunday: 6:00 AM – 9:00 PM'],
    action: null,
    extra: (
      <span className="inline-flex items-center gap-1.5 mt-1 text-green-400 text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        Open Now
      </span>
    ),
  },
]

const quickActions = [
  {
    label: 'Call Now',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    href: 'tel:+919876543210',
    color: 'hover:border-blue-500/40 hover:bg-blue-500/5',
    iconColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    desc: '+91 98765 43210',
  },
  {
    label: 'WhatsApp Us',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    href: `https://wa.me/919876543210?text=${encodeURIComponent("Hello, I'm interested in joining CultFitNeo Gym. Please share membership details.")}`,
    external: true,
    color: 'hover:border-green-500/40 hover:bg-green-500/5',
    iconColor: 'text-green-400 bg-green-400/10 border-green-400/20',
    desc: 'Chat instantly',
  },
  {
    label: 'Email Us',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    href: 'mailto:info@cultfitneo.com',
    color: 'hover:border-[#E63946]/40 hover:bg-[#E63946]/5',
    iconColor: 'text-[#E63946] bg-[#E63946]/10 border-[#E63946]/20',
    desc: 'info@cultfitneo.com',
  },
  {
    label: 'Get Directions',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    href: 'https://maps.google.com/?q=Banjara+Hills+Hyderabad',
    external: true,
    color: 'hover:border-purple-500/40 hover:bg-purple-500/5',
    iconColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    desc: 'Banjara Hills, Hyderabad',
  },
]

const trustStats = [
  { value: 5000, suffix: '+', label: 'Active Members' },
  { value: 15,   suffix: '+', label: 'Years Experience' },
  { value: 3500, suffix: '+', label: 'Positive Reviews' },
  { value: 98,   suffix: '%', label: 'Client Satisfaction' },
]

/* ─────────────────────────────────────────
   CONTACT INFO CARD
───────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function ContactCard({ card, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      className="group relative bg-white/4 backdrop-blur-sm border border-white/8 rounded-2xl p-5
                 hover:border-[#E63946]/30 hover:bg-[#E63946]/4 hover:-translate-y-1
                 transition-all duration-300"
    >
      {/* Shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />

      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#E63946]/10 border border-[#E63946]/20
                        flex items-center justify-center text-[#E63946]
                        group-hover:bg-[#E63946]/20 transition-colors duration-300">
          {card.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#E63946] text-[10px] font-bold uppercase tracking-widest mb-1.5">{card.label}</p>
          {card.lines.map((line, i) => (
            <p key={i} className="text-gray-300 text-sm font-medium leading-snug">{line}</p>
          ))}
          {card.extra}
          {card.action && (
            <a
              href={card.action.href}
              target={card.action.external ? '_blank' : undefined}
              rel={card.action.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-1 mt-2.5 text-[#E63946] text-xs font-semibold hover:gap-2 transition-all duration-200"
            >
              {card.action.label}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E63946] to-[#E63946]/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-b-2xl" />
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAP EMBED
───────────────────────────────────────── */
function MapSection({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4 h-full"
    >
      {/* Map container */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 flex-1 min-h-[420px]">
        {/* Dark overlay tint on iframe for brand consistency */}
        <div className="absolute inset-0 pointer-events-none z-10 mix-blend-multiply bg-[#1A1A1A]/20 rounded-2xl" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent z-20" />

        <iframe
          title="CultFitNeo Gym Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.2637977613!2d78.43831031487655!3d17.42750218806018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb977a09a9b3c7%3A0x3f0e51e9b7e4c6d!2sBanjara%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: '420px', filter: 'invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.85)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Pin label overlay */}
        <div className="absolute bottom-4 left-4 z-20 bg-[#0F0F0F]/90 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E63946]/15 border border-[#E63946]/25 flex items-center justify-center text-[#E63946] flex-shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm">CultFitNeo Gym</p>
            <p className="text-gray-500 text-xs">Banjara Hills, Hyderabad</p>
          </div>
        </div>
      </div>

      {/* Map action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <a
          href="https://maps.google.com/?q=Banjara+Hills+Hyderabad"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm py-3.5 px-5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#E63946]/30 hover:-translate-y-0.5 active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
          </svg>
          Get Directions
        </a>
        <a
          href="https://maps.google.com/?q=Banjara+Hills+Hyderabad"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 hover:bg-white/15 hover:border-white/30 text-white font-bold text-sm py-3.5 px-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
        >
          <svg className="w-4 h-4 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Open in Maps
        </a>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   QUICK ACTIONS
───────────────────────────────────────── */
function QuickActions({ inView }) {
  return (
    <div className="mt-14">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45 }}
        className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500 mb-6 flex items-center justify-center gap-3"
      >
        <span className="flex-1 h-px bg-white/8 max-w-[100px]" />
        Quick Contact
        <span className="flex-1 h-px bg-white/8 max-w-[100px]" />
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <motion.a
            key={action.label}
            href={action.href}
            target={action.external ? '_blank' : undefined}
            rel={action.external ? 'noopener noreferrer' : undefined}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group flex flex-col items-center gap-3 bg-[#1A1A1A] border border-white/8 rounded-2xl p-6
                        ${action.color} hover:-translate-y-1.5 hover:shadow-xl
                        transition-all duration-300 cursor-pointer`}
          >
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${action.iconColor}`}>
              {action.icon}
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-sm">{action.label}</p>
              <p className="text-gray-500 text-[11px] mt-0.5 truncate max-w-[120px]">{action.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   TRUST STAT ITEM (extracted to avoid hook-in-loop)
───────────────────────────────────────── */
function TrustStatItem({ stat, index, inView }) {
  const count = useCounter(stat.value, inView, 1600 + index * 150)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
      className="flex flex-col items-center gap-1.5 relative px-6"
    >
      {index < trustStats.length - 1 && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-white/10" />
      )}
      <div className="flex items-end gap-0.5 leading-none">
        <span className="text-4xl font-black text-white tabular-nums">{count.toLocaleString()}</span>
        <span className="text-2xl font-black text-[#E63946] mb-0.5">{stat.suffix}</span>
      </div>
      <span className="text-gray-500 text-xs font-medium uppercase tracking-widest">{stat.label}</span>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   TRUST BANNER
───────────────────────────────────────── */
function TrustBanner({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mt-14 relative bg-[#0F0F0F] border border-white/8 rounded-2xl overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />
      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-10 px-6">
        {trustStats.map((s, i) => (
          <TrustStatItem key={s.label} stat={s} index={i} inView={inView} />
        ))}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────── */
function ContactCTA({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-14 relative rounded-2xl overflow-hidden border border-white/8"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=65')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/97 via-[#0F0F0F]/90 to-[#0F0F0F]/60" />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E63946]" />

      <div className="relative px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <span className="text-[#E63946] text-xs font-semibold uppercase tracking-widest">Take Action</span>
          <h3 className="text-3xl md:text-4xl font-black text-white mt-2 leading-tight">
            Ready To <span className="text-[#E63946]">Transform Your Life?</span>
          </h3>
          <p className="text-gray-400 text-sm mt-3 max-w-md">
            Walk in, train hard, and leave a better version of yourself. CultFitNeo is waiting for you.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <a
            href="#memberships"
            className="group inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#E63946]/40 hover:-translate-y-0.5 active:scale-95"
          >
            Join Today
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#free-trial"
            className="inline-flex items-center justify-center gap-2 bg-white/8 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/40 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            Start Free Trial
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   WHATSAPP FLOATING BUTTON
───────────────────────────────────────── */
export function WhatsAppButton() {
  const waMsg = encodeURIComponent("Hello, I'm interested in joining CultFitNeo Gym. Please share membership details.")
  return (
    <a
      href={`https://wa.me/919876543210?text=${waMsg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Outer pulse rings */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />
      <span className="absolute inset-[-6px] rounded-full bg-green-500 opacity-15 animate-pulse" />

      {/* Button */}
      <div className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 shadow-2xl shadow-green-500/40 flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>

      {/* Tooltip */}
      <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#1A1A1A] border border-white/10 text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap
                      opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-xl">
        Chat on WhatsApp
        <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2 h-2 bg-[#1A1A1A] border-r border-t border-white/10 rotate-45" />
      </div>
    </a>
  )
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })
  const isOpen = useOpenStatus()

  const contactCardsWithStatus = contactCards.map(card =>
    card.label === 'Working Hours'
      ? {
          ...card,
          extra: (
            <span className={`inline-flex items-center gap-1.5 mt-1 text-xs font-semibold ${isOpen ? 'text-green-400' : 'text-red-400'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              {isOpen ? 'Open Now' : 'Closed'}
            </span>
          ),
        }
      : card
  )

  return (
    <section
      id="contact"
      ref={ref}
      className="relative bg-[#0F0F0F] py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[#E63946] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[350px] bg-[#E63946] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-5"
          >
            <span className="w-8 h-[1px] bg-[#E63946]" />
            Contact Us
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5"
          >
            Visit <span className="text-[#E63946]">CultFitNeo Gym</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg"
          >
            We're ready to help you achieve your fitness goals.
          </motion.p>
        </div>

        {/* ── Two-column: contact cards + map ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14">

          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {contactCardsWithStatus.map((card, i) => (
              <ContactCard key={card.label} card={card} index={i} />
            ))}

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-3 pt-2"
            >
              <span className="text-gray-600 text-xs uppercase tracking-widest font-semibold">Follow Us:</span>
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/cultfitneo', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
                { label: 'YouTube',   href: 'https://www.youtube.com/@cultfitneo', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
                { label: 'Facebook',  href: 'https://www.facebook.com/cultfitneo', icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#E63946] hover:border-[#E63946] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: map */}
          <MapSection inView={inView} />
        </div>

        {/* ── Quick Actions ── */}
        <QuickActions inView={inView} />

        {/* ── Trust Banner ── */}
        <TrustBanner inView={inView} />

        {/* ── CTA ── */}
        <div ref={ctaRef}>
          <ContactCTA inView={ctaInView} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
