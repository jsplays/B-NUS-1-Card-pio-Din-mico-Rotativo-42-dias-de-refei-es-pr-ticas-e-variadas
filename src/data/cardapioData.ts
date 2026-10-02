import { DayPlan, WeekInfo, ShoppingCategory, Recipe } from '../types';

import mealPrepImg from '../assets/images/meal_prep_rotativo_1790971506760.jpg';
import breakfastImg from '../assets/images/breakfast_oats_bowl_1790971519666.jpg';
import balancedPlateImg from '../assets/images/balanced_plate_guide_1790971528993.jpg';
import hydrationImg from '../assets/images/hydration_citrus_bottle_1790971538421.jpg';

export const APP_IMAGES = {
  mealPrep: mealPrepImg,
  breakfast: breakfastImg,
  balancedPlate: balancedPlateImg,
  hydration: hydrationImg,
};

export const WEEKS_DATA: WeekInfo[] = [
  {
    week: 1,
    theme: 'Organização',
    objective: 'Criar uma rotina básica de refeições sem tentar mudar tudo ao mesmo tempo.',
    highlightTitle: 'Preparo da semana',
    highlightItems: [
      'Cozinhe uma panela de feijão ou lentilha.',
      'Higienize folhas e alguns legumes.',
      'Cozinhe ovos para refeições rápidas.',
      'Deixe frutas visíveis e prontas para consumo.',
      'Separe castanhas ou sementes em pequenas porções.'
    ],
    days: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    week: 2,
    theme: 'Praticidade',
    objective: 'Ter refeições rápidas para os dias corridos.',
    highlightTitle: 'Três refeições de emergência',
    highlightItems: [
      'Pão, ovos mexidos e tomate.',
      'Iogurte natural, aveia, banana e castanhas.',
      'Arroz pronto, feijão congelado, sardinha e salada.'
    ],
    days: [8, 9, 10, 11, 12, 13, 14]
  },
  {
    week: 3,
    theme: 'Mais variedade',
    objective: 'Ampliar a variedade de legumes, frutas, proteínas e preparações.',
    highlightTitle: 'Como variar sem comprar mais',
    highlightItems: [
      'Troque o arroz por batata, mandioca, milho, cuscuz ou massa.',
      'Troque o frango por ovos, peixe, carne, tofu ou leguminosas.',
      'Troque a salada crua por legumes cozidos ou assados.',
      'Use frutas da estação.',
      'Altere os temperos: alho, cebola, limão, páprica, ervas, cúrcuma e cheiro-verde.'
    ],
    days: [15, 16, 17, 18, 19, 20, 21]
  },
  {
    week: 4,
    theme: 'Marmitas e refeições fora',
    objective: 'Manter uma alimentação organizada mesmo trabalhando ou estudando fora.',
    highlightTitle: 'Montagem de marmita segura',
    highlightItems: [
      'Base: arroz, batata, mandioca ou massa.',
      'Leguminosa ou proteína: feijão, lentilha ou grão-de-bico, carne, ovos ou peixe.',
      'Dois tipos de vegetais e tempero separado se possível.',
      'Segurança sanitária: mantenha preparações quentes >60 °C ou frias <5 °C em bolsa térmica.'
    ],
    days: [22, 23, 24, 25, 26, 27, 28]
  },
  {
    week: 5,
    theme: 'Energia e movimento',
    objective: 'Apoiar uma rotina mais ativa sem usar comida como punição ou recompensa.',
    highlightTitle: 'Antes e depois do movimento',
    highlightItems: [
      'Antes: banana, pão com ovo, iogurte com aveia, fruta com castanhas ou cuscuz com queijo.',
      'Depois: arroz, feijão e frango; omelete com batata; iogurte com fruta e aveia; sanduíche de atum.',
      'Não é necessário usar suplementos para seguir este cardápio.'
    ],
    days: [29, 30, 31, 32, 33, 34, 35]
  },
  {
    week: 6,
    theme: 'Consolidação',
    objective: 'Escolher os hábitos que continuarão depois dos 42 dias.',
    highlightTitle: 'Reflexão final de consolidação',
    highlightItems: [
      'Qual refeição ficou mais fácil de organizar?',
      'Qual alimento você passou a consumir mais?',
      'Qual preparo deseja repetir?',
      'O que dificultou sua rotina?',
      'Quais cinco hábitos você deseja manter?'
    ],
    days: [36, 37, 38, 39, 40, 41, 42]
  }
];

