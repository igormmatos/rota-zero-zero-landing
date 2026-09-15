'use strict';

const fs = require('node:fs');
const engine = require('./diagnostic-rules.js');

const VALUES = Object.freeze({
  Q1: ['E0_NONE', 'E1_FOLLOWED', 'E2_MODIFIED_VISUAL', 'E3_WRITTEN_SMALL', 'E4_OWN_PROJECT'],
  Q2: ['P0_NONE', 'P1_AREA', 'P2_IDEA', 'P3_MINIMUM'],
  Q3: ['S0_VAGUE', 'S1_PARTS_HELP', 'S2_STEPS_RULES', 'S3_CONSEQUENCES'],
  Q4: ['M0_COPY_ONLY', 'M1_SMALL_HELP', 'M2_SMALL_INDEPENDENT', 'M3_TRANSFER'],
  Q5: ['D0_STOP', 'D1_TRIAL', 'D2_COMPARE', 'D3_HYPOTHESIS_SOURCE'],
  Q6: ['R0_NONE', 'R1_VISUAL', 'R2_READ_MODIFY_TEXT', 'R3_WRITE_TEXT'],
  Q7: ['I_WEB', 'I_AUTOMATION', 'I_GAMES', 'I_APPS', 'I_AI_DATA', 'I_UNSURE'],
  TB: ['T0_NOT_YET', 'T1_WITH_HELP', 'T2_YES'],
});

const QUESTIONS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'];
const ORDINAL_QUESTIONS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'];
const STAGES = ['00', '01', '02', '03', '04'];

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
  if (!conflicts.length) return [{ ...raw, TB: null, conflicts }];
  return VALUES.TB.map(TB => ({ ...raw, TB, conflicts }));
}

function inc(map, key, n = 1) {
  map[key] = (map[key] || 0) + n;
}

