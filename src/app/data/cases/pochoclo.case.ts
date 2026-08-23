import type { RescueCase } from '../../core/models/rescue-case.model';

/**
 * Caso real de Pochoclo.
 *
 * Cronología reconstruida a partir de publicaciones de julio de 2026:
 * - 14/07/2026: rescate de urgencia e internación en Clínica San Lorenzo.
 * - 15/07/2026: estudios, tratamiento por anemia y búsqueda/confirmación de tránsito.
 * - Días posteriores: alta con sonda, menor movilidad de miembros traseros y seguimiento
 *   por una lesión vieja en columna; se indica además evaluación cardiológica.
 * - 20/07/2026: el cuadro se complica gravemente, vuelve a internación y se confirma
 *   un deterioro sistémico severo.
 * - 20/07/2026: Pochoclo fallece después de varios días de atención y acompañamiento.
 *
 * IMPORTANTE:
 * Los montos mencionados dentro de `updates` son fotografías históricas de la
 * deuda veterinaria GENERAL informada por la rescatista en esas publicaciones.
 * No representan una deuda individual de Pochoclo ni deben utilizarse para
 * barras de progreso del caso.
 *
 * El alias y titular actuales deben seguir obteniéndose desde DONATION_CONFIG.
 *
 * Las rutas y dimensiones de las imágenes son placeholders siguiendo la
 * convención del resto de los casos. Reemplazarlas por los AVIF definitivos
 * de Pochoclo cuando estén disponibles.
 */
