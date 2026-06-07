import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────
   COUNTDOWN TIMER
───────────────────────────────────────── */
function useCountdown() {
  const getTarget = () => {
    const t = new Date()
    t.setDate(t.getDate() + 4)
    t.setHours(23, 59, 59, 0)
    return t
  }
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = getTarget()
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="w-14 h-14 bg-[#E63946]/10 border border-[#E63946]/30 rounded-xl flex items-center justify-center"
        >
          <span className="text-2xl font-black text-white tabular-nums leading-none">
            {String(value).padStart(2, '0')}
          </span>
        </motion.div>
      </AnimatePresence>
      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
  )
}

/* ─────────────────────────────────────────
   FLOATING LABEL INPUT
───────────────────────────────────────── */
function FloatingInput({ id, label, type = 'text', value, onChange, error, required, ...rest }) {
  const [focused, setFocused] = useState(false)
  const filled = value && value.length > 0
  const active = focused || filled

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={`peer w-full bg-white/5 border rounded-xl px-4 pt-6 pb-2.5 text-sm text-white placeholder-transparent
          outline-none transition-all duration-200
          ${error
            ? 'border-red-500/60 focus:border-red-500'
            : focused
              ? 'border-[#E63946]/60 shadow-[0_0_0_3px_rgba(230,57,70,0.08)]'
              : 'border-white/12 hover:border-white/25'
          }`}
        placeholder={label}
        {...rest}
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium
          ${active ? 'top-2 text-[10px] text-[#E63946]' : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'}`}
      >
        {label}{required && ' *'}
      </label>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-red-400 text-xs flex items-center gap-1"
        >
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  )
}

