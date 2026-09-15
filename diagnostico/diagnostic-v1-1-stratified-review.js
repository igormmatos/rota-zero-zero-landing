'use strict';

const engine = require('./diagnostic-rules.js');
const experiment = require('./diagnostic-v1-1-experiment.js');

const VALUES = experiment.VALUES;
const candidate = experiment.MODELS.D_AGENCY_REPRESENTATION;

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

function inc(map, key) {
  map[key] = (map[key] || 0) + 1;
}

function normalized(raw) {
  return engine._internal.normalizeEvidence(raw, engine.detectHardConflicts(raw));
}

function dFailureReasons(raw) {
  const a = normalized(raw);
  const reasons = [];
  if (a.Q2 !== 'P3_MINIMUM') reasons.push('no_P3');
  if (!(a.Q1 === 'E4_OWN_PROJECT' || a.Q4Effective === 'M3_TRANSFER')) reasons.push('no_agency');
  if (!(a.Q3 === 'S3_CONSEQUENCES' || a.Q6 === 'R3_WRITE_TEXT')) reasons.push('no_rep_depth');
  return reasons;
}

function v1FailureReasons(raw) {
  const a = normalized(raw);
  const reasons = [];
  const expText = ['E3_WRITTEN_SMALL', 'E4_OWN_PROJECT'].includes(a.Q1) || a.Q6 === 'R3_WRITE_TEXT';
  const textRep = ['R2_READ_MODIFY_TEXT', 'R3_WRITE_TEXT'].includes(a.Q6);
  if (!expText) reasons.push('no_expText');
  if (a.Q5Effective !== 'D3_HYPOTHESIS_SOURCE') reasons.push('no_D3');
  if (!textRep) reasons.push('no_textRep');
  return reasons;
}

function analyzeChanges() {
  const summary = {
    classifiedScenarios: 0,
    changedScenarios: 0,
    transitions: {},
    demotionMechanisms: {},
    promotionMechanisms: {},
    demotionsClean: 0,
    demotionsWithTB: 0,
    promotionsClean: 0,
    promotionsWithTB: 0,
  };

  for (const raw of baseCombinations()) {
    for (const scenario of scenariosFor(raw)) {
      summary.classifiedScenarios += 1;
      const before = engine.classify(scenario).stage;
      const after = candidate.classify(scenario);
      inc(summary.transitions, `${before}->${after}`);
      if (before === after) continue;
      summary.changedScenarios += 1;

      if (before === '04' && after === '03') {
        inc(summary.demotionMechanisms, dFailureReasons(scenario).join('+'));
        if (scenario.TB) summary.demotionsWithTB += 1;
        else summary.demotionsClean += 1;
      }

      if (before === '03' && after === '04') {
        inc(summary.promotionMechanisms, v1FailureReasons(scenario).join('+'));
        if (scenario.TB) summary.promotionsWithTB += 1;
        else summary.promotionsClean += 1;
      }
    }
  }

  return summary;
}

function analyzeBoundaryJumps() {
  const result = { total: 0, byQuestion: {} };
  const ordinal = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];

  for (const raw of baseCombinations()) {
    if (engine.requiresTiebreaker(raw)) continue;
    const before = candidate.classify(raw);

    for (const question of ordinal) {
      const values = VALUES[question];
      const index = values.indexOf(raw[question]);
      if (index < 0 || index === values.length - 1) continue;

      const next = { ...raw, [question]: values[index + 1] };
      if (engine.requiresTiebreaker(next)) continue;
      const after = candidate.classify(next);
      if (Number(after) - Number(before) > 1) {
        result.total += 1;
        inc(result.byQuestion, question);
      }
    }
  }

  return result;
}

function main() {
  const changes = analyzeChanges();
  const boundary = analyzeBoundaryJumps();
  const output = {
    reviewVersion: 'R00-DIAG-1.1-STRATIFIED-REVIEW-1',
    baseline: engine.ALGORITHM_VERSION,
    candidate: 'D_AGENCY_REPRESENTATION',
    changes,
    boundary,
  };
  console.log(JSON.stringify(output, null, 2));
}

if (require.main === module) main();

module.exports = { analyzeChanges, analyzeBoundaryJumps, dFailureReasons, v1FailureReasons };
