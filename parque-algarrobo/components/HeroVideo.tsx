export default function HeroVideo() {
  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* Video de fondo */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/Parque-Algarrobo-Horizontal.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/galeria/galeria-1.jpg"
      />


{/* Flecha animada */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: 'bounce-arrow 1.5s ease-in-out infinite' }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
