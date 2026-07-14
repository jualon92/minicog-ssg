import { Lang, PageKey } from './language';

/*
 * Build-time translations. Clinical texts follow the official Mini-Cog©
 * instrument verbatim; patient-facing quotes are literal. Sources:
 * - Spanish: https://mini-cog.com/wp-content/uploads/2022/09/SPANISH-Mini-Cog.pdf
 * - English: https://mini-cog.com/wp-content/uploads/2022/04/Standardized-English-Mini-Cog-1-19-16-EN_v1-low-1-2.pdf
 * Do not rewrite clinical content without checking those PDFs.
 * Known defect in the Spanish PDF: the clock-scoring sentence is truncated
 * ("...posiciones de anclaje y 2 (11:10)"); the missing fragment about the
 * hands was completed from the English PDF.
 */

export interface PageSeo {
  title: string;
  description: string;
}

export interface Translation {
  common: {
    appName: string;
    tagline: string;
    skipToContent: string;
    languageSwitch: string;
    opensInNewTab: string;
    back: string;
    disclaimer: string;
  };
  tts: {
    listen: string;
    stop: string;
  };
  home: {
    intro: string;
    basedOn: { text: string; linkLabel: string; url: string };
    whatIsApp: { title: string; description: string };
    whatIsMiniCog: { title: string; description: string };
    whoIsThisFor: { title: string; description: string };
    sources: { title: string; items: { label: string; url: string }[]; attribution: string };
    start: string;
  };
  beforeWeStart: {
    title: string;
    steps: string[];
    ready: string;
  };
  wordRegistration: {
    title: string;
    description: string;
    look: string;
    pleaseListen: string;
    wordsAre: string;
    wordSets: [string, string, string][];
    chooseSet: string;
    setName: string;
    askRepeat: string;
    sayNow: string;
    altListNote: string;
    unableRepeat: string;
    continue: string;
  };
  clockDrawing: {
    title: string;
    description: string;
    circlePaper: string;
    request: string;
    setHands: string;
    repeatInfo: string;
    unableDraw: string;
    continue: string;
  };
  wordScoring: {
    title: string;
    request: string;
    question: string;
    writeDown: string;
    scoreBasis: string;
    scoreGroupLabel: string;
    decrease: string;
    increase: string;
    of: string;
    points: string;
    continue: string;
  };
  clockScoring: {
    title: string;
    scoreBasis: string;
    correctClock: string;
    correctHands: string;
    handInfo: string;
    legend: string;
    normalOption: string;
    abnormalOption: string;
    continue: string;
  };
  results: {
    title: string;
    briefDescription: string;
    cutPointHtml: string;
    interpretationHtml: string;
    interpretationLabel: string;
    wordRecall: string;
    clockDrawing: string;
    totalScore: string;
    score: string;
    repeat: string;
  };
  seo: Record<PageKey, PageSeo>;
}

