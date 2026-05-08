const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c0 0-4 3-4 9s4 9 4 9M12 3c0 0 4 3 4 9s-4 9-4 9M3 12h18" />
      </svg>
    ),
    title: 'Accesos Estabilizados',
    description: 'Garantizan un óptimo recorrido y acceso a cada uno de sus macrolotes.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    title: 'Rol Propio Individual',
    description: 'Tendrás la información detallada del bien raíz y podrás concretar sin inconvenientes diversos trámites esenciales.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
      </svg>
    ),
    title: 'Portón de Acceso',
    description: 'La seguridad y exclusividad son pilares fundamentales de Parque Algarrobo, lo podrás encontrar en el acceso principal del proyecto.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: 'Listas para Escriturar',
    description: 'Parque Algarrobo cuenta con toda la documentación al día para el proceso de escrituración y entrega inmediata.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: 'Excelente Conectividad',
    description: 'A sólo 15 minutos de Algarrobo, nuestras parcelas garantizan la conectividad con vías principales de manera rápida y sencilla.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    title: 'Parcelas',
    description: 'La preservación del medioambiente es una de nuestras prioridades para brindarte esa conexión con la naturaleza que tanto necesitas.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
    title: 'Alta Plusvalía',
    description: 'A través del paso del tiempo, serás partícipe del aumento del valor de tu propiedad.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: 'Atención Personalizada',
    description: 'Contamos con un staff exclusivo y personalizado para orientarte en tu nuevo proyecto de vida.',
  },
]

export default function QueOfrecemos() {
  return (
    <section id="que-ofrecemos" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Encabezado */}
        <div className="text-center mb-20">
          <h2
            className="italic"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              color: 'var(--color-dark)',
              fontSize: 'clamp(2rem, 4.9vw, 3.5rem)',
              lineHeight: 1.15,
            }}
          >
            ¿Qué Ofrecemos?
          </h2>
          <div className="w-16 h-px mx-auto" style={{ backgroundColor: 'var(--color-dark)', marginTop: '3.5rem', marginBottom: '2.5rem' }} />
          <p
            className="italic font-light text-lg"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gray-text)' }}
          >
            Disfruta de los beneficios de un lugar único y exclusivo
          </p>
        </div>

        {/* Grid de beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex flex-col gap-3">
              <div style={{ color: 'var(--color-dark)' }}>{b.icon}</div>
              <h3
                className="font-semibold text-sm"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-dark)' }}
              >
                {b.title}
              </h3>
              <p
                className="font-light text-sm leading-relaxed"
                style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gray-text)' }}
              >
                {b.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
