'use strict';

const assert = require('node:assert/strict');
const engine = require('./diagnostic-rules.js');

const C = {
  E0: 'E0_NONE', E1: 'E1_FOLLOWED', E2: 'E2_MODIFIED_VISUAL', E3: 'E3_WRITTEN_SMALL', E4: 'E4_OWN_PROJECT',
  P0: 'P0_NONE', P1: 'P1_AREA', P2: 'P2_IDEA', P3: 'P3_MINIMUM',
  S0: 'S0_VAGUE', S1: 'S1_PARTS_HELP', S2: 'S2_STEPS_RULES', S3: 'S3_CONSEQUENCES',
  M0: 'M0_COPY_ONLY', M1: 'M1_SMALL_HELP', M2: 'M2_SMALL_INDEPENDENT', M3: 'M3_TRANSFER',
  D0: 'D0_STOP', D1: 'D1_TRIAL', D2: 'D2_COMPARE', D3: 'D3_HYPOTHESIS_SOURCE',
  R0: 'R0_NONE', R1: 'R1_VISUAL', R2: 'R2_READ_MODIFY_TEXT', R3: 'R3_WRITE_TEXT',
  WEB: 'I_WEB', AUTO: 'I_AUTOMATION', GAMES: 'I_GAMES', APPS: 'I_APPS', AI: 'I_AI_DATA', UNSURE: 'I_UNSURE',
};

function a(Q1, Q2, Q3, Q4, Q5, Q6, Q7, extra = {}) {
  return { C0: 'SELF', Q1, Q2, Q3, Q4, Q5, Q6, Q7, ...extra };
}

const cases = [
  ['01 Iniciante absoluto', a(C.E0,C.P0,C.S0,C.M0,C.D0,C.R0,C.UNSURE), { stage:'00', route:null, confidence:'HIGH' }],
  ['02 Gosta de jogos, só consumo', a(C.E0,C.P1,C.S0,C.M0,C.D0,C.R0,C.GAMES), { stage:'00', route:null, confidence:'HIGH' }],
  ['03 Só seguiu tutoriais', a(C.E1,C.P0,C.S0,C.M0,C.D0,C.R0,C.WEB), { stage:'01', route:null, confidence:'HIGH' }],
  ['04 Ideia de site ainda nebulosa', a(C.E0,C.P2,C.S0,C.M0,C.D0,C.R0,C.WEB), { stage:'01', route:null, confidence:'HIGH' }],
  ['05 Ideia + separa partes com ajuda', a(C.E0,C.P2,C.S1,C.M0,C.D0,C.R0,C.APPS), { stage:'02', route:null, confidence:'HIGH' }],
  ['06 Scratch guiado + estrutura inicial', a(C.E1,C.P1,C.S1,C.M1,C.D1,C.R1,C.GAMES), { stage:'02', route:null, confidence:'HIGH' }],
  ['07 Modifica Scratch e compara resultado', a(C.E2,C.P2,C.S2,C.M2,C.D2,C.R1,C.GAMES), { stage:'03', route:null, confidence:'HIGH' }],
  ['08 Visual forte, sem rota definida', a(C.E2,C.P0,C.S2,C.M3,C.D2,C.R1,C.UNSURE), { stage:'03', route:null, confidence:'HIGH' }],
  ['09 Lê/modifica código, depura por comparação', a(C.E3,C.P2,C.S2,C.M2,C.D2,C.R2,C.WEB), { stage:'03', route:null, confidence:'HIGH' }],
  ['10 Escreve código, mas depura por tentativa', a(C.E3,C.P3,C.S2,C.M2,C.D1,C.R3,C.AUTO), { stage:'03', route:null, confidence:'HIGH' }],
  ['11 Código + autoria + fonte + hipótese', a(C.E3,C.P3,C.S2,C.M2,C.D3,C.R3,C.WEB), { stage:'04', route:'web', confidence:'HIGH' }],
  ['12 Projeto próprio + ainda não sabe a rota', a(C.E4,C.P3,C.S3,C.M3,C.D3,C.R3,C.UNSURE), { stage:'04', route:'open_exploration', confidence:'HIGH' }],
  ['13 Projeto próprio + interesse em IA/dados', a(C.E4,C.P3,C.S3,C.M3,C.D3,C.R3,C.AI), { stage:'04', route:'ai_data', confidence:'HIGH' }],
  ['14 Nunca programou, mas reduz e estrutura ideia', a(C.E0,C.P3,C.S2,C.M0,C.D0,C.R0,C.APPS), { stage:'02', route:null, confidence:'HIGH' }],
  ['15 Forte no visual, ainda sem escrita confortável', a(C.E2,C.P3,C.S3,C.M3,C.D3,C.R1,C.GAMES), { stage:'03', route:null, confidence:'HIGH' }],
  ['16 Experiência textual, mas dependente de passo a passo', a(C.E3,C.P2,C.S1,C.M0,C.D0,C.R2,C.WEB), { stage:'02', route:null, confidence:'HIGH' }],
  ['17 Contradição E0 x R3/M2/D3', a(C.E0,C.P3,C.S2,C.M2,C.D3,C.R3,C.AUTO,{TB:'T2_YES'}), { stage:'04', route:'automation', confidence:'MEDIUM' }],
  ['18 Contradição projeto próprio x dependência total', a(C.E4,C.P3,C.S2,C.M0,C.D0,C.R3,C.GAMES,{TB:'T0_NOT_YET'}), { stage:'02', route:null, confidence:'MEDIUM' }],
  ['19 Quer Web, mas só há interesse amplo', a(C.E0,C.P1,C.S0,C.M0,C.D0,C.R0,C.WEB), { stage:'00', route:null, confidence:'HIGH' }],
  ['20 Mesmo perfil do caso 11 respondido por responsável', a(C.E3,C.P3,C.S2,C.M2,C.D3,C.R3,C.WEB,{C0:'OTHER'}), { stage:'04', route:'web', confidence:'HIGH' }],
];

