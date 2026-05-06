import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import Parcelas from '@/components/Parcelas'
import Galeria from '@/components/Galeria'
import Plano from '@/components/Plano'
import QueOfrecemos from '@/components/QueOfrecemos'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroVideo />
      <Parcelas />
      <Galeria />
      <Plano />
      <QueOfrecemos />
    </main>
  )
}
