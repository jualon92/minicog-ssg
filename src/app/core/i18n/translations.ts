import { Lang, PageKey } from './language';

/*
 * Build-time translations. Clinical texts are ported verbatim from the
 * original app (jualon92/miniCog-ionic, src/assets/i18n). Do not rewrite
 * clinical content without explicit approval.
 */

export interface PageSeo {
  title: string;
  description: string;
}

export interface Translation {
  common: {
    appName: string;
    skipToContent: string;
    languageSwitch: string;
    languageSwitchAria: string;
    back: string;
    disclaimer: string;
  };
  tts: {
    listen: string;
    stop: string;
  };
  home: {
    title: string;
    intro: string;
    whatIsApp: { title: string; description: string };
    whatIsMiniCog: { title: string; description: string };
    whoIsThisFor: { title: string; description: string };
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
    repeat: string;
    unableRepeat: string;
    continue: string;
  };
  clockDrawing: {
    title: string;
    description: string;
    circlePaper: string;
    request: string;
    drawHour: string;
    clockTime: string;
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
    skipToContent: 'Saltar al contenido principal',
    languageSwitch: 'English',
    languageSwitchAria: 'Ver esta página en inglés',
    back: 'Volver',
    disclaimer:
      'Esta aplicación es una herramienta de apoyo para realizar una prueba de detección (screening). No reemplaza el diagnóstico ni la evaluación de un profesional de la salud.',
  },
  tts: {
    listen: 'Escuchar en voz alta',
    stop: 'Detener lectura',
  },
  home: {
    title: 'Mini-Cog',
    intro: 'Guía paso a paso para realizar la prueba de detección cognitiva Mini-Cog.',
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
    start: 'Iniciar',
  },
  beforeWeStart: {
    title: 'Antes de comenzar',
    steps: [
      'Agarra un lápiz y un papel',
      'Asegúrate de que la persona esté prestando atención',
      'Explica que le vas a pedir que recuerde tres palabras y dibuje un reloj',
      'Encuentra un lugar tranquilo sin distracciones',
    ],
    ready: 'Estoy listo',
  },
  wordRegistration: {
    title: 'Recordar 3 Palabras',
    description:
      'En esta parte del test, le pedirás a la persona que recuerde tres palabras. Dirás las palabras una a una y le pedirás a la persona que las repita. Después de haber dicho las tres palabras, pídele a la persona que las repita nuevamente. Si la persona puede recordar las tres palabras, pasará a la siguiente parte del test.',
    look: 'Mire a la persona directamente y diga:',
    pleaseListen:
      '“Por favor, escuche con atención. Voy a decir tres palabras que quiero que repita ahora y trate de recordar.”',
    wordsAre: 'Las palabras son:',
    wordSets: [
      ['Banana', 'Sol', 'Silla'],
      ['Líder', 'Temporada', 'Mesa'],
      ['Pueblo', 'Cocina', 'Bebe'],
    ],
    chooseSet: 'Elegir otra lista de palabras',
    setName: 'Lista',
    askRepeat: 'Después de haber dicho las tres palabras, pida a la persona que las repita.',
    repeat: 'Repite las palabras si es necesario, pero no proporciones información adicional ni pistas.',
    unableRepeat:
      'Si la persona no puede repetir las palabras después de tres intentos, pasa al Paso 2 (dibujo del reloj).',
    continue: 'Siguiente paso',
  },
  clockDrawing: {
    title: 'Dibujo del Reloj',
    description: 'Déle a la persona una hoja de papel en blanco y un bolígrafo o lápiz.',
    circlePaper:
      'Es aceptable proporcionar una hoja de papel con el círculo ya dibujado para la persona.',
    request:
      'Diga: “A continuación, quiero que dibuje un reloj para mí. Primero, ponga todos los números donde van.”',
    drawHour: 'Cuando eso esté completo, diga: “Ahora, ponga las manecillas en las',
    clockTime: '11 y 10.”',
    repeatInfo: 'Repita las instrucciones según sea necesario, ya que esto no es una prueba de memoria.',
    unableDraw: 'Pase al paso 3 si el reloj no está completo en tres minutos.',
    continue: 'Siguiente paso',
  },
  wordScoring: {
    title: 'Calificación del recuerdo de palabras',
    request:
      'Le pedirá a la persona que recuerde el conjunto de 3 palabras que le dio al comienzo de la prueba.',
    question: 'Diga: “¿Cuáles fueron las tres palabras que le pedí que recordara?”',
    writeDown: 'Escriba las palabras que dijo la persona.',
    scoreBasis: 'Dé 1 punto por cada palabra correcta sin pistas.',
    scoreGroupLabel: 'Palabras correctas',
    decrease: 'Restar una palabra correcta',
    increase: 'Sumar una palabra correcta',
    of: 'de',
    points: 'Puntos',
    continue: 'Siguiente paso',
  },
  clockScoring: {
    title: 'Calificación del Dibujo del Reloj',
    scoreBasis:
      '2 puntos para un reloj normal o 0 (cero) puntos para un dibujo de reloj anormal.',
    correctClock:
      'Un reloj normal debe incluir todos los números (1-12), cada uno solo una vez, en el orden y dirección correctos (en el sentido de las agujas del reloj).',
    correctHands: 'También deben estar presentes dos manecillas, una apuntando a las 11 y otra a las 2.',
    handInfo: 'La longitud de la mano no se califica.',
    legend: '¿Cómo es el reloj dibujado?',
    normalOption: 'Reloj normal (2 puntos)',
    abnormalOption: 'Reloj anormal (0 puntos)',
    continue: 'Ver resultados',
  },
  results: {
    title: 'Resultados',
    briefDescription:
      'Puntuación total = Puntuación de Recuerdo de Palabras + Puntuación de Dibujo del Reloj.',
    cutPointHtml:
      'Un punto de corte <strong>MENOR de 3 puntos</strong> en el Mini-Cog™ ha sido validado para la detección de demencia, pero muchas personas con deterioro cognitivo clínicamente significativo obtendrán una puntuación más alta.',
    interpretationHtml:
      'Cuando se desea una mayor sensibilidad, se recomienda un punto de corte <strong>MENOR de 4</strong>, ya que puede indicar la necesidad de una evaluación adicional del estado cognitivo.',
    interpretationLabel: 'Interpretación Puntaje total',
    wordRecall: 'Palabras',
    clockDrawing: 'Reloj',
    totalScore: 'Total',
    score: 'Puntuación',
    repeat: 'Repetir',
  },
  seo: {
    home: {
      title: 'Mini-Cog — Guía paso a paso del test de detección cognitiva',
      description:
        'Aplicación gratuita que te guía paso a paso para realizar la prueba Mini-Cog (recuerdo de 3 palabras y dibujo del reloj) con un ser querido. Herramienta de screening, no de diagnóstico.',
    },
    beforeWeStart: {
      title: 'Antes de comenzar — Mini-Cog',
      description:
        'Qué necesitás antes de administrar la prueba Mini-Cog: lápiz y papel, atención de la persona y un lugar tranquilo sin distracciones.',
    },
    wordRegistration: {
      title: 'Paso 1: Recordar 3 palabras — Mini-Cog',
      description:
        'Primer paso del test Mini-Cog: decí tres palabras y pedile a la persona que las repita y las recuerde. Instrucciones completas y listas de palabras.',
    },
    clockDrawing: {
      title: 'Paso 2: Dibujo del reloj — Mini-Cog',
      description:
        'Segundo paso del test Mini-Cog: la persona dibuja un reloj en papel con todos los números y las manecillas marcando las 11 y 10.',
    },
    wordScoring: {
      title: 'Paso 3: Calificar el recuerdo de palabras — Mini-Cog',
      description:
        'Cómo puntuar el recuerdo de palabras del Mini-Cog: 1 punto por cada palabra recordada sin pistas, hasta 3 puntos.',
    },
    clockScoring: {
      title: 'Paso 4: Calificar el dibujo del reloj — Mini-Cog',
      description:
        'Cómo puntuar el dibujo del reloj del Mini-Cog: 2 puntos para un reloj normal, 0 puntos para un reloj anormal.',
    },
    results: {
      title: 'Resultados e interpretación — Mini-Cog',
      description:
        'Resultado del test Mini-Cog: puntuación total de 0 a 5 y su interpretación. Un puntaje menor de 3 sugiere realizar una evaluación profesional.',
    },
  },
};

