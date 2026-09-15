'use strict';

const assert = require('node:assert/strict');
const { summarize } = require('./diagnostic-v1-1-experiment.js');

const summary = summarize();

assert.equal(summary.baseCombinations, 30720);
assert.equal(summary.classifiedScenarios, 46656);
assert.deepEqual(summary.stageDistribution.V1, { '00':288, '01':16176, '02':23520, '03':5904, '04':768 });
assert.deepEqual(summary.stageDistribution.D_AGENCY_REPRESENTATION, { '00':288, '01':16176, '02':23520, '03':6168, '04':504 });
assert.deepEqual(summary.stageDistribution.D_TARGETED_TB, { '00':768, '01':16320, '02':24672, '03':4524, '04':372 });

assert.equal(summary.changedFromV1.A_CORE04, 1956);
assert.equal(summary.changedFromV1.B_TWO_STRONG_SIGNALS, 1278);
assert.equal(summary.changedFromV1.C_PROJECT_AUTHORSHIP, 1668);
assert.equal(summary.changedFromV1.D_AGENCY_REPRESENTATION, 1092);
assert.equal(summary.changedFromV1.D_TARGETED_TB, 4608);

assert.equal(summary.jumpOverOneTotal.V1, 576);
assert.equal(summary.jumpOverOneTotal.A_CORE04, 912);
assert.equal(summary.jumpOverOneTotal.B_TWO_STRONG_SIGNALS, 408);
assert.equal(summary.jumpOverOneTotal.C_PROJECT_AUTHORSHIP, 600);
assert.equal(summary.jumpOverOneTotal.D_AGENCY_REPRESENTATION, 180);
assert.equal(summary.jumpOverOneTotal.D_TARGETED_TB, 180);

for (const model of Object.values(summary.boundary)) {
  for (const question of Object.values(model)) assert.equal(question.regressions, 0);
}

console.log('OK — 46.656 cenários V1.1 comparados e snapshot experimental preservado.');
