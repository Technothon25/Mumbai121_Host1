'use client'
import { useState } from 'react'

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL

const jobOptions = [
  'IT Engineer', 'Non-IT Engineer', 'Sales And Marketing',
  'General Roles', 'Accounting, Finance and Purchase', 'Legal'
]

const railwayOptions = ['Central', 'Harbour', 'Western']

export default function CompanyForm() {
  const [formData, setFormData] = useState({
    company: '', contactPerson: '', email: '', whatsapp: '',
    turnover: '', employees: '', product: '', workType: '',
    salary: '', location: '', website: '',
    jobType: '', consent: '', railways: [],
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const whatsappRegex = /^\d{10}$/

  function validate() {
    const e = {}
    if (!formData.company.trim())       e.company = 'Company name is required.'
    if (!formData.contactPerson.trim()) e.contactPerson = 'Contact person name is required.'
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email address.'
    if (!whatsappRegex.test(formData.whatsapp)) e.whatsapp = 'Enter a valid 10-digit WhatsApp number.'
    if (formData.railways.length === 0) e.railways = 'Please select at least one railway line.'
    if (!formData.turnover.trim())      e.turnover = 'Annual turnover is required.'
    if (!formData.employees)            e.employees = 'Total employees is required.'
    if (!formData.product.trim())       e.product = 'Product / Service is required.'
    if (!formData.workType.trim())      e.workType = 'Work description is required.'
    if (!formData.salary)               e.salary = 'Salary is required.'
    if (!formData.location.trim())      e.location = 'Job location is required.'
    if (!formData.jobType)              e.jobType = 'Please select a core job preference.'
    if (!formData.consent)              e.consent = 'Your consent is required.'
    return e
  }

  function handleInput(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  function handleCheckbox(value) {
    setFormData(prev => {
      const updated = prev.railways.includes(value)
        ? prev.railways.filter(v => v !== value)
        : [...prev.railways, value]
      return { ...prev, railways: updated }
    })
    setErrors(prev => ({ ...prev, railways: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/requirements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) setSubmitted(true)
      else alert('Error submitting form. Please try again.')
    } catch {
      alert('Network error. Please check your connection.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check text-green-500 text-3xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-[#2D3E50] mb-2 font-poppins">Thank You!</h2>
        <p className="text-gray-600">Your requirement has been submitted. We'll be in touch soon!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Company Name */}
      <FormField label="Company Name" required error={errors.company}>
        <input name="company" value={formData.company} onChange={handleInput}
          placeholder="Your company name" className={inputClass(errors.company)} />
      </FormField>

      {/* Contact Person */}
      <FormField label="Contact Person Name" required error={errors.contactPerson}>
        <input name="contactPerson" value={formData.contactPerson} onChange={handleInput}
          placeholder="Your answer" className={inputClass(errors.contactPerson)} />
      </FormField>

      {/* Email */}
      <FormField label="Email" required error={errors.email}>
        <input name="email" type="email" value={formData.email} onChange={handleInput}
          placeholder="Your answer" className={inputClass(errors.email)} />
      </FormField>

      {/* WhatsApp */}
      <FormField label="WhatsApp Number" required error={errors.whatsapp}>
        <input name="whatsapp" value={formData.whatsapp} onChange={handleInput}
          placeholder="10-digit number" className={inputClass(errors.whatsapp)} />
      </FormField>

      {/* Railway Lines */}
      <FormField label="Which railway line is your company on?" required error={errors.railways}>
        {railwayOptions.map(line => (
          <label key={line} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
            <input type="checkbox" checked={formData.railways.includes(line)}
              onChange={() => handleCheckbox(line)}
              className="w-5 h-5 accent-[#2D3E50]" />
            <span className="text-gray-700 text-sm">{line}</span>
          </label>
        ))}
      </FormField>

      {/* Annual Turnover */}
      <FormField label="Annual Turnover" required error={errors.turnover}>
        <input name="turnover" value={formData.turnover} onChange={handleInput}
          placeholder="e.g. 50 Lakhs" className={inputClass(errors.turnover)} />
      </FormField>

      {/* Total Employees */}
      <FormField label="Total Employees" required error={errors.employees}>
        <input name="employees" type="number" value={formData.employees} onChange={handleInput}
          placeholder="e.g. 25" className={inputClass(errors.employees)} />
      </FormField>

      {/* Product / Service */}
      <FormField label="Product / Service" required error={errors.product}>
        <input name="product" value={formData.product} onChange={handleInput}
          placeholder="What does your company do?" className={inputClass(errors.product)} />
      </FormField>

      {/* Core Job Preference */}
      <FormField label="Core Job Preference" required error={errors.jobType}>
        {jobOptions.map(opt => (
          <label key={opt} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
            <input type="radio" name="jobType" value={opt}
              checked={formData.jobType === opt}
              onChange={handleInput} className="w-5 h-5 accent-[#2D3E50]" />
            <span className="text-gray-700 text-sm">{opt}</span>
          </label>
        ))}
      </FormField>

      {/* Work Description */}
      <FormField label="Work Description" required error={errors.workType}>
        <input name="workType" value={formData.workType} onChange={handleInput}
          placeholder="Describe the work" className={inputClass(errors.workType)} />
      </FormField>

      {/* Salary */}
      <FormField label="Salary (Monthly)" required error={errors.salary}>
        <input name="salary" type="number" value={formData.salary} onChange={handleInput}
          placeholder="e.g. 15000" className={inputClass(errors.salary)} />
      </FormField>

      {/* Job Location */}
      <FormField label="Job Location" required error={errors.location}>
        <input name="location" value={formData.location} onChange={handleInput}
          placeholder="e.g. Andheri, Mumbai" className={inputClass(errors.location)} />
      </FormField>

      {/* Website (optional) */}
      <FormField label="Company's Official Website Link (if any)" error={errors.website}>
        <input name="website" value={formData.website} onChange={handleInput}
          placeholder="https://yourcompany.com" className={inputClass(errors.website)} />
      </FormField>

      {/* Consent */}
      <FormField label="By continuing, you agree to our disclaimer and give your consent for the use of your data." required error={errors.consent}>
        <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
          <input type="radio" name="consent" value="Yes"
            checked={formData.consent === 'Yes'}
            onChange={handleInput} className="w-5 h-5 accent-[#2D3E50]" />
          <span className="text-gray-700 text-sm">Yes</span>
        </label>
      </FormField>

      {/* Submit */}
      <button type="submit" disabled={loading}
        className="w-full bg-[#2D3E50] hover:bg-[#FFAC33] hover:text-[#2D3E50] text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg">
        {loading ? 'Submitting...' : 'Submit Requirement'}
        <i className="fas fa-arrow-right ml-2"></i>
      </button>

    </form>
  )
}

function FormField({ label, required, error, children }) {
  return (
    <div className={`bg-[#faf9f7] rounded-xl p-5 border ${error ? 'border-red-300' : 'border-[#e8e8e8]'}`}>
      <label className="block text-sm font-medium text-[#3c4043] mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <div className="mt-2 text-red-600 text-xs bg-red-50 border-l-4 border-red-500 px-3 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  )
}

function inputClass(error) {
  return `w-full px-4 py-3 border ${error ? 'border-red-400' : 'border-[#dadce0]'} rounded-lg text-sm bg-white focus:outline-none focus:border-[#FFAC33] focus:ring-1 focus:ring-[#FFAC33] transition-colors`
}