/**
 * Todo o texto da página fica aqui.
 * Fonte: "Leve21 — Hábitos reais. Rotina possível." (e-book, 33 p.) e
 * "Leve21 — 21 dias no meu ritmo" (planner, 28 p.), edição de outubro de 2026.
 * O título e o subtítulo do hero seguem o briefing.
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

export const marquee = [
  "Alimentação equilibrada",
  "Movimento",
  "Organização",
  "Fontes oficiais",
  "Sem dietas milagrosas",
  "21 dias no seu ritmo",
];

export const challenges = {
  kicker: "Talvez você se reconheça",
  title: "Quando a rotina pesa, o difícil nem sempre é saber o que fazer.",
  titleAccent: "É conseguir começar.",
  hint: "Toque no que mais parece com você",
  items: [
    {
      label: "Não sobra tempo",
      answer:
        "Preparações simples cabem melhor em dias cheios do que receitas longas. O Leve21 propõe começar pela menor ação útil: algo pequeno e fácil de repetir.",
    },
    {
      label: "Começo e paro no meio",
      answer:
        "Pular um registro não anula o cuidado. O programa traz um plano B para os dias corridos e reserva um dia inteiro para praticar a retomada depois de um imprevisto.",
    },
    {
      label: "Me cobro demais",
      answer:
        "No planner não existe pontuação, meta de peso ou obrigação de preencher tudo. O checklist é um lembrete, não um teste de desempenho.",
    },
    {
      label: "Cansei de dietas",
      answer:
        "O Leve21 não é dieta: não tem cardápio, metas de calorias nem promessa de emagrecimento. É educação alimentar com base no Guia Alimentar brasileiro.",
    },
  ],
};

export const pillars = [
  {
    id: "alimentacao",
    n: "01",
    name: "Alimentação",
    lead: "Comida de verdade como base.",
    body: "Alimentos in natura e preparações caseiras no centro, arroz e feijão incluídos, sem demonizar carboidratos e respeitando seu orçamento e sua cultura alimentar.",
  },
  {
    id: "movimento",
    n: "02",
    name: "Movimento",
    lead: "Todo movimento possível conta.",
    body: "Caminhar, dançar, se deslocar a pé ou fazer tarefas do dia: comece pelo que é confortável e aumente aos poucos, no seu ritmo.",
  },
  {
    id: "organizacao",
    n: "03",
    name: "Organização",
    lead: "O plano B vale tanto quanto o plano A.",
    body: "Lista de compras por categorias, uma cozinha possível, pausas e descanso. Menos esforço no dia a dia costuma ajudar mais do que regras rígidas.",
  },
] as const;

export const products = [
  {
    id: "ebook",
    tab: "E-book",
    title: "Hábitos reais. Rotina possível.",
    body: "Guia de educação alimentar com comida de verdade, compras no orçamento, cozinha prática, movimento, descanso e o roteiro dos 21 dias, com referências oficiais em cada capítulo.",
    points: ["33 páginas em PDF", "8 preparações simples e caseiras", "Fontes do Ministério da Saúde e da OMS"],
  },
  {
    id: "planner",
    tab: "Planner",
    title: "21 dias no meu ritmo.",
    body: "Seu caderno de prática: uma página por dia com a sugestão do dia, sua intenção, três cuidados possíveis e espaço para refletir sobre o que ajudou.",
    points: ["28 páginas em PDF", "Uma página para cada um dos 21 dias", "Revisão semanal e plano para o próximo mês"],
  },
] as const;

export const weeks = [
  {
    n: 1,
    days: [1, 7],
    theme: "Observar",
    reminder: "Observe antes de mudar.",
    text: "Conheça suas refeições, dificuldades, preferências e oportunidades de movimento. Sem julgamento: observar serve para planejar.",
  },
  {
    n: 2,
    days: [8, 14],
    theme: "Facilitar",
    reminder: "Simplifique em vez de exigir mais.",
    text: "Ações que reduzem o esforço do dia a dia: um plano B, um cantinho organizado, uma pausa possível.",
  },
  {
    n: 3,
    days: [15, 21],
    theme: "Sustentar",
    reminder: "Leve consigo apenas o que couber na vida real.",
    text: "Revise o que funcionou, dispense regras que geram sofrimento e escolha o que levar para o próximo mês.",
  },
] as const;

/** Sugestão de cada dia, como aparece no planner. */
export const days: { title: string; text: string }[] = [
  { title: "Olhe para sua rotina", text: "Observe dois momentos do dia em que você se sente mais disposto ou com mais tempo." },
  { title: "Nomeie um obstáculo", text: "Identifique o que mais dificulta organizar uma refeição. Sem culpa." },
  { title: "Conheça a cozinha", text: "Confira alimentos disponíveis e o que pode ser aproveitado antes das compras." },
  { title: "Uma lista possível", text: "Anote alguns alimentos que você realmente gosta e consegue comprar." },
  { title: "Preparação simples", text: "Pense em uma refeição caseira fácil de repetir." },
  { title: "Um movimento agradável", text: "Observe uma oportunidade de se movimentar dentro de suas possibilidades." },
  { title: "Primeira revisão", text: "Anote algo que funcionou nos últimos dias e algo que deseja simplificar." },
  { title: "Tenha um plano B", text: "Escolha uma opção prática para os dias mais corridos." },
  { title: "Organize um cantinho", text: "Ajuste um pequeno espaço para facilitar uma escolha cotidiana." },
  { title: "Mova-se no seu ritmo", text: "Reserve, se possível, um momento para um movimento confortável." },
  { title: "Refeição com presença", text: "Observe o ambiente e um aspecto agradável de uma refeição." },
  { title: "Uma pausa possível", text: "Experimente reduzir uma distração e descansar alguns minutos." },
  { title: "Ajuste sem cobrança", text: "Reveja um hábito que ficou difícil. Como ele poderia ficar mais simples?" },
  { title: "Segunda revisão", text: "Identifique a mudança mais viável desta semana." },
  { title: "Compras reaproveitáveis", text: "Monte uma lista curta que possa servir também na próxima semana." },
  { title: "Variedade de sabores", text: "Experimente uma combinação de alimentos que você aprecia." },
  { title: "Movimento com prazer", text: "Associe uma atividade confortável a música, companhia ou natureza, se possível." },
  { title: "Vida social faz parte", text: "Pense em como aproveitar encontros sem transformar comida em culpa." },
  { title: "Pratique uma retomada", text: "Descreva como voltaria à rotina depois de um imprevisto." },
  { title: "Reconheça o que mudou", text: "Anote três aprendizagens práticas, mesmo que pequenas." },
  { title: "Planeje o próximo mês", text: "Escolha dois hábitos realistas que deseja continuar." },
];

