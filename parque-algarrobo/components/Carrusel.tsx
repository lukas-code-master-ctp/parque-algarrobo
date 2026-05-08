'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const SLIDES = [
  { src: '/carrusel/10.png', alt: 'Parque Algarrobo — vista 1' },
  { src: '/carrusel/11.png', alt: 'Parque Algarrobo — vista 2' },
  { src: '/carrusel/12.png', alt: 'Parque Algarrobo — vista 3' },
  { src: '/carrusel/13.png', alt: 'Parque Algarrobo — vista 4' },
  { src: '/carrusel/14.png', alt: 'Parque Algarrobo — vista 5' },
]

export default function Carrusel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="carrusel" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div
          className="relative overflow-hidden"
          style={{ height: 'clamp(320px, 55vh, 520px)', backgroundColor: 'var(--color-dark)' }}
        >
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.src}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{ opacity: idx === current ? 1 : 0 }}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                style={idx === current ? { animation: 'ken-burns 6s ease-out forwards' } : undefined}
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}

          {/* Flechas */}
          <button
            onClick={() => setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:opacity-70 transition-opacity"
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => setCurrent((i) => (i + 1) % SLIDES.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:opacity-70 transition-opacity"
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                aria-label={`Ir a slide ${idx + 1}`}
                className="h-1.5 rounded-full transition-all duration-300 bg-white"
                style={{ width: idx === current ? '2rem' : '0.5rem', opacity: idx === current ? 1 : 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
