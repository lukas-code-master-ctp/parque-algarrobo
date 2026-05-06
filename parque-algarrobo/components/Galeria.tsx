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
    <section id="galeria" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gold)' }}>
            Imágenes
          </p>
          <h2 className="italic text-6xl md:text-7xl" style={{ fontFamily: 'var(--font-cormorant), serif', color: 'var(--color-dark)' }}>
            Galería
          </h2>
          <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: 'var(--color-gold)' }} />
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {IMAGES.map((img, idx) => (
            <div
              key={img.src}
              className="break-inside-avoid cursor-pointer overflow-hidden group"
              onClick={() => setLightboxIndex(idx)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.9)', animation: 'fade-in 0.2s ease' }}
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
