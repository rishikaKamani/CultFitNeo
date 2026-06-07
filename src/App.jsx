import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Facilities from './components/Facilities'
import Transformations from './components/Transformations'
import Trainers from './components/Trainers'
import Memberships from './components/Memberships'
import Gallery from './components/Gallery'
import Testimonials from './components/Testimonials'
import Programs from './components/Programs'
import FreeTrial from './components/FreeTrial'
import Contact, { WhatsAppButton } from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Facilities />
      <Transformations />
      <Trainers />
      <Memberships />
      <Gallery />
      <Testimonials />
      <Programs />
      <FreeTrial />
      <Contact />
      {/* Footer will be added here */}
      <WhatsAppButton />
    </div>
  )
}
