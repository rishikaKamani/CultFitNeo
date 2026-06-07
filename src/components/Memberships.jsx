import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const billingOptions = [
  { key: 'monthly',   label: 'Monthly',   discount: 0 },
  { key: 'quarterly', label: 'Quarterly', discount: 10 },
  { key: 'annual',    label: 'Annual',    discount: 20 },
]

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    monthlyPrice: 1999,
    color: 'from-white/5 to-white/2',
    borderColor: 'border-white/10',
    accentColor: 'text-gray-300',
    buttonStyle: 'bg-white/10 hover:bg-white/20 border border-white/20 text-white',
    popular: false,
    features: [
      { text: 'Gym Access',           included: true },
      { text: 'Cardio Zone',          included: true },
      { text: 'Locker Access',        included: true },
      { text: 'Fitness Assessment',   included: true },
      { text: 'Group Classes',        included: false },
      { text: 'Nutrition Guidance',   included: false },
      { text: 'Personal Trainer',     included: false },
      { text: 'Custom Workout Plan',  included: false },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 3499,
    color: 'from-white/8 to-white/3',
    borderColor: 'border-white/15',
    accentColor: 'text-blue-400',
    buttonStyle: 'bg-white/10 hover:bg-white/20 border border-white/20 text-white',
    popular: false,
    features: [
      { text: 'Gym Access',              included: true },
      { text: 'Cardio Zone',             included: true },
      { text: 'Locker Access',           included: true },
      { text: 'Fitness Assessment',      included: true },
      { text: 'Group Classes',           included: true },
      { text: 'Nutrition Guidance',      included: true },
      { text: 'Monthly Progress Review', included: true },
      { text: 'Personal Trainer',        included: false },
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 5999,
    color: 'from-[#E63946]/12 to-[#E63946]/4',
    borderColor: 'border-[#E63946]/50',
    accentColor: 'text-[#E63946]',
    buttonStyle: 'bg-[#E63946] hover:bg-[#c62d39] text-white shadow-lg shadow-[#E63946]/30',
    popular: true,
    features: [
      { text: 'Everything in Pro',        included: true },
      { text: 'Personal Trainer Sessions',included: true },
      { text: 'Customized Workout Plan',  included: true },
      { text: 'Priority Support',         included: true },
      { text: 'Nutrition Guidance',       included: true },
      { text: 'Monthly Progress Review',  included: true },
      { text: 'Body Composition Analysis',included: true },
      { text: 'Guest Passes (2/month)',    included: true },
    ],
  },
  {
    id: 'transformation',
    name: 'Transformation',
    monthlyPrice: 12999,
    color: 'from-yellow-500/8 to-yellow-500/2',
    borderColor: 'border-yellow-500/20',
    accentColor: 'text-yellow-400',
    buttonStyle: 'bg-white/10 hover:bg-white/20 border border-white/20 text-white',
    popular: false,
    features: [
      { text: 'Dedicated Coach',           included: true },
      { text: 'Custom Nutrition Plan',     included: true },
      { text: 'Weekly Progress Reviews',   included: true },
      { text: 'Body Transformation Program',included: true },
      { text: 'Unlimited Personal Training',included: true },
      { text: 'Supplement Guidance',       included: true },
      { text: 'Priority Booking',          included: true },
      { text: 'Lifestyle & Recovery Plan', included: true },
    ],
  },
]

const guarantees = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-1.821-.41-3.545-1.14-5.09" />
      </svg>
    ),
    title: '7-Day Free Trial',
    desc: 'Try CultFitNeo for a full week — completely free. No commitment, no card required.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'Cancel Anytime',
    desc: 'No lock-ins. Pause or cancel your membership at any time — zero penalty.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: 'No Hidden Charges',
    desc: 'The price you see is the price you pay. Transparent billing, always.',
  },
]

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function getPrice(monthlyPrice, billingKey) {
  const multipliers = { monthly: 1, quarterly: 0.9, annual: 0.8 }
  return Math.round(monthlyPrice * multipliers[billingKey])
}

function formatPrice(price) {
  return price.toLocaleString('en-IN')
}

const CheckIcon = ({ included }) =>
  included ? (
    <svg className="w-4 h-4 text-[#E63946] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-white/15 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )

/* ─────────────────────────────────────────
   PRICE DISPLAY (animated number)
───────────────────────────────────────── */
function AnimatedPrice({ price }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={price}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="text-4xl font-black text-white tabular-nums"
      >
        ₹{formatPrice(price)}
      </motion.span>
    </AnimatePresence>
  )
}

