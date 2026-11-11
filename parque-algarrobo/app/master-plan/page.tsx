import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Master plan — Parque Algarrobo',
  description: 'Explora el master plan interactivo de Parque Algarrobo.',
}

export default function MasterPlan() {
  return (
    <main>
      <Navbar />
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-16">
        <iframe
          src="https://parque-algarrobo.tumasterplan.cl"
          title="Parque Algarrobo"
          style={{ width: '100%', aspectRatio: '16/10', minHeight: 480, border: 0, borderRadius: 12 }}
          loading="lazy"
          allowFullScreen
        />
      </section>
      <Footer />
    </main>
  )
}
