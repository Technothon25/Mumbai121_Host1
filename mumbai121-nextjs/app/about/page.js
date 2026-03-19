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

export default function AboutPage() {
  const [whyRef,     whyVisible]     = useReveal()
  const [advisorRef, advisorVisible] = useReveal()

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* ── Hero — title only ── */}
      <section className="bg-[#FFAC33] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#2D3E50] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            Our Story · Our Mission
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] font-poppins leading-tight">
            About Us
          </h1>
        </div>
      </section>

      {/* ── What is Mumbai121 — card UI ── */}
      <section className="py-12 px-6 bg-[#FFF9F3]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              What is Mumbai121?
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#FFAC33]/20">
            <p className="text-gray-700 text-base leading-relaxed mb-5">
              Mumbai121 is a social impact initiative dedicated to connecting Mumbai's fresh talent and people
              with disabilities to startups and small businesses. We believe in creating an inclusive and
              empowered job ecosystem — one where every capable individual gets a fair chance, and every
              small business finds the right talent to grow.
            </p>
            <p className="text-gray-600 text-base leading-relaxed">
              Mumbai121 is a project of <strong className="text-[#2D3E50]">HRIM INTERNATIONAL TRUST</strong>, a Private Trust
              committed to inclusive development and social upliftment through skill-building, employment
              support, and community collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why We Exist — card UI ── */}
      <section ref={whyRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-8 transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              Why We Exist
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>
          <div className={`bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-[#FFAC33]/20 transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-gray-700 text-base leading-relaxed mb-5">
              In a city as dynamic as Mumbai, countless individuals — especially youth and people with
              disabilities — struggle to find meaningful work. At the same time, startups and small
              businesses often lack the resources to access skilled and willing talent.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              We bridge this gap by offering a <strong className="text-[#2D3E50]">100% free platform</strong> for candidates
              and companies. There are no fees, no middlemen, and no barriers — just real opportunities,
              real people, and a shared goal of inclusive progress.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Mission — dark navy section ── */}
      <section className="py-14 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
            Our Mission
          </h2>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
          </div>
          <div className="bg-[#2D3E50] rounded-3xl py-12 px-8 md:px-16 shadow-lg">
            <p className="text-[#FFAC33] text-3xl md:text-4xl font-bold font-poppins leading-snug">
              "Empowering Talent. Enabling Growth."
            </p>
            <p className="text-gray-300 text-base mt-5 max-w-xl mx-auto leading-relaxed">
              A 100% free platform — no fees, no middlemen, no barriers. Just real opportunities,
              real people, and a shared goal of inclusive progress.
            </p>
          </div>
        </div>
      </section>

      {/* ── Our Advisor — Dinesh Sehgal ── */}
      <section ref={advisorRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${advisorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              Our Advisor
            </h2>
            <div className="flex justify-center mb-2">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>

          <div className={`bg-[#FFF9F3] rounded-3xl shadow-lg overflow-hidden border border-[#FFAC33]/20 transition-all duration-700 ${advisorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-col lg:flex-row">

              {/* ── LEFT: Photo + data below ── */}
              <div className="w-full lg:w-1/3 shrink-0 flex flex-col">

                {/* Photo */}
                <div className="relative h-72 lg:h-80">
                  <Image
                    src="/images/mumbai121_dinesh_sehgal.jpeg"
                    alt="Dinesh Sehgal"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2D3E50]/90 to-transparent p-6">
                    <p className="text-white font-bold text-2xl font-poppins">Dinesh Sehgal</p>
                    <p className="text-[#FFAC33] text-sm font-medium mt-1">Our Advisor</p>
                    <p className="text-gray-300 text-xs mt-1">
                      Bachelor of Engineering (Honours) · LL.B. — Mumbai University
                    </p>
                  </div>
                </div>

               {/* ── Education + lightbulb below photo ── */}
                <div className="p-5 bg-[#FFF9F3] space-y-4 flex-1">
                 
                  <div className="bg-white rounded-xl px-4 py-3 border border-[#FFAC33]/30 flex items-start gap-2">
                    <i className="fas fa-lightbulb text-[#FFAC33] text-sm shrink-0 mt-0.5"></i>
                    <p className="text-[#2D3E50] text-xs leading-relaxed font-medium">
                      As a visionary leader and founder of multiple people-focused initiatives, Dinesh plays
                      a pivotal role in guiding Mumbai121's mission, strategy, and partnerships. He is deeply
                      passionate about using technology and empathy to create inclusive, barrier-free hiring,
                      especially for underrepresented communities.
                    </p>
                  </div>
                </div>
              </div>
{/* ── RIGHT: Para 1, 2, 3, 4, 5 ── */}
              <div className="flex-1 p-8 md:p-10">

                {/* Para 1 */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Dinesh Sehgal brings over two decades of diverse experience, having worked across both
                  industry and consulting roles with small, medium, and large enterprises. A seasoned Theory
                  of Constraints (TOC) practitioner, he has applied his expertise both as a user and as a
                  consultant across sectors.
                </p>

                {/* Para 2 */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  He has worked in over 600 projects in sectors such as hospitals, pharmaceuticals,
                  biotechnology, infrastructure, automobiles, steel, copper, aluminum, tissue culture,
                  agriculture, and various government and semi-government organizations — delivering
                  exceptional operational and financial results, even in highly challenging conditions.
                </p>

                {/* Para 3 */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  In addition to his operational excellence, Dinesh has deep experience in litigation
                  prevention and litigation management, which strengthens his ability to support complex
                  sectoral needs. His expertise also spans national and international tendering in both
                  government and private sectors.
                </p>

                {/* Para 4 */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Dinesh has successfully built and managed large-scale distribution networks, and has
                  extensive experience in launching and marketing premium capital equipment in both domestic
                  and international markets. He has crafted and executed impactful sales and marketing
                  strategies across online and offline channels.
                </p>

                {/* Para 5 */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  He has also been a speaker at several national-level seminars and symposiums, sharing
                  his insights on industry challenges and innovations.
                </p>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 px-6 bg-[#2D3E50] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4 font-poppins">
            Be Part of Our Story
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Whether you are a fresher, a company, a volunteer or a donor — there is a place for you in the Mumbai121 community.
          </p>
          <Link
            href="/#register"
            className="inline-block bg-[#FFAC33] hover:bg-white text-[#2D3E50] font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
          >
            Get Started <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}