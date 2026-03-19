import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#2D3E50] text-white text-center py-5 px-4 mt-0">
      <p className="text-sm">
        Copyright © 2026 |{' '}
        <Link href="/" className="font-bold hover:text-[#FFAC33] transition-colors">
          Mumbai121
        </Link>{' '}
        |{' '}
        <Link href="/disclaimer" className="font-bold hover:text-[#FFAC33] transition-colors">
          Disclaimer
        </Link>{' '}
        |{' '}
        <Link href="/contact" className="font-bold hover:text-[#FFAC33] transition-colors">
          Contact Us
        </Link>{' '}
        |{' '}
        <Link href="/download" className="font-bold hover:text-[#FFAC33] transition-colors">
          Download the App
        </Link>
      </p>
    </footer>
  )
}
