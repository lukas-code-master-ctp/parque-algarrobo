import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

// Amsterdam One se carga via @font-face en globals.css

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Parque Algarrobo — Parcelas en la naturaleza',
  description:
    'Proyecto de parcelación en Algarrobo, Chile. Parcelas desde 500 m² con todos los servicios, a 100 km de Santiago.',
  openGraph: {
    title: 'Parque Algarrobo',
    description: 'Parcelas en la naturaleza, cerca del mar.',
    url: 'https://parquealgarrobo.cl',
    siteName: 'Parque Algarrobo',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={montserrat.variable}
    >
      <body className="antialiased" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
