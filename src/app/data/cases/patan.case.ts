import type { RescueCase } from '../../core/models/rescue-case.model';

/**
 * Caso real de Patán.
 *
 * Cronología principal:
 * - 07/05/2026: pedido urgente de ayuda y búsqueda de tránsito.
 * - 08/05/2026: rescate, traslado y primera atención veterinaria.
 * - 09/05/2026: primeros controles y comienzo de la recuperación.
 * - 11/05/2026: análisis, controles y estudios prequirúrgicos.
 * - 16/05/2026: estudios favorables y confirmación de la cirugía.
 * - 18/05/2026: amputación del miembro inferior izquierdo,
 *   extracción de un balín, extracción de una masa y castración.
 * - 19/05/2026: comienza su recuperación postquirúrgica.
 * - 28/05/2026: evolución muy favorable.
 * - 01/06/2026: último control, retiro de puntos y herida cicatrizada.
 *
 * IMPORTANTE:
 * Los montos mencionados dentro de `updates` son fotografías históricas de la
 * deuda veterinaria GENERAL informada en cada publicación. No representan
 * necesariamente una deuda individual exclusiva de Patán ni deben utilizarse
 * para barras de progreso.
 *
 * Las publicaciones originales utilizaban el alias histórico `almen.3589`.
 * El alias y titular actuales deben seguir obteniéndose desde DONATION_CONFIG.
 */
