'use strict';

const assert = require('node:assert/strict');
const experiment = require('./diagnostic-two-axis-experiment.js');

const summary = experiment.summarize();

assert.equal(summary.experimentVersion, 'R00-DIAG-2AXIS-EXPERIMENT-1');
assert.equal(summary.productionAlgorithmVersion, 'R00-DIAG-1.0.0');
assert.equal(summary.baseCombinations, 30720);
assert.equal(summary.classifiedScenarios, 46656);

assert.deepEqual(summary.learningStageDistribution, {
  '00': 288,
  '01': 16176,
  '02': 23520,
  '03': 6672,
});

for (const item of Object.values(summary.learningBoundary)) {
  assert.equal(item.regressions, 0);
  assert.equal(item.jumpOverOne, 0);
}

const A = summary.variants.A_PROJECT_CLARITY;
assert.deepEqual(A.readinessDistribution, { READY: 23328, NOT_READY: 23328 });
assert.equal(A.conflictCoresSensitiveToTB, 0);

const B = summary.variants.B_PROJECT_STRUCTURE;
assert.deepEqual(B.readinessDistribution, { READY: 17496, NOT_READY: 29160 });
assert.equal(B.learningStageCrossTab['00'].READY, 0);
assert.equal(B.learningStageCrossTab['01'].READY, 0);
assert.equal(B.learningStageCrossTab['02'].READY, 14160);
assert.equal(B.learningStageCrossTab['03'].READY, 3336);
assert.equal(B.overlapWithV1Stage04.V1_04_READY, 384);
assert.equal(B.overlapWithV1Stage04.V1_04_NOT_READY, 384);
assert.equal(B.conflictCoresSensitiveToTB, 0);

const C = summary.variants.C_CAPABILITY_EVIDENCE;
assert.deepEqual(C.readinessDistribution, { READY: 3144, NOT_READY: 43512 });
assert.equal(C.conflictCoresSensitiveToTB, 1800);

for (const variant of Object.values(summary.variants)) {
  for (const item of Object.values(variant.readinessBoundary)) {
    assert.equal(item.readyToNotReadyRegressions, 0);
  }
}

assert.equal(summary.leadingHypothesis, 'B_PROJECT_STRUCTURE');

console.log('OK — experimento 2D: 30.720 combinações base, 46.656 cenários, 0 regressões monotônicas.');
console.log('B_PROJECT_STRUCTURE: 17.496 READY; nenhum READY em learningStage 00/01; 0 perfis conflitantes sensíveis ao TB.');
