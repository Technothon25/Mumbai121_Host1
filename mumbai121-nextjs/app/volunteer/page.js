'use client'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import VolunteerForm from '@/components/VolunteerForm'
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

// ── Volunteer Roles (exact from PDF) ───────────────────────────────
const roles = [
  { icon: 'fa-phone',             title: 'Jobseeker & Employer Outreach',          desc: 'Connect with freshers, PwBD candidates and employers to create meaningful opportunities.' },
  { icon: 'fa-comment-dots',      title: 'WhatsApp & Email Coordination',           desc: 'Handle day-to-day communication to keep candidates and companies connected.' },
  { icon: 'fa-table',             title: 'Data Entry and Management',               desc: 'Maintain and update candidate and company records using Google Sheets.' },
  { icon: 'fa-bullhorn',          title: 'Social Media Support',                   desc: 'Help spread the word about Mumbai121 across platforms to reach more job seekers.' },
  { icon: 'fa-laptop',            title: 'Website Assistance and Tech Support',    desc: 'Assist with website maintenance and provide technical support to the team.' },
  { icon: 'fa-hands-helping',     title: 'Mentoring Freshers & PwBD',              desc: 'Guide freshers and PwBD candidates to become industry-ready and interview-confident.' },
]

// ── What You Gain (exact from PDF) ─────────────────────────────────
const gains = [
  { icon: 'fa-briefcase',   text: 'Real Work Experience in recruitment, operations, outreach, marketing, or tech' },
  { icon: 'fa-user-tie',    text: 'Mentorship from senior professionals' },
  { icon: 'fa-certificate', text: 'Certificate of Contribution after your volunteering period' },
  { icon: 'fa-star',        text: 'Recognition on our platform for outstanding contributors' },
  { icon: 'fa-heart',       text: 'Personal Satisfaction of helping others start their careers' },
]

// ── Who Can Volunteer (exact from PDF) ─────────────────────────────
const whoCanVolunteer = [
  { icon: 'fa-laptop',          text: 'Experienced or Freshers — preferably with basic computer knowledge' },
  { icon: 'fa-graduation-cap',  text: 'Freshers looking for real experience' },
  { icon: 'fa-user-tie',        text: 'Experienced HR and social work professionals wanting to give back' },
  { icon: 'fa-universal-access',text: 'PwBD champions and inclusion advocates' },
  { icon: 'fa-clock',           text: 'Anyone with time, discipline, and a commitment to honest work' },
]

// ── How To Join (ORIGINAL — kept as is) ────────────────────────────
const steps = [
  { number: '01', title: 'Apply',        desc: 'Fill the volunteer registration form with your interests and availability.' },
  { number: '02', title: 'Orientation',  desc: 'Attend a short online orientation session with our core team.' },
  { number: '03', title: 'Get Assigned', desc: 'Get assigned to a role that matches your skills and schedule.' },
  { number: '04', title: 'Make Impact',  desc: 'Start volunteering and directly help people find jobs!' },
]

