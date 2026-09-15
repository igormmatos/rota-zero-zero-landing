'use strict';

const assert = require('node:assert/strict');
const engine = require('./diagnostic-rules.js');
const audit = require('./diagnostic-exhaustive-audit.js');

const { summary } = audit.auditAll();

assert.equal(summary.algorithmVersion, 'R00-DIAG-1.0.0');
assert.equal(summary.baseCombinations, 30720, 'A matriz base Q1-Q7 deve ter 30.720 combinações.');
assert.equal(summary.conflictCombinations, 7968, 'Snapshot V1 dos conflitos duros mudou.');
assert.equal(summary.classifiedScenarios, 46656, 'A expansão dos conflitos pelos 3 TBs deve gerar 46.656 cenários classificáveis.');
assert.equal(summary.invariantFailures.length, 0, 'Nenhum invariante estrutural pode falhar.');

for (const [question, boundary] of Object.entries(summary.boundary)) {
  assert.equal(boundary.regressions, 0, `${question}: aumentar uma alternativa ordinal não pode reduzir a etapa em pares não conflitantes.`);
}

assert.deepEqual(summary.stageDistribution, {
  '00': 288,
  '01': 16176,
  '02': 23520,
  '03': 5904,
  '04': 768,
}, 'Snapshot V1 da distribuição exaustiva mudou; revisar intencionalmente se os gates forem alterados.');

assert.equal(summary.boundary.Q3.jumpOverOne, 288, 'Q3 possui 288 saltos 02→04 conhecidos na V1; qualquer mudança exige revisão de fronteira.');
assert.equal(summary.boundary.Q4.jumpOverOne, 288, 'Q4 possui 288 saltos 02→04 conhecidos na V1; qualquer mudança exige revisão de fronteira.');

// Observação auditável: nos conflitos atuais, T0 e T1 nunca diferem na etapa;
// diferem apenas na evidência efetiva/reason codes. Isso não falha o motor,
// mas deve permanecer explícito até decidirmos se a redundância é desejada.
const V = audit.VALUES;
let conflictingCores = 0;
let t0t1StageDifferences = 0;

for (const Q1 of V.Q1)
for (const Q2 of V.Q2)
for (const Q3 of V.Q3)
for (const Q4 of V.Q4)
for (const Q5 of V.Q5)
for (const Q6 of V.Q6)
for (const Q7 of V.Q7) {
  const base = { C0: 'SELF', Q1, Q2, Q3, Q4, Q5, Q6, Q7 };
  if (!engine.requiresTiebreaker(base)) continue;
  conflictingCores += 1;
  const t0 = engine.classify({ ...base, TB: 'T0_NOT_YET' });
  const t1 = engine.classify({ ...base, TB: 'T1_WITH_HELP' });
  if (t0.stage !== t1.stage) t0t1StageDifferences += 1;
}

assert.equal(conflictingCores, 7968);
assert.equal(t0t1StageDifferences, 0, 'T0/T1 passaram a diferenciar etapa; revisar a semântica do desempate e atualizar a documentação.');

console.log('OK — auditoria exaustiva V1: 30.720 combinações base, 46.656 cenários classificados, 0 regressões monotônicas.');
console.log('ATENÇÃO — fronteiras conhecidas: 288 saltos Q3 02→04 e 288 saltos Q4 02→04.');
console.log('ATENÇÃO — T0_NOT_YET e T1_WITH_HELP são equivalentes quanto à etapa em todos os 7.968 conflitos; diferem apenas na explicação/evidência.');
