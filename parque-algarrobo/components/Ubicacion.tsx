const ROUTE_STEPS = [
  { step: '1', label: 'Santiago Centro', detail: 'Tomar Autopista del Sol (Ruta 78) dirección Melipilla' },
  { step: '2', label: 'Bypass Melipilla', detail: 'Continuar por Ruta 66 hacia San Antonio / Litoral' },
  { step: '3', label: 'Ruta F-30', detail: 'Tomar desvío a Algarrobo por Ruta F-30' },
  { step: '4', label: 'Parque Algarrobo', detail: 'Acceso señalizado al proyecto · ~100 km · ~1h 30min' },
]

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="py-24" style={{ backgroundColor: 'var(--color-warm)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-8" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gold)' }}>
            Cómo Llegar
          </p>
          <h2 className="italic text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-cormorant), serif', color: 'var(--color-dark)' }}>
            Ubicación
          </h2>
          <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: 'var(--color-gold)' }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="font-light leading-relaxed mb-8 text-sm md:text-base" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gray-text)' }}>
              Parque Algarrobo se encuentra a tan solo{' '}
              <strong style={{ color: 'var(--color-dark)', fontWeight: 700 }}>100 km de Santiago</strong>,
              en la Región de Valparaíso. Acceso fácil por autopista, a 20 minutos del borde costero de Algarrobo.
            </p>

            <div className="space-y-6">
              {ROUTE_STEPS.map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center" style={{ borderColor: 'var(--color-gold)' }}>
                    <span className="font-bold text-xs" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gold)' }}>{s.step}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-0.5" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-dark)' }}>{s.label}</p>
                    <p className="font-light text-sm" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gray-text)' }}>{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden shadow-lg" style={{ height: '22rem' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26640.0!2d-71.6584!3d-33.3670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9688f5b0e0f0f0f0%3A0x0!2sAlgarrobo%2C%20Valpara%C3%ADso!5e0!3m2!1ses!2scl!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Parque Algarrobo"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
