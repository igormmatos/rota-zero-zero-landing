# Estado atual — ROTA ZERO ZERO

Última atualização: **2026-09-16**

Este arquivo é a referência rápida para retomar o projeto. Ele registra o estado atual, a fase em andamento e a ordem dos próximos passos. Detalhes operacionais ficam nas Issues e decisões técnicas ficam em `docs/`.

## Fase atual

**VALIDAÇÃO HUMANA DO DIAGNÓSTICO V1.1**

O motor, a copy pública, a interface V1.1 e a coleta mínima de feedback já estão implementados na `main`.

A arquitetura do diagnóstico está **congelada para o MVP**. Não alterar regras, thresholds ou critérios apenas por preferência pontual. Mudanças semânticas ou de motor só devem ocorrer quando a validação mostrar um padrão recorrente ou um problema claramente reproduzível.

## Estado dos componentes

### Landing page

**Status:** funcional.

A landing está publicada e serve como porta de entrada para o diagnóstico e o Roadmap.

**Pendência principal:** refinamento visual/layout apenas depois da validação humana e do QA funcional.

### Diagnóstico

**Versão:** `R00-DIAG-1.1.0`

**Status:** implementado.

Arquitetura atual:

- `learningStage`: `00`, `01`, `02` ou `03`;
- `routeDecision`: `EXPLORE_FIRST`, `REDUCE_PROJECT`, `STRUCTURE_PROJECT` ou `SUGGEST_ROUTE`;
- `routeSuggestion`: exibida somente quando há base suficiente para sugerir uma direção;
- `interestTag`: preferência separada do ponto de partida;
- desempate condicional apenas quando há contradição relevante de autoria/autonomia.

O resultado é uma **orientação**, não uma nota, prova, certificação ou instrumento psicométrico validado.

### Feedback e validação comportamental

**Status:** implementado; aguardando validação no ambiente real da Hostinger.

Eventos coletados:

- `result_viewed`;
- `feedback_submitted`;
- `roadmap_clicked`.

O feedback inclui uma nota de 0 a 10 sobre o quanto o resultado ajudou a entender o próximo passo e um comentário opcional.

A coleta não usa cookies, `localStorage` ou `sessionStorage` e não solicita nome, e-mail, idade ou escola. O armazenamento previsto é `r00-private-data/diagnostico-feedback.jsonl`, fora de `public_html`.

## Em andamento

- **#23 — [EM ANDAMENTO] Validação humana do diagnóstico V1.1**

Objetivo: confirmar, com uso real, que as perguntas são compreensíveis, que os resultados são razoáveis e que a orientação ajuda a pessoa a encontrar um próximo passo.

## Pendências imediatas

- **#25 — [PENDENTE] Validar coleta de feedback no Hostinger pelo computador**
- confirmar em produção os eventos `result_viewed`, `feedback_submitted` e `roadmap_clicked`;
- iniciar testes com pessoas reais;
- acompanhar notas, comentários e cliques no Roadmap;
- registrar na #23 apenas problemas recorrentes ou relevantes.

## Próximos passos

1. Validar a coleta no ambiente real da Hostinger.
2. Rodar a validação humana com usuários reais.
3. Corrigir apenas problemas semânticos ou funcionais recorrentes.
4. Executar QA funcional, responsivo e de acessibilidade/teclado.
5. Fazer o refinamento final de layout e identidade visual.
6. Revisar indexação e decidir a retirada de `noindex`.
7. Publicar/divulgar a versão definitiva do diagnóstico.

## Fora de escopo agora

- nova revisão científica ampla do motor;
- criação de score total;
- novos thresholds sem evidência de uso;
- expansão do número de perguntas;
- mudança de arquitetura por casos isolados;
- refinamento cosmético antes da validação e do QA funcional.

## Critério para avançar da validação humana

A fase pode ser considerada suficiente quando:

- as perguntas forem entendidas sem confusão recorrente;
- os resultados forem percebidos como razoáveis diante das respostas;
- a orientação ajudar a pessoa a enxergar um próximo passo;
- não houver padrão recorrente de resultado claramente inadequado;
- a coleta de feedback e clique estiver funcionando em produção.

Discordâncias pontuais entre estágios próximos não exigem mudança do motor por si só, porque o diagnóstico indica um **ponto de partida provável**, não uma obrigação de percurso.

## Links operacionais

- Landing: https://rota-zero-zero-landing-145931.hostingersite.com/
- Diagnóstico: https://rota-zero-zero-landing-145931.hostingersite.com/diagnostico/
- Manual de Identidade Visual: https://darkslategrey-goat-979048.hostingersite.com/idv/idv-roadmap.html
- Validação humana: https://github.com/igormmatos/rota-zero-zero-landing/issues/23
- Validação da coleta em produção: https://github.com/igormmatos/rota-zero-zero-landing/issues/25

## Regra de manutenção deste arquivo

Atualizar `PROJECT_STATUS.md` apenas quando houver mudança real de fase, estado de um componente ou prioridade principal. Não usar este arquivo como diário de commits. Issues continuam sendo a fonte das tarefas executáveis; `docs/` continua sendo a fonte das decisões e análises técnicas.