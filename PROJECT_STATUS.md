# Estado atual — ROTA ZERO ZERO

Última atualização: **2026-09-18**

Este arquivo é a referência rápida para retomar o projeto. Registra estado, fase e fronteiras atuais. Issues concentram trabalho executável; `docs/` preserva especificações, decisões, evidências e histórico.

## Fase atual

**CRIAÇÃO E VALIDAÇÃO DAS FONTES DA TELA PÓS-DIAGNÓSTICO GRATUITA**

A prioridade operacional atual é consolidar e validar as fontes editoriais e contratuais que sustentarão a tela pós-diagnóstico gratuita / primeiro ciclo guiado antes de implementar essa tela.

A landing e o diagnóstico `R00-DIAG-1.1.0` permanecem funcionais e implementados na `main`. A arquitetura do diagnóstico continua **congelada para o MVP**.

A validação humana do diagnóstico e a validação da coleta de feedback continuam abertas, porém em **observação**: serão conduzidas com calma, profundidade e acúmulo de evidências, sem puxar mudanças apressadas no motor, thresholds, copy ou arquitetura.

## Landing page

**Status:** funcional e publicada.

A landing é a porta de entrada para o diagnóstico e para o Roadmap. Refinamento visual/layout não é prioridade nesta fase.

## Diagnóstico

**Versão:** `R00-DIAG-1.1.0`  
**Status:** implementado; em observação durante validação humana.

Saída estrutural relevante:

- `learningStage`: `00`, `01`, `02` ou `03`;
- `routeDecision`: `EXPLORE_FIRST`, `REDUCE_PROJECT`, `STRUCTURE_PROJECT` ou `SUGGEST_ROUTE`;
- `routeSuggestion`: somente quando há base para sugerir direção;
- `interestTag`: preferência separada do ponto de partida;
- `confidence`, `reasonCodes` e `tiebreakerUsed`.

O resultado é orientação, não nota, prova, certificação ou instrumento psicométrico validado.

A especificação normativa vigente é `docs/diagnostico-deterministico-v1.1.0.md`. O motor executável vigente é `diagnostico/diagnostic-rules-v1-1.js`.

## Integração com o Roadmap

O resultado estruturado de `R00-DIAG-1.1.0` é o contrato de entrada consumido pelo produto pós-diagnóstico mantido no repositório `roadmap-programacao-pais-v2-1`.

Nesse repositório, o contrato do primeiro ciclo é `R00-GUIDED-CYCLE-1.0.0`.

Fronteira atual:

```text
landing/conteúdo
  → R00-DIAG-1.1.0
  → resultado estruturado
  → R00-GUIDED-CYCLE-1.0.0
  → primeiro ciclo guiado gratuito
```

A implementação da tela pós-diagnóstico deve consumir fontes validadas do Roadmap sem duplicar ou reinterpretar silenciosamente o contrato externo.

A criação de uma aplicação autenticada/persistente continua fora do escopo atual e não está congelada como decisão arquitetural.

## Fontes da tela pós-diagnóstico gratuita

**Status:** em andamento.  
**Issue principal:** #30 — Fontes da tela pós-diagnóstico gratuita.

Antes de implementar a tela, é necessário:

1. consolidar as fontes editoriais vigentes;
2. separar fonte canônica, evidência, guardrails e histórico/P&D;
3. validar a correspondência entre a saída do diagnóstico e o primeiro ciclo guiado;
4. delimitar exatamente o conteúdo gratuito;
5. confirmar copy, limites e critérios de avanço;
6. somente depois implementar a experiência pós-diagnóstico.

Trabalho relacionado no repositório do Roadmap: PR #118 — **Consolidar fontes editoriais V2.1 no Roadmap**.

## Feedback e validação comportamental

**Status:** em observação.

Eventos já implementados:

- `result_viewed`;
- `feedback_submitted`;
- `roadmap_clicked`.

A coleta não usa cookies, `localStorage` ou `sessionStorage` e não solicita nome, e-mail, idade ou escola. O armazenamento previsto é `r00-private-data/diagnostico-feedback.jsonl`, fora de `public_html`.

A validação em ambiente real da Hostinger ainda precisa ser concluída, mas não é a prioridade operacional principal neste momento.

## Em andamento

- **#30 — criação e validação das fontes da tela pós-diagnóstico gratuita** — prioridade principal;
- **#23 — validação humana do diagnóstico V1.1** — em observação;
- **#25 — validação da coleta de feedback no Hostinger** — em observação.

## Próximos passos

1. Consolidar e validar as fontes da tela pós-diagnóstico gratuita.
2. Fechar a fronteira do conteúdo gratuito e sua correspondência com `R00-GUIDED-CYCLE-1.0.0`.
3. Validar o mapeamento entre a saída `R00-DIAG-1.1.0` e o primeiro ciclo guiado.
4. Só então implementar a tela pós-diagnóstico gratuita.
5. Manter #23 e #25 em observação e registrar padrões recorrentes, sem alterações precipitadas.
6. Depois da implementação, executar QA funcional, responsivo e de acessibilidade/teclado.
7. Refinamento final de layout e identidade visual somente depois da validação funcional.
8. Revisar indexação e decidir a retirada de `noindex` quando a experiência estiver pronta.

## Fora de escopo agora

- nova revisão científica ampla do motor;
- score total;
- novos thresholds sem evidência de uso;
- expansão do questionário;
- mudança de arquitetura por casos isolados;
- criação automática de terceiro repositório/app;
- login, progresso persistente ou marketplace;
- implementação da tela pós-diagnóstico antes de validar suas fontes;
- refinamento cosmético antes da validação funcional.

## Critério para implementar a tela pós-diagnóstico

A implementação pode começar quando:

- as fontes necessárias estiverem versionadas e com autoridade clara;
- o conteúdo gratuito estiver delimitado;
- o mapeamento entre a saída do diagnóstico e o primeiro ciclo guiado estiver consistente;
- a decisão puder ser reconstruída pelas fontes do repositório sem depender de histórico de chat.

## Critério da observação do diagnóstico

A observação pode ser encerrada quando as perguntas forem entendidas sem confusão recorrente, os resultados forem percebidos como razoáveis diante das respostas, a orientação ajudar a enxergar um próximo passo, não houver padrão recorrente de resultado claramente inadequado e a coleta de feedback/clique estiver confirmada em produção.

Discordâncias pontuais entre estágios próximos não exigem mudança do motor por si só: o diagnóstico indica um **ponto de partida provável**, não uma obrigação de percurso.

## Links operacionais

- Landing: https://rota-zero-zero-landing-145931.hostingersite.com/
- Diagnóstico: https://rota-zero-zero-landing-145931.hostingersite.com/diagnostico/
- Manual de Identidade Visual: https://darkslategrey-goat-979048.hostingersite.com/idv/idv-roadmap.html
- Fontes pós-diagnóstico: https://github.com/igormmatos/rota-zero-zero-landing/issues/30
- Validação humana em observação: https://github.com/igormmatos/rota-zero-zero-landing/issues/23
- Validação da coleta em observação: https://github.com/igormmatos/rota-zero-zero-landing/issues/25

## Regra de manutenção

Atualizar este arquivo apenas quando houver mudança real de fase, estado de componente, contrato entre repositórios ou prioridade principal. Não usar como diário de commits.
