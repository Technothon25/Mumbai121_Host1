'use client'
import { useState } from 'react'

const BACKEND = 'http://localhost:5000'

const whoOptions = [
  { value: 'Fresher', label: 'Jobseeker (Fresher Candidate)' },
  { value: 'PwBD', label: 'Jobseeker (PwBD Candidate)' },
  { value: 'Company', label: 'Employer/Company' },
  { value: 'Volunteer', label: 'Volunteer/Mentor' },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    who: '', name: '', email: '', whatsapp: '', message: '', consent: ''
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const whatsappRegex = /^\d{10}$/

  function validate() {
    const e = {}
    if (!formData.who)                  e.who = 'Please select who you are.'
    if (!formData.name.trim())          e.name = 'Full name is required.'
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email address.'
    if (!whatsappRegex.test(formData.whatsapp)) e.whatsapp = 'Enter a valid 10-digit WhatsApp number.'
    if (!formData.message.trim())       e.message = 'Please enter your message.'
    if (!formData.consent)              e.consent = 'Your consent is required.'
    return e
  }

  function handleInput(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
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
      const res = await fetch(`${BACKEND}/contact`, {
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
        <p className="text-gray-600">Your message has been submitted. We'll get back to you soon!</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Who Are You */}
      <FormField label="Who Are You?" required error={errors.who}>
        {whoOptions.map(opt => (
          <label key={opt.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
            <input type="radio" name="who" value={opt.value}
              checked={formData.who === opt.value}
              onChange={handleInput} className="w-5 h-5 accent-[#2D3E50]" />
            <span className="text-gray-700 text-sm">{opt.label}</span>
          </label>
        ))}
      </FormField>

      {/* Full Name */}
      <FormField label="Full Name" required error={errors.name}>
        <input name="name" value={formData.name} onChange={handleInput}
          placeholder="Your answer" className={inputClass(errors.name)} />
      </FormField>

      {/* Email */}
      <FormField label="Email Address" required error={errors.email}>
        <input name="email" type="email" value={formData.email} onChange={handleInput}
          placeholder="Your answer" className={inputClass(errors.email)} />
      </FormField>

      {/* WhatsApp */}
      <FormField label="WhatsApp Number" required error={errors.whatsapp}>
        <input name="whatsapp" value={formData.whatsapp} onChange={handleInput}
          placeholder="10-digit number" className={inputClass(errors.whatsapp)} />
      </FormField>

      {/* Message */}
      <FormField label="Message / Query" required error={errors.message}>
        <textarea name="message" value={formData.message} onChange={handleInput}
          placeholder="Type your message here..."
          rows={4}
          className={`w-full px-4 py-3 border ${errors.message ? 'border-red-400' : 'border-[#dadce0]'} rounded-lg text-sm bg-white focus:outline-none focus:border-[#FFAC33] focus:ring-1 focus:ring-[#FFAC33] transition-colors resize-none`} />
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
        {loading ? 'Submitting...' : 'Send Message'}
        <i className="fas fa-paper-plane ml-2"></i>
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