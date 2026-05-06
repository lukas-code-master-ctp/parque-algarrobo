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
    <section id="carrusel" className="relative w-full overflow-hidden" style={{ height: 'clamp(320px, 60vh, 600px)', backgroundColor: 'var(--color-dark)' }}>
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
    </section>
  )
}
