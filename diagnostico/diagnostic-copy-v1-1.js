(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.RotaZeroZeroDiagnosticCopyV11 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const QUESTIONS = Object.freeze({
    C0: {
      eyebrow: 'Antes de começar',
      title: 'Você está respondendo por quem?',
      helper: 'Isso só ajusta a linguagem do diagnóstico. Não muda o resultado.',
      options: [
        ['SELF', 'Por mim', 'Quero identificar meu próprio ponto de partida.'],
        ['OTHER', 'Por outra pessoa', 'Estou acompanhando alguém que está começando.'],
      ],
    },
    Q1: {
      eyebrow: 'Experiência prática',
      title: 'Qual destas frases descreve melhor o que já foi feito com programação?',
      helper: 'Considere o que foi realmente criado ou modificado, não apenas cursos ou vídeos assistidos.',
      options: [
        ['E0_NONE', 'Ainda não criou nada com programação.', ''],
        ['E1_FOLLOWED', 'Já assistiu a aulas ou seguiu exemplos passo a passo.', ''],
        ['E2_MODIFIED_VISUAL', 'Já modificou um projeto com blocos ou ferramenta visual.', ''],
        ['E3_WRITTEN_SMALL', 'Já escreveu ou modificou pequenos trechos de código textual.', ''],
        ['E4_OWN_PROJECT', 'Já concluiu um pequeno projeto próprio, mesmo simples ou imperfeito.', ''],
      ],
    },
    Q2: {
      eyebrow: 'Clareza do projeto',
      title: 'Hoje existe alguma coisa que gostaria de criar?',
      helper: 'Não precisa ser uma ideia grande. Uma versão pequena já conta.',
      options: [
        ['P0_NONE', 'Ainda não sabe o que gostaria de criar.', ''],
        ['P1_AREA', 'Sabe a área que interessa, mas ainda não tem uma ideia concreta.', ''],
        ['P2_IDEA', 'Tem uma ideia concreta, mas ainda não sabe reduzi-la.', ''],
        ['P3_MINIMUM', 'Consegue explicar uma versão pequena e dizer o que ela precisa fazer.', ''],
      ],
    },
    Q3: {
      eyebrow: 'Estrutura da ideia',
      title: 'Quando pensa em uma ideia, até onde consegue organizá-la?',
      helper: 'Pense em partes, passos, regras e consequências.',
      options: [
        ['S0_VAGUE', 'Ainda é difícil separar a ideia em partes.', ''],
        ['S1_PARTS_HELP', 'Consegue separar algumas partes com ajuda.', ''],
        ['S2_STEPS_RULES', 'Consegue descrever passos, regras ou decisões principais.', ''],
        ['S3_CONSEQUENCES', 'Também consegue prever o que uma mudança de regra afetaria.', ''],
      ],
    },
    Q4: {
      eyebrow: 'Modificação e autoria',
      title: 'Quando segue um exemplo ou tutorial e quer mudar alguma coisa, o que costuma acontecer?',
      helper: 'A pergunta é sobre o que acontece depois de sair do passo a passo.',
      options: [
        ['M0_COPY_ONLY', 'Precisa continuar seguindo os passos para não se perder.', ''],
        ['M1_SMALL_HELP', 'Consegue fazer uma pequena mudança com alguma ajuda.', ''],
        ['M2_SMALL_INDEPENDENT', 'Consegue fazer uma pequena mudança sozinho e testar o efeito.', ''],
        ['M3_TRANSFER', 'Consegue adaptar uma ideia aprendida para outra situação ou projeto.', ''],
      ],
    },
    Q5: {
      eyebrow: 'Resposta ao erro',
      title: 'Quando o resultado não é o esperado, qual situação mais se aproxima do que acontece?',
      helper: 'Não existe resposta “boa” ou “ruim”. O objetivo é localizar o próximo passo.',
      options: [
        ['D0_STOP', 'Para ou espera alguém dizer o que fazer.', ''],
        ['D1_TRIAL', 'Tenta mudanças até alguma funcionar, sem hipótese muito clara.', ''],
        ['D2_COMPARE', 'Compara o esperado com o resultado e testa uma mudança de cada vez.', ''],
        ['D3_HYPOTHESIS_TEST', 'Formula uma hipótese sobre a causa e faz um teste específico para confirmá-la ou descartá-la.', ''],
      ],
    },
    Q6: {
      eyebrow: 'Forma de criação',
      title: 'Qual destas formas de criação já parece mais confortável hoje?',
      helper: 'Escolha a opção que melhor representa a prática atual.',
      options: [
        ['R0_NONE', 'Ainda nenhuma.', ''],
        ['R1_VISUAL', 'Blocos, fluxos ou ferramentas visuais.', ''],
        ['R2_READ_MODIFY_TEXT', 'Ler e modificar pequenos trechos de código escrito.', ''],
        ['R3_WRITE_TEXT', 'Escrever um pequeno programa e explicar o que as partes fazem.', ''],
      ],
    },
    Q7: {
      eyebrow: 'Interesse atual',
      title: 'O que mais gostaria de criar agora?',
      helper: 'Seu interesse ajuda a definir a direção quando o projeto já está suficientemente claro. Ele não muda sozinho seu ponto de partida.',
      options: [
        ['I_WEB', 'Um site ou página na web.', ''],
        ['I_AUTOMATION', 'Um programa ou automação.', ''],
        ['I_GAMES', 'Um jogo.', ''],
        ['I_APPS', 'Um aplicativo.', ''],
        ['I_AI_DATA', 'Algo com IA ou dados.', ''],
        ['I_UNSURE', 'Ainda não sabe.', ''],
      ],
    },
    TB: {
      eyebrow: 'Só mais uma pergunta',
      title: 'Sem seguir um passo a passo, até onde você consegue fazer uma pequena modificação em algo que já existe?',
      helper: 'Suas respostas sobre experiência e autonomia ficaram em tensão. Esta pergunta esclarece apenas o nível de ajuda necessário para modificar algo.',
      options: [
        ['T0_NOT_YET', 'Ainda não consegue fazer essa modificação sem seguir o passo a passo.', ''],
        ['T1_WITH_HELP', 'Consegue com alguma ajuda.', ''],
        ['T2_YES', 'Consegue sozinho.', ''],
      ],
    },
  });

  const LEARNING_STAGES = Object.freeze({
    '00': {
      title: 'Descobrir',
      body: 'O ponto de partida é aproximar curiosidade e criação. Vale experimentar algo pequeno e observável antes de transformar a escolha de linguagem ou curso na principal decisão.',
    },
    '01': {
      title: 'Pensar',
      body: 'Já existe algum sinal de experiência, ideia ou modificação. O próximo ganho vem de organizar melhor o problema: partes, regras, decisões e resultado esperado.',
    },
    '02': {
      title: 'Criar visualmente',
      body: 'Já há material concreto e algum começo de estruturação. O próximo passo é construir, modificar e testar com resultado visível, sem fazer da sintaxe a primeira barreira.',
    },
    '03': {
      title: 'Escrever lógica',
      body: 'Já há sinais de estrutura, autoria e investigação. O próximo passo é levar essa lógica para instruções escritas e usar erros como pistas durante a construção.',
    },
  });

  const ROUTE_DECISIONS = Object.freeze({
    EXPLORE_FIRST: {
      title: 'Primeiro, transforme o interesse em uma ideia concreta.',
      body: 'Antes de escolher tecnologia, descubra algo pequeno que valha tentar criar. O objetivo agora é sair de um interesse amplo e chegar a uma ideia que possa ser experimentada.',
    },
    REDUCE_PROJECT: {
      title: 'Agora, reduza a ideia à menor versão útil.',
      body: 'A ideia já existe. Antes de escolher a ferramenta, defina a menor versão que ainda seria interessante e o que precisa acontecer para dizer que ela funcionou.',
    },
    STRUCTURE_PROJECT: {
      title: 'Organize a versão pequena antes de escolher a ferramenta.',
      body: 'A versão pequena já existe, mas ainda precisa ficar mais clara em partes, passos ou regras. Estruture o que deve acontecer antes de decidir a tecnologia.',
    },
    SUGGEST_ROUTE: {
      title: 'Já dá para sugerir uma direção para este projeto.',
      body: 'Existe uma versão pequena e já há algum começo de estruturação. A direção abaixo orienta o próximo experimento; ela não é uma certificação de domínio técnico.',
    },
  });

  const INTERESTS = Object.freeze({
    I_WEB: 'sites e web',
    I_AUTOMATION: 'programas e automação',
    I_GAMES: 'jogos',
    I_APPS: 'aplicativos',
    I_AI_DATA: 'IA e dados',
    I_UNSURE: 'ainda não definido',
  });

  const ROUTES = Object.freeze({
    web: 'Web',
    automation: 'Programas e automação',
    games: 'Jogos',
    apps: 'Aplicativos',
    ai_data: 'IA e dados',
    open_exploration: 'Exploração aberta',
  });

  const POSITIVE_REASON_CODES = Object.freeze([
    'HAS_CONCRETE_IDEA', 'CAN_DEFINE_MINIMUM_PROJECT', 'CAN_SPLIT_INTO_PARTS', 'CAN_DESCRIBE_RULES',
    'CAN_PREDICT_CONSEQUENCES', 'CAN_MODIFY_WITH_HELP', 'CAN_MODIFY_INDEPENDENTLY', 'CAN_TRANSFER_IDEA',
    'COMPARES_EXPECTED_RESULT', 'USES_HYPOTHESIS_AND_TEST', 'HAS_VISUAL_EXPERIENCE',
    'HAS_TEXTUAL_EXPERIENCE', 'COMPLETED_SMALL_PROJECT',
  ]);

  const LIMIT_REASON_CODES = Object.freeze([
    'NO_CREATION_EXPERIENCE_YET', 'INTEREST_NOT_CONCRETE_YET', 'PROJECT_NOT_REDUCED_YET',
    'STRUCTURE_STILL_VAGUE', 'DEPENDS_ON_STEP_BY_STEP', 'DEBUGGING_STILL_TRIAL_AND_ERROR',
    'TEXTUAL_LOGIC_NOT_COMFORTABLE_YET',
  ]);

  const REASONS = Object.freeze({
    HAS_CONCRETE_IDEA: 'Já existe uma ideia concreta para trabalhar.',
    CAN_DEFINE_MINIMUM_PROJECT: 'A ideia já foi reduzida a uma versão pequena.',
    CAN_SPLIT_INTO_PARTS: 'Já consegue separar uma ideia em partes.',
    CAN_DESCRIBE_RULES: 'Já consegue descrever passos, regras ou decisões principais.',
    CAN_PREDICT_CONSEQUENCES: 'Já relaciona mudanças de regra a possíveis consequências.',
    CAN_MODIFY_WITH_HELP: 'Pequenas modificações já acontecem com algum apoio.',
    CAN_MODIFY_INDEPENDENTLY: 'Já consegue modificar algo pequeno e testar o efeito sem depender do passo a passo.',
    CAN_TRANSFER_IDEA: 'Já consegue adaptar uma ideia aprendida para outra situação.',
    COMPARES_EXPECTED_RESULT: 'Diante de um erro, já compara o esperado com o que aconteceu.',
    USES_HYPOTHESIS_AND_TEST: 'Diante de um erro, já formula uma hipótese e testa uma causa específica.',
    HAS_VISUAL_EXPERIENCE: 'Já existe experiência prática com blocos ou ferramentas visuais.',
    HAS_TEXTUAL_EXPERIENCE: 'Já existe experiência prática com código escrito.',
    COMPLETED_SMALL_PROJECT: 'Um pequeno projeto próprio já foi concluído.',
    NO_CREATION_EXPERIENCE_YET: 'Ainda falta uma primeira experiência concreta de criação.',
    INTEREST_NOT_CONCRETE_YET: 'O interesse ainda não virou uma ideia concreta de projeto.',
    PROJECT_NOT_REDUCED_YET: 'A ideia ainda precisa ser reduzida a uma primeira versão pequena.',
    STRUCTURE_STILL_VAGUE: 'Ainda vale organizar melhor as partes, regras ou passos da ideia.',
    DEPENDS_ON_STEP_BY_STEP: 'O passo a passo ainda é importante para conseguir avançar.',
    DEBUGGING_STILL_TRIAL_AND_ERROR: 'A depuração ainda acontece mais por tentativa do que por hipótese.',
    TEXTUAL_LOGIC_NOT_COMFORTABLE_YET: 'Código escrito ainda não é uma forma confortável de criação.',
  });

  function getQuestion(key) {
    return QUESTIONS[key] || null;
  }

  function getResultCopy(result) {
    const stage = LEARNING_STAGES[result.learningStage];
    const decision = ROUTE_DECISIONS[result.routeDecision];
    if (!stage || !decision) throw new Error('Resultado V1.1 inválido para copy pública.');

    const heading = result.context === 'OTHER'
      ? `O ponto de partida provável é ${result.learningStage} — ${stage.title}.`
      : `Seu ponto de partida provável é ${result.learningStage} — ${stage.title}.`;

    let direction;
    if (result.routeDecision === 'SUGGEST_ROUTE') {
      direction = result.routeSuggestion === 'open_exploration'
        ? 'Direção sugerida: exploração aberta. Ainda não escolher uma categoria é válido; compare pequenas formas de construir a versão definida antes de se especializar.'
        : `Direção sugerida: ${ROUTES[result.routeSuggestion]}.`;
    } else {
      direction = `Interesse atual: ${INTERESTS[result.interestTag]}. Ele pode orientar exemplos enquanto o projeto avança para a próxima decisão.`;
    }

    const positive = result.reasonCodes.filter((code) => POSITIVE_REASON_CODES.includes(code)).slice(0, 2);
    const limits = result.reasonCodes.filter((code) => LIMIT_REASON_CODES.includes(code)).slice(0, 1);
    const reasons = [...positive, ...limits].map((code) => ({
      code,
      text: REASONS[code],
      kind: LIMIT_REASON_CODES.includes(code) ? 'limit' : 'positive',
    }));

    let confidenceNote = '';
    if (result.confidence === 'MEDIUM') {
      confidenceNote = result.tiebreakerUsed
        ? 'A pergunta extra foi usada apenas para esclarecer o nível de autonomia na modificação. O resultado continua sendo uma orientação, não uma prova de competência.'
        : 'Algumas respostas descrevem experiências diferentes entre si. Use o resultado como orientação e confirme-o observando a próxima tentativa.';
    }

    return Object.freeze({
      heading,
      stageBody: stage.body,
      decisionTitle: decision.title,
      decisionBody: decision.body,
      direction,
      reasons,
      confidenceNote,
    });
  }

  return Object.freeze({
    QUESTIONS,
    LEARNING_STAGES,
    ROUTE_DECISIONS,
    INTERESTS,
    ROUTES,
    REASONS,
    getQuestion,
    getResultCopy,
  });
});
