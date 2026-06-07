# World Fitness Club Pro

Tercera versión demostrativa de la web de **World Fitness Club** (Puente Genil, Córdoba), construida por **OpsPilot** como propuesta de mejora frente a la web actual (`world-fitness-club.vercel.app`).

La tesis: la web actual está bien escrita, pero mal orientada al comprador real. Esta versión ataca el **SEO geográfico**, reescribe el **copy para el comprador profesional**, convierte el **showroom de 800 m²** y las **138 reseñas a 5★** en el centro de la narrativa, y mete **generación de leads cualificados** en lugar de solo "Llamar / WhatsApp".

---

## Resumen ejecutivo

- **34 páginas únicas** + 163 fichas de producto + 7 categorías + 5 landings por tipo de proyecto + 5 guías de blog.
- **Catálogo real** de 163 productos scrapeados de la web actual, con imágenes descargadas localmente.
- **163 descripciones reescritas** sin olor a IA (cero exclamaciones, cero muletillas, voseo profesional, datos técnicos reales).
- **SEO técnico completo**: metadata por página, sitemap dinámico (≈185 URLs), robots, Schema.org masivo (LocalBusiness, Product, FAQPage, Article, BreadcrumbList) y Open Graph dinámicas con `next/og`.
- **Conversión a lead cualificado**: formulario multi-step de presupuesto + formulario corto en cada ficha + WhatsApp contextual, todo medido con GA4/Meta Pixel.
- **Identidad visual propia** industrial-editorial, claramente distinta de la web actual.

---

## Comparativa antes / después

| Dimensión | Web actual | World Fitness Club Pro |
|---|---|---|
| **Rutas** | Home + catálogo + ficha | 34 páginas: home, catálogo, 7 categorías, 163 fichas, showroom, 5 landings de proyecto, presupuesto, contacto, empresa, 5 guías de blog |
| **SEO geográfico** | Ausente | Córdoba / Puente Genil / Andalucía / España en titles, H1, descriptions y schema |
| **Copy** | IA en serie, exclamaciones, "su gimnasio" | Reescrito al lenguaje del comprador profesional, datos técnicos, sin jerga vacía |
| **Showroom** | No se menciona | Página dedicada (SEO) + presente en home, fichas y contacto |
| **138 reseñas** | No se aprovechan | Prueba social en home, fichas, footer y schema `aggregateRating` |
| **Conversión** | Solo "Llamar / WhatsApp" | Lead cualificado (multi-step + corto) **antes** del contacto directo |
| **Tipos de centro** | Indiferenciado | 5 landings: gimnasio comercial, hotel, fisio, estudio personal, home gym |
| **Schema.org** | Mínimo | LocalBusiness, Product, FAQPage, Article, BreadcrumbList |
| **Stack** | — | Next.js 16 (App Router), React 19, TypeScript 5, Tailwind 4 |

---

## Stack técnico

- **Next.js 16** (App Router, SSG + ISR a 24 h en fichas de producto)
- **React 19** · **TypeScript 5** (estricto)
- **Tailwind CSS 4** (tema con `@theme` en `globals.css`)
- **lucide-react** para iconografía
- Formularios con `useState` puro (sin Formik ni react-hook-form, por decisión)
- Productos como datos estáticos tipados (sin CMS ni backoffice)

### Identidad visual

Dirección **industrial-editorial**: tipografía *Anton* (display condensada), *Inter* (texto), *JetBrains Mono* (specs técnicas). Paleta carbón `#0a0a0a` / hueso `#f8f5ef` / naranja energía `#ff5722` / verde profesional `#1a3a26`. Hairlines, rejilla tipo plano técnico, grano analógico, sin gradientes decorativos.

---

## Estructura

```
.
├── scraper/                 # Python: scraping + rewrite del copy
│   ├── scrape_wfc.py        # extrae 163 productos + descarga imágenes
│   ├── rewrite_copy.py      # reescribe descripciones (anti-IA) + specs + tags
│   └── requirements.txt
├── data/productos.json      # catálogo (163 productos, enriquecido)
├── public/productos/        # 163 imágenes locales
└── src/
    ├── app/                 # rutas (App Router) + sitemap, robots, OG
    ├── components/          # ui · product · conversion · marketing · seo
    ├── lib/                 # site, productos, seo, content, blog, analytics
    └── types/
```

---

## Correr localmente

Requisitos: Node 18+ (probado en 24), npm, Python 3 (solo si quieres re-scrapear).

```bash
npm install
npm run dev          # http://localhost:3000
```

Re-generar el catálogo (opcional):

```bash
pip install -r scraper/requirements.txt
python scraper/scrape_wfc.py     # refresca data/productos.json + imágenes
python scraper/rewrite_copy.py   # reescribe el copy y añade specs/tags
```

---

## URL de Vercel

`https://wfc-pro.vercel.app` *(placeholder — desplegar con `npx vercel --prod`)*.

> Al desplegar, actualizar `SITE.url` en `src/lib/site.ts` con el dominio final.

---

## Placeholders pendientes para Miguel

Centralizados para sustituir en minutos:

| Qué | Dónde |
|---|---|
| ID de Google Analytics 4 | `src/lib/site.ts` → `GA_ID` |
| ID de Meta Pixel | `src/lib/site.ts` → `META_PIXEL_ID` |
| Endpoint de Formspree (email de leads) | `FORMSPREE_ENDPOINT` en los 3 componentes de formulario |
| Datos NAP, horarios, teléfono, email | `src/lib/site.ts` → `SITE` |
| Coordenadas reales del showroom | `src/lib/site.ts` → `SITE.geo` |
| URL real de las reseñas Google | `src/lib/site.ts` → `SITE.reviews.url` |
| Fotos reales del showroom | `src/app/showroom/page.tsx` (hay placeholders SVG) |
| Testimonios reales | `src/lib/content.ts` → `TESTIMONIOS` / `CASOS_EXITO` |
| Logo en alta resolución | header/footer (hoy wordmark tipográfico) |

---

## Decisiones técnicas conscientes

- **`images.unoptimized: true`** (`next.config.ts`): en local el optimizador cae a WASM (~45 s/imagen). Las imágenes fuente ya vienen dimensionadas para web. En Vercel, donde el optimizador es nativo y rápido, puede reactivarse quitando esa línea.
- **No se golpean las 163 fichas individuales** al scrapear: la página de catálogo ya trae todos los datos técnicos y el copy se reescribe igualmente. Más rápido y respetuoso con el origen.
- **Sin carrito, checkout, pasarela, login B2B ni CMS** — por decisión de alcance: la compra de este sector es asesorada y presencial.

---

## Mejoras pendientes priorizadas

1. **Fotos reales del showroom** y de producto en estudio (alto impacto en conversión).
2. **Marcas/fabricantes reales** por producto (hoy "fabricación profesional"; pendiente de datos de Miguel).
3. **Ampliar las guías de blog** a 1.500–2.500 palabras y añadir más del cluster SEO.
4. **Revisar los 34 productos sin specs** marcados con `_revisar` en el JSON (sin peso/dimensiones en el origen).
5. **Reactivar optimización de imágenes** y medir Core Web Vitals reales en producción.
6. **Conectar Formspree/email** y validar el flujo de lead de punta a punta.

---

*Web demostrativa diseñada por OpsPilot — propuesta de mejora para World Fitness Club.*
