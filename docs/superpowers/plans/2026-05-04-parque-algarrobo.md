# Parque Algarrobo Landing Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Next.js 15 static landing page for Parque Algarrobo with 8 sections: video hero, características, galería con lightbox, PDFs descargables, beneficios, carrusel Ken Burns, ubicación con mapa, y formulario de contacto con email vía Resend.

**Architecture:** Single-page Next.js 15 App Router app. Contenido hardcodeado en componentes (sin CMS). Componentes Server por defecto; solo los interactivos usan `"use client"` (Navbar scroll effect, Galería lightbox, Carrusel, Contacto form). El formulario de contacto llama a una API Route interna que envía el email con Resend.

**Tech Stack:** Next.js 15 · TypeScript · Tailwind CSS v4 · Resend · next/font/google (Cormorant Garamond + Montserrat) · next/image

---

## File Map

| Archivo | Responsabilidad |
|---------|----------------|
| `parque-algarrobo/app/layout.tsx` | Fuentes Google, metadata SEO, `<html>` wrapper |
| `parque-algarrobo/app/globals.css` | Tailwind v4 import, `@theme` tokens, keyframes |
| `parque-algarrobo/app/page.tsx` | Ensambla todas las secciones en orden |
| `parque-algarrobo/app/api/contact/route.ts` | POST handler → Resend |
| `parque-algarrobo/components/Navbar.tsx` | Navbar fija, efecto scroll, menú móvil |
| `parque-algarrobo/components/HeroVideo.tsx` | Video fullscreen, overlay, CTA |
| `parque-algarrobo/components/Parcelas.tsx` | Grid 8 características con íconos SVG |
| `parque-algarrobo/components/Galeria.tsx` | Masonry 24 fotos + lightbox modal |
| `parque-algarrobo/components/Plano.tsx` | 3 tarjetas descarga PDF |
| `parque-algarrobo/components/QueOfrecemos.tsx` | Fondo oscuro, 8 beneficios grid |
| `parque-algarrobo/components/Carrusel.tsx` | Ken Burns slideshow 5 imágenes |
| `parque-algarrobo/components/Ubicacion.tsx` | Ruta + Google Maps embed |
| `parque-algarrobo/components/Contacto.tsx` | Formulario + fetch a /api/contact |
| `parque-algarrobo/components/Footer.tsx` | Footer con links y copyright |
| `parque-algarrobo/public/video/` | MP4 del hero |
| `parque-algarrobo/public/galeria/` | 24 fotos JPG |
| `parque-algarrobo/public/carrusel/` | 5 imágenes PNG |
| `parque-algarrobo/public/descargables/` | 3 PDFs |

---

## Task 1: Scaffold del proyecto + copiar assets

**Files:**
- Create: `parque-algarrobo/` (directorio del proyecto)
- Populate: `parque-algarrobo/public/video/`, `public/galeria/`, `public/carrusel/`, `public/descargables/`

- [ ] **Step 1: Crear el proyecto Next.js**

Ejecutar en `C:\Users\lukas\Desktop\Claude_Code\Web-parque algarrobo\`:

```bash
npx create-next-app@15 parque-algarrobo \
  --typescript \
  --no-tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --no-git