/** Páginas reais exibidas na prévia (imagens em /public/previews). */
export const previewImages: { src: string; alt: string }[] = [
  { src: "/previews/ebook-capa.jpg", alt: "Capa do e-book" },
  { src: "/previews/ebook-percurso.jpg", alt: "E-book · Mapa do percurso" },
  { src: "/previews/ebook-comida.jpg", alt: "E-book · Comida de verdade como base" },
  { src: "/previews/planner-capa.jpg", alt: "Capa do planner" },
  { src: "/previews/planner-dia01.jpg", alt: "Planner · Dia 01" },
];

export const offer = {
  kicker: "Comece hoje",
  title: "Leve21 completo",
  includes: [
    "E-book Leve21 · 33 páginas",
    "Planner de 21 dias · 28 páginas",
    "Acesso pela área de membros",
  ],
};

export const faq = [
  {
    q: "Como recebo o material?",
    a: "Depois que o pagamento é confirmado pela Cakto, você recebe por e-mail o acesso à área de membros, onde ficam o e-book e o planner em PDF.",
  },
  {
    q: "É uma dieta? Promete emagrecimento?",
    a: "Não. O Leve21 é educação alimentar, não prescrição: não traz cardápio, metas de calorias nem promessa de perda de peso. As refeições e receitas do guia são exemplos ilustrativos.",
  },
  {
    q: "De onde vêm as informações?",
    a: "Do Guia Alimentar para a População Brasileira e do Guia de Atividade Física do Ministério da Saúde, das recomendações da OMS e de outros documentos oficiais, citados ao pé de cada capítulo.",
  },
  {
    q: "Para quem é o Leve21?",
    a: "Para adultos que querem organizar alimentação, movimento e rotina com informação confiável. Em caso de gestação, doenças crônicas, uso de medicamentos que afetam o peso ou histórico de transtorno alimentar, procure orientação profissional antes de mudanças importantes.",
  },
  {
    q: "Preciso seguir os 21 dias seguidos?",
    a: "Não precisa ser perfeito. Cada dia traz uma sugestão simples que você pode adaptar, trocar ou pular. Se um dia não der, é só retomar.",
  },
  {
    q: "O pagamento é seguro?",
    a: "Sim. A compra acontece no checkout oficial da Cakto. Este site não coleta nem armazena dados de pagamento.",
  },
];
