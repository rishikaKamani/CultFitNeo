import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const programs = [
  {
    title: 'Weight Loss Program',
    desc: 'Science-backed fat-loss protocols combining cardio, resistance training, and nutrition coaching for sustainable results.',
    difficulty: 'Beginner – Intermediate',
    diffColor: 'text-green-400 bg-green-400/10 border-green-400/20',
    duration: '8 Weeks',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=700&q=80',
    tag: 'Most Popular',
    tagColor: 'bg-[#E63946]/15 border-[#E63946]/30 text-[#E63946]',
  },
  {
    title: 'Strength & Muscle Building',
    desc: 'Progressive overload programs designed by NSCA-certified coaches to maximise strength gains and hypertrophy.',
    difficulty: 'Intermediate – Advanced',
    diffColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    duration: '12 Weeks',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=700&q=80',
    tag: 'Best Results',
    tagColor: 'bg-yellow-500/15 border-yellow-500/30 text-yellow-400',
  },
  {
    title: 'CrossFit Training',
    desc: 'High-intensity functional movements across gymnastics, weightlifting, and metabolic conditioning — scaled to your level.',
    difficulty: 'All Levels',
    diffColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    duration: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&w=700&q=80',
    tag: 'Community',
    tagColor: 'bg-blue-500/15 border-blue-500/30 text-blue-400',
  },
  {
    title: 'Functional Fitness',
    desc: 'Train movements, not muscles. Improve posture, mobility, core stability, and athletic performance for real-life demands.',
    difficulty: 'Beginner – Intermediate',
    diffColor: 'text-green-400 bg-green-400/10 border-green-400/20',
    duration: '6 Weeks',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=700&q=80',
    tag: 'Recommended',
    tagColor: 'bg-purple-500/15 border-purple-500/30 text-purple-400',
  },
  {
    title: 'Yoga & Mobility',
    desc: 'Restore balance, reduce injury risk, and deepen your mind-body connection with our RYT-500 certified instructors.',
    difficulty: 'All Levels',
    diffColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    duration: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?auto=format&fit=crop&w=700&q=80',
    tag: 'Recovery',
    tagColor: 'bg-teal-500/15 border-teal-500/30 text-teal-400',
  },
  {
    title: 'Personal Training',
    desc: 'One-on-one sessions tailored entirely to you. Your goals, your pace, your program — with dedicated coach accountability.',
    difficulty: 'All Levels',
    diffColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    duration: 'Custom',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=700&q=80',
    tag: 'Premium',
    tagColor: 'bg-[#E63946]/15 border-[#E63946]/30 text-[#E63946]',
  },
]

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const schedule = {
  Monday:    [
    { time: '6:00 AM',  name: 'HIIT',               trainer: 'Vikram Nair',    spots: 8,  color: 'bg-[#E63946]/10 border-[#E63946]/25 text-[#E63946]' },
    { time: '7:00 AM',  name: 'Yoga',               trainer: 'Ananya Rao',    spots: 12, color: 'bg-purple-500/10 border-purple-500/25 text-purple-400' },
    { time: '9:00 AM',  name: 'Functional Training', trainer: 'Deepa Krishnan', spots: 6,  color: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' },
    { time: '5:00 PM',  name: 'CrossFit',           trainer: 'Vikram Nair',    spots: 10, color: 'bg-blue-500/10 border-blue-500/25 text-blue-400' },
    { time: '6:00 PM',  name: 'Strength Training',  trainer: 'Rahul Verma',   spots: 8,  color: 'bg-orange-500/10 border-orange-500/25 text-orange-400' },
    { time: '7:00 PM',  name: 'Zumba',              trainer: 'Meera Pillai',  spots: 15, color: 'bg-pink-500/10 border-pink-500/25 text-pink-400' },
  ],
  Tuesday:   [
    { time: '6:00 AM',  name: 'Strength Training',  trainer: 'Rahul Verma',   spots: 8,  color: 'bg-orange-500/10 border-orange-500/25 text-orange-400' },
    { time: '7:00 AM',  name: 'Yoga',               trainer: 'Ananya Rao',    spots: 12, color: 'bg-purple-500/10 border-purple-500/25 text-purple-400' },
    { time: '9:00 AM',  name: 'HIIT',               trainer: 'Vikram Nair',    spots: 8,  color: 'bg-[#E63946]/10 border-[#E63946]/25 text-[#E63946]' },
    { time: '5:00 PM',  name: 'Functional Training', trainer: 'Deepa Krishnan', spots: 6, color: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' },
    { time: '6:00 PM',  name: 'CrossFit',           trainer: 'Vikram Nair',    spots: 10, color: 'bg-blue-500/10 border-blue-500/25 text-blue-400' },
    { time: '7:00 PM',  name: 'Zumba',              trainer: 'Meera Pillai',  spots: 15, color: 'bg-pink-500/10 border-pink-500/25 text-pink-400' },
  ],
  Wednesday: [
    { time: '6:00 AM',  name: 'HIIT',               trainer: 'Vikram Nair',    spots: 8,  color: 'bg-[#E63946]/10 border-[#E63946]/25 text-[#E63946]' },
    { time: '7:00 AM',  name: 'Yoga',               trainer: 'Ananya Rao',    spots: 12, color: 'bg-purple-500/10 border-purple-500/25 text-purple-400' },
    { time: '9:00 AM',  name: 'Strength Training',  trainer: 'Rahul Verma',   spots: 8,  color: 'bg-orange-500/10 border-orange-500/25 text-orange-400' },
    { time: '5:00 PM',  name: 'CrossFit',           trainer: 'Vikram Nair',    spots: 10, color: 'bg-blue-500/10 border-blue-500/25 text-blue-400' },
    { time: '6:00 PM',  name: 'Functional Training', trainer: 'Deepa Krishnan', spots: 6, color: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' },
    { time: '7:00 PM',  name: 'Zumba',              trainer: 'Meera Pillai',  spots: 15, color: 'bg-pink-500/10 border-pink-500/25 text-pink-400' },
  ],
  Thursday:  [
    { time: '6:00 AM',  name: 'CrossFit',           trainer: 'Vikram Nair',    spots: 10, color: 'bg-blue-500/10 border-blue-500/25 text-blue-400' },
    { time: '7:00 AM',  name: 'Yoga',               trainer: 'Ananya Rao',    spots: 12, color: 'bg-purple-500/10 border-purple-500/25 text-purple-400' },
    { time: '9:00 AM',  name: 'Functional Training', trainer: 'Deepa Krishnan', spots: 6, color: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' },
    { time: '5:00 PM',  name: 'HIIT',               trainer: 'Vikram Nair',    spots: 8,  color: 'bg-[#E63946]/10 border-[#E63946]/25 text-[#E63946]' },
    { time: '6:00 PM',  name: 'Strength Training',  trainer: 'Rahul Verma',   spots: 8,  color: 'bg-orange-500/10 border-orange-500/25 text-orange-400' },
    { time: '7:00 PM',  name: 'Zumba',              trainer: 'Meera Pillai',  spots: 15, color: 'bg-pink-500/10 border-pink-500/25 text-pink-400' },
  ],
  Friday:    [
    { time: '6:00 AM',  name: 'HIIT',               trainer: 'Vikram Nair',    spots: 8,  color: 'bg-[#E63946]/10 border-[#E63946]/25 text-[#E63946]' },
    { time: '7:00 AM',  name: 'Yoga',               trainer: 'Ananya Rao',    spots: 12, color: 'bg-purple-500/10 border-purple-500/25 text-purple-400' },
    { time: '9:00 AM',  name: 'CrossFit',           trainer: 'Vikram Nair',    spots: 10, color: 'bg-blue-500/10 border-blue-500/25 text-blue-400' },
    { time: '5:00 PM',  name: 'Strength Training',  trainer: 'Rahul Verma',   spots: 8,  color: 'bg-orange-500/10 border-orange-500/25 text-orange-400' },
    { time: '6:00 PM',  name: 'Functional Training', trainer: 'Deepa Krishnan', spots: 6, color: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' },
    { time: '7:00 PM',  name: 'Zumba',              trainer: 'Meera Pillai',  spots: 15, color: 'bg-pink-500/10 border-pink-500/25 text-pink-400' },
  ],
  Saturday:  [
    { time: '7:00 AM',  name: 'CrossFit',           trainer: 'Vikram Nair',    spots: 12, color: 'bg-blue-500/10 border-blue-500/25 text-blue-400' },
    { time: '8:00 AM',  name: 'HIIT',               trainer: 'Deepa Krishnan', spots: 10, color: 'bg-[#E63946]/10 border-[#E63946]/25 text-[#E63946]' },
    { time: '9:00 AM',  name: 'Yoga',               trainer: 'Ananya Rao',    spots: 15, color: 'bg-purple-500/10 border-purple-500/25 text-purple-400' },
    { time: '10:00 AM', name: 'Strength Training',  trainer: 'Rahul Verma',   spots: 8,  color: 'bg-orange-500/10 border-orange-500/25 text-orange-400' },
    { time: '5:00 PM',  name: 'Zumba',              trainer: 'Meera Pillai',  spots: 20, color: 'bg-pink-500/10 border-pink-500/25 text-pink-400' },
    { time: '6:00 PM',  name: 'Functional Training', trainer: 'Deepa Krishnan', spots: 6, color: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' },
  ],
  Sunday:    [
    { time: '8:00 AM',  name: 'Yoga',               trainer: 'Ananya Rao',    spots: 15, color: 'bg-purple-500/10 border-purple-500/25 text-purple-400' },
    { time: '9:00 AM',  name: 'HIIT',               trainer: 'Vikram Nair',    spots: 10, color: 'bg-[#E63946]/10 border-[#E63946]/25 text-[#E63946]' },
    { time: '10:00 AM', name: 'CrossFit',           trainer: 'Vikram Nair',    spots: 12, color: 'bg-blue-500/10 border-blue-500/25 text-blue-400' },
    { time: '5:00 PM',  name: 'Strength Training',  trainer: 'Rahul Verma',   spots: 8,  color: 'bg-orange-500/10 border-orange-500/25 text-orange-400' },
    { time: '6:00 PM',  name: 'Zumba',              trainer: 'Meera Pillai',  spots: 20, color: 'bg-pink-500/10 border-pink-500/25 text-pink-400' },
    { time: '7:00 PM',  name: 'Functional Training', trainer: 'Deepa Krishnan', spots: 6, color: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400' },
  ],
}

const challengeStats = [
  { value: 1200, suffix: '+', label: 'Participants' },
  { value: 95,   suffix: '%', label: 'Completion Rate' },
  { value: 12,   suffix: ' kg', label: 'Avg. Weight Loss' },
]

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
   CHALLENGE STAT ITEM (extracted to avoid hook-in-loop)
───────────────────────────────────────── */
function ChallengeStatItem({ stat, index, inView }) {
  const count = useCounter(stat.value, inView, 1600 + index * 150)
  return (
    <div className="bg-white/4 border border-white/8 rounded-xl p-4 text-center">
      <p className="text-2xl font-black text-[#E63946]">
        {count.toLocaleString()}{stat.suffix}
      </p>
      <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">{stat.label}</p>
    </div>
  )
}

/* ─────────────────────────────────────────
   PROGRAM CARD
───────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 55 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function ProgramCard({ program, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="group relative bg-[#1A1A1A] border border-white/8 rounded-2xl overflow-hidden flex flex-col
                 hover:border-[#E63946]/35 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#E63946]/12
                 transition-all duration-500 ease-out"
    >
      {/* Glassmorphism shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#E63946]/5 via-transparent to-transparent pointer-events-none z-10" />

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/20 to-transparent" />

        {/* Tag */}
        <span className={`absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border backdrop-blur-sm ${program.tagColor}`}>
          {program.tag}
        </span>

        {/* Duration badge */}
        <span className="absolute top-3 right-3 bg-black/65 backdrop-blur-sm border border-white/12 text-gray-300 text-[10px] font-semibold px-2.5 py-1 rounded-full">
          {program.duration}
        </span>

        {/* Red bottom glow on hover */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#E63946]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-white font-bold text-lg leading-tight">{program.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 group-hover:text-gray-400 transition-colors duration-300">{program.desc}</p>

        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${program.diffColor}`}>
            {program.difficulty}
          </span>
        </div>

        {/* Learn More */}
        <a
          href="#contact"
          className="group/btn mt-1 inline-flex items-center gap-2 text-[#E63946] text-sm font-semibold
                     hover:gap-3 transition-all duration-200"
        >
          Learn More
          <svg className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#E63946] to-[#E63946]/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   CLASS SCHEDULE
───────────────────────────────────────── */
function ClassSchedule() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [activeDay, setActiveDay] = useState('Monday')
  // Get today's day name
  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    if (days.includes(today)) setActiveDay(today)
  }, [])

  const classes = schedule[activeDay] || []

  return (
    <div ref={ref} className="mt-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-5">
          <span className="w-8 h-[1px] bg-[#E63946]" />
          Weekly Schedule
          <span className="w-8 h-[1px] bg-[#E63946]" />
        </span>
        <h3 className="text-3xl md:text-4xl font-black text-white">
          Class <span className="text-[#E63946]">Schedule</span>
        </h3>
      </motion.div>

      {/* Day tabs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-hide"
        style={{ scrollbarWidth: 'none' }}
      >
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`relative flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-250 z-10
              ${activeDay === day
                ? 'border-transparent text-white'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/25'
              }`}
          >
            {day.slice(0, 3)}
            {activeDay === day && (
              <motion.div layoutId="day-pill" className="absolute inset-0 bg-[#E63946] rounded-xl -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
            )}
          </button>
        ))}
      </motion.div>

      {/* Schedule list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {classes.map((cls, i) => (
            <motion.div
              key={`${cls.time}-${cls.name}`}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className={`group relative border rounded-xl p-5 flex items-center gap-4
                          hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-default ${cls.color}`}
            >
              {/* Time */}
              <div className="flex-shrink-0 text-center min-w-[56px]">
                <p className="text-white font-black text-sm leading-none">{cls.time.split(' ')[0]}</p>
                <p className="text-xs font-semibold opacity-70 mt-0.5">{cls.time.split(' ')[1]}</p>
              </div>

              {/* Divider */}
              <div className="w-px h-10 bg-current opacity-20 flex-shrink-0" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm truncate">{cls.name}</p>
                <p className="text-xs opacity-70 truncate mt-0.5">{cls.trainer}</p>
              </div>

              {/* Spots */}
              <div className="flex-shrink-0 text-right">
                <p className="text-white font-black text-sm">{cls.spots}</p>
                <p className="text-xs opacity-60">spots</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Book note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-gray-600 text-xs mt-6"
      >
        * Spot counts shown are for illustration. Contact us to book your class.
      </motion.p>
    </div>
  )
}

/* ─────────────────────────────────────────
   FEATURED 90-DAY CHALLENGE
───────────────────────────────────────── */
function ChallengeSpotlight() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div ref={ref} className="mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <span className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-5">
          <span className="w-8 h-[1px] bg-[#E63946]" />
          Featured Program
          <span className="w-8 h-[1px] bg-[#E63946]" />
        </span>
        <h3 className="text-3xl md:text-4xl font-black text-white">
          The <span className="text-[#E63946]">90-Day</span> Transformation Challenge
        </h3>
      </motion.div>

      <div className="relative bg-[#0F0F0F] border border-white/8 rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative min-h-[360px] lg:min-h-[500px] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80"
              alt="90-Day Challenge"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0F0F0F] hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-black/20 to-transparent lg:hidden" />

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-6 left-6 bg-[#E63946] text-white px-4 py-2 rounded-xl font-black text-sm shadow-xl shadow-[#E63946]/30"
            >
              90 Days
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center gap-6 p-8 lg:p-12"
          >
            <div>
              <p className="text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-2">Flagship Program</p>
              <h4 className="text-2xl md:text-3xl font-black text-white leading-tight">
                Complete Body Transformation in 90 Days
              </h4>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Our most intensive and results-driven program. Combines strength training, HIIT, nutrition coaching, and weekly check-ins with a dedicated coach. No shortcuts — just a structured, science-backed system that delivers measurable change.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Personalised training split',
                'Custom nutrition blueprint',
                'Weekly body composition scans',
                'Daily coach accountability',
                'Recovery & sleep protocol',
                'Post-program maintenance plan',
              ].map((b) => (
                <div key={b} className="flex items-center gap-2.5 text-gray-300 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E63946] flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>

            {/* Animated stats — proper sub-components to avoid hooks-in-loop */}
            <div className="grid grid-cols-3 gap-4">
              {challengeStats.map((s, i) => (
                <ChallengeStatItem key={s.label} stat={s} index={i} inView={inView} />
              ))}
            </div>

            <a
              href="#free-trial"
              onClick={() => {
                sessionStorage.setItem('selectedPlan', 'Transformation')
                window.dispatchEvent(new Event('selectedPlanChanged'))
              }}
              className="self-start inline-flex items-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-[#E63946]/30 hover:-translate-y-0.5 active:scale-95"
            >
              Apply For The Challenge
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
function ProgramsCTA() {
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
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1600&q=65')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/97 via-[#0F0F0F]/90 to-[#0F0F0F]/60" />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E63946]" />

      <div className="relative px-8 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <span className="text-[#E63946] text-xs font-semibold uppercase tracking-widest">Get Started</span>
          <h3 className="text-3xl md:text-4xl font-black text-white mt-2 leading-tight">
            Start Your Fitness Journey <span className="text-[#E63946]">Today</span>
          </h3>
          <p className="text-gray-400 text-sm mt-3 max-w-md">
            Choose a program, pick a class, or speak directly with one of our elite coaches — your transformation is one step away.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <a
            href="#free-trial"
            className="group inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-[#E63946]/40 hover:-translate-y-0.5 active:scale-95"
          >
            Book A Free Trial
            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-white/8 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/40 text-white font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            <svg className="w-4 h-4 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Talk To A Coach
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Programs() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="programs"
      className="relative bg-[#0F0F0F] py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-1/3 w-[600px] h-[350px] bg-[#E63946] opacity-[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[300px] bg-[#E63946] opacity-[0.04] rounded-full blur-[100px] pointer-events-none" />
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
            Programs & Classes
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5"
          >
            Find The Perfect{' '}
            <span className="text-[#E63946]">Training Program</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            From beginners to advanced athletes, we have a program designed for you.
          </motion.p>
        </div>

        {/* ── Program Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, i) => (
            <ProgramCard key={program.title} program={program} index={i} />
          ))}
        </div>

        {/* ── Class Schedule ── */}
        <ClassSchedule />

        {/* ── 90-Day Challenge ── */}
        <ChallengeSpotlight />

        {/* ── CTA ── */}
        <ProgramsCTA />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
