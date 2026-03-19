'use client'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CompanyForm from '@/components/CompanyForm'
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

// ── Core Jobs (exact from PDF) ──────────────────────────────────────
const coreJobs = [
  {
    number: '1', title: 'IT Related', emoji: '💻',
    tagline: 'Perfect for tech-driven companies and startups.',
    roles: ['Software Developer', 'Web Developer', 'QA / Software Tester', 'IT Support', 'Network Admin', 'Technical Support Executive'],
  },
  {
    number: '2', title: 'Non-IT related', emoji: '⚙️',
    tagline: 'For companies in manufacturing, production, or infrastructure.',
    roles: ['Production Engineer', 'Quality Control / Assurance Engineer', 'Design Engineer (AutoCAD / SolidWorks)', 'Maintenance Engineer', 'Site Engineer', 'Service Engineer'],
  },
  {
    number: '3', title: 'Sales & Marketing', emoji: '📣',
    tagline: 'Boost your business with young talent in outreach and branding.',
    roles: ['Digital Marketing Executive', 'Sales Executive', 'Business Development Associate', 'Customer Acquisition Associate', 'Telecalling / Cold Calling Executive', 'SEO / SEM Assistant', 'Social Media Executive'],
  },
  {
    number: '4', title: 'General Roles', emoji: '🗂️',
    tagline: 'Ideal for everyday operations and support functions.',
    roles: ['Data Entry', 'Admin Executive', 'General Management Trainee', 'Executive Assistant', "Founder's Office Intern / Executive", 'Operations Assistant', 'Front Office Executive', 'Customer Support Executive', 'Customer Service Representative'],
  },
  {
    number: '5', title: 'Accounting, Finance & Purchase', emoji: '💰',
    tagline: 'Let young professionals help you stay on top of your books, budgets, and buys.',
    roles: ['Finance Associates', 'Accounting Interns', 'Accounts Payable Specialists', 'Financial Analysts', 'Purchase Officer', 'Tender Executive'],
  },
  {
    number: '6', title: 'Legal Roles', emoji: '⚖️',
    tagline: 'Support your business with fresh legal talent to handle contracts, compliance, documentation.',
    roles: ['Legal cum Admin Executive', 'Junior Legal Officer', 'Legal & Compliance Executive', 'Documentation & Legal Support Executive', 'Tender Executive'],
  },
]

// ── Why Register (exact from PDF) ──────────────────────────────────
const whyRegister = [
  { icon: '🆓', title: 'Absolutely Free',    desc: 'No hidden costs, ever. No listing fees, no commissions, no subscriptions.' },
  { icon: '⚡', title: 'Save Time',           desc: 'We match and send candidate profiles directly to you — no searching required.' },
  { icon: '🎯', title: 'Access Candidates',   desc: 'Freshers and PwBD actively looking for work, pre-screened and ready.' },
  { icon: '🌍', title: 'Support Inclusion',   desc: 'Become part of a purpose-driven hiring movement for social impact.' },
  { icon: '🏆', title: 'Build Goodwill',      desc: 'Get listed as a startup that supports freshers and persons with disabilities.' },
]

// ── Who Can Register (ORIGINAL — kept) ─────────────────────────────
const whoCanRegister = [
  { icon: 'fa-rocket',    text: 'Startups at any stage — idea, early, or growth stage' },
  { icon: 'fa-store',     text: 'Small businesses and MSMEs based in Mumbai' },
  { icon: 'fa-building',  text: 'Companies with less than 200 employees' },
  { icon: 'fa-briefcase', text: 'Any industry — IT, retail, healthcare, logistics and more' },
]

// ── Industries (ORIGINAL — kept) ───────────────────────────────────
const industries = [
  { icon: 'fa-laptop-code',    label: 'IT & Software' },
  { icon: 'fa-shopping-bag',   label: 'Retail & E-Commerce' },
  { icon: 'fa-heartbeat',      label: 'Healthcare' },
  { icon: 'fa-truck',          label: 'Logistics' },
  { icon: 'fa-paint-brush',    label: 'Design & Creative' },
  { icon: 'fa-graduation-cap', label: 'EdTech' },
  { icon: 'fa-chart-line',     label: 'Finance' },
  { icon: 'fa-utensils',       label: 'Food & Beverage' },
  { icon: 'fa-bullhorn',       label: 'Marketing' },
  { icon: 'fa-hard-hat',       label: 'Construction' },
  { icon: 'fa-leaf',           label: 'Sustainability' },
  { icon: 'fa-cloud',          label: 'Cloud & SaaS' },
]

