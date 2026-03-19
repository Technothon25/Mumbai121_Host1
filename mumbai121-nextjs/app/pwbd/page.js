'use client'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PwBDForm from '@/components/PwBDForm'
import Link from 'next/link'

// ── Scroll reveal hook ──────────────────────────────────────────────
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

// ── Core Jobs (same as fresher — exact PDF data) ────────────────────
const coreJobs = [
  {
    number: '1', title: 'IT Related', emoji: '💻',
    tagline: 'Kickstart your journey in tech! Perfect for those with computer science, IT, or coding skills.',
    roles: ['Software Developer', 'Web Developer', 'QA / Software Tester', 'IT Support', 'Network Admin', 'Technical Support Executive'],
  },
  {
    number: '2', title: 'Non-IT related', emoji: '⚙️',
    tagline: 'Engineers – this is your space! Join growing firms in core sectors.',
    roles: ['Production Engineer', 'Quality Control / Assurance Engineer', 'Design Engineer (AutoCAD / SolidWorks)', 'Maintenance Engineer', 'Site Engineer', 'Service Engineer'],
  },
  {
    number: '3', title: 'Sales & Marketing', emoji: '📣',
    tagline: 'Have a flair for communication and persuasion? These roles offer rapid growth and visibility.',
    roles: ['Digital Marketing Executive', 'Sales Executive', 'Business Development Associate', 'Customer Acquisition Associate', 'Telecalling / Cold Calling Executive', 'SEO / SEM Assistant', 'Social Media Executive'],
  },
  {
    number: '4', title: 'General Roles', emoji: '🗂️',
    tagline: 'Support the heart of business operations. Ideal for graduates from any stream.',
    roles: ['Data Entry', 'Admin Executive', 'General Management Trainee', 'Executive Assistant', "Founder's Office Intern / Executive", 'Operations Assistant', 'Front Office Executive', 'Customer Support Executive', 'Customer Service Representative'],
  },
  {
    number: '5', title: 'Accounting, Finance & Purchase', emoji: '💰',
    tagline: 'Step into the world of business numbers and financial processes.',
    roles: ['Finance Associates', 'Accounting Interns', 'Accounts Payable Specialists', 'Financial Analysts', 'Purchase Officer', 'Tender Executive'],
  },
  {
    number: '6', title: 'Legal Roles', emoji: '⚖️',
    tagline: 'Law graduates and compliance enthusiasts – find your space in legal-first support roles.',
    roles: ['Legal cum Admin Executive', 'Junior Legal Officer', 'Legal & Compliance Executive', 'Documentation & Legal Support Executive', 'Tender Executive'],
  },
]

// ── Why Small Company (exact from PDF) ─────────────────────────────
const whySmall = [
  { icon: 'fa-hands-helping',   text: 'Inclusive culture – Many are flexible and open to creating accommodating roles' },
  { icon: 'fa-user-friends',    text: 'Individual attention – Easier to build direct relationships with team leaders' },
  { icon: 'fa-rocket',          text: 'Faster growth – Skills and efforts are quickly recognized' },
  { icon: 'fa-puzzle-piece',    text: 'Customized roles – Possibilities of tailoring work to your strengths' },
  { icon: 'fa-brain',           text: 'Broader learning – Chance to explore multiple skills and functions' },
]

// ── Why Choose Mumbai121 for PwBD (exact from PDF) ─────────────────
const whyUs = [
  { text: 'Dedicated opportunities for persons with benchmark disabilities' },
  { text: 'Inclusive and verified small companies / startups' },
  { text: 'Roles designed for skill, not stereotype' },
  { text: 'Support in building confidence and showcasing your talent' },
  { text: 'Mentors to guide you, make you industry-ready, and prepare you for interviews' },
]

// ── Who Is This For (ORIGINAL — kept as is) ────────────────────────
const disabilities = [
  { icon: 'fa-eye-slash',       label: 'Visual Impairment' },
  { icon: 'fa-deaf',            label: 'Hearing Impairment' },
  { icon: 'fa-wheelchair',      label: 'Locomotor Disability' },
  { icon: 'fa-brain',           label: 'Intellectual Disability' },
  { icon: 'fa-ribbon',          label: 'Multiple Disabilities' },
  { icon: 'fa-notes-medical',   label: 'Other Benchmark Disabilities' },
]

// ── Know Your Rights (ORIGINAL — kept as is) ───────────────────────
const rights = [
  'Right to equal opportunity in employment',
  'Protection against discrimination at workplace',
  'Right to reasonable accommodation from employers',
  '3% reservation in government jobs under RPwD Act 2016',
  'Right to accessible workplace and infrastructure',
]

// ── How It Works (ORIGINAL — kept as is) ──────────────────────────
const steps = [
  { number: '01', title: 'Register',       desc: 'Fill the simple registration form with your details and disability certificate info.' },
  { number: '02', title: 'Profile Setup',  desc: 'Our team helps set up your profile and understands your job preferences.' },
  { number: '03', title: 'Job Matching',   desc: 'We match you with inclusive employers who value your skills and abilities.' },
  { number: '04', title: 'Get Placed',     desc: 'Attend interviews with full support from our team and start your career!' },
]