export const DAYS_DATA: DayPlan[] = [
  // SEMANA 1
  {
    day: 1,
    week: 1,
    cafe: 'Aveia, banana e iogurte natural',
    lancheManha: 'Maçã',
    almoco: 'Arroz, feijão, frango e salada',
    lancheTarde: 'Castanhas',
    jantar: 'Omelete com tomate e pão'
  },
  {
    day: 2,
    week: 1,
    cafe: 'Pão, ovo mexido e mamão',
    lancheManha: 'Iogurte',
    almoco: 'Carne moída, batata e legumes',
    lancheTarde: 'Pera',
    jantar: 'Sopa de legumes com frango'
  },
  {
    day: 3,
    week: 1,
    cafe: 'Cuscuz com ovo e laranja',
    lancheManha: 'Banana',
    almoco: 'Peixe, arroz, feijão e couve',
    lancheTarde: 'Iogurte com aveia',
    jantar: 'Sanduíche de atum e salada'
  },
  {
    day: 4,
    week: 1,
    cafe: 'Iogurte, morango e aveia',
    lancheManha: 'Uvas',
    almoco: 'Frango, mandioca e salada',
    lancheTarde: 'Queijo e tomate',
    jantar: 'Arroz, lentilha e legumes'
  },
  {
    day: 5,
    week: 1,
    cafe: 'Tapioca com queijo e tomate',
    lancheManha: 'Mamão',
    almoco: 'Carne, arroz, feijão e abóbora',
    lancheTarde: 'Fruta da estação',
    jantar: 'Ovos mexidos, batata e salada'
  },
  {
    day: 6,
    week: 1,
    cafe: 'Pão com ricota e melão',
    lancheManha: 'Castanhas',
    almoco: 'Macarrão com frango e legumes',
    lancheTarde: 'Iogurte',
    jantar: 'Torta caseira de legumes'
  },
  {
    day: 7,
    week: 1,
    cafe: 'Mingau de aveia com maçã',
    lancheManha: 'Fruta',
    almoco: 'Arroz, feijão, ovo e salada',
    lancheTarde: 'Pipoca caseira',
    jantar: 'Salada de grão-de-bico com ovo'
  },

  // SEMANA 2
  {
    day: 8,
    week: 2,
    cafe: 'Cuscuz com queijo e melão',
    lancheManha: 'Banana',
    almoco: 'Arroz, feijão, carne e beterraba',
    lancheTarde: 'Iogurte',
    jantar: 'Crepioca com frango'
  },
  {
    day: 9,
    week: 2,
    cafe: 'Pão com pasta de grão-de-bico',
    lancheManha: 'Laranja',
    almoco: 'Peixe, purê de batata e brócolis',
    lancheTarde: 'Castanhas',
    jantar: 'Sopa de lentilha'
  },
  {
    day: 10,
    week: 2,
    cafe: 'Vitamina de banana com aveia',
    lancheManha: 'Maçã',
    almoco: 'Frango, arroz e salada colorida',
    lancheTarde: 'Iogurte',
    jantar: 'Omelete de legumes'
  },
  {
    day: 11,
    week: 2,
    cafe: 'Tapioca com ovo',
    lancheManha: 'Mamão',
    almoco: 'Carne cozida, mandioca e couve',
    lancheTarde: 'Pera',
    jantar: 'Sanduíche de frango'
  },
  {
    day: 12,
    week: 2,
    cafe: 'Aveia com maçã e canela',
    lancheManha: 'Uvas',
    almoco: 'Arroz, feijão, sardinha e salada',
    lancheTarde: 'Queijo',
    jantar: 'Batata recheada com atum'
  },
  {
    day: 13,
    week: 2,
    cafe: 'Pão de queijo caseiro e fruta',
    lancheManha: 'Banana',
    almoco: 'Frango assado, arroz e legumes',
    lancheTarde: 'Pipoca caseira',
    jantar: 'Caldo de abóbora com carne'
  },
  {
    day: 14,
    week: 2,
    cafe: 'Iogurte, mamão e sementes',
    lancheManha: 'Fruta',
    almoco: 'Arroz, feijão, carne e salada',
    lancheTarde: 'Castanhas',
    jantar: 'Refeição com sobras planejadas'
  },

  // SEMANA 3
  {
    day: 15,
    week: 3,
    cafe: 'Ovos, pão e kiwi',
    lancheManha: 'Iogurte',
    almoco: 'Arroz, feijão, frango e cenoura',
    lancheTarde: 'Pera',
    jantar: 'Salada de macarrão com atum'
  },
  {
    day: 16,
    week: 3,
    cafe: 'Mingau de aveia e mamão',
    lancheManha: 'Banana',
    almoco: 'Carne, arroz e vagem',
    lancheTarde: 'Castanhas',
    jantar: 'Omelete com mandioca'
  },
  {
    day: 17,
    week: 3,
    cafe: 'Tapioca com frango',
    lancheManha: 'Laranja',
    almoco: 'Peixe, batata e salada',
    lancheTarde: 'Iogurte',
    jantar: 'Feijão, arroz e ovo'
  },
  {
    day: 18,
    week: 3,
    cafe: 'Pão com queijo e pera',
    lancheManha: 'Uvas',
    almoco: 'Lentilha, arroz e legumes',
    lancheTarde: 'Fruta',
    jantar: 'Wrap de frango e salada'
  },
  {
    day: 19,
    week: 3,
    cafe: 'Cuscuz com ovo',
    lancheManha: 'Mamão',
    almoco: 'Carne moída, macarrão e salada',
    lancheTarde: 'Iogurte',
    jantar: 'Sopa de legumes com carne'
  },
  {
    day: 20,
    week: 3,
    cafe: 'Iogurte com banana e sementes',
    lancheManha: 'Maçã',
    almoco: 'Frango, feijão, arroz e abóbora',
    lancheTarde: 'Pipoca caseira',
    jantar: 'Torrada com ricota e tomate'
  },
  {
    day: 21,
    week: 3,
    cafe: 'Pão integral com pasta de amendoim',
    lancheManha: 'Melão',
    almoco: 'Arroz, peixe e salada',
    lancheTarde: 'Castanhas',
    jantar: 'Salada completa com grão-de-bico'
  },

  // SEMANA 4
  {
    day: 22,
    week: 4,
    cafe: 'Pão integral com ovo e fruta',
    lancheManha: 'Iogurte',
    almoco: 'Arroz, feijão, peixe e salada',
    lancheTarde: 'Castanhas',
    jantar: 'Panqueca de frango'
  },
  {
    day: 23,
    week: 4,
    cafe: 'Aveia com pera',
    lancheManha: 'Banana',
    almoco: 'Frango, batata e legumes',
    lancheTarde: 'Queijo',
    jantar: 'Arroz com lentilha e ovo'
  },
  {
    day: 24,
    week: 4,
    cafe: 'Cuscuz com queijo',
    lancheManha: 'Mamão',
    almoco: 'Carne, arroz e salada',
    lancheTarde: 'Iogurte',
    jantar: 'Sopa de frango'
  },
  {
    day: 25,
    week: 4,
    cafe: 'Tapioca com ovo e tomate',
    lancheManha: 'Uvas',
    almoco: 'Grão-de-bico, arroz e legumes',
    lancheTarde: 'Fruta',
    jantar: 'Sanduíche de atum'
  },
  {
    day: 26,
    week: 4,
    cafe: 'Iogurte com banana',
    lancheManha: 'Maçã',
    almoco: 'Frango, mandioca e couve',
    lancheTarde: 'Castanhas',
    jantar: 'Omelete com salada'
  },
  {
    day: 27,
    week: 4,
    cafe: 'Pão com pasta de amendoim',
    lancheManha: 'Pera',
    almoco: 'Massa com carne e legumes',
    lancheTarde: 'Pipoca caseira',
    jantar: 'Feijão, arroz e ovo'
  },
  {
    day: 28,
    week: 4,
    cafe: 'Cuscuz com frango',
    lancheManha: 'Fruta da estação',
    almoco: 'Marmita de arroz, feijão, carne e legumes',
    lancheTarde: 'Iogurte',
    jantar: 'Salada com batata e sardinha'
  },

  // SEMANA 5
  {
    day: 29,
    week: 5,
    cafe: 'Ovo, pão e mamão',
    lancheManha: 'Banana',
    almoco: 'Arroz, feijão, frango e salada',
    lancheTarde: 'Iogurte',
    jantar: 'Batata com carne desfiada'
  },
  {
    day: 30,
    week: 5,
    cafe: 'Vitamina de fruta com aveia',
    lancheManha: 'Maçã',
    almoco: 'Peixe, arroz e legumes',
    lancheTarde: 'Castanhas',
    jantar: 'Omelete com pão'
  },
  {
    day: 31,
    week: 5,
    cafe: 'Cuscuz com queijo',
    lancheManha: 'Laranja',
    almoco: 'Lentilha, arroz e salada',
    lancheTarde: 'Iogurte',
    jantar: 'Macarrão com frango'
  },
  {
    day: 32,
    week: 5,
    cafe: 'Iogurte com frutas',
    lancheManha: 'Pera',
    almoco: 'Carne cozida, mandioca e couve',
    lancheTarde: 'Fruta',
    jantar: 'Sopa de legumes'
  },
  {
    day: 33,
    week: 5,
    cafe: 'Tapioca com ovo',
    lancheManha: 'Uvas',
    almoco: 'Frango, arroz, feijão e abóbora',
    lancheTarde: 'Queijo',
    jantar: 'Sanduíche de grão-de-bico'
  },
  {
    day: 34,
    week: 5,
    cafe: 'Pão com ricota e tomate',
    lancheManha: 'Mamão',
    almoco: 'Sardinha, batata e salada',
    lancheTarde: 'Iogurte',
    jantar: 'Arroz com ovos e legumes'
  },
  {
    day: 35,
    week: 5,
    cafe: 'Aveia com banana',
    lancheManha: 'Fruta',
    almoco: 'Carne, arroz e feijão',
    lancheTarde: 'Pipoca caseira',
    jantar: 'Salada com frango e milho'
  },

  // SEMANA 6
  {
    day: 36,
    week: 6,
    cafe: 'Aveia com banana e canela',
    lancheManha: 'Iogurte',
    almoco: 'Arroz, feijão, frango e salada',
    lancheTarde: 'Fruta',
    jantar: 'Omelete com legumes'
  },
  {
    day: 37,
    week: 6,
    cafe: 'Pão com ovo e mamão',
    lancheManha: 'Castanhas',
    almoco: 'Peixe, batata e brócolis',
    lancheTarde: 'Iogurte',
    jantar: 'Sopa de lentilha'
  },
  {
    day: 38,
    week: 6,
    cafe: 'Cuscuz com queijo',
    lancheManha: 'Banana',
    almoco: 'Carne, arroz e abóbora',
    lancheTarde: 'Fruta',
    jantar: 'Sanduíche de frango'
  },
  {
    day: 39,
    week: 6,
    cafe: 'Tapioca com frango',
    lancheManha: 'Laranja',
    almoco: 'Grão-de-bico, arroz e salada',
    lancheTarde: 'Iogurte',
    jantar: 'Ovos com mandioca'
  },
  {
    day: 40,
    week: 6,
    cafe: 'Iogurte com aveia e morango',
    lancheManha: 'Maçã',
    almoco: 'Frango, feijão, arroz e couve',
    lancheTarde: 'Castanhas',
    jantar: 'Panqueca de carne'
  },
  {
    day: 41,
    week: 6,
    cafe: 'Pão com ricota e fruta',
    lancheManha: 'Pera',
    almoco: 'Massa com atum e legumes',
    lancheTarde: 'Iogurte',
    jantar: 'Salada completa com ovo'
  },
  {
    day: 42,
    week: 6,
    cafe: 'Café da manhã escolhido',
    lancheManha: 'Fruta',
    almoco: 'Refeição especial equilibrada',
    lancheTarde: 'Sobremesa escolhida',
    jantar: 'Jantar conforme a fome'
  }
];

