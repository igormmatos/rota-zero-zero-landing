'use strict';

const assert = require('node:assert/strict');
const review = require('./diagnostic-v1-1-stratified-review.js');

const changes = review.analyzeChanges();
const boundary = review.analyzeBoundaryJumps();

assert.equal(changes.classifiedScenarios, 46656);
assert.equal(changes.changedScenarios, 1092);
assert.equal(changes.transitions['04->03'], 678);
assert.equal(changes.transitions['03->04'], 414);

assert.deepEqual(changes.demotionMechanisms, {
  'no_P3+no_agency': 234,
  'no_P3': 270,
  'no_agency': 78,
  'no_P3+no_agency+no_rep_depth': 18,
  'no_P3+no_rep_depth': 54,
  'no_agency+no_rep_depth': 6,
  'no_rep_depth': 18,
});

assert.deepEqual(changes.promotionMechanisms, {
  'no_D3': 132,
  'no_expText+no_D3+no_textRep': 42,
  'no_expText+no_D3': 30,
  'no_expText+no_textRep': 30,
  'no_expText': 18,
  'no_D3+no_textRep': 114,
  'no_textRep': 48,
});

assert.equal(changes.demotionsClean, 498);
assert.equal(changes.demotionsWithTB, 180);
assert.equal(changes.promotionsClean, 186);
assert.equal(changes.promotionsWithTB, 228);

assert.equal(boundary.total, 180);
assert.deepEqual(boundary.byQuestion, { Q3: 60, Q4: 48, Q5: 72 });

console.log('OK — amostra estratificada e mecanismos V1 × D congelados.');
