'use strict';

const engine = require('./diagnostic-rules.js');

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
const STAGES = ['00', '01', '02', '03', '04'];

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

function currentNormalize(raw, conflicts) {
  return engine._internal.normalizeEvidence(raw, conflicts);
}

function targetedNormalize(raw, conflicts) {
  const a = {
    ...raw,
    Q4Effective: raw.Q4,
    Q5Effective: raw.Q5,
    stageCap: null,
    conflicts: conflicts.slice(),
    tiebreakerUsed: conflicts.includes('H2'),
  };

  // V1.1 experimental policy:
  // - H2 remains a true contradiction worth clarifying: “no creation yet” vs independent authorship.
  // - H1/H3/H4 are treated as soft inconsistencies and do not rewrite unrelated dimensions.
  // - the tie-breaker only clarifies authorship; it never rewrites debugging.
  if (!conflicts.includes('H2')) return a;

  if (!VALUES.TB.includes(raw.TB)) {
    const error = new Error('H2 requires an authorship tie-breaker in the experiment.');
    error.code = 'TIEBREAKER_REQUIRED';
    throw error;
  }

  if (raw.TB === 'T0_NOT_YET') a.Q4Effective = 'M0_COPY_ONLY';
  else if (raw.TB === 'T1_WITH_HELP') a.Q4Effective = 'M1_SMALL_HELP';
  else a.Q4Effective = 'M2_SMALL_INDEPENDENT';

  return a;
}

function core04(a) {
  const built = a.Q1 !== 'E0_NONE' || a.Q6 !== 'R0_NONE';
  const minimumProject = a.Q2 === 'P3_MINIMUM';
  const structured = ['S2_STEPS_RULES', 'S3_CONSEQUENCES'].includes(a.Q3);
  const authorship = ['M2_SMALL_INDEPENDENT', 'M3_TRANSFER'].includes(a.Q4Effective);
  const systematicDebug = ['D2_COMPARE', 'D3_HYPOTHESIS_SOURCE'].includes(a.Q5Effective);
  return built && minimumProject && structured && authorship && systematicDebug;
}

function gate04A(a) {
  return core04(a);
}

function gate04B(a) {
  if (!core04(a)) return false;
  const strongSignals = [
    a.Q1 === 'E4_OWN_PROJECT',
    a.Q3 === 'S3_CONSEQUENCES',
    a.Q4Effective === 'M3_TRANSFER',
    a.Q5Effective === 'D3_HYPOTHESIS_SOURCE',
    a.Q6 === 'R3_WRITE_TEXT',
  ].filter(Boolean).length;
  return strongSignals >= 2;
}

function gate04C(a) {
  return core04(a) && (
    a.Q1 === 'E4_OWN_PROJECT'
    || a.Q3 === 'S3_CONSEQUENCES'
    || a.Q4Effective === 'M3_TRANSFER'
  );
}

function gate04D(a) {
  if (!core04(a)) return false;
  const agency = a.Q1 === 'E4_OWN_PROJECT' || a.Q4Effective === 'M3_TRANSFER';
  const reflection = a.Q3 === 'S3_CONSEQUENCES' || a.Q6 === 'R3_WRITE_TEXT';
  return agency && reflection;
}

function classifyCandidate(raw, gate04, normalizer) {
  engine.validateAnswers(raw);
  const conflicts = engine.detectHardConflicts(raw);
  const a = normalizer(raw, conflicts);

  let stage = '00';
  if (gate04(a)) stage = '04';
  else if (engine._internal.gate03(a)) stage = '03';
  else if (engine._internal.gate02(a)) stage = '02';
  else if (engine._internal.gate01(a)) stage = '01';

  if (a.stageCap && Number(stage) > Number(a.stageCap)) stage = a.stageCap;
  return stage;
}