const en: Translation = {
  common: {
    appName: 'Mini-Cog',
    skipToContent: 'Skip to main content',
    languageSwitch: 'Español',
    languageSwitchAria: 'View this page in Spanish',
    back: 'Go back',
    disclaimer:
      'This application is a support tool for administering a screening test. It does not replace diagnosis or evaluation by a health professional.',
  },
  tts: {
    listen: 'Read aloud',
    stop: 'Stop reading',
  },
  home: {
    title: 'Mini-Cog',
    intro: 'Step-by-step guide to administer the Mini-Cog cognitive screening test.',
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
    start: 'Start',
  },
  beforeWeStart: {
    title: 'Before we begin',
    steps: [
      'Grab a pencil and paper',
      'Make sure the person is paying attention',
      "Explain that you'll ask them to remember three words and draw a clock",
      'Find a quiet place with no distractions',
    ],
    ready: "I'm ready",
  },
  wordRegistration: {
    title: 'Remember 3 Words',
    description:
      'In this part of the test, you will ask the person to remember three words. Say the words one by one and ask the person to repeat them. After you have said all three words, ask the person to repeat them again. If the person can recall all three words, proceed to the next part of the test.',
    look: 'Look directly at the person and say:',
    pleaseListen:
      '“Please listen carefully. I am going to say three words that I want you to repeat now and try to remember.”',
    wordsAre: 'The words are:',
    wordSets: [
      ['Banana', 'Sun', 'Chair'],
      ['Leader', 'Season', 'Table'],
      ['Town', 'Kitchen', 'Baby'],
    ],
    chooseSet: 'Choose another word list',
    setName: 'List',
    askRepeat: 'After saying the three words, ask the person to repeat them.',
    repeat: 'Repeat the words if necessary, but do not provide additional information or hints.',
    unableRepeat:
      'If the person cannot repeat the words after three attempts, move to Step 2 (clock drawing).',
    continue: 'Next step',
  },
  clockDrawing: {
    title: 'Clock Drawing',
    description: 'Give the person a blank piece of paper and a pen or pencil.',
    circlePaper:
      'It is acceptable to provide a piece of paper with a pre-drawn circle for the person.',
    request:
      'Say: “Next, I want you to draw a clock for me. First, put all the numbers where they belong.”',
    drawHour: 'When that is complete, say: “Now, set the hands to',
    clockTime: '10 past 11.”',
    repeatInfo: 'Repeat instructions as needed, as this is not a memory test.',
    unableDraw: 'Move to Step 3 if the clock is incomplete after three minutes.',
    continue: 'Next step',
  },
  wordScoring: {
    title: 'Scoring Word Recall',
    request: 'You will ask the person to recall the set of 3 words given at the beginning of the test.',
    question: 'Say: “What were the three words I asked you to remember?”',
    writeDown: 'Write down the words the person said.',
    scoreBasis: 'Give 1 point for each correct word without hints.',
    scoreGroupLabel: 'Correct words',
    decrease: 'Remove one correct word',
    increase: 'Add one correct word',
    of: 'of',
    points: 'Points',
    continue: 'Next step',
  },
  clockScoring: {
    title: 'Scoring Clock Drawing',
    scoreBasis: '2 points for a normal clock or 0 points for an abnormal clock drawing.',
    correctClock:
      'A normal clock should include all numbers (1-12), each only once, in the correct order and direction (clockwise).',
    correctHands: 'There should also be two hands, one pointing to 11 and the other to 2.',
    handInfo: 'Hand length is not scored.',
    legend: 'How does the drawn clock look?',
    normalOption: 'Normal clock (2 points)',
    abnormalOption: 'Abnormal clock (0 points)',
    continue: 'See results',
  },
  results: {
    title: 'Results',
    briefDescription: 'Total Score = Word Recall Score + Clock Drawing Score.',
    cutPointHtml:
      'A <strong>score of less than 3</strong> on the Mini-Cog™ has been validated for dementia detection, but many people with significant cognitive impairment may score higher.',
    interpretationHtml:
      'For greater sensitivity, a <strong>score of less than 4</strong> is recommended, as it may indicate the need for further cognitive evaluation.',
    interpretationLabel: 'Total Score Interpretation',
    wordRecall: 'Words',
    clockDrawing: 'Clock',
    totalScore: 'Total',
    score: 'Score',
    repeat: 'Repeat',
  },
  seo: {
    home: {
      title: 'Mini-Cog — Step-by-step cognitive screening test guide',
      description:
        'Free application that guides you step by step to administer the Mini-Cog test (3-word recall and clock drawing) with a loved one. Screening tool, not a diagnostic tool.',
    },
    beforeWeStart: {
      title: 'Before we begin — Mini-Cog',
      description:
        'What you need before administering the Mini-Cog test: pencil and paper, the person’s attention and a quiet place with no distractions.',
    },
    wordRegistration: {
      title: 'Step 1: Remember 3 words — Mini-Cog',
      description:
        'First step of the Mini-Cog test: say three words and ask the person to repeat and remember them. Full instructions and word lists.',
    },
    clockDrawing: {
      title: 'Step 2: Clock drawing — Mini-Cog',
      description:
        'Second step of the Mini-Cog test: the person draws a clock on paper with all the numbers and the hands set to 10 past 11.',
    },
    wordScoring: {
      title: 'Step 3: Scoring word recall — Mini-Cog',
      description:
        'How to score Mini-Cog word recall: 1 point for each word recalled without hints, up to 3 points.',
    },
    clockScoring: {
      title: 'Step 4: Scoring the clock drawing — Mini-Cog',
      description:
        'How to score the Mini-Cog clock drawing: 2 points for a normal clock, 0 points for an abnormal clock.',
    },
    results: {
      title: 'Results and interpretation — Mini-Cog',
      description:
        'Mini-Cog test result: total score from 0 to 5 and its interpretation. A score below 3 suggests further professional evaluation.',
    },
  },
};

export const TRANSLATIONS: Record<Lang, Translation> = { es, en };
