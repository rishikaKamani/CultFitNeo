import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    value: 5000,
    suffix: '+',
    label: 'Active Members',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    value: 25,
    suffix: '+',
    label: 'Certified Trainers',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    value: 15,
    suffix: '+',
    label: 'Years Experience',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
]

// Animated counter hook
function useCounter(target, duration = 2000, started = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])

  return count
}

function StatCard({ stat, index, started }) {
  const count = useCounter(stat.value, 2000 + index * 200, started)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      {/* Glow backdrop */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#E63946]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      {/* Card */}
      <div className="relative bg-[#1A1A1A] border border-white/8 rounded-2xl p-8 flex flex-col items-center text-center gap-4 overflow-hidden transition-all duration-300 group-hover:border-[#E63946]/30 group-hover:shadow-xl group-hover:shadow-[#E63946]/10 group-hover:-translate-y-1">

        {/* Top red line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-[#E63946] rounded-full" />

        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center text-[#E63946]">
          {stat.icon}
        </div>

        {/* Counter */}
        <div className="flex items-end gap-0.5">
          <span className="text-5xl font-black text-white tabular-nums leading-none">
            {count.toLocaleString()}
          </span>
          <span className="text-3xl font-black text-[#E63946] leading-none mb-0.5">
            {stat.suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-gray-400 text-sm font-medium tracking-wide uppercase">
          {stat.label}
        </p>

        {/* Subtle corner decoration */}
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#E63946]/3 rounded-tl-full pointer-events-none" />
      </div>
    </motion.div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative bg-[#0F0F0F] py-24 px-6 overflow-hidden">

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Red glow center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E63946] opacity-[0.04] blur-[100px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-4">
            <span className="w-8 h-[1px] bg-[#E63946]" />
            Our Numbers
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Results That <span className="text-[#E63946]">Speak for Themselves</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} started={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