const MODELS = Object.freeze({
  V1: {
    classify: raw => engine.classify(raw).stage,
    note: 'Motor atual R00-DIAG-1.0.0.',
  },
  A_CORE04: {
    classify: raw => classifyCandidate(raw, gate04A, currentNormalize),
    note: 'Remove texto e D3 como hard gates; exige P3 + S2 + M2 + D2 e experiência de construção.',
  },
  B_TWO_STRONG_SIGNALS: {
    classify: raw => classifyCandidate(raw, gate04B, currentNormalize),
    note: 'A_CORE04 + pelo menos 2 sinais fortes entre E4/S3/M3/D3/R3.',
  },
  C_PROJECT_AUTHORSHIP: {
    classify: raw => classifyCandidate(raw, gate04C, currentNormalize),
    note: 'A_CORE04 + pelo menos um de E4/S3/M3; regra simples e explicável.',
  },
  D_AGENCY_REPRESENTATION: {
    classify: raw => classifyCandidate(raw, gate04D, currentNormalize),
    note: 'A_CORE04 + evidência de agência (E4 ou M3) + profundidade de representação (S3 ou R3).',
  },
  D_TARGETED_TB: {
    classify: raw => classifyCandidate(raw, gate04D, targetedNormalize),
    note: 'Modelo D com TB atômico apenas para H2; não usa TB para reescrever debugging.',
  },
});

function emptyDistribution() {
  return Object.fromEntries(STAGES.map(stage => [stage, 0]));
}

function stageDistributions() {
  const distributions = Object.fromEntries(Object.keys(MODELS).map(name => [name, emptyDistribution()]));
  const transitions = Object.fromEntries(Object.keys(MODELS).filter(name => name !== 'V1').map(name => [name, {}]));
  let baseCombinationsCount = 0;
  let classifiedScenarios = 0;

  for (const raw of baseCombinations()) {
    baseCombinationsCount += 1;
    for (const scenario of scenariosFor(raw)) {
      classifiedScenarios += 1;
      const baseline = MODELS.V1.classify(scenario);
      for (const [name, model] of Object.entries(MODELS)) {
        const stage = model.classify(scenario);
        distributions[name][stage] += 1;
        if (name !== 'V1') {
          const key = `${baseline}->${stage}`;
          transitions[name][key] = (transitions[name][key] || 0) + 1;
        }
      }
    }
  }

  return { baseCombinationsCount, classifiedScenarios, distributions, transitions };
}

function boundaryStats(model) {
  const stats = Object.fromEntries(ORDINAL_QUESTIONS.map(q => [q, {
    comparedPairs: 0,
    regressions: 0,
    jumpOverOne: 0,
    deltaCounts: {},
  }]));

  for (const raw of baseCombinations()) {
    if (engine.requiresTiebreaker(raw)) continue;
    const before = model.classify(raw);

    for (const q of ORDINAL_QUESTIONS) {
      const values = VALUES[q];
      const i = values.indexOf(raw[q]);
      if (i < 0 || i === values.length - 1) continue;

      const next = { ...raw, [q]: values[i + 1] };
      if (engine.requiresTiebreaker(next)) continue;

      const after = model.classify(next);
      const delta = Number(after) - Number(before);
      const bucket = stats[q];
      bucket.comparedPairs += 1;
      bucket.deltaCounts[String(delta)] = (bucket.deltaCounts[String(delta)] || 0) + 1;
      if (delta < 0) bucket.regressions += 1;
      if (delta > 1) bucket.jumpOverOne += 1;
    }
  }

  return stats;
}

function summarize() {
  const all = stageDistributions();
  const boundary = Object.fromEntries(Object.entries(MODELS).map(([name, model]) => [name, boundaryStats(model)]));

  const changedFromV1 = {};
  for (const [name, transitions] of Object.entries(all.transitions)) {
    changedFromV1[name] = Object.entries(transitions)
      .filter(([key]) => key.split('->')[0] !== key.split('->')[1])
      .reduce((sum, [, count]) => sum + count, 0);
  }

  const jumpTotals = {};
  for (const [name, stats] of Object.entries(boundary)) {
    jumpTotals[name] = Object.values(stats).reduce((sum, item) => sum + item.jumpOverOne, 0);
  }

  return {
    experimentVersion: 'R00-DIAG-1.1-EXPERIMENT-1',
    productionAlgorithmVersion: engine.ALGORITHM_VERSION,
    baseCombinations: all.baseCombinationsCount,
    classifiedScenarios: all.classifiedScenarios,
    modelNotes: Object.fromEntries(Object.entries(MODELS).map(([name, model]) => [name, model.note])),
    stageDistribution: all.distributions,
    changedFromV1,
    jumpOverOneTotal: jumpTotals,
    boundary,
    transitionsFromV1: all.transitions,
  };
}

if (require.main === module) {
  console.log(JSON.stringify(summarize(), null, 2));
}

module.exports = {
  VALUES,
  MODELS,
  targetedNormalize,
  gate04A,
  gate04B,
  gate04C,
  gate04D,
  summarize,
};
