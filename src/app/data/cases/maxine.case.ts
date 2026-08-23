import type { RescueCase } from '../../core/models/rescue-case.model';

/**
 * Caso real de Maxine.
 *
 * Cronología:
 * - Febrero de 2026: rescate junto a sus tres bebés y comienzo de su tránsito.
 * - 28/03/2026: tratamiento por complicaciones respiratorias.
 * - Abril–mayo de 2026: controles, estudios, micoplasma positivo y tratamiento prolongado.
 * - 23/07/2026: fiebre, síntomas neurológicos e internación.
 * - Finales de julio de 2026: VILEF, micoplasma y toxoplasmosis; tratamiento intensivo.
 * - 03/08/2026: nueva internación luego de una convulsión.
 * - 04/08/2026: evaluación neurológica y pronóstico desfavorable.
 * - 05/08/2026: fallecimiento de Maxine.
 *
 * IMPORTANTE:
 * Los montos mencionados dentro de `updates` son fotografías históricas de la
 * deuda veterinaria GENERAL informada en cada publicación, salvo cuando se
 * aclara expresamente que se trataba de estudios indicados para Maxine.
 * No deben utilizarse como deuda individual del caso ni para barras de progreso.
 *
 * El alias y titular actuales deben seguir obteniéndose desde DONATION_CONFIG.
 *
 * Las rutas/dimensiones de imágenes siguen la convención del resto de los casos.
 * Ajustarlas si los AVIF definitivos de Maxine se exportan con otros tamaños.
 */
