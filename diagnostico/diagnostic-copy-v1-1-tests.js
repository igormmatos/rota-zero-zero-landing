'use strict';

const assert = require('node:assert/strict');
const copy = require('./diagnostic-copy-v1-1.js');

assert.deepEqual(Object.keys(copy.LEARNING_STAGES), ['00', '01', '02', '03']);
assert.deepEqual(Object.keys(copy.ROUTE_DECISIONS), ['EXPLORE_FIRST', 'REDUCE_PROJECT', 'STRUCTURE_PROJECT', 'SUGGEST_ROUTE']);

const d3 = copy.QUESTIONS.Q5.options.find(([code]) => code === 'D3_HYPOTHESIS_TEST');
assert.ok(d3, 'Q5 precisa expor D3_HYPOTHESIS_TEST.');
assert.match(d3[1], /hipótese/i);
assert.match(d3[1], /teste específico/i);
assert.doesNotMatch(d3[1], /fonte|documenta/i);

assert.equal(
  copy.QUESTIONS.TB.title,
  'Sem seguir um passo a passo, até onde você consegue fazer uma pequena modificação em algo que já existe?'
);
assert.doesNotMatch(copy.QUESTIONS.TB.helper, /erro|depura|hipótese/i);

for (const [key, decision] of Object.entries(copy.ROUTE_DECISIONS)) {
  assert.ok(decision.title.length > 10, `${key} precisa de título público.`);
  assert.ok(decision.body.length > 20, `${key} precisa de explicação pública.`);
}

const base = {
  algorithmVersion: 'R00-DIAG-1.1.0',
  context: 'SELF',
  learningStage: '02',
  learningStageLabel: 'Criar visualmente',
  routeDecision: 'REDUCE_PROJECT',
  interestTag: 'I_GAMES',
  routeSuggestion: null,
  confidence: 'HIGH',
  reasonCodes: ['HAS_CONCRETE_IDEA', 'PROJECT_NOT_REDUCED_YET'],
  tiebreakerUsed: false,
};

const reduce = copy.getResultCopy(base);
assert.match(reduce.heading, /^Seu ponto de partida provável é 02/);
assert.match(reduce.decisionTitle, /reduza a ideia/i);
assert.match(reduce.direction, /Interesse atual: jogos/i);
assert.equal(reduce.reasons.length, 2);
assert.equal(reduce.confidenceNote, '');

const route = copy.getResultCopy({
  ...base,
  learningStage: '03',
  routeDecision: 'SUGGEST_ROUTE',
  routeSuggestion: 'web',
  interestTag: 'I_WEB',
  reasonCodes: ['CAN_DEFINE_MINIMUM_PROJECT', 'CAN_DESCRIBE_RULES', 'USES_HYPOTHESIS_AND_TEST'],
});
assert.match(route.direction, /Direção sugerida: Web/);
assert.equal(route.reasons.length, 2, 'UI pública limita motivos positivos a dois quando não há limite.');

const open = copy.getResultCopy({
  ...base,
  routeDecision: 'SUGGEST_ROUTE',
  routeSuggestion: 'open_exploration',
  interestTag: 'I_UNSURE',
  reasonCodes: ['CAN_DEFINE_MINIMUM_PROJECT', 'CAN_SPLIT_INTO_PARTS', 'OPEN_EXPLORATION_IS_VALID'],
});
assert.match(open.direction, /exploração aberta/i);
assert.match(open.direction, /válido/i);

const other = copy.getResultCopy({ ...base, context: 'OTHER' });
assert.match(other.heading, /^O ponto de partida provável é/);

const mediumTb = copy.getResultCopy({ ...base, confidence: 'MEDIUM', tiebreakerUsed: true });
assert.match(mediumTb.confidenceNote, /apenas para esclarecer o nível de autonomia/i);
assert.doesNotMatch(mediumTb.confidenceNote, /conservador/i);

const serializedPublic = JSON.stringify({
  QUESTIONS: copy.QUESTIONS,
  LEARNING_STAGES: copy.LEARNING_STAGES,
  ROUTE_DECISIONS: copy.ROUTE_DECISIONS,
});
assert.doesNotMatch(serializedPublic, /READY|NOT_READY|Etapa 04|stage 04/i);

console.log('OK — copy pública V1.1 e contrato semântico passaram.');
