import type { RescueCase } from '../../core/models/rescue-case.model';

/**
 * Caso real de Fénix.
 *
 * En las publicaciones originales también fue nombrado como Feli, Felipe y Gatoman.
 * En Gatarsis el caso queda unificado bajo el nombre Fénix.
 *
 * Cronología:
 * - 30/01/2026: ingreso de urgencia a Clínica San Lorenzo con fractura expuesta y una miasis severa.
 * - 31/01/2026: logra pasar la noche, recupera el apetito y comienza a estabilizarse.
 * - 02/02/2026: evolución clínica favorable y búsqueda urgente de tránsito.
 * - 04/02/2026: consigue tránsito para continuar recuperándose antes de la cirugía.
 * - 07/02/2026: estudios negativos para micoplasma, VIF y VILEF.
 * - 18/02/2026: la cirugía se posterga mientras continúa recuperando glóbulos rojos.
 * - Finales de febrero: se realiza con éxito la amputación de la pata afectada.
 * - 22/03/2026: ya recuperado y adoptado, disfruta de su nueva vida en familia.
 *
 * IMPORTANTE:
 * Los montos mencionados dentro de `updates` corresponden a fotografías
 * históricas de la deuda veterinaria GENERAL que la rescatista informaba en
 * cada publicación. No representan una deuda individual de Fénix ni deben
 * utilizarse para barras de progreso del caso.
 *
 * El alias y titular actuales deben seguir obteniéndose desde DONATION_CONFIG.
 *
 * Las rutas y dimensiones de las imágenes siguen la convención utilizada por
 * los demás casos. Ajustarlas a los AVIF definitivos de Fénix si fuera necesario.
 */