// ── Accordion Item (same as fresher) ───────────────────────────────
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
export default function PwBDPage() {
  const [openJob, setOpenJob] = useState(null)

  const [whyRef,    whyVisible]    = useReveal()
  const [whoRef,    whoVisible]    = useReveal()
  const [coreRef,   coreVisible]   = useReveal()
  const [chooseRef, chooseVisible] = useReveal()
  const [rightsRef, rightsVisible] = useReveal()
  const [stepsRef,  stepsVisible]  = useReveal()

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* ── Hero Banner — title only ── */}
      <section className="bg-[#FFAC33] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#2D3E50] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            Inclusive Opportunities · Mumbai Metropolitan Region
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] font-poppins leading-tight">
            Empowering Your Career Journey With Dignity and Support 
          </h1>
        </div>
      </section>

      {/* ── Intro text + CTA below hero ── */}
      <section className="py-12 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
            Are you a person with benchmark disability (PwBD) looking for job opportunities in the Mumbai
            Metropolitan Region? Mumbai121.com is committed to connecting you with small companies and
            startups that recognize talent beyond barriers.
          </p>
          <p className="text-[#2D3E50] font-semibold text-base mb-8">
            Simply register with us once — and we'll do the rest by applying on your behalf.
          </p>
          <a
            href="#pwbdForm"
            className="inline-block bg-[#2D3E50] hover:bg-[#FFAC33] hover:text-[#2D3E50] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg"
          >
            Register Now <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </section>

      {/* ── Who Is This For (ORIGINAL — unchanged) ── */}
      <section ref={whoRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-5xl mx-auto">
          <div className={`transition-all duration-700 ${whoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 text-center font-poppins">
              Who Is This For?
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              This platform is open to all persons with benchmark disabilities as defined under the Rights of Persons with Disabilities Act, 2016.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {disabilities.map((d, i) => (
                <div key={i} className="bg-[#FFF9F3] border border-[#FFAC33]/20 rounded-2xl p-5 text-center hover:border-[#FFAC33] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#2D3E50] group-hover:bg-[#FFAC33] rounded-full flex items-center justify-center mx-auto mb-3 transition-colors duration-300">
                    <i className={`fas ${d.icon} text-[#FFAC33] group-hover:text-[#2D3E50] text-lg transition-colors duration-300`}></i>
                  </div>
                  <p className="text-[#2D3E50] font-semibold text-xs leading-tight">{d.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Small Company (from PDF) ── */}
      <section ref={whyRef} className="py-14 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              🤝 Why Work with a Small Company or Startup?
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Small companies and startups can offer unique advantages for PwBD professionals:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whySmall.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 bg-[#FFF9F3] p-5 rounded-2xl border border-[#FFAC33]/20 hover:border-[#FFAC33] hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 bg-[#2D3E50] rounded-full flex items-center justify-center shrink-0">
                  <i className={`fas ${item.icon} text-[#FFAC33] text-sm`}></i>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Jobs Accordion (from PDF) ── */}
      <section ref={coreRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${coreVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-block bg-[#2D3E50] text-[#FFAC33] text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
              6 Categories
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-3 font-poppins">
              Core Jobs
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl px-7 py-5 border border-[#FFAC33]/30 text-left shadow-sm">
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                We have carefully grouped major job roles into <strong className="text-[#2D3E50]">six Core Job categories</strong> based on high industry demand.
                These roles are consistently in demand across companies, increasing your chances of quick recruitment.
                Core Jobs are long-term career options — many professionals continue in these roles right up to retirement.
              </p>
              <div className="flex items-start gap-2 bg-[#f9ebdc] rounded-xl px-4 py-3">
                <i className="fas fa-lightbulb text-[#FFAC33] mt-0.5 shrink-0"></i>
                <p className="text-[#2D3E50] font-semibold text-sm">
                  When you select a Core Job, your work profile will typically include one or more of the roles listed under that category.
                </p>
              </div>
            </div>
          </div>

          {/* Accordion */}
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

      {/* ── Why Choose Mumbai121 for PwBD (from PDF) ── */}
      <section ref={chooseRef} className="py-14 px-6 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${chooseVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              💼 Why Choose Mumbai121 for PwBD Jobs?
            </h2>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyUs.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-4 bg-[#FFF9F3] p-5 rounded-2xl border border-[#FFAC33]/20 hover:border-[#FFAC33] hover:shadow-md transition-all duration-300 ${chooseVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <i className="fas fa-check-circle text-[#FFAC33] text-xl shrink-0 mt-0.5"></i>
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Know Your Rights (ORIGINAL — unchanged) ── */}
      <section ref={rightsRef} className="py-14 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-700 ${rightsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 text-center font-poppins">
              Know Your Rights
            </h2>
            <div className="flex justify-center mb-8">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <div className="bg-white border border-[#FFAC33]/20 rounded-2xl p-8">
              <ul className="space-y-4">
                {rights.map((right, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-[#FFAC33] rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <i className="fas fa-check text-white text-xs"></i>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{right}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works (ORIGINAL — unchanged) ── */}
      <section ref={stepsRef} className="py-14 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className={`text-center mb-10 transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 font-poppins">
              How It Works
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`text-center group transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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
      <section className="py-14 px-6 md:px-20 bg-[#f9ebdc]" id="pwbdForm">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 text-center font-poppins">
            Register as PwBD
          </h2>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-[#FFAC33]/20">
            <PwBDForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}