export const SHOPPING_LIST_WEEK1: ShoppingCategory[] = [
  {
    id: 'proteinas',
    name: 'Proteínas',
    items: [
      'Ovos',
      'Peito ou sobrecoxa de frango',
      'Carne moída',
      'Peixe',
      'Atum ou sardinha',
      'Iogurte natural',
      'Queijo',
      'Feijão',
      'Lentilha',
      'Grão-de-bico'
    ]
  },
  {
    id: 'carboidratos',
    name: 'Carboidratos',
    items: [
      'Arroz',
      'Aveia',
      'Pão',
      'Cuscuz',
      'Tapioca',
      'Batata',
      'Mandioca',
      'Macarrão'
    ]
  },
  {
    id: 'vegetais',
    name: 'Vegetais',
    items: [
      'Alface',
      'Tomate',
      'Cenoura',
      'Couve',
      'Abóbora',
      'Brócolis',
      'Beterraba',
      'Abobrinha',
      'Cebola',
      'Alho'
    ]
  },
  {
    id: 'frutas',
    name: 'Frutas',
    items: [
      'Banana',
      'Maçã',
      'Mamão',
      'Laranja',
      'Pera',
      'Melão',
      'Uva',
      'Morango'
    ]
  },
  {
    id: 'temperos',
    name: 'Temperos e complementos',
    items: [
      'Limão',
      'Cheiro-verde',
      'Páprica',
      'Orégano',
      'Cúrcuma',
      'Azeite',
      'Castanhas',
      'Sementes'
    ]
  }
];

