'use client'
import { useState, useEffect, useRef } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// ── QUESTION BANK ──────────────────────────────────────────────────
const QUESTIONS = {
  'IT Engineering': [
    'Can you explain the difference between object-oriented and procedural programming?',
    'What is the Software Development Life Cycle (SDLC) and which models have you studied?',
    'How do you approach debugging a piece of code that isn\'t working as expected?',
    'What is the difference between a process and a thread?',
    'Can you explain REST APIs and how they work?',
    'How do you ensure the security of an application you\'ve built or studied?',
    'What is version control and how does Git work?',
    'What is the difference between SQL and NoSQL databases?',
    'What is cloud computing and can you name any cloud platforms?',
    'Can you explain what agile methodology is and how it works in a team?',
    'What are design patterns and can you name a few?',
    'How do you stay updated with new technologies and programming languages?',
    'What is the difference between frontend and backend development?',
  ],
  'Non-IT Engineering': [
    'Walk us through a project you worked on during your studies — what was your role?',
    'How do you read and interpret engineering drawings or schematics?',
    'What safety standards or compliance norms are you familiar with in your field?',
    'How would you approach troubleshooting a machine or system that has stopped functioning?',
    'What software tools have you used — AutoCAD, MATLAB, SolidWorks, or others?',
    'Can you explain the difference between tensile strength and compressive strength?',
    'What do you understand by quality control and quality assurance?',
    'What are the most common causes of equipment failure and how do you prevent them?',
    'How would you estimate the cost of a small engineering project?',
    'What is the difference between preventive maintenance and corrective maintenance?',
    'How do you document your work and maintain engineering records?',
    'Describe a situation where you had to work under pressure to meet a technical deadline.',
  ],
  'Sales & Marketing': [
    'How would you explain a product or service to a customer who has never heard of it?',
    'What strategies would you use to find and approach new potential customers?',
    'How do you handle rejection from a client or prospect?',
    'What do you understand by the term \'sales funnel\' and how does it work?',
    'How do you build and maintain long-term relationships with clients?',
    'What is digital marketing and which channels do you think are most effective?',
    'How would you respond if a customer complains about a product or service?',
    'What is the difference between B2B and B2C sales?',
    'How do you research a competitor before approaching a shared customer?',
    'What role does social media play in marketing today?',
    'How do you stay motivated when sales targets are not being met?',
    'What tools would you use for tracking leads and customer interactions?',
  ],
  'Accounting, Finance & Purchase': [
    'Can you explain the difference between accounts payable and accounts receivable?',
    'What do you understand by the term \'reconciliation\' and why is it important?',
    'What does a balance sheet tell us about a company?',
    'What is the difference between cash accounting and accrual accounting?',
    'Have you worked with any accounting software such as Tally, Zoho Books, or QuickBooks?',
    'What is GST and how does it apply to business transactions in India?',
    'How would you handle a discrepancy you found in a financial report?',
    'What is a purchase order and what is the typical purchase process in a company?',
    'What is TDS (Tax Deducted at Source) and how is it calculated?',
    'What is the difference between gross profit and net profit?',
    'How do you manage vendor relationships to ensure timely delivery?',
    'What checks do you perform before approving a payment to a vendor?',
  ],
  'General Roles': [
    'Tell us about yourself and why you are interested in this role.',
    'How do you manage your time when you have multiple tasks to complete in a day?',
    'How do you handle a difficult or angry customer or colleague professionally?',
    'What computer applications are you comfortable using?',
    'How do you ensure accuracy in your work, especially when doing repetitive tasks?',
    'Describe a time you went above and beyond what was expected of you.',
    'How do you respond when you are given feedback or asked to redo a task?',
    'What does good customer service mean to you?',
    'How do you stay organised and on top of your responsibilities during a busy day?',
    'What do you do when you do not understand an instruction given to you?',
    'How do you handle confidential or sensitive information?',
    'Where do you see yourself growing in this role over the next 1–2 years?',
  ],
  'Legal Roles': [
    'What areas of law are you most familiar with and why?',
    'How do you approach reviewing and drafting a contract or legal agreement?',
    'What is the difference between civil law and criminal law?',
    'How do you stay updated with changes in legislation and case law?',
    'What do you understand by the term \'due diligence\' in a legal context?',
    'How would you handle a situation where a client\'s request conflicts with legal obligations?',
    'What is your experience with legal documentation, filing, and record management?',
    'Can you explain what an affidavit is and when it is used?',
    'What do you understand by intellectual property and the different types it includes?',
    'How do you simplify complex legal language for a client who is not from a legal background?',
    'What is the role of mediation and arbitration as alternatives to court proceedings?',
    'Have you had any exposure to labour laws, consumer protection laws, or company law in India?',
  ],
}

