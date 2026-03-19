'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/',                      label: 'HOME' },
  { href: '/fresher',               label: 'FRESHER' },
  { href: '/pwbd',                  label: 'PwBD' },
  { href: '/company',               label: 'COMPANY' },
  { href: '/volunteer',             label: 'VOLUNTEER' },
  { href: '/donor',                 label: 'DONOR' },
  { href: '/about',                 label: 'ABOUT US' },
  { href: '/faq',                   label: "FAQ'S" },
  { href: '/interview-questions',   label: 'INTERVIEW Q\'S' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-2 flex justify-between items-center">

        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/mumbai121_logo.png"
            alt="Mumbai121"
            width={200}
            height={60}
            className="h-14 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-bold text-sm px-4 py-6 inline-block transition-colors duration-300 hover:text-[#FFAC33]
                ${pathname === link.href ? 'text-[#FFAC33]' : 'text-[#2D3E50]'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-[#2D3E50] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-5 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block font-bold text-sm py-3 border-b border-gray-50 transition-colors duration-300 hover:text-[#FFAC33]
                ${pathname === link.href ? 'text-[#FFAC33]' : 'text-[#2D3E50]'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}