```

- [ ] **Step 2: Instalar Tailwind CSS v4 y Resend**

```bash
cd parque-algarrobo
npm install tailwindcss @tailwindcss/postcss resend
```

- [ ] **Step 3: Configurar PostCSS para Tailwind v4**

Reemplazar el contenido de `postcss.config.mjs`:

```js
/** @type {import('postcss').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

- [ ] **Step 4: Crear directorios en public/**

```bash
mkdir -p public/video public/galeria public/carrusel public/descargables
```

- [ ] **Step 5: Copiar assets desde imagenes/**

```bash
# Video
cp "../imagenes/Hero/Parque Algarrobo Horizontal.mp4" public/video/Parque-Algarrobo-Horizontal.mp4

# Galería (24 fotos)
for i in $(seq 1 24); do
  cp "../imagenes/Galeria/Galeria $i.jpg" "public/galeria/galeria-$i.jpg"
done

# Carrusel (5 imágenes)
for i in 10 11 12 13 14; do
  cp "../imagenes/Carrusel/$i.png" "public/carrusel/$i.png"
done

# PDFs descargables
cp "../imagenes/Descargables/PLANO-PARQUE-ALGARROBO.pdf" public/descargables/plano.pdf
cp "../imagenes/Descargables/GEO-PARQUE-ALGARROBO.pdf" public/descargables/geo.pdf
cp "../imagenes/Descargables/BROCHURE-Parque-Algarrobo.pdf" public/descargables/brochure.pdf
```

- [ ] **Step 6: Crear .env.local**

```bash
cat > .env.local << 'EOF'
RESEND_API_KEY=re_XXXX_reemplazar_con_clave_real
CONTACT_EMAIL=contacto@parquealgarrobo.cl
EOF
```

- [ ] **Step 7: Verificar que el proyecto compila**

```bash
npm run build
```

Expected: Build exitoso sin errores (puede haber warnings de páginas default de Next.js, eso está bien).

- [ ] **Step 8: Commit**

```bash
cd ..
git add parque-algarrobo/ -A
git commit -m "feat: scaffold Next.js 15 + Tailwind v4 + copiar assets"
```

---

## Task 2: globals.css + layout.tsx

**Files:**
- Modify: `parque-algarrobo/app/globals.css`
- Create: `parque-algarrobo/app/layout.tsx`

- [ ] **Step 1: Escribir globals.css**

Reemplazar el contenido de `app/globals.css` con:

```css
@import "tailwindcss";

@theme {
  /* Colores */
  --color-dark: #1a1a1a;
  --color-forest: #2d4a2d;
  --color-warm: #faf9f7;
  --color-gold: #c9a84c;
  --color-gray-text: #4a4a4a;

  /* Fuentes */
  --font-montserrat: var(--font-montserrat);
  --font-cormorant: var(--font-cormorant);
}

/* Ken Burns animation */
@keyframes ken-burns {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.12);
  }
}

