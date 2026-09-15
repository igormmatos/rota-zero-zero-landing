'use strict';
const assert = require('node:assert/strict');
const audit = require('./diagnostic-v1-1-audit.js').summarize();

assert.equal(audit.auditVersion, 'R00-DIAG-1.1-AUDIT-1');
assert.equal(audit.algorithmVersion, 'R00-DIAG-1.1.0');
assert.equal(audit.baseCombinations, 30720);
assert.equal(audit.classifiableScenarios, 36864);
assert.equal(audit.hardConflictBaseCores, 3072);
assert.equal(audit.hardConflictCoresStageSensitiveToTB, 1056);
assert.equal(audit.hardConflictCoresRouteSensitiveToTB, 0);
assert.deepEqual(audit.learningStageDistribution, {'00':576,'01':12912,'02':19248,'03':4128});
assert.deepEqual(audit.routeDecisionDistribution, {
  EXPLORE_FIRST:18432,
  REDUCE_PROJECT:9216,
  STRUCTURE_PROJECT:2304,
  SUGGEST_ROUTE:6912,
});
assert.deepEqual(audit.routeSuggestionDistribution, {
  web:1152, automation:1152, games:1152, apps:1152, ai_data:1152, open_exploration:1152,
});
for (const [q, stats] of Object.entries(audit.monotonicity)) {
  assert.equal(stats.regressions, 0, `${q}: regression`);
  assert.equal(stats.jumpOverOne, 0, `${q}: jump > 1`);
}
console.log('OK — auditoria exaustiva V1.1 congelada: 30.720 bases / 36.864 cenários.');
