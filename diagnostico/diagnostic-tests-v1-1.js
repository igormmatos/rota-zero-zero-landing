'use strict';

const assert = require('node:assert/strict');
const engine = require('./diagnostic-rules-v1-1.js');

const D3 = 'D3_HYPOTHESIS_TEST';

const profiles = [
  ['00','EXPLORE_FIRST',null,{C0:'SELF',Q1:'E0_NONE',Q2:'P0_NONE',Q3:'S0_VAGUE',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R0_NONE',Q7:'I_UNSURE'}],
  ['00','EXPLORE_FIRST',null,{C0:'SELF',Q1:'E0_NONE',Q2:'P1_AREA',Q3:'S0_VAGUE',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R0_NONE',Q7:'I_GAMES'}],
  ['01','EXPLORE_FIRST',null,{C0:'SELF',Q1:'E1_FOLLOWED',Q2:'P0_NONE',Q3:'S0_VAGUE',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R0_NONE',Q7:'I_WEB'}],
  ['01','REDUCE_PROJECT',null,{C0:'SELF',Q1:'E0_NONE',Q2:'P2_IDEA',Q3:'S0_VAGUE',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R0_NONE',Q7:'I_WEB'}],
  ['02','REDUCE_PROJECT',null,{C0:'SELF',Q1:'E0_NONE',Q2:'P2_IDEA',Q3:'S1_PARTS_HELP',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R0_NONE',Q7:'I_APPS'}],
  ['02','EXPLORE_FIRST',null,{C0:'SELF',Q1:'E1_FOLLOWED',Q2:'P1_AREA',Q3:'S1_PARTS_HELP',Q4:'M1_SMALL_HELP',Q5:'D1_TRIAL',Q6:'R1_VISUAL',Q7:'I_GAMES'}],
  ['03','REDUCE_PROJECT',null,{C0:'SELF',Q1:'E2_MODIFIED_VISUAL',Q2:'P2_IDEA',Q3:'S2_STEPS_RULES',Q4:'M2_SMALL_INDEPENDENT',Q5:'D2_COMPARE',Q6:'R1_VISUAL',Q7:'I_GAMES'}],
  ['03','EXPLORE_FIRST',null,{C0:'SELF',Q1:'E2_MODIFIED_VISUAL',Q2:'P0_NONE',Q3:'S2_STEPS_RULES',Q4:'M3_TRANSFER',Q5:'D2_COMPARE',Q6:'R1_VISUAL',Q7:'I_UNSURE'}],
  ['03','REDUCE_PROJECT',null,{C0:'SELF',Q1:'E3_WRITTEN_SMALL',Q2:'P2_IDEA',Q3:'S2_STEPS_RULES',Q4:'M2_SMALL_INDEPENDENT',Q5:'D2_COMPARE',Q6:'R2_READ_MODIFY_TEXT',Q7:'I_WEB'}],
  ['03','SUGGEST_ROUTE','automation',{C0:'SELF',Q1:'E3_WRITTEN_SMALL',Q2:'P3_MINIMUM',Q3:'S2_STEPS_RULES',Q4:'M2_SMALL_INDEPENDENT',Q5:'D1_TRIAL',Q6:'R3_WRITE_TEXT',Q7:'I_AUTOMATION'}],
  ['03','SUGGEST_ROUTE','web',{C0:'SELF',Q1:'E3_WRITTEN_SMALL',Q2:'P3_MINIMUM',Q3:'S2_STEPS_RULES',Q4:'M2_SMALL_INDEPENDENT',Q5:D3,Q6:'R3_WRITE_TEXT',Q7:'I_WEB'}],
  ['03','SUGGEST_ROUTE','open_exploration',{C0:'SELF',Q1:'E4_OWN_PROJECT',Q2:'P3_MINIMUM',Q3:'S3_CONSEQUENCES',Q4:'M3_TRANSFER',Q5:D3,Q6:'R3_WRITE_TEXT',Q7:'I_UNSURE'}],
  ['03','SUGGEST_ROUTE','ai_data',{C0:'SELF',Q1:'E4_OWN_PROJECT',Q2:'P3_MINIMUM',Q3:'S3_CONSEQUENCES',Q4:'M3_TRANSFER',Q5:D3,Q6:'R3_WRITE_TEXT',Q7:'I_AI_DATA'}],
  ['02','SUGGEST_ROUTE','apps',{C0:'SELF',Q1:'E0_NONE',Q2:'P3_MINIMUM',Q3:'S2_STEPS_RULES',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R0_NONE',Q7:'I_APPS'}],
  ['03','SUGGEST_ROUTE','games',{C0:'SELF',Q1:'E2_MODIFIED_VISUAL',Q2:'P3_MINIMUM',Q3:'S3_CONSEQUENCES',Q4:'M3_TRANSFER',Q5:D3,Q6:'R1_VISUAL',Q7:'I_GAMES'}],
  ['02','REDUCE_PROJECT',null,{C0:'SELF',Q1:'E3_WRITTEN_SMALL',Q2:'P2_IDEA',Q3:'S1_PARTS_HELP',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R2_READ_MODIFY_TEXT',Q7:'I_WEB'}],
  ['03','SUGGEST_ROUTE','automation',{C0:'SELF',Q1:'E0_NONE',Q2:'P3_MINIMUM',Q3:'S2_STEPS_RULES',Q4:'M2_SMALL_INDEPENDENT',Q5:D3,Q6:'R3_WRITE_TEXT',Q7:'I_AUTOMATION',TB:'T2_YES'}],
  ['02','SUGGEST_ROUTE','games',{C0:'SELF',Q1:'E4_OWN_PROJECT',Q2:'P3_MINIMUM',Q3:'S2_STEPS_RULES',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R3_WRITE_TEXT',Q7:'I_GAMES'}],
  ['00','EXPLORE_FIRST',null,{C0:'SELF',Q1:'E0_NONE',Q2:'P1_AREA',Q3:'S0_VAGUE',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R0_NONE',Q7:'I_WEB'}],
  ['03','SUGGEST_ROUTE','apps',{C0:'OTHER',Q1:'E3_WRITTEN_SMALL',Q2:'P3_MINIMUM',Q3:'S2_STEPS_RULES',Q4:'M2_SMALL_INDEPENDENT',Q5:D3,Q6:'R3_WRITE_TEXT',Q7:'I_APPS'}],
];

assert.equal(profiles.length, 20);
profiles.forEach(([stage, decision, route, input], i) => {
  const out = engine.classify(input);
  assert.equal(out.algorithmVersion, 'R00-DIAG-1.1.0', `perfil ${i+1}: versão`);
  assert.equal(out.learningStage, stage, `perfil ${i+1}: learningStage`);
  assert.equal(out.routeDecision, decision, `perfil ${i+1}: routeDecision`);
  assert.equal(out.routeSuggestion, route, `perfil ${i+1}: routeSuggestion`);
});

const routeBase = {C0:'SELF',Q1:'E2_MODIFIED_VISUAL',Q2:'P3_MINIMUM',Q3:'S2_STEPS_RULES',Q4:'M2_SMALL_INDEPENDENT',Q5:'D2_COMPARE',Q6:'R1_VISUAL',Q7:'I_WEB'};
const routeA = engine.classify(routeBase);
const routeB = engine.classify({...routeBase,Q7:'I_GAMES'});
assert.equal(routeA.learningStage, routeB.learningStage);
assert.equal(routeA.routeDecision, routeB.routeDecision);
assert.notEqual(routeA.routeSuggestion, routeB.routeSuggestion);

const self = engine.classify(routeBase);
const other = engine.classify({...routeBase,C0:'OTHER'});
assert.equal(self.learningStage, other.learningStage);
assert.equal(self.routeDecision, other.routeDecision);
assert.equal(self.routeSuggestion, other.routeSuggestion);

assert.equal(engine.classify({...routeBase,Q7:'I_UNSURE'}).routeSuggestion, 'open_exploration');
assert.equal(engine.classify({...routeBase,Q2:'P1_AREA',Q7:'I_UNSURE'}).routeSuggestion, null);

assert.equal(engine.classify({...routeBase,Q2:'P1_AREA'}).routeDecision, 'EXPLORE_FIRST');
assert.equal(engine.classify({...routeBase,Q2:'P2_IDEA'}).routeDecision, 'REDUCE_PROJECT');
assert.equal(engine.classify({...routeBase,Q2:'P3_MINIMUM',Q3:'S0_VAGUE'}).routeDecision, 'STRUCTURE_PROJECT');
assert.equal(engine.classify({...routeBase,Q2:'P3_MINIMUM',Q3:'S1_PARTS_HELP'}).routeDecision, 'SUGGEST_ROUTE');

const conflict = {C0:'SELF',Q1:'E0_NONE',Q2:'P3_MINIMUM',Q3:'S2_STEPS_RULES',Q4:'M3_TRANSFER',Q5:'D0_STOP',Q6:'R1_VISUAL',Q7:'I_GAMES'};
assert.equal(engine.requiresTiebreaker(conflict), true);
assert.throws(() => engine.classify(conflict), err => err && err.code === 'TIEBREAKER_REQUIRED');
const t0 = engine.classify({...conflict,TB:'T0_NOT_YET'});
const t1 = engine.classify({...conflict,TB:'T1_WITH_HELP'});
const t2 = engine.classify({...conflict,TB:'T2_YES'});
assert.equal(t0.routeDecision, 'SUGGEST_ROUTE');
assert.equal(t1.routeDecision, 'SUGGEST_ROUTE');
assert.equal(t2.routeDecision, 'SUGGEST_ROUTE');
assert.equal(t0.routeSuggestion, 'games');
assert.equal(t2.routeSuggestion, 'games');
assert.ok(!t2.reasonCodes.includes('COMPARES_EXPECTED_RESULT'));

const softH1 = {C0:'SELF',Q1:'E0_NONE',Q2:'P1_AREA',Q3:'S1_PARTS_HELP',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R2_READ_MODIFY_TEXT',Q7:'I_WEB'};
assert.equal(engine.requiresTiebreaker(softH1), false);
assert.equal(engine.classify(softH1).confidence, 'MEDIUM');
const softH3 = {C0:'SELF',Q1:'E4_OWN_PROJECT',Q2:'P3_MINIMUM',Q3:'S2_STEPS_RULES',Q4:'M0_COPY_ONLY',Q5:'D0_STOP',Q6:'R3_WRITE_TEXT',Q7:'I_WEB'};
assert.equal(engine.requiresTiebreaker(softH3), false);
const softH4 = {C0:'SELF',Q1:'E3_WRITTEN_SMALL',Q2:'P2_IDEA',Q3:'S2_STEPS_RULES',Q4:'M1_SMALL_HELP',Q5:'D1_TRIAL',Q6:'R0_NONE',Q7:'I_WEB'};
assert.equal(engine.requiresTiebreaker(softH4), false);

assert.throws(() => engine.classify({...routeBase,Q5:'D3_HYPOTHESIS_SOURCE'}), err => err && err.code === 'INVALID_ANSWER');
const d3out = engine.classify({...routeBase,Q5:D3});
assert.ok(d3out.reasonCodes.includes('USES_HYPOTHESIS_AND_TEST'));
assert.ok(!d3out.reasonCodes.includes('USES_HYPOTHESIS_AND_SOURCE'));

console.log('OK — 20 perfis V1.1 + invariantes passaram (R00-DIAG-1.1.0).');
