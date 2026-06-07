/**
 * Posts del blog (cluster SEO). Contenido real con internal linking.
 * El cuerpo es HTML renderizado dentro de .prose-wfc. Fechas absolutas.
 */

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  category: string;
  body: string;
}

export const POSTS: Post[] = [
  {
    slug: "como-elegir-maquinaria-para-gimnasio-comercial",
    title: "Cómo elegir maquinaria para un gimnasio comercial",
    description:
      "Guía práctica para elegir maquinaria de gimnasio comercial sin pasarte de presupuesto: qué priorizar, cuántas máquinas necesitas y qué errores evitar.",
    date: "2026-01-20",
    readingTime: "8 min",
    category: "Guías",
    body: `
<p>Equipar un gimnasio comercial es una de las inversiones más grandes que vas a hacer al abrir o renovar. Y a diferencia de una compra doméstica, aquí cada máquina tiene que aguantar cientos de usos al mes durante años. Esta guía resume lo que de verdad importa al decidir.</p>

<h2>1. Empieza por tu público, no por el catálogo</h2>
<p>El error más común es elegir máquinas por lo que se ve bonito en una foto. Antes de mirar nada, define quién va a usar tu sala: ¿perfil de fuerza, fitness general, rehabilitación, mayores? El público determina el reparto entre carga de discos, musculación selectorizada y cardio.</p>
<ul>
<li>Sala orientada a fuerza: más <a href="/categoria/peso-libre-racks">peso libre y racks</a> y carga de discos.</li>
<li>Fitness general: equilibrio entre <a href="/categoria/musculacion">selectorizada</a> y <a href="/categoria/cardio">cardio</a>.</li>
<li>Rehabilitación y mayores: máquinas de recorrido controlado y carga progresiva.</li>
</ul>

<h2>2. Cuántas máquinas necesitas de verdad</h2>
<p>No se trata de llenar la sala. Un buen punto de partida para un gimnasio comercial de 200–500 m² son entre 20 y 50 máquinas, dejando espacio libre para zona funcional y circulación. Más máquinas amontonadas no mejoran la experiencia: la empeoran.</p>

<h2>3. Durabilidad sobre precio</h2>
<p>Una máquina barata que falla a los seis meses sale carísima: parón de servicio, recambios, clientes molestos. Fíjate en el peso estructural, la calidad de la tapicería y el sistema de carga. En las <a href="/catalogo">fichas de catálogo</a> verás peso y dimensiones reales de cada equipo.</p>

<h2>4. Pruébalo antes de firmar</h2>
<p>Comprar maquinaria pesada por catálogo es un salto al vacío. El recorrido, la estabilidad y el tacto solo se valoran subiéndote a la máquina. Por eso recomendamos visitar un <a href="/showroom">showroom físico</a> antes de cerrar una sala completa.</p>

<h2>5. Piensa en la postventa desde el día uno</h2>
<p>¿Quién instala? ¿Quién responde si algo se rompe? ¿Hay garantía por escrito? Estas preguntas valen más que un descuento. Asegúrate de que tu proveedor instala y da la cara.</p>

<p>Si estás montando o renovando, lo más rápido es <a href="/presupuesto">contarnos tu proyecto</a>: sala, público y presupuesto. Te decimos qué encaja y qué te sobra.</p>
`,
  },
  {
    slug: "cuanto-cuesta-equipar-un-gimnasio-pequeno",
    title: "Cuánto cuesta equipar un gimnasio pequeño",
    description:
      "Desglose realista del coste de equipar un gimnasio pequeño o estudio: rangos de inversión por tamaño de sala y qué incluye cada tramo.",
    date: "2026-02-03",
    readingTime: "7 min",
    category: "Presupuesto",
    body: `
<p>“¿Cuánto me cuesta montar el gimnasio?” es la primera pregunta de casi todo el mundo. La respuesta honesta es: depende del tamaño de la sala y del público. Pero podemos darte rangos realistas para que planifiques.</p>

<h2>Estudio o sala pequeña (30–60 m²)</h2>
<p>Para un <a href="/proyectos/home-gym">home gym premium</a> o un mini estudio, con 3 a 8 máquinas bien elegidas, la inversión suele moverse entre 4.000 y 14.000 €. La clave aquí es seleccionar versátil: pocas máquinas que cubran muchos patrones de movimiento.</p>

<h2>Estudio de entrenamiento personal (60–120 m²)</h2>
<p>Un <a href="/proyectos/estudio-personal">estudio personal</a> con 8–15 máquinas para sesiones 1-a-1 y grupos reducidos suele situarse entre 10.000 y 28.000 €. Conviene combinar selectorizada, algo de peso libre y accesorios funcionales.</p>

<h2>Gimnasio de hotel o centro deportivo (80–200 m²)</h2>
<p>Para un <a href="/proyectos/hotel">gimnasio de hotel</a>, prioriza fiabilidad y bajo mantenimiento: 10–20 máquinas, entre 12.000 y 35.000 €.</p>

<h2>¿Qué entra en el presupuesto?</h2>
<ul>
<li>Las máquinas (lógicamente).</li>
<li>Transporte y montaje —pregunta siempre si está incluido—.</li>
<li>Discos olímpicos y accesorios, que a veces se cotizan aparte.</li>
<li>Garantía y postventa.</li>
</ul>

<h2>Cómo ajustar sin recortar calidad</h2>
<p>El truco no es comprar más barato, es comprar lo justo. Una sala bien diseñada con menos máquinas de calidad rinde más que una abarrotada de equipos mediocres. <a href="/presupuesto">Cuéntanos tu espacio</a> y te damos una orientación de inversión sin compromiso.</p>
`,
  },
  {
    slug: "diferencias-entre-maquinaria-comercial-y-domestica",
    title: "Maquinaria de gimnasio comercial vs doméstica: por qué importa",
    description:
      "Qué diferencia a una máquina de gimnasio comercial de una doméstica y por qué usar equipamiento doméstico en un negocio sale caro.",
    date: "2026-02-18",
    readingTime: "6 min",
    category: "Guías",
    body: `
<p>A simple vista, dos máquinas pueden parecer iguales. La diferencia entre una de uso comercial y una doméstica está en lo que no se ve: cómo están construidas para aguantar.</p>

<h2>Estructura y materiales</h2>
<p>La maquinaria comercial usa acero de mayor grosor, soldaduras reforzadas y tapicería de alta densidad. Está dimensionada para soportar cientos de usos al mes; la doméstica, para unos pocos a la semana.</p>

<h2>Sistema de carga y recorrido</h2>
<p>En uso comercial, el recorrido tiene que seguir siendo suave tras miles de repeticiones. Los rodamientos, guías y poleas son de otra categoría. Una máquina doméstica empieza a “rascar” mucho antes.</p>

<h2>El coste oculto de usar doméstico en un negocio</h2>
<ul>
<li>Averías frecuentes y parones de servicio.</li>
<li>Garantías que no cubren uso intensivo.</li>
<li>Sensación de baja calidad para tu cliente que paga cuota.</li>
</ul>

<h2>Cuándo tiene sentido cada una</h2>
<p>Para casa, una buena máquina doméstica puede bastar —aunque muchos particulares ya eligen <a href="/proyectos/home-gym">calidad comercial para su home gym</a>—. Para cualquier negocio con cuota, lo comercial no es un lujo: es lo que evita problemas.</p>

<p>¿Dudas si una máquina concreta aguantará tu volumen? Mira el peso estructural en su <a href="/catalogo">ficha</a> o ven a probarla al <a href="/showroom">showroom</a>.</p>
`,
  },
  {
    slug: "mejores-marcas-de-maquinaria-de-gimnasio-2026",
    title: "Cómo comparar marcas de maquinaria de gimnasio en 2026",
    description:
      "Qué mirar al comparar fabricantes de maquinaria de gimnasio: criterios objetivos más allá del logo para decidir bien tu inversión.",
    date: "2026-03-05",
    readingTime: "7 min",
    category: "Guías",
    body: `
<p>Hay muchos fabricantes y todos prometen lo mismo. En lugar de un ranking que envejece mal, te damos los criterios objetivos para comparar cualquier marca y decidir por ti mismo.</p>

<h2>1. Disponibilidad de recambios</h2>
<p>Una marca buenísima sin recambios accesibles es un problema futuro. Pregunta por plazos de recambio antes de comprar.</p>

<h2>2. Garantía real y por escrito</h2>
<p>No te quedes con el “tiene garantía”. Pide condiciones detalladas: qué cubre, cuánto tiempo y qué excluye.</p>

<h2>3. Servicio postventa local</h2>
<p>Que alguien instale y responda cerca de ti vale más que una marca con nombre internacional y soporte inexistente en tu zona.</p>

<h2>4. Ergonomía y recorrido</h2>
<p>Esto no se compara en una tabla: se compara probando. Dos máquinas del mismo precio pueden tener un tacto muy distinto. Por eso el <a href="/showroom">showroom</a> es la mejor herramienta de comparación que existe.</p>

<h2>5. Relación durabilidad / precio</h2>
<p>La pregunta correcta no es “cuánto cuesta” sino “cuánto me va a durar por ese precio”. Una máquina que aguanta diez años a buen ritmo es más barata que dos baratas que duran tres.</p>

<p>En World Fitness Club trabajamos con fabricación profesional pensada para uso comercial. Si quieres comparar opciones concretas para tu sala, <a href="/presupuesto">cuéntanos tu proyecto</a>.</p>
`,
  },
  {
    slug: "como-disenar-la-sala-de-musculacion-perfecta",
    title: "Cómo diseñar la sala de musculación perfecta",
    description:
      "Claves de layout para diseñar una sala de musculación: circulación, zonificación, distancias de seguridad y aprovechamiento del espacio.",
    date: "2026-03-22",
    readingTime: "8 min",
    category: "Guías",
    body: `
<p>Tener buenas máquinas no basta: si la sala está mal distribuida, la experiencia se resiente y el espacio se desaprovecha. El diseño del layout es tan importante como la selección de equipos.</p>

<h2>Zonifica por tipo de entrenamiento</h2>
<p>Agrupa por zonas lógicas: peso libre, máquinas selectorizadas, carga de discos, cardio y zona funcional. El usuario debe poder hacer su rutina sin cruzar la sala de punta a punta.</p>

<h2>Respeta la circulación</h2>
<p>Deja pasillos de al menos 0,9–1 m entre máquinas y zonas amplias en peso libre. Una sala que parece llena pero por la que cuesta moverse transmite agobio.</p>

<h2>Distancias de seguridad</h2>
<p>Racks, prensas y zonas de peso libre necesitan holgura para cargar discos y entrar/salir con seguridad. No las apretujes para meter una máquina más.</p>

<h2>Aprovecha la luz y los espejos</h2>
<p>La luz natural y los espejos bien colocados hacen que la sala se sienta más grande y motivan el entrenamiento. Son inversiones baratas con mucho impacto.</p>

<h2>Diseña para tu aforo, no para el escaparate</h2>
<p>El objetivo es que en hora punta la gente pueda entrenar sin esperas excesivas, no que la foto quede impresionante. Calcula máquinas según usuarios/día reales.</p>

<p>Si quieres, planificamos contigo el reparto de máquinas para tu sala concreta. Empieza por <a href="/proyectos/gimnasio-comercial">ver la propuesta para gimnasio comercial</a> o <a href="/presupuesto">pídenos asesoramiento</a>.</p>
`,
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}
