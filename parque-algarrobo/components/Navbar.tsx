'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Parcelas', href: '#parcelas' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Plano', href: '#plano' },
  { label: 'Ubicación', href: '#ubicacion' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none" style={{ transform: 'translateY(-4px)' }}>
          <span
            className="font-bold tracking-[0.2em] text-xs uppercase transition-colors"
            style={{
              fontFamily: 'var(--font-montserrat), sans-serif',
              color: scrolled ? 'var(--color-dark)' : 'white',
            }}
          >
            PARQUE
          </span>
          <span
            className="italic leading-none transition-colors"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              color: scrolled ? 'var(--color-dark)' : 'white',
              fontSize: '1rem',
            }}
          >
            Algarrobo
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-light tracking-wide transition-colors hover:opacity-70"
              style={{
                fontFamily: 'var(--font-montserrat), sans-serif',
                color: scrolled ? 'var(--color-dark)' : 'white',
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="ml-4 px-5 py-2 border text-sm font-light tracking-wider transition-all hover:opacity-80"
            style={{
              fontFamily: 'var(--font-montserrat), sans-serif',
              borderColor: scrolled ? 'var(--color-dark)' : 'white',
              color: scrolled ? 'var(--color-dark)' : 'white',
            }}
          >
            Contáctanos
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            style={{ backgroundColor: scrolled ? 'var(--color-dark)' : 'white' }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
            style={{ backgroundColor: scrolled ? 'var(--color-dark)' : 'white' }}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
            style={{ backgroundColor: scrolled ? 'var(--color-dark)' : 'white' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm hover:opacity-70 transition-colors"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-dark)' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-2 border text-sm text-center transition-all"
            style={{
              fontFamily: 'var(--font-montserrat), sans-serif',
              borderColor: 'var(--color-dark)',
              color: 'var(--color-dark)',
            }}
          >
            Contáctanos
          </a>
        </div>
      )}
    </header>
  )
}