export const FENIX_CASE = {
  slug: 'fenix',
  name: 'Fénix',
  statuses: ['recovering', 'closed'],
  featured: false,

  summary:
    'Fénix fue encontrado en estado crítico, con una fractura expuesta y una grave miasis en una de sus patas. Después de semanas de estabilización, controles y una cirugía de amputación, logró recuperarse y adaptarse a su nueva vida. Hoy está adoptado y vive rodeado del cariño de la familia que primero lo recibió en tránsito.',

  coverImage: {
    src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448210/WhatsApp_Image_2026-08-22_at_20.37.59_2.jpg',
    width: 1600,
    height: 900,
    alt: 'Fénix recuperado y disfrutando de su nueva vida en familia',
    objectPosition: '50% 40%',
  },

  gallery: [
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448205/WhatsApp_Image_2026-08-22_at_19.26.17.jpg',
      width: 900,
      height: 1600,
      alt: 'Fénix durante los primeros días de recuperación después de su rescate',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448205/WhatsApp_Image_2026-08-22_at_19.26.17_1.jpg',
      width: 900,
      height: 1600,
      alt: 'Fénix descansando en su hogar de tránsito mientras recuperaba fuerzas',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448207/WhatsApp_Image_2026-08-22_at_20.35.39.jpg',
      width: 900,
      height: 1600,
      alt: 'Fénix durante uno de sus controles veterinarios',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448206/WhatsApp_Image_2026-08-22_at_20.35.39_1.jpg',
      width: 900,
      height: 1600,
      alt: 'Fénix después de la cirugía de amputación',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448209/WhatsApp_Image_2026-08-22_at_20.37.35.jpg',
      width: 900,
      height: 1600,
      alt: 'Fénix adaptado a moverse con tres patas en su hogar definitivo',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448211/WhatsApp_Image_2026-08-22_at_20.37.59.jpg',

      width: 900,
      height: 1600,
      alt: 'Fénix adaptado a moverse con tres patas en su hogar definitivo',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448208/WhatsApp_Image_2026-08-22_at_20.37.59_1.jpg',
      width: 900,
      height: 1600,
      alt: 'Fénix adaptado a moverse con tres patas en su hogar definitivo',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448212/WhatsApp_Image_2026-08-22_at_20.38.14.jpg',
      width: 900,
      height: 1600,
      alt: 'Fénix adaptado a moverse con tres patas en su hogar definitivo',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448213/WhatsApp_Image_2026-08-22_at_20.39.47.jpg',
      width: 900,
      height: 1600,
      alt: 'Fénix adaptado a moverse con tres patas en su hogar definitivo',
    },
    {
      src: 'https://res.cloudinary.com/r7yd5dny/image/upload/v1787448214/WhatsApp_Image_2026-08-22_at_20.39.48.jpg',
      width: 900,
      height: 1600,
      alt: 'Fénix adaptado a moverse con tres patas en su hogar definitivo',
    },
  ],

  story: [
    'Fénix, a quien en las publicaciones originales también llamaron Feli, Felipe y Gatoman, tenía aproximadamente cuatro años cuando fue encontrado en un galpón después de haber pasado varios días en un estado muy delicado. Tenía una fractura expuesta y una miasis severa que había comprometido por completo una de sus patas. Una persona llamada Verónica lo vio, pidió ayuda y así comenzó su rescate.',

    'Ingresó de urgencia a Clínica San Lorenzo la noche del 30 de enero de 2026. Costó mucho estabilizarlo y durante esas primeras horas existía el temor de que no lograra pasar la noche. Debido a su estado y a lo bajos que estaban sus glóbulos rojos, llegó a buscarse con urgencia un gato donante para una posible transfusión.',

    'Fénix logró superar esa primera noche. Al día siguiente amaneció con apetito y comenzó, muy lentamente, a recuperar fuerzas. La transfusión finalmente no se realizó en ese momento porque su evolución empezaba a mostrar señales favorables. Sin embargo, la pata estaba demasiado dañada y los veterinarios ya habían determinado que sería necesario amputarla una vez que estuviera lo suficientemente fuerte para soportar la cirugía.',

    'Durante los primeros días de febrero continuó internado, con curaciones, medicación y cambios de vendaje. Clínicamente mejoraba y comía con muchas ganas, pero todavía necesitaba un lugar tranquilo donde recuperarse antes de la operación. Después de una búsqueda urgente apareció ese tránsito: Lu y su familia lo recibieron y le dieron un espacio seguro donde descansar, moverse lo menos posible y continuar con todos los cuidados indicados.',

    'El 7 de febrero llegaron resultados que trajeron alivio: los estudios dieron negativos para micoplasma, VIF y VILEF. En los controles lo encontraron bien, continuaron las curaciones y los cambios de vendaje, y recibió un tónico para ayudarlo a fortalecerse.',

    'La recuperación previa a la cirugía tomó más tiempo de lo esperado. Sus glóbulos rojos seguían bajos: en una actualización del 18 de febrero se informó que habían pasado aproximadamente de un 10 % en los primeros días a un 21 %. La evolución era lenta pero favorable, y por seguridad la cirugía se postergó mientras continuaba recuperando hematocrito y fuerzas.',

    'Durante esas semanas Fénix fue cambiando por completo. En el tránsito estaba más relajado, había aumentado de peso, comenzó a socializar con los otros gatos de la casa y aprendió a sentirse seguro. Lo que en un principio había sido solamente un lugar temporal empezó a convertirse en algo mucho más importante.',

    'Finalmente, cuando estuvo en condiciones de enfrentarla, se realizó la cirugía de amputación. La intervención fue exitosa y, ese mismo día, pudo regresar a la casa donde venía recuperándose. La amputación no significó el final de su historia sino el comienzo de una vida con mayor bienestar y sin una pata que ya no podía recuperarse.',

    'Junto con la noticia de la cirugía llegó otra que terminó de cambiar su destino: Fénix ya tenía una familia para siempre. Lu y su familia, que lo habían recibido cuando necesitaba un tránsito para recuperarse, decidieron adoptarlo. La adopción se definió incluso antes de completar todos sus controles, después de haberlo acompañado durante los momentos más difíciles.',

    'Con el tiempo se acostumbró a movilizarse con tres patas y a convivir con los demás animales de la casa. Para el 22 de marzo las publicaciones ya mostraban a un Fénix completamente integrado a su nueva vida: acompañado, enamorado de otra gata de la familia y compartiendo una rutina que parecía imposible cuando había llegado a la veterinaria en enero.',

    'Su historia pasó de una noche en la que apenas se esperaba que sobreviviera a una recuperación, una cirugía exitosa y una adopción definitiva. Fénix encontró mucho más que tratamiento veterinario: encontró un hogar en el mismo lugar que primero había abierto sus puertas para ayudarlo a recuperarse.',
  ],

  currentNeeds: [],

  updates: [
    {
      date: '2026-03-22',
      title: 'Una nueva vida en familia',
      paragraphs: [
        'Fénix ya estaba completamente integrado a su hogar definitivo. Las publicaciones lo mostraban adaptado a su nueva vida, conviviendo con los otros gatos de la familia y disfrutando del vínculo que había construido con ellos.',

        'Después del rescate, el tránsito, la recuperación y la amputación, su historia había llegado a un final feliz: estaba adoptado y rodeado del cariño de la misma familia que lo había recibido cuando todavía necesitaba recuperar fuerzas para poder ser operado.',
      ],
    },

    {
      date: '2026-02-24',
      title: 'Cada vez más fuerte antes de la cirugía',
      paragraphs: [
        'Fénix continuaba recuperándose y su cambio era cada vez más visible. Estaba más relajado, había aumentado de peso y jugaba con los otros gatos de la casa.',

        'La cirugía todavía no se había realizado porque necesitaba seguir recuperando hematocrito. Los controles, la medicación y los cambios de vendaje continuaban mientras los veterinarios esperaban que estuviera en mejores condiciones para afrontar la amputación.',

        'En esos días se informó que la deuda veterinaria general había vuelto a aumentar con los controles y los gastos de los distintos casos. Ese saldo no correspondía exclusivamente a Fénix.',
      ],
    },

    {
      date: '2026-02-18',
      title: 'La cirugía se postergó para darle más tiempo',
      paragraphs: [
        'Aunque Fénix evolucionaba muy bien, sus glóbulos rojos continuaban bajos. Según la actualización, habían pasado aproximadamente de un 10 % al comienzo a un 21 %.',

        'El avance era lento pero favorable y, como la cirugía todavía implicaba un riesgo, se decidió postergarla hasta la semana siguiente para darle más tiempo de recuperación.',

        'Ese día se habían realizado nuevas entregas de dinero en la veterinaria y se informó un saldo general de $390.974, al que todavía debían sumarse la cirugía y los gastos posteriores. Se trataba del saldo veterinario general informado por la rescatista.',
      ],
    },

    {
      date: '2026-02-07',
      title: 'Buenas noticias en sus estudios',
      paragraphs: [
        'Los resultados de laboratorio de Fénix dieron negativos para micoplasma, VIF y VILEF, una muy buena noticia considerando el estado en el que había llegado.',

        'En el control lo encontraron clínicamente muy bien. Se realizó una nueva curación, se cambió el vendaje y recibió un tónico para ayudarlo a recuperar fuerzas antes de la cirugía.',

        'Ese día se informó una entrega de $116.000 en la veterinaria y un saldo general restante de $444.724. Ese monto correspondía a la cuenta veterinaria acumulada, no a una deuda individual de Fénix.',
      ],
    },

    {
      date: '2026-02-04',
      title: 'Consiguió un tránsito para recuperarse',
      paragraphs: [
        'Fénix estaba evolucionando favorablemente y necesitaba un lugar tranquilo donde recuperar fuerzas antes de la cirugía de amputación.',

        'Después de una búsqueda urgente consiguió tránsito. Lu y su familia lo recibieron y le dieron un espacio seguro donde descansar, recibir su medicación y limitar la movilidad de la pata afectada.',

        'En esos días la rescatista informaba una deuda veterinaria general cercana a los $600.000 mientras seguían sumándose controles y tratamientos de los distintos casos.',
      ],
    },

    {
      date: '2026-02-02',
      title: 'Empezó a recuperarse y buscaba tránsito',
      paragraphs: [
        'Fénix mostraba una evolución clínica muy buena y tenía un apetito voraz, una señal alentadora después del estado crítico con el que había ingresado.',

        'Se informó un pago de $66.300 y un saldo veterinario general de $520.396, al que todavía debían sumarse los controles y la futura cirugía de amputación.',

        'Además de continuar estabilizándolo, la prioridad era conseguir un tránsito donde pudiera descansar, recuperar fuerzas y llegar en mejores condiciones a la operación.',
      ],
    },

    {
      date: '2026-01-31',
      title: 'Logró pasar la primera noche',
      paragraphs: [
        'Fénix había ingresado la noche anterior, el 30 de enero, con una fractura expuesta y una miasis severa que llevaba varios días de evolución. Tenía aproximadamente cuatro años y su estado era muy delicado.',

        'Costó mucho estabilizarlo y durante las primeras horas el objetivo era simplemente que lograra pasar la noche. Fénix lo consiguió y al día siguiente amaneció con apetito, olfateando el alimento y comiendo a pesar del dolor.',

        'Debido a su estado se había buscado con urgencia un gato donante para una posible transfusión, aunque finalmente se decidió no realizarla en ese momento porque poco a poco comenzó a recuperar fuerzas.',

        'La pata afectada ya estaba demasiado comprometida y la amputación sería necesaria una vez que pudiera estabilizarse y llegar en mejores condiciones a la cirugía.',

        'Cuando ingresó, la rescatista ya mantenía una deuda previa de aproximadamente $170.000 en Clínica San Lorenzo, a la que comenzarían a sumarse los gastos de Fénix. Ese monto era parte de la deuda veterinaria general.',
      ],
    },
  ],

  updatedAt: '2026-03-22',

  seoDescription:
    'Conocé la historia de Fénix, rescatado con una fractura expuesta y una grave miasis, su recuperación después de una amputación y el hogar definitivo que encontró junto a su familia.',
} satisfies RescueCase;
