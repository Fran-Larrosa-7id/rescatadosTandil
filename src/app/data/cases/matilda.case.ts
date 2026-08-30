import type { RescueCase } from '../../core/models/rescue-case.model';

/**
 * Caso real de Matilda.
 *
 * Cronología:
 * - 03/03/2026: ingreso con sarna sarcóptica y defensas muy bajas.
 * - 07/03/2026: evolución favorable durante el tratamiento.
 * - 21/03/2026: recuperación completa y adopción.
 *
 * IMPORTANTE:
 * Los montos mencionados dentro de `updates` corresponden a fotografías
 * históricas de la deuda veterinaria GENERAL informada por la rescatista.
 * No representan una deuda individual de Matilda.
 *
 * El alias y titular actuales deben seguir obteniéndose desde DONATION_CONFIG.
 */
export const MATILDA_CASE = {
  slug: 'matilda',
  name: 'Matilda',

  statuses: ['recovering', 'closed'],

  featured: false,

  summary:
    'Matilda llegó con apenas dos meses de vida, menos de un kilo de peso y un cuadro severo de sarna sarcóptica asociado a defensas muy bajas. Con tratamiento, buena alimentación y los cuidados de su tránsito logró recuperarse por completo y encontró una familia.',

  coverImage: {
    src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1788008637/WhatsApp_Image_2026-08-23_at_19.39.20_1.jpg',
    width: 1600,
    height: 900,
    alt: 'Matilda recuperada después de su tratamiento',
    objectPosition: '50% 40%',
  },

  gallery: [
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1788008637/WhatsApp_Image_2026-08-23_at_19.39.19.jpg',
      width: 900,
      height: 1600,
      alt: 'Matilda durante sus primeros días de tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1788008637/WhatsApp_Image_2026-08-23_at_19.39.20.jpg',
      width: 900,
      height: 1600,
      alt: 'Matilda recuperándose de la sarna sarcóptica',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1788008637/WhatsApp_Image_2026-08-23_at_19.39.20_2.jpg',
      width: 900,
      height: 1600,
      alt: 'Matilda completamente recuperada',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1788008637/WhatsApp_Image_2026-08-23_at_19.39.20_3.jpg',
      width: 900,
      height: 1600,
      alt: 'Matilda disfrutando de su nueva vida',
    },
  ],

  story: [
    'Matilda llegó a comienzos de marzo con apenas unos dos meses de vida y menos de un kilo de peso. A pesar de ser tan pequeña, ya había tenido que conocer el dolor.',

    'Fue diagnosticada con sarna sarcóptica, un cuadro poco frecuente en gatos que, en su caso, estaba acompañado por un sistema inmune tremendamente debilitado. La picazón era intensa y al rascarse se había lastimado la piel.',

    'Aun atravesando todo eso, Matilda era una gatita muy mimosa, activa y con muy buen apetito. Comenzó su tratamiento y quedó al cuidado de Mica, quien decidió transitarla y acompañarla durante la recuperación.',

    'Además del tratamiento veterinario, necesitaba una alimentación de muy buena calidad para recuperar peso y fortalecer sus defensas. Poco a poco empezó a mejorar y, apenas unos días después, el cambio ya era notable: su piel evolucionaba favorablemente y su ánimo estaba excelente.',

    'Con el paso de las semanas Matilda consiguió recuperarse completamente. Volvió a tener la energía propia de una cachorra, se mostró sociable con otros gatos, fue desparasitada y comenzó a dejar atrás definitivamente aquellos primeros días tan difíciles.',

    'Su historia terminó de la mejor manera: después de recuperarse, Matilda encontró una familia. La pequeña que había llegado enferma, con las defensas por el piso y necesitando ayuda para salir adelante pudo comenzar una nueva etapa rodeada de cuidados y amor.',
  ],

  currentNeeds: [],

  updates: [
    {
      date: '2026-03-21',
      title: 'Matilda está recuperada y encontró una familia',
      paragraphs: [
        'Después de varias semanas de tratamiento y cuidados, Matilda logró recuperarse completamente de la sarna con la que había llegado.',

        'La pequeña estaba llena de vida y energía, se llevaba muy bien con otros gatos y disfrutaba de cosas tan simples como jugar con cajas y dormir en la cama.',

        'También ya había sido desparasitada. Como parte de esta nueva etapa, debía continuar con su correspondiente plan de vacunación y una buena alimentación.',

        'La publicación confirmó además la noticia más esperada: Matilda encontró una familia y pudo cerrar definitivamente la etapa más difícil de su historia.',
      ],
    },

    {
      date: '2026-03-07',
      title: 'Una evolución enorme en pocos días',
      paragraphs: [
        'Apenas unos días después de iniciar el tratamiento, Matilda se encontraba muchísimo mejor de la sarna.',

        'Su ánimo era excelente: se mostraba muy activa, juguetona y curiosa. Incluso al salir de la veterinaria quería observar todo lo que ocurría a su alrededor.',

        'En ese momento continuaba necesitando controles, medicación y alimentación de buena calidad para fortalecer sus defensas y seguir recuperándose.',

        'En esta actualización la rescatista informó una deuda veterinaria general de $656.271. Ese monto incluía gastos de distintos rescates, entre ellos cirugía y controles de Feli, atención, medicación y controles de Matilda, además de alimento para animales que se encontraban en tránsito.',
      ],
    },

    {
      date: '2026-03-03',
      title: 'Matilda ingresó con apenas dos meses y sarna sarcóptica',
      paragraphs: [
        'Matilda ingresó a la veterinaria con aproximadamente dos meses de vida y menos de un kilo de peso.',

        'Fue diagnosticada con sarna sarcóptica. Según se informó en ese momento, se trataba de un cuadro muy poco frecuente en gatos y evidenciaba que su sistema inmune se encontraba muy debilitado.',

        'La picazón le provocaba mucho malestar y se había lastimado al rascarse. A pesar de eso, Matilda era muy mimosa y conservaba un excelente apetito.',

        'Comenzó tratamiento veterinario y quedó bajo el cuidado de Mica durante su tránsito. Las primeras 48 horas eran importantes para observar cómo respondía al tratamiento.',

        'Además necesitaba alimentación de muy buena calidad y alimento de recuperación para ganar peso y ayudar a fortalecer sus defensas.',
      ],
    },
  ],

  updatedAt: '2026-03-21',

  seoDescription:
    'Conocé la historia de Matilda, una gatita rescatada con apenas dos meses y un cuadro de sarna sarcóptica que logró recuperarse completamente y encontrar una familia.',
} satisfies RescueCase;
