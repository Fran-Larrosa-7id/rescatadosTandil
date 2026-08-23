import type { RescueCase } from '../../core/models/rescue-case.model';

export const RAFA_CASE = {
  slug: 'rafa',
  name: 'Rafa',

  statuses: ['memorial'],

  featured: false,

  summary:
    'Rafa fue encontrado atropellado en Bolívar al 500. Llegó a la veterinaria en estado crítico, con múltiples fracturas, hipotermia y un fuerte traumatismo. A pesar de los esfuerzos por estabilizarlo, su cuadro se agravó durante el mismo día y falleció acompañado.',

  coverImage: {
    src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787520343/WhatsApp_Image_2026-08-23_at_18.16.43.jpg',
    width: 1200,
    height: 1600,
    alt: 'Rafa durante su internación veterinaria',
    objectPosition: 'center',
  },

  gallery: [
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787520343/WhatsApp_Image_2026-08-23_at_18.16.42.jpg',
      width: 1200,
      height: 1600,
      alt: 'Rafa recibiendo atención veterinaria luego de su rescate',
    },
  ],

  story: [
    'Rafa fue encontrado atropellado durante la mañana del 23 de abril de 2026 en Bolívar al 500, en Tandil.',

    'El caso comenzó a difundirse buscando ayuda y también intentando encontrar a sus posibles dueños. Era un gato macho, sin castrar y que se veía bien alimentado, por lo que existía la posibilidad de que tuviera una familia que lo estuviera buscando.',

    'David Villoslada no dudó en acercarse para socorrerlo. Rafa fue retirado del lugar y recibió una primera asistencia antes de ser derivado inmediatamente a Clínica San Lorenzo debido a la gravedad de sus heridas.',

    'El accidente le había provocado lesiones muy importantes. Presentaba la lengua cortada, fractura de mandíbula, fractura de cadera e hipotermia. Además tenía una gran cantidad de pulgas y durante la evaluación detectaron un soplo cardíaco.',

    'Rafa quedó internado y con oxígeno mientras intentaban estabilizarlo. Las primeras 24 horas eran consideradas fundamentales y su estado era extremadamente delicado.',

    'Durante las primeras horas existió la esperanza de que pudiera superar el momento más crítico, pero con el transcurso de la tarde su cuadro comenzó a complicarse.',

    'Los estudios mostraron además que había sufrido un golpe muy fuerte en la cabeza y que tenía la vejiga fisurada. La lesión de la vejiga podía ser operada, pero su estado general era tan grave que someterlo a una cirugía en ese momento no era posible.',

    'A pesar de los esfuerzos realizados para estabilizarlo, Rafa finalmente falleció ese mismo día.',

    'Su historia fue muy corta, pero no terminó solo en el lugar donde había sido atropellado. David estuvo pendiente de él desde el rescate y, después de su fallecimiento, volvió a buscarlo para poder darle una despedida digna.',

    'No se pudo cambiar el desenlace, pero sí acompañarlo. Rafa recibió atención, cuidados y personas que hicieron todo lo posible por darle una oportunidad hasta el último momento.',

    'Rafita no murió solo en un pasto frío. Durante sus últimas horas hubo personas luchando por él, y su historia quedó marcada por quienes decidieron detenerse y ayudarlo.',
  ],

  currentNeeds: [],

  updates: [
    {
      date: '2026-04-23',
      title: 'Rafa llega de urgencia a la veterinaria',
      paragraphs: [
        'Durante la mañana encontraron a Rafa atropellado en Bolívar al 500.',

        'Era un gato macho sin castrar y se veía bien alimentado, por lo que también comenzó la búsqueda de posibles dueños.',

        'David Villoslada acudió a socorrerlo. Después de una primera asistencia, Rafa fue derivado inmediatamente a Clínica San Lorenzo debido a la gravedad de sus heridas.',

        'Presentaba la lengua cortada, fractura de mandíbula, fractura de cadera e hipotermia.',

        'También tenía una gran cantidad de pulgas y durante la evaluación detectaron un soplo en el corazón.',

        'Su estado era muy grave. Quedó internado y con oxígeno mientras intentaban estabilizarlo. Las primeras 24 horas iban a ser cruciales.',
      ],
    },

    {
      date: '2026-04-23',
      title: 'Su cuadro se complica',
      paragraphs: [
        'Durante las primeras horas existía la esperanza de que Rafa pudiera estabilizarse, pero con el transcurso de la tarde su estado empeoró.',

        'Además de las lesiones inicialmente observadas, presentaba un golpe muy fuerte en la cabeza y una fisura en la vejiga.',

        'La lesión de la vejiga era operable, pero debido a la extrema gravedad de su estado una cirugía en ese momento no era posible.',

        'El equipo veterinario continuó intentando estabilizarlo.',
      ],
    },

    {
      date: '2026-04-23',
      title: 'Hasta siempre, Rafita',
      paragraphs: [
        'Lamentablemente Rafa no logró resistir las graves lesiones provocadas por el atropello y falleció.',

        'Aunque el desenlace fue doloroso, no estuvo solo. Desde el momento en que fue encontrado hubo personas intentando darle una oportunidad.',

        'David, que había ido a buscarlo y estuvo pendiente de su evolución, volvió después para poder enterrarlo y darle una despedida digna.',

        'No pudimos cambiar el final de su historia, pero Rafa estuvo acompañado hasta el último momento.',
      ],
    },
  ],

  updatedAt: '2026-04-23',

  seoDescription:
    'Conocé la historia de Rafa, un gato encontrado atropellado en Bolívar al 500 que recibió atención veterinaria de urgencia y fue acompañado hasta el final.',
} satisfies RescueCase;