export const RECIPES_DATA: Recipe[] = [
  {
    id: 'omelete-basico',
    title: 'Omelete básico',
    time: '10 min',
    category: 'Rápido & Proteico',
    ingredients: [
      '2 ovos frescos',
      'Tomate picadinho',
      'Cebola a gosto',
      'Cheiro-verde picado',
      'Pequena quantidade de azeite ou óleo para untar'
    ],
    instructions: 'Bata os ovos vigorosamente com um garfo, acrescente os vegetais picados e uma pitada de sal. Cozinhe em frigideira antiaderente levemente aquecida em fogo baixo até dourar dos dois lados.'
  },
  {
    id: 'salada-grao-de-bico',
    title: 'Salada de grão-de-bico',
    time: '15 min',
    category: 'Prática & Marmita',
    ingredients: [
      'Grão-de-bico cozido (1 xícara)',
      'Tomate cortado em cubos',
      'Cenoura ralada fresca',
      'Cebola roxa bem fatiada',
      'Suco de 1/2 limão',
      'Cheiro-verde picadinho e azeite'
    ],
    instructions: 'Em uma tigela, misture o grão-de-bico escorrido com o tomate, cenoura e cebola. Tempere com limão, azeite e cheiro-verde próximo do momento de consumir para manter o frescor crocante.'
  },
  {
    id: 'creme-abobora-frango',
    title: 'Creme de abóbora com frango',
    time: '25 min',
    category: 'Conforto & Calorias Moderadas',
    ingredients: [
      'Abóbora (japonesa ou cabotiá)',
      'Frango cozido e desfiado',
      'Cebola picada',
      'Alho amassado',
      'Água ou caldo caseiro',
      'Temperos a gosto (sal, cúrcuma, cheiro-verde)'
    ],
    instructions: 'Cozinhe os pedaços de abóbora até ficarem bem macios. Bata no liquidificador ou amasse com um garfo. Refogue a cebola e alho, adicione o purê de abóbora e o frango desfiado. Misture bem e ajuste a consistência e temperos.'
  },
  {
    id: 'sanduiche-atum',
    title: 'Sanduíche de atum',
    time: '5 min',
    category: 'Emergência & Sem Fogão',
    ingredients: [
      '2 fatias de pão de sua preferência',
      '1 lata de atum escorrido (em água ou azeite)',
      '2 colheres de iogurte natural ou ricota amassada',
      'Cenoura ralada fina',
      'Folhas de alface ou rúcula'
    ],
    instructions: 'Misture o atum com o iogurte natural ou a ricota até formar uma pasta úmida. Acrescente cenoura ralada. Espalhe sobre a fatia de pão, adicione as folhas verdes e feche o sanduíche.'
  }
];

