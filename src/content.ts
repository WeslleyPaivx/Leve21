/**
 * TODO o texto da página fica aqui, para revisão fácil.
 *
 * ⚠️ REVISAR ANTES DO LANÇAMENTO (ver PENDENCIAS.md):
 * Os temas das semanas, as respostas da seção "desafios" e a prévia foram escritos a partir
 * do briefing (organização, autocuidado, pequenas mudanças), sem acesso ao e-book e ao planner.
 * Ajuste tudo para refletir exatamente o conteúdo real dos materiais.
 */

export const hero = {
  eyebrow: "E-book + planner de 21 dias",
  titleLines: [
    [{ t: "Uma" }, { t: "rotina" }, { t: "mais" }, { t: "leve", accent: true }],
    [{ t: "começa" }, { t: "com" }, { t: "hábitos" }],
    [{ t: "possíveis.", accent: true }],
  ],
  subtitle:
    "21 dias de organização, autocuidado e pequenas mudanças para construir hábitos mais sustentáveis.",
  ctaPrimary: "Conhecer minha jornada",
  ctaSecondary: "Explorar o Leve21",
};

export const marquee = ["Organização", "Autocuidado", "Pequenas mudanças", "21 dias", "Hábitos possíveis"];

export const challenges = {
  kicker: "Talvez você se reconheça",
  title: "Quando a rotina pesa, o difícil nem sempre é saber o que fazer.",
  titleAccent: "É conseguir começar.",
  hint: "Toque no que mais parece com você",
  items: [
    {
      label: "Não sobra tempo pra mim",
      answer:
        "O Leve21 parte de passos pequenos, pensados para caber em dias cheios — sem exigir horas livres que você não tem.",
    },
    {
      label: "Começo e paro no meio",
      answer:
        "Em vez de mudar tudo de uma vez, a proposta é avançar um pouco por dia, com um planner para acompanhar o caminho.",
    },
    {
      label: "Me cobro demais",
      answer:
        "Autocuidado é um dos pilares do programa: constância com gentileza, não perfeição.",
    },
    {
      label: "Tudo parece urgente",
      answer:
        "A primeira semana começa pela organização, para ajudar a enxergar o dia com mais clareza antes de acrescentar qualquer coisa.",
    },
  ],
};

export const pillars = [
  {
    id: "organizacao",
    n: "01",
    name: "Organização",
    lead: "Clareza antes de esforço.",
    body: "Olhar para a própria rotina, entender onde o tempo vai e abrir espaço para o que importa — com o planner como apoio diário.",
  },
  {
    id: "autocuidado",
    n: "02",
    name: "Autocuidado",
    lead: "Cuidar de si também é rotina.",
    body: "Pausas, atenção ao corpo e momentos para você entram no dia como compromisso possível, não como luxo.",
  },
  {
    id: "mudancas",
    n: "03",
    name: "Pequenas mudanças",
    lead: "O que se repete, sustenta.",
    body: "Ajustes simples e consistentes, um de cada vez, para que os novos hábitos continuem depois dos 21 dias.",
  },
] as const;

export const products = [
  {
    id: "ebook",
    tab: "E-book",
    title: "O guia Leve21",
    body: "O conteúdo educativo do programa: os três pilares explicados com calma e o caminho das três semanas.",
    points: ["Formato digital", "Leitura no celular ou computador", "Os 3 pilares do programa"],
  },
  {
    id: "planner",
    tab: "Planner",
    title: "Planner de 21 dias",
    body: "O companheiro do dia a dia: um espaço para registrar, acompanhar e perceber o próprio progresso ao longo da jornada.",
    points: ["Formato digital", "Um dia de cada vez", "Acompanha as 3 semanas"],
  },
] as const;

export const weeks = [
  {
    n: 1,
    days: [1, 7],
    theme: "Organizar",
    pillar: "Organização",
    text: "Primeiro, clareza. Entender a rotina como ela é e preparar o terreno para o que vem.",
  },
  {
    n: 2,
    days: [8, 14],
    theme: "Cuidar",
    pillar: "Autocuidado",
    text: "Com o dia mais organizado, há espaço para pausas e atenção a você.",
  },
  {
    n: 3,
    days: [15, 21],
    theme: "Sustentar",
    pillar: "Pequenas mudanças",
    text: "Consolidar o que funcionou e levar os hábitos para além dos 21 dias.",
  },
] as const;

/**
 * Prévia: coloque imagens reais das páginas em /public/previews e liste aqui
 * (ex.: { src: "/previews/ebook-01.webp", alt: "Página de abertura do e-book" }).
 * Enquanto a lista estiver vazia, a seção mostra composições ilustrativas, identificadas como tal.
 */
export const previewImages: { src: string; alt: string }[] = [];

export const offer = {
  kicker: "Comece hoje",
  title: "Leve21 completo",
  includes: [
    "E-book Leve21",
    "Planner de 21 dias",
    "Acesso pela área de membros",
  ],
};

export const faq = [
  {
    q: "Como recebo o material?",
    a: "Depois que o pagamento é confirmado pela Cakto, você recebe por e-mail o acesso à área de membros, onde ficam o e-book e o planner.",
  },
  {
    q: "É um produto físico?",
    a: "Não. O Leve21 é 100% digital: você acessa pelo celular ou computador, sem frete.",
  },
  {
    q: "O Leve21 é uma dieta ou promete perda de peso?",
    a: "Não. É um conteúdo educativo sobre organização, autocuidado e hábitos. Não promete resultados específicos e não substitui o acompanhamento de médico, nutricionista ou outro profissional de saúde.",
  },
  {
    q: "Preciso seguir os 21 dias seguidos?",
    a: "A jornada foi pensada em sequência, mas o ritmo é seu. Se um dia não der, é só retomar de onde parou.",
  },
  {
    q: "O pagamento é seguro?",
    a: "Sim. A compra acontece no checkout oficial da Cakto. Este site não coleta nem armazena dados de pagamento.",
  },
];
