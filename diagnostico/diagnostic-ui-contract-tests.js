'use strict';

const assert = require('node:assert/strict');
const engine = require('./diagnostic-rules.js');
const copy = require('./diagnostic-copy.js');

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
    assert.doesNotThrow(() => engine.validateAnswers({ ...base, [key]: value }), `${key}:${value} deve ser aceito pelo motor`);
  }
}

for (const [value] of copy.QUESTIONS.TB.options) {
  assert.doesNotThrow(() => engine.validateAnswers({ ...base, TB: value }), `TB:${value} deve ser aceito pelo motor`);
}

const early = engine.classify({
  C0: 'SELF', Q1: 'E0_NONE', Q2: 'P0_NONE', Q3: 'S0_VAGUE', Q4: 'M0_COPY_ONLY',
  Q5: 'D0_STOP', Q6: 'R0_NONE', Q7: 'I_GAMES',
});
const earlyCopy = copy.getResultCopy(early);
assert.match(earlyCopy.heading, /00 — Descobrir/);
assert.match(earlyCopy.direction, /jogos/i);

const route = engine.classify({
  C0: 'OTHER', Q1: 'E4_OWN_PROJECT', Q2: 'P3_MINIMUM', Q3: 'S3_CONSEQUENCES', Q4: 'M3_TRANSFER',
  Q5: 'D3_HYPOTHESIS_SOURCE', Q6: 'R3_WRITE_TEXT', Q7: 'I_UNSURE',
});
const routeCopy = copy.getResultCopy(route);
assert.match(routeCopy.heading, /O ponto de partida provável é 04/);
assert.match(routeCopy.direction, /exploração aberta/i);

console.log('OK — contrato entre perguntas, copy e motor determinístico validado.');
