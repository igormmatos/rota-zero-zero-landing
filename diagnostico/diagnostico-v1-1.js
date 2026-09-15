(function () {
  'use strict';

  const engine = window.RotaZeroZeroDiagnosticV11;
  const copy = window.RotaZeroZeroDiagnosticCopyV11;

  const app = document.querySelector('[data-diagnostic-app]');
  if (!app || !engine || !copy) return;

  const intro = app.querySelector('[data-screen="intro"]');
  const dynamic = app.querySelector('[data-diagnostic-dynamic]');
  const startButton = app.querySelector('[data-action="start"]');
  const live = app.querySelector('[data-diagnostic-live]');

  const QUESTION_ORDER = ['C0', 'Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'];
  const ROADMAP_URL = 'https://darkslategrey-goat-979048.hostingersite.com/roadmap-completo.html';
  const answers = {};
  let currentKey = null;

  function escapeHTML(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function announce(message) {
    if (!live) return;
    live.textContent = '';
    requestAnimationFrame(() => { live.textContent = message; });
  }

  function showDynamic() {
    intro.hidden = true;
    dynamic.hidden = false;
  }

  function focusHeading() {
    const heading = dynamic.querySelector('[data-focus-heading]');
    if (!heading) return;
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: false });
  }

  function progressFor(key) {
    if (key === 'TB') return { label: 'Pergunta extra', value: 100 };
    if (key === 'C0') return { label: 'Antes de começar', value: 0 };
    const questionNumber = Number(key.slice(1));
    return {
      label: `Pergunta ${questionNumber} de 7`,
      value: Math.round((questionNumber / 7) * 100),
    };
  }

  function renderQuestion(key) {
    currentKey = key;
    showDynamic();

    const q = copy.getQuestion(key);
    const progress = progressFor(key);
    const selected = answers[key] || '';
    const canGoBack = key !== 'C0';

    const options = q.options.map(([value, label, detail], index) => {
      const id = `answer-${key}-${index}`;
      const checked = value === selected ? ' checked' : '';
      return `
        <label class="diagnostic-option" for="${id}">
          <input id="${id}" type="radio" name="answer" value="${escapeHTML(value)}"${checked}>
          <span class="diagnostic-option-marker" aria-hidden="true"></span>
          <span class="diagnostic-option-copy">
            <span class="diagnostic-option-title">${escapeHTML(label)}</span>
            ${detail ? `<span class="diagnostic-option-detail">${escapeHTML(detail)}</span>` : ''}
          </span>
        </label>`;
    }).join('');

    dynamic.innerHTML = `
      <section class="diagnostic-panel diagnostic-question" aria-labelledby="diagnostic-question-title">
        <div class="diagnostic-progress-block" aria-label="Progresso do diagnóstico">
          <div class="diagnostic-progress-meta">
            <span>${escapeHTML(progress.label)}</span>
            <span>${progress.value}%</span>
          </div>
          <div class="diagnostic-progress-track" aria-hidden="true"><span style="width:${progress.value}%"></span></div>
        </div>

        <form data-question-form>
          <fieldset>
            <legend class="sr-only">${escapeHTML(q.title)}</legend>
            <p class="kicker kicker-green">${escapeHTML(q.eyebrow)}</p>
            <h1 id="diagnostic-question-title" data-focus-heading>${escapeHTML(q.title)}</h1>
            <p class="diagnostic-helper">${escapeHTML(q.helper)}</p>
            <div class="diagnostic-options">${options}</div>
          </fieldset>

          <div class="diagnostic-actions">
            ${canGoBack ? '<button class="diagnostic-text-button" type="button" data-action="back">← Voltar</button>' : '<span></span>'}
            <button class="button button-green diagnostic-next" type="submit"${selected ? '' : ' disabled'}>Continuar <span aria-hidden="true">→</span></button>
          </div>
        </form>
      </section>`;

    const form = dynamic.querySelector('[data-question-form]');
    const nextButton = dynamic.querySelector('.diagnostic-next');

    form.addEventListener('change', (event) => {
      if (event.target.name !== 'answer') return;
      nextButton.disabled = false;
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const value = data.get('answer');
      if (!value) return;
      answers[key] = value;
      advanceFrom(key);
    });

    const backButton = dynamic.querySelector('[data-action="back"]');
    if (backButton) backButton.addEventListener('click', goBack);

    announce(`${progress.label}. ${q.title}`);
    focusHeading();
  }

  function advanceFrom(key) {
    if (key === 'TB') {
      renderResult();
      return;
    }

    const index = QUESTION_ORDER.indexOf(key);
    if (index < QUESTION_ORDER.length - 1) {
      renderQuestion(QUESTION_ORDER[index + 1]);
      return;
    }

    delete answers.TB;
    if (engine.requiresTiebreaker(answers)) {
      renderQuestion('TB');
      return;
    }

    renderResult();
  }

  function goBack() {
    if (currentKey === 'TB') {
      delete answers.TB;
      renderQuestion('Q7');
      return;
    }

    const index = QUESTION_ORDER.indexOf(currentKey);
    if (index > 0) {
      renderQuestion(QUESTION_ORDER[index - 1]);
      return;
    }

    renderIntro();
  }

  function reasonList(items) {
    if (!items.length) return '';
    return `
      <div class="diagnostic-reasons" aria-labelledby="diagnostic-reasons-title">
        <p class="diagnostic-result-label" id="diagnostic-reasons-title">O que pesou no resultado</p>
        <ul>
          ${items.map((item) => `
            <li class="${item.kind === 'limit' ? 'is-limit' : 'is-positive'}">
              <span aria-hidden="true">${item.kind === 'limit' ? '→' : '✓'}</span>
              ${escapeHTML(item.text)}
            </li>`).join('')}
        </ul>
      </div>`;
  }

  function renderResult() {
    let result;
    try {
      result = engine.classify(answers);
    } catch (error) {
      if (error && error.code === 'TIEBREAKER_REQUIRED') {
        renderQuestion('TB');
        return;
      }
      renderError();
      return;
    }

    currentKey = 'RESULT';
    showDynamic();
    const text = copy.getResultCopy(result);

    dynamic.innerHTML = `
      <section class="diagnostic-panel diagnostic-result" data-stage="${escapeHTML(result.learningStage)}" data-route-decision="${escapeHTML(result.routeDecision)}" aria-labelledby="diagnostic-result-title">
        <div class="diagnostic-result-topline">
          <p class="kicker kicker-green">Seu mapa começa aqui</p>
        </div>

        <div class="diagnostic-result-hero">
          <div class="diagnostic-stage-node" aria-hidden="true"><span>${escapeHTML(result.learningStage)}</span></div>
          <div>
            <h1 id="diagnostic-result-title" data-focus-heading>${escapeHTML(text.heading)}</h1>
            <p class="diagnostic-result-body">${escapeHTML(text.stageBody)}</p>
          </div>
        </div>

        <div class="diagnostic-decision" aria-labelledby="diagnostic-decision-title">
          <p class="diagnostic-result-label">Próxima decisão do projeto</p>
          <h2 id="diagnostic-decision-title">${escapeHTML(text.decisionTitle)}</h2>
          <p>${escapeHTML(text.decisionBody)}</p>
        </div>

        <div class="diagnostic-direction">
          <img src="../assets/idv/icon-compass-cover.svg" alt="" aria-hidden="true">
          <div>
            <p class="diagnostic-result-label">Orientação agora</p>
            <p>${escapeHTML(text.direction)}</p>
          </div>
        </div>

        ${reasonList(text.reasons)}
        ${text.confidenceNote ? `<p class="diagnostic-confidence">${escapeHTML(text.confidenceNote)}</p>` : ''}

        <div class="diagnostic-boundary">
          <p><strong>Este resultado é uma orientação, não uma nota ou certificação.</strong> Ele separa o ponto de partida para aprender da próxima decisão do projeto. O Roadmap completo detalha o que fazer, como fazer e o que observar ao longo do caminho.</p>
        </div>

        <div class="diagnostic-result-actions">
          <a class="button button-dark" href="${ROADMAP_URL}" target="_blank" rel="noopener noreferrer">Conhecer o Roadmap <span aria-hidden="true">→</span></a>
          <button class="diagnostic-text-button" type="button" data-action="restart">Refazer diagnóstico</button>
        </div>
      </section>`;

    dynamic.querySelector('[data-action="restart"]').addEventListener('click', restart);
    announce(`Resultado: ${text.heading}. ${text.decisionTitle}`);
    focusHeading();
  }

  function renderError() {
    currentKey = 'ERROR';
    showDynamic();
    dynamic.innerHTML = `
      <section class="diagnostic-panel diagnostic-error" role="alert">
        <p class="kicker kicker-terra">Não foi possível concluir</p>
        <h1 data-focus-heading>O diagnóstico encontrou um problema.</h1>
        <p>Suas respostas não foram enviadas para nenhum servidor. Você pode recomeçar agora.</p>
        <button class="button button-dark" type="button" data-action="restart">Recomeçar</button>
      </section>`;
    dynamic.querySelector('[data-action="restart"]').addEventListener('click', restart);
    focusHeading();
  }

  function restart() {
    for (const key of Object.keys(answers)) delete answers[key];
    renderQuestion('C0');
  }

  function renderIntro() {
    currentKey = null;
    dynamic.hidden = true;
    dynamic.innerHTML = '';
    intro.hidden = false;
    startButton.focus();
  }

  startButton.addEventListener('click', () => renderQuestion('C0'));
})();