export const PATAN_CASE = {
  slug: 'patan',
  name: 'Patán',
  statuses: ['closed'],
  featured: true,

  summary:
    'Patán es un galgo de aproximadamente 4 años que sobrevivió durante años en la calle. Fue rescatado con una fractura expuesta e infectada después de pasar varios días refugiado debajo de unas chapas. Tras semanas de cuidados y una cirugía de amputación, logró recuperarse y empezar una vida completamente nueva.',

  coverImage: {
    src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505883/WhatsApp_Image_2026-08-23_at_12.23.00_2.jpg',
    width: 1600,
    height: 900,
    alt: 'Patán durante su recuperación',
    objectPosition: '50% 40%',
  },

  gallery: [
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505881/WhatsApp_Image_2026-08-23_at_12.22.57.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán al comienzo de su rescate',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505880/WhatsApp_Image_2026-08-23_at_12.22.57_1.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán durante sus primeros controles veterinarios',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505881/WhatsApp_Image_2026-08-23_at_12.22.57_2.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán con su pata vendada durante el tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505881/WhatsApp_Image_2026-08-23_at_12.22.57_3.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán después de su cirugía de amputación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505881/WhatsApp_Image_2026-08-23_at_12.22.57_4.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán recuperándose después de la cirugía',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505881/WhatsApp_Image_2026-08-23_at_12.22.58.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán disfrutando de su nueva vida durante la recuperación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505881/WhatsApp_Image_2026-08-23_at_12.22.58_1.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán disfrutando de su nueva vida durante la recuperación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505882/WhatsApp_Image_2026-08-23_at_12.22.59.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán disfrutando de su nueva vida durante la recuperación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505881/WhatsApp_Image_2026-08-23_at_12.22.59_1.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán disfrutando de su nueva vida durante la recuperación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505881/WhatsApp_Image_2026-08-23_at_12.22.59_2.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán disfrutando de su nueva vida durante la recuperación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505882/WhatsApp_Image_2026-08-23_at_12.22.59_3.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán disfrutando de su nueva vida durante la recuperación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505882/WhatsApp_Image_2026-08-23_at_12.22.59_4.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán disfrutando de su nueva vida durante la recuperación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505880/WhatsApp_Image_2026-08-23_at_12.23.00.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán disfrutando de su nueva vida durante la recuperación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787505883/WhatsApp_Image_2026-08-23_at_12.23.00_1.jpg',
      width: 900,
      height: 1600,
      alt: 'Patán disfrutando de su nueva vida durante la recuperación',
    },
  ],

  story: [
    'Patán es un galgo de aproximadamente 4 años. Durante prácticamente toda su vida conoció la calle, el frío, el hambre y la necesidad de sobrevivir con lo que pudiera encontrar.',

    'A comienzos de mayo de 2026 una vecina pidió ayuda por él. Había sido mordido por otro perro y llevaba varios días refugiado debajo de unas chapas en el barrio La Unión. La mujer que lo encontró intentaba alimentarlo y darle antibióticos, pero la lesión continuó empeorando hasta dejar parte del hueso completamente expuesto.',

    'Cuando finalmente pudieron rescatarlo, el cuadro era mucho más complejo de lo que se veía a simple vista. Patán tenía una fractura expuesta con infección que alcanzaba el hueso, lesiones anteriores, una fractura vieja mal consolidada, piezas dentales dañadas y balines o perdigones alojados debajo de la piel.',

    'Aun después de haber pasado por todo eso, seguía moviendo la cola cuando recibía una caricia. Después de años sobreviviendo y desconfiando del mundo, Patán comenzó a descubrir que no todas las manos lastiman.',

    'Uno de los primeros grandes desafíos fue conseguirle un tránsito. Una vez encontrado, pudo dormir por primera vez dentro de una casa, sobre un sillón, con comida todos los días y personas pendientes de su recuperación. Para un perro que había pasado su vida durmiendo bajo chapas, ese simple momento marcó el comienzo de otra vida.',

    'Los primeros días estuvieron llenos de controles veterinarios. Necesitó suero por deshidratación, antibióticos, curaciones, cambios de vendaje y una alimentación especial mientras recuperaba fuerzas. También comenzaron los análisis y estudios necesarios para determinar cuándo estaría en condiciones de ser operado.',

    'Durante los estudios apareció además una pequeña masa que debía continuar evaluándose. Se realizaron análisis de sangre, ecografía y placas antes de poder avanzar con la cirugía.',

    'Los profesionales determinaron que la pata lesionada ya no podía salvarse. La infección, la fractura expuesta y el tiempo transcurrido sin atención hacían necesaria la amputación para darle una verdadera oportunidad de vida.',

    'El 18 de mayo llegó finalmente el día de la cirugía. Se amputó el miembro inferior izquierdo, se retiró uno de los balines que tenía alojados en el cuerpo, se extrajo la masa encontrada durante los controles y también fue castrado. La muestra extraída fue enviada a analizar. En las publicaciones aportadas no se informa posteriormente el resultado de ese estudio.',

    'La cirugía salió bien. Apenas unas horas después Patán ya estaba comiendo y comenzando el camino de recuperación. Después de una vida sobreviviendo en la calle, ese día fue presentado como su nuevo comienzo.',

    'Los días siguientes mostraron un cambio enorme. Volvió a comer con ganas, empezó a relacionarse con otros animales de la casa, buscaba cariño, movía la cola y cada vez estaba más cómodo con su nueva realidad.',

    'El 28 de mayo ya había atravesado la parte más difícil del proceso. Seguía recuperándose de la cirugía, pero estaba muchísimo mejor y comenzaba a disfrutar de las pequeñas cosas que antes nunca había tenido: una cama, compañía, alimento, caricias y personas preocupadas por él.',

    'Finalmente, el 1 de junio tuvo su último control. Le retiraron los puntos, la herida estaba completamente cicatrizada y pudo despedirse del collar isabelino. Incluso durante el procedimiento estaba tan tranquilo que se quedó dormido.',

    'Patán pasó de esconderse herido debajo de unas chapas a dormir bajo techo y rodeado de cuidados. Perdió una pata, pero ganó algo que hasta ese momento prácticamente no había conocido: la posibilidad de dejar de sobrevivir y empezar a vivir.',
  ],

  currentNeeds: [],

  updates: [
    {
      date: '2026-06-01',
      title: 'Último control y una herida completamente cicatrizada',
      paragraphs: [
        'Patán tuvo su último control veterinario después de la cirugía.',

        'Le retiraron los puntos y los profesionales encontraron la herida en excelentes condiciones, completamente cicatrizada.',

        'También pudo dejar definitivamente el collar isabelino que había utilizado durante buena parte de su recuperación.',

        'La tranquilidad de Patán durante el procedimiento fue tal que, mientras le retiraban los puntos, se quedó dormido.',

        'La publicación marcó el cierre de la etapa médica más difícil de su historia y el comienzo definitivo de su nueva vida.',

        'En esa actualización se informó una deuda veterinaria general de $1.320.208.',
      ],
    },

    {
      date: '2026-05-28',
      title: 'Patán ya había pasado por lo más difícil',
      paragraphs: [
        'Después del abandono, la fractura, la infección y una cirugía enorme, Patán se encontraba muchísimo mejor.',

        'Comía, movía la cola, pedía mimos y empezaba a mostrar cada vez más su personalidad.',

        'También comenzó a compartir espacios con los demás animales de la casa. En una de las publicaciones aparece junto a su compañera María Macanas, con quien ya comenzaba a convivir.',

        'Para ese momento la deuda veterinaria general todavía superaba el millón de pesos, por lo que continuaban solicitándose colaboraciones y difusión.',
      ],
    },

    {
      date: '2026-05-23',
      title: 'Una recuperación que avanzaba muy bien',
      paragraphs: [
        'Patán continuaba evolucionando favorablemente después de la cirugía.',

        'Todavía debía utilizar collar isabelino para evitar que pudiera tocarse la zona operada, pero su recuperación avanzaba muy bien.',

        'Ya se encontraba viviendo bajo techo, acompañado y recibiendo todos los cuidados necesarios.',
      ],
    },

    {
      date: '2026-05-22',
      title: 'El control veterinario salió muy bien',
      paragraphs: [
        'Patán volvió a control y los profesionales lo encontraron muy bien.',

        'El proceso postquirúrgico continuaba evolucionando favorablemente y el foco comenzaba a pasar de la urgencia médica a completar su recuperación.',

        'En esa publicación la rescatista informó que la deuda veterinaria general ascendía aproximadamente a $1.500.000, además de los gastos de alimentación de los animales bajo cuidado.',
      ],
    },

    {
      date: '2026-05-20',
      title: 'Cada día un poco más fuerte',
      paragraphs: [
        'Dos días después de la cirugía, Patán ya mostraba una recuperación muy favorable.',

        'Comenzaba a relacionarse con otros animales, estaba más cómodo y seguía demostrando un excelente ánimo.',

        'También se recibían donaciones de alimento de buena calidad para ayudarlo a recuperar peso después de todo lo que había atravesado.',
      ],
    },

    {
      date: '2026-05-19',
      title: 'Patán volvió a nacer',
      paragraphs: [
        'Después de años sobreviviendo en la calle y de llegar con una fractura expuesta que llevaba varios días sin tratamiento adecuado, Patán finalmente había podido ser operado.',

        'La amputación permitió dejar atrás una lesión que ya no podía recuperarse y comenzar un camino completamente nuevo.',

        'Después de la cirugía se encontraba tranquilo, cuidado y con ganas de seguir adelante.',

        'En esta publicación se informó una deuda veterinaria general de $1.456.217 y también una entrega de $53.000 para continuar reduciendo los gastos acumulados.',
      ],
    },

    {
      date: '2026-05-18',
      title: 'La cirugía salió bien',
      paragraphs: [
        'Se realizó finalmente la cirugía de Patán.',

        'Durante la intervención se amputó el miembro inferior izquierdo, se retiró uno de los balines alojados en su cuerpo, se extrajo una masa encontrada durante los controles y también fue castrado.',

        'La masa extraída fue enviada a analizar para obtener más información. En las publicaciones aportadas no aparece posteriormente informado el resultado de ese análisis.',

        'La cirugía salió bien y, durante la tarde, Patán ya había comido mientras continuaba bajo seguimiento veterinario.',

        'Antes de incorporar el costo de la cirugía, internación, medicación y controles posteriores, las publicaciones mencionaban una deuda veterinaria general cercana a $1.006.000.',
      ],
    },

    {
      date: '2026-05-17',
      title: 'Todo listo para la operación',
      paragraphs: [
        'Los estudios necesarios para avanzar con la cirugía habían dado resultados favorables.',

        'La amputación estaba programada para el día siguiente y se pidió acompañamiento para Patán antes de uno de los momentos más importantes de su recuperación.',
      ],
    },

    {
      date: '2026-05-16',
      title: 'La cirugía ya tenía fecha',
      paragraphs: [
        'Patán continuaba con controles, curaciones y cambios de vendaje mientras esperaba la cirugía.',

        'También se habían realizado ecografía, placas y análisis. En los estudios podía observarse además otro balín alojado en su cuerpo.',

        'Los resultados permitieron confirmar que se encontraba en condiciones de ser operado y la cirugía de amputación quedó programada para el lunes 18 de mayo.',

        'En las distintas publicaciones de ese día se informaron montos generales de deuda cercanos al millón de pesos. Después de una entrega de $100.000 se publicó un saldo de $1.006.617, todavía sin incluir el costo de la cirugía.',
      ],
    },

    {
      date: '2026-05-11',
      title: 'Análisis y estudios antes de la cirugía',
      paragraphs: [
        'Patán tuvo un nuevo control veterinario, cambio de vendaje y extracción de sangre para realizar análisis.',

        'Continuaba tomando antibióticos por vía oral y comenzaba poco a poco a incorporar alimento balanceado.',

        'Durante la revisión también encontraron una pequeña masa que debía continuar siendo estudiada.',

        'Antes de fijar definitivamente la fecha de la cirugía todavía era necesario realizar una ecografía y completar los estudios prequirúrgicos.',
      ],
    },

    {
      date: '2026-05-10',
      title: 'Collar isabelino y nuevos controles',
      paragraphs: [
        'Durante los primeros días de recuperación Patán necesitó utilizar collar isabelino porque intentaba lamer algunas de sus heridas.',

        'La prioridad seguía siendo mantener la zona protegida, continuar con las curaciones y completar los análisis necesarios antes de la operación.',
      ],
    },

    {
      date: '2026-05-09',
      title: 'Por primera vez durmió dentro de una casa',
      paragraphs: [
        'Después del rescate, Patán pasó su primera noche dentro de una casa y pudo dormir sobre un sillón.',

        'En el control veterinario se encontraba un poco deshidratado, por lo que necesitó suero. Recibió además antibióticos y una alimentación especial para complementar su dieta mientras recuperaba fuerzas.',

        'Los profesionales lo encontraron mucho mejor y Patán comenzaba a descubrir las caricias, los mimos y la sensación de estar cuidado.',

        'En ese momento las publicaciones indicaban que la deuda veterinaria general rondaba los $900.000.',
      ],
    },

    {
      date: '2026-05-08',
      title: 'Patán finalmente pudo salir de debajo de las chapas',
      paragraphs: [
        'Después de varios pedidos de ayuda se consiguió un lugar de tránsito y también se logró coordinar el traslado de Patán hasta la veterinaria.',

        'Había permanecido al menos cinco días sobreviviendo con una lesión gravísima después de haber sido mordido por otro perro.',

        'La evaluación veterinaria confirmó una fractura expuesta con infección en el hueso, balines o perdigones debajo de la piel, una fractura antigua mal consolidada y varias piezas dentales dañadas por golpes anteriores.',

        'El diagnóstico para la pata lesionada fue contundente: una vez que estuviera suficientemente estable sería necesario amputarla para salvarle la vida.',

        'A pesar del dolor y de todo lo que había vivido, Patán todavía movía la cola cuando alguien lo acariciaba.',
      ],
    },

    {
      date: '2026-05-07',
      title: 'Un galgo herido necesitaba ayuda urgente',
      paragraphs: [
        'Una vecina pidió ayuda por un galgo adulto de aproximadamente 4 años que se encontraba refugiado debajo de unas chapas en el barrio La Unión.',

        'Había sido mordido por otro perro y llevaba varios días con una lesión grave en una de sus patas. La vecina intentaba alimentarlo y darle antibióticos, pero necesitaba atención veterinaria urgente.',

        'La primera necesidad fue conseguir un tránsito donde pudiera permanecer seguro y recuperarse después de recibir atención.',

        'Ese pedido de ayuda fue el comienzo de la historia de Patán.',
      ],
    },
  ],

  updatedAt: '2026-06-01',

  seoDescription:
    'Conocé la historia de Patán, un galgo rescatado con una fractura expuesta e infección que logró recuperarse después de una cirugía de amputación.',
} satisfies RescueCase;
