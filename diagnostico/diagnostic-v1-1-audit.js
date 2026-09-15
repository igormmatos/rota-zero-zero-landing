'use strict';

const engine = require('./diagnostic-rules-v1-1.js');

const VALUES = Object.freeze({
  Q1: ['E0_NONE', 'E1_FOLLOWED', 'E2_MODIFIED_VISUAL', 'E3_WRITTEN_SMALL', 'E4_OWN_PROJECT'],
  Q2: ['P0_NONE', 'P1_AREA', 'P2_IDEA', 'P3_MINIMUM'],
  Q3: ['S0_VAGUE', 'S1_PARTS_HELP', 'S2_STEPS_RULES', 'S3_CONSEQUENCES'],
  Q4: ['M0_COPY_ONLY', 'M1_SMALL_HELP', 'M2_SMALL_INDEPENDENT', 'M3_TRANSFER'],
  Q5: ['D0_STOP', 'D1_TRIAL', 'D2_COMPARE', 'D3_HYPOTHESIS_TEST'],
  Q6: ['R0_NONE', 'R1_VISUAL', 'R2_READ_MODIFY_TEXT', 'R3_WRITE_TEXT'],
  Q7: ['I_WEB', 'I_AUTOMATION', 'I_GAMES', 'I_APPS', 'I_AI_DATA', 'I_UNSURE'],
  TB: ['T0_NOT_YET', 'T1_WITH_HELP', 'T2_YES'],
});
const ORDINAL = ['Q1','Q2','Q3','Q4','Q5','Q6'];

function* baseCombinations() {
  for (const Q1 of VALUES.Q1)
  for (const Q2 of VALUES.Q2)
  for (const Q3 of VALUES.Q3)
  for (const Q4 of VALUES.Q4)
  for (const Q5 of VALUES.Q5)
  for (const Q6 of VALUES.Q6)
  for (const Q7 of VALUES.Q7) {
    yield { C0:'SELF', Q1,Q2,Q3,Q4,Q5,Q6,Q7 };
  }
}

function scenariosFor(raw) {
  if (!engine.requiresTiebreaker(raw)) return [raw];
  return VALUES.TB.map(TB => ({...raw,TB}));
}
function inc(map,key,n=1){ map[key]=(map[key]||0)+n; }

function summarize() {
  const learningStageDistribution = {'00':0,'01':0,'02':0,'03':0};
  const routeDecisionDistribution = {
    EXPLORE_FIRST:0, REDUCE_PROJECT:0, STRUCTURE_PROJECT:0, SUGGEST_ROUTE:0,
  };
  const crossTab = {};
  const routeSuggestionDistribution = {};
  const softInconsistencyBaseCores = {};
  const tbStageDistribution = {};
  let baseCombinationCount = 0;
  let classifiableScenarios = 0;
  let hardConflictBaseCores = 0;
  let hardConflictCoresStageSensitiveToTB = 0;
  let hardConflictCoresRouteSensitiveToTB = 0;

  for (const raw of baseCombinations()) {
    baseCombinationCount += 1;
    const inconsistencies = engine.detectInconsistencies(raw);
    if (inconsistencies.soft.length) inc(softInconsistencyBaseCores, inconsistencies.soft.join('+'));
    if (inconsistencies.hard.length) {
      hardConflictBaseCores += 1;
      const stageSet = new Set();
      const routeSet = new Set();
      for (const TB of VALUES.TB) {
        const out = engine.classify({...raw,TB});
        stageSet.add(out.learningStage);
        routeSet.add(out.routeDecision);
      }
      if (stageSet.size > 1) hardConflictCoresStageSensitiveToTB += 1;
      if (routeSet.size > 1) hardConflictCoresRouteSensitiveToTB += 1;
    }

    for (const scenario of scenariosFor(raw)) {
      classifiableScenarios += 1;
      const a = engine.classify(scenario);
      const b = engine.classify(scenario);
      if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('Non-deterministic result.');
      learningStageDistribution[a.learningStage] += 1;
      routeDecisionDistribution[a.routeDecision] += 1;
      inc(crossTab, `${a.learningStage}:${a.routeDecision}`);
      if (a.routeSuggestion) inc(routeSuggestionDistribution, a.routeSuggestion);
      if (scenario.TB) inc(tbStageDistribution, `${scenario.TB}:${a.learningStage}`);

      const other = engine.classify({...scenario,C0:'OTHER'});
      if (other.learningStage !== a.learningStage || other.routeDecision !== a.routeDecision || other.routeSuggestion !== a.routeSuggestion) {
        throw new Error('SELF/OTHER invariant failed.');
      }

      for (const q7 of VALUES.Q7) {
        const q = engine.classify({...scenario,Q7:q7});
        if (q.learningStage !== a.learningStage || q.routeDecision !== a.routeDecision) {
          throw new Error('Q7 changed learningStage or routeDecision.');
        }
        if (a.routeDecision !== 'SUGGEST_ROUTE' && q.routeSuggestion !== null) {
          throw new Error('Route suggestion leaked before SUGGEST_ROUTE.');
        }
      }
    }
  }

  const monotonicity = {};
  for (const q of ORDINAL) monotonicity[q] = { comparedPairs:0, regressions:0, jumpOverOne:0 };

  for (const raw of baseCombinations()) {
    if (engine.requiresTiebreaker(raw)) continue;
    const before = engine.classify(raw);
    for (const q of ORDINAL) {
      const vals = VALUES[q];
      const i = vals.indexOf(raw[q]);
      if (i === vals.length - 1) continue;
      const next = {...raw,[q]:vals[i+1]};
      if (engine.requiresTiebreaker(next)) continue;
      const after = engine.classify(next);
      const delta = Number(after.learningStage) - Number(before.learningStage);
      monotonicity[q].comparedPairs += 1;
      if (delta < 0) monotonicity[q].regressions += 1;
      if (delta > 1) monotonicity[q].jumpOverOne += 1;
    }
  }

  return {
    auditVersion:'R00-DIAG-1.1-AUDIT-1',
    algorithmVersion:engine.ALGORITHM_VERSION,
    baseCombinations: baseCombinationCount,
    classifiableScenarios,
    hardConflictBaseCores,
    hardConflictCoresStageSensitiveToTB,
    hardConflictCoresRouteSensitiveToTB,
    softInconsistencyBaseCores,
    learningStageDistribution,
    routeDecisionDistribution,
    learningStageRouteDecisionCrossTab:crossTab,
    routeSuggestionDistribution,
    tbStageDistribution,
    monotonicity,
  };
}

if (require.main === module) console.log(JSON.stringify(summarize(),null,2));
module.exports = { VALUES, summarize };
