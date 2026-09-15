'use strict';

const engine = require('./diagnostic-rules.js');

const EXPERIMENT_VERSION = 'R00-DIAG-2AXIS-EXPERIMENT-1';

const VALUES = Object.freeze({
  Q1: ['E0_NONE', 'E1_FOLLOWED', 'E2_MODIFIED_VISUAL', 'E3_WRITTEN_SMALL', 'E4_OWN_PROJECT'],
  Q2: ['P0_NONE', 'P1_AREA', 'P2_IDEA', 'P3_MINIMUM'],
  Q3: ['S0_VAGUE', 'S1_PARTS_HELP', 'S2_STEPS_RULES', 'S3_CONSEQUENCES'],
  Q4: ['M0_COPY_ONLY', 'M1_SMALL_HELP', 'M2_SMALL_INDEPENDENT', 'M3_TRANSFER'],
  Q5: ['D0_STOP', 'D1_TRIAL', 'D2_COMPARE', 'D3_HYPOTHESIS_SOURCE'],
  Q6: ['R0_NONE', 'R1_VISUAL', 'R2_READ_MODIFY_TEXT', 'R3_WRITE_TEXT'],
  Q7: ['I_WEB', 'I_AUTOMATION', 'I_GAMES', 'I_APPS', 'I_AI_DATA', 'I_UNSURE'],
  TB: ['T0_NOT_YET', 'T1_WITH_HELP', 'T2_YES'],
});

const ORDINAL_QUESTIONS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
const LEARNING_STAGES = ['00', '01', '02', '03'];

function* baseCombinations() {
  for (const Q1 of VALUES.Q1)
  for (const Q2 of VALUES.Q2)
  for (const Q3 of VALUES.Q3)
  for (const Q4 of VALUES.Q4)
  for (const Q5 of VALUES.Q5)
  for (const Q6 of VALUES.Q6)
  for (const Q7 of VALUES.Q7) {
    yield { C0: 'SELF', Q1, Q2, Q3, Q4, Q5, Q6, Q7 };
  }
}

function scenariosFor(raw) {
  const conflicts = engine.detectHardConflicts(raw);
  if (!conflicts.length) return [{ ...raw }];
  return VALUES.TB.map(TB => ({ ...raw, TB }));
}

function normalized(raw) {
  const conflicts = engine.detectHardConflicts(raw);
  return engine._internal.normalizeEvidence(raw, conflicts);
}

function applyStageCap(stage, cap) {
  if (!cap) return stage;
  return Number(stage) > Number(cap) ? cap : stage;
}

function classifyLearningStageFromEvidence(a) {
  let stage = '00';
  if (engine._internal.gate03(a)) stage = '03';
  else if (engine._internal.gate02(a)) stage = '02';
  else if (engine._internal.gate01(a)) stage = '01';
  return applyStageCap(stage, a.stageCap);
}

function readinessAProjectClarity(a) {
  return ['P2_IDEA', 'P3_MINIMUM'].includes(a.Q2);
}

function readinessBProjectStructure(a) {
  return ['P2_IDEA', 'P3_MINIMUM'].includes(a.Q2)
    && a.Q3 !== 'S0_VAGUE';
}

function readinessCCapabilityEvidence(a) {
  const built = a.Q1 !== 'E0_NONE' || a.Q6 !== 'R0_NONE';
  const concrete = ['P2_IDEA', 'P3_MINIMUM'].includes(a.Q2);
  const structured = ['S2_STEPS_RULES', 'S3_CONSEQUENCES'].includes(a.Q3);
  const authorship = ['M2_SMALL_INDEPENDENT', 'M3_TRANSFER'].includes(a.Q4Effective);
  const systematicDebug = ['D2_COMPARE', 'D3_HYPOTHESIS_SOURCE'].includes(a.Q5Effective);
  return built && concrete && structured && authorship && systematicDebug;
}

const READINESS_VARIANTS = Object.freeze({
  A_PROJECT_CLARITY: {
    ready: readinessAProjectClarity,
    note: 'READY quando já existe uma ideia/projeto concreto (P2/P3). Serve como limite inferior de prontidão decisória.',
  },
  B_PROJECT_STRUCTURE: {
    ready: readinessBProjectStructure,
    note: 'READY quando há ideia/projeto concreto (P2/P3) e a pessoa já consegue começar a estruturar partes/regras (Q3 != S0).',
  },
  C_CAPABILITY_EVIDENCE: {
    ready: readinessCCapabilityEvidence,
    note: 'READY exige experiência de construção + ideia concreta + estrutura S2/S3 + autoria M2/M3 + debugging D2/D3. Serve como limite superior, mais próximo de prontidão por competência.',
  },
});

function classifyTwoAxis(raw, variantName = 'B_PROJECT_STRUCTURE') {
  engine.validateAnswers(raw);
  const variant = READINESS_VARIANTS[variantName];
  if (!variant) throw new Error(`Variante desconhecida: ${variantName}`);

  const a = normalized(raw);
  const learningStage = classifyLearningStageFromEvidence(a);
  const isReady = variant.ready(a);
  const routeReadiness = isReady ? 'READY' : 'NOT_READY';
  const routeSuggestion = isReady ? engine.ROUTES[a.Q7] : null;

  return Object.freeze({
    experimentVersion: EXPERIMENT_VERSION,
    productionAlgorithmVersion: engine.ALGORITHM_VERSION,
    learningStage,
    learningStageLabel: engine.STAGE_LABELS[learningStage],
    routeReadiness,
    interestTag: a.Q7,
    routeSuggestion,
    routeMode: isReady ? 'suggestion' : 'context',
    tiebreakerUsed: a.tiebreakerUsed,
  });
}

