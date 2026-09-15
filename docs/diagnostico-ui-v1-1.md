# Diagnóstico ROTA ZERO ZERO — UI V1.1

**Status:** adaptação da interface para o motor `R00-DIAG-1.1.0`. Mantém `noindex,follow` até QA manual final.

## Objetivo

Atualizar a experiência pública para refletir a arquitetura normativa V1.1 sem reintroduzir a antiga Etapa 04 como nível de aprendizagem.

A tela de resultado passa a separar claramente:

1. **Ponto de partida para aprender** — `learningStage` 00–03;
2. **Próxima decisão do projeto** — `routeDecision`;
3. **Direção sugerida** — somente quando `routeDecision = SUGGEST_ROUTE`.

## Fluxo

- contexto `C0` aparece como **Antes de começar** e não é contado como uma das sete perguntas;
- Q1–Q7 aparecem como **Pergunta 1 de 7** até **Pergunta 7 de 7**;
- o TB aparece somente quando o motor V1.1 identifica `H2_AUTHORSHIP_WITHOUT_CREATION`;
- respostas anteriores permanecem selecionadas ao voltar;
- nenhum dado é salvo em `localStorage` ou enviado a servidor.

## Resultado

A hierarquia pública é:

- `Seu ponto de partida provável é 00–03 — <rótulo>`;
- explicação do estágio;
- card **Próxima decisão do projeto** com o texto humano de `routeDecision`;
- bloco **Orientação agora** com interesse atual ou rota sugerida;
- até dois sinais positivos e um limite;
- nota de confiança apenas quando `confidence = MEDIUM`;
- fronteira editorial deixando explícito que o diagnóstico não é nota nem certificação.

A versão interna do algoritmo deixa de ser exibida visualmente na tela pública.

## Arquivos

- `diagnostico/index.html` — passa a carregar os módulos V1.1;
- `diagnostico/diagnostico-v1-1.js` — fluxo e renderização;
- `diagnostico/diagnostico-v1-1.css` — estilos adicionais da nova decisão de projeto;
- `diagnostico/diagnostic-ui-v1-1-contract-tests.js` — contrato entre motor, copy, HTML e UI.

Os arquivos V1 antigos permanecem no repositório para histórico e comparação.

## Regras preservadas

- `noindex,follow` permanece ativo;
- radios continuam nativos;
- foco vai para o título da nova tela após cada transição;
- `aria-live` anuncia pergunta e resultado;
- botão Voltar preserva resposta anterior;
- reinício apaga somente o estado em memória;
- CTA do Roadmap continua externo e abre com `noopener noreferrer`.

## Critérios antes de indexar/publicar como versão final

1. testes de contrato V1.1;
2. QA visual em desktop e mobile;
3. navegação completa apenas por teclado;
4. verificação de foco e leitura do resultado;
5. teste dos quatro `routeDecision`;
6. teste do TB de autoria;
7. validação do CTA e responsividade;
8. somente depois remover `noindex` por decisão explícita.