export const POCHOCLO_CASE = {
  slug: 'pochoclo',
  name: 'Pochoclo',
  statuses: ['memorial'],
  featured: false,

  summary:
    'Pochoclo fue rescatado después de caer desde un árbol a un patio y no poder volver a subir. Su cuerpo mostraba años de vida en la calle y, durante los estudios, aparecieron problemas neurológicos, renales, anemia y ViLeF. A pesar de todos los cuidados, su cuadro se agravó rápidamente y falleció pocos días después del rescate, acompañado y querido hasta el final.',

  coverImage: {
    src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787497141/WhatsApp_Image_2026-08-23_at_11.33.46_1.jpg',
    width: 1600,
    height: 900,
    alt: 'Pochoclo durante los días en que recibió cuidados después de su rescate',
    objectPosition: '50% 40%',
  },

  gallery: [
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787497141/WhatsApp_Image_2026-08-23_at_11.33.46.jpg',
      width: 900,
      height: 1600,
      alt: 'Pochoclo durante su internación en Clínica San Lorenzo',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787497141/WhatsApp_Image_2026-08-23_at_11.33.47.jpg',
      width: 900,
      height: 1600,
      alt: 'Pochoclo después de ser higienizado y atendido por el equipo veterinario',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787497141/WhatsApp_Image_2026-08-23_at_11.33.47_1.jpg',
      width: 900,
      height: 1600,
      alt: 'Pochoclo durante su recuperación y seguimiento veterinario',
    },
  ],

  story: [
    'La historia de Pochoclo comenzó el 14 de julio de 2026 con un aviso de urgencia. Había caído desde un árbol al patio de una casa y no había podido volver a subir. Cuando fueron a buscarlo, era evidente que llevaba mucho tiempo sobreviviendo en la calle: no estaba castrado, le faltaban varias piezas dentales, tenía el pelo completamente apelmazado y no presentaba sensibilidad en la cola.',

    'Fue trasladado de inmediato a Clínica San Lorenzo, donde quedó internado. Al día siguiente lo anestesiaron para poder retirar la gran cantidad de pelo apelmazado que cubría su cuerpo y evaluar mejor su estado. Le realizaron placas y estudios, permaneció con suero porque su orina era muy oscura y comenzó tratamiento con doxiciclina debido a una anemia importante.',

    'Dentro de un cuadro todavía incierto había pequeñas señales alentadoras: Pochoclo tenía mucho apetito y se consiguió un tránsito para cuando pudiera dejar la internación. Durante esos días también se intentaba entender el origen de sus dificultades de movilidad y de la falta de sensibilidad que presentaba.',

    'Pochoclo llegó a recibir el alta, aunque todavía necesitaba una sonda urinaria y en las últimas horas había disminuido la movilidad de sus miembros traseros. Las imágenes mostraban una lesión antigua en la columna y los profesionales debían determinar cuánto podía estar relacionada con su imposibilidad de hacer sus necesidades por sí mismo. También se indicó una consulta cardiológica.',

    'Después de haber vivido toda su vida en la calle, permanecer encerrado dentro de un departamento le generaba episodios importantes de estrés. Por eso su tránsito acondicionó un patio para que pudiera estar cómodo, tomar aire y disfrutar algunos ratos de sol sin dejar de recibir alimentación, medicación y todos los cuidados necesarios.',

    'Durante el fin de semana su estado volvió a complicarse. Dejó de comer, comenzó a orinar con sangre y la sonda se obstruyó con pequeños coágulos. En la veterinaria retiraron la sonda y vaciaron manualmente una vejiga que estaba muy llena. Se intentó comprobar si podía volver a orinar por sus propios medios, pero no ocurrió.',

    'Al regresar a control encontraron nuevamente mucha orina acumulada en su vejiga y también materia fecal retenida en los intestinos. El cuadro era mucho más complejo de lo que parecía al comienzo: Pochoclo dio positivo a ViLeF, tenía los riñones muy comprometidos, continuaba anémico y existían además posibles problemas cardiológicos.',

    'Los profesionales determinaron que presentaba una vejiga neurogénica y que ya no podía orinar ni defecar por sus propios medios. Su cuerpo estaba muy deteriorado y la posibilidad de ofrecerle una vida sin sufrimiento se volvía cada vez más difícil. Las siguientes horas eran cruciales.',

    'Ese mismo 20 de julio, luego de una nueva descompensación y otra internación, llegó el momento de despedirlo. La decisión estuvo atravesada por algo que había acompañado todo el rescate: no prolongar su dolor cuando ya no existía una recuperación que pudiera devolverle calidad de vida.',

    'Pochoclo estuvo apenas unos días bajo cuidado, pero en ese tiempo conoció algo que probablemente le había faltado durante años de calle: personas pendientes de él, alimento, un lugar preparado para que pudiera sentirse tranquilo, atención veterinaria y mucho afecto. No pudo tener la vida larga y cómoda que todos hubieran querido para él, pero no se fue solo.',

    'Su historia quedó como recuerdo de esos rescates en los que llegar, intentar y acompañar también importa, incluso cuando no es posible cambiar el desenlace. Durante sus últimos días hubo muchas personas intentando darle una oportunidad y asegurándose de que, hasta el final, estuviera cuidado y rodeado de cariño.',
  ],

  currentNeeds: [],

  updates: [
    {
      date: '2026-07-20',
      title: 'Hasta siempre, Pochoclo',
      paragraphs: [
        'Ese día se confirmó la noticia más triste: Pochoclo había fallecido después de varios días de lucha y cuidados intensivos.',

        'Su cuadro se había vuelto irreversible y el objetivo pasó a ser evitar que continuara sufriendo. En la despedida se recordó que, aunque había pasado prácticamente toda su vida en la calle, durante sus últimos cuatro días estuvo acompañado, atendido y rodeado de cariño.',

        'Pochoclo no tuvo el final que todos esperaban, pero su huella quedó en cada una de las personas que lo rescataron, lo cuidaron y estuvieron pendientes de él hasta el último momento.',
      ],
    },

    {
      date: '2026-07-20',
      title: 'Un cuadro muy delicado',
      paragraphs: [
        'Durante el fin de semana Pochoclo dejó de comer, comenzó a orinar con sangre y su sonda se tapó con pequeños coágulos. En la veterinaria retiraron la sonda y vaciaron manualmente una vejiga que estaba muy llena.',

        'Se intentó dejarlo sin sonda para comprobar si podía orinar por sí mismo, pero no pudo hacerlo. En el control siguiente su vejiga volvía a tener mucha orina acumulada y sus intestinos estaban llenos de materia fecal.',

        'Además, se confirmó que Pochoclo era positivo a ViLeF. Tenía los riñones muy comprometidos, continuaba con anemia y existían posibles problemas cardiológicos.',

        'Los profesionales determinaron que presentaba una vejiga neurogénica y que no podía orinar ni defecar por sus propios medios. El pronóstico era muy delicado y las siguientes 48 horas se consideraban cruciales.',

        'La deuda veterinaria general informada en esa actualización era de $810.282. Ese monto correspondía a la cuenta acumulada de los casos atendidos y no exclusivamente a Pochoclo.',
      ],
    },

    {
      date: '2026-07-15',
      title: 'Estudios, tratamiento y un tránsito para Pochoclo',
      paragraphs: [
        'Después del rescate comenzaron a retirar todo el pelo apelmazado que cubría su cuerpo. Era evidente que Pochoclo llevaba mucho tiempo sin recibir cuidados.',

        'Le realizaron placas y estudios. Permanecía con suero porque su orina era muy oscura y comenzó tratamiento con doxiciclina debido a una anemia importante.',

        'Las siguientes 24 a 48 horas eran importantes para poder comprender mejor su cuadro. Dentro de toda la incertidumbre, Pochoclo mantenía un muy buen apetito.',

        'Ese día también llegó una noticia importante: se había conseguido tránsito para continuar sus cuidados cuando pudiera salir de la veterinaria.',

        'En una actualización posterior se informó que llegó a recibir el alta con sonda y con menor movilidad en los miembros traseros. Las imágenes mostraban una lesión vieja en la columna y se indicó continuar estudiando su relación con las dificultades para hacer sus necesidades por sí mismo.',

        'También se había indicado una consulta cardiológica cuyo costo informado era de $80.000. En esos días se realizó una entrega de $400.000 en la veterinaria, aunque todavía no se conocía el saldo general pendiente.',
      ],
    },

    {
      date: '2026-07-14',
      title: 'Rescate de última hora',
      paragraphs: [
        'Pasadas las 20:30 llegó el aviso de un gato que había caído desde un árbol a un patio y no había podido volver a subir. Fueron a buscarlo y lo trasladaron inmediatamente a Clínica San Lorenzo.',

        'No se sabía con certeza su edad. Su estado reflejaba una vida muy dura en la calle: no estaba castrado, le faltaban varias piezas dentales, tenía muchísimo pelo apelmazado y no presentaba sensibilidad en la cola.',

        'Quedó internado para ser estabilizado y estudiado. La intención era anestesiarlo al día siguiente para retirar el pelo apelmazado y poder revisar si existían otras lesiones.',

        'Desde el primer momento se plantearon dos necesidades: conseguir un tránsito para cuando tuviera el alta y reunir ayuda para afrontar los gastos veterinarios que comenzaban a sumarse.',
      ],
    },
  ],

  updatedAt: '2026-07-20',

  seoDescription:
    'Conocé la historia de Pochoclo, un gato rescatado después de años en la calle que recibió atención veterinaria y acompañamiento hasta sus últimos días.',
} satisfies RescueCase;
