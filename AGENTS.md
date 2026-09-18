# AGENTS.md — ROTA ZERO ZERO Landing

## Base operacional

`main` é a branch operacional canônica. Antes de alterar landing, diagnóstico ou feedback, leia `PROJECT_STATUS.md`.

## Diagnóstico vigente

- versão: `R00-DIAG-1.1.0`;
- especificação normativa: `docs/diagnostico-deterministico-v1.1.0.md`;
- motor: `diagnostico/diagnostic-rules-v1-1.js`;
- copy: `diagnostico/diagnostic-copy-v1-1.js`;
- UI: `diagnostico/diagnostico-v1-1.js` e `diagnostico/diagnostico-v1-1.css`;
- feedback: `docs/diagnostico-feedback-validacao-v1.1.md` e `api/diagnostico-feedback.php`.

A arquitetura V1.1 está congelada para o MVP. Não alterar thresholds, gates, semântica ou contrato por preferência local.

## Contexto progressivo

Para trabalho normal no diagnóstico, carregue apenas `PROJECT_STATUS.md`, a especificação V1.1 e os arquivos V1.1 diretamente afetados.

Use auditorias e mapa de evidências quando a tarefa exigir fundamentação ou revisão de decisão. Use V1, experimentos e snapshots somente para rastreabilidade histórica, comparação ou investigação de regressão.

Não trate documentos históricos que dizem “candidato”, “experimento” ou “não altera produção” como estado atual quando decisões posteriores já os superaram.

## Fronteira com o produto pós-diagnóstico

A saída de `R00-DIAG-1.1.0` é consumida pelo contrato `R00-GUIDED-CYCLE-1.0.0` no repositório `roadmap-programacao-pais-v2-1`. Não duplicar nem reinterpretar silenciosamente esse contrato neste repositório.

## Regras

- stack de publicação: HTML/CSS/Vanilla JS; PHP apenas no endpoint mínimo de feedback;
- não introduzir build/framework sem decisão explícita;
- `/diagnostico/` permanece `noindex,follow` enquanto a validação assim exigir;
- não coletar dados pessoais de crianças/adolescentes;
- não apresentar o diagnóstico como teste psicométrico, certificação ou medição científica de competência;
- mudanças de motor exigem evidência de validação ou problema reproduzível;
- build/teste automatizado não substitui QA humano de navegador, teclado e responsividade.


## Regra de retomada a frio

Este repositório deve permanecer **retomável a frio**: um agente novo, sem acesso à conversa que originou o trabalho, deve conseguir reconstruir o estado operacional apenas pelas fontes versionadas e responder corretamente:

1. **Onde estamos?**
2. **O que está decidido/congelado?**
3. **Qual é o próximo passo dentro do escopo deste repositório?**

A cadeia mínima de retomada é:

`AGENTS.md → PROJECT_STATUS.md → Issues/PRs relevantes → documentação específica necessária`.

### Critério de encerramento de trabalho

Uma tarefa não está documentalmente encerrada se sua conclusão mudar o estado real do projeto e essa mudança não puder ser recuperada pela cadeia acima.

Ao concluir trabalho que altere fase, contrato, decisão congelada, prioridade ou fronteira entre componentes:

- atualize a fonte normativa correspondente;
- atualize `PROJECT_STATUS.md` somente quando o estado operacional realmente mudar;
- mantenha Issues/PRs como registro do trabalho executável;
- preserve histórico como histórico, sem deixá-lo competir com o estado vigente;
- não dependa de memória de chat, prompt longo ou conhecimento pessoal do agente para explicar o estado atual.

Se um agente precisar receber contexto extenso no prompt para descobrir onde o projeto está, trate isso como **falha de documentação do repositório** e corrija a documentação canônica em vez de perpetuar o contexto no prompt.

### Limite

Retomada a frio vale para o **escopo deste repositório**. Não duplicar todo o estado de outros repositórios. Registrar apenas as fronteiras e contratos externos necessários para entender entradas, saídas e dependências.
