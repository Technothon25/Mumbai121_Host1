'use client'
import { useEffect, useRef, useState } from 'react'

const FETCH_FROM_DB = true
const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || ''

// Static fallback list (same as original — used when DB fetch is off or fails)
const STATIC_COMPANIES = [
  { name: 'TechNova Solutions', type: 'IT & Software', icon: 'fa-laptop-code', employees: '10-50' },
  { name: 'GreenBridge Ventures', type: 'Sustainability', icon: 'fa-leaf', employees: '5-20' },
  { name: 'UrbanCraft Designs', type: 'Design & Creative', icon: 'fa-paint-brush', employees: '10-30' },
  { name: 'SwiftLogix', type: 'Logistics & Supply', icon: 'fa-truck', employees: '20-80' },
  { name: 'MediAssist Startup', type: 'Healthcare', icon: 'fa-heartbeat', employees: '5-25' },
  { name: 'EduSpark India', type: 'EdTech', icon: 'fa-graduation-cap', employees: '10-40' },
  { name: 'FinEdge Advisory', type: 'Finance & Accounting', icon: 'fa-chart-line', employees: '5-15' },
  { name: 'BuildNext Infra', type: 'Construction', icon: 'fa-hard-hat', employees: '50-200' },
  { name: 'CloudPeak Technologies', type: 'Cloud & SaaS', icon: 'fa-cloud', employees: '15-60' },
  { name: 'RetailRush Mumbai', type: 'Retail & E-Commerce', icon: 'fa-shopping-bag', employees: '10-50' },
  { name: 'FoodieBox Pvt Ltd', type: 'Food & Beverage', icon: 'fa-utensils', employees: '5-30' },
  { name: 'MediaMint Studios', type: 'Media & Marketing', icon: 'fa-bullhorn', employees: '10-35' },
]

export default function CompaniesShowcase() {
  const [isVisible, setIsVisible] = useState(false)
  const [companies, setCompanies] = useState(STATIC_COMPANIES)
  const [companyCount, setCompanyCount] = useState('...')
  const [candidateCount, setCandidateCount] = useState('...')
  const ref = useRef(null)

  // Intersection observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Fetch live stats from backend
  useEffect(() => {
    if (!BACKEND) return
    fetch(`${BACKEND}/stats`)
      .then(res => res.json())
      .then(data => {
        setCompanyCount((data.companies || 0) + '+')
        setCandidateCount(((data.freshers || 0) + (data.pwbd || 0)) + '+')
      })
      .catch(() => {})
  }, [])

  // Fetch from MongoDB API if enabled
  useEffect(() => {
    if (!FETCH_FROM_DB) return
    if (!BACKEND) return
    fetch(`${BACKEND}/companies`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge DB names/types with static icons/employees by position
          const merged = data.slice(0, STATIC_COMPANIES.length).map((dbCompany, i) => ({
            name: dbCompany.company || STATIC_COMPANIES[i].name,
            type: dbCompany.jobPreference || STATIC_COMPANIES[i].type,
            icon: STATIC_COMPANIES[i].icon,
            employees: dbCompany.employees || STATIC_COMPANIES[i].employees,
          }))
          setCompanies(merged)
        }
      })
      .catch(() => {
        // Silently fall back to static list on error
      })
  }, [])

  return (
    <section ref={ref} className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="bg-[#FFAC33]/20 text-[#2D3E50] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            Our Network
          </span>
          <h2 className="text-3xl font-bold text-[#2D3E50] mt-4 mb-3 font-poppins">
            Companies Registered With Us
          </h2>
          <p className="text-[#66545E] text-base max-w-xl mx-auto">
            These startups and small businesses trust Mumbai121 to find their next great hire — 100% free.
          </p>
        </div>

        {/* Company Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {companies.map((company, index) => (
            <div
              key={index}
              className={`bg-[#FFF9F3] border border-[#FFAC33]/20 rounded-2xl p-5 text-center
                hover:shadow-lg hover:border-[#FFAC33] hover:-translate-y-1
                transition-all duration-300 group
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-[#2D3E50] group-hover:bg-[#FFAC33] rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <i className={`fas ${company.icon} text-[#FFAC33] group-hover:text-[#2D3E50] text-xl transition-colors duration-300`}></i>
              </div>

              {/* Company Name */}
              <h3 className="font-bold text-[#2D3E50] text-sm mb-1 font-poppins leading-tight">
                {company.name}
              </h3>

              {/* Type Badge */}
              <span className="inline-block bg-[#AA6F73]/15 text-[#66545E] text-xs px-2 py-1 rounded-full font-medium mb-2">
                {company.type}
              </span>

              {/* Employees */}
              <p className="text-xs text-gray-400 flex items-center justify-center gap-1 mt-1">
                <i className="fas fa-users text-[#FFAC33]"></i>
                {company.employees} employees
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-12 grid grid-cols-3 gap-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { number: companyCount, label: 'Companies Registered', icon: 'fa-building' },
            { number: candidateCount, label: 'Total Candidates', icon: 'fa-users' },
            { number: '100%', label: 'Free for Everyone', icon: 'fa-heart' },
          ].map((stat, i) => (
            <div key={i} className="bg-[#2D3E50] rounded-2xl p-6 text-center text-white">
              <i className={`fas ${stat.icon} text-[#FFAC33] text-2xl mb-2`}></i>
              <p className="text-3xl font-bold font-poppins">{stat.number}</p>
              <p className="text-xs text-gray-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}