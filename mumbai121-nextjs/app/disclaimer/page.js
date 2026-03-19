'use client'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
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

// ── Sections — exact from PDF ───────────────────────────────────────
const sections = [
  {
    
    icon: 'fa-info-circle',
    title: 'General Information',
    text: 'The information provided on this website is for general informational purposes only. We act solely as a facilitator connecting job seekers and employers — specifically fresh talent in Mumbai with small businesses and startups. While we strive to maintain accurate and up-to-date listings, we do not guarantee employment outcomes, candidate performance, or the legitimacy of any job listing.',
  },
  {
    
    icon: 'fa-tags',
    title: 'Free Services',
    text: 'Our services are completely free for both candidates and companies. We do not charge any fees, commissions, or service charges at any stage of the recruitment process.',
  },
  {
    
    icon: 'fa-shield-alt',
    title: 'No Liability',
    text: 'Users of this platform are responsible for conducting their own due diligence before entering into any job offers, employment contracts, or collaborations. We are not liable for any direct or indirect loss, damage, fraud, or dispute resulting from the use of this website.',
  },
  {
    icon: 'fa-lock',
    title: 'Privacy and Data Protection',
    text: 'We respect your privacy and are committed to protecting your personal data. Any information shared with us — such as resumes, contact details, or job postings — is used solely for the purpose of facilitating job matches and will not be sold or shared with third parties without your consent, unless required by law. We implement reasonable security measures to protect your data, but we cannot guarantee the absolute security of information shared online. By using this website, you acknowledge and accept this risk.',
  },
  {
   
    icon: 'fa-file-alt',
    title: 'Privacy Policy',
    text: 'We collect basic information from candidates and companies to help connect job seekers with suitable opportunities. While we make every reasonable effort to protect your data and share it only when necessary for job-matching purposes, we cannot guarantee that it won\'t be misused by third parties. By using our platform, you understand and accept that, despite our precautions, this risk exists.',
  },
  {
    
    icon: 'fa-sync-alt',
    title: 'Changes to the Disclaimer',
    text: 'We reserve the right to update or modify this disclaimer at any time without prior notice. Continued use of the website after such changes indicates your acceptance of the updated terms.',
  },
  {
    
    icon: 'fa-phone-alt',
    title: 'Contact',
    text: 'If you have any questions or concerns about this disclaimer or our services, please contact us via the details provided on our website.',
  },
]

export default function DisclaimerPage() {
  const [sectionsRef, sectionsVisible] = useReveal()

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* ── Hero — title only ── */}
      <section className="bg-[#FFAC33] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#2D3E50] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            Legal · Privacy · Terms
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] font-poppins leading-tight">
            Disclaimer
          </h1>
        </div>
      </section>

      {/* ── Intro below hero ── */}
      <section className="py-10 px-6 bg-[#FFF9F3] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Please read this disclaimer carefully before using Mumbai121.com. By accessing or using
            our platform, you agree to the terms outlined below.
          </p>
        </div>
      </section>

      {/* ── Disclaimer Sections ── */}
      <section ref={sectionsRef} className="py-10 px-6 md:px-20 pb-16 bg-[#f9ebdc]">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block bg-[#2D3E50] text-[#FFAC33] text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
              7 Sections
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-3 font-poppins">
              Terms & Conditions
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((sec, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl overflow-hidden border-2 border-[#e8e8e8] hover:border-[#FFAC33] hover:shadow-lg transition-all duration-300 ${
                  sectionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Card Header */}
                <div className="flex items-center gap-4 px-6 py-5 bg-[#FFF9F3] border-b border-[#FFAC33]/20">
                  <div className="w-10 h-10 bg-[#2D3E50] rounded-full flex items-center justify-center shrink-0">
                    <i className={`fas ${sec.icon} text-[#FFAC33] text-sm`}></i>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#FFAC33] bg-[#2D3E50] px-2 py-1 rounded-full">
                      {sec.number}
                    </span>
                    <h3 className="font-bold text-[#2D3E50] font-poppins text-base">{sec.title}</h3>
                  </div>
                </div>
                {/* Card Body */}
                <div className="px-6 py-5">
                  <p className="text-gray-700 text-sm leading-relaxed">{sec.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-12 px-6 bg-[#2D3E50] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3 font-poppins">
            Have Questions About This Disclaimer?
          </h2>
          <p className="text-gray-300 mb-6 text-base">
            Reach out to us directly and we'll be happy to help clarify anything.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#FFAC33] hover:bg-white text-[#2D3E50] font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
          >
            Contact Us <i className="fas fa-arrow-right ml-2"></i>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}