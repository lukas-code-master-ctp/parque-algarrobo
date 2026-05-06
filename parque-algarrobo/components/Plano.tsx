'use client'

const DOWNLOADS = [
  {
    title: 'Plano del Proyecto',
    description: 'Loteo completo con deslindes, superficies y numeración de parcelas',
    file: '/descargables/plano.pdf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
  },
  {
    title: 'Plano Georreferenciado',
    description: 'Plano oficial con coordenadas UTM y datum WGS84',
    file: '/descargables/geo.pdf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    title: 'Brochure del Proyecto',
    description: 'Información completa del proyecto, precios y condiciones de venta',
    file: '/descargables/brochure.pdf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
]

export default function Plano() {
  return (
    <section id="plano" className="py-24" style={{ backgroundColor: 'var(--color-warm)' }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gold)' }}>
            Documentos
          </p>
          <h2 className="italic text-6xl md:text-7xl" style={{ fontFamily: 'var(--font-cormorant), serif', color: 'var(--color-dark)' }}>
            Plano del Proyecto
          </h2>
          <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: 'var(--color-gold)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DOWNLOADS.map((doc) => (
            <div key={doc.file} className="flex flex-col items-center text-center p-8 border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300">
              <div className="mb-4" style={{ color: 'var(--color-forest)' }}>{doc.icon}</div>
              <h3 className="font-bold text-sm tracking-wide uppercase mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-dark)' }}>
                {doc.title}
              </h3>
              <p className="font-light text-sm leading-relaxed flex-1 mb-6" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gray-text)' }}>
                {doc.description}
              </p>
              <a
                href={doc.file}
                download
                className="inline-flex items-center gap-2 px-6 py-2.5 border text-sm tracking-wider transition-all duration-300 hover:text-white"
                style={{ borderColor: 'var(--color-dark)', color: 'var(--color-dark)', fontFamily: 'var(--font-montserrat), sans-serif' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--color-dark)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Descargar PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
