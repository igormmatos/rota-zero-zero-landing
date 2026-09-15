(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.RotaZeroZeroDiagnosticV11 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const ALGORITHM_VERSION = 'R00-DIAG-1.1.0';

  const LEARNING_STAGE_LABELS = Object.freeze({
    '00': 'Descobrir',
    '01': 'Pensar',
    '02': 'Criar visualmente',
    '03': 'Escrever lógica',
  });

  const ROUTES = Object.freeze({
    I_WEB: 'web',
    I_AUTOMATION: 'automation',
    I_GAMES: 'games',
    I_APPS: 'apps',
    I_AI_DATA: 'ai_data',
    I_UNSURE: 'open_exploration',
  });

  const ROUTE_DECISIONS = Object.freeze([
    'EXPLORE_FIRST',
    'REDUCE_PROJECT',
    'STRUCTURE_PROJECT',
    'SUGGEST_ROUTE',
  ]);

  const ORDERS = Object.freeze({
    Q1: ['E0_NONE', 'E1_FOLLOWED', 'E2_MODIFIED_VISUAL', 'E3_WRITTEN_SMALL', 'E4_OWN_PROJECT'],
    Q2: ['P0_NONE', 'P1_AREA', 'P2_IDEA', 'P3_MINIMUM'],
    Q3: ['S0_VAGUE', 'S1_PARTS_HELP', 'S2_STEPS_RULES', 'S3_CONSEQUENCES'],
    Q4: ['M0_COPY_ONLY', 'M1_SMALL_HELP', 'M2_SMALL_INDEPENDENT', 'M3_TRANSFER'],
    Q5: ['D0_STOP', 'D1_TRIAL', 'D2_COMPARE', 'D3_HYPOTHESIS_TEST'],
    Q6: ['R0_NONE', 'R1_VISUAL', 'R2_READ_MODIFY_TEXT', 'R3_WRITE_TEXT'],
  });

  const VALID = Object.freeze({
    C0: new Set(['SELF', 'OTHER']),
    Q1: new Set(ORDERS.Q1),
    Q2: new Set(ORDERS.Q2),
    Q3: new Set(ORDERS.Q3),
    Q4: new Set(ORDERS.Q4),
    Q5: new Set(ORDERS.Q5),
    Q6: new Set(ORDERS.Q6),
    Q7: new Set(Object.keys(ROUTES)),
    TB: new Set(['T0_NOT_YET', 'T1_WITH_HELP', 'T2_YES']),
  });

  class DiagnosticInputError extends Error {
    constructor(code, message, details) {
      super(message);
      this.name = 'DiagnosticInputError';
      this.code = code;
      this.details = details || null;
    }
  }

  function validateAnswers(raw) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      throw new DiagnosticInputError('INVALID_INPUT', 'As respostas devem ser um objeto.');
    }

    const required = ['C0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'];
    for (const key of required) {
      if (!VALID[key].has(raw[key])) {
        throw new DiagnosticInputError('INVALID_ANSWER', `Resposta inválida ou ausente em ${key}.`, { key, value: raw[key] });
      }
    }

    if (raw.TB != null && !VALID.TB.has(raw.TB)) {
      throw new DiagnosticInputError('INVALID_ANSWER', 'Resposta inválida em TB.', { key: 'TB', value: raw.TB });
    }
    return true;
  }

  function detectInconsistencies(raw) {
    validateAnswers(raw);
    const hard = [];
    const soft = [];

    if (raw.Q1 === 'E0_NONE' && ['M2_SMALL_INDEPENDENT', 'M3_TRANSFER'].includes(raw.Q4)) {
      hard.push('H2_AUTHORSHIP_WITHOUT_CREATION');
    }

    if (raw.Q1 === 'E0_NONE' && ['R2_READ_MODIFY_TEXT', 'R3_WRITE_TEXT'].includes(raw.Q6)) {
      soft.push('S1_EXPERIENCE_REPRESENTATION');
    }
    if (raw.Q1 === 'E4_OWN_PROJECT' && raw.Q4 === 'M0_COPY_ONLY' && raw.Q5 === 'D0_STOP') {
      soft.push('S2_PROJECT_AUTONOMY');
    }
    if (['E3_WRITTEN_SMALL', 'E4_OWN_PROJECT'].includes(raw.Q1) && raw.Q6 === 'R0_NONE') {
      soft.push('S3_PAST_TEXT_CURRENT_COMFORT');
    }

    return Object.freeze({ hard: Object.freeze(hard), soft: Object.freeze(soft) });
  }

  function requiresTiebreaker(raw) {
    return detectInconsistencies(raw).hard.length > 0;
  }

  function normalizeEvidence(raw, inconsistencies) {
    const a = {
      ...raw,
      Q4Effective: raw.Q4,
      inconsistencies,
      tiebreakerUsed: false,
    };

    if (!inconsistencies.hard.includes('H2_AUTHORSHIP_WITHOUT_CREATION')) return a;

    if (!VALID.TB.has(raw.TB)) {
      throw new DiagnosticInputError(
        'TIEBREAKER_REQUIRED',
        'As respostas sobre experiência e autoria precisam de uma pergunta adicional de autoria.',
        { conflicts: inconsistencies.hard }
      );
    }

    a.tiebreakerUsed = true;
    if (raw.TB === 'T0_NOT_YET') a.Q4Effective = 'M0_COPY_ONLY';
    else if (raw.TB === 'T1_WITH_HELP') a.Q4Effective = 'M1_SMALL_HELP';
    else a.Q4Effective = 'M2_SMALL_INDEPENDENT';

    return a;
  }

  function gate03(a) {
    const built = a.Q1 !== 'E0_NONE' || a.Q6 !== 'R0_NONE';
    const structured = ['S2_STEPS_RULES', 'S3_CONSEQUENCES'].includes(a.Q3);
    const authors = ['M2_SMALL_INDEPENDENT', 'M3_TRANSFER'].includes(a.Q4Effective);
    const debugEnough = ['D2_COMPARE', 'D3_HYPOTHESIS_TEST'].includes(a.Q5)
      || (a.Q6 === 'R3_WRITE_TEXT' && a.Q5 === 'D1_TRIAL');
    return built && structured && authors && debugEnough;
  }

  function gate02(a) {
    const material = ['P2_IDEA', 'P3_MINIMUM'].includes(a.Q2) || a.Q1 !== 'E0_NONE';
    const startsToStructure = a.Q3 !== 'S0_VAGUE';
    return material && startsToStructure;
  }

  function gate01(a) {
    return ['P2_IDEA', 'P3_MINIMUM'].includes(a.Q2)
      || a.Q1 !== 'E0_NONE'
      || a.Q3 !== 'S0_VAGUE'
      || a.Q4Effective !== 'M0_COPY_ONLY';
  }

  function classifyLearningStage(a) {
    if (gate03(a)) return '03';
    if (gate02(a)) return '02';
    if (gate01(a)) return '01';
    return '00';
  }

  function classifyRouteDecision(a) {
    if (['P0_NONE', 'P1_AREA'].includes(a.Q2)) return 'EXPLORE_FIRST';
    if (a.Q2 === 'P2_IDEA') return 'REDUCE_PROJECT';
    if (a.Q3 === 'S0_VAGUE') return 'STRUCTURE_PROJECT';
    return 'SUGGEST_ROUTE';
  }

  function buildReasonCodes(a, learningStage, routeDecision, routeSuggestion) {
    const codes = [];
    const add = (code) => { if (!codes.includes(code)) codes.push(code); };

    if (a.Q2 === 'P2_IDEA') add('HAS_CONCRETE_IDEA');
    if (a.Q2 === 'P3_MINIMUM') { add('HAS_CONCRETE_IDEA'); add('CAN_DEFINE_MINIMUM_PROJECT'); }

    if (a.Q3 === 'S1_PARTS_HELP') add('CAN_SPLIT_INTO_PARTS');
    if (a.Q3 === 'S2_STEPS_RULES') { add('CAN_SPLIT_INTO_PARTS'); add('CAN_DESCRIBE_RULES'); }
    if (a.Q3 === 'S3_CONSEQUENCES') { add('CAN_SPLIT_INTO_PARTS'); add('CAN_DESCRIBE_RULES'); add('CAN_PREDICT_CONSEQUENCES'); }

    if (a.Q4Effective === 'M1_SMALL_HELP') add('CAN_MODIFY_WITH_HELP');
    if (a.Q4Effective === 'M2_SMALL_INDEPENDENT') add('CAN_MODIFY_INDEPENDENTLY');
    if (a.Q4Effective === 'M3_TRANSFER') { add('CAN_MODIFY_INDEPENDENTLY'); add('CAN_TRANSFER_IDEA'); }

    if (a.Q5 === 'D2_COMPARE') add('COMPARES_EXPECTED_RESULT');
    if (a.Q5 === 'D3_HYPOTHESIS_TEST') { add('COMPARES_EXPECTED_RESULT'); add('USES_HYPOTHESIS_AND_TEST'); }

    if (a.Q1 === 'E2_MODIFIED_VISUAL' || a.Q6 === 'R1_VISUAL') add('HAS_VISUAL_EXPERIENCE');
    if (a.Q1 === 'E3_WRITTEN_SMALL' || ['R2_READ_MODIFY_TEXT', 'R3_WRITE_TEXT'].includes(a.Q6)) add('HAS_TEXTUAL_EXPERIENCE');
    if (a.Q1 === 'E4_OWN_PROJECT') add('COMPLETED_SMALL_PROJECT');

    if (a.Q1 === 'E0_NONE') add('NO_CREATION_EXPERIENCE_YET');
    if (['P0_NONE', 'P1_AREA'].includes(a.Q2)) add('INTEREST_NOT_CONCRETE_YET');
    if (a.Q2 === 'P2_IDEA') add('PROJECT_NOT_REDUCED_YET');
    if (a.Q3 === 'S0_VAGUE') add('STRUCTURE_STILL_VAGUE');
    if (a.Q4Effective === 'M0_COPY_ONLY') add('DEPENDS_ON_STEP_BY_STEP');
    if (a.Q5 === 'D1_TRIAL') add('DEBUGGING_STILL_TRIAL_AND_ERROR');
    if (['R0_NONE', 'R1_VISUAL'].includes(a.Q6)) add('TEXTUAL_LOGIC_NOT_COMFORTABLE_YET');

    if (routeDecision === 'EXPLORE_FIRST') add('NEEDS_EXPLORATION_FIRST');
    if (routeDecision === 'REDUCE_PROJECT') add('NEEDS_PROJECT_REDUCTION');
    if (routeDecision === 'STRUCTURE_PROJECT') add('NEEDS_PROJECT_STRUCTURE');
    if (routeDecision === 'SUGGEST_ROUTE') add('ROUTE_SUGGESTION_AVAILABLE');
    if (routeSuggestion === 'open_exploration') add('OPEN_EXPLORATION_IS_VALID');

    if (a.tiebreakerUsed) add('TIEBREAKER_USED');
    if (a.inconsistencies.soft.length) add('SOFT_INCONSISTENCY_DETECTED');
    if (learningStage === '03') add('LEARNING_STAGE_03_EVIDENCE');

    return codes;
  }

  function classify(raw) {
    validateAnswers(raw);
    const inconsistencies = detectInconsistencies(raw);
    const a = normalizeEvidence(raw, inconsistencies);
    const learningStage = classifyLearningStage(a);
    const routeDecision = classifyRouteDecision(a);
    const routeSuggestion = routeDecision === 'SUGGEST_ROUTE' ? ROUTES[a.Q7] : null;
    const confidence = (inconsistencies.hard.length || inconsistencies.soft.length) ? 'MEDIUM' : 'HIGH';

    return Object.freeze({
      algorithmVersion: ALGORITHM_VERSION,
      context: a.C0,
      learningStage,
      learningStageLabel: LEARNING_STAGE_LABELS[learningStage],
      routeDecision,
      interestTag: a.Q7,
      routeSuggestion,
      confidence,
      reasonCodes: Object.freeze(buildReasonCodes(a, learningStage, routeDecision, routeSuggestion)),
      tiebreakerUsed: a.tiebreakerUsed,
    });
  }

  return Object.freeze({
    ALGORITHM_VERSION,
    LEARNING_STAGE_LABELS,
    ROUTES,
    ROUTE_DECISIONS,
    DiagnosticInputError,
    classify,
    detectInconsistencies,
    requiresTiebreaker,
    validateAnswers,
    _internal: Object.freeze({ normalizeEvidence, gate01, gate02, gate03, classifyLearningStage, classifyRouteDecision }),
  });
});