/* Fade in */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Bounce arrow */
@keyframes bounce-arrow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-warm);
  color: var(--color-dark);
}
```

- [ ] **Step 2: Escribir layout.tsx**

Reemplazar el contenido de `app/layout.tsx` con:

```tsx
import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Parque Algarrobo — Parcelas en la naturaleza',
  description:
    'Proyecto de parcelación en Algarrobo, Chile. Parcelas desde 500 m² con todos los servicios, a 100 km de Santiago.',
  openGraph: {
    title: 'Parque Algarrobo',
    description: 'Parcelas en la naturaleza, cerca del mar.',
    url: 'https://parquealgarrobo.cl',
    siteName: 'Parque Algarrobo',
    locale: 'es_CL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${cormorant.variable} ${montserrat.variable}`}
    >
      <body className="font-[var(--font-montserrat)] antialiased">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Expected: Build exitoso.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: globals.css con tokens Tailwind v4 y layout con fuentes Google"
```

---

## Task 3: Navbar

**Files:**
- Create: `parque-algarrobo/components/Navbar.tsx`

- [ ] **Step 1: Crear Navbar.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { label: 'Parcelas', href: '#parcelas' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Plano', href: '#plano' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none group">
          <span
            className={`font-[var(--font-montserrat)] font-bold tracking-[0.2em] text-xs uppercase transition-colors ${
              scrolled ? 'text-[var(--color-dark)]' : 'text-white'
            }`}
          >
            PARQUE
          </span>
          <span
            className={`font-[var(--font-cormorant)] italic text-2xl leading-none transition-colors ${
              scrolled ? 'text-[var(--color-dark)]' : 'text-white'
            }`}
          >
            Algarrobo
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-[var(--font-montserrat)] text-sm font-light tracking-wide transition-colors hover:text-[var(--color-gold)] ${
                scrolled ? 'text-[var(--color-dark)]' : 'text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="ml-4 px-5 py-2 border text-sm font-[var(--font-montserrat)] font-light tracking-wider transition-all hover:bg-[var(--color-gold)] hover:border-[var(--color-gold)] hover:text-white"
            style={
              scrolled
                ? { borderColor: 'var(--color-dark)', color: 'var(--color-dark)' }
                : { borderColor: 'white', color: 'white' }
            }
          >
            Contáctanos
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menú"
          className={`md:hidden flex flex-col gap-1.5 p-2 ${
            scrolled ? 'text-[var(--color-dark)]' : 'text-white'
          }`}
        >
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 bg-current transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-[var(--font-montserrat)] text-sm text-[var(--color-dark)] hover:text-[var(--color-gold)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-5 py-2 border border-[var(--color-dark)] text-sm text-center font-[var(--font-montserrat)] text-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-white"
          >
            Contáctanos
          </a>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Agregar Navbar a page.tsx temporalmente para verificar**

Reemplazar el contenido de `app/page.tsx` con:

```tsx
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="h-screen bg-gray-800 flex items-center justify-center">
        <p className="text-white">Hero placeholder</p>
      </div>
    </main>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Expected: Build exitoso.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/page.tsx
git commit -m "feat: Navbar con scroll effect y menú móvil"
```

---

## Task 4: HeroVideo

**Files:**
- Create: `parque-algarrobo/components/HeroVideo.tsx`

- [ ] **Step 1: Crear HeroVideo.tsx**

```tsx
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

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Logo grande */}
        <div className="flex flex-col items-center mb-6">
          <span className="font-[var(--font-montserrat)] font-bold tracking-[0.35em] text-white text-base uppercase">
            PARQUE
          </span>
          <span className="font-[var(--font-cormorant)] italic text-white text-7xl md:text-9xl leading-none">
            Algarrobo
          </span>
        </div>

        {/* Subtítulo */}
        <p className="font-[var(--font-montserrat)] font-light text-white/85 text-lg md:text-xl tracking-wider mb-10 max-w-xl">
          Parcelas en la naturaleza · Algarrobo, Chile
        </p>

        {/* CTA */}
        <a
          href="#parcelas"
          className="font-[var(--font-montserrat)] text-sm tracking-[0.2em] uppercase text-white border border-white/70 px-8 py-3 hover:bg-white hover:text-[var(--color-dark)] transition-all duration-300"
        >
          Descubrir
        </a>

        {/* Flecha animada */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Actualizar page.tsx**

```tsx
import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroVideo />
    </main>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Expected: Build exitoso.

- [ ] **Step 4: Commit**

```bash
git add components/HeroVideo.tsx app/page.tsx
git commit -m "feat: HeroVideo fullscreen con overlay y CTA"
```

---

## Task 5: Parcelas

**Files:**
- Create: `parque-algarrobo/components/Parcelas.tsx`

- [ ] **Step 1: Crear Parcelas.tsx**

```tsx
const FEATURES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    title: 'Desde 500 m²',
    description: 'Parcelas amplias con la superficie mínima que necesitas para tu proyecto',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    title: 'Agua Potable',
    description: 'Red de agua potable con arranque individual en cada parcela',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
    title: 'Electricidad',
    description: 'Empalme eléctrico disponible en cada parcela del proyecto',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
      </svg>
    ),
    title: 'Conectividad 4G',
    description: 'Cobertura 4G de las principales operadoras en todo el proyecto',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: 'Acceso Pavimentado',
    description: 'Caminos interiores pavimentados para acceso cómodo todo el año',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    title: 'Áreas Verdes',
    description: 'Amplias áreas verdes comunes de uso exclusivo para los propietarios',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Seguridad 24/7',
    description: 'Portería con control de acceso las 24 horas los 365 días del año',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: 'Financiamiento Directo',
    description: 'Compra tu parcela con financiamiento directo del proyecto, sin banco',
  },
]

