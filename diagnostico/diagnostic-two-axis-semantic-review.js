'use strict';

const engine = require('./diagnostic-rules.js');
const twoAxis = require('./diagnostic-two-axis-experiment.js');

const VALUES = twoAxis.VALUES;
const ROUTE_DECISIONS = Object.freeze([
  'EXPLORE_FIRST',
  'REDUCE_PROJECT',
  'STRUCTURE_PROJECT',
  'SUGGEST_ROUTE',
]);

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
  return engine._internal.normalizeEvidence(raw, engine.detectHardConflicts(raw));
}

/**
 * Refinamento editorial derivado da leitura do Livro-fonte V2.1:
 * interesse -> projeto -> tecnologia.
 *
 * P2 significa que existe uma ideia concreta, mas ela ainda não foi reduzida.
 * P3 significa que já existe uma versão pequena e uma expectativa do que ela deve fazer.
 * A sugestão de tecnologia só aparece depois de P3 e de algum começo de estruturação.
 */
function routeDecisionFromEvidence(a) {
  if (['P0_NONE', 'P1_AREA'].includes(a.Q2)) return 'EXPLORE_FIRST';
  if (a.Q2 === 'P2_IDEA') return 'REDUCE_PROJECT';
  if (a.Q3 === 'S0_VAGUE') return 'STRUCTURE_PROJECT';
  return 'SUGGEST_ROUTE';
}

function classifyReviewed(raw) {
  engine.validateAnswers(raw);
  const a = normalized(raw);
  const two = twoAxis.classifyTwoAxis(raw, 'B_PROJECT_STRUCTURE');
  const routeDecision = routeDecisionFromEvidence(a);
  return Object.freeze({
    learningStage: two.learningStage,
    currentBReadiness: two.routeReadiness,
    routeDecision,
    routeSuggestion: routeDecision === 'SUGGEST_ROUTE' ? engine.ROUTES[a.Q7] : null,
    interestTag: a.Q7,
    v1Stage: engine.classify(raw).stage,
  });
}

function inc(map, key) {
  map[key] = (map[key] || 0) + 1;
}

function summarize() {
  const routeDecisionDistribution = Object.fromEntries(ROUTE_DECISIONS.map(k => [k, 0]));
  const crossTab = {};
  const currentBReadyByQ2 = {};
  const v1Stage04ByRouteDecision = Object.fromEntries(ROUTE_DECISIONS.map(k => [k, 0]));
  let classifiedScenarios = 0;
  let currentBReady = 0;
  let currentBNotReady = 0;
  let v1Not04SuggestRoute = 0;

  for (const raw of baseCombinations()) {
    for (const scenario of scenariosFor(raw)) {
      classifiedScenarios += 1;
      const result = classifyReviewed(scenario);
      inc(routeDecisionDistribution, result.routeDecision);
      inc(crossTab, `${result.learningStage}:${result.routeDecision}`);

      if (result.currentBReadiness === 'READY') {
        currentBReady += 1;
        inc(currentBReadyByQ2, scenario.Q2);
      } else {
        currentBNotReady += 1;
      }

      if (result.v1Stage === '04') {
        inc(v1Stage04ByRouteDecision, result.routeDecision);
      } else if (result.routeDecision === 'SUGGEST_ROUTE') {
        v1Not04SuggestRoute += 1;
      }
    }
  }

  // O refinamento usa somente Q2 e Q3, portanto o TB não deve alterar a decisão de rota.
  let conflictCores = 0;
  let conflictCoresSensitiveToTB = 0;
  for (const raw of baseCombinations()) {
    if (!engine.requiresTiebreaker(raw)) continue;
    conflictCores += 1;
    const states = new Set(VALUES.TB.map(TB => routeDecisionFromEvidence(normalized({ ...raw, TB }))));
    if (states.size > 1) conflictCoresSensitiveToTB += 1;
  }

  return {
    reviewVersion: 'R00-DIAG-2AXIS-SEMANTIC-REVIEW-1',
    productionAlgorithmVersion: engine.ALGORITHM_VERSION,
    classifiedScenarios,
    currentB: {
      READY: currentBReady,
      NOT_READY: currentBNotReady,
      readyByQ2: currentBReadyByQ2,
    },
    routeDecisionDistribution,
    learningStageRouteDecisionCrossTab: crossTab,
    v1Stage04ByRouteDecision,
    v1Not04SuggestRoute,
    conflictCores,
    conflictCoresSensitiveToTB,
  };
}

if (require.main === module) {
  console.log(JSON.stringify(summarize(), null, 2));
}

module.exports = {
  ROUTE_DECISIONS,
  routeDecisionFromEvidence,
  classifyReviewed,
  summarize,
};
