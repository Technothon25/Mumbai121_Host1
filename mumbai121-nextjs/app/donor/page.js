'use client'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Image from 'next/image'
import Link from 'next/link'

function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, visible]
}

const impacts = [
  { emoji: '👨‍👩‍👧', title: 'Families Rise',              desc: 'When freshers and PwBDs start earning, their entire families benefit and rise together.' },
  { emoji: '🏢',   title: 'Small Businesses Grow',      desc: 'Startups get the talent they need to scale and build strong, productive teams.' },
  { emoji: '🌍',   title: 'Local Economies Strengthen', desc: 'More employed youth means stronger spending power and thriving local communities.' },
  { emoji: '🚀',   title: 'More Lives Reached',         desc: 'Your donation expands outreach and supports operational costs to reach more people.' },
]

export default function DonorPage() {
  const [qrRef,     qrVisible]     = useReveal()
  const [impactRef, impactVisible] = useReveal()
  const [noteRef,   noteVisible]   = useReveal()

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />
{/* ── SECTION 1: Hero — title only ── */}
      <section className="bg-[#FFAC33] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#2D3E50] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            Hrim International Trust · Mumbai121
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] font-poppins leading-tight">
            🎯 Support Jobs for Freshers & PwBDs
          </h1>
        </div>
      </section>

      {/* ── Intro below hero ── */}
      <section className="py-10 px-6 bg-[#f9ebdc] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
            This project by <strong className="text-[#2D3E50]">Hrim International Trust</strong> helps
            freshers and persons with benchmark disabilities (PwBDs) find paid jobs in startups and small companies.
            Our recruitment consultancy is <strong className="text-[#2D3E50]">100% free</strong> for both candidates and companies.
          </p>
          <p className="text-[#AA6F73] font-bold text-lg">🙏 Help us keep it free.</p>
        </div>
      </section>

      {/* ── SECTION 2: Scanner — BIG and prominent ── */}
      <section ref={qrRef} className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${qrVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              📲 Scan & Donate via Any UPI App
            </h2>
            <div className="flex justify-center mb-3">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <p className="text-gray-500 text-sm">Open any UPI app, scan the QR code and donate any amount</p>
          </div>

          <div className={`flex flex-col md:flex-row items-center justify-center gap-12 transition-all duration-700 ${qrVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

            {/* ── Big QR Card ── */}
            <div className="shrink-0">
              <div className="relative bg-[#2D3E50] rounded-3xl p-8 shadow-2xl text-center">

                {/* Glowing ring effect */}
                <div className="absolute inset-0 rounded-3xl ring-4 ring-[#FFAC33]/40 animate-pulse"></div>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-9 h-9 bg-[#FFAC33] rounded-full flex items-center justify-center">
                    <i className="fas fa-hand-holding-heart text-[#2D3E50] text-sm"></i>
                  </div>
                  <span className="font-bold text-white text-sm font-poppins">Hrim International Trust</span>
                </div>

                {/* QR Code — large and clear */}
                <div className="bg-white rounded-2xl p-4 shadow-inner inline-block mb-5">
                  <Image
                    src="/images/mumbai121_donor_scanner.jpeg"
                    alt="Mumbai121 Donation QR Code"
                    width={260}
                    height={260}
                    className="rounded-xl"
                    priority
                  />
                </div>

                {/* Scan label */}
                <p className="text-[#FFAC33] font-bold text-sm mb-4 tracking-wide">
                  SCAN TO PAY WITH ANY UPI APP
                </p>

                {/* UPI App badges */}
                <div className="flex justify-center gap-2 flex-wrap">
                  {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app, i) => (
                    <span key={i} className="text-xs bg-[#FFAC33] text-[#2D3E50] font-bold px-3 py-1.5 rounded-full">
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Every amount matters tag below card */}
              <div className="mt-5 text-center">
                <span className="inline-block bg-[#f9ebdc] border border-[#FFAC33]/30 text-[#2D3E50] font-semibold text-sm px-5 py-2 rounded-full">
                  🌟 Every amount matters — ₹10 or ₹10,000
                </span>
              </div>
            </div>

            {/* ── Right side info cards ── */}
            <div className="flex-1 space-y-5 max-w-md w-full">
              {[
                { emoji: '🛠', title: 'How Your Donation Helps', desc: 'Your donation will help us expand outreach and support operational costs, allowing us to reach more lives across Mumbai and beyond.' },
                { emoji: '💙', title: '100% Goes to the Cause',  desc: 'Every rupee you contribute directly supports free recruitment services for freshers and PwBDs — no middlemen, no platform cuts.' },
                { emoji: '🤝', title: 'No Transaction Charges',  desc: 'UPI payments are instant and free. Your full donation amount reaches us directly with zero deductions.' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`bg-[#FFF9F3] rounded-2xl p-5 border border-[#FFAC33]/20 hover:border-[#FFAC33] hover:shadow-md flex items-start gap-4 transition-all duration-300 ${
                    qrVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <span className="text-3xl shrink-0">{item.emoji}</span>
                  <div>
                    <p className="font-bold text-[#2D3E50] font-poppins text-sm mb-1">{item.title}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: Your Support Builds Bharat ── */}
      <section ref={impactRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              💡 Your Support Helps Build Bharat
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <p className="text-gray-600 max-w-xl mx-auto text-sm">
              When freshers and PwBDs start earning, families rise, small businesses grow,
              and local economies strengthen.
            </p>
          </div>

          <div className="space-y-4">
            {impacts.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-5 bg-white rounded-2xl px-6 py-5 border-l-4 border-[#FFAC33] shadow-sm hover:shadow-md hover:translate-x-2 transition-all duration-300 ${
                  impactVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl shrink-0 w-14 text-center">{item.emoji}</div>
                <div className="w-px h-10 bg-[#FFAC33]/30 shrink-0"></div>
                <div>
                  <p className="font-bold text-[#2D3E50] font-poppins text-sm mb-0.5">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Important Note ── */}
      <section ref={noteRef} className="py-12 px-6 md:px-20 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className={`transition-all duration-700 ${noteVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

            {/* Warning note */}
            <div className="bg-[#FFF9F3] border-l-4 border-[#AA6F73] rounded-2xl px-7 py-5 flex items-start gap-4 shadow-sm mb-8">
              <i className="fas fa-exclamation-triangle text-[#AA6F73] text-xl shrink-0 mt-0.5"></i>
              <div>
                <p className="font-bold text-[#2D3E50] mb-1 font-poppins">Important Note</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hrim International Trust is <strong>not registered under 80G or 12A</strong>.
                  Donations are not eligible for tax exemption under these sections.
                </p>
              </div>
            </div>

            {/* Thank you */}
            <div className="text-center bg-[#2D3E50] rounded-3xl py-10 px-6">
              <p className="text-5xl mb-4">💙</p>
              <p className="text-white font-bold text-xl font-poppins mb-2">
                Thank you for supporting inclusive hiring!
              </p>
              <p className="text-gray-300 text-sm">
                Together we build a Bharat where everyone has an equal shot at a career.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}