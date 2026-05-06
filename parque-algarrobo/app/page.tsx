import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import Parcelas from '@/components/Parcelas'
import Galeria from '@/components/Galeria'
import Plano from '@/components/Plano'
import QueOfrecemos from '@/components/QueOfrecemos'
import Carrusel from '@/components/Carrusel'
import Ubicacion from '@/components/Ubicacion'
import Contacto from '@/components/Contacto'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroVideo />
      <Parcelas />
      <Galeria />
      <Plano />
      <QueOfrecemos />
      <Carrusel />
      <Ubicacion />
      <Contacto />
      <Footer />
    </main>
  )
}
