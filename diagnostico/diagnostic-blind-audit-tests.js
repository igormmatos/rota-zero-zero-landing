'use strict';

const assert = require('node:assert/strict');
const engine = require('./diagnostic-rules.js');
const blind = require('./diagnostic-blind-audit.js');

const EXPECTED = Object.freeze({
  B01: ['02', '04'],
  B02: ['02', '04'],
  B03: ['02', '02'],
  B04: ['02', '04'],
  B05: ['01', '02'],
  B06: ['00', '01'],
  B07: ['02', '03'],
  B08: ['03', '04'],
  B09: ['03', '04'],
  B10: ['00', '01'],
  B11: ['03', '03'],
  B12: ['04', '04'],
});

assert.equal(blind.PAIRS.length, 12, 'A bateria cega V1 deve manter 12 pares mínimos.');

for (const pair of blind.PAIRS) {
  const changed = blind.changedKeys(pair.a, pair.b);
  assert.deepEqual(changed, [pair.changed], `${pair.id}: deve mudar apenas ${pair.changed}`);

  const a = engine.classify(pair.a);
  const b = engine.classify(pair.b);
  assert.deepEqual([a.stage, b.stage], EXPECTED[pair.id], `${pair.id}: fronteira determinística mudou`);
}

// Casos centrais que motivaram a bateria.
assert.deepEqual(EXPECTED.B01, ['02', '04'], 'Q3 S1→S2 deve permanecer explicitamente auditado como salto 02→04.');
assert.deepEqual(EXPECTED.B02, ['02', '04'], 'Q4 M1→M2 deve permanecer explicitamente auditado como salto 02→04.');
assert.deepEqual(EXPECTED.B03, ['02', '02'], 'T0→T1 deve permanecer auditado como equivalência de etapa.');
assert.deepEqual(EXPECTED.B04, ['02', '04'], 'T1→T2 deve permanecer auditado como fronteira forte.');

console.log(`OK — ${blind.PAIRS.length} pares mínimos da auditoria cega passaram (${engine.ALGORITHM_VERSION}).`);
