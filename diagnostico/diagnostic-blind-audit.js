'use strict';

const fs = require('node:fs');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');
const engine = require('./diagnostic-rules.js');
const copy = require('./diagnostic-copy.js');

const STAGES = ['00', '01', '02', '03', '04'];
const STAGE_LABELS = Object.freeze({
  '00': 'Descobrir',
  '01': 'Pensar',
  '02': 'Criar visualmente',
  '03': 'Escrever lógica',
  '04': 'Escolher um caminho',
});

const BASE = Object.freeze({
  C0: 'SELF',
  Q1: 'E0_NONE',
  Q2: 'P0_NONE',
  Q3: 'S0_VAGUE',
  Q4: 'M0_COPY_ONLY',
  Q5: 'D0_STOP',
  Q6: 'R0_NONE',
  Q7: 'I_UNSURE',
});

function profile(overrides) {
  return { ...BASE, ...overrides };
}

const PAIRS = Object.freeze([
  {
    id: 'B01',
    focus: 'Fronteira Q3: organizar partes com ajuda → descrever passos/regras',
    changed: 'Q3',
    a: profile({ Q1:'E3_WRITTEN_SMALL', Q2:'P3_MINIMUM', Q3:'S1_PARTS_HELP', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_WEB' }),
    b: profile({ Q1:'E3_WRITTEN_SMALL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_WEB' }),
  },
  {
    id: 'B02',
    focus: 'Fronteira Q4: pequena mudança com ajuda → pequena mudança sozinho',
    changed: 'Q4',
    a: profile({ Q1:'E3_WRITTEN_SMALL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M1_SMALL_HELP', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_AUTOMATION' }),
    b: profile({ Q1:'E3_WRITTEN_SMALL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_AUTOMATION' }),
  },
  {
    id: 'B03',
    focus: 'Desempate: ainda não → sim, com alguma ajuda',
    changed: 'TB',
    a: profile({ Q1:'E0_NONE', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_GAMES', TB:'T0_NOT_YET' }),
    b: profile({ Q1:'E0_NONE', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_GAMES', TB:'T1_WITH_HELP' }),
  },
  {
    id: 'B04',
    focus: 'Desempate: sim, com alguma ajuda → sim',
    changed: 'TB',
    a: profile({ Q1:'E0_NONE', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_GAMES', TB:'T1_WITH_HELP' }),
    b: profile({ Q1:'E0_NONE', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_GAMES', TB:'T2_YES' }),
  },
  {
    id: 'B05',
    focus: 'Fronteira Q3 inicial: ideia vaga → separar partes com ajuda',
    changed: 'Q3',
    a: profile({ Q2:'P3_MINIMUM', Q3:'S0_VAGUE', Q7:'I_APPS' }),
    b: profile({ Q2:'P3_MINIMUM', Q3:'S1_PARTS_HELP', Q7:'I_APPS' }),
  },
  {
    id: 'B06',
    focus: 'Fronteira Q4 inicial: depende do passo a passo → modifica com ajuda',
    changed: 'Q4',
    a: profile({ Q2:'P1_AREA', Q4:'M0_COPY_ONLY', Q7:'I_WEB' }),
    b: profile({ Q2:'P1_AREA', Q4:'M1_SMALL_HELP', Q7:'I_WEB' }),
  },
  {
    id: 'B07',
    focus: 'Fronteira Q5: tentativa e erro → comparação sistemática',
    changed: 'Q5',
    a: profile({ Q1:'E2_MODIFIED_VISUAL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D1_TRIAL', Q6:'R1_VISUAL', Q7:'I_GAMES' }),
    b: profile({ Q1:'E2_MODIFIED_VISUAL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D2_COMPARE', Q6:'R1_VISUAL', Q7:'I_GAMES' }),
  },
  {
    id: 'B08',
    focus: 'Fronteira Q6: ler/modificar código → escrever pequeno programa',
    changed: 'Q6',
    a: profile({ Q1:'E2_MODIFIED_VISUAL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R2_READ_MODIFY_TEXT', Q7:'I_WEB' }),
    b: profile({ Q1:'E2_MODIFIED_VISUAL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_WEB' }),
  },
  {
    id: 'B09',
    focus: 'Fronteira Q1: modificou visualmente → escreveu/modificou código textual',
    changed: 'Q1',
    a: profile({ Q1:'E2_MODIFIED_VISUAL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R2_READ_MODIFY_TEXT', Q7:'I_WEB' }),
    b: profile({ Q1:'E3_WRITTEN_SMALL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R2_READ_MODIFY_TEXT', Q7:'I_WEB' }),
  },
  {
    id: 'B10',
    focus: 'Fronteira Q2: interesse por área → ideia concreta',
    changed: 'Q2',
    a: profile({ Q2:'P1_AREA', Q7:'I_AI_DATA' }),
    b: profile({ Q2:'P2_IDEA', Q7:'I_AI_DATA' }),
  },
  {
    id: 'B11',
    focus: 'Invariante Q7: jogos → web não deve mudar a etapa',
    changed: 'Q7',
    a: profile({ Q1:'E2_MODIFIED_VISUAL', Q2:'P2_IDEA', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D2_COMPARE', Q6:'R1_VISUAL', Q7:'I_GAMES' }),
    b: profile({ Q1:'E2_MODIFIED_VISUAL', Q2:'P2_IDEA', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D2_COMPARE', Q6:'R1_VISUAL', Q7:'I_WEB' }),
  },
  {
    id: 'B12',
    focus: 'Invariante C0: responder por mim → por outra pessoa',
    changed: 'C0',
    a: profile({ C0:'SELF', Q1:'E3_WRITTEN_SMALL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_APPS' }),
    b: profile({ C0:'OTHER', Q1:'E3_WRITTEN_SMALL', Q2:'P3_MINIMUM', Q3:'S2_STEPS_RULES', Q4:'M2_SMALL_INDEPENDENT', Q5:'D3_HYPOTHESIS_SOURCE', Q6:'R3_WRITE_TEXT', Q7:'I_APPS' }),
  },
]);

function optionLabel(questionKey, code) {
  if (questionKey === 'TB') {
    const found = copy.QUESTIONS.TB.options.find(([value]) => value === code);
    return found ? found[1] : code;
  }
  const question = copy.QUESTIONS[questionKey];
  if (!question) return code;
  const found = question.options.find(([value]) => value === code);
  return found ? found[1] : code;
}

function changedKeys(a, b) {
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...keys].filter((key) => a[key] !== b[key]);
}

function printProfilePair(pair) {
  output.write(`\n${'='.repeat(76)}\n${pair.id} — ${pair.focus}\n${'='.repeat(76)}\n`);
  const keys = ['C0','Q1','Q2','Q3','Q4','Q5','Q6','Q7'];
  for (const key of keys) {
    const left = optionLabel(key, pair.a[key]);
    const right = optionLabel(key, pair.b[key]);
    if (pair.a[key] === pair.b[key]) {
      output.write(`${key}: ${left}\n`);
    } else {
      output.write(`${key} A: ${left}\n${key} B: ${right}\n`);
    }
  }
  if (pair.a.TB || pair.b.TB) {
    const left = optionLabel('TB', pair.a.TB);
    const right = optionLabel('TB', pair.b.TB);
    if (pair.a.TB === pair.b.TB) output.write(`TB: ${left}\n`);
    else output.write(`TB A: ${left}\nTB B: ${right}\n`);
  }
}

async function askStage(rl, label) {
  while (true) {
    const raw = (await rl.question(`${label} — etapa esperada [00/01/02/03/04]: `)).trim();
    if (STAGES.includes(raw)) return raw;
    output.write('Digite apenas 00, 01, 02, 03 ou 04.\n');
  }
}

async function askClarity(rl) {
  while (true) {
    const raw = (await rl.question('A diferença entre A e B parece semanticamente clara? [0=não / 1=parcial / 2=sim]: ')).trim();
    if (['0','1','2'].includes(raw)) return Number(raw);
    output.write('Digite 0, 1 ou 2.\n');
  }
}

function comparePair(pair, human) {
  const actualA = engine.classify(pair.a);
  const actualB = engine.classify(pair.b);
  return {
    id: pair.id,
    focus: pair.focus,
    changed: pair.changed,
    changedKeys: changedKeys(pair.a, pair.b),
    human,
    engine: {
      a: { stage: actualA.stage, label: actualA.stageLabel, route: actualA.route, confidence: actualA.confidence },
      b: { stage: actualB.stage, label: actualB.stageLabel, route: actualB.route, confidence: actualB.confidence },
    },
    exactA: human.stageA === actualA.stage,
    exactB: human.stageB === actualB.stage,
    sameStageJudgmentMatches: (human.stageA === human.stageB) === (actualA.stage === actualB.stage),
  };
}

function printReveal(rows) {
  output.write(`\n\n${'#'.repeat(76)}\nRESULTADO DA AUDITORIA CEGA\n${'#'.repeat(76)}\n`);
  let exact = 0;
  let relation = 0;
  for (const row of rows) {
    exact += Number(row.exactA) + Number(row.exactB);
    relation += Number(row.sameStageJudgmentMatches);
    output.write(`\n${row.id} — ${row.focus}\n`);
    output.write(`Humano: A=${row.human.stageA} (${STAGE_LABELS[row.human.stageA]}) | B=${row.human.stageB} (${STAGE_LABELS[row.human.stageB]})\n`);
    output.write(`Motor : A=${row.engine.a.stage} (${row.engine.a.label}) | B=${row.engine.b.stage} (${row.engine.b.label})\n`);
    output.write(`Relação A/B: ${row.sameStageJudgmentMatches ? 'ALINHADA' : 'DIVERGENTE'} | Clareza semântica=${row.human.clarity}/2\n`);
    if (row.human.note) output.write(`Nota do auditor: ${row.human.note}\n`);
  }
  output.write(`\nAcerto exato de etapa: ${exact}/${rows.length * 2}\n`);
  output.write(`Concordância sobre manter/mudar etapa: ${relation}/${rows.length}\n`);
  output.write('Importante: discordância não significa automaticamente erro do auditor nem do motor; ela indica fronteira para revisão.\n');
}

function parseOutPath(argv) {
  const arg = argv.find((item) => item.startsWith('--out='));
  return arg ? arg.slice('--out='.length) : null;
}

async function main() {
  const rl = readline.createInterface({ input, output });
  const humanRows = [];

  output.write('ROTA ZERO ZERO — Auditoria cega por pares mínimos\n');
  output.write('Você verá 12 pares. O motor só será revelado depois de todas as respostas.\n');
  output.write('Julgue o ponto de partida provável, não “quanto a pessoa sabe”.\n\n');

  try {
    for (const pair of PAIRS) {
      printProfilePair(pair);
      const stageA = await askStage(rl, 'Perfil A');
      const stageB = await askStage(rl, 'Perfil B');
      const clarity = await askClarity(rl);
      const note = (await rl.question('Observação opcional sobre a fronteira: ')).trim();
      humanRows.push({ stageA, stageB, clarity, note });
    }
  } finally {
    rl.close();
  }

  const rows = PAIRS.map((pair, index) => comparePair(pair, humanRows[index]));
  printReveal(rows);

  const outPath = parseOutPath(process.argv.slice(2));
  if (outPath) {
    const payload = {
      auditVersion: 'R00-BLIND-AUDIT-1.0.0',
      algorithmVersion: engine.ALGORITHM_VERSION,
      generatedAt: new Date().toISOString(),
      rows,
    };
    fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
    output.write(`\nRelatório salvo em: ${outPath}\n`);
  }
}

module.exports = Object.freeze({ PAIRS, changedKeys, comparePair });

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
