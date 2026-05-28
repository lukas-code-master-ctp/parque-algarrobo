const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    label: 'Desde 5',
    sub: 'Hectáreas',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    label: 'Rol Propio',
    sub: 'Individual',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    label: 'Accesos',
    sub: 'Ejecutados',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    label: 'Portón de',
    sub: 'Acceso',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z" />
      </svg>
    ),
    label: 'Entrega',
    sub: 'Inmediata',
  },
]

export default function Parcelas() {
  return (
    <section id="parcelas" style={{ backgroundColor: 'var(--color-warm)' }}>

      {/* Barra de features */}
      <div className="w-full border-b" style={{ backgroundColor: 'var(--color-dark)', borderColor: '#333' }}>
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:justify-between">
          {FEATURES.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-1 text-center min-w-[80px]">
              <div className="text-white/70">{f.icon}</div>
              <span
                className="text-white text-xs font-light leading-tight"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
              >
                {f.label}<br />{f.sub}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
        {/* Título */}
        <h2
          className="italic"
          style={{
            fontFamily: 'var(--font-cormorant), serif',
            color: 'var(--color-dark)',
            fontSize: 'clamp(2rem, 4.9vw, 3.5rem)',
            lineHeight: 1.15,
          }}
        >
          Nuestras Parcelas
        </h2>

        {/* Subtítulo */}
        <p
          className="italic text-lg md:text-xl font-light mt-10 leading-relaxed"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-dark)' }}
        >
          Una manera diferente de interactuar con la naturaleza y preservarla
        </p>

        {/* Divider */}
        <div className="w-16 h-px mx-auto mt-10 mb-10" style={{ backgroundColor: 'var(--color-dark)' }} />

        {/* Párrafo descriptivo */}
        <p
          className="font-light text-base leading-loose"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gray-text)' }}
        >
          En una de las zonas más representativas de nuestra V Región,{' '}
          <strong style={{ color: 'var(--color-dark)', fontWeight: 600 }}>Parque Algarrobo</strong>{' '}
          son unas{' '}
          <strong style={{ color: 'var(--color-dark)', fontWeight: 600 }}>de las parcelas más exclusivas</strong>{' '}
          del sector. No sólo por su encanto natural, vegetación nativa, fauna silvestre y una topografía
          envidiable, sino por su gran ubicación y contar con una{' '}
          <strong style={{ color: 'var(--color-dark)', fontWeight: 600 }}>increíble vista al mar</strong>.
          A escasos minutos de sus hermosas playas,{' '}
          <strong style={{ color: 'var(--color-dark)', fontWeight: 600 }}>Algarrobo y El Canelillo</strong>{' '}
          son el motivo perfecto para hacer una{' '}
          <strong style={{ color: 'var(--color-dark)', fontWeight: 600 }}>inversión inteligente</strong>{' '}
          donde disfrutar de la mejor calidad de vida.
        </p>
      </div>

    </section>
  )
}
