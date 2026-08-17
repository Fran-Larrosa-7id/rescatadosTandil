import type { RescueCase } from '../../core/models/rescue-case.model';

/**
 * Caso real de Tiky.
 *
 * Cronología:
 * - 28/07/2026: rescate, internación y estabilización.
 * - 31/07/2026: evolución, análisis y PCR VIF/VILEF negativa.
 * - 03/08/2026: lesión en la otra patita y preparación para cirugía.
 * - 05/08/2026: amputación de la patita trasera izquierda, alta y recuperación.
 *
 * IMPORTANTE:
 * Los montos mencionados dentro de `updates` son fotografías históricas de la
 * deuda veterinaria GENERAL informada en cada publicación. No representan
 * una deuda individual de Tiky ni deben utilizarse para barras de progreso.
 *
 * El alias y titular actuales deben seguir obteniéndose desde DONATION_CONFIG.
 */
export const TIKY_CASE = {
  slug: 'tiky',
  name: 'Tiky',
  status: 'recovering',
  featured: true,

  summary:
    'Tiky tenía apenas 3 meses cuando sufrió una fractura expuesta en una de sus patas traseras. Tras varios días de internación y estabilización, pudo ser operada: la amputación salió muy bien y hoy continúa recuperándose.',

  coverImage: {
    src: 'images/cases/tiky/cover.avif',
    alt: 'Tiky durante su recuperación',
    objectPosition: '50% 40%',
  },

  gallery: [
    {
      src: 'images/cases/tiky/01.avif',
      alt: 'Tiky durante su internación veterinaria',
    },
    {
      src: 'images/cases/tiky/02.avif',
      alt: 'Tiky con sus patitas vendadas durante el tratamiento',
    },
    {
      src: 'images/cases/tiky/04.avif',
      alt: 'Tiky después de la cirugía de amputación',
    },
    {
      src: 'images/cases/tiky/05.avif',
      alt: 'Tiky durante su recuperación luego de recibir el alta',
    },
    {
      src: 'images/cases/tiky/06.avif',
      alt: 'Tiky durante su recuperación luego de recibir el alta',
    },
  ],

  story: [
    'Tiky tenía apenas 3 meses. Nació de una gata feral en el Parque Industrial y hasta ese momento nunca había conocido el calor de un hogar: su vida había sido sobrevivir.',

    'A fines de julio ocurrió un accidente mientras estaba refugiada debajo de un pallet. Una máquina elevadora enganchó una de sus patitas traseras y se la destrozó. Tiky permaneció muchas horas sin recibir atención, con una fractura expuesta, dolor, tierra y una infección que avanzaba sobre su pequeño cuerpo.',

    'Finalmente, uno de los trabajadores del lugar la vio y decidió actuar. El 28 de julio Tiky pudo ser rescatada e internada. Comenzó a recibir antibióticos, analgésicos y los cuidados necesarios para estabilizarla. Desde el comienzo, los veterinarios sabían que, cuando su estado lo permitiera, sería necesario amputar la patita lesionada para poder salvarle la vida.',

    'Durante los días siguientes continuó internada y, aunque anímicamente se encontraba muy bien, algunos valores de sus análisis generaban preocupación. Los estudios de PCR para VIF y VILEF dieron negativos, una muy buena noticia, pero se comenzó a evaluar realizar la cirugía cuanto antes para evitar que su cuadro empeorara.',

    'El 3 de agosto, durante un control, descubrieron además una herida en la otra patita que estaba supurando. Tiky terminó con ambas patitas vendadas. Aun así, seguía adelante: había sobrevivido al dolor, a la infección, al frío y al hambre, y ya estaba recibiendo cuidados y cariño.',

    'El 5 de agosto finalmente se realizó la cirugía de amputación de su patita trasera izquierda. La operación salió más que bien y Tiky pudo recibir el alta. Quedó bajo el cuidado de Facu y Bel, quienes continuaron acompañándola durante su recuperación.',

    'Después de la cirugía todavía necesitaba controles y medicación durante varios días, hasta que pudieran retirarle los puntos. Su otra patita, que también había resultado lesionada, debía continuar cicatrizando.',

    'El caso de Tiky se sumó a otros rescates que durante el año requirieron cirugías de amputación, entre ellos Fénix (Gatoman) y Patán. En esos casos también hubo fracturas expuestas e infecciones asociadas al tiempo transcurrido sin atención inmediata.',

    'Su historia muestra por qué muchos rescates no pueden esperar. Además de las urgencias veterinarias, los tratamientos, estudios, internaciones y cirugías, los tránsitos también generan gastos cotidianos de alimentación y piedritas. Cada ayuda y cada difusión permiten que estos animales tengan una oportunidad.',
  ],

  currentNeeds: [
    {
      title: 'Controles veterinarios',
      description:
        'Después de la cirugía necesita continuar con controles durante su recuperación y hasta que los profesionales indiquen que pueden retirarle los puntos.',
    },
    {
      title: 'Medicación',
      description:
        'Debe continuar con la medicación indicada por los profesionales durante los días posteriores a la cirugía.',
    },
    {
      title: 'Cicatrización de sus heridas',
      description:
        'Además de la amputación, su otra patita también estaba lesionada y necesita continuar cicatrizando correctamente.',
    },
  ],

  updates: [
    {
      date: '2026-08-16',
      title: 'Tiky está muchísimo mejor y casi con el alta',
      paragraphs: [
        'Tiky continúa evolucionando muy bien y, después de todo lo que atravesó, ya está casi con el alta.',

        'La rescatista contó que verla recuperarse, jugar y disfrutar de la vida que merece es una de esas cosas que le recuerdan por qué vale la pena seguir luchando por cada rescate.',

        'Sin embargo, también explicó que decidió frenar temporalmente el ingreso de nuevos rescates porque todavía necesita resolver o reducir significativamente la deuda veterinaria general acumulada. La intención no es dejar de ayudar, sino recuperar un poco de aire para poder volver a hacerlo cuando aparezca otro animal que necesite una oportunidad.',

        'En esta publicación volvió a mencionar una deuda veterinaria general cercana a $1.500.000 y pidió colaboración para poder reducirla. Aclaró que incluso aportes pequeños pueden hacer una gran diferencia cuando muchas personas se suman.',

        'También recordó que, para quienes no puedan colaborar económicamente, compartir las publicaciones es otra forma muy importante de ayudar y de llegar a más personas.',

        'La publicación estuvo acompañada por un video de Tiky simplemente jugando y disfrutando de su recuperación: una gatita de apenas 3 meses empezando a vivir la vida que merece.',
      ],
    },

    {
      date: '2026-08-10',
      title: 'Tiky sigue recuperándose súper bien',
      paragraphs: [
        'Tiky continúa recuperándose muy bien y se la puede ver cada vez más activa y cómoda durante su recuperación.',

        'En esta actualización también aparece jugando junto a su hermano Kele, una imagen que refleja cuánto cambió su realidad después de todo lo que tuvo que atravesar.',

        'Ese día la rescatista realizó una nueva entrega de $350.000 en efectivo en la veterinaria y agradeció especialmente a todas las personas que hicieron posible reunir ese dinero.',

        'Después de esa entrega informó que todavía quedaba un saldo veterinario general pendiente de $1.600.800,84.',

        'Aunque la deuda continuaba siendo muy importante, destacó que poco a poco se iba avanzando y volvió a pedir colaboración y difusión para poder seguir reduciéndola.',

        'Ver a Tiky jugar con su hermano después de la fractura, la infección, la amputación y todo el proceso de recuperación hizo que todo el esfuerzo realizado hasta ese momento valiera la pena.',
      ],
    },

    {
      date: '2026-08-05',
      title: 'La cirugía salió más que bien',
      paragraphs: [
        'Se realizó la cirugía de amputación de la patita trasera izquierda de Tiky y, como se esperaba, la operación salió muy bien.',

        'Tiky recibió el alta y quedó bajo el cuidado de Facu y Bel, quienes la acompañan con mucho amor, responsabilidad y compromiso.',

        'Durante los días siguientes debe continuar con controles y medicación hasta que puedan retirarle los puntos. Su otra patita, que también estaba lesionada, todavía necesita terminar de cicatrizar.',

        'La publicación señala que Tiky fue el tercer animal rescatado del año que necesitó una cirugía de amputación, junto con Fénix (Gatoman) y Patán. En los tres casos hubo fractura expuesta e infección luego de haber pasado tiempo sin atención inmediata.',

        'Además de los gastos veterinarios, la rescatista recordó que los tránsitos generan gastos de alimentación y piedritas, incluso en animales que muchas veces no llegan a aparecer en publicaciones.',

        'Ese día informó que la deuda veterinaria general ya había superado los $1.500.000 y que todavía faltaba conocer el monto exacto actualizado, pese a las entregas que había logrado realizar.',
      ],
    },

    {
      date: '2026-08-03',
      title: 'Descubrieron una lesión en la otra patita',
      paragraphs: [
        'Durante el control matutino encontraron una herida en la otra patita de Tiky que estaba supurando un poco. Como consecuencia, quedó con ambas patitas vendadas.',

        'A pesar de todo lo que había atravesado —dolor, infección, frío y hambre—, Tiky seguía adelante y ya estaba recibiendo muchos cuidados y cariño.',

        'Si su evolución continuaba bien, la cirugía de amputación estaba prevista para realizarse durante esa semana.',

        'La rescatista contó que ese día realizó una entrega de $240.000 en la veterinaria. Después de esa entrega, informó un saldo general pendiente de $1.416.800, al que todavía debían sumarse la cirugía y los controles de Tiky.',
      ],
    },

    {
      date: '2026-07-31',
      title: 'Buen ánimo y nuevos estudios',
      paragraphs: [
        'Tiky se encontraba anímicamente muy bien y se mostraba relajada incluso mientras recibía la medicación.',

        'Sin embargo, algunos valores de los análisis no estaban bien, por lo que los profesionales estaban evaluando realizar la cirugía cuanto antes para evitar que su cuadro empeorara.',

        'Los análisis de PCR para VIF y VILEF dieron negativos, lo que representó una muy buena noticia dentro de su evolución.',

        'El día anterior la rescatista había podido realizar una entrega de $250.000 en la veterinaria. En esta actualización informó que todavía quedaban $1.352.800 de deuda veterinaria general, antes de sumar los controles y la cirugía de amputación de Tiky.',

        'También contó que todavía tenía números de una rifa a la venta como otra forma de reunir fondos para seguir afrontando los gastos.',
      ],
    },

    {
      date: '2026-07-28',
      title: 'Tiky necesitaba una oportunidad para vivir',
      paragraphs: [
        'Tiky tenía apenas 3 meses y había nacido de una gata feral en el Parque Industrial. Nunca había conocido el calor de un hogar y su vida, hasta entonces, había sido sobrevivir.',

        'Mientras estaba refugiada debajo de un pallet, una máquina elevadora enganchó su patita y se la destrozó. Permaneció muchas horas sin poder recibir ayuda.',

        'Cuando finalmente uno de los trabajadores del lugar la vio y decidió actuar, Tiky tenía una fractura expuesta, mucho dolor, tierra en la herida y una infección que avanzaba sobre su cuerpo.',

        'Fue internada y comenzó a recibir antibióticos, analgésicos y todos los cuidados necesarios para estabilizarla. La indicación era que, cuando su estado lo permitiera, deberían amputarle la patita para salvarle la vida.',

        'En ese momento la deuda veterinaria general ascendía a $1.454.206, sin incluir todavía la internación de Tiky ni los gastos que vendrían después.',

        'Además de la colaboración económica para los gastos veterinarios, en esa publicación también se pidió alimento de buena calidad y piedritas para acompañar los tránsitos.',
      ],
    },
  ],

  updatedAt: '2026-08-16',

  seoDescription:
    'Conocé la historia de Tiky, rescatada con una fractura expuesta a los 3 meses, y su recuperación después de una cirugía de amputación.',
} satisfies RescueCase;