export const EMERGENCY_MEALS = [
  {
    number: '01',
    title: 'Pão, ovos mexidos e tomate',
    description: 'Pronto em 5 minutos. Fornece proteína de alto valor biológico e carboidrato rápido.'
  },
  {
    number: '02',
    title: 'Iogurte natural, aveia, banana e castanhas',
    description: 'Zero panela. Equilíbrio de proteínas, fibras solúveis, potássio e gorduras boas.'
  },
  {
    number: '03',
    title: 'Arroz pronto, feijão congelado, sardinha e salada',
    description: 'Utilize sua reserva do freezer. Ômega-3 da sardinha com a clássica combinação brasileira.'
  }
];

export const PORTIONS_GUIDE = [
  {
    group: 'Proteína',
    visual: 'Tamanho da palma da mão',
    tip: 'Frango, carne bovina, peixe, ovos ou tofu.'
  },
  {
    group: 'Carboidrato',
    visual: 'Tamanho de um punho fechado',
    tip: 'Arroz, batata, cuscuz, mandioca, aveia ou macarrão.'
  },
  {
    group: 'Verduras e legumes',
    visual: 'O quanto couber confortavelmente no prato',
    tip: 'Metade do prato preenchida com folhas, tomate, brócolis, cenoura, etc.'
  },
  {
    group: 'Gorduras',
    visual: 'Pequena quantidade para preparar ou temperar',
    tip: 'Azeite, óleo, castanhas ou sementes com moderação.'
  },
  {
    group: 'Frutas',
    visual: 'Uma unidade ou porção compatível com a mão',
    tip: 'Consuma com casca quando possível para maior aporte de fibras.'
  }
];