const es: Translation = {
  common: {
    appName: 'Mini-Cog',
    tagline: 'Detección de deterioro cognitivo',
    skipToContent: 'Saltar al contenido principal',
    languageSwitch: 'English',
    opensInNewTab: '(se abre en una pestaña nueva)',
    back: 'Volver',
    disclaimer:
      'Esta aplicación es una herramienta de apoyo para realizar una prueba de detección (screening). No reemplaza el diagnóstico ni la evaluación de un profesional de la salud.',
  },
  tts: {
    listen: 'Escuchar en voz alta',
    stop: 'Detener lectura',
  },
  home: {
    intro: 'Guía paso a paso para realizar la prueba de detección cognitiva Mini-Cog.',
    basedOn: {
      text: 'Esta guía está basada en la versión oficial en español del Mini-Cog©:',
      linkLabel: 'PDF oficial (mini-cog.com)',
      url: 'https://mini-cog.com/wp-content/uploads/2022/09/SPANISH-Mini-Cog.pdf',
    },
    whatIsApp: {
      title: '¿Qué es esta app?',
      description:
        'Esta aplicación te guiará paso a paso para realizar la prueba Mini Cog con un ser querido.',
    },
    whatIsMiniCog: {
      title: '¿Qué es el Mini Cog?',
      description:
        'La prueba Mini Cog es una prueba breve de detección cognitiva que se utiliza para detectar deterioro cognitivo en adultos mayores. Consiste en una prueba de recuerdo de tres elementos para la memoria y una simple prueba de dibujo de un reloj.',
    },
    whoIsThisFor: {
      title: '¿Para quién es esto?',
      description:
        'Esta prueba está diseñada para ser administrada por una persona a otra, como un miembro de la familia o un ser querido.',
    },
    sources: {
      title: 'Fuentes',
      items: [
        {
          label: 'Mini-Cog© en español (PDF oficial)',
          url: 'https://mini-cog.com/wp-content/uploads/2022/09/SPANISH-Mini-Cog.pdf',
        },
        {
          label: 'Download the Mini-Cog© Instrument — mini-cog.com',
          url: 'https://mini-cog.com/download-the-mini-cog-instrument/',
        },
      ],
      attribution:
        'Mini-Cog© S. Borson. Todos los derechos reservados. Reimpreso con permiso del autor, exclusivamente para fines clínicos y educativos.',
    },
    start: 'Iniciar',
  },
  beforeWeStart: {
    title: 'Antes de comenzar',
    steps: [
      'Agarra un lápiz y un papel',
      'Asegúrate de que la persona esté prestando atención',
      'Explica que le vas a pedir que recuerde tres palabras y dibuje un reloj',
      'Encuentra un lugar tranquilo sin distracciones',
      'Cuida que la persona no vea la pantalla: las palabras de la prueba aparecen escritas',
      'Haz la prueba en el idioma que la persona domina mejor',
      'Evita hacer la prueba si la persona está enferma, cansada o estresada ese día',
    ],
    ready: 'Estoy listo',
  },
  wordRegistration: {
    title: 'Registro de tres palabras',
    description:
      'En esta parte de la prueba, le pedirás a la persona que repita y trate de recordar tres palabras. Di las tres palabras, pídele que las repita y luego continúa con el Paso 2 (dibujo de reloj).',
    look: 'Mire directamente a la persona y dígale:',
    pleaseListen:
      '“Escuche con cuidado. Voy a decir tres palabras que quiero que usted repita ahora y trate de recordar.”',
    wordsAre: 'Las palabras son:',
    wordSets: [
      ['Plátano', 'Amanecer', 'Silla'],
      ['Líder', 'Temporada', 'Mesa'],
      ['Pueblo', 'Cocina', 'Dedo'],
      ['Río', 'Nación', 'Bebé'],
      ['Hija', 'Jardín', 'Retrato'],
      ['Capitán', 'Cielo', 'Montaña'],
    ],
    chooseSet: 'Elegir otra lista de palabras',
    setName: 'Versión',
    askRepeat: 'Después de decir las tres palabras, diga:',
    sayNow: '“Ahora repita las palabras.”',
    altListNote:
      'Esta lista de palabras y otras más se han utilizado en varios estudios clínicos. Si planea aplicar la prueba repetidamente, se recomienda el uso de una lista alternativa de palabras.',
    unableRepeat:
      'Si la persona no es capaz de repetir las palabras después de tres intentos, continúe al Paso N.º 2 (Dibujo de reloj).',
    continue: 'Siguiente paso',
  },
  clockDrawing: {
    title: 'Dibujo de reloj',
    description: 'Déle a la persona una hoja de papel en blanco y un bolígrafo o lápiz.',
    circlePaper: 'Use una hoja con el círculo ya impreso para este ejercicio.',
    request: 'Diga: “Ahora, quiero que me dibuje un reloj. Primero, coloque los números donde van.”',
    setHands:
      'Una vez que la persona haya terminado, diga: “Ahora, ponga las manecillas del reloj en la posición que indiquen las 11:10.”',
    repeatInfo: 'Repita las instrucciones según sea necesario ya que esto no es una prueba de memoria.',
    unableDraw: 'Continúe al Paso N.º 3 si la persona no lo ha completado en tres minutos.',
    continue: 'Siguiente paso',
  },
  wordScoring: {
    title: 'Memoria de tres palabras',
    request: 'Pídale a la persona que repita las tres palabras que usted dijo en el Paso N.º 1.',
    question: 'Diga: “¿Cuáles fueron las tres palabras que le pedí que recordara?”',
    writeDown: 'Registre el número de versión de la lista de palabras y las respuestas de la persona.',
    scoreBasis: '1 punto por cada palabra que recuerde espontáneamente sin pistas.',
    scoreGroupLabel: 'Palabras correctas',
    decrease: 'Restar una palabra correcta',
    increase: 'Sumar una palabra correcta',
    of: 'de',
    points: 'Puntos',
    continue: 'Siguiente paso',
  },
  clockScoring: {
    title: 'Puntaje del Dibujo de reloj',
    scoreBasis:
      'Reloj normal = 2 puntos. Si la persona no es capaz de dibujar un reloj o se rehúsa (anormal) = 0 puntos.',
    correctClock:
      'Un reloj normal tiene todos los números colocados en la secuencia y posición aproximadamente correctas (p. ej., 12, 3, 6 y 9 están en posiciones de anclaje), sin números faltantes ni duplicados.',
    correctHands: 'Las manecillas apuntan a las 11 y 2 (11:10).',
    handInfo: 'La longitud de la manecilla no se cuenta en el puntaje.',
    legend: '¿Cómo es el reloj dibujado?',
    normalOption: 'Reloj normal (2 puntos)',
    abnormalOption: 'Reloj anormal (0 puntos)',
    continue: 'Ver resultados',
  },
  results: {
    title: 'Resultados',
    briefDescription:
      'Puntaje total = Puntaje de Memoria de palabras + Puntaje de Dibujo de reloj.',
    cutPointHtml:
      'Se ha establecido un valor de corte de <strong>&lt; 3</strong> en la Mini-Cog™ para la detección de demencia, pero muchas personas con deterioro cognitivo clínicamente significativo tendrán una puntuación más alta.',
    interpretationHtml:
      'Cuando se desea una mayor sensibilidad, se recomienda usar un valor de corte de <strong>&lt; 4</strong>, ya que podría indicar la necesidad de evaluaciones adicionales para determinar el estado cognitivo.',
    interpretationLabel: 'Interpretación del puntaje total',
    wordRecall: 'Memoria de palabras',
    clockDrawing: 'Dibujo de reloj',
    totalScore: 'Puntaje total',
    score: 'Puntuación',
    repeat: 'Repetir',
  },
  seo: {
    home: {
      title: 'Mini-Cog — Guía paso a paso del test de detección cognitiva',
      description:
        'Aplicación gratuita que te guía paso a paso para realizar la prueba Mini-Cog (recuerdo de 3 palabras y dibujo de reloj) con un ser querido. Basada en el PDF oficial de mini-cog.com. Herramienta de screening, no de diagnóstico.',
    },
    beforeWeStart: {
      title: 'Antes de comenzar — Mini-Cog',
      description:
        'Qué necesitás antes de administrar la prueba Mini-Cog: lápiz y papel, atención de la persona y un lugar tranquilo sin distracciones.',
    },
    wordRegistration: {
      title: 'Paso 1: Registro de tres palabras — Mini-Cog',
      description:
        'Primer paso de la prueba Mini-Cog: decí tres palabras y pedile a la persona que las repita y trate de recordarlas. Instrucciones completas y las 6 versiones oficiales de listas de palabras.',
    },
    clockDrawing: {
      title: 'Paso 2: Dibujo de reloj — Mini-Cog',
      description:
        'Segundo paso de la prueba Mini-Cog: la persona dibuja un reloj en papel con todos los números y las manecillas en la posición que indiquen las 11:10.',
    },
    wordScoring: {
      title: 'Paso 3: Memoria de tres palabras — Mini-Cog',
      description:
        'Cómo puntuar la memoria de palabras del Mini-Cog: 1 punto por cada palabra que recuerde espontáneamente sin pistas, hasta 3 puntos.',
    },
    clockScoring: {
      title: 'Paso 4: Puntaje del dibujo de reloj — Mini-Cog',
      description:
        'Cómo puntuar el dibujo de reloj del Mini-Cog: 2 puntos para un reloj normal, 0 puntos para un reloj anormal.',
    },
    results: {
      title: 'Resultados e interpretación — Mini-Cog',
      description:
        'Resultado de la prueba Mini-Cog: puntaje total de 0 a 5 y su interpretación. Un valor de corte de menos de 3 se ha establecido para la detección de demencia.',
    },
  },
};

