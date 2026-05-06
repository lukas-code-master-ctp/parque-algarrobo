import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import Parcelas from '@/components/Parcelas'
import Galeria from '@/components/Galeria'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroVideo />
      <Parcelas />
      <Galeria />
    </main>
  )
}
