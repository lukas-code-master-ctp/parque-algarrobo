'use client'

import { useState } from 'react'

interface FormState {
  nombre: string
  email: string
  telefono: string
  mensaje: string
}

type Status = 'idle' | 'loading' | 'success' | 'error'

const INITIAL_FORM: FormState = { nombre: '', email: '', telefono: '', mensaje: '' }

export default function Contacto() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error en el servidor')
      setStatus('success')
      setForm(INITIAL_FORM)
    } catch {
      setStatus('error')
    }
  }

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-montserrat), sans-serif',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: 'rgba(255,255,255,0.2)',
    color: 'white',
  }

  return (
    <section id="contacto" className="py-24" style={{ backgroundColor: 'var(--color-dark)' }}>
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gold)' }}>
            Escríbenos
          </p>
          <h2 className="italic text-4xl md:text-5xl text-white" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
            Contacto
          </h2>
          <div className="w-12 h-px mx-auto mt-6" style={{ backgroundColor: 'var(--color-gold)' }} />
          <p className="font-light mt-6 text-sm leading-relaxed" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'rgba(255,255,255,0.6)' }}>
            ¿Tienes preguntas sobre el proyecto? Déjanos tus datos y te contactaremos a la brevedad.
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4" style={{ color: 'var(--color-gold)' }}>✓</div>
            <h3 className="italic text-2xl text-white mb-3" style={{ fontFamily: 'var(--font-cormorant), serif' }}>
              ¡Mensaje enviado!
            </h3>
            <p className="font-light text-sm" style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'rgba(255,255,255,0.6)' }}>
              Gracias por contactarnos. Te responderemos a la brevedad.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-sm underline hover:no-underline"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif', color: 'var(--color-gold)' }}
            >
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo *"
                value={form.nombre}
                onChange={handleChange}
                required
                className="w-full border px-4 py-3 text-sm font-light focus:outline-none transition-colors placeholder-white/40"
                style={inputStyle}
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border px-4 py-3 text-sm font-light focus:outline-none transition-colors placeholder-white/40"
                style={inputStyle}
              />
            </div>
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono (opcional)"
              value={form.telefono}
              onChange={handleChange}
              className="w-full border px-4 py-3 text-sm font-light focus:outline-none transition-colors placeholder-white/40"
              style={inputStyle}
            />
            <textarea
              name="mensaje"
              placeholder="Mensaje *"
              value={form.mensaje}
              onChange={handleChange}
              required
              rows={5}
              className="w-full border px-4 py-3 text-sm font-light focus:outline-none transition-colors resize-none placeholder-white/40"
              style={inputStyle}
            />
            {status === 'error' && (
              <p className="text-red-400 text-sm" style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}>
                Hubo un error al enviar el mensaje. Por favor intenta de nuevo.
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 px-8 py-3 font-bold tracking-[0.15em] uppercase text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              style={{ fontFamily: 'var(--font-montserrat), sans-serif', backgroundColor: 'var(--color-gold)', color: 'var(--color-dark)' }}
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