const UNIVERSAL = [
  'Tell us about yourself and why you are interested in this role.',
  'What do you know about our company and why do you want to work here?',
  'What are your key strengths and how will they help you in this role?',
  'What is your biggest weakness and what are you doing to improve it?',
  'Where do you see yourself professionally in the next 2–3 years?',
  'Describe a situation where you had to work under pressure to meet a deadline.',
  'Tell us about a time you made a mistake. What did you learn from it?',
  'How do you prioritise your tasks when you have multiple things to do at the same time?',
  'Describe a time you worked as part of a team. What was your contribution?',
  'How do you handle criticism or negative feedback from a manager or senior?',
  'Have you ever had a disagreement with a colleague? How did you resolve it?',
  'What motivates you to give your best at work every day?',
  'Are you open to learning new skills on the job? Give an example of something new you learned recently.',
  'What does professionalism mean to you in a workplace setting?',
  'Do you have any questions for us?',
  'How do you handle a situation where you disagree with your manager\'s decision?',
  'Describe a time you took initiative without being asked. What was the outcome?',
  'How do you adapt when there is a sudden change in your work or plans?',
  'What does success mean to you personally and professionally?',
  'How do you ensure the quality of your work before submitting or presenting it?',
  'Tell us about a goal you set for yourself and how you achieved it.',
  'How do you handle situations where you have to do repetitive or monotonous work?',
  'Have you ever had to learn something very quickly due to an urgent requirement? How?',
  'How do you maintain a positive attitude during stressful or challenging times?',
  'What steps do you take when you do not understand a task or instruction?',
  'What do you do to continuously improve yourself — personally or professionally?',
  'How important is punctuality and discipline to you and how do you practise it?',
  'If you were given a task you have never done before with no guidance, how would you approach it?',
]

const CATEGORIES = [
  { key: 'IT Engineering',                   icon: 'fa-laptop-code',    label: 'IT Engineering' },
  { key: 'Non-IT Engineering',               icon: 'fa-cogs',           label: 'Non-IT Engineering' },
  { key: 'Sales & Marketing',                icon: 'fa-chart-line',     label: 'Sales & Marketing' },
  { key: 'Accounting, Finance & Purchase',   icon: 'fa-rupee-sign',     label: 'Accounting & Finance' },
  { key: 'General Roles',                    icon: 'fa-briefcase',      label: 'General Roles' },
  { key: 'Legal Roles',                      icon: 'fa-balance-scale',  label: 'Legal Roles' },
]


