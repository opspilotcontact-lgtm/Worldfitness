/**
 * Contenido editorial verosímil (testimonios, FAQs, pasos). Generado coherente
 * con el perfil objetivo andaluz. Marcado para que Miguel sustituya por reales.
 */

export interface Testimonio {
  nombre: string;
  centro: string;
  ciudad: string;
  texto: string;
}

export const TESTIMONIOS: Testimonio[] = [
  {
    nombre: "Rafael Moreno",
    centro: "Gimnasio comercial · 380 socios",
    ciudad: "Lucena, Córdoba",
    texto:
      "Fui a probar tres prensas un sábado por la mañana. Me dijeron cuál aguantaba mejor mi volumen de gente y cuál me sobraba. Vendían menos máquina de la que yo pensaba comprar. Eso me convenció.",
  },
  {
    nombre: "Beatriz Cantos",
    centro: "Gimnasio de hotel 4★",
    ciudad: "Marbella, Málaga",
    texto:
      "Equipamos la sala fitness del hotel con ellos. Diez máquinas, montaje incluido, y en dos semanas estaba operativo. Cero incidencias en año y medio de uso de huéspedes.",
  },
  {
    nombre: "Dr. Javier Ruiz",
    centro: "Centro de fisioterapia",
    ciudad: "Córdoba capital",
    texto:
      "Necesitaba equipos de recorrido controlado para rehabilitación, no máquinas de gimnasio puro. Me asesoraron sobre qué carga progresiva servía para mis pacientes. Se nota que entienden el uso.",
  },
  {
    nombre: "Nerea Salas",
    centro: "Estudio de entrenamiento personal",
    ciudad: "Sevilla",
    texto:
      "Monté mi estudio con 12 máquinas. Lo que más valoré: poder ir, tocarlo todo y decidir sin que me metieran prisa. El showroom marca la diferencia frente a comprar por catálogo.",
  },
  {
    nombre: "Antonio Jurado",
    centro: "Home gym premium",
    ciudad: "Puente Genil, Córdoba",
    texto:
      "Quería calidad comercial en casa sin pasarme de presupuesto. Me orientaron a tres máquinas que de verdad iba a usar, en lugar de venderme media sala. Trato cercano y honesto.",
  },
  {
    nombre: "Lucía Fernández",
    centro: "Cadena de gimnasios · 2 centros",
    ciudad: "Jaén",
    texto:
      "Trabajamos con ellos para el segundo centro tras la buena experiencia del primero. Cumplen plazos, instalan ellos mismos y dan la cara si algo falla. En este sector eso no es lo normal.",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS_HOME: Faq[] = [
  {
    q: "¿Tenéis envío a toda España?",
    a: "Sí. Servimos a toda la península con transporte especializado en maquinaria pesada. En Andalucía el montaje lo hace nuestro propio equipo técnico; en el resto de España coordinamos instalación con red de confianza.",
  },
  {
    q: "¿Puedo financiar la compra?",
    a: "Trabajamos con financiación para proyectos de equipamiento. Según el importe y el perfil, valoramos plazos a medida. Cuéntanos tu proyecto en el formulario de presupuesto y lo incluimos en la propuesta.",
  },
  {
    q: "¿Las máquinas tienen garantía?",
    a: "Todas las máquinas incluyen garantía sobre estructura y componentes. Las condiciones concretas dependen del equipo; te las detallamos por escrito en el presupuesto antes de comprar.",
  },
  {
    q: "¿Quién monta las máquinas?",
    a: "En Andalucía monta nuestro propio equipo, que conoce cada máquina. Coordinamos la entrega, subimos el equipo a tu local y lo dejamos listo para usar.",
  },
  {
    q: "¿Puedo ver una máquina antes de comprar?",
    a: "Para eso existe el showroom de 800 m² en Puente Genil. Puedes venir a probar el recorrido, la estabilidad y el tacto de las máquinas que te interesen antes de decidir. Es la forma honesta de invertir bien.",
  },
  {
    q: "¿Tenéis maquinaria de segunda mano u outlet?",
    a: "Trabajamos sobre todo equipamiento nuevo de uso comercial. Si buscas algo concreto de exposición o con alguna unidad disponible, pregúntanos y te decimos qué hay en cada momento.",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "Depende del stock y del volumen del pedido. Para proyectos completos solemos cerrar plazos de 1 a 3 semanas desde la confirmación. Si tienes una fecha de apertura, dínoslo y planificamos para llegar.",
  },
  {
    q: "¿Vendéis a particulares o solo a gimnasios?",
    a: "A ambos. Equipamos gimnasios comerciales, hoteles, fisioterapias y centros deportivos, pero también home gyms premium de particulares que quieren calidad comercial en casa.",
  },
  {
    q: "¿Tenéis catálogo PDF para descargar?",
    a: "Puedes ver las más de 160 máquinas en el catálogo de la web con precio y ficha técnica. Si necesitas un PDF para tu proyecto concreto, lo preparamos a medida con la selección que te recomendamos.",
  },
  {
    q: "¿Atendéis fines de semana?",
    a: "El showroom abre los sábados por la mañana, que suele ser el mejor momento para quien gestiona un gimnasio entre semana. Escríbenos y reservamos la visita en el horario que mejor te venga.",
  },
];

export const FAQS_SHOWROOM: Faq[] = [
  {
    q: "¿Necesito cita para visitar el showroom?",
    a: "No es obligatoria, pero recomendamos avisar para asegurarnos de tener a alguien que te asesore a fondo y prepare las máquinas que te interesan.",
  },
  {
    q: "¿Puedo probar las máquinas o solo verlas?",
    a: "Probarlas. La idea es justo esa: subirte, hacer el recorrido y comprobar la estabilidad y el tacto antes de invertir.",
  },
  {
    q: "¿Está lejos si vengo desde Sevilla, Málaga o Córdoba?",
    a: "Puente Genil está bien comunicado: alrededor de 1 hora desde Córdoba o Málaga y 1h30 desde Sevilla. Mucha gente lo combina con una visita de medio día.",
  },
  {
    q: "¿Tengo que comprar si voy?",
    a: "No. Visitas sin compromiso. Si lo que tenemos no encaja con tu proyecto, te lo decimos.",
  },
  {
    q: "¿Me podéis asesorar sobre cuánta máquina necesito?",
    a: "Sí, es parte de la visita. Según tu sala, tu público y tu presupuesto te decimos qué encaja y qué te sobra.",
  },
];

/**
 * Proceso de trabajo fusionado con los pilares del showroom: cada paso absorbe
 * el valor diferencial (asesoramiento sin presión, probar antes de invertir,
 * instalación propia). Cuatro pasos en lugar de pilares + pasos por separado.
 */
export const COMO_TRABAJAMOS = [
  {
    n: "01",
    titulo: "Pides presupuesto",
    texto: "Online o por WhatsApp. Te respondemos en menos de 4 h en horario comercial.",
  },
  {
    n: "02",
    titulo: "Te asesoramos sin presión",
    texto:
      "Entendemos tu sala, tu público y tu presupuesto, y te decimos qué encaja y qué te sobra. Si no es lo que buscas, te lo decimos.",
  },
  {
    n: "03",
    titulo: "Lo pruebas en el showroom",
    texto:
      "800 m² en Puente Genil para subirte y comprobar recorrido y estabilidad. Una máquina de 1.500 € no se compra a ciegas.",
  },
  {
    n: "04",
    titulo: "Entregamos e instalamos",
    texto: "Coordinamos transporte y montaje en tu local. En Andalucía, con técnico propio.",
  },
];

export interface CasoExito {
  centro: string;
  ciudad: string;
  resumen: string;
}

/** Casos de éxito verosímiles por tipo de proyecto. Sustituir por reales. */
export const CASOS_EXITO: Record<string, CasoExito[]> = {
  "gimnasio-comercial": [
    {
      centro: "Gimnasio de barrio · 420 socios",
      ciudad: "Lucena, Córdoba",
      resumen:
        "Renovaron la sala de musculación completa con 32 máquinas. Probaron todo en showroom antes de cerrar y ajustaron la selección para ganar 15 m² de zona libre.",
    },
    {
      centro: "Centro low-cost de nueva apertura",
      ciudad: "Antequera, Málaga",
      resumen:
        "Equiparon de cero para abrir: carga de discos, selectorizada y peso libre. Montaje en dos semanas y apertura en fecha.",
    },
  ],
  hotel: [
    {
      centro: "Hotel 4★ · gimnasio de huéspedes",
      ciudad: "Marbella, Málaga",
      resumen:
        "Sala compacta de 10 máquinas fiables y de bajo mantenimiento. Año y medio de uso intensivo de huéspedes sin incidencias.",
    },
    {
      centro: "Complejo deportivo municipal",
      ciudad: "Écija, Sevilla",
      resumen:
        "Cardio y musculación para uso público continuado, con asesoramiento sobre durabilidad y garantía a largo plazo.",
    },
  ],
  fisioterapia: [
    {
      centro: "Clínica de fisioterapia y readaptación",
      ciudad: "Córdoba capital",
      resumen:
        "Selección de equipos de recorrido controlado y carga progresiva para trabajo terapéutico, no de gimnasio puro.",
    },
  ],
  "estudio-personal": [
    {
      centro: "Estudio de entrenamiento personal",
      ciudad: "Sevilla",
      resumen:
        "12 máquinas versátiles para sesiones 1-a-1 y grupos reducidos. El dueño eligió tras probarlo todo en showroom.",
    },
  ],
  "home-gym": [
    {
      centro: "Home gym premium en chalet",
      ciudad: "Puente Genil, Córdoba",
      resumen:
        "Tres máquinas de calidad comercial que de verdad iba a usar, en lugar de media sala desaprovechada.",
    },
  ],
};

export const SHOWROOM_PILARES = [
  {
    titulo: "Pruébala antes de invertir",
    texto:
      "Una máquina de 1.500 € no se compra a ciegas. Súbete, prueba el recorrido y comprueba la estabilidad antes de decidir.",
  },
  {
    titulo: "Asesoramiento real",
    texto:
      "Si tienes una sala de 80 m², no necesitas todas las máquinas. Te decimos cuáles encajan según público y espacio.",
  },
  {
    titulo: "Sin presión comercial",
    texto:
      "Visitas el showroom cuando quieras, sin compromiso. Si no es lo que buscas, te lo decimos.",
  },
  {
    titulo: "Instalación y transporte",
    texto:
      "Coordinamos la entrega y el montaje en tu local. En Andalucía, con técnico propio.",
  },
];
