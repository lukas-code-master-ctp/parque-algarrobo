const LINKS = [
  { label: 'Parcelas', href: '#parcelas' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Plano', href: '#plano' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t py-12 px-6" style={{ backgroundColor: 'var(--color-dark)', borderColor: 'rgba(255,255,255,0.1)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <a href="#" className="flex flex-col items-center md:items-start leading-none">
          <span className="font-bold tracking-[0.25em] text-xs uppercase" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'rgba(255,255,255,0.6)' }}>
            PARQUE
          </span>
          <span className="italic text-2xl leading-none text-white" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Algarrobo
          </span>
        </a>

        <nav className="flex flex-wrap justify-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-light text-xs tracking-wider transition-colors hover:opacity-70"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'rgba(255,255,255,0.5)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="font-light text-xs text-center md:text-right" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'rgba(255,255,255,0.3)' }}>
          © {year} Parque Algarrobo<br />
          Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