function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function InterviewQuestionsPage() {
  // screens: 'setup' | 'questions' | 'loading' | 'results'
  const [screen, setScreen] = useState('setup')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedQuestions, setSelectedQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [evaluations, setEvaluations] = useState([])
  const [unansweredWarning, setUnansweredWarning] = useState(false)

  // Speech recognition
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)
  const finalTranscriptRef = useRef('')

  useEffect(() => {
    const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)
    if (!SR) return
    const rec = new SR()
    rec.continuous = true
    rec.interimResults = true
    rec.lang = 'en-IN'
    rec.onresult = (event) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscriptRef.current += (finalTranscriptRef.current ? ' ' : '') + t
        } else {
          interim += t
        }
      }
      setAnswers(prev => {
        const updated = [...prev]
        updated[currentIndex] = finalTranscriptRef.current + (interim ? ' ' + interim : '')
        return updated
      })
    }
    rec.onerror = (e) => {
      if (e.error === 'not-allowed') alert('Microphone access was denied. Please allow it in browser settings.')
      setIsListening(false)
    }
    rec.onend = () => {
      if (recognitionRef.current?._shouldRestart) {
        try { rec.start() } catch (_) { setIsListening(false) }
      }
    }
    recognitionRef.current = rec
  }, [currentIndex])

  function startTest() {
    if (!selectedCategory) return
    const catQ = shuffle(QUESTIONS[selectedCategory]).slice(0, 4)
    const univQ = shuffle(UNIVERSAL).slice(0, 4)
    const qs = shuffle([...catQ, ...univQ])
    setSelectedQuestions(qs)
    setAnswers(new Array(qs.length).fill(''))
    setCurrentIndex(0)
    setScreen('questions')
  }

  function saveAnswer(value) {
    setAnswers(prev => {
      const updated = [...prev]
      updated[currentIndex] = value
      return updated
    })
  }

  function goNext() {
    const current = answers[currentIndex] || ''
    if (!current.trim()) { setUnansweredWarning(true); return }
    setUnansweredWarning(false)
    stopMic()
    finalTranscriptRef.current = ''
    setCurrentIndex(i => i + 1)
  }

  function goPrev() {
    setUnansweredWarning(false)
    stopMic()
    finalTranscriptRef.current = ''
    setCurrentIndex(i => i - 1)
  }

  async function submitTest() {
    const current = answers[currentIndex] || ''
    if (!current.trim()) { setUnansweredWarning(true); return }
    const unanswered = answers.findIndex(a => !a?.trim())
    if (unanswered !== -1) {
      stopMic()
      setCurrentIndex(unanswered)
      setUnansweredWarning(true)
      return
    }
    stopMic()
    setScreen('loading')
    try {
      const results = await evaluateWithGemini()
      setEvaluations(results)
      setScreen('results')
    } catch (err) {
      setScreen('questions')
      alert('Something went wrong contacting Gemini AI. Please try again.\n\nError: ' + err.message)
    }
  }

  async function evaluateWithGemini() {
    // API key is securely stored on the server — never exposed to the browser
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questions: selectedQuestions,
        answers,
        category: selectedCategory,
      }),
    })
    if (!response.ok) {
      const err = await response.json()
      throw new Error(err?.error || `HTTP ${response.status}`)
    }
    const parsed = await response.json()
    if (!parsed.evaluations || !Array.isArray(parsed.evaluations)) throw new Error('Unexpected format. Please try again.')
    return parsed.evaluations
  }

  function toggleMic() {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.')
      return
    }
    if (isListening) stopMic()
    else startMic()
  }

  function startMic() {
    finalTranscriptRef.current = (answers[currentIndex] || '').trim()
    recognitionRef.current._shouldRestart = true
    try { recognitionRef.current.start(); setIsListening(true) } catch (_) {}
  }

  function stopMic() {
    if (recognitionRef.current) {
      recognitionRef.current._shouldRestart = false
      try { recognitionRef.current.abort() } catch (_) {}
    }
    setIsListening(false)
  }

  function resetTest() {
    setSelectedCategory(null)
    setSelectedQuestions([])
    setAnswers([])
    setCurrentIndex(0)
    setEvaluations([])
    setUnansweredWarning(false)
    setScreen('setup')
  }

  const total = selectedQuestions.length

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#FFAC33] py-12 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#2D3E50] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            AI-Powered Practice
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] font-poppins leading-tight">
            Interview Practice Test
          </h1>
        </div>
      </section>

      <main className="flex-1 py-10 px-4">
        <div className="max-w-3xl mx-auto">

          {/* ── SETUP SCREEN ── */}
          {screen === 'setup' && (
            <div>
              {/* How it works */}
              <div className="bg-[#faf9f7] rounded-2xl p-6 border border-[#e8e8e8] mb-8">
                <h2 className="font-bold text-[#2D3E50] font-poppins text-lg mb-3">How it works</h2>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    ['fa-list-ol',       'Choose a job category below'],
                    ['fa-question-circle','Answer 8 random interview questions'],
                    ['fa-microphone',    'Type your answer or click the mic to speak'],
                    ['fa-robot',         'Gemini AI evaluates each answer and gives you a score & feedback'],
                  ].map(([icon, text]) => (
                    <li key={icon} className="flex items-center gap-3">
                      <i className={`fas ${icon} text-[#FFAC33] w-5 text-center`}></i>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <h2 className="font-bold text-[#2D3E50] font-poppins text-xl mb-1">Choose a Category</h2>
              <p className="text-gray-500 text-sm mb-5">Select the job category you want to practice for</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`rounded-xl p-6 text-center border-2 transition-all duration-200 cursor-pointer
                      ${selectedCategory === cat.key
                        ? 'bg-[#2D3E50] border-[#2D3E50] text-white'
                        : 'bg-white border-[#e8e8e8] text-[#2d3e50] hover:border-[#FFAC33] hover:-translate-y-1 hover:shadow-lg'
                      }`}
                  >
                    <i className={`fas ${cat.icon} text-[#FFAC33] text-3xl block mb-3`}></i>
                    <h3 className="font-semibold text-sm font-poppins">{cat.label}</h3>
                  </button>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={startTest}
                  disabled={!selectedCategory}
                  className="bg-[#2D3E50] hover:bg-[#1a2535] text-white font-bold px-10 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none font-poppins"
                >
                  <i className="fas fa-play mr-2"></i>Start Test
                </button>
              </div>
            </div>
          )}

          {/* ── QUESTIONS SCREEN ── */}
          {screen === 'questions' && (
            <div>
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-medium">Your Progress</span>
                  <span className="text-xs font-bold text-[#2D3E50]">{currentIndex + 1} / {total}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${((currentIndex + 1) / total) * 100}%`, background: 'linear-gradient(90deg, #FFAC33, #ff8c00)' }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white rounded-2xl p-7 shadow-md border-l-4 border-[#FFAC33] mb-6">
                <p className="text-xs font-bold text-[#FFAC33] uppercase tracking-widest mb-2">
                  Question {currentIndex + 1} of {total}
                </p>
                <p className="text-base md:text-lg font-semibold text-[#2D3E50] font-poppins leading-relaxed mb-5">
                  {selectedQuestions[currentIndex]}
                </p>

                {/* Textarea + Mic */}
                <div className="relative">
                  <textarea
                    className={`w-full min-h-[110px] p-4 pr-14 border-2 rounded-xl text-sm font-roboto resize-y leading-relaxed text-gray-700 focus:outline-none transition-colors
                      ${isListening ? 'border-red-400 ring-2 ring-red-100' : 'border-[#dadce0] focus:border-[#2D3E50]'}`}
                    placeholder="Type your answer here, or click the mic button to speak your answer..."
                    value={answers[currentIndex] || ''}
                    onChange={e => { saveAnswer(e.target.value); setUnansweredWarning(false) }}
                  />
                  <button
                    onClick={toggleMic}
                    title="Click to speak your answer"
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200
                      ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 text-gray-500 hover:bg-[#2D3E50] hover:text-white'}`}
                  >
                    <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'} text-sm`}></i>
                  </button>
                </div>

                <p className={`text-xs mt-2 flex items-center gap-1 ${isListening ? 'text-red-500 font-medium' : 'text-gray-400'}`}>
                  <i className={`fas ${isListening ? 'fa-circle' : 'fa-info-circle'}`}></i>
                  {isListening ? 'Listening... Speak now. Click mic to stop.' : 'Click the mic icon to speak your answer'}
                </p>

                {unansweredWarning && (
                  <div className="mt-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs px-3 py-2 rounded">
                    <i className="fas fa-exclamation-triangle mr-1"></i>
                    Please write at least a brief answer before continuing.
                  </div>
                )}
              </div>

              {/* Nav Buttons */}
              <div className="flex justify-between items-center gap-3">
                {currentIndex > 0 ? (
                  <button onClick={goPrev} className="bg-gray-100 hover:bg-gray-200 text-[#2D3E50] font-semibold px-6 py-3 rounded-xl transition-all font-poppins">
                    <i className="fas fa-arrow-left mr-2"></i>Previous
                  </button>
                ) : <div />}

                {currentIndex < total - 1 ? (
                  <button onClick={goNext} className="ml-auto bg-[#FFAC33] hover:bg-[#e09520] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 font-poppins">
                    Next <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                ) : (
                  <button onClick={submitTest} className="ml-auto bg-[#2D3E50] hover:bg-[#1a2535] text-white font-semibold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 font-poppins">
                    <i className="fas fa-paper-plane mr-2"></i>Submit &amp; Get Score
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── LOADING SCREEN ── */}
          {screen === 'loading' && (
            <div className="text-center py-20">
              <div className="w-14 h-14 border-4 border-gray-200 border-t-[#FFAC33] rounded-full animate-spin mx-auto mb-5"></div>
              <p className="font-bold text-[#2D3E50] text-lg font-poppins mb-2">Evaluating your answers...</p>
              <p className="text-gray-500 text-sm">Gemini AI is reviewing your responses. This takes about 10–15 seconds.</p>
            </div>
          )}

          {/* ── RESULTS SCREEN ── */}
          {screen === 'results' && (() => {
            const totalScore = evaluations.reduce((s, e) => s + e.score, 0)
            const maxScore = evaluations.length * 10
            const pct = (totalScore / maxScore) * 100
            const remark = pct >= 80 ? '🌟 Excellent! You are interview-ready.'
              : pct >= 60 ? '👍 Good performance! A bit more practice will help.'
              : pct >= 40 ? '📚 Fair attempt. Keep practising and improving.'
              : '💪 Needs improvement. Review the feedback and try again!'

            return (
              <div>
                {/* Score Banner */}
                <div className="bg-gradient-to-br from-[#2D3E50] to-[#3d5166] text-white rounded-2xl p-8 text-center mb-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFAC33]/10 rounded-full -translate-y-10 translate-x-10 pointer-events-none" />
                  <h2 className="font-poppins text-xl font-bold mb-4 opacity-90">Your Interview Score</h2>
                  <div className="w-28 h-28 rounded-full border-4 border-[#FFAC33] bg-white/10 mx-auto flex flex-col items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-[#FFAC33] font-poppins leading-none">{totalScore}</span>
                    <span className="text-xs opacity-60">/ {maxScore}</span>
                  </div>
                  <p className="text-base opacity-85 font-medium">{remark}</p>
                </div>

                {/* Result Cards */}
                <div className="space-y-4 mb-8">
                  {evaluations.map((ev, i) => {
                    const grade = ev.score >= 7 ? 'good' : ev.score >= 4 ? 'average' : 'poor'
                    const borderColor = grade === 'good' ? 'border-green-500' : grade === 'average' ? 'border-[#FFAC33]' : 'border-red-500'
                    const badgeBg = grade === 'good' ? 'bg-green-50 text-green-600' : grade === 'average' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    return (
                      <div key={i} className={`bg-white rounded-2xl p-6 shadow-sm border-l-4 ${borderColor}`}>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Question {i + 1}</p>
                        <p className="font-semibold text-[#2D3E50] font-poppins text-sm mb-3">{selectedQuestions[i]}</p>
                        <div className="bg-gray-50 rounded-lg px-4 py-3 text-sm text-gray-600 mb-3 leading-relaxed">
                          <span className="font-semibold text-[#2D3E50]">Your answer:</span> {answers[i] || <em>No answer provided</em>}
                        </div>
                        <div className="flex items-start gap-3">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm font-poppins shrink-0 ${badgeBg}`}>
                            {ev.score}/10
                          </div>
                          <div className="text-sm text-gray-600 leading-relaxed">
                            <span className="font-semibold text-[#2D3E50] block mb-1 text-xs">Feedback:</span>
                            {ev.feedback}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Retry */}
                <div className="text-center">
                  <button
                    onClick={resetTest}
                    className="bg-[#FFAC33] hover:bg-[#e09520] text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg font-poppins"
                  >
                    <i className="fas fa-redo mr-2"></i>Try Another Test
                  </button>
                </div>
              </div>
            )
          })()}

        </div>
      </main>

      <Footer />
    </div>
  )
}