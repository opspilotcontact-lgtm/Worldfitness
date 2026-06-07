# Prompt para Claude Code — Proyecto "World Fitness Club Pro"

> **Cómo usar este prompt:** ábrelo en Claude Code dentro de una carpeta vacía nueva (`~/proyectos/wfc-pro`). Pega TODO el contenido a partir de "Eres un desarrollador senior..." hasta el final como único mensaje inicial. Antes de ejecutar, asegúrate de tener Node.js 18+, npm, git y Python 3 instalados.

---

## CONTEXTO PARA TI (JUAN) — NO COPIAR ESTA PARTE A CLAUDE CODE

Este prompt construye una **tercera versión** de la web de World Fitness Club que sustituirá conceptualmente la actual (`world-fitness-club.vercel.app`). El objetivo es demostrarle a Miguel (dueño, ya cliente potencial confirmado) que **la web actual está bien escrita pero mal orientada al cliente real** — gimnasios comerciales, hoteles, fisioterapias, centros deportivos — y que se puede hacer mucho mejor si:

1. Se ataca el SEO geográfico (Córdoba, Puente Genil, Andalucía, España) que la web actual no toca
2. Se reescribe el copy hablando el idioma del comprador real (dueño de gimnasio que busca rentabilidad, no entrenador hablando de biomecánica)
3. Se aprovecha el showroom físico de 800m² como diferenciador único en toda Andalucía
4. Se aprovechan las 138 reseñas Google a 5★ que la web actual no menciona
5. Se aprovechan las marcas/fabricantes reales (info que la web actual oculta porque no la tiene)
6. Se mete generación de leads cualificados, no solo "llama o WhatsApp"

**Tres entregables al final:**
- Webapp Next.js publicable en Vercel
- Scraping completo de los 163 productos (ya hecho parcialmente, se completa en la fase 1)
- README con métricas SEO y comparativa antes/después

