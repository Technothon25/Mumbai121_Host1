'use client'
import { useState, useRef } from 'react'


const BACKEND_RESUME = 'http://localhost:8000'

const jobOptions = [
  'IT Engineer', 'Non-IT Engineer', 'Sales And Marketing',
  'General Roles', 'Accounting, Finance and Purchase', 'Legal'
]

export default function FresherForm() {
  const [formData, setFormData] = useState({
    fullName: '', email: '', whatsapp: '',
    college: '', course: '', year: '',
    skills: '', mmrResident: '', jobPreference: '',
    consent: '', railwayPreference: [],
  })
  const [resumeFile, setResumeFile] = useState(null)
  const [fileName, setFileName] = useState('No file chosen')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const whatsappRegex = /^\d{10}$/

  function validate() {
    const e = {}
    if (!formData.fullName.trim())           e.fullName = 'Full name is required.'
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Enter a valid email address.'
    if (!whatsappRegex.test(formData.whatsapp)) e.whatsapp = 'Enter a valid 10-digit WhatsApp number.'
    if (formData.railwayPreference.length === 0) e.railway = 'Please select at least one railway line.'
    if (!formData.college.trim())            e.college = 'College name is required.'
    if (!formData.course.trim())             e.course = 'Course is required.'
    if (!formData.year || formData.year < 1970 || formData.year > 2030) e.year = 'Year must be between 1970 and 2030.'
    if (!formData.jobPreference)             e.jobPreference = 'Please select a core job preference.'
    if (!formData.skills.trim())             e.skills = 'Skills are required.'
    if (!resumeFile)                         e.resume = 'Please upload your resume in PDF format (max 5MB).'
    if (!formData.mmrResident)               e.mmrResident = 'Please select Yes or No.'
    if (!formData.consent)                   e.consent = 'Your consent is required before submitting the form.'
    return e
  }

  function handleInput(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  function handleCheckbox(value) {
    setFormData(prev => {
      const updated = prev.railwayPreference.includes(value)
        ? prev.railwayPreference.filter(v => v !== value)
        : [...prev.railwayPreference, value]
      return { ...prev, railwayPreference: updated }
    })
    setErrors(prev => ({ ...prev, railway: '' }))
  }

  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    if (file.type !== 'application/pdf') {
      setErrors(prev => ({ ...prev, resume: 'Only PDF files are allowed.' }))
      setFileName('Invalid file type')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, resume: 'File size must be less than 5MB.' }))
      setFileName('File too large')
      return
    }
    setResumeFile(file)
    setFileName(file.name)
    setErrors(prev => ({ ...prev, resume: '' }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setUploading(true)

    const fd = new FormData()
    fd.append('fullName', formData.fullName)
    fd.append('email', formData.email)
    fd.append('whatsapp', formData.whatsapp)
    fd.append('railwayPreference', JSON.stringify(formData.railwayPreference))
    fd.append('college', formData.college)
    fd.append('course', formData.course)
    fd.append('year', formData.year)
    fd.append('jobPreference', formData.jobPreference)
    fd.append('skills', formData.skills)
    fd.append('mmrResident', formData.mmrResident)
    fd.append('consent', formData.consent)
    fd.append('resume', resumeFile)

    const xhr = new XMLHttpRequest()
    xhr.upload.addEventListener('progress', (ev) => {
      if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100))
    })
    xhr.addEventListener('load', () => {
      if (xhr.status === 201) setSubmitted(true)
      else alert('Error submitting form. Please try again.')
      setUploading(false)
    })
    xhr.addEventListener('error', () => {
      alert('Network error. Please check your connection.')
      setUploading(false)
    })
    xhr.open('POST', `${BACKEND_RESUME}/register/fresher`)
    xhr.send(fd)
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check text-green-500 text-3xl"></i>
        </div>
        <h2 className="text-2xl font-bold text-[#2D3E50] mb-2 font-poppins">Thank You!</h2>
        <p className="text-gray-600">Your response has been submitted and recorded.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Full Name */}
      <FormField label="Full Name" required error={errors.fullName}>
        <input name="fullName" value={formData.fullName} onChange={handleInput}
          placeholder="Your answer" className={inputClass(errors.fullName)} />
      </FormField>

      {/* Email */}
      <FormField label="Email ID" required error={errors.email}>
        <input name="email" type="email" value={formData.email} onChange={handleInput}
          placeholder="Your answer" className={inputClass(errors.email)} />
      </FormField>

      {/* WhatsApp */}
      <FormField label="WhatsApp Number" required error={errors.whatsapp}>
        <input name="whatsapp" value={formData.whatsapp} onChange={handleInput}
          placeholder="10-digit number" className={inputClass(errors.whatsapp)} />
      </FormField>

      {/* Railway Lines */}
      <FormField label="Which railway line(s) would you prefer to work on?" required error={errors.railway}>
        {['Central Line', 'Harbour Line', 'Western Line'].map(line => (
          <label key={line} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
            <input type="checkbox" checked={formData.railwayPreference.includes(line)}
              onChange={() => handleCheckbox(line)}
              className="w-5 h-5 accent-[#2D3E50]" />
            <span className="text-gray-700 text-sm">{line}</span>
          </label>
        ))}
      </FormField>

      {/* College */}
      <FormField label="College Name" required error={errors.college}>
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

      {/* Job Preference */}
      <FormField label="Core Job Preference" required error={errors.jobPreference}>
        {jobOptions.map(opt => (
          <label key={opt} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
            <input type="radio" name="jobPreference" value={opt}
              checked={formData.jobPreference === opt}
              onChange={handleInput} className="w-5 h-5 accent-[#2D3E50]" />
            <span className="text-gray-700 text-sm">{opt}</span>
          </label>
        ))}
      </FormField>

      {/* Skills */}
      <FormField label="Key Skills" required error={errors.skills}>
        <input name="skills" value={formData.skills} onChange={handleInput}
          className={inputClass(errors.skills)} />
      </FormField>

      {/* Resume Upload */}
      <FormField label="Upload Resume (PDF only)" required error={errors.resume}>
        <label className="flex items-center gap-3 border-2 border-dashed border-[#FFAC33]/50 rounded-xl p-4 cursor-pointer hover:border-[#FFAC33] transition-colors">
          <div className="w-10 h-10 bg-[#2D3E50] rounded-full flex items-center justify-center shrink-0">
            <i className="fas fa-upload text-[#FFAC33] text-sm"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-[#2D3E50]">{fileName}</p>
            <p className="text-xs text-gray-400">PDF only, max 5MB</p>
          </div>
          <input type="file" accept=".pdf" onChange={handleFile} className="hidden" />
        </label>
      </FormField>

      {/* MMR */}
      <FormField label="Were you born in / do you live in Mumbai Metropolitan Region (MMR)?" required error={errors.mmrResident}>
        {['Yes', 'No'].map(opt => (
          <label key={opt} className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#FFAC33]/10 cursor-pointer">
            <input type="radio" name="mmrResident" value={opt}
              checked={formData.mmrResident === opt}
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

      {/* Progress Bar */}
      {uploading && (
        <div className="bg-gray-100 rounded-full h-4 overflow-hidden">
          <div className="bg-green-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          <p className="text-center text-xs mt-1 text-gray-500">Uploading: {progress}%</p>
        </div>
      )}

      {/* Submit Button */}
      <button type="submit" disabled={uploading}
        className="w-full bg-[#2D3E50] hover:bg-[#FFAC33] hover:text-[#2D3E50] text-white font-bold py-4 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-lg">
        {uploading ? 'Uploading...' : 'Submit Registration'}
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