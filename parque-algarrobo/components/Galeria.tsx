'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const IMAGES = Array.from({ length: 24 }, (_, i) => ({
  src: `/galeria/galeria-${i + 1}.jpg`,
  alt: `Parque Algarrobo — foto ${i + 1}`,
}))

export default function Galeria() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? 0 : (i + 1) % IMAGES.length))
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? 0 : (i - 1 + IMAGES.length) % IMAGES.length))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex])

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <section id="galeria" className="flex flex-col md:flex-row" style={{ lineHeight: 0 }}>

      {/* Franja superior (mobile) / Panel izquierdo (desktop) */}
      <div className="w-full h-32 md:w-1/4 md:h-auto flex-shrink-0 relative overflow-hidden">
        <Image
          src="/galeria/galeria-5.jpg"
          alt="Galería fondo"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h2
            className="italic text-white"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
              lineHeight: 1.1,
            }}
          >
            Galería
          </h2>
          <div className="w-10 h-px mx-auto hidden md:block" style={{ backgroundColor: 'rgba(255,255,255,0.5)', marginTop: '1.5rem', marginBottom: '1.5rem' }} />
          <p
            className="italic font-light text-sm leading-relaxed hidden md:block"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'rgba(255,255,255,0.75)' }}
          >
            Una mirada a las parcelas
          </p>
        </div>
      </div>

      {/* Grid de fotos */}
      <div
        className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
        style={{ gridAutoRows: '170px' }}
      >
        {IMAGES.map((img, idx) => (
          <div
            key={img.src}
            className="relative cursor-pointer overflow-hidden group"
            onClick={() => setLightboxIndex(idx)}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading={idx < 8 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.92)', animation: 'fade-in 0.2s ease' }}
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={IMAGES[lightboxIndex].src}
              alt={IMAGES[lightboxIndex].alt}
              width={1200}
              height={800}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white hover:opacity-70 transition-opacity"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? 0 : (i - 1 + IMAGES.length) % IMAGES.length)) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => (i === null ? 0 : (i + 1) % IMAGES.length)) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:opacity-70 transition-opacity"
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
            {lightboxIndex + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </section>
  )
}