**Decisiones tomadas que el prompt asume:**
- Stack: Next.js 14 App Router (no Vite + React puro como en el caso Dayjo, porque aquí el SEO es prioridad #1 y necesitamos SSG/SSR real)
- TypeScript obligatorio
- Tailwind CSS para estilos
- Schema.org masivo en todos los productos
- 100% identidad propia (sin imitar la actual)

**Lo que NO incluye este prompt:**
- Carrito funcional ni checkout (decisión deliberada, ver análisis previo)
- Pasarela de pago
- Login B2B
- Backoffice ni CMS (los productos se gestionan como TypeScript/JSON estático)

**Tiempo estimado de ejecución por Claude Code:** entre 1h y 3h según iteraciones. Mejor estar delante revisando.

---

## PROMPT (COPIAR DESDE AQUÍ HASTA EL FINAL)

Eres un desarrollador senior fullstack especializado en e-commerce B2B, SEO técnico, Next.js 14 y conversión orientada a leads cualificados. Vas a construir un proyecto completo llamado "World Fitness Club Pro" para OpsPilot.

# CONTEXTO DEL PROYECTO

**Cliente:** Miguel Franco, dueño de **World Fitness Club** (Puente Genil, Córdoba). Distribuye maquinaria profesional de gimnasio en toda Andalucía y España. Su activo único: showroom físico de 800m² en Puente Genil donde los compradores pueden **probar las máquinas antes de comprar**. Tiene 138 reseñas a 5 estrellas en Google Maps acumuladas en años, 8 años de trayectoria, atención presencial reconocida en la zona.

**Web actual:** `world-fitness-club.vercel.app` — bien diseñada visualmente pero mal orientada al comprador real. Copy IA en serie, sin SEO geográfico, sin mencionar showroom ni reseñas, todas las acciones llevan a "Llamar" o "WhatsApp" (lo cual es correcto, pero sin generación de lead cualificado previo).

**Quien encarga:** OpsPilot (Juan Ortiz Romero). Esta web es **propuesta visual demostrativa** para enseñarle a Miguel cómo debería ser su web si se ataca el SEO local y se habla el idioma del comprador profesional real.

**Comprador real (perfil objetivo):**
- Dueños de gimnasio comercial que abren nuevo centro o renuevan sala (decisión 5.000-50.000€)
- Cadenas hoteleras que equipan gimnasio de hotel (decisión 10.000-30.000€)
- Fisioterapias y centros de rehabilitación que necesitan equipamiento (decisión 3.000-15.000€)
- Entrenadores personales que montan su propio estudio (decisión 5.000-20.000€)
- Particulares con poder adquisitivo alto que montan home gym premium (decisión 3.000-10.000€)

**Lo que NUNCA hace este comprador:**
- Comprar online sin haber hablado primero (compra grande, necesita asesoramiento)
- Comprar sin haber visto la máquina (de ahí la importancia del showroom)
- Decidir solo por precio (decide por durabilidad, garantía, servicio postventa, asesoramiento)

**Lo que SÍ hace este comprador:**
- Buscar en Google "maquinaria gimnasio profesional [ciudad]", "equipamiento gimnasio comercial Andalucía"
- Comparar 3-5 proveedores antes de pedir presupuesto
- Visitar showroom si está cerca (decisión emocional, importante)
- Preguntar por marca, garantía, instalación, financiación, entrega
- Pedir asesoramiento sobre cuánta máquina necesita según público objetivo y tamaño de sala

# OBJETIVOS PRIORITARIOS POR ORDEN

1. **SEO geográfico agresivo**: rankear top 5 en Google por "maquinaria gimnasio profesional Córdoba", "equipamiento gimnasio Andalucía", "máquinas gimnasio Puente Genil", "showroom maquinaria gimnasio España", "comprar maquinaria gimnasio profesional"
2. **Conversión a lead cualificado**, no a llamada en frío: formularios cortos con campos clave (tipo de proyecto, presupuesto orientativo, plazo) antes del contacto WhatsApp/teléfono
3. **Aprovechamiento del showroom** como activo central de toda la narrativa
4. **Aprovechamiento de las 138 reseñas Google** como prueba social en cada página
5. **Identidad propia distinta** de la web actual (que es genérica e IA), con tono profesional pero no jerga deportiva
6. **Performance perfecta** (Core Web Vitals verdes), porque el comprador profesional juzga por la rapidez

# ESTRUCTURA DEL PROYECTO

```
wfc-pro/
├── scraper/                    # Python — scraping de productos (refresh del catálogo actual)
│   ├── scrape_wfc.py
│   └── requirements.txt
├── data/
│   └── productos.json          # output del scraper (163 productos)
├── public/
│   ├── productos/              # imágenes locales descargadas
│   ├── showroom/               # placeholders showroom (genera con SVG si no hay reales)
│   └── og/                     # imágenes Open Graph para compartir
├── src/
│   ├── app/
│   │   ├── (web)/
│   │   │   ├── page.tsx                                    # Home
│   │   │   ├── catalogo/page.tsx                           # Catálogo completo con filtros
│   │   │   ├── categoria/[slug]/page.tsx                   # Página de categoría
│   │   │   ├── producto/[slug]/page.tsx                    # Ficha de producto
│   │   │   ├── showroom/page.tsx                           # Página dedicada al showroom (clave SEO)
│   │   │   ├── proyectos/page.tsx                          # Casos de uso por tipo (gimnasio/hotel/fisio)
│   │   │   ├── proyectos/[tipo]/page.tsx                   # Landing por tipo de proyecto
│   │   │   ├── presupuesto/page.tsx                        # Formulario presupuesto cualificado
│   │   │   ├── contacto/page.tsx                           # Contacto + mapa
│   │   │   ├── sobre-nosotros/page.tsx                     # Quiénes somos
│   │   │   ├── blog/page.tsx                               # Blog (cluster SEO)
│   │   │   └── blog/[slug]/page.tsx                        # Posts de blog (3-5 generados)
│   │   ├── sitemap.ts                                      # Generación dinámica de sitemap
│   │   ├── robots.ts                                       # robots.txt
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                                             # primitivos
│   │   ├── product/                                        # Card, Grid, Hero, etc.
│   │   ├── seo/                                            # SchemaMarkup, OG
│   │   └── conversion/                                     # PresupuestoForm, ShowroomCTA, WhatsAppFab
│   ├── lib/
│   │   ├── productos.ts                                    # datos desde JSON tipados
│   │   ├── seo.ts                                          # helpers de generación de metadata
│   │   └── analytics.ts                                    # GA4 + eventos custom
│   └── types/
│       └── index.ts
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

# FASE 1 — SCRAPING (refresh del catálogo)

Crea `scraper/scrape_wfc.py` que extraiga los **163 productos** de la web actual (`world-fitness-club.vercel.app`).

**URLs a scrapear:**
- `https://world-fitness-club.vercel.app/catalogo` — listado completo (devuelve todos los productos en una sola página)
- Para cada producto: `https://world-fitness-club.vercel.app/producto/[slug]` — ficha individual (descripción larga)

**Datos a extraer por producto:**

```typescript
{
  slug: string;                  // p.ej. "maquina-press-de-pecho-plano-profesional"
  nombre: string;                // p.ej. "Máquina Press de Pecho Plano Profesional"
  categoria_original: string;    // p.ej. "Maquinaria Carga de Discos"
  precio: number;                // p.ej. 999
  precio_formato: string;        // p.ej. "999 €"
  imagen_url_original: string;   // URL en worldfitnessclub.es/wp-content/uploads/...
  imagen_local: string;          // p.ej. "/productos/maquina-press-de-pecho-plano-profesional.jpg"
  descripcion_original: string;  // descripción completa de la web actual (mejorable luego)
  destacado_origen: boolean;     // si aparece en la home actual
}
```

**Cómo hacerlo:**
- User-Agent: `Mozilla/5.0 (compatible; WFCProRebrandingBot/1.0)`
- Delay entre requests: 1 segundo
- Las imágenes están en `worldfitnessclub.es/wp-content/uploads/` (WordPress externo). **Descárgalas localmente** a `public/productos/[slug].jpg` para no depender del WordPress externo. Si alguna falla, usa placeholder SVG.
- Output: `data/productos.json` con array de 163 productos.

**Si scraping falla parcialmente**, trabaja con los productos que sí hayas conseguido (mínimo 100) y completa los faltantes con datos sintéticos coherentes.

# FASE 2 — REWRITE DEL COPY (CRÍTICO)

Las descripciones actuales tienen olor IA evidente. Frases tipo:
- *"¡La inversión que impulsa la rentabilidad y la fidelidad de tus clientes!"*
- *"posicionar su gimnasio como un centro de alto rendimiento"*
- *"¡Resultados visibles garantizados!"*

Estas frases **no las dice un comprador profesional real**. Tu trabajo es reescribir las 163 descripciones aplicando estos principios:

**Lo que SÍ debe tener cada descripción reescrita:**

1. **Primera frase = qué ejercicio principal hace + para quién es** (sin adjetivos vacíos)
   - Antes: *"La Máquina de Aductores de Cadera Profesional es un equipo de 139 kg..."*
   - Después: *"Máquina para trabajar aductores de cadera, pensada para uso comercial intensivo en sala de musculación."*

2. **Segundo párrafo = datos técnicos concretos** (peso, dimensiones, sistema de carga, recorrido)
   - Antes: *"...esencial para el fortalecimiento y la tonificación de la parte interna del muslo..."*
   - Después: *"139 kg de peso estructural. Dimensiones 1690×730×750 mm. Carga por discos olímpicos (no incluidos). Estructura de acero soldado, tapicería de alta densidad."*

3. **Tercer párrafo = para qué tipo de centro encaja mejor**
   - *"Encaja en gimnasios de musculación con 80m² o más de sala. Si tienes hotel o fisioterapia, valora la versión [otra máquina]. Antes de pedir presupuesto, ven a probarla al showroom — es la única forma de saber si encaja en tu espacio."*

4. **Sin signos de exclamación. Sin "¡!" en ninguna parte.** Esto es lo que más delata IA.

5. **Sin frases huecas tipo** "inversión clave", "premium", "elite", "alto rendimiento" sin contexto técnico que las justifique.

6. **Sin "su"/"sus" repetido**. Usa "tu" o impersonal según contexto.

**Cómo lo ejecutas:**
- Crea `scraper/rewrite_copy.py` que procesa los 163 productos del JSON
- Para cada uno, genera 3 párrafos siguiendo el patrón arriba
- Mantén los datos técnicos reales (peso, dimensiones) cuando estén disponibles en el copy original
- Output: añade campos `descripcion_corta` (1 frase), `descripcion_larga` (3 párrafos), `encaja_para` (array: "gimnasio-comercial", "hotel", "fisioterapia", "home-gym", "centro-alto-rendimiento")

**Importante:** este rewrite lo haces tú generando texto programáticamente, NO llamando a una API de Claude/OpenAI desde el script. Usa templates inteligentes basados en la categoría y los datos técnicos extraídos.

# FASE 3 — DISEÑO Y SISTEMA VISUAL

## Identidad visual nueva

**Diferenciada de la web actual** que es minimalista negra/oscura genérica.

**Paleta:**
- Negro carbón profundo `#0a0a0a` — base oscura para hero, secciones premium
- Blanco hueso `#f8f5ef` — backgrounds principales
- Naranja energía `#ff5722` — CTA primarios y acentos (color que ya usó OpsPilot en su propuesta original a Miguel, mantiene consistencia)
- Verde profesional `#1a3a26` — confianza, "para profesionales"
- Grises neutros: `#1a1a1a`, `#4a4a4a`, `#8a8a8a`, `#e5e5e1`

**Tipografías:**
- Display: `Bebas Neue` o `Anton` (condensada, industrial, deportiva sin caricaturizar)
- Texto: `Inter` (legibilidad)
- Mono: `JetBrains Mono` (specs técnicas, SKUs, dimensiones)

**Tono editorial:**
- Profesional sin tecnicismos vacíos
- Directo: "esta máquina pesa 215 kg, ocupa 2x2m, vale para gimnasios con 60+ socios activos"
- Respetuoso del tiempo del comprador: secciones cortas, información ordenada
- Sin venderse demasiado: el showroom y las 138 reseñas hablan por sí solas

## Hero principal (home)

Estructura:
- **Eyebrow:** "Maquinaria profesional · Showroom 800m² · Puente Genil, Córdoba"
- **H1 (Anton, peso 700):** "Equipa tu gimnasio con maquinaria que ya está probada."
- **Subtítulo:** "Más de 160 máquinas profesionales que puedes ver, tocar y probar en nuestro showroom de Andalucía antes de comprar. Atendemos a gimnasios, hoteles, fisioterapias y centros deportivos en toda España."
- **CTAs primarios:**
  - "Visitar showroom" (primario, naranja) → enlaza a `/showroom`
  - "Pedir presupuesto" (secundario, outline) → enlaza a `/presupuesto`
- **CTAs secundarios:**
  - "Llámanos: 618 05 08 06" (link tel:)
  - "WhatsApp" (link wa.me con texto pre-rellenado más cualificado: "Hola, estoy planteando equipar [tipo de centro] y me gustaría que me asesoréis")
- **Visual lateral:** composición de tres imágenes superpuestas de productos reales scrapeados (una de musculación, una de cardio si la hubiera, una de funcional) con un badge: "5/5 ★ · 138 reseñas Google"

## Sección "Por qué venir al showroom" (clave diferencial)

Justo debajo del hero. Cuatro pilares con iconos:

1. **Pruébala antes de invertir** — "Una máquina de 1.500€ no se compra a ciegas. Súbete, prueba el recorrido, comprueba la estabilidad antes de decidir."
2. **Asesoramiento real** — "Si tienes una sala de 80m², no necesitas todas las máquinas. Te decimos cuáles encajan según público objetivo y espacio."
3. **Sin presión comercial** — "Visitas el showroom cuando quieras, sin compromiso. Si no es lo que buscas, te lo decimos."
4. **Instalación y transporte** — "Coordinamos la entrega y el montaje en tu local. En Andalucía con técnico propio."

## Sección "138 reseñas a 5 estrellas en Google"

Después del showroom. Esto es activo único que la web actual no aprovecha.

- Titular: "138 dueños de gimnasios ya nos han elegido."
- Grid de 6 testimonios reales (genera 6 testimonios coherentes y verosímiles basándote en el perfil objetivo — gimnasio comercial, hotel, fisio, particular — con nombres, ciudades y tipos de centro variados de Andalucía)
- Badge: "Ver las 138 reseñas en Google" → enlace a Google Maps real de Miguel

## Sección "Equipa tu tipo de centro"

Esto es **landing por tipo de proyecto** (clave SEO long-tail):

Grid de 5 tarjetas grandes (cada una enlaza a `/proyectos/[tipo]`):
1. **Gimnasio comercial** — "20-50 máquinas, sala de 200-500m²"
2. **Hotel / Centro deportivo** — "10-20 máquinas, sala de 80-200m²"
3. **Fisioterapia / Rehabilitación** — "5-10 máquinas específicas, sala de 50-100m²"
4. **Estudio entrenamiento personal** — "8-15 máquinas, sala de 60-120m²"
5. **Home gym premium** — "3-8 máquinas, espacio de 30-60m²"

Cada tarjeta tiene:
- Foto representativa
- Rango de máquinas
- Rango de inversión orientativa
- CTA: "Ver propuesta para [tipo]"

## Sección "Catálogo destacado"

Grid 4 columnas con 8-12 productos destacados (los más representativos por categoría).

## Sección "Cómo trabajamos"

Timeline horizontal con 4 pasos:
1. **Pides presupuesto** (online o WhatsApp) — "Te respondemos en menos de 4h en horario comercial"
2. **Te asesoramos** — "Llamada de 15 min para entender tu proyecto"
3. **Visitas el showroom** — "Vienes a probar las máquinas que te recomendamos"
4. **Te entregamos e instalamos** — "Coordinamos transporte y montaje en tu local"

## Sección FAQ (SEO power)

10 preguntas frecuentes con respuestas. Genera estas:
- ¿Tenéis envío a toda España?
- ¿Puedo financiar la compra?
- ¿Las máquinas tienen garantía?
- ¿Quién monta las máquinas?
- ¿Puedo ver una máquina antes de comprar?
- ¿Tenéis maquinaria de segunda mano u outlet?
- ¿Cuánto tarda el envío?
- ¿Vendéis a particulares o solo a gimnasios?
- ¿Tenéis catálogo PDF para descargar?
- ¿Atendéis fines de semana?

Implementa con Schema.org `FAQPage` para que Google las muestre en SERP.

## Footer

- Logo + descripción corta
- Columnas: Catálogo / Tipo de proyecto / Empresa / Contacto
- Datos completos: dirección Puente Genil, teléfono, email, horarios
- Mapa pequeño embedded
- Redes sociales (si Miguel tiene)
- Aviso legal, política privacidad, cookies, condiciones
- Crédito sutil: "Web demostrativa diseñada por OpsPilot — propuesta de mejora para World Fitness Club"

# FASE 4 — RUTAS Y SEO

Implementa las 10 rutas listadas en la estructura, todas con `generateMetadata` específico:

## `/` — Home
- title: `Maquinaria de Gimnasio Profesional en Andalucía | World Fitness Club Córdoba`
- description: `Más de 160 máquinas profesionales para equipar tu gimnasio, hotel o centro deportivo. Showroom de 800m² en Puente Genil, Córdoba. Pruébalas antes de comprar. 138 reseñas a 5★ en Google.`

## `/catalogo` — Catálogo completo
- Filtros: categoría, precio (rangos), tipo de uso (gimnasio/hotel/fisio/home), disponibilidad
- Buscador con autocomplete
- 12-24 productos por página, paginación
- Sort: destacados / precio asc / precio desc / nombre

## `/categoria/[slug]` — Página por categoría
- Hero con título: "Maquinaria de [categoría] profesional"
- Subtítulo SEO con palabras clave geográficas
- Listado de productos filtrados
- Sección "Para qué tipo de centro encaja" al final

## `/producto/[slug]` — Ficha de producto
**Esta es la página más importante para SEO. Cuídala.**

Layout:
- Breadcrumb: Inicio > Catálogo > [Categoría] > [Producto]
- Galería de imágenes (foto principal + 3 thumbnails)
- H1 con nombre del producto
- Categoría y "Para [tipo de centro]" como tags
- Precio destacado + "IVA incluido"
- Descripción corta (1 frase del rewrite)
- Descripción larga (3 párrafos del rewrite)
- Tabla de especificaciones técnicas (peso, dimensiones, sistema de carga, capacidad máxima)
- Bloque "¿Te encaja esta máquina?" con CTA:
  - "Pedir presupuesto" (formulario corto: nombre, email, teléfono, tipo de proyecto, plazo) → genera lead cualificado
  - "Pruébala en el showroom" → enlaza con mensaje WhatsApp pre-rellenado más cualificado
  - "Hablar con un asesor" (link tel:)
- Sección "Productos similares" (4 productos misma categoría)
- Sección "Por qué comprarla en World Fitness Club" (showroom + reseñas + asesoramiento + instalación)
- Schema.org `Product` completo con `aggregateRating` (5/138)

## `/showroom` — Página dedicada al showroom (KEY SEO)

Esta página justifica gran parte del SEO geográfico. Estructura:
- H1: "Showroom de maquinaria de gimnasio en Puente Genil, Córdoba"
- Descripción larga del showroom (800m², ubicación, horarios)
- Galería de fotos (usa placeholders si no hay reales — genera composiciones SVG)
- Cómo llegar (mapa Google embedded, instrucciones desde Sevilla/Málaga/Córdoba capital)
- Cuándo visitar (horarios)
- Qué llevarte (lo que aprenderás en la visita)
- Reservar visita (formulario corto)
- FAQ del showroom (5 preguntas específicas)
- Testimonios de quienes han venido

## `/proyectos/[tipo]` — Landing por tipo de proyecto

5 páginas (gimnasio-comercial, hotel, fisioterapia, estudio-personal, home-gym).

Cada una con:
- H1: "Equipamiento para [tipo]"
- Descripción del perfil
- Lista de máquinas recomendadas (10-15 productos pre-seleccionados de las 163)
- "Inversión orientativa" (rango)
- Casos de éxito (genera 2-3 por tipo, verosímiles)
- CTA: "Pide propuesta personalizada"

## `/presupuesto` — Formulario presupuesto cualificado

Formulario en pasos (multi-step, ux mejorado):
1. Tipo de proyecto (gimnasio / hotel / fisio / estudio / home gym)
2. Tamaño de la sala (m²)
3. Número aproximado de usuarios al día
4. Presupuesto orientativo (rangos)
5. Plazo (urgente, 1-3 meses, 3-6 meses, sin prisa)
6. Datos de contacto (nombre, empresa, email, teléfono, ciudad)
7. Mensaje opcional

Al enviar:
- Muestra confirmación bonita
- Lead se envía por email a Miguel (mailto: o servicio tipo Formspree configurado)
- También se loguea con GA4 event `lead_submitted`

## `/contacto` — Contacto + mapa

Estructura simple:
- Datos completos
- Mapa grande
- Formulario simple
- CTA WhatsApp y teléfono prominentes

## `/sobre-nosotros` — Quiénes somos

Historia (genera narrativa creíble basada en 8 años de trayectoria, Miguel como fundador, Puente Genil, evolución).

## `/blog` y `/blog/[slug]` — Blog SEO

Genera **5 posts** con contenido útil real:

1. `como-elegir-maquinaria-para-gimnasio-comercial` — Guía completa
2. `cuanto-cuesta-equipar-un-gimnasio-pequeno` — Con desgloses
3. `diferencias-entre-maquinaria-comercial-y-domestica` — Por qué la diferencia importa
4. `mejores-marcas-de-maquinaria-de-gimnasio-2026` — Comparativa
5. `como-disenar-la-sala-de-musculacion-perfecta` — Layout y consejos

Cada post: 1500-2500 palabras, con headings semánticos, imágenes, internal linking a productos, schema `Article`.

# FASE 5 — COMPONENTES CLAVE

## `<PresupuestoFormShort />`

Formulario corto (4 campos: nombre, email, teléfono, tipo de proyecto). Va en cada ficha de producto.

```tsx
<PresupuestoFormShort 
  productoNombre="Máquina Press de Pecho Plano"
  productoSlug="maquina-press-de-pecho-plano-profesional"
  onSuccess={() => trackEvent('lead_short_submitted')}
/>
```

## `<ShowroomCTA />`

CTA reutilizable que invita a visitar showroom. Variantes: inline, sticky, modal.

## `<WhatsAppFab />`

Floating action button WhatsApp con mensaje pre-rellenado contextual. En producto, el mensaje incluye el nombre del producto. En home, mensaje genérico cualificado.

## `<ReviewsBadge />`

Badge "5/5 ★ 138 reseñas en Google" con link a Google Maps. Reutilizable en hero, footer, fichas.

## `<SchemaMarkup />`

Componente que renderiza JSON-LD según tipo:
- `Product` en fichas
- `LocalBusiness` en home, contacto, showroom
- `FAQPage` en home
- `Article` en blog posts
- `BreadcrumbList` en todas las páginas no-home

# FASE 6 — SEO TÉCNICO OBLIGATORIO

## Metadata en cada página

Usa `generateMetadata` de Next.js. Cada página debe tener:
- title único, descriptivo, con keyword principal y "Córdoba" o "Andalucía" cuando aplique
- description única, 150-160 caracteres
- openGraph completo (title, description, type, locale, images)
- twitter card
- canonical absoluto

## Sitemap dinámico

`src/app/sitemap.ts` que genere:
- Todas las rutas estáticas
- Todas las fichas de producto (163 URLs)
- Todas las páginas de categoría (7 URLs)
- Todas las landing de proyecto (5 URLs)
- Todos los blog posts (5 URLs)

Total ≈ 185 URLs en sitemap.

## robots.txt

`src/app/robots.ts`:
```ts
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: 'https://[dominio]/sitemap.xml',
  }
}
```

## Schema.org masivo

Implementa en cada tipo de página el schema correspondiente. Especial atención a:
- `LocalBusiness` con `geo` (coordenadas Puente Genil: 37.391, -4.768), `address`, `openingHoursSpecification`, `aggregateRating` 5/138
- `Product` con `offers`, `aggregateRating` heredado del business
- `BreadcrumbList` en todas las páginas internas
- `FAQPage` en home y `/showroom`

## Open Graph dinámicas

Genera imágenes OG dinámicas con `next/og`:
- Home: imagen con título + logo + reseñas
- Producto: imagen del producto + nombre + precio
- Categoría: composición de productos de la categoría
- Blog: imagen con título + autor

# FASE 7 — CONVERSIÓN Y MEDICIÓN

## Google Analytics 4

Instala GA4 (placeholder ID: `G-PLACEHOLDER` — Miguel lo sustituirá después). Eventos custom:
- `lead_submitted` (formulario presupuesto largo)
- `lead_short_submitted` (formulario corto en ficha)
- `whatsapp_click` (con contexto: producto, página)
- `phone_click` (con contexto)
- `showroom_visit_request`
- `category_filter_used`
- `search_performed`

## Meta Pixel

Igual: instala con placeholder ID. Eventos: `Lead`, `Contact`, `ViewContent`.

## Formspree o similar

Configura formulario para enviar a Formspree (placeholder endpoint). Miguel lo personaliza después.

# FASE 8 — PERFORMANCE Y CALIDAD

Objetivos no negociables:
- LCP < 2.5s
- CLS < 0.1
- FID < 100ms
- Lighthouse score > 95 en todas las categorías

Cómo:
- Imágenes con `next/image` y `priority` en hero
- Fonts con `next/font/google`
- Lazy load de componentes pesados
- ISR en páginas de producto (revalidate cada 24h)
- Static generation máxima
- CSS crítico inline (Tailwind ya lo hace bien)

# REGLAS IMPORTANTES (RELEER 2 VECES)

1. **Cero "Llamar / WhatsApp" como única acción**. Siempre ofrece la opción de pedir presupuesto cualificado primero. Es la clave de la mejora vs la web actual.

2. **Cero copy con muletillas IA** (revisar lista arriba). Si una frase generada por el rewrite contiene "¡!" o "inversión premium" o "centro de alto rendimiento", reescribirla a mano hasta que sea humana.

3. **Cero menciones a marcas de máquinas inventadas**. Si no sabes la marca real de un producto, di "Estructura de fabricación profesional" o similar.

4. **Cero copia de la web actual visual** (los chavales hicieron una identidad concreta). Esta web debe verse claramente como una propuesta alternativa, no como evolución de la suya.

5. **Footer SIEMPRE con el crédito** "Web demostrativa diseñada por OpsPilot — propuesta de mejora para World Fitness Club". Es legal y honesto.

6. **138 reseñas y showroom de 800m² aparecen como mínimo 3 veces en cada página clave** (home, ficha producto, contacto). Son los activos diferenciales.

7. **Si scraping falla**, trabaja con productos parciales. Si rewrite de algún producto queda raro, déjalo con un comentario `// TODO: revisar` para que Juan lo ajuste manualmente.

8. **No instales más dependencias de las necesarias**. Stack base: Next.js 14, React 18, TypeScript 5, Tailwind CSS 3, lucide-react para iconos. Y nada más salvo justificación.

9. **Para el formulario multi-step de presupuesto, no uses Formik ni react-hook-form**. Hazlo con `useState` puro. Es lo que ChatGPT recomendaría meter por inercia y aquí no aporta.

10. **Al terminar, ejecuta `npm run build` para verificar que todo compila sin errores TypeScript ni warnings críticos**.

# ORDEN DE EJECUCIÓN

1. **Inicializa proyecto**: `npx create-next-app@latest wfc-pro --typescript --tailwind --app --no-src-dir=false`. Limpia los archivos demo.
2. **Scraping**: ejecuta `scraper/scrape_wfc.py`, verifica `data/productos.json` con 163 productos.
3. **Rewrite copy**: ejecuta `scraper/rewrite_copy.py`, verifica que las descripciones suenen humanas.
4. **Tipos y data layer**: `src/types/index.ts` con `Producto`, `Categoria`, etc. `src/lib/productos.ts` que carga el JSON.
5. **Componentes base**: layout, header, footer, button, card. Sistema de diseño antes que páginas.
6. **Home**: implementa todas las secciones del hero al footer.
7. **Catálogo + Ficha de producto + Categoría**: lo más SEO-crítico.
8. **Showroom + Proyectos por tipo**: las landings clave de conversión.
9. **Presupuesto + Contacto**: formularios funcionales.
10. **Blog**: genera los 5 posts.
11. **SEO técnico**: sitemap, robots, schema, OG dinámicas.
12. **Analytics + tracking**.
13. **Build + deploy a Vercel**: `npx vercel --prod`.
14. **README final**: comparativa con web actual, métricas SEO esperadas.

# ENTREGA FINAL

Al terminar, en el README de raíz:

- Resumen ejecutivo de lo construido
- Comparativa antes/después (tabla con web actual vs nueva en: rutas, productos, SEO, conversión, performance)
- Instrucciones para correr localmente
- URL de Vercel
- Lista de placeholders pendientes para Miguel:
  - GA4 ID
  - Meta Pixel ID  
  - Formspree endpoint
  - Email destino formularios
  - Coordenadas Google Maps reales si las quiere actualizar
  - Fotos reales del showroom (cuando las tenga)
  - Logo en alta resolución
- Lista de mejoras pendientes priorizadas

Empieza ahora. Avísame cuando termines cada fase grande para que pueda revisar antes de avanzar.