function FloatingSelect({ id, label, value, onChange, error, options, required }) {
  const [focused, setFocused] = useState(false)
  const filled = value && value.length > 0
  const active = focused || filled

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        className={`peer w-full bg-white/5 border rounded-xl px-4 pt-6 pb-2.5 text-sm text-white
          outline-none transition-all duration-200 appearance-none cursor-pointer
          ${error
            ? 'border-red-500/60 focus:border-red-500'
            : focused
              ? 'border-[#E63946]/60 shadow-[0_0_0_3px_rgba(230,57,70,0.08)]'
              : 'border-white/12 hover:border-white/25'
          }`}
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <option value="" disabled style={{ background: '#1A1A1A' }}></option>
        {options.map(o => (
          <option key={o} value={o} style={{ background: '#1A1A1A', color: '#fff' }}>{o}</option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium
          ${active ? 'top-2 text-[10px] text-[#E63946]' : 'top-1/2 -translate-y-1/2 text-sm text-gray-500'}`}
      >
        {label}{required && ' *'}
      </label>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 text-red-400 text-xs flex items-center gap-1">
          <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   SUCCESS POPUP
───────────────────────────────────────── */
function SuccessPopup({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[#1A1A1A] border border-white/10 rounded-2xl p-10 max-w-md w-full text-center overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          {/* Top red line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />

          {/* Confetti-like glow */}
          <div className="absolute inset-0 bg-[#E63946] opacity-[0.04] rounded-2xl pointer-events-none" />

          {/* Check icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
            className="w-20 h-20 rounded-full bg-[#E63946]/10 border-2 border-[#E63946]/40 flex items-center justify-center mx-auto mb-6"
          >
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
              className="w-10 h-10 text-[#E63946]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <motion.path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </motion.svg>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-black text-white mb-2"
          >
            Congratulations! 🎉
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white font-semibold text-base mb-2"
          >
            Your free trial has been reserved.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-gray-400 text-sm mb-8"
          >
            Our team will contact you shortly to confirm your visit. Welcome to the CultFitNeo family!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#memberships"
              onClick={onClose}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm py-3.5 px-5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              Explore Plans
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <button
              onClick={() => {
                onClose()
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 hover:bg-white/15 text-white font-bold text-sm py-3.5 px-5 rounded-xl transition-all duration-200"
            >
              Return Home
            </button>
          </motion.div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/8 hover:bg-white/15 border border-white/12 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────
   BOOKING FORM
───────────────────────────────────────── */
const goalOptions = [
  'Weight Loss', 'Muscle Gain', 'General Fitness',
  'Strength Training', 'CrossFit', 'Yoga', 'Personal Training',
]
const timeOptions = [
  '6:00 AM – 8:00 AM', '8:00 AM – 10:00 AM', '10:00 AM – 12:00 PM',
  '12:00 PM – 3:00 PM', '3:00 PM – 5:00 PM', '5:00 PM – 7:00 PM', '7:00 PM – 9:00 PM',
]

const empty = { name: '', phone: '', email: '', age: '', goal: '', time: '', message: '' }

function validate(fields) {
  const errs = {}
  if (!fields.name.trim())  errs.name  = 'Full name is required'
  if (!fields.phone.trim()) errs.phone = 'Mobile number is required'
  else if (!/^[6-9]\d{9}$/.test(fields.phone.trim())) errs.phone = 'Enter a valid 10-digit Indian mobile number'
  if (!fields.email.trim()) errs.email = 'Email address is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email address'
  if (!fields.age.trim())   errs.age   = 'Age is required'
  else if (isNaN(fields.age) || +fields.age < 14 || +fields.age > 80) errs.age = 'Enter a valid age (14–80)'
  if (!fields.goal)         errs.goal  = 'Please select a fitness goal'
  if (!fields.time)         errs.time  = 'Please select a preferred time'
  return errs
}

function BookingForm() {
  const [fields, setFields] = useState(empty)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Pre-fill goal from membership card click
  useEffect(() => {
    const plan = sessionStorage.getItem('selectedPlan')
    if (plan) {
      const goalMap = {
        'Basic': 'General Fitness',
        'Pro': 'General Fitness',
        'Elite': 'Weight Loss',
        'Transformation': 'Weight Loss',
      }
      const goal = goalMap[plan] || ''
      setFields(prev => ({ ...prev, goal }))
      sessionStorage.removeItem('selectedPlan')
    }
  }, [])

  const set = (key) => (e) => {
    setFields(prev => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1600))
    setLoading(false)
    setSuccess(true)
    setFields(empty)
    setErrors({})
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">

        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput id="name"  label="Full Name"     value={fields.name}  onChange={set('name')}  error={errors.name}  required />
          <FloatingInput id="phone" label="Mobile Number" type="tel" value={fields.phone} onChange={set('phone')} error={errors.phone} required />
        </div>

        {/* Row 2: Email + Age */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingInput id="email" label="Email Address" type="email" value={fields.email} onChange={set('email')} error={errors.email} required />
          <FloatingInput id="age"   label="Your Age"      type="number" value={fields.age}   onChange={set('age')}   error={errors.age}   required min="14" max="80" />
        </div>

        {/* Row 3: Goal + Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FloatingSelect id="goal" label="Fitness Goal"         value={fields.goal} onChange={set('goal')} error={errors.goal} options={goalOptions} required />
          <FloatingSelect id="time" label="Preferred Visit Time" value={fields.time} onChange={set('time')} error={errors.time} options={timeOptions} required />
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            id="message"
            value={fields.message}
            onChange={set('message')}
            onFocus={e => e.target.parentElement.querySelector('label').classList.add('top-2','text-[10px]','text-[#E63946]')}
            onBlur={e => {
              if (!fields.message) e.target.parentElement.querySelector('label').classList.remove('top-2','text-[10px]','text-[#E63946]')
            }}
            rows={3}
            placeholder="Message"
            className="peer w-full bg-white/5 border border-white/12 hover:border-white/25 focus:border-[#E63946]/60 focus:shadow-[0_0_0_3px_rgba(230,57,70,0.08)] rounded-xl px-4 pt-6 pb-2.5 text-sm text-white placeholder-transparent outline-none transition-all duration-200 resize-none"
          />
          <label
            htmlFor="message"
            className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium
              ${fields.message ? 'top-2 text-[10px] text-[#E63946]' : 'top-4 text-sm text-gray-500'}`}
          >
            Message (Optional)
          </label>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loading}
          whileTap={loading ? {} : { scale: 0.98 }}
          className={`relative w-full flex items-center justify-center gap-3 font-bold text-sm py-4 px-8 rounded-xl
            transition-all duration-200 overflow-hidden
            ${loading
              ? 'bg-[#E63946]/60 cursor-not-allowed'
              : 'bg-[#E63946] hover:bg-[#c62d39] hover:shadow-xl hover:shadow-[#E63946]/35 hover:-translate-y-0.5 active:scale-95'
            } text-white`}
        >
          {loading ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Reserving Your Spot…
            </>
          ) : (
            <>
              Claim My Free Trial
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </>
          )}
        </motion.button>

        <p className="text-center text-gray-600 text-xs">
          🔒 Your data is safe. We never share your information.
        </p>
      </form>

      {success && <SuccessPopup onClose={() => setSuccess(false)} />}
    </>
  )
}

