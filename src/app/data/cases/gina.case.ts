import type { RescueCase } from '../../core/models/rescue-case.model';

export const GINA_CASE = {
  slug: 'gina',
  name: 'Gina',

  statuses: ['memorial'],

  featured: false,

  summary:
    'Gina era una gata feral que fue atropellada en Av. Don Bosco. Después de varias horas de búsqueda lograron encontrarla gravemente herida en una cuneta y trasladarla a la veterinaria. A pesar de todos los esfuerzos por estabilizarla, falleció dos días después.',

  coverImage: {
    src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787519723/WhatsApp_Image_2026-08-23_at_18.04.07.jpg',
    width: 1200,
    height: 1600,
    alt: 'Gina durante su internación veterinaria',
    objectPosition: 'center',
  },

  gallery: [
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787519722/WhatsApp_Image_2026-08-23_at_18.04.07_1.jpg',
      width: 1200,
      height: 1600,
      alt: 'Gina luego de ser rescatada',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787519722/WhatsApp_Image_2026-08-23_at_18.04.07_2.jpg',
      width: 1200,
      height: 1600,
      alt: 'Gina recibiendo atención veterinaria',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787519722/WhatsApp_Image_2026-08-23_at_18.04.08.jpg',
      width: 1200,
      height: 1600,
      alt: 'Gina durante su internación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787519722/WhatsApp_Image_2026-08-23_at_18.04.07_3.jpg',
      width: 1200,
      height: 1600,
      alt: 'Gina durante su internación',
    },
  ],

  story: [
    'Gina era una gata feral que sobrevivía en la zona de Av. Don Bosco.',

    'Su historia comenzó cuando fue atropellada por un auto que, según la información difundida durante el rescate, estaba corriendo picadas.',

    'Después del impacto logró alejarse del lugar. Durante varias horas estuvieron buscándola hasta que finalmente pudieron encontrarla gravemente herida dentro de una cuneta.',

    'Estaba sola, mojada, embarrada y prácticamente sin poder movilizarse. A pesar del estado en el que se encontraba, había conseguido arrastrarse hasta allí después del atropello.',

    'Jesi fue una de las personas que ayudó a que su historia no terminara en aquella cuneta: la vio, difundió el pedido de ayuda y permaneció en el lugar hasta que pudieron llegar para rescatarla.',

    'Una vez encontrada fue trasladada de urgencia a la veterinaria para intentar estabilizarla. Desde ese momento dejó de ser solamente una gata feral herida en la calle. Recibió un nombre: Gina.',

    'La evaluación veterinaria mostró un cuadro extremadamente delicado. Presentaba una fractura de columna, no lograba regular correctamente su temperatura corporal y apenas conservaba pequeños reflejos.',

    'Gina quedó internada mientras el equipo veterinario intentaba estabilizarla y evaluar si existía alguna posibilidad de recuperación.',

    'Durante los dos días siguientes se hizo todo lo posible para darle esa oportunidad, pero la gravedad de las lesiones que había sufrido terminó siendo demasiado grande.',

    'Su organismo comenzó a dejar de responder. Gina no reaccionaba a los estímulos, no podía orinar ni defecar y no fue posible conseguir que regulara su temperatura corporal.',

    'Finalmente, Gina falleció.',

    'No fue posible cambiar el desenlace de su historia, pero sí algo fundamental: aquella cuneta fría, mojada y solitaria no terminó convirtiéndose en su tumba.',

    'Durante sus últimas horas hubo personas a su lado. Recibió atención veterinaria, cuidados y una mano amiga que decidió no dejarla sola.',

    'Gina tuvo una oportunidad. Durante dos días hubo personas intentando salvarla y acompañándola hasta el último momento.',

    'Su paso fue breve, pero dejó una de esas historias que recuerdan por qué ayudar sigue importando incluso cuando un rescate no consigue el final que todos esperaban.',
  ],

  currentNeeds: [],

  updates: [
    {
      date: '2026-05-01',
      title: 'El rescate de Gina',
      paragraphs: [
        'Gina era una gata feral que fue atropellada en Av. Don Bosco por un vehículo que, según la información difundida durante el rescate, estaba corriendo picadas.',

        'Después del impacto logró desplazarse y durante varias horas estuvieron buscándola.',

        'Finalmente pudieron encontrarla dentro de una cuneta. Estaba gravemente herida, mojada, embarrada y prácticamente sin poder movilizarse.',

        'Jesi la vio, difundió el pedido de ayuda y permaneció en el lugar hasta que pudieron llegar para rescatarla.',

        'Una vez encontrada fue trasladada de urgencia a la veterinaria para intentar estabilizarla.',
      ],
    },

    {
      date: '2026-05-01',
      title: 'Un cuadro extremadamente delicado',
      paragraphs: [
        'Después del rescate recibió el nombre de Gina.',

        'La evaluación veterinaria mostró que presentaba una fractura de columna.',

        'Su estado era muy delicado: no conseguía regular correctamente su temperatura corporal y apenas conservaba pequeños reflejos.',

        'Gina quedó internada para intentar estabilizarla y continuar evaluando su evolución.',

        'A pesar del pronóstico, se decidió darle todas las oportunidades posibles.',
      ],
    },

    {
      date: '2026-05-02',
      title: 'Gina no resistió',
      paragraphs: [
        'Después de dos días de lucha, Gina no pudo resistir la gravedad de las heridas sufridas.',

        'Dejó de responder a los estímulos, no orinaba ni defecaba y en ningún momento se consiguió regular su temperatura corporal.',

        'Finalmente falleció.',

        'La tristeza y la impotencia fueron enormes, pero quedó el consuelo de saber que aquella cuneta fría y solitaria no terminó siendo su tumba.',

        'Durante sus últimas horas Gina estuvo acompañada, recibió atención veterinaria y hubo personas intentando darle una oportunidad hasta el último momento.',
      ],
    },
  ],

  updatedAt: '2026-05-02',

  seoDescription:
    'Conocé la historia de Gina, una gata feral atropellada en Av. Don Bosco que fue rescatada de una cuneta y recibió atención veterinaria durante sus últimos días.',
} satisfies RescueCase;
