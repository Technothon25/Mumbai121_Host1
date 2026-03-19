'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import JobTicker from '@/components/JobTicker'
import CompaniesShowcase from '@/components/CompaniesShowcase'

// Scroll animation hook
function useScrollReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

const registrationCards = [
  { href: '/fresher',               icon: 'fa-graduation-cap',  label: 'FRESHER'   },
  { href: '/pwbd',                  icon: 'fa-universal-access', label: 'PwBD'      },
  { href: '/company',               icon: 'fa-building',         label: 'COMPANY'   },
  { href: '/volunteer',             icon: 'fa-hands-helping',    label: 'VOLUNTEER' },
  { href: '/donor',                 icon: 'fa-heart',            label: 'DONOR'     },
  { href: '/interview-questions',   icon: 'fa-comments',         label: 'INTERVIEW Q\'S' },
]

export default function HomePage() {
  const [heroRef,    heroVisible]    = useScrollReveal()
  const [missionRef, missionVisible] = useScrollReveal()
  const [ctaRef,     ctaVisible]     = useScrollReveal()

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* ── Hero Section with Ticker overlaying at top ── */}
      <section
        ref={heroRef}
        className="relative bg-[#FFAC33] px-6 md:px-20 pt-16 pb-10 md:pt-20 md:pb-16 flex flex-col md:flex-row items-center gap-8"
      >
        {/* Ticker absolutely positioned at very top of hero */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <JobTicker />
        </div>

        {/* Hero Card */}
        <div className={`flex-1 flex justify-center md:justify-end transition-all duration-700
          ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div className="bg-[#fdebd7] rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] mb-4 font-poppins">
              Mumbai121
            </h1>
            <p className="text-[#2D3E50] font-semibold text-base md:text-lg mb-6 text-justify leading-relaxed">
              Supporting freshers and persons with benchmark disabilities (PwBD) in finding paid jobs in small companies and startups.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-[#2D3E50] font-semibold">
                <i className="fas fa-check-circle text-[#2D3E50] text-xl"></i>
                100% free for candidates and companies.
              </li>
              <li className="flex items-center gap-3 text-[#2D3E50] font-semibold">
                <i className="fas fa-check-circle text-[#2D3E50] text-xl"></i>
                Empowering Talent. Enabling Growth.
              </li>
            </ul>
            <Link
              href="#register"
              className="block text-center bg-[#2D3E50] hover:bg-[#66545E] text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              REGISTER NOW
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className={`flex-1 flex justify-center transition-all duration-700 delay-200
          ${heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <Image
            src="/images/mumbai121_homepage_image.png"
            alt="Mumbai121 Team"
            width={500}
            height={400}
            className="max-w-xs md:max-w-sm lg:max-w-md w-full drop-shadow-2xl"
            priority
          />
        </div>
      </section>

      {/* ── Mission Section ── */}
      <section
        ref={missionRef}
        className={`bg-white py-12 px-6 md:px-20 text-center shadow-sm transition-all duration-700
          ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-4 leading-relaxed">
            We connect Mumbai's fresh talent and people with disabilities to startups and small businesses — creating inclusive opportunities and a stronger future.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you're a jobseeker or an employer, our platform is <span className="font-bold text-[#2D3E50]">100% free</span>. No fees. No barriers. Just real connections that matter.
          </p>
        </div>
      </section>

      {/* ── Companies Showcase ── */}
      <CompaniesShowcase />

      {/* ── CTA + Registration Section ── */}
      <section
        ref={ctaRef}
        id="register"
        className="bg-[#f9ebdc] py-14 px-6 md:px-20"
      >
        {/* CTA Header */}
        <div className={`text-center mb-10 transition-all duration-700
          ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D3E50] mb-3 font-poppins">
            Ready to hire or get hired?
          </h2>
          <p className="text-[#66545E] text-lg">
            Be part of a movement that supports diversity, inclusion, and growth.
          </p>
        </div>

        {/* Registration Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {registrationCards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className={`bg-white rounded-2xl p-6 text-center border-2 border-gray-100
                hover:border-[#FFAC33] hover:-translate-y-2 hover:shadow-xl
                transition-all duration-300 flex flex-col items-center justify-center group
                ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <i className={`fas ${card.icon} text-4xl text-[#FFAC33] group-hover:scale-110 transition-transform duration-300 mb-4`}></i>
              <h3 className="font-bold text-[#2D3E50] text-sm tracking-wide">{card.label}</h3>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}