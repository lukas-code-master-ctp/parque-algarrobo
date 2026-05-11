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
  title: 'Parque Algarrobo — Parcelas en la naturaleza | Algarrobo, Chile',
  description:
    'Parque Algarrobo: parcelas exclusivas desde 5 hectáreas en Algarrobo, Región de Valparaíso. A 100 km de Santiago, 20 min del mar. Rol propio, entrega inmediata, alta plusvalía. Invierte en naturaleza.',
  keywords: [
    'parcelas Algarrobo',
    'parcelas Chile',
    'parcelas quinta región',
    'parcelación Algarrobo',
    'parcelas cerca del mar',
    'inversión inmobiliaria Chile',
    'parcelas con rol propio',
    'parcelas Valparaíso',
    'terrenos Algarrobo',
    'Parque Algarrobo',
  ],
  authors: [{ name: 'Parque Algarrobo' }],
  creator: 'Parque Algarrobo',
  publisher: 'Parque Algarrobo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.parquealgarrobo.cl',
  },
  openGraph: {
    title: 'Parque Algarrobo — Parcelas exclusivas cerca del mar',
    description:
      'Parcelas desde 5 hectáreas en Algarrobo, a 100 km de Santiago y 20 min del mar. Rol propio, accesos ejecutados, entrega inmediata.',
    url: 'https://www.parquealgarrobo.cl',
    siteName: 'Parque Algarrobo',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: 'https://www.parquealgarrobo.cl/galeria/galeria-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Parque Algarrobo — Parcelas en la naturaleza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parque Algarrobo — Parcelas exclusivas cerca del mar',
    description:
      'Parcelas desde 5 hectáreas en Algarrobo, a 100 km de Santiago y 20 min del mar.',
    images: ['https://www.parquealgarrobo.cl/galeria/galeria-1.jpg'],
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