for (const [name, input, expected] of cases) {
  const result = engine.classify(input);
  assert.equal(result.stage, expected.stage, `${name}: stage`);
  assert.equal(result.route, expected.route, `${name}: route`);
  assert.equal(result.confidence, expected.confidence, `${name}: confidence`);
  assert.equal(result.interestTag, input.Q7, `${name}: interestTag`);
  assert.equal(result.routeMode, expected.stage === '04' ? 'route' : 'context', `${name}: routeMode`);
}

// Q7 sozinho nunca muda a etapa.
{
  const base = a(C.E2,C.P2,C.S2,C.M2,C.D2,C.R1,C.GAMES);
  const stages = [C.WEB,C.AUTO,C.GAMES,C.APPS,C.AI,C.UNSURE].map(Q7 => engine.classify({...base,Q7}).stage);
  assert.equal(new Set(stages).size, 1, 'Q7 não pode mudar stage');
}

// SELF/OTHER nunca muda etapa nem rota.
{
  const base = a(C.E3,C.P3,C.S2,C.M2,C.D3,C.R3,C.WEB);
  const self = engine.classify(base);
  const other = engine.classify({...base,C0:'OTHER'});
  assert.equal(self.stage, other.stage);
  assert.equal(self.route, other.route);
}

// I_UNSURE em 04 sempre vira exploração aberta.
{
  const result = engine.classify(a(C.E4,C.P3,C.S3,C.M3,C.D3,C.R3,C.UNSURE));
  assert.equal(result.stage, '04');
  assert.equal(result.route, 'open_exploration');
  assert(result.reasonCodes.includes('OPEN_EXPLORATION_IS_VALID'));
}

// Conflito sem TB deve exigir desempate, nunca classificar silenciosamente.
{
  const conflicting = a(C.E0,C.P3,C.S2,C.M2,C.D3,C.R3,C.AUTO);
  assert.equal(engine.requiresTiebreaker(conflicting), true);
  assert.throws(() => engine.classify(conflicting), err => err && err.code === 'TIEBREAKER_REQUIRED');
}

// Mesmas respostas = mesma saída completa.
{
  const input = a(C.E3,C.P3,C.S2,C.M2,C.D3,C.R3,C.WEB);
  assert.deepEqual(engine.classify(input), engine.classify({...input}));
}

// Contrato de versão e reason codes básicos.
{
  const result = engine.classify(a(C.E3,C.P3,C.S2,C.M2,C.D3,C.R3,C.WEB));
  assert.equal(result.algorithmVersion, 'R00-DIAG-1.0.0');
  assert(result.reasonCodes.includes('HAS_TEXTUAL_EXPERIENCE'));
  assert(result.reasonCodes.includes('USES_HYPOTHESIS_AND_SOURCE'));
}

console.log(`OK — ${cases.length} perfis de regressão + invariantes passaram (${engine.ALGORITHM_VERSION}).`);