function csvEscape(value) {
  if (value == null) return '';
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

function resultRow(scenario, result) {
  return {
    ...Object.fromEntries(QUESTIONS.map(q => [q, scenario[q]])),
    TB: scenario.TB || '',
    conflicts: scenario.conflicts.join('+'),
    stage: result.stage,
    stageLabel: result.stageLabel,
    interestTag: result.interestTag,
    route: result.route || '',
    routeMode: result.routeMode,
    confidence: result.confidence,
    reasonCodes: result.reasonCodes.join('|'),
  };
}

function auditAll() {
  const summary = {
    algorithmVersion: engine.ALGORITHM_VERSION,
    baseCombinations: 0,
    conflictCombinations: 0,
    classifiedScenarios: 0,
    stageDistribution: Object.fromEntries(STAGES.map(s => [s, 0])),
    conflictDistribution: {},
    tiebreakerDistribution: {},
    invariantFailures: [],
    boundary: Object.fromEntries(ORDINAL_QUESTIONS.map(q => [q, {
      comparedPairs: 0,
      regressions: 0,
      jumpsByDelta: {},
      jumpOverOne: 0,
      examples: [],
    }])),
  };

  const rows = [];

  for (const raw of baseCombinations()) {
    summary.baseCombinations += 1;
    const conflicts = engine.detectHardConflicts(raw);
    if (conflicts.length) {
      summary.conflictCombinations += 1;
      inc(summary.conflictDistribution, conflicts.join('+'));

      let required = false;
      try {
        engine.classify(raw);
      } catch (error) {
        required = error && error.code === 'TIEBREAKER_REQUIRED';
      }
      if (!required) {
        summary.invariantFailures.push({
          invariant: 'hard conflict requires TB',
          input: raw,
          conflicts,
        });
      }
    }

    for (const scenario of scenariosFor(raw)) {
      const input = { ...scenario };
      delete input.conflicts;
      if (input.TB == null) delete input.TB;

      const result = engine.classify(input);
      const repeated = engine.classify({ ...input });
      summary.classifiedScenarios += 1;
      summary.stageDistribution[result.stage] += 1;
      if (scenario.TB) inc(summary.tiebreakerDistribution, `${scenario.TB}:${result.stage}`);

      if (JSON.stringify(result) !== JSON.stringify(repeated)) {
        summary.invariantFailures.push({ invariant: 'determinism', input });
      }

      const other = engine.classify({ ...input, C0: 'OTHER' });
      if (result.stage !== other.stage || result.route !== other.route || result.interestTag !== other.interestTag) {
        summary.invariantFailures.push({ invariant: 'SELF/OTHER independence', input, result, other });
      }

      if (result.stage === '04') {
        if (result.routeMode !== 'route' || result.route == null) {
          summary.invariantFailures.push({ invariant: 'stage 04 activates route', input, result });
        }
        if (input.Q7 === 'I_UNSURE' && result.route !== 'open_exploration') {
          summary.invariantFailures.push({ invariant: 'I_UNSURE at 04 is open exploration', input, result });
        }
      } else if (result.route !== null || result.routeMode !== 'context') {
        summary.invariantFailures.push({ invariant: 'stage 00-03 has no route', input, result });
      }

      rows.push(resultRow(scenario, result));
    }
  }

  // Interesse nunca muda a etapa. Compara as seis opções mantendo Q1-Q6 fixos.
  for (const Q1 of VALUES.Q1)
  for (const Q2 of VALUES.Q2)
  for (const Q3 of VALUES.Q3)
  for (const Q4 of VALUES.Q4)
  for (const Q5 of VALUES.Q5)
  for (const Q6 of VALUES.Q6) {
    const core = { C0: 'SELF', Q1, Q2, Q3, Q4, Q5, Q6 };
    const probe = { ...core, Q7: 'I_WEB' };
    const conflicts = engine.detectHardConflicts(probe);
    const tbs = conflicts.length ? VALUES.TB : [null];

    for (const TB of tbs) {
      const stages = new Set();
      for (const Q7 of VALUES.Q7) {
        const input = { ...core, Q7 };
        if (TB) input.TB = TB;
        stages.add(engine.classify(input).stage);
      }
      if (stages.size !== 1) {
        summary.invariantFailures.push({
          invariant: 'Q7 interest independence',
          core,
          TB,
          stages: [...stages],
        });
      }
    }
  }

  // Teste de fronteira: sobe uma alternativa ordinal por vez. Casos que entram/saem
  // de conflito não são comparados aqui, porque passam a exigir TB e deixam de ser
  // pares semanticamente equivalentes para este teste.
  for (const raw of baseCombinations()) {
    if (engine.requiresTiebreaker(raw)) continue;
    const before = engine.classify(raw);

    for (const q of ORDINAL_QUESTIONS) {
      const values = VALUES[q];
      const i = values.indexOf(raw[q]);
      if (i < 0 || i === values.length - 1) continue;

      const next = { ...raw, [q]: values[i + 1] };
      if (engine.requiresTiebreaker(next)) continue;

      const after = engine.classify(next);
      const delta = Number(after.stage) - Number(before.stage);
      const bucket = summary.boundary[q];
      bucket.comparedPairs += 1;
      inc(bucket.jumpsByDelta, String(delta));

      if (delta < 0) {
        bucket.regressions += 1;
        if (bucket.examples.length < 5) bucket.examples.push({ type: 'regression', before: raw, after: next, stages: [before.stage, after.stage] });
      }

      if (delta > 1) {
        bucket.jumpOverOne += 1;
        if (bucket.examples.length < 5) bucket.examples.push({ type: 'jump_over_one', before: raw, after: next, stages: [before.stage, after.stage] });
      }
    }
  }

  return { summary, rows };
}

function toCsv(rows) {
  const headers = ['Q1','Q2','Q3','Q4','Q5','Q6','Q7','TB','conflicts','stage','stageLabel','interestTag','route','routeMode','confidence','reasonCodes'];
  return [
    headers.join(','),
    ...rows.map(row => headers.map(h => csvEscape(row[h])).join(',')),
  ].join('\n') + '\n';
}

function parseOutputArg(prefix) {
  const arg = process.argv.slice(2).find(x => x.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : null;
}

function main() {
  const { summary, rows } = auditAll();
  const jsonPath = parseOutputArg('--json=');
  const csvPath = parseOutputArg('--csv=');

  if (jsonPath) fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2) + '\n');
  if (csvPath) fs.writeFileSync(csvPath, toCsv(rows));

  console.log(JSON.stringify(summary, null, 2));

  const regressionCount = Object.values(summary.boundary).reduce((n, b) => n + b.regressions, 0);
  if (summary.invariantFailures.length || regressionCount) {
    process.exitCode = 1;
  }
}

if (require.main === module) main();

module.exports = { auditAll, toCsv, VALUES };
