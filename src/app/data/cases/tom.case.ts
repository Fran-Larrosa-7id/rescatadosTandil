import type { RescueCase } from '../../core/models/rescue-case.model';

export const TOM_CASE = {
  slug: 'tom',
  name: 'Tom',
  statuses: ['treatment'],
  featured: true,

  summary:
    'Tom perdió a la familia que lo cuidó durante años y quedó solo en la casa que alguna vez fue su hogar. Está sano, castrado y en buen estado general, pero ahora necesita tiempo, contención y una nueva oportunidad.',

  coverImage: {
    src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1789223625/WhatsApp_Image_2026-09-12_at_11.32.52.jpg',
    width: 1200,
    height: 1200,
    alt: 'Tom, gato rescatado después de quedar solo tras perder a su familia',
    objectPosition: 'center',
  },

  gallery: [],

  story: [
    'Tom tenía una familia. Durante años vivió con un matrimonio y su hija, quienes lo cuidaban con muchísimo amor.',

    'Hace aproximadamente un año, esa familia se desarmó para siempre. El matrimonio falleció y su hija tuvo que ser trasladada, por lo que Tom quedó solo en la casa que hasta entonces había sido su hogar.',

    'Con el paso de los días comenzaron a retirar las pertenencias de la vivienda, una por una, mientras Tom seguía allí. Entre paredes llenas de recuerdos, esperaba a las personas que habían sido su familia y que ya no iban a volver.',

    'Tom no estaba enfermo, no estaba lastimado y tenía comida. Pero estaba completamente solo.',

    'Cuando Aldana conoció su situación decidió que no podía permanecer un día más allí. Tom salió de aquella casa y fue llevado a la veterinaria para realizarle un control completo.',

    'Esta vez ocurrió algo poco habitual en un rescate: Tom llegó sano. Tiene aproximadamente entre 5 y 6 años, está castrado, pesa casi 6 kilos y clínicamente se encuentra en perfecto estado.',

    'Su recuperación no necesita grandes tratamientos. Necesita unos días tranquilos para bajar el miedo y el estrés, buena alimentación y, sobre todo, mucho amor.',

    'Después de perder todo lo que conocía, ahora Tom necesita aprender que alguien puede quedarse. Que una puerta puede abrirse sin significar una despedida. Que una casa puede volver a convertirse en un hogar.',

    'Tom sobrevivió a perder a su familia. Ahora comienza la búsqueda de una nueva oportunidad donde alguien vuelva a elegirlo.',
  ],

  currentNeeds: [
    {
      title: 'Un nuevo hogar',
      description:
        'Tom necesita encontrar una familia que pueda ofrecerle nuevamente un hogar estable, tranquilo y lleno de cariño.',
    },
    {
      title: 'Adaptación y contención',
      description:
        'Después de todo lo vivido necesita unos días de tranquilidad para disminuir el miedo y el estrés y poder adaptarse a esta nueva etapa.',
    },
    {
      title: 'Buena alimentación',
      description:
        'La indicación es acompañar su alimentación habitual con pollo mientras atraviesa los primeros días de adaptación.',
    },
  ],

  updates: [
    {
      date: '2026-09-12',
      title: 'Tom salió de la casa donde había quedado completamente solo',
      paragraphs: [
        'Tom tenía una familia: un matrimonio y su hija, quienes durante años lo cuidaron con muchísimo amor. Tras el fallecimiento del matrimonio y el traslado de su hija, quedó solo en la casa que alguna vez fue su hogar.',

        'Mientras las pertenencias de la vivienda comenzaron a retirarse, Tom permaneció allí esperando. No estaba herido ni enfermo, pero había perdido a las personas y al hogar que conocía.',

        'Finalmente pudo salir de aquella casa y fue llevado a la veterinaria para realizarle un control completo.',

        'Tom tiene aproximadamente entre 5 y 6 años, está castrado, pesa casi 6 kilos y clínicamente se encuentra perfecto.',

        'Ahora necesita tranquilidad, buena alimentación, mucho cariño y, principalmente, encontrar una nueva familia que pueda volver a elegirlo.',

        'La deuda veterinaria general de los rescates de Aldana asciende actualmente a aproximadamente $1.100.000. Este monto corresponde a gastos acumulados de distintos casos y no exclusivamente a la atención de Tom.',
      ],
    },
  ],

  updatedAt: '2026-09-12',

  seoDescription:
    'Conocé la historia de Tom, un gato de aproximadamente 5 o 6 años que perdió a su familia y quedó solo en la casa que alguna vez fue su hogar. Está sano y ahora busca una nueva oportunidad.',
} satisfies RescueCase;
