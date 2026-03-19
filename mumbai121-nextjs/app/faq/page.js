'use client'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

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

// ── FAQ Data — exact from PDF ───────────────────────────────────────
const faqs = [
  {
    q: 'What is Mumbai121.com?',
    a: 'Mumbai121.com is a free platform connecting freshers and persons with benchmark disabilities (PwBD) with small companies and startups offering paid job opportunities in Mumbai.',
  },
  {
    q: 'Who can register on the platform?',
    a: null,
    bullets: [
      'Fresh graduates looking for their first job',
      'Persons with benchmark disabilities (PwBD)',
      'Small businesses, startups, and employers with real job openings',
    ],
  },
  {
    q: 'Is it really free for candidates and companies?',
    a: 'Yes! It is completely free for both candidates and companies. If you receive any call, email, or message asking for payment, please do not respond and report it to us immediately.',
  },
  {
    q: 'I am a PwBD candidate. Will I get additional support?',
    a: 'Yes. We have dedicated mentors and volunteers who help PwBD candidates:',
    bullets: [
      'Get interview-ready',
      'Match with suitable roles',
      'Get Company Ready',
      'Contact person info — we will help you list your job and find suitable candidates',
    ],
  },
  {
    q: 'Do you provide interview preparation?',
    a: 'Yes, for selected candidates and PwBD applicants, our mentors help with:',
    bullets: [
      'Soft skills',
      'Interview tips & mock interviews',
    ],
  },
  {
    q: 'I want to volunteer or support this cause. What can I do?',
    a: 'We welcome volunteers! You can help with:',
    bullets: [
      'Mentoring freshers or PwBD',
      'Outreach to jobseekers or employers',
      'Data entry or social media',
      'Contact us via WhatsApp or the Volunteer Form',
    ],
  },
  {
    q: 'How can I deregister?',
    a: 'You just have to write an email from your registered email id with Subject saying "deregister" and we will do the needful.',
  },
  {
    q: 'I have got a job. How can I inform you to take me out of the program?',
    a: 'You just have to write an email from your registered email id with Subject saying "I got the Job" and we will do the needful.',
  },
  {
    q: 'I am a company and I want more candidate details?',
    a: 'You just have to write an email from your registered email id with Subject saying "Send More candidate details" and we will do the needful based on availability.',
  },
]

// ── Accordion Item ──────────────────────────────────────────────────
function FAQItem({ number, faq, isOpen, onToggle }) {
  return (
    <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${isOpen ? 'border-[#FFAC33] shadow-lg' : 'border-[#e8e8e8] hover:border-[#FFAC33]/50'}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-300 ${isOpen ? 'bg-[#2D3E50]' : 'bg-white hover:bg-[#FFF9F3]'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-colors duration-300 ${isOpen ? 'bg-[#FFAC33] text-[#2D3E50]' : 'bg-[#f9ebdc] text-[#2D3E50]'}`}>
            {number}
          </div>
          <span className={`font-bold font-poppins text-base transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#2D3E50]'}`}>
            {faq.q}
          </span>
        </div>
        <i className={`fas fa-chevron-down text-[#FFAC33] transition-transform duration-300 shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[400px]' : 'max-h-0'}`}>
        <div className="px-6 py-5 bg-[#FFF9F3] border-t border-[#FFAC33]/20">
          {faq.a && (
            <p className="text-gray-700 text-sm leading-relaxed mb-3">{faq.a}</p>
          )}
          {faq.bullets && (
            <ul className="space-y-2">
              {faq.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-[#FFAC33] rounded-full shrink-0 mt-1.5"></span>
                  <span className="text-gray-700 text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main Page ───────────────────────────────────────────────────────
export default function FAQPage() {
  const [openFAQ, setOpenFAQ] = useState(null)
  const [faqRef, faqVisible] = useReveal()

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* ── Hero — title only ── */}
      <section className="bg-[#FFAC33] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#2D3E50] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            Got Questions? We Have Answers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] font-poppins leading-tight">
            ❓ Frequently Asked Questions
          </h1>
        </div>
      </section>

      {/* ── Intro below hero ── */}
      <section className="py-10 px-6 bg-[#FFF9F3] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed">
            Everything you need to know about Mumbai121.com — for candidates, PwBD applicants,
            companies and volunteers.
          </p>
        </div>
      </section>

      {/* ── FAQ Accordion ── */}
      <section ref={faqRef} className="py-10 px-6 md:px-20 pb-16 bg-[#f9ebdc]">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block bg-[#2D3E50] text-[#FFAC33] text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
              9 Questions
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-3 font-poppins">
              All FAQs
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>

          <div className={`space-y-3 transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                number={i + 1}
                faq={faq}
                isOpen={openFAQ === i}
                onToggle={() => setOpenFAQ(openFAQ === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Still have questions CTA ── */}
      <section className="py-12 px-6 bg-[#2D3E50] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-3 font-poppins">
            Still Have Questions?
          </h2>
          <p className="text-gray-300 mb-6 text-base">
            Reach out to us directly and we'll get back to you as soon as possible or you can use chat bot.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#FFAC33] hover:bg-white text-[#2D3E50] font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
          >
            Contact Us <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}