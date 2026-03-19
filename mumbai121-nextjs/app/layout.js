import { Roboto, Poppins } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Mumbai121 | Free Jobs for Freshers & PwBD in Mumbai Startups',
  description: 'Connect fresh graduates and PwBD with Small companies and Startups in Mumbai.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FFAC33" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mumbai121" />
        <link rel="apple-touch-icon" href="/images/icon-192.png" />
      </head>
      <body className={`${roboto.variable} ${poppins.variable}`}>

        {children}

        {/* ── Capture beforeinstallprompt IMMEDIATELY — before any component mounts ── */}
        <Script
          id="pwa-install-capture"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.__pwaInstallPrompt = null;
              window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                window.__pwaInstallPrompt = e;
                console.log('✅ PWA install prompt captured globally');
                // Dispatch custom event so download page can react
                window.dispatchEvent(new Event('pwaPromptReady'));
              });
            `,
          }}
        />

        {/* ── Service Worker Registration ── */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/service-worker.js')
                    .then(reg => {
                      console.log('SW registered:', reg.scope)
                      reg.update()
                    })
                    .catch(err => console.log('SW failed:', err))
                })
              }
            `,
          }}
        />

        {/* ── Sienna Accessibility Plugin ── */}
        <Script
          src="https://cdn.jsdelivr.net/npm/sienna-accessibility@latest/dist/sienna-accessibility.umd.js"
          strategy="afterInteractive"
        />

        {/* ── Botpress Chatbot ── */}
        <Script
          src="https://cdn.botpress.cloud/webchat/v3.5/inject.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://files.bpcontent.cloud/2026/02/09/12/20260209122847-D7RILG8S.js"
          strategy="afterInteractive"
        />

      </body>
    </html>
  )
}