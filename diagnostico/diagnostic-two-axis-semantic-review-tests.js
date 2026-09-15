'use strict';

const assert = require('node:assert/strict');
const review = require('./diagnostic-two-axis-semantic-review.js');

const summary = review.summarize();

assert.equal(summary.classifiedScenarios, 46656);

assert.deepEqual(summary.currentB, {
  READY: 17496,
  NOT_READY: 29160,
  readyByQ2: {
    P2_IDEA: 8748,
    P3_MINIMUM: 8748,
  },
});

assert.deepEqual(summary.routeDecisionDistribution, {
  EXPLORE_FIRST: 23328,
  REDUCE_PROJECT: 11664,
  STRUCTURE_PROJECT: 2916,
  SUGGEST_ROUTE: 8748,
});

assert.equal(summary.learningStageRouteDecisionCrossTab['00:EXPLORE_FIRST'], 288);
assert.equal(summary.learningStageRouteDecisionCrossTab['01:EXPLORE_FIRST'], 10344);
assert.equal(summary.learningStageRouteDecisionCrossTab['01:REDUCE_PROJECT'], 2916);
assert.equal(summary.learningStageRouteDecisionCrossTab['01:STRUCTURE_PROJECT'], 2916);
assert.equal(summary.learningStageRouteDecisionCrossTab['02:EXPLORE_FIRST'], 9360);
assert.equal(summary.learningStageRouteDecisionCrossTab['02:REDUCE_PROJECT'], 7080);
assert.equal(summary.learningStageRouteDecisionCrossTab['02:SUGGEST_ROUTE'], 7080);
assert.equal(summary.learningStageRouteDecisionCrossTab['03:EXPLORE_FIRST'], 3336);
assert.equal(summary.learningStageRouteDecisionCrossTab['03:REDUCE_PROJECT'], 1668);
assert.equal(summary.learningStageRouteDecisionCrossTab['03:SUGGEST_ROUTE'], 1668);

assert.deepEqual(summary.v1Stage04ByRouteDecision, {
  EXPLORE_FIRST: 384,
  REDUCE_PROJECT: 192,
  STRUCTURE_PROJECT: 0,
  SUGGEST_ROUTE: 192,
});

assert.equal(summary.v1Not04SuggestRoute, 8556);
assert.equal(summary.conflictCores, 7968);
assert.equal(summary.conflictCoresSensitiveToTB, 0);

// Fronteiras semânticas principais.
const makeEvidence = (Q2, Q3) => ({ Q2, Q3 });
assert.equal(review.routeDecisionFromEvidence(makeEvidence('P1_AREA', 'S2_STEPS_RULES')), 'EXPLORE_FIRST');
assert.equal(review.routeDecisionFromEvidence(makeEvidence('P2_IDEA', 'S2_STEPS_RULES')), 'REDUCE_PROJECT');
assert.equal(review.routeDecisionFromEvidence(makeEvidence('P3_MINIMUM', 'S0_VAGUE')), 'STRUCTURE_PROJECT');
assert.equal(review.routeDecisionFromEvidence(makeEvidence('P3_MINIMUM', 'S1_PARTS_HELP')), 'SUGGEST_ROUTE');

console.log('OK — revisão semântica 2D congelada em 46.656 cenários.');