export const FLEXIBLE_SCHEDULE = [
  {
    meal: 'Café da manhã',
    window: '6h – 9h',
    note: 'Faça quando sentir necessidade ao acordar.'
  },
  {
    meal: 'Lanche da manhã',
    window: '9h – 11h',
    note: 'Opcional. Consuma se houver fome real entre refeições.'
  },
  {
    meal: 'Almoço',
    window: '11h30 – 14h30',
    note: 'Priorize refeição completa: proteína + carbo + vegetais.'
  },
  {
    meal: 'Lanche da tarde',
    window: '15h – 18h',
    note: 'Muito útil em dias longos para não chegar com compulsão ao jantar.'
  },
  {
    meal: 'Jantar',
    window: '18h – 21h',
    note: 'Adapte ao seu horário e ritmo de descanso.'
  },
  {
    meal: 'Ceia',
    window: 'Se necessário',
    note: 'Escolha algo simples e leve caso sinta fome antes de dormir.'
  }
];

export const MEAL_PREP_STEPS = [
  {
    block: 'Bloco 1: Organização (30 min)',
    tasks: [
      'Separe todos os ingredientes e utensílios na bancada.',
      'Lave bem as mãos e higienize a pia e superfícies de corte.',
      'Coloque feijão ou lentilha na pressão e arroz no fogo.',
      'Corte e fatie os legumes da semana.',
      'Tempere as proteínas (frango em cubos/filé, carne ou peixe).',
      'Organize potes de vidro ou livre de BPA e etiquetas de identificação.'
    ]
  },
  {
    block: 'Bloco 2: Cocção Simultânea (50 min)',
    tasks: [
      'Asse ou grelhe as porções de frango, carne ou peixe.',
      'Cozinhe batata, mandioca ou legumes no vapor.',
      'Finalize o arroz ou outro carboidrato base.',
      'Higienize folhas verdes, seque e guarde com papel toalha.',
      'Cozinhe ovos em água fervente (8–10 min) para lanches rápidos.',
      'Prepare uma sopa reconfortante ou molho simples se desejar.'
    ]
  },
  {
    block: 'Bloco 3: Montagem & Armazenamento (40 min)',
    tasks: [
      'Distribua as bases de carboidrato nos potes sem compactar demais.',
      'Adicione a leguminosa e a porção de proteína correspondente.',
      'Complete com os legumes cozidos.',
      'Mantenha saladas frescas e molhos em potes separados para não murchar.',
      'Escreva a data de preparo nos recipientes.',
      'Refrigere o que será consumido em até 3–4 dias; congele o restante.'
    ]
  }
];