// ── How It Works (from PDF) ─────────────────────────────────────────
const steps = [
  {
    number: '01',
    title: 'Complete the Form',
    desc: 'Fill in your company details and hiring requirements in the form below.',
    icon: 'fa-file-alt',
  },
  {
    number: '02',
    title: 'Review & Approval',
    desc: 'Once your requirements are reviewed and approved by our team.',
    icon: 'fa-search',
  },
  {
    number: '03',
    title: 'Receive Profiles',
    desc: 'We email you a list of suitable candidate profiles along with their contact details.',
    icon: 'fa-envelope-open-text',
  },
  {
    number: '04',
    title: 'Hire & Grow',
    desc: 'Reach out directly for interviews and hire those who align with your company culture.',
    icon: 'fa-handshake',
  },
]

// ── Accordion ───────────────────────────────────────────────────────
function AccordionItem({ job, isOpen, onToggle }) {
  return (
    <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 ${isOpen ? 'border-[#FFAC33] shadow-lg' : 'border-[#e8e8e8] hover:border-[#FFAC33]/50'}`}>
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-300 ${isOpen ? 'bg-[#2D3E50]' : 'bg-white hover:bg-[#FFF9F3]'}`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm transition-colors duration-300 ${isOpen ? 'bg-[#FFAC33] text-[#2D3E50]' : 'bg-[#f9ebdc] text-[#2D3E50]'}`}>
            {job.number}
          </div>
          <div>
            <span className="text-lg mr-2">{job.emoji}</span>
            <span className={`font-bold font-poppins text-base transition-colors duration-300 ${isOpen ? 'text-white' : 'text-[#2D3E50]'}`}>
              Core Jobs {job.number} – {job.title}
            </span>
          </div>
        </div>
        <i className={`fas fa-chevron-down text-[#FFAC33] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
        <div className="px-6 py-5 bg-[#FFF9F3] border-t border-[#FFAC33]/20">
          <p className="text-[#66545E] text-sm italic mb-4 leading-relaxed">{job.tagline}</p>
          <p className="text-xs font-bold text-[#2D3E50] uppercase tracking-widest mb-3">Roles include:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {job.roles.map((role, i) => (
              <div key={i} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-[#FFAC33]/20">
                <span className="w-2 h-2 bg-[#FFAC33] rounded-full shrink-0"></span>
                <span className="text-gray-700 text-sm">{role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Page ───────────────────────────────────────────────────────
export default function CompanyPage() {
  const [openJob, setOpenJob] = useState(null)

  const [whyRef,      whyVisible]      = useReveal()
  const [coreRef,     coreVisible]     = useReveal()
  const [whoRef,      whoVisible]      = useReveal()
  const [indRef,      indVisible]      = useReveal()
  const [stepsRef,    stepsVisible]    = useReveal()

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* ── Hero — title only ── */}
      <section className="bg-[#FFAC33] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#2D3E50] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            For Startups & Small Businesses · Mumbai
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] font-poppins leading-tight">
            🤝 Join Us in Supporting Freshers and Persons with Benchmark Disabilities
          </h1>
        </div>
      </section>

      {/* ── Intro + CTA below hero ── */}
      <section className="py-12 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
            At Mumbai121.com, we connect startups and small businesses in Mumbai Metropolitan Region with
            freshers and persons with benchmark disabilities (PwBD).
          </p>
          <p className="text-[#2D3E50] font-bold text-lg mb-2">
            Our complete service is 100% FREE for employers and candidates.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            You don't pay anything — no listing fees, no commissions, no subscriptions.
          </p>
          
          <a  href="#companyForm"
            className="inline-block bg-[#2D3E50] hover:bg-[#FFAC33] hover:text-[#2D3E50] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
          >
            Register Your Company <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </section>

      {/* ── Why Register — UNIQUE UI: horizontal banner cards ── */}
      <section ref={whyRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              🌟 Why Register Your Company?
            </h2>
            <div className="flex justify-center mb-2">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>

          <div className="space-y-4">
            {whyRegister.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-5 bg-white rounded-2xl px-6 py-5 border-l-4 border-[#FFAC33] shadow-sm hover:shadow-md hover:translate-x-2 transition-all duration-300 ${
                  whyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Emoji badge */}
                <div className="text-3xl shrink-0 w-12 text-center">{item.icon}</div>
                {/* Divider */}
                <div className="w-px h-10 bg-[#FFAC33]/30 shrink-0"></div>
                {/* Text */}
                <div>
                  <p className="font-bold text-[#2D3E50] text-sm font-poppins mb-0.5">{item.title}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
                {/* Check */}
                <i className="fas fa-check text-[#FFAC33] ml-auto shrink-0 text-lg"></i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Jobs Accordion ── */}
      <section ref={coreRef} className="py-14 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${coreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block bg-[#2D3E50] text-[#FFAC33] text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
              6 Categories
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-3 font-poppins">
              🧠 Who Can You Hire?
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <div className="max-w-2xl mx-auto bg-[#FFF9F3] rounded-2xl px-7 py-5 border border-[#FFAC33]/30 text-left shadow-sm">
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                We help you recruit for entry-level roles from a pool of fresh graduates and PwBD candidates
                <span className="text-[#66545E] italic"> (PwBD candidates may be either freshers or experienced)</span> —
                across <strong className="text-[#2D3E50]">six high-demand Core Job categories</strong>.
              </p>
              <div className="flex items-start gap-2 bg-white rounded-xl px-4 py-3 border border-[#FFAC33]/20">
                <i className="fas fa-lightbulb text-[#FFAC33] mt-0.5 shrink-0"></i>
                <p className="text-[#2D3E50] font-semibold text-sm">
                  Select the Core Job category that matches your hiring need and we will match the right candidates for you.
                </p>
              </div>
            </div>
          </div>

          <div className={`space-y-3 transition-all duration-700 ${coreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {coreJobs.map((job, i) => (
              <AccordionItem
                key={job.number}
                job={job}
                isOpen={openJob === i}
                onToggle={() => setOpenJob(openJob === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Who Can Register — UNIQUE UI: tag-style cards ── */}
      <section ref={whoRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${whoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              Who Can Register?
            </h2>
            <div className="flex justify-center mb-2">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whoCanRegister.map((w, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-5 flex items-center gap-4 border border-transparent hover:border-[#FFAC33] hover:shadow-lg transition-all duration-300 group ${
                  whoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Square icon badge — different from circles */}
                <div className="w-12 h-12 bg-[#2D3E50] group-hover:bg-[#FFAC33] rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300">
                  <i className={`fas ${w.icon} text-[#FFAC33] group-hover:text-[#2D3E50] text-lg transition-colors duration-300`}></i>
                </div>
                <p className="text-[#2D3E50] font-semibold text-sm leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries We Serve — UNIQUE UI: pill tags ── */}
      <section ref={indRef} className="py-14 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${indVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              Industries We Serve
            </h2>
            <div className="flex justify-center mb-2">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>

          {/* Pill tag layout — totally different from grid cards */}
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 bg-[#FFF9F3] border-2 border-[#FFAC33]/20 hover:border-[#FFAC33] hover:bg-[#FFAC33] hover:text-[#2D3E50] text-[#2D3E50] px-5 py-3 rounded-full cursor-default transition-all duration-300 group ${
                  indVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <i className={`fas ${ind.icon} text-[#FFAC33] group-hover:text-[#2D3E50] text-sm transition-colors duration-300`}></i>
                <span className="font-semibold text-sm">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works — UNIQUE UI: timeline style ── */}
      <section ref={stepsRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-3xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              📝 How to Share Your Hiring Needs
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm max-w-xl mx-auto">
              To get started, complete the form below. Once your requirements are reviewed and approved,
              we will email you suitable candidate profiles with contact details.
            </p>
          </div>

          {/* Vertical timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#FFAC33]/30 hidden sm:block"></div>

            <div className="space-y-6">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-6 transition-all duration-700 ${
                    stepsVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                  }`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {/* Step icon — diamond shape different from circles */}
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 bg-[#2D3E50] rounded-2xl rotate-45 flex items-center justify-center shadow-md z-10 relative">
                      <i className={`fas ${step.icon} text-[#FFAC33] text-lg -rotate-45`}></i>
                    </div>
                  </div>

                  {/* Content card */}
                  <div className="flex-1 bg-white rounded-2xl p-5 shadow-sm border border-[#FFAC33]/20 hover:border-[#FFAC33] hover:shadow-md transition-all duration-300 mt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-bold text-[#FFAC33] bg-[#2D3E50] px-2 py-1 rounded-full">
                        STEP {step.number}
                      </span>
                      <h3 className="font-bold text-[#2D3E50] font-poppins">{step.title}</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Registration Form ── */}
      <section className="py-14 px-6 md:px-20 bg-white" id="companyForm">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 text-center font-poppins">
            Submit Your Requirement
          </h2>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#FFAC33]/20">
            <CompanyForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}