/* ─────────────────────────────────────────
   PLAN CARD
───────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function PlanCard({ plan, index, billing }) {
  const price = getPrice(plan.monthlyPrice, billing)
  const discount = billingOptions.find(b => b.key === billing)?.discount || 0

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className={`relative flex flex-col rounded-2xl border bg-gradient-to-b backdrop-blur-sm overflow-hidden
        ${plan.color} ${plan.borderColor}
        ${plan.popular
          ? 'ring-1 ring-[#E63946]/40 shadow-2xl shadow-[#E63946]/15 scale-[1.03] z-10'
          : 'hover:border-white/25 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/40'}
        transition-all duration-400 ease-out`}
    >
      {/* Popular glow border pulse */}
      {plan.popular && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-[#E63946]/30 via-[#E63946]/10 to-transparent pointer-events-none" />
      )}

      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ boxShadow: ['0 0 0px #E63946', '0 0 18px #E63946aa', '0 0 0px #E63946'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-[#E63946] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full"
          >
            ✦ Most Popular
          </motion.div>
        </div>
      )}

      <div className="p-7 flex flex-col flex-1 gap-6">

        {/* Header */}
        <div className={`pt-${plan.popular ? '4' : '0'}`}>
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${plan.accentColor}`}>
            {plan.name}
          </p>

          {/* Animated price */}
          <div className="flex items-end gap-2 mt-2">
            <AnimatedPrice price={price} />
            <span className="text-gray-500 text-sm mb-1.5 font-medium">/mo</span>
          </div>

          {/* Discount badge */}
          <AnimatePresence>
            {discount > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-block mt-2 text-[10px] font-bold bg-green-500/15 border border-green-500/25 text-green-400 px-2.5 py-1 rounded-full"
              >
                Save {discount}% on {billing}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8" />

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1">
          {plan.features.map((f) => (
            <li key={f.text} className="flex items-center gap-3">
              <CheckIcon included={f.included} />
              <span className={`text-sm ${f.included ? 'text-gray-300' : 'text-white/25 line-through'}`}>
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href={`#free-trial`}
          onClick={() => {
            sessionStorage.setItem('selectedPlan', plan.name)
          }}
          className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3.5 px-6 rounded-xl
                      transition-all duration-200 hover:-translate-y-0.5 active:scale-95 mt-auto
                      ${plan.buttonStyle}`}
        >
          {plan.popular ? 'Start Free Trial' : 'Join Now'}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   GUARANTEE CARD
───────────────────────────────────────── */
function GuaranteeCard({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white/4 border border-white/8 rounded-2xl p-6
                 hover:border-[#E63946]/30 hover:bg-[#E63946]/5 transition-all duration-300"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#E63946]/10 border border-[#E63946]/20 flex items-center justify-center text-[#E63946] group-hover:bg-[#E63946]/20 transition-colors duration-300">
        {item.icon}
      </div>
      <div>
        <h4 className="text-white font-bold text-base mb-1">{item.title}</h4>
        <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Memberships() {
  const [billing, setBilling] = useState('monthly')
  const headerRef = useRef(null)
  const guaranteeRef = useRef(null)
  const ctaRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })
  const guaranteeInView = useInView(guaranteeRef, { once: true, margin: '-60px' })
  const ctaInView = useInView(ctaRef, { once: true, margin: '-60px' })

  return (
    <section
      id="memberships"
      className="relative bg-[#1A1A1A] py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E63946] opacity-[0.06] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E63946] opacity-[0.04] rounded-full blur-[110px] pointer-events-none" />
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
            Membership Plans
            <span className="w-8 h-[1px] bg-[#E63946]" />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5"
          >
            Choose Your <span className="text-[#E63946]">Membership</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed"
          >
            Flexible plans designed for every fitness journey.
          </motion.p>
        </div>

        {/* ── Billing Toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-14"
        >
          <div className="relative flex items-center bg-[#0F0F0F] border border-white/10 rounded-xl p-1 gap-1">
            {billingOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setBilling(opt.key)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-250 z-10
                  ${billing === opt.key ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                {billing === opt.key && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 bg-[#E63946] rounded-lg"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {opt.label}
                {opt.discount > 0 && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                    ${billing === opt.key
                      ? 'bg-white/20 text-white'
                      : 'bg-green-500/15 text-green-400 border border-green-500/20'}`}
                  >
                    -{opt.discount}%
                  </span>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Pricing Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i} billing={billing} />
          ))}
        </div>

        {/* ── Guarantee Banner ── */}
        <div ref={guaranteeRef} className="mt-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={guaranteeInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center text-xs font-semibold uppercase tracking-widest text-gray-500 mb-8 flex items-center justify-center gap-3"
          >
            <span className="flex-1 h-px bg-white/8 max-w-[120px]" />
            Our Guarantees
            <span className="flex-1 h-px bg-white/8 max-w-[120px]" />
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {guarantees.map((item, i) => (
              <GuaranteeCard key={item.title} item={item} index={i} inView={guaranteeInView} />
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
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
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F0F]/97 via-[#0F0F0F]/90 to-[#0F0F0F]/70" />
          {/* Top red line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E63946] via-[#E63946]/70 to-transparent" />

          <div className="relative px-8 md:px-16 py-16 flex flex-col items-center text-center gap-6">
            <div className="flex items-center gap-2 text-[#E63946] text-xs font-semibold uppercase tracking-widest">
              <span className="w-6 h-[1px] bg-[#E63946]" />
              Start Today
              <span className="w-6 h-[1px] bg-[#E63946]" />
            </div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] max-w-2xl">
              Ready To Become The{' '}
              <span className="text-[#E63946]">Best Version of Yourself?</span>
            </h3>
            <p className="text-gray-400 text-base max-w-lg">
              Join thousands of members transforming their lives at CultFitNeo Gym.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="#free-trial"
                className="group inline-flex items-center justify-center gap-2 bg-[#E63946] hover:bg-[#c62d39] text-white font-bold text-sm px-9 py-4 rounded-xl transition-all duration-200 hover:shadow-2xl hover:shadow-[#E63946]/40 hover:-translate-y-0.5 active:scale-95"
              >
                Join Now
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-white/8 backdrop-blur-sm border border-white/20 hover:bg-white/15 hover:border-white/40 text-white font-bold text-sm px-9 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              >
                <svg className="w-4 h-4 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21l1.5-4.5m0 0A8.955 8.955 0 0112 3c4.97 0 9 4.03 9 9a8.955 8.955 0 01-6 8.485m-9.5-4.485h10.5" />
                </svg>
                Book A Gym Tour
              </a>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-2 pt-4 border-t border-white/8 w-full max-w-md">
              {['5000+ Members', '7-Day Free Trial', 'No Lock-in Contract'].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                  <svg className="w-3.5 h-3.5 text-[#E63946]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