export const WEEKLY_HABITS = [
  {
    week: 1,
    title: 'Semana 1 — Organização',
    items: [
      'Planejei as refeições',
      'Fiz uma compra organizada',
      'Comi frutas',
      'Incluí vegetais',
      'Preparei uma proteína',
      'Bebi água ao longo do dia',
      'Fiz uma refeição sem tela',
      'Retomei após um imprevisto'
    ]
  },
  {
    week: 2,
    title: 'Semana 2 — Praticidade',
    items: [
      'Deixei opções rápidas disponíveis',
      'Evitei ficar muitas horas sem comer',
      'Fiz substituições quando necessário',
      'Comi sentado',
      'Observei minha fome',
      'Preparei alguma marmita',
      'Fiz algum movimento',
      'Dormi em horário razoável'
    ]
  },
  {
    week: 3,
    title: 'Semana 3 — Mais variedade',
    items: [
      'Experimentei um alimento diferente',
      'Usei uma fruta da estação',
      'Variei os vegetais',
      'Usei temperos naturais',
      'Reduzi distrações durante uma refeição',
      'Organizei a próxima compra',
      'Evitei compensações',
      'Reconheci uma vitória'
    ]
  },
  {
    week: 4,
    title: 'Semana 4 — Marmitas e refeições fora',
    items: [
      'Levei uma refeição de casa',
      'Conferi os alimentos disponíveis',
      'Aproveitei sobras com segurança',
      'Fiz uma refeição social sem culpa',
      'Retomei minha rotina após um dia diferente',
      'Planejei refeições rápidas',
      'Fiz uma atividade prazerosa',
      'Pedi ajuda quando precisei'
    ]
  },
  {
    week: 5,
    title: 'Semana 5 — Energia e movimento',
    items: [
      'Caminhei ou fiz outra atividade',
      'Fiz uma refeição após o movimento',
      'Incluí proteína nas refeições principais',
      'Bebi água durante o dia',
      'Respeitei meu descanso',
      'Preparei uma marmita',
      'Comi uma sobremesa sem culpa',
      'Observei minha energia'
    ]
  },
  {
    week: 6,
    title: 'Semana 6 — Consolidação',
    items: [
      'Escolhi meus hábitos favoritos',
      'Identifiquei o que não funcionou',
      'Ajustei o cardápio à minha realidade',
      'Fiz uma lista de compras sustentável',
      'Organizei a próxima semana',
      'Reconheci meu progresso',
      'Defini três hábitos para continuar',
      'Comemorei sem usar comida como punição ou recompensa'
    ]
  }
];

export const HEALTH_DISCLAIMER_TEXT = {
  title: 'Aviso importante',
  paragraphs: [
    'Este material tem finalidade educativa e não substitui consulta, diagnóstico ou tratamento realizado por médico, nutricionista, psicólogo ou outro profissional habilitado.',
    'As sugestões são gerais e podem não ser adequadas para todas as pessoas. Gestantes, lactantes, adolescentes, pessoas idosas, pessoas com diabetes, hipertensão, doenças renais, doenças gastrointestinais, transtornos alimentares, alergias ou outras condições de saúde devem buscar orientação individualizada antes de iniciar mudanças alimentares ou de atividade física.',
    'Não existe resultado igual para todas as pessoas. O objetivo deste programa é ajudar você a desenvolver hábitos mais consistentes, e não estabelecer uma meta obrigatória de peso.',
    'Interrompa a atividade e procure atendimento se sentir dor no peito, falta de ar intensa, desmaio, confusão, palpitações persistentes ou qualquer sintoma importante. Sinta-se à vontade para ajustar o ritmo conforme necessário para sua segurança.'
  ]
};

export const HYDRATION_CHECKLIST = [
  'Bebi água pela manhã',
  'Levei água para o trabalho ou estudo',
  'Bebi água durante o almoço',
  'Bebi água durante a tarde',
  'Bebi água após atividade física',
  'Observei minha sede sem exagerar'
];