export default function Parcelas() {
  return (
    <section id="parcelas" className="py-24 bg-[var(--color-warm)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3">
            El Proyecto
          </p>
          <h2 className="font-[var(--font-cormorant)] italic text-6xl md:text-7xl text-[var(--color-dark)]">
            Parcelas
          </h2>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center gap-4">
              <div className="text-[var(--color-forest)]">{f.icon}</div>
              <h3 className="font-[var(--font-montserrat)] font-bold text-sm tracking-wide text-[var(--color-dark)] uppercase">
                {f.title}
              </h3>
              <p className="font-[var(--font-montserrat)] font-light text-sm text-[var(--color-gray-text)] leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Agregar a page.tsx**

```tsx
import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import Parcelas from '@/components/Parcelas'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroVideo />
      <Parcelas />
    </main>
  )
}
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Expected: Build exitoso.

- [ ] **Step 4: Commit**

```bash
git add components/Parcelas.tsx app/page.tsx
git commit -m "feat: sección Parcelas con 8 características"
```

---

## Task 6: Galería con Lightbox

**Files:**
- Create: `parque-algarrobo/components/Galeria.tsx`

- [ ] **Step 1: Crear Galeria.tsx**

```tsx
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const IMAGES = Array.from({ length: 24 }, (_, i) => ({
  src: `/galeria/galeria-${i + 1}.jpg`,
  alt: `Parque Algarrobo — foto ${i + 1}`,
}))

export default function Galeria() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Navegar con teclado
  useEffect(() => {
    if (lightboxIndex === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null)
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i === null ? 0 : (i + 1) % IMAGES.length))
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i === null ? 0 : (i - 1 + IMAGES.length) % IMAGES.length))
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxIndex])

  // Bloquear scroll cuando lightbox abierto
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightboxIndex])

  return (
    <section id="galeria" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3">
            Imágenes
          </p>
          <h2 className="font-[var(--font-cormorant)] italic text-6xl md:text-7xl text-[var(--color-dark)]">
            Galería
          </h2>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mt-6" />
        </div>

        {/* Masonry grid con CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {IMAGES.map((img, idx) => (
            <div
              key={img.src}
              className="break-inside-avoid cursor-pointer overflow-hidden group"
              onClick={() => setLightboxIndex(idx)}
            >
              <div className="relative w-full overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
          style={{ animation: 'fade-in 0.2s ease' }}
        >
          {/* Imagen */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={IMAGES[lightboxIndex].src}
              alt={IMAGES[lightboxIndex].alt}
              width={1200}
              height={800}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          {/* Cerrar */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Cerrar"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Anterior */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((i) => (i === null ? 0 : (i - 1 + IMAGES.length) % IMAGES.length))
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            aria-label="Anterior"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Siguiente */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIndex((i) => (i === null ? 0 : (i + 1) % IMAGES.length))
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            aria-label="Siguiente"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Contador */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-[var(--font-montserrat)] font-light">
            {lightboxIndex + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 2: Configurar next.config.ts para imágenes locales**

Verificar que `next.config.ts` no bloquee imágenes locales. El default de Next.js permite imágenes de `public/`, no se necesita cambio.

- [ ] **Step 3: Agregar a page.tsx**

```tsx
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
```

- [ ] **Step 4: Verificar build**

```bash
npm run build
```

Expected: Build exitoso. (Si hay warning sobre `columns-*` en Tailwind v4, es solo un warning de purge, no un error.)

- [ ] **Step 5: Commit**

```bash
git add components/Galeria.tsx app/page.tsx
git commit -m "feat: Galería masonry con lightbox y navegación por teclado"
```

---

## Task 7: Plano — PDFs Descargables

**Files:**
- Create: `parque-algarrobo/components/Plano.tsx`

- [ ] **Step 1: Crear Plano.tsx**

```tsx
const DOWNLOADS = [
  {
    title: 'Plano del Proyecto',
    description: 'Loteo completo con deslindes, superficies y numeración de parcelas',
    file: '/descargables/plano.pdf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
      </svg>
    ),
  },
  {
    title: 'Plano Georreferenciado',
    description: 'Plano oficial con coordenadas UTM y datum WGS84',
    file: '/descargables/geo.pdf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    title: 'Brochure del Proyecto',
    description: 'Información completa del proyecto, precios y condiciones de venta',
    file: '/descargables/brochure.pdf',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
]

export default function Plano() {
  return (
    <section id="plano" className="py-24 bg-[var(--color-warm)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3">
            Documentos
          </p>
          <h2 className="font-[var(--font-cormorant)] italic text-6xl md:text-7xl text-[var(--color-dark)]">
            Plano del Proyecto
          </h2>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mt-6" />
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {DOWNLOADS.map((doc) => (
            <div
              key={doc.file}
              className="flex flex-col items-center text-center p-8 border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-[var(--color-forest)] mb-4">{doc.icon}</div>
              <h3 className="font-[var(--font-montserrat)] font-bold text-sm tracking-wide uppercase text-[var(--color-dark)] mb-3">
                {doc.title}
              </h3>
              <p className="font-[var(--font-montserrat)] font-light text-sm text-[var(--color-gray-text)] mb-6 leading-relaxed flex-1">
                {doc.description}
              </p>
              <a
                href={doc.file}
                download
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-[var(--color-dark)] text-sm font-[var(--font-montserrat)] tracking-wider text-[var(--color-dark)] hover:bg-[var(--color-dark)] hover:text-white transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Descargar PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Agregar a page.tsx**

```tsx
import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import Parcelas from '@/components/Parcelas'
import Galeria from '@/components/Galeria'
import Plano from '@/components/Plano'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroVideo />
      <Parcelas />
      <Galeria />
      <Plano />
    </main>
  )
}
```

- [ ] **Step 3: Verificar build y commit**

```bash
npm run build && git add components/Plano.tsx app/page.tsx && git commit -m "feat: sección Plano con 3 PDFs descargables"
```

---

## Task 8: ¿Qué Ofrecemos?

**Files:**
- Create: `parque-algarrobo/components/QueOfrecemos.tsx`

- [ ] **Step 1: Crear QueOfrecemos.tsx**

```tsx
const BENEFITS = [
  {
    icon: '🌿',
    title: 'Naturaleza',
    description: 'Rodeado de naturaleza nativa con vistas al campo y cercanía al mar',
  },
  {
    icon: '🔒',
    title: 'Privacidad',
    description: 'Tu espacio privado, libre del ruido y aglomeraciones de la ciudad',
  },
  {
    icon: '🛡️',
    title: 'Seguridad',
    description: 'Portería con control de acceso 24/7, solo residentes y visitas',
  },
  {
    icon: '💳',
    title: 'Financiamiento',
    description: 'Compra directa con el proyecto, sin banco, cuotas a tu medida',
  },
  {
    icon: '📈',
    title: 'Inversión',
    description: 'Zona de alto potencial de valorización por su ubicación y escasez',
  },
  {
    icon: '🌅',
    title: 'Calidad de Vida',
    description: 'Desconéctate, construye tu casa de campo o úsala como inversión',
  },
  {
    icon: '👥',
    title: 'Comunidad',
    description: 'Propietarios con visión similar: respeto, tranquilidad y naturaleza',
  },
  {
    icon: '📍',
    title: 'Ubicación',
    description: 'A 100 km de Santiago y 20 minutos de la costa de Algarrobo',
  },
]

export default function QueOfrecemos() {
  return (
    <section id="que-ofrecemos" className="py-24 bg-[var(--color-dark)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3">
            Beneficios
          </p>
          <h2 className="font-[var(--font-cormorant)] italic text-6xl md:text-7xl text-white">
            ¿Qué Ofrecemos?
          </h2>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mt-6" />
        </div>

        {/* Grid 4×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex flex-col items-center text-center gap-3">
              <span className="text-4xl mb-1">{b.icon}</span>
              <h3 className="font-[var(--font-montserrat)] font-bold text-sm tracking-widest uppercase text-[var(--color-gold)]">
                {b.title}
              </h3>
              <p className="font-[var(--font-montserrat)] font-light text-sm text-white/70 leading-relaxed">
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Agregar a page.tsx y commit**

```tsx
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
```

```bash
npm run build && git add components/QueOfrecemos.tsx app/page.tsx && git commit -m "feat: sección ¿Qué Ofrecemos? con 8 beneficios"
```

---

## Task 9: Carrusel Ken Burns

**Files:**
- Create: `parque-algarrobo/components/Carrusel.tsx`

- [ ] **Step 1: Crear Carrusel.tsx**

```tsx
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

const SLIDES = [
  { src: '/carrusel/10.png', alt: 'Parque Algarrobo — vista 1' },
  { src: '/carrusel/11.png', alt: 'Parque Algarrobo — vista 2' },
  { src: '/carrusel/12.png', alt: 'Parque Algarrobo — vista 3' },
  { src: '/carrusel/13.png', alt: 'Parque Algarrobo — vista 4' },
  { src: '/carrusel/14.png', alt: 'Parque Algarrobo — vista 5' },
]

export default function Carrusel() {
  const [current, setCurrent] = useState(0)

  // Auto-play cada 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((i) => (i + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="carrusel" className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-[var(--color-dark)]">
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            style={
              idx === current
                ? { animation: 'ken-burns 6s ease-out forwards' }
                : undefined
            }
            priority={idx === 0}
          />
          {/* Overlay sutil */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir a slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === current ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Agregar a page.tsx y commit**

```tsx
import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import Parcelas from '@/components/Parcelas'
import Galeria from '@/components/Galeria'
import Plano from '@/components/Plano'
import QueOfrecemos from '@/components/QueOfrecemos'
import Carrusel from '@/components/Carrusel'

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
    </main>
  )
}
```

```bash
npm run build && git add components/Carrusel.tsx app/page.tsx && git commit -m "feat: Carrusel Ken Burns con auto-play y dots"
```

---

## Task 10: Ubicación

**Files:**
- Create: `parque-algarrobo/components/Ubicacion.tsx`

- [ ] **Step 1: Crear Ubicacion.tsx**

> **Nota:** El embed de Google Maps usa coordenadas aproximadas de la zona de Algarrobo (-33.367, -71.658). Verificar con el cliente la ubicación exacta y reemplazar `q=-33.367,-71.658` en el src del iframe.

```tsx
const ROUTE_STEPS = [
  { step: '1', label: 'Santiago Centro', detail: 'Tomar Autopista del Sol (Ruta 78) dirección Melipilla' },
  { step: '2', label: 'Bypass Melipilla', detail: 'Continuar por Ruta 66 hacia San Antonio / Litoral' },
  { step: '3', label: 'Ruta F-30', detail: 'Tomar desvío a Algarrobo por Ruta F-30' },
  { step: '4', label: 'Parque Algarrobo', detail: 'Acceso señalizado al proyecto · ~100 km · ~1h 30min' },
]

export default function Ubicacion() {
  return (
    <section id="ubicacion" className="py-24 bg-[var(--color-warm)]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3">
            Cómo Llegar
          </p>
          <h2 className="font-[var(--font-cormorant)] italic text-6xl md:text-7xl text-[var(--color-dark)]">
            Ubicación
          </h2>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Ruta */}
          <div>
            <p className="font-[var(--font-montserrat)] font-light text-[var(--color-gray-text)] mb-8 leading-relaxed">
              Parque Algarrobo se encuentra a tan solo <strong className="text-[var(--color-dark)] font-bold">100 km de Santiago</strong>, en la Región de Valparaíso. Acceso fácil por autopista, a 20 minutos del borde costero de Algarrobo.
            </p>

            <div className="space-y-6">
              {ROUTE_STEPS.map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-[var(--color-gold)] flex items-center justify-center">
                    <span className="font-[var(--font-montserrat)] text-xs font-bold text-[var(--color-gold)]">{s.step}</span>
                  </div>
                  <div>
                    <p className="font-[var(--font-montserrat)] font-bold text-sm text-[var(--color-dark)] mb-0.5">{s.label}</p>
                    <p className="font-[var(--font-montserrat)] font-light text-sm text-[var(--color-gray-text)]">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mapa */}
          <div className="w-full h-80 lg:h-96 overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0!2d-71.6584!3d-33.3670!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDIyJzAxLjIiUyA3McKwMzknMzAuMiJX!5e0!3m2!1ses!2scl!4v1"
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
```

- [ ] **Step 2: Agregar a page.tsx y commit**

```tsx
import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import Parcelas from '@/components/Parcelas'
import Galeria from '@/components/Galeria'
import Plano from '@/components/Plano'
import QueOfrecemos from '@/components/QueOfrecemos'
import Carrusel from '@/components/Carrusel'
import Ubicacion from '@/components/Ubicacion'

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
    </main>
  )
}
```

```bash
npm run build && git add components/Ubicacion.tsx app/page.tsx && git commit -m "feat: sección Ubicación con ruta y mapa"
```

---

## Task 11: Formulario de Contacto + API Route

**Files:**
- Create: `parque-algarrobo/components/Contacto.tsx`
- Create: `parque-algarrobo/app/api/contact/route.ts`

- [ ] **Step 1: Crear la API Route**

Crear `app/api/contact/route.ts`:

```ts
import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

interface ContactBody {
  nombre: string
  email: string
  telefono: string
  mensaje: string
}

export async function POST(request: NextRequest) {
  let body: ContactBody

  try {
    body = await request.json() as ContactBody
  } catch {
    return NextResponse.json({ error: 'Cuerpo de request inválido' }, { status: 400 })
  }

  const { nombre, email, telefono, mensaje } = body

  if (!nombre || !email || !mensaje) {
    return NextResponse.json(
      { error: 'Nombre, email y mensaje son requeridos' },
      { status: 400 },
    )
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Email inválido' }, { status: 400 })
  }

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    return NextResponse.json({ error: 'Configuración de email faltante' }, { status: 500 })
  }

  try {
    await resend.emails.send({
      from: 'Parque Algarrobo <noreply@parquealgarrobo.cl>',
      to: contactEmail,
      replyTo: email,
      subject: `Nuevo mensaje de ${nombre} — Parque Algarrobo`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a1a; border-bottom: 2px solid #c9a84c; padding-bottom: 8px;">
            Nuevo mensaje desde parquealgarrobo.cl
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a; width: 120px;">Nombre:</td>
              <td style="padding: 8px 0;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4a4a4a;">Teléfono:</td>
              <td style="padding: 8px 0;">${telefono || '—'}</td>
            </tr>
          </table>
          <div style="margin-top: 16px;">
            <p style="font-weight: bold; color: #4a4a4a; margin-bottom: 8px;">Mensaje:</p>
            <p style="background: #f5f5f5; padding: 16px; border-left: 3px solid #c9a84c; line-height: 1.6;">
              ${mensaje.replace(/\n/g, '<br />')}
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error enviando email:', error)
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Crear Contacto.tsx**

```tsx
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  const inputClass =
    'w-full bg-white/5 border border-white/20 text-white placeholder-white/40 px-4 py-3 font-[var(--font-montserrat)] font-light text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors'

  return (
    <section id="contacto" className="py-24 bg-[var(--color-dark)]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <p className="font-[var(--font-montserrat)] text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-3">
            Escríbenos
          </p>
          <h2 className="font-[var(--font-cormorant)] italic text-6xl md:text-7xl text-white">
            Contacto
          </h2>
          <div className="w-12 h-px bg-[var(--color-gold)] mx-auto mt-6" />
          <p className="font-[var(--font-montserrat)] font-light text-white/60 mt-6 text-sm leading-relaxed">
            ¿Tienes preguntas sobre el proyecto? Déjanos tus datos y te contactaremos a la brevedad.
          </p>
        </div>

        {/* Formulario */}
        {status === 'success' ? (
          <div className="text-center py-12">
            <div className="text-[var(--color-gold)] text-5xl mb-4">✓</div>
            <h3 className="font-[var(--font-cormorant)] italic text-3xl text-white mb-3">
              ¡Mensaje enviado!
            </h3>
            <p className="font-[var(--font-montserrat)] font-light text-white/60 text-sm">
              Gracias por contactarnos. Te responderemos a la brevedad.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 text-[var(--color-gold)] text-sm font-[var(--font-montserrat)] underline hover:no-underline"
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
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={form.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono (opcional)"
              value={form.telefono}
              onChange={handleChange}
              className={inputClass}
            />
            <textarea
              name="mensaje"
              placeholder="Mensaje *"
              value={form.mensaje}
              onChange={handleChange}
              required
              rows={5}
              className={inputClass + ' resize-none'}
            />

            {status === 'error' && (
              <p className="text-red-400 text-sm font-[var(--font-montserrat)] font-light">
                Hubo un error al enviar el mensaje. Por favor intenta de nuevo.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-2 px-8 py-3 bg-[var(--color-gold)] text-[var(--color-dark)] font-[var(--font-montserrat)] font-bold tracking-[0.15em] uppercase text-sm hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Agregar a page.tsx y verificar build**

```tsx
import Navbar from '@/components/Navbar'
import HeroVideo from '@/components/HeroVideo'
import Parcelas from '@/components/Parcelas'
import Galeria from '@/components/Galeria'
import Plano from '@/components/Plano'
import QueOfrecemos from '@/components/QueOfrecemos'
import Carrusel from '@/components/Carrusel'
import Ubicacion from '@/components/Ubicacion'
import Contacto from '@/components/Contacto'

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
    </main>
  )
}
```

```bash
npm run build
```

Expected: Build exitoso.

- [ ] **Step 4: Commit**

```bash
git add components/Contacto.tsx app/api/contact/route.ts app/page.tsx
git commit -m "feat: formulario de contacto con API Route y Resend"
```

---

## Task 12: Footer

**Files:**
- Create: `parque-algarrobo/components/Footer.tsx`

- [ ] **Step 1: Crear Footer.tsx**

```tsx
const YEAR = new Date().getFullYear()

const LINKS = [
  { label: 'Parcelas', href: '#parcelas' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Plano', href: '#plano' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-[var(--color-dark)] border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo */}
        <a href="#" className="flex flex-col items-center md:items-start leading-none">
          <span className="font-[var(--font-montserrat)] font-bold tracking-[0.25em] text-white/60 text-xs uppercase">
            PARQUE
          </span>
          <span className="font-[var(--font-cormorant)] italic text-white text-3xl leading-none">
            Algarrobo
          </span>
        </a>

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[var(--font-montserrat)] font-light text-xs text-white/50 hover:text-[var(--color-gold)] tracking-wider transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className="font-[var(--font-montserrat)] font-light text-xs text-white/30 text-center md:text-right">
          © {YEAR} Parque Algarrobo<br />
          Todos los derechos reservados
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Ensamblar page.tsx final completo**

```tsx
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
```

- [ ] **Step 3: Build final completo**

```bash
npm run build
```

Expected: Build exitoso sin errores.

- [ ] **Step 4: Commit final**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: Footer y ensamblado completo de la página"
```

---

## Task 13: Polish — next.config.ts + .gitignore + .env.example

**Files:**
- Modify: `parque-algarrobo/next.config.ts`
- Create: `parque-algarrobo/.env.example`
- Modify: `.gitignore`

- [ ] **Step 1: Actualizar next.config.ts**

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Optimización de imágenes para archivos locales en /public
  images: {
    // next/image optimiza imágenes locales automáticamente, sin configuración extra
  },
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
```

- [ ] **Step 2: Crear .env.example**

```bash
cat > .env.example << 'EOF'
# Resend API Key — obtener en https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email donde llegan los mensajes del formulario de contacto
CONTACT_EMAIL=contacto@parquealgarrobo.cl
EOF
```

- [ ] **Step 3: Verificar que .env.local está en .gitignore**

El `.gitignore` generado por create-next-app ya incluye `.env.local`. Verificar:

```bash
grep ".env.local" .gitignore
```

Expected: `.env.local` aparece en el output.

- [ ] **Step 4: Build + commit final**

```bash
npm run build
git add next.config.ts .env.example
git commit -m "feat: next.config headers de seguridad y .env.example"
```

---

## Task 14: Configurar dominio en Vercel (instrucciones)

Este task es manual — no requiere código.

- [ ] **Step 1: Crear cuenta en Resend y obtener API key**
  1. Ir a https://resend.com → crear cuenta
  2. Verificar dominio `parquealgarrobo.cl` (agregar DNS TXT record)
  3. Crear API Key → copiar el valor

- [ ] **Step 2: Deploy a Vercel**
  1. Ir a https://vercel.com → importar proyecto desde GitHub (o subir carpeta)
  2. En "Environment Variables" agregar:
     - `RESEND_API_KEY` = el key de Resend
     - `CONTACT_EMAIL` = email destino (ej: ventas@parquealgarrobo.cl)
  3. Deploy

- [ ] **Step 3: Configurar dominio parquealgarrobo.cl**
  1. En Vercel → Settings → Domains → agregar `parquealgarrobo.cl`
  2. En el registrador del dominio → agregar los registros DNS que indica Vercel (A y CNAME)

---

## Resumen de comandos frecuentes

```bash
# Desarrollo local
cd parque-algarrobo && npm run dev
# → http://localhost:3000

# Build de producción
npm run build

# Ver el build local
npm run start
```
