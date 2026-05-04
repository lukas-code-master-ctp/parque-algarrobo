import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

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
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="antialiased" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