function inc(map, key, n = 1) {
  map[key] = (map[key] || 0) + n;
}

function emptyLearningDistribution() {
  return Object.fromEntries(LEARNING_STAGES.map(stage => [stage, 0]));
}

function emptyCrossTab() {
  return Object.fromEntries(LEARNING_STAGES.map(stage => [stage, { READY: 0, NOT_READY: 0 }]));
}

function summarize() {
  const learningStageDistribution = emptyLearningDistribution();
  const variants = Object.fromEntries(Object.keys(READINESS_VARIANTS).map(name => [name, {
    readinessDistribution: { READY: 0, NOT_READY: 0 },
    learningStageCrossTab: emptyCrossTab(),
    overlapWithV1Stage04: {
      V1_04_READY: 0,
      V1_04_NOT_READY: 0,
      V1_NOT04_READY: 0,
      V1_NOT04_NOT_READY: 0,
    },
    conflictCoresSensitiveToTB: 0,
    readinessBoundary: Object.fromEntries(ORDINAL_QUESTIONS.map(q => [q, {
      comparedPairs: 0,
      readyToNotReadyRegressions: 0,
      notReadyToReady: 0,
    }])),
  }]));

  const learningBoundary = Object.fromEntries(ORDINAL_QUESTIONS.map(q => [q, {
    comparedPairs: 0,
    regressions: 0,
    jumpOverOne: 0,
  }]));

  let baseCombinationsCount = 0;
  let classifiedScenarios = 0;

  for (const raw of baseCombinations()) {
    baseCombinationsCount += 1;
    for (const scenario of scenariosFor(raw)) {
      classifiedScenarios += 1;
      const evidence = normalized(scenario);
      const learningStage = classifyLearningStageFromEvidence(evidence);
      const v1Stage = engine.classify(scenario).stage;
      learningStageDistribution[learningStage] += 1;

      for (const [name, variant] of Object.entries(READINESS_VARIANTS)) {
        const ready = variant.ready(evidence);
        const bucket = variants[name];
        bucket.readinessDistribution[ready ? 'READY' : 'NOT_READY'] += 1;
        bucket.learningStageCrossTab[learningStage][ready ? 'READY' : 'NOT_READY'] += 1;
        const overlapKey = `${v1Stage === '04' ? 'V1_04' : 'V1_NOT04'}_${ready ? 'READY' : 'NOT_READY'}`;
        bucket.overlapWithV1Stage04[overlapKey] += 1;
      }
    }
  }

  // Sensibilidade do routeReadiness ao TB: mede quantos perfis-base conflitantes
  // mudam READY/NOT_READY apenas pela resposta de desempate.
  for (const raw of baseCombinations()) {
    if (!engine.requiresTiebreaker(raw)) continue;
    for (const [name, variant] of Object.entries(READINESS_VARIANTS)) {
      const states = new Set();
      for (const TB of VALUES.TB) {
        const scenario = { ...raw, TB };
        states.add(variant.ready(normalized(scenario)) ? 'READY' : 'NOT_READY');
      }
      if (states.size > 1) variants[name].conflictCoresSensitiveToTB += 1;
    }
  }

  // Monotonicidade: em pares adjacentes não conflitantes, aumentar uma resposta
  // ordinal não deve reduzir learningStage nem converter READY em NOT_READY.
  for (const raw of baseCombinations()) {
    if (engine.requiresTiebreaker(raw)) continue;
    const beforeEvidence = normalized(raw);
    const beforeStage = classifyLearningStageFromEvidence(beforeEvidence);

    for (const q of ORDINAL_QUESTIONS) {
      const values = VALUES[q];
      const i = values.indexOf(raw[q]);
      if (i < 0 || i === values.length - 1) continue;

      const next = { ...raw, [q]: values[i + 1] };
      if (engine.requiresTiebreaker(next)) continue;

      const afterEvidence = normalized(next);
      const afterStage = classifyLearningStageFromEvidence(afterEvidence);
      const delta = Number(afterStage) - Number(beforeStage);
      const stageBucket = learningBoundary[q];
      stageBucket.comparedPairs += 1;
      if (delta < 0) stageBucket.regressions += 1;
      if (delta > 1) stageBucket.jumpOverOne += 1;

      for (const [name, variant] of Object.entries(READINESS_VARIANTS)) {
        const readyBefore = variant.ready(beforeEvidence);
        const readyAfter = variant.ready(afterEvidence);
        const readyBucket = variants[name].readinessBoundary[q];
        readyBucket.comparedPairs += 1;
        if (readyBefore && !readyAfter) readyBucket.readyToNotReadyRegressions += 1;
        if (!readyBefore && readyAfter) readyBucket.notReadyToReady += 1;
      }
    }
  }

  return {
    experimentVersion: EXPERIMENT_VERSION,
    productionAlgorithmVersion: engine.ALGORITHM_VERSION,
    baseCombinations: baseCombinationsCount,
    classifiedScenarios,
    learningStageDistribution,
    learningBoundary,
    variantNotes: Object.fromEntries(Object.entries(READINESS_VARIANTS).map(([name, v]) => [name, v.note])),
    variants,
    leadingHypothesis: 'B_PROJECT_STRUCTURE',
  };
}

if (require.main === module) {
  console.log(JSON.stringify(summarize(), null, 2));
}

module.exports = {
  EXPERIMENT_VERSION,
  VALUES,
  READINESS_VARIANTS,
  classifyLearningStageFromEvidence,
  classifyTwoAxis,
  summarize,
};
