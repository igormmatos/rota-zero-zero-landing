# Estado atual — ROTA ZERO ZERO

Última atualização: **2026-09-18**

Este arquivo é a referência rápida para retomar o projeto. Registra estado, fase e fronteiras atuais. Issues concentram trabalho executável; `docs/` preserva especificações, decisões, evidências e histórico.

## Fase atual

**VALIDAÇÃO HUMANA DO DIAGNÓSTICO V1.1 + PREPARAÇÃO DA INTEGRAÇÃO COM O PRIMEIRO CICLO GUIADO**

O motor, a copy pública, a interface V1.1 e a coleta mínima de feedback estão implementados na `main`.

A arquitetura do diagnóstico está **congelada para o MVP**. Não alterar regras, thresholds ou critérios por preferência pontual. Mudanças semânticas ou de motor exigem padrão recorrente de validação ou problema reproduzível.

## Landing page

**Status:** funcional e publicada.

A landing é a porta de entrada para o diagnóstico e para o Roadmap. Refinamento visual/layout não deve preceder validação humana e QA funcional.

## Diagnóstico

**Versão:** `R00-DIAG-1.1.0`  
**Status:** implementado; validação humana em andamento.

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
  → primeiro ciclo guiado
```

Esta integração lógica não significa que a aplicação autenticada/persistente do ciclo guiado já esteja implementada. A criação de um terceiro repositório/app também não está congelada como decisão arquitetural.

## Feedback e validação comportamental

**Status:** implementado; validação no ambiente real da Hostinger ainda pendente.

Eventos:

- `result_viewed`;
- `feedback_submitted`;
- `roadmap_clicked`.

A coleta não usa cookies, `localStorage` ou `sessionStorage` e não solicita nome, e-mail, idade ou escola. O armazenamento previsto é `r00-private-data/diagnostico-feedback.jsonl`, fora de `public_html`.

## Em andamento

- **#23 — Validação humana do diagnóstico V1.1**
- **#25 — Validar coleta de feedback no Hostinger pelo computador**

## Próximos passos

1. Validar a coleta no ambiente real da Hostinger.
2. Rodar validação humana com usuários reais.
3. Corrigir apenas problemas semânticos ou funcionais recorrentes.
4. Executar QA funcional, responsivo e de acessibilidade/teclado.
5. Validar a passagem do resultado estruturado para o primeiro ciclo guiado.
6. Fazer refinamento final de layout e identidade visual.
7. Revisar indexação e decidir a retirada de `noindex`.

## Fora de escopo agora

- nova revisão científica ampla do motor;
- score total;
- novos thresholds sem evidência de uso;
- expansão do questionário;
- mudança de arquitetura por casos isolados;
- criação automática de terceiro repositório/app;
- refinamento cosmético antes da validação funcional.

## Critério para avançar da validação humana

A fase pode avançar quando as perguntas forem entendidas sem confusão recorrente, os resultados forem percebidos como razoáveis diante das respostas, a orientação ajudar a enxergar um próximo passo, não houver padrão recorrente de resultado claramente inadequado e a coleta de feedback/clique estiver funcionando em produção.

Discordâncias pontuais entre estágios próximos não exigem mudança do motor por si só: o diagnóstico indica um **ponto de partida provável**, não uma obrigação de percurso.

## Links operacionais

- Landing: https://rota-zero-zero-landing-145931.hostingersite.com/
- Diagnóstico: https://rota-zero-zero-landing-145931.hostingersite.com/diagnostico/
- Manual de Identidade Visual: https://darkslategrey-goat-979048.hostingersite.com/idv/idv-roadmap.html
- Validação humana: https://github.com/igormmatos/rota-zero-zero-landing/issues/23
- Validação da coleta: https://github.com/igormmatos/rota-zero-zero-landing/issues/25

## Regra de manutenção

Atualizar este arquivo apenas quando houver mudança real de fase, estado de componente, contrato entre repositórios ou prioridade principal. Não usar como diário de commits.
