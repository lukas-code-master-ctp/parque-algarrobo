# Parque Algarrobo — Sitio Web Next.js · Design Spec

**Fecha:** 2026-05-04  
**Estado:** Aprobado

---

## Resumen

Landing page de venta de parcelas para el proyecto inmobiliario "Parque Algarrobo" (Algarrobo, Chile). Una sola página con 8 secciones más Navbar y Footer. Estático, sin CMS.

---

## Stack Técnico

| Capa | Elección |
|------|----------|
| Framework | Next.js 15 (App Router, Server Components por defecto) |
| Estilos | Tailwind CSS v4 |
| Email | Resend (API Route en Next.js) |
| Deploy | Vercel (gratis) — dominio `parquealgarrobo.cl` |
| Fuentes | Cormorant Garamond (script) + Montserrat (sans-serif) vía `next/font/google` |

---

## Estructura de Archivos

```
parque-algarrobo/
  app/
    page.tsx              ← ensambla todas las secciones
    layout.tsx            ← fuentes, metadata, <html>
    globals.css           ← variables CSS, reset
    api/
      contact/
        route.ts          ← POST → Resend
  components/
    Navbar.tsx
    HeroVideo.tsx
    Parcelas.tsx
    Galeria.tsx
    Plano.tsx
    QueOfrecemos.tsx
    Carrusel.tsx
    Ubicacion.tsx
    Contacto.tsx
    Footer.tsx
  public/
    video/
      Parque-Algarrobo-Horizontal.mp4
    galeria/
      Galeria 1.jpg … Galeria 24.jpg
    carrusel/
      10.png … 14.png
    descargables/
      PLANO-PARQUE-ALGARROBO.pdf
      GEO-PARQUE-ALGARROBO.pdf
      BROCHURE-Parque-Algarrobo.pdf
```

---

## Paleta y Tipografía

### Colores
- **Negro principal:** `#1a1a1a`
- **Verde bosque:** `#2d4a2d` (acentos)
- **Crema/blanco cálido:** `#faf9f7`
- **Gris texto:** `#4a4a4a`
- **Acento dorado:** `#c9a84c` (CTAs, detalles)

### Fuentes
- **Títulos principales:** Cormorant Garamond Italic (script, tamaño grande)
- **Logo / Labels uppercase:** Montserrat Bold 700, letter-spacing amplio
- **Cuerpo / descripciones:** Montserrat Light 300 / Regular 400

---

## Secciones

### Navbar
- Posición fija (`sticky top-0 z-50`)
- Transparente sobre el hero; fondo blanco con sombra al hacer scroll (IntersectionObserver o scroll event)
- Logo: "PARQUE" (Montserrat Bold) + "Algarrobo" (Cormorant Garamond Italic)
- Links de navegación ancla: Parcelas · Galería · Plano · Ubicación · Contacto
- Botón CTA: "Contáctanos" → scroll a sección #contacto
- Responsive: menú hamburguesa en móvil

### 1 · HeroVideo
- Video MP4 fullscreen (`object-cover w-full h-screen`)
- `autoPlay muted loop playsInline`
- Overlay semitransparente (`bg-black/40`)
- Texto centrado: logo grande + subtítulo + botón "Descubre más" con flecha animada (bounce)

### 2 · Parcelas
- Fondo: crema `#faf9f7`
- Título de sección: "Parcelas" (Cormorant Garamond Italic, ~60px)
- Grid de características: ícono SVG + nombre + descripción corta
  - Superficie desde 500 m²
  - Agua potable
  - Electricidad
  - Conectividad 4G
  - Acceso pavimentado
  - Áreas verdes comunes
  - Seguridad 24/7
  - Financiamiento directo

### 3 · Galería
- Título: "Galería"
- Masonry grid CSS (3 columnas desktop, 2 tablet, 1 móvil)
- 24 imágenes con lazy loading (`loading="lazy"`)
- Lightbox al click: navegación con flechas, cerrar con ESC o clic fuera
- Implementado con estado React local (sin librería externa)

### 4 · Plano
- Título: "Plano del Proyecto"
- 3 tarjetas de descarga: Plano · Plano Georreferenciado · Brochure
- Cada tarjeta: ícono de documento + nombre + botón "Descargar PDF" (`<a href download>`)

### 5 · ¿Qué Ofrecemos?
- Fondo oscuro (`#1a1a1a`) con texto blanco
- Título en Cormorant Garamond Italic
- Grid 4×2 (8 beneficios): ícono + título + descripción
  - Naturaleza / Privacidad / Seguridad / Financiamiento / Inversión / Calidad de vida / Comunidad / Ubicación

### 6 · Carrusel
- 5 imágenes panorámicas con efecto Ken Burns (CSS `@keyframes` zoom lento)
- Auto-play cada 5 s con transición `fade` o `slide`
- Dots de navegación
- Implementado con estado React local + `useEffect` para el intervalo

### 7 · Ubicación
- Título: "Cómo Llegar"
- Texto con ruta: Santiago → Autopista del Sol → Algarrobo (~100 km, ~1.5 h)
- Google Maps embed (`<iframe>`) con coordenadas del proyecto
- Fondo crema

### 8 · Contacto
- Fondo oscuro o imagen de fondo con overlay
- Formulario: Nombre · Email · Teléfono · Mensaje
- Validación client-side con HTML5 (`required`, `type="email"`)
- Submit → POST a `/api/contact` → Resend
- Email destino: a confirmar con el cliente (usar `CONTACT_EMAIL` env var)
- Estado visual: loading spinner / mensaje de éxito / mensaje de error

### Footer
- Logo pequeño
- Links rápidos a secciones
- Redes sociales (si aplica)
- Copyright: "© 2024 Parque Algarrobo · Todos los derechos reservados"

---

## API Route — Contacto

```
POST /api/contact
Body: { nombre, email, telefono, mensaje }
→ Resend.emails.send({ from, to: process.env.CONTACT_EMAIL, subject, html })
→ 200 { ok: true } | 500 { error: string }
```

Variables de entorno requeridas:
- `RESEND_API_KEY`
- `CONTACT_EMAIL` (destinatario de los mensajes)

---

## Assets a Copiar

Los assets originales están en `imagenes/`:
- `imagenes/Hero/Parque Algarrobo Horizontal.mp4` → `public/video/Parque-Algarrobo-Horizontal.mp4`
- `imagenes/Galeria/Galeria 1.jpg` … `Galeria 24.jpg` → `public/galeria/`
- `imagenes/Carrusel/10.png` … `14.png` → `public/carrusel/`
- `imagenes/Descargables/*.pdf` → `public/descargables/`

---

## Responsivo

- Mobile-first con Tailwind breakpoints: `sm` (640px) · `md` (768px) · `lg` (1024px) · `xl` (1280px)
- Navbar colapsa a hamburguesa en `< md`
- Grid de galería: 1 col móvil → 2 col tablet → 3 col desktop
- HeroVideo funciona en móvil (fallback poster image si el video no carga)

---

## Consideraciones de Rendimiento

- Video hero: `preload="none"` para no bloquear
- Imágenes galería: `next/image` con `loading="lazy"` y tamaños apropiados
- Fuentes: `next/font` con `display: swap`
- Sin librerías externas de UI (Tailwind puro)

---

## Fuera de Alcance

- CMS / panel de administración
- Blog
- Autenticación de usuarios
- Múltiples idiomas
- Analytics (se puede agregar Vercel Analytics trivialmente después)
