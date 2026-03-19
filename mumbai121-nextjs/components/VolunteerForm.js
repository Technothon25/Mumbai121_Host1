'use client'
import { useState } from 'react'

const BACKEND = 'http://localhost:8000'

const disabilityOptions = [
  { value: 'None', label: 'None' },
  { value: 'VI', label: 'VI - Visual Impairment' },
  { value: 'HI', label: 'HI - Hearing Impairment' },
  { value: 'OC', label: 'OC - Locomotor Disability' },
  { value: 'ID', label: 'ID - Autism, Intellectual/Learning Disabilities' },
  { value: 'MD', label: 'MD - Multiple Disabilities' },
]

const railwayOptions = ['Central', 'Harbour', 'Western', 'Work From Home']

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '',
    college: '', course: '', year: '',
    skills: '', mmr: '', disability: '',
    consent: '', railways: [],
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const whatsappRegex = /^\d{10}$/

  function validate() {
    const e = {}
    if (!formData.name.trim())          e.name = 'Full name is required.'
    if (!formData.disability)           e.disability = 'Please select your disability status.'
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email address.'
    if (!whatsappRegex.test(formData.whatsapp)) e.whatsapp = 'Enter a valid 10-digit WhatsApp number.'
    if (formData.railways.length === 0) e.railways = 'Please select at least one option.'
    if (!formData.skills.trim())        e.skills = 'Skills are required.'
    if (!formData.college.trim())       e.college = 'College name is required.'
    if (!formData.course.trim())        e.course = 'Course is required.'
    if (!formData.year || formData.year < 1970 || formData.year > 2030) e.year = 'Year must be between 1970 and 2030.'
    if (!formData.mmr)                  e.mmr = 'Please select Yes or No.'
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
      const res = await fetch(`${BACKEND}/register/volunteer`, {
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
        <p className="text-gray-600">Your volunteer registration has been submitted.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Full Name */}
      <FormField label="Full Name" required error={errors.name}>
        <input name="name" value={formData.name} onChange={handleInput}
          placeholder="Your answer" className={inputClass(errors.name)} />
      </FormField>

      {/* Disability */}
      <FormField label="Disability" required error={errors.disability}>
        {disabilityOptions.map(opt => (
          <label key={opt.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
            <input type="radio" name="disability" value={opt.value}
              checked={formData.disability === opt.value}
              onChange={handleInput} className="w-5 h-5 accent-[#2D3E50]" />
            <span className="text-gray-700 text-sm">{opt.label}</span>
          </label>
        ))}
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
      <FormField label="Railway Preference" required error={errors.railways}>
        {railwayOptions.map(line => (
          <label key={line} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
            <input type="checkbox" checked={formData.railways.includes(line)}
              onChange={() => handleCheckbox(line)}
              className="w-5 h-5 accent-[#2D3E50]" />
            <span className="text-gray-700 text-sm">
              {line === 'Work From Home' ? 'I would prefer to work from home' : line}
            </span>
          </label>
        ))}
      </FormField>

      {/* Key Skills */}
      <FormField label="Key Skills" required error={errors.skills}>
        <input name="skills" value={formData.skills} onChange={handleInput}
          placeholder="e.g. Communication, Teaching, Tech" className={inputClass(errors.skills)} />
      </FormField>

      {/* College */}
      <FormField label="College" required error={errors.college}>
        <input name="college" value={formData.college} onChange={handleInput}
          className={inputClass(errors.college)} />
      </FormField>

      {/* Course */}
      <FormField label="Course" required error={errors.course}>
        <input name="course" value={formData.course} onChange={handleInput}
          className={inputClass(errors.course)} />
      </FormField>

      {/* Year of Passing */}
      <FormField label="Year Of Passing" required error={errors.year}>
        <input name="year" type="number" min="1970" max="2030"
          value={formData.year} onChange={handleInput}
          className={inputClass(errors.year)} />
      </FormField>

      {/* MMR */}
      <FormField label="Were you born in / do you live in Mumbai Metropolitan Region (MMR)?" required error={errors.mmr}>
        {['Yes', 'No'].map(opt => (
          <label key={opt} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
            <input type="radio" name="mmr" value={opt}
              checked={formData.mmr === opt}
              onChange={handleInput} className="w-5 h-5 accent-[#2D3E50]" />
            <span className="text-gray-700 text-sm">{opt}</span>
          </label>
        ))}
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
        {loading ? 'Submitting...' : 'Submit Registration'}
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