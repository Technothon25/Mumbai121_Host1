import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-lg">

          {/* 404 Number */}
          <div className="relative mb-6">
            <p className="text-9xl font-bold text-[#FFAC33] opacity-20 select-none">
              404
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-[#2D3E50] rounded-full flex items-center justify-center shadow-xl">
                <i className="fas fa-search text-[#FFAC33] text-3xl"></i>
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#2D3E50] mb-4 font-poppins">
            Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Oops! The page you are looking for does not exist or has been moved.
          </p>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { href: '/',          icon: 'fa-home',            label: 'Home' },
              { href: '/fresher',   icon: 'fa-graduation-cap',  label: 'Fresher' },
              { href: '/company',   icon: 'fa-building',        label: 'Company' },
              { href: '/contact',   icon: 'fa-envelope',        label: 'Contact' },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="flex items-center gap-3 bg-white border border-[#FFAC33]/20 hover:border-[#FFAC33] rounded-xl p-4 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-8 h-8 bg-[#2D3E50] group-hover:bg-[#FFAC33] rounded-full flex items-center justify-center shrink-0 transition-colors duration-300">
                  <i className={`fas ${link.icon} text-[#FFAC33] group-hover:text-[#2D3E50] text-xs transition-colors duration-300`}></i>
                </div>
                <span className="font-semibold text-[#2D3E50] text-sm">{link.label}</span>
              </Link>
            ))}
          </div>

          <Link
            href="/"
            className="inline-block bg-[#2D3E50] hover:bg-[#FFAC33] text-white hover:text-[#2D3E50] font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Back to Home
            <i className="fas fa-arrow-right ml-2"></i>
          </Link>

        </div>
      </section>

      <Footer />
    </div>
  )
}