const BENEFITS = [
  { emoji: '🌿', title: 'Naturaleza', description: 'Rodeado de naturaleza nativa con vistas al campo y cercanía al mar' },
  { emoji: '🔒', title: 'Privacidad', description: 'Tu espacio privado, libre del ruido y aglomeraciones de la ciudad' },
  { emoji: '🛡️', title: 'Seguridad', description: 'Portería con control de acceso 24/7, solo residentes y visitas' },
  { emoji: '💳', title: 'Financiamiento', description: 'Compra directa con el proyecto, sin banco, cuotas a tu medida' },
  { emoji: '📈', title: 'Inversión', description: 'Zona de alto potencial de valorización por su ubicación y escasez' },
  { emoji: '🌅', title: 'Calidad de Vida', description: 'Desconéctate, construye tu casa de campo o úsala como inversión' },
  { emoji: '👥', title: 'Comunidad', description: 'Propietarios con visión similar: respeto, tranquilidad y naturaleza' },
  { emoji: '📍', title: 'Ubicación', description: 'A 100 km de Santiago y 20 minutos de la costa de Algarrobo' },
]

export default function QueOfrecemos() {
  return (
    <section id="que-ofrecemos" className="py-24" style={{ backgroundColor: 'var(--color-dark)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gold)' }}>
            Beneficios
          </p>
          <h2 className="italic text-6xl md:text-7xl text-white" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            ¿Qué Ofrecemos?
          </h2>
          <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: 'var(--color-gold)' }} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center gap-3">
              <span className="text-4xl mb-1">{b.emoji}</span>
              <h3 className="font-bold text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gold)' }}>
                {b.title}
              </h3>
              <p className="font-light text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'rgba(255,255,255,0.7)' }}>
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