/* ─────────────────────────────────────────
   LEFT PROMO CONTENT
───────────────────────────────────────── */
const benefits = [
  '7-Day Free Access to All Areas',
  'Professional Fitness Assessment',
  'One-on-One Trainer Consultation',
  'Personalised Workout Plan',
  'Full Access to All Facilities',
]

const trustBadges = [
  { value: '5000+', label: 'Happy Members' },
  { value: '4.9★',  label: 'Average Rating' },
  { value: '#1',    label: "Hyderabad's Top Gym" },
]

function PromoContent({ inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-8"
    >
      {/* Heading */}
      <div>
        <p className="text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-3">Limited Time Offer</p>
        <h3 className="text-3xl md:text-4xl font-black text-white leading-[1.1]">
          Your Fitness Journey{' '}
          <span className="text-[#E63946]">Starts Here</span>
        </h3>
        <p className="text-gray-400 text-sm mt-3 leading-relaxed">
          Experience everything CultFitNeo has to offer — completely free for 7 days. No card needed, no commitment required.
        </p>
      </div>

      {/* Benefits */}
      <ul className="flex flex-col gap-3">
        {benefits.map((b, i) => (
          <motion.li
            key={b}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
            className="flex items-center gap-3 text-gray-300 text-sm"
          >
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E63946]/10 border border-[#E63946]/30 flex items-center justify-center">
              <svg className="w-3 h-3 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </span>
            {b}
          </motion.li>
        ))}
      </ul>

      {/* Trust badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="grid grid-cols-3 gap-3"
      >
        {trustBadges.map(b => (
          <div key={b.label} className="bg-white/4 border border-white/8 rounded-xl p-4 text-center">
            <p className="text-xl font-black text-[#E63946] leading-none">{b.value}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-wide mt-1.5 leading-tight">{b.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Testimonial snippet */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="relative bg-white/4 border border-white/8 rounded-xl p-5"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#E63946] to-transparent rounded-t-xl" />
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-3.5 h-3.5 text-[#E63946]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <p className="text-gray-300 text-sm italic leading-relaxed">
          "I started with the free trial not expecting much. Six months later I've lost 18 kg and found a second family."
        </p>
        <p className="text-[#E63946] text-xs font-semibold mt-2">— Arjun Sharma, Elite Member</p>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   URGENCY BANNER
───────────────────────────────────────── */
function UrgencyBanner({ inView }) {
  const { days, hours, minutes, seconds } = useCountdown()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 }}
      className="mb-6 relative bg-[#E63946]/8 border border-[#E63946]/30 rounded-2xl p-6 overflow-hidden"
    >
      {/* Pulse glow */}
      <div className="absolute -inset-px rounded-2xl border border-[#E63946]/20 animate-pulse pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 bg-[#E63946] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Limited Offer
          </div>
          <p className="text-white font-bold text-base">Only 50 Free Trial Slots Available This Month</p>
          <p className="text-gray-400 text-xs mt-1">Offer expires in:</p>
        </div>

        <div className="flex items-center gap-2">
          <TimeUnit value={days}    label="Days" />
          <span className="text-[#E63946] font-black text-xl pb-5">:</span>
          <TimeUnit value={hours}   label="Hours" />
          <span className="text-[#E63946] font-black text-xl pb-5">:</span>
          <TimeUnit value={minutes} label="Mins" />
          <span className="text-[#E63946] font-black text-xl pb-5">:</span>
          <TimeUnit value={seconds} label="Secs" />
        </div>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function FreeTrial() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="free-trial"
      ref={ref}
      className="relative bg-[#1A1A1A] py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E63946] opacity-[0.06] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E63946] opacity-[0.04] rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest mb-5"
          >
            <span className="w-8 h-[1px] bg-[#E63946]" />
            Free Trial
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5"
          >
            Claim Your <span className="text-[#E63946]">Free 7-Day Trial</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg"
          >
            Experience CultFitNeo Gym before committing to a membership.
          </motion.p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-start">

          {/* Left: promo */}
          <PromoContent inView={inView} />

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Urgency banner */}
            <UrgencyBanner inView={inView} />

            {/* Form card */}
            <div className="relative bg-[#0F0F0F]/80 backdrop-blur-md border border-white/10 rounded-2xl p-7 overflow-hidden">
              {/* Red top accent */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/60 to-transparent" />

              <div className="mb-6">
                <h4 className="text-white font-black text-xl">Reserve Your Spot</h4>
                <p className="text-gray-500 text-sm mt-1">Fill in your details below — it takes under 60 seconds.</p>
              </div>

              <BookingForm />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
