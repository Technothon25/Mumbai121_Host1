import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us | Mumbai121',
  description: 'Get in touch with the Mumbai121 team.',
}

const contactInfo = [
  { icon: 'fa-whatsapp',        label: 'WhatsApp', value: '+91-8082275000',             href: 'https://wa.me/918082275000' },
  { icon: 'fa-clock',           label: 'Timings',  value: 'Monday to Friday, 02:00 PM – 03:00 PM', href: null },
  { icon: 'fa-envelope',        label: 'Email',    value: 'mumbai121.com@gmail.com',    href: 'mailto:mumbai121.com@gmail.com' },
  { icon: 'fa-globe',           label: 'Website',  value: 'www.mumbai121.com',          href: 'https://www.mumbai121.com' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-[#FFAC33] py-10 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-[#2D3E50] text-white text-xs font-bold px-4 py-2 rounded-full mb-4 uppercase tracking-widest">
            Get In Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D3E50] font-poppins">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Intro below hero */}
      <section className="py-8 px-6 bg-[#FFF9F3] text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-1">
            We're here to help you grow. Whether you're a jobseeker looking for your first opportunity
            or a company seeking enthusiastic freshers or PwBD talent — let's connect!
          </p>
        </div>
      </section>

      {/* Contact Info + Quick Links */}
      <section className="py-14 px-6 md:px-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left — Contact Details */}
          <div>
            <h2 className="text-2xl font-bold text-[#2D3E50] mb-4 font-poppins">
              Reach Us At
            </h2>
            <div className="h-1 w-16 bg-[#FFAC33] rounded-full mb-8"></div>

            <div className="space-y-5">
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-[#FFAC33]/20 hover:border-[#FFAC33] hover:shadow-md transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-[#2D3E50] rounded-full flex items-center justify-center shrink-0">
                    <i className={`fas ${info.icon} text-[#FFAC33] text-lg`}></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{info.label}</p>
                    {info.href ? (
                      
                  <a      href={info.href}
                        className="text-[#2D3E50] font-semibold text-sm hover:text-[#FFAC33] transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-[#2D3E50] font-semibold text-sm">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <p className="text-[#2D3E50] font-bold mb-4">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: 'fa-facebook-f',  href: '#' },
                  { icon: 'fa-instagram',   href: '#' },
                  { icon: 'fa-linkedin-in', href: '#' },
                  { icon: 'fa-twitter',     href: '#' },
                ].map((s, i) => (
                  
                <a    key={i}
                    href={s.href}
                    className="w-10 h-10 bg-[#2D3E50] hover:bg-[#FFAC33] rounded-full flex items-center justify-center transition-colors duration-300"
                  >
                    <i className={`fab ${s.icon} text-white text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Quick Links */}
          <div>
            <h2 className="text-2xl font-bold text-[#2D3E50] mb-4 font-poppins">
              Quick Links
            </h2>
            <div className="h-1 w-16 bg-[#FFAC33] rounded-full mb-8"></div>

            <div className="space-y-4">
              {[
                { href: '/fresher',   icon: 'fa-graduation-cap',  label: 'Register as Fresher',   desc: 'Start your job search today' },
                { href: '/pwbd',      icon: 'fa-universal-access', label: 'Register as PwBD',      desc: 'Inclusive opportunities for all' },
                { href: '/company',   icon: 'fa-building',         label: 'Register your Company', desc: 'Find the right talent for free' },
                { href: '/volunteer', icon: 'fa-hands-helping',    label: 'Become a Volunteer',    desc: "Make a difference in someone's life" },
                { href: '/donor',     icon: 'fa-heart',            label: 'Donate to Mumbai121',   desc: 'Support our free platform' },
              ].map((link, i) => (
               <a 
                  key={i}
                  href={link.href}
                  className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#FFAC33]/20 hover:border-[#FFAC33] hover:shadow-md hover:-translate-x-1 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 bg-[#2D3E50] group-hover:bg-[#FFAC33] rounded-full flex items-center justify-center shrink-0 transition-colors duration-300">
                    <i className={`fas ${link.icon} text-[#FFAC33] group-hover:text-[#2D3E50] text-sm transition-colors duration-300`}></i>
                  </div>
                  <div>
                    <p className="font-bold text-[#2D3E50] text-sm">{link.label}</p>
                    <p className="text-gray-500 text-xs">{link.desc}</p>
                  </div>
                  <i className="fas fa-chevron-right text-[#FFAC33] text-xs ml-auto"></i>
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>
      {/* Contact Form */}
      <section className="py-14 px-6 md:px-20 bg-[#f9ebdc]" id="contactForm">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] mb-2 text-center font-poppins">
            Send Us a Message
          </h2>
          <div className="flex justify-center mb-8">
            <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}