export const MAXINE_CASE = {
  slug: 'maxine',
  name: 'Maxine',
  statuses: ['memorial'],
  featured: false,

  summary:
    'Maxine fue rescatada junto a sus tres bebés después de años de vida en la calle. Durante meses atravesó un complejo cuadro respiratorio y, más adelante, una grave recaída neurológica asociada a distintos diagnósticos. Fue acompañada y cuidada hasta el final, y hoy su historia forma parte de quienes recordamos en memoria.',

  coverImage: {
    src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423604/cover.jpg',
    width: 1600,
    height: 900,
    alt: 'Maxine durante los meses en los que estuvo acompañada por su familia de tránsito',
    objectPosition: '50% 40%',
  },

  gallery: [
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423604/01.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine descansando durante su recuperación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423604/02.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine junto a sus bebés durante su tránsito',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423604/03.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine durante uno de sus tratamientos veterinarios',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/04.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine durante su internación veterinaria',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/05.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423604/06.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/07.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/08.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/09.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423606/10.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423606/11.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/12.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/13.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/14.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/15.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/16.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787423605/17.jpg',
      width: 900,
      height: 1600,
      alt: 'Maxine acompañada durante la etapa final de su tratamiento',
    },
  ],

  story: [
    'Maxine fue rescatada en febrero de 2026 junto a sus tres bebés. Había pasado años en la calle y llegó con numerosas dificultades respiratorias. Después del rescate pudo ir a un tránsito, donde empezó a conocer la tranquilidad de un hogar y a recibir los cuidados que necesitaba mientras continuaba criando a sus pequeños.',

    'A fines de marzo comenzó un tratamiento para sus complicaciones respiratorias. Sus bebés también habían llegado afectados, pero fueron mejorando poco a poco. Maxine, en cambio, continuaba con mucha mucosidad y necesitaba controles frecuentes. Durante abril atravesó nuevos episodios respiratorios, recibió medicación y le realizaron placas para evaluar su evolución.',

    'Como el cuadro persistía a pesar del tratamiento y llegó a despedir mucosidad con sangre, los veterinarios indicaron estudios más profundos. Se planificaron un lavaje nasal, una laringoscopia, hemogramas y PCR. En los estudios realizados durante abril, las PCR para VIF y VILEF dieron negativas, mientras que Maxine dio positiva a micoplasma. Se indicó un tratamiento de aproximadamente 30 días.',

    'Mientras tanto, sus bebés empezaron a comer por su cuenta y se preparaban para continuar sus vidas con sus familias. Eso permitió concentrar cada vez más la atención en Maxine. A fines de abril también le realizaron una ecografía porque su abdomen se veía distendido. Se había sospechado una nueva preñez, pero el estudio indicó que la distensión estaba relacionada con la cantidad de alimento que ingería. Después de años buscando qué comer, Maxine comía con enorme entusiasmo, por lo que se recomendó mantener la cantidad diaria pero repartirla en varias porciones.',

    'A comienzos de mayo seguía medicada con doxiciclina, tenía buen apetito y su recuperación avanzaba lentamente. Si todo evolucionaba bien, la intención era castrarla una vez finalizado el tratamiento. Sin embargo, los problemas respiratorios nunca desaparecieron por completo: la mucosidad continuó durante los meses siguientes y se había recomendado realizar una rinoscopia.',

    'Antes de que ese estudio pudiera concretarse, en julio su estado cambió abruptamente. El 23 de julio se informó que había comenzado con fiebre y, con el correr de las horas, desarrolló síntomas neurológicos que obligaron a internarla. Se iniciaron múltiples estudios; en ese momento se había podido descartar un ACV, pero todavía no existía un diagnóstico definitivo.',

    'Los resultados que llegaron durante los días siguientes mostraron un cuadro mucho más complejo de lo esperado. Maxine dio positiva a VILEF —leucemia felina— y a micoplasma, asociado en las publicaciones a una anemia muy importante. Más adelante también dio positiva a toxoplasmosis, uno de los resultados utilizados para explicar el cuadro neurológico. A todo eso se sumaba la rinitis crónica que arrastraba desde hacía meses.',

    'Durante la internación su estado llegó a ser muy delicado. Continuaba con signos neurológicos y comenzó un tratamiento descompresivo. También necesitó una sonda para poder alimentarse e hidratarse. A pesar del cuadro, empezó a mostrar pequeños avances: logró incorporarse, sentarse y, después de iniciar el tratamiento, pudo orinar. Lu y Fran, quienes la acompañaban durante esta etapa, llegaron a preparar un espacio de aislamiento en su casa para que pudiera continuar allí el tratamiento si recibía el alta.',

    'Entre el 27 y el 29 de julio aparecieron señales que dieron esperanza. Maxine respondía al tratamiento, podía mantenerse en pie por sus propios medios y, aunque todavía se tambaleaba y se caía por los signos neurológicos, intentaba volver a levantarse y recuperar pequeñas rutinas, como acercarse a las piedritas.',

    'La evolución no fue lineal. El 31 de julio volvió a presentar algo de fiebre, decaimiento y un aumento leve de los signos neurológicos, por lo que tuvo que ser medicada y controlada nuevamente. El 2 de agosto llegó otra pequeña buena noticia: pese a seguir teniendo una sonda conectada al esófago y ser alimentada por ella cada tres horas, Maxine había comenzado a comer por su cuenta.',

    'El 3 de agosto volvió a ser internada. Ese día estaba decaída y, mientras la auscultaban, sufrió una convulsión breve, suficiente para que quedara nuevamente bajo cuidado veterinario. Al día siguiente fue evaluada por una neuróloga y se informó que presentaba lesiones a nivel cerebral. Su pronóstico ya no era bueno y quienes la acompañaban comenzaron a priorizar que atravesara ese momento sin dolor.',

    'El 5 de agosto llegó la despedida. Después de meses de tratamientos, estudios, internaciones, recaídas y pequeños avances, Maxine falleció. Según la publicación con la que fue despedida, se fue mientras dormía, sin sufrir y acompañada hasta el final por las personas que habían decidido no dejarla sola.',

    'No fue posible cambiar el desenlace de su enfermedad, pero sí cambió por completo la historia con la que Maxine llegó hasta él. Después de años sobreviviendo en la calle, pasó sus últimos meses con una familia que la cuidó, personas que la acompañaron en cada control y un equipo veterinario que continuó intentando ayudarla incluso en los momentos más difíciles. Maxine no se fue sola ni olvidada: se fue después de haber conocido un hogar y de haber sido profundamente querida.',
  ],

  currentNeeds: [],

  updates: [
    {
      date: '2026-08-05',
      title: 'Hasta siempre, Maxine',
      paragraphs: [
        'El 5 de agosto llegó la noticia que nadie quería recibir: Maxine falleció después de meses de tratamiento y de una última etapa especialmente delicada.',
        'La publicación con la que fue despedida contó que se fue mientras dormía, sin sufrir y después de haber recibido todo el acompañamiento posible durante sus últimos días.',
        'Su historia había comenzado con años de vida en la calle y continuó con un rescate, una familia que la recibió, tratamientos, internaciones y un equipo veterinario que no dejó de intentar ayudarla.',
        'Aunque no fue posible cambiar el desenlace, Maxine ya no era una gata sola, enferma y olvidada. Sus últimos meses estuvieron rodeados de cuidados y de personas que la acompañaron hasta el final.',
      ],
    },
    {
      date: '2026-08-04',
      title: 'Su pronóstico volvió a ser muy delicado',
      paragraphs: [
        'Maxine continuaba internada y fue evaluada por una neuróloga. En esa consulta se informó que presentaba lesiones a nivel cerebral y que su pronóstico no era bueno.',
        'Después de todo lo que había atravesado, quienes la acompañaban explicaron que la prioridad era seguir a su lado sin permitir que sufriera.',
        'La publicación recordó que habían pasado aproximadamente cuatro meses desde su rescate y reafirmó la promesa de acompañarla más allá de cualquier posibilidad de adopción.',
      ],
    },
    {
      date: '2026-08-03',
      title: 'Maxine tuvo que ser internada nuevamente',
      paragraphs: [
        'Después de algunos días con avances y retrocesos, Maxine volvió a mostrar decaimiento y tuvo que ser internada nuevamente.',
        'Mientras la auscultaban sufrió una convulsión leve y breve, pero suficiente para que quedara bajo el cuidado de los profesionales.',
        'La recaída volvió a mostrar que su evolución no era lineal y que todavía necesitaba seguimiento veterinario permanente.',
      ],
    },
    {
      date: '2026-08-02',
      title: 'Empezó a comer por su cuenta',
      paragraphs: [
        'Después de un día previo con fiebre y aumento de los signos neurológicos, Maxine dio un paso muy importante: comenzó a comer por su cuenta.',
        'Todavía tenía una sonda conectada directamente al esófago y Lu y Fran continuaban alimentándola por allí cada tres horas, pero el hecho de que volviera a comer sola fue recibido como una señal muy alentadora.',
        'Además de pollo, estaba comiendo alimento húmedo nutritivo mientras continuaba con el tratamiento y los controles.',
      ],
    },
    {
      date: '2026-07-31',
      title: 'Un nuevo día difícil',
      paragraphs: [
        'Maxine presentó un poco de fiebre, decaimiento y un leve aumento de los signos neurológicos, por lo que se adelantó su visita a la veterinaria.',
        'Fue medicada y quedó con un nuevo control previsto para el día siguiente.',
        'La actualización reflejó nuevamente que su recuperación tenía días mejores y otros más difíciles, y que cada cambio requería seguimiento cercano.',
      ],
    },
    {
      date: '2026-07-29',
      title: 'Su progreso seguía siendo notable',
      paragraphs: [
        'Maxine continuaba mejorando día a día. Aunque todavía presentaba signos neurológicos, la publicación describía un progreso visible en comparación con los días anteriores.',
        'Seguía mostrando ganas de moverse, responder y continuar con el tratamiento mientras permanecía acompañada por su familia de tránsito.',
      ],
    },
    {
      date: '2026-07-28',
      title: 'Volvía a levantarse e intentarlo',
      paragraphs: [
        'Maxine ya intentaba acercarse nuevamente a las piedritas y realizar algunas de sus rutinas por sí misma.',
        'Los signos neurológicos todavía hacían que se tambaleara y se cayera, pero volvía a levantarse e intentaba continuar.',
        'La evolución seguía siendo delicada, aunque esos pequeños avances mostraban una respuesta al tratamiento.',
      ],
    },
    {
      date: '2026-07-27',
      title: 'Empezó a responder al tratamiento',
      paragraphs: [
        'La actualización de ese día trajo noticias alentadoras: Maxine estaba respondiendo al tratamiento y, aunque todavía presentaba signos neurológicos, ya podía mantenerse en pie por sus propios medios.',
        'Durante esos días también habían llegado resultados que completaban un cuadro complejo: además de la rinitis crónica, VILEF y micoplasma, Maxine dio positiva a toxoplasmosis, uno de los resultados utilizados para explicar los síntomas neurológicos.',
        'Necesitó una sonda para alimentarse e hidratarse y recibió un tratamiento intensivo. A pesar de la gravedad de su estado, había logrado sentarse e incorporarse.',
        'La rescatista informó que había podido entregar $120.000 en la veterinaria y que el saldo veterinario general continuaba siendo de $1.379.206,84. Ese monto correspondía a la deuda acumulada de los rescates, no a una deuda individual de Maxine.',
      ],
    },
    {
      date: '2026-07-24',
      title: 'Llegaron los primeros diagnósticos',
      paragraphs: [
        'Los estudios permitieron empezar a ponerle nombre al complejo cuadro que atravesaba Maxine. Se informó que había dado positiva a VILEF —leucemia felina— y a micoplasma.',
        'Según la actualización, el micoplasma había provocado una anemia muy importante y ayudaba a explicar parte de los problemas que venía atravesando.',
        'Maxine continuaba con síntomas neurológicos y su estado seguía siendo delicado, aunque después de comenzar un tratamiento descompresivo había mostrado algunas pequeñas señales favorables.',
        'En esos días la deuda veterinaria general rondaba $1.500.000 y todavía faltaban estudios para completar el diagnóstico.',
      ],
    },
    {
      date: '2026-07-23',
      title: 'Fiebre, síntomas neurológicos e internación',
      paragraphs: [
        'Maxine había sido rescatada meses antes junto a sus tres bebés y, aunque había mejorado de su cuadro inicial, la mucosidad respiratoria nunca había desaparecido por completo.',
        'Dos días antes de esta publicación comenzó con fiebre y fue llevada a la veterinaria, donde recibió medicación.',
        'Con el correr de las horas aparecieron síntomas neurológicos y Maxine quedó internada mientras le realizaban numerosos estudios.',
        'En ese momento se había descartado un ACV, pero todavía se esperaba el resto de los resultados para saber a qué se estaban enfrentando.',
        'La deuda veterinaria general se encontraba nuevamente alrededor de $1.500.000 y aún quedaban estudios por realizar.',
      ],
    },
    {
      date: '2026-05-02',
      title: 'Una recuperación lenta pero con buen apetito',
      paragraphs: [
        'Maxine continuaba mejorando muy lentamente y todavía necesitaba varias semanas de tratamiento con doxiciclina.',
        'A pesar de eso, tenía buen apetito y recibía una alimentación nutritiva para acompañar su recuperación.',
        'Si todo evolucionaba bien, una vez finalizado el tratamiento estaba previsto avanzar con su castración.',
      ],
    },
    {
      date: '2026-04-30',
      title: 'Una ecografía descartó una nueva preñez',
      paragraphs: [
        'Durante esa semana le realizaron una ecografía porque su abdomen se veía distendido y se había considerado la posibilidad de una nueva preñez.',
        'El estudio descartó esa sospecha. La distensión estaba relacionada con la cantidad de alimento que estaba comiendo.',
        'Después de años buscando qué comer, Maxine devoraba el alimento con entusiasmo. La indicación veterinaria fue mantener la cantidad diaria, pero dividirla en más porciones para facilitar su digestión.',
      ],
    },
    {
      date: '2026-04-15',
      title: 'Micoplasma positivo y tratamiento por 30 días',
      paragraphs: [
        'Los estudios de PCR dieron negativos para VIF y VILEF, una muy buena noticia dentro del cuadro que venía atravesando Maxine.',
        'Sin embargo, dio positiva a micoplasma y se indicó un tratamiento de aproximadamente 30 días.',
        'Aunque todavía continuaba con mucosidad, la publicación señalaba que ese diagnóstico permitía avanzar con un tratamiento concreto.',
        'Sus bebés ya habían comenzado a comer y se preparaban para ir con sus familias, lo que permitiría concentrar todos los cuidados en Maxine.',
      ],
    },
    {
      date: '2026-04-13',
      title: 'Necesitaba estudios para encontrar un diagnóstico',
      paragraphs: [
        'El cuadro respiratorio de Maxine seguía sin mejorar a pesar de los antibióticos y continuaba expulsando mucosidad, incluso con sangre.',
        'Se necesitaban más estudios para intentar llegar a un diagnóstico más certero. El costo estimado informado para esos estudios era de aproximadamente $200.000.',
        'En paralelo, la deuda veterinaria general acumulada había llegado a $783.203, un monto que correspondía al conjunto de los rescates y no exclusivamente a Maxine.',
      ],
    },
    {
      date: '2026-04-12',
      title: 'El cuadro respiratorio seguía sin mejorar',
      paragraphs: [
        'A pesar de estar medicada con antibióticos, Maxine continuaba con abundante mucosidad y episodios en los que aparecía sangre.',
        'Los veterinarios indicaron realizar estudios más profundos, entre ellos un lavaje nasal y una laringoscopia bajo anestesia, además de hemogramas y PCR para evaluar VIF y VILEF.',
        'En ese momento todavía estaba criando a sus bebés, por lo que también se estaba estimulando a los pequeños para que comenzaran a comer por su cuenta y así poder concentrar más cuidados en ella.',
      ],
    },
    {
      date: '2026-04-07',
      title: 'Un nuevo episodio respiratorio',
      paragraphs: [
        'Después de un control de sus bebés, Maxine sufrió un nuevo episodio respiratorio y tuvo que regresar a la veterinaria.',
        'Le realizaron placas y todavía se observaba mucha mucosidad, por lo que volvió a ser medicada y quedó con un nuevo control programado.',
        'En esa publicación se informó que la deuda veterinaria general se mantenía por encima de los $600.000 debido a los controles, estudios y medicación de los distintos casos.',
      ],
    },
    {
      date: '2026-04-06',
      title: 'Controles para Maxine y sus bebés',
      paragraphs: [
        'Maxine y sus bebés continuaban bajo seguimiento veterinario. Dos de los pequeños ya no necesitaban la cinta correctiva, mientras que uno debía continuar algunos días más para corregir su postura.',
        'Maxine iba mejorando de a poco, aunque todavía seguía con mucha mucosidad y necesitaba controles.',
        'Ese día se informó que una de las cuentas veterinarias había sido cancelada, aunque todavía quedaba un saldo general cercano a $700.000 en Clínica San Lorenzo.',
      ],
    },
    {
      date: '2026-03-28',
      title: 'Comenzó el tratamiento de sus complicaciones respiratorias',
      paragraphs: [
        'Maxine ya se encontraba en un tránsito, relajada y acompañada, mientras continuaba criando a sus bebés.',
        'El día anterior había comenzado un tratamiento para combatir sus complicaciones respiratorias.',
        'Los pequeños también mostraban avances y ya no tenían los ojos pegados, una señal de mejoría después de los primeros cuidados.',
        'Todavía no estaban en adopción y la prioridad era continuar estabilizando a toda la familia.',
      ],
    },
  ],

  updatedAt: '2026-08-05',

  seoDescription:
    'Conocé la historia de Maxine, rescatada junto a sus tres bebés y acompañada durante meses de tratamientos hasta sus últimos días. Hoy la recordamos en memoria.',
} satisfies RescueCase;
