'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const diagnosticoDir = __dirname;
const repoRoot = path.dirname(diagnosticoDir);
const ui = fs.readFileSync(path.join(diagnosticoDir, 'diagnostico-v1-1.js'), 'utf8');
const endpoint = fs.readFileSync(path.join(repoRoot, 'api', 'diagnostico-feedback.php'), 'utf8');

assert.match(ui, /FEEDBACK_ENDPOINT\s*=\s*'\/api\/diagnostico-feedback\.php'/);
assert.match(ui, /feedback_submitted/);
assert.match(ui, /result_viewed/);
assert.match(ui, /roadmap_clicked/);
assert.match(ui, /De 0 a 10, quanto este resultado ajudou você a entender qual pode ser o próximo passo\?/);
assert.match(ui, /Não inclua nomes, e-mails ou outros dados pessoais/);
assert.doesNotMatch(ui, /localStorage|sessionStorage|document\.cookie/);
assert.match(ui, /navigator\.sendBeacon/);

assert.match(endpoint, /r00-private-data/);
assert.match(endpoint, /diagnostico-feedback\.jsonl/);
assert.match(endpoint, /flock\(\$handle, LOCK_EX\)/);
assert.match(endpoint, /\$allowedEvents = \['result_viewed', 'feedback_submitted', 'roadmap_clicked'\]/);
assert.doesNotMatch(endpoint, /REMOTE_ADDR|HTTP_USER_AGENT/);

console.log('OK — contrato de feedback e telemetria mínima validado.');
