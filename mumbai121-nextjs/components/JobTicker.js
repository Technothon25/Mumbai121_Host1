'use client'
import { useState } from 'react'
import jobs from '@/data/jobs.json'

export default function JobTicker() {
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    <>
      {/* Ticker Bar */}
<div className="bg-[#FFAC33] px-6 py-3">
  <div className="flex items-stretch bg-white border-2 border-[#2D3E50] rounded-xl overflow-hidden shadow-md max-w-5xl mx-auto">

    {/* Badge */}
    <div className="bg-[#2D3E50] text-white font-bold text-sm px-6 py-3 flex items-center shrink-0">
      JOB NEWS
    </div>

    {/* Scrolling Ticker */}
    <div className="overflow-hidden flex-1 flex items-center bg-[#FFF9F3]">
      <div className="flex ticker-animate whitespace-nowrap">
        {[...jobs, ...jobs].map((job, index) => (
          <button
            key={index}
            onClick={() => setSelectedJob(job)}
            className="text-[#2D3E50] text-sm font-medium px-8 hover:text-[#FFAC33] transition-colors duration-300 cursor-pointer shrink-0"
          >
            🔹 {job.title}
          </button>
        ))}
      </div>
    </div>

  </div>
</div>
      {/* Job Popup Modal */}
      {selectedJob && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedJob(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#2D3E50] text-2xl transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Header */}
            <div className="mb-4">
              <span className="bg-[#FFAC33] text-[#2D3E50] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Job Opportunity
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-[#2D3E50] mb-1 leading-snug">
              {selectedJob.title}
            </h2>
            <p className="text-[#AA6F73] font-semibold text-sm mb-4">
              {selectedJob.subtitle}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed mb-5">
              {selectedJob.description}
            </p>

            {/* Vacancies */}
            <div className="bg-[#FFF9F3] border border-[#FFAC33]/30 rounded-lg px-4 py-3 mb-6 flex items-center gap-3">
              <i className="fas fa-users text-[#FFAC33] text-lg"></i>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Vacancies</p>
                <p className="text-[#2D3E50] font-bold text-sm">{selectedJob.vacancies}</p>
              </div>
            </div>

            {/* Apply Button */}
            
            <a  href={selectedJob.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#2D3E50] hover:bg-[#FFAC33] text-white hover:text-[#2D3E50] font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              View Full Details & Apply
              <i className="fas fa-external-link-alt ml-2"></i>
            </a>

          </div>
        </div>
      )}
    </>
  )
}