export default function VolunteerPage() {
  const [rolesRef,  rolesVisible]  = useReveal()
  const [whyRef,    whyVisible]    = useReveal()
  const [gainRef,   gainVisible]   = useReveal()
  const [whoRef,    whoVisible]    = useReveal()
  const [stepsRef,  stepsVisible]  = useReveal()

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* ── Hero — title only ── */}
      <section className="bg-[#FFAC33] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#2D3E50] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            Give Back · Grow · Make Impact
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] font-poppins leading-tight">
            Volunteer With Us
          </h1>
        </div>
      </section>

      {/* ── Intro + CTA below hero ── */}
      <section className="py-12 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#2D3E50] font-bold text-lg mb-3">
            Be the Change. Make a Difference. Gain Experience.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-4">
            Mumbai121 is a not-for-profit initiative that connects fresh talent and persons with benchmark
            disabilities (PwBD) to startups and small businesses in Mumbai. Our platform is 100% free for
            both candidates and companies — and it runs with the help of dedicated volunteers like you.
          </p>
          <p className="text-gray-700 text-base leading-relaxed mb-8">
            Are you passionate about making a real impact in people's lives? Do you believe that freshers
            and PwBD deserve equal access to paid job opportunities? Join us and become part of this
            purpose-driven movement!
          </p>
          <a
            href="#volunteerForm"
            className="inline-block bg-[#2D3E50] hover:bg-[#FFAC33] hover:text-[#2D3E50] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
          >
            Join as Volunteer <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </section>

      {/* ── Volunteer Roles Available — ON TOP as requested ── */}
      <section ref={rolesRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${rolesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              Volunteer Roles Available
            </h2>
            <div className="flex justify-center mb-2">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, i) => (
              <div
                key={i}
                className={`bg-[#FFF9F3] border border-[#FFAC33]/20 rounded-2xl p-6 hover:border-[#FFAC33] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group ${
                  rolesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 bg-[#2D3E50] group-hover:bg-[#FFAC33] rounded-full flex items-center justify-center mb-4 transition-colors duration-300">
                  <i className={`fas ${role.icon} text-[#FFAC33] group-hover:text-[#2D3E50] text-lg transition-colors duration-300`}></i>
                </div>
                <div className="text-2xl mb-2">{role.emoji}</div>
                <h3 className="font-bold text-[#2D3E50] mb-2 font-poppins text-sm">{role.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Volunteer With Us (from PDF) ── */}
      <section ref={whyRef} className="py-14 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              Why Volunteer With Us?
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>
          <div className={`bg-[#FFF9F3] border border-[#FFAC33]/20 rounded-3xl p-8 md:p-10 transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-gray-700 text-base leading-relaxed mb-4">
              Freshers and PwBD job seekers often go unnoticed, even as startups and small businesses
              face a growing demand for talent. We're changing that with a <strong className="text-[#2D3E50]">100% free platform</strong> that
              opens doors to real opportunities and gives them the right break to launch their careers.
            </p>
            <p className="text-gray-700 text-base leading-relaxed">
              By volunteering with us, you'll be shaping a fairer job market that <strong className="text-[#2D3E50]">empowers individuals
              and strengthens startups</strong> — all while building your own skills, network and experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── What You Gain (from PDF) ── */}
      <section ref={gainRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${gainVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              ✅ What You'll Gain
            </h2>
            <div className="flex justify-center mb-2">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {gains.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 bg-white p-5 rounded-2xl border border-[#FFAC33]/20 hover:border-[#FFAC33] hover:shadow-md transition-all duration-300 ${
                  gainVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 bg-[#2D3E50] rounded-full flex items-center justify-center shrink-0">
                  <i className={`fas ${item.icon} text-[#FFAC33] text-sm`}></i>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Can Volunteer (from PDF) ── */}
      <section ref={whoRef} className="py-14 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${whoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              Who Can Volunteer?
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <p className="text-gray-600">We welcome:</p>
          </div>
          <div className="space-y-4">
            {whoCanVolunteer.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-5 bg-[#FFF9F3] rounded-2xl px-6 py-5 border-l-4 border-[#FFAC33] shadow-sm hover:shadow-md hover:translate-x-2 transition-all duration-300 ${
                  whoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-10 h-10 bg-[#2D3E50] rounded-xl flex items-center justify-center shrink-0">
                  <i className={`fas ${item.icon} text-[#FFAC33] text-sm`}></i>
                </div>
                <p className="text-[#2D3E50] font-semibold text-sm leading-relaxed">{item.text}</p>
                <i className="fas fa-check text-[#FFAC33] ml-auto shrink-0"></i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How To Join (ORIGINAL — unchanged) ── */}
      <section ref={stepsRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              How to Join
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <p className="text-gray-600">
              It's simple! Just fill out our volunteer form below and we'll get back to you with available roles and next steps.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`text-center group transition-all duration-700 ${
                  stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 bg-[#2D3E50] group-hover:bg-[#FFAC33] rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <span className="text-[#FFAC33] group-hover:text-[#2D3E50] font-bold text-lg transition-colors duration-300">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-[#2D3E50] mb-2 font-poppins">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Registration Form ── */}
      <section className="py-14 px-6 md:px-20 bg-white" id="volunteerForm">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 text-center font-poppins">
            Register as Volunteer
          </h2>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#FFAC33]/20">
            <VolunteerForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}