const en: Translation = {
  common: {
    appName: 'Mini-Cog',
    tagline: 'Cognitive impairment screening',
    skipToContent: 'Skip to main content',
    languageSwitch: 'Español',
    opensInNewTab: '(opens in a new tab)',
    back: 'Go back',
    disclaimer:
      'This application is a support tool for administering a screening test. It does not replace diagnosis or evaluation by a health professional.',
  },
  tts: {
    listen: 'Read aloud',
    stop: 'Stop reading',
  },
  home: {
    intro: 'Step-by-step guide to administer the Mini-Cog cognitive screening test.',
    basedOn: {
      text: 'This guide is based on the official Standardized English Mini-Cog©:',
      linkLabel: 'Official PDF (mini-cog.com)',
      url: 'https://mini-cog.com/wp-content/uploads/2022/04/Standardized-English-Mini-Cog-1-19-16-EN_v1-low-1-2.pdf',
    },
    whatIsApp: {
      title: 'What is this app?',
      description:
        'This application will guide you step by step to perform the Mini Cog test with a loved one.',
    },
    whatIsMiniCog: {
      title: 'What is the Mini Cog?',
      description:
        'The Mini Cog test is a brief cognitive screening tool used to detect cognitive impairment in older adults. It consists of a three-item memory recall test and a simple clock-drawing test.',
    },
    whoIsThisFor: {
      title: 'Who is this for?',
      description:
        'This test is designed to be administered by one person to another, such as a family member or loved one.',
    },
    sources: {
      title: 'Sources',
      items: [
        {
          label: 'Standardized English Mini-Cog© (official PDF)',
          url: 'https://mini-cog.com/wp-content/uploads/2022/04/Standardized-English-Mini-Cog-1-19-16-EN_v1-low-1-2.pdf',
        },
        {
          label: 'Download the Mini-Cog© Instrument — mini-cog.com',
          url: 'https://mini-cog.com/download-the-mini-cog-instrument/',
        },
      ],
      attribution:
        'Mini-Cog© S. Borson. All rights reserved. Reprinted with permission of the author solely for clinical and educational purposes.',
    },
    start: 'Start',
  },
  beforeWeStart: {
    title: 'Before we begin',
    steps: [
      'Grab a pencil and paper',
      'Make sure the person is paying attention',
      "Explain that you'll ask them to remember three words and draw a clock",
      'Find a quiet place with no distractions',
      'Keep the screen out of the person’s view: the test words appear written on it',
      'Do the test in the language the person knows best',
      'Avoid testing if the person is sick, tired, or stressed that day',
    ],
    ready: "I'm ready",
  },
  wordRegistration: {
    title: 'Three Word Registration',
    description:
      'In this part of the test, you will ask the person to repeat and try to remember three words. Say the three words, ask the person to repeat them, then continue to Step 2 (clock drawing).',
    look: 'Look directly at the person and say:',
    pleaseListen:
      '“Please listen carefully. I am going to say three words that I want you to repeat back to me now and try to remember.”',
    wordsAre: 'The words are:',
    wordSets: [
      ['Banana', 'Sunrise', 'Chair'],
      ['Leader', 'Season', 'Table'],
      ['Village', 'Kitchen', 'Baby'],
      ['River', 'Nation', 'Finger'],
      ['Captain', 'Garden', 'Picture'],
      ['Daughter', 'Heaven', 'Mountain'],
    ],
    chooseSet: 'Choose another word list',
    setName: 'Version',
    askRepeat: 'After saying the three words, say:',
    sayNow: '“Please say them for me now.”',
    altListNote:
      'This and other word lists have been used in one or more clinical studies. For repeated administrations, use of an alternative word list is recommended.',
    unableRepeat:
      'If the person is unable to repeat the words after three attempts, move on to Step 2 (clock drawing).',
    continue: 'Next step',
  },
  clockDrawing: {
    title: 'Clock Drawing',
    description: 'Give the person a blank piece of paper and a pen or pencil.',
    circlePaper: 'Use a sheet with a preprinted circle for this exercise.',
    request: 'Say: “Next, I want you to draw a clock for me. First, put in all of the numbers where they go.”',
    setHands: 'When that is completed, say: “Now, set the hands to 10 past 11.”',
    repeatInfo: 'Repeat instructions as needed as this is not a memory test.',
    unableDraw: 'Move to Step 3 if the clock is not complete within three minutes.',
    continue: 'Next step',
  },
  wordScoring: {
    title: 'Three Word Recall',
    request: 'Ask the person to recall the three words you stated in Step 1.',
    question: 'Say: “What were the three words I asked you to remember?”',
    writeDown: 'Record the word list version number and the person’s answers.',
    scoreBasis: '1 point for each word spontaneously recalled without cueing.',
    scoreGroupLabel: 'Correct words',
    decrease: 'Remove one correct word',
    increase: 'Add one correct word',
    of: 'of',
    points: 'Points',
    continue: 'Next step',
  },
  clockScoring: {
    title: 'Clock Draw Score',
    scoreBasis: 'Normal clock = 2 points. Inability or refusal to draw a clock (abnormal) = 0 points.',
    correctClock:
      'A normal clock has all numbers placed in the correct sequence and approximately correct position (e.g., 12, 3, 6 and 9 are in anchor positions) with no missing or duplicate numbers.',
    correctHands: 'Hands are pointing to the 11 and 2 (11:10).',
    handInfo: 'Hand length is not scored.',
    legend: 'How does the drawn clock look?',
    normalOption: 'Normal clock (2 points)',
    abnormalOption: 'Abnormal clock (0 points)',
    continue: 'See results',
  },
  results: {
    title: 'Results',
    briefDescription: 'Total score = Word Recall score + Clock Draw score.',
    cutPointHtml:
      'A cut point of <strong>&lt;3</strong> on the Mini-Cog™ has been validated for dementia screening, but many individuals with clinically meaningful cognitive impairment will score higher.',
    interpretationHtml:
      'When greater sensitivity is desired, a cut point of <strong>&lt;4</strong> is recommended as it may indicate a need for further evaluation of cognitive status.',
    interpretationLabel: 'Total score interpretation',
    wordRecall: 'Word Recall',
    clockDrawing: 'Clock Draw',
    totalScore: 'Total score',
    score: 'Score',
    repeat: 'Repeat',
  },
  seo: {
    home: {
      title: 'Mini-Cog — Step-by-step cognitive screening test guide',
      description:
        'Free application that guides you step by step to administer the Mini-Cog test (3-word recall and clock drawing) with a loved one. Based on the official PDF from mini-cog.com. Screening tool, not a diagnostic tool.',
    },
    beforeWeStart: {
      title: 'Before we begin — Mini-Cog',
      description:
        'What you need before administering the Mini-Cog test: pencil and paper, the person’s attention and a quiet place with no distractions.',
    },
    wordRegistration: {
      title: 'Step 1: Three Word Registration — Mini-Cog',
      description:
        'First step of the Mini-Cog test: say three words and ask the person to repeat them and try to remember them. Full instructions and the 6 official word list versions.',
    },
    clockDrawing: {
      title: 'Step 2: Clock Drawing — Mini-Cog',
      description:
        'Second step of the Mini-Cog test: the person draws a clock on paper with all the numbers and the hands set to 10 past 11.',
    },
    wordScoring: {
      title: 'Step 3: Three Word Recall — Mini-Cog',
      description:
        'How to score Mini-Cog word recall: 1 point for each word spontaneously recalled without cueing, up to 3 points.',
    },
    clockScoring: {
      title: 'Step 4: Clock Draw Score — Mini-Cog',
      description:
        'How to score the Mini-Cog clock drawing: 2 points for a normal clock, 0 points for an abnormal clock.',
    },
    results: {
      title: 'Results and interpretation — Mini-Cog',
      description:
        'Mini-Cog test result: total score from 0 to 5 and its interpretation. A cut point of less than 3 has been validated for dementia screening.',
    },
  },
};

export const TRANSLATIONS: Record<Lang, Translation> = { es, en };
