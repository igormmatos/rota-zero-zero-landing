'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const engine = require('./diagnostic-rules-v1-1.js');
const copy = require('./diagnostic-copy-v1-1.js');

const expectedQuestions = ['C0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'TB'];
assert.deepEqual(Object.keys(copy.QUESTIONS), expectedQuestions);

const base = {
  C0: 'SELF',
  Q1: 'E1_FOLLOWED',
  Q2: 'P1_AREA',
  Q3: 'S1_PARTS_HELP',
  Q4: 'M1_SMALL_HELP',
  Q5: 'D1_TRIAL',
  Q6: 'R1_VISUAL',
  Q7: 'I_WEB',
};

for (const key of ['C0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7']) {
  for (const [value] of copy.QUESTIONS[key].options) {
    assert.doesNotThrow(() => engine.validateAnswers({ ...base, [key]: value }), `${key}:${value} deve ser aceito pelo motor V1.1`);
  }
}

for (const [value] of copy.QUESTIONS.TB.options) {
  assert.doesNotThrow(() => engine.validateAnswers({ ...base, TB: value }), `TB:${value} deve ser aceito pelo motor V1.1`);
}

const early = engine.classify({
  C0: 'SELF', Q1: 'E0_NONE', Q2: 'P0_NONE', Q3: 'S0_VAGUE', Q4: 'M0_COPY_ONLY',
  Q5: 'D0_STOP', Q6: 'R0_NONE', Q7: 'I_GAMES',
});
const earlyCopy = copy.getResultCopy(early);
assert.equal(early.learningStage, '00');
assert.equal(early.routeDecision, 'EXPLORE_FIRST');
assert.match(earlyCopy.heading, /00 — Descobrir/);
assert.match(earlyCopy.decisionTitle, /interesse em uma ideia concreta/i);
assert.match(earlyCopy.direction, /jogos/i);

const route = engine.classify({
  C0: 'OTHER', Q1: 'E4_OWN_PROJECT', Q2: 'P3_MINIMUM', Q3: 'S3_CONSEQUENCES', Q4: 'M3_TRANSFER',
  Q5: 'D3_HYPOTHESIS_TEST', Q6: 'R3_WRITE_TEXT', Q7: 'I_UNSURE',
});
const routeCopy = copy.getResultCopy(route);
assert.equal(route.learningStage, '03');
assert.equal(route.routeDecision, 'SUGGEST_ROUTE');
assert.equal(route.routeSuggestion, 'open_exploration');
assert.match(routeCopy.heading, /O ponto de partida provável é 03/);
assert.match(routeCopy.direction, /exploração aberta/i);

const hardConflict = {
  C0: 'SELF', Q1: 'E0_NONE', Q2: 'P3_MINIMUM', Q3: 'S2_STEPS_RULES', Q4: 'M2_SMALL_INDEPENDENT',
  Q5: 'D2_COMPARE', Q6: 'R1_VISUAL', Q7: 'I_APPS',
};
assert.equal(engine.requiresTiebreaker(hardConflict), true);
assert.throws(() => engine.classify(hardConflict), (error) => error && error.code === 'TIEBREAKER_REQUIRED');
const resolved = engine.classify({ ...hardConflict, TB: 'T1_WITH_HELP' });
assert.equal(resolved.tiebreakerUsed, true);
assert.equal(resolved.routeDecision, 'SUGGEST_ROUTE');

const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const ui = fs.readFileSync(path.join(__dirname, 'diagnostico-v1-1.js'), 'utf8');

assert.match(index, /meta name="robots" content="noindex,follow"/);
assert.match(index, /diagnostic-rules-v1-1\.js/);
assert.match(index, /diagnostic-copy-v1-1\.js/);
assert.match(index, /diagnostico-v1-1\.js/);
assert.doesNotMatch(index, /<script src="diagnostic-rules\.js"/);
assert.doesNotMatch(index, /<script src="diagnostic-copy\.js"/);

assert.match(ui, /RotaZeroZeroDiagnosticV11/);
assert.match(ui, /RotaZeroZeroDiagnosticCopyV11/);
assert.match(ui, /result\.learningStage/);
assert.match(ui, /result\.routeDecision/);
assert.match(ui, /text\.decisionTitle/);
assert.match(ui, /text\.decisionBody/);
assert.doesNotMatch(ui, /result\.stage\b/);
assert.match(ui, /Pergunta \$\{questionNumber\} de 7/);
assert.match(ui, /Antes de começar/);

console.log('OK — contrato da UI V1.1 com motor, copy e noindex passou.');
