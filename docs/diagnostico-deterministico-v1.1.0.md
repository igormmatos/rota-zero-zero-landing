# ROTA ZERO ZERO — Diagnóstico determinístico V1.1.0

**Status:** especificação normativa vigente do diagnóstico `R00-DIAG-1.1.0`, implementado e congelado para o MVP. A validação humana permanece em andamento; isso não transforma os thresholds editoriais em escala cientificamente validada.

## 1. Pergunta de produto

A V1.1 separa duas decisões que a V1 misturava em um único campo `stage`:

1. **Qual é o melhor ponto de partida para aprender agora?**
2. **Qual é a próxima decisão sobre o projeto antes de escolher tecnologia?**

A arquitetura segue a lógica canônica do Livro-fonte V2.1: **interesse → projeto → tecnologia**. A sequência 00–03 continua sendo uma orientação editorial flexível, não uma escala psicométrica nem uma lei universal.

## 2. O que o diagnóstico não é

Não é teste psicométrico, prova escolar, certificação, escala científica validada de competência, teste de personalidade ou score oculto. Os thresholds desta especificação são regras editoriais de produto informadas pelas fontes do projeto e pelas auditorias V1/V1.1.

## 3. Entrada

### Contexto

`C0`
- `SELF`
- `OTHER`

Só altera microcopy. Nunca altera classificação.

### Q1 — experiência prática

- `E0_NONE`
- `E1_FOLLOWED`
- `E2_MODIFIED_VISUAL`
- `E3_WRITTEN_SMALL`
- `E4_OWN_PROJECT`

### Q2 — clareza do projeto

- `P0_NONE`
- `P1_AREA`
- `P2_IDEA`
- `P3_MINIMUM`

`P2` significa: existe uma ideia concreta, mas ainda não foi reduzida.

`P3` significa: existe uma versão pequena e a pessoa consegue dizer o que ela precisa fazer.

### Q3 — estrutura da ideia

- `S0_VAGUE`
- `S1_PARTS_HELP`
- `S2_STEPS_RULES`
- `S3_CONSEQUENCES`

### Q4 — modificação e autoria

- `M0_COPY_ONLY`
- `M1_SMALL_HELP`
- `M2_SMALL_INDEPENDENT`
- `M3_TRANSFER`

### Q5 — resposta ao erro

- `D0_STOP`
- `D1_TRIAL`
- `D2_COMPARE`
- `D3_HYPOTHESIS_TEST`

**Mudança normativa da V1.1:** `D3` passa a medir somente estratégia de depuração: formular uma hipótese sobre a causa e executar um teste específico para confirmá-la ou descartá-la. **Consultar uma fonte deixa de fazer parte do construto.**

Copy recomendada para D3:

> Formula uma hipótese sobre a causa e faz um teste específico para confirmá-la ou descartá-la.

### Q6 — forma de criação

- `R0_NONE`
- `R1_VISUAL`
- `R2_READ_MODIFY_TEXT`
- `R3_WRITE_TEXT`

### Q7 — interesse atual

- `I_WEB`
- `I_AUTOMATION`
- `I_GAMES`
- `I_APPS`
- `I_AI_DATA`
- `I_UNSURE`

Q7 nunca altera `learningStage` nem `routeDecision`.

## 4. Eixo 1 — learningStage

Valores:

- `00` — Descobrir
- `01` — Pensar
- `02` — Criar visualmente
- `03` — Escrever lógica

A antiga Etapa 04 deixa de existir como nível de aprendizagem. Escolher direção passa a ser tratado no eixo de decisão do projeto.

### Gate03

Todos:

- houve alguma construção (`Q1 != E0` ou `Q6 != R0`);
- `Q3` é `S2` ou `S3`;
- autoria efetiva é `M2` ou `M3`;
- debugging é `D2` ou `D3`, **ou** `R3 + D1`.

### Gate02

Todos:

- existe material concreto (`Q2 = P2/P3` ou `Q1 != E0`);
- `Q3 != S0`.

### Gate01

Se algum:

- `Q2 = P2/P3`;
- `Q1 != E0`;
- `Q3 != S0`;
- autoria efetiva `!= M0`.

### Gate00

Fallback.

A classificação é top-down: 03 → 02 → 01 → 00.

## 5. Eixo 2 — routeDecision

Este eixo não mede competência técnica. Ele responde: **o que precisa acontecer com o projeto antes de escolher tecnologia?**

### EXPLORE_FIRST

Se `Q2 = P0` ou `P1`.

Interpretação: interesse ainda não virou uma ideia concreta de projeto.

### REDUCE_PROJECT

Se `Q2 = P2`.

Interpretação: existe uma ideia concreta, mas ela ainda precisa virar a menor versão útil.

### STRUCTURE_PROJECT

Se `Q2 = P3` e `Q3 = S0`.

Interpretação: a versão pequena já existe, porém ainda está nebulosa em partes, passos ou regras.

### SUGGEST_ROUTE

Se `Q2 = P3` e `Q3 != S0`.

Interpretação: já existe uma pequena versão e algum começo de estruturação; é coerente sugerir uma direção de tecnologia/projeto sem afirmar domínio técnico.

## 6. routeSuggestion

Somente existe quando `routeDecision = SUGGEST_ROUTE`.

Mapeamento:

- `I_WEB` → `web`
- `I_AUTOMATION` → `automation`
- `I_GAMES` → `games`
- `I_APPS` → `apps`
- `I_AI_DATA` → `ai_data`
- `I_UNSURE` → `open_exploration`

`I_UNSURE` é uma saída válida. Não causa regressão de `learningStage`.

## 7. Inconsistências e desempate

### 7.1 Regra geral

A V1.1 abandona o desempate genérico que reescrevia autoria e debugging simultaneamente. Um desempate só pode alterar a dimensão que ele foi criado para esclarecer.

### 7.2 Único hard conflict da V1.1

`H2_AUTHORSHIP_WITHOUT_CREATION`

Condição:

- `Q1 = E0_NONE`;
- e `Q4 = M2_SMALL_INDEPENDENT` ou `M3_TRANSFER`.

Pergunta adicional normativa:

> Sem seguir um passo a passo, até onde você consegue fazer uma pequena modificação em algo que já existe?

Respostas:

- `T0_NOT_YET` → autoria efetiva `M0_COPY_ONLY`;
- `T1_WITH_HELP` → autoria efetiva `M1_SMALL_HELP`;
- `T2_YES` → autoria efetiva `M2_SMALL_INDEPENDENT`.

O desempate **não altera Q5, Q6, Q2 ou Q3**.

### 7.3 Inconsistências suaves

São registradas para confiança/auditoria, mas não exigem pergunta extra nem reescrevem evidência:

- `S1_EXPERIENCE_REPRESENTATION`: `E0` com `R2/R3`;
- `S2_PROJECT_AUTONOMY`: `E4 + M0 + D0`;
- `S3_PAST_TEXT_CURRENT_COMFORT`: `E3/E4 + R0`.

Essas combinações podem representar passado versus conforto atual, projeto concluído com apoio intenso ou interpretação diferente da pergunta. A V1.1 prefere não inventar correções automáticas.

## 8. Confidence

- `HIGH`: nenhuma inconsistência detectada;
- `MEDIUM`: hard conflict resolvido por desempate ou alguma inconsistência suave.

`LOW` continua não formalizado e não deve ser emitido sem uma regra normativa futura.

## 9. Contrato de saída

```js
{
  algorithmVersion: "R00-DIAG-1.1.0",
  context,
  learningStage,
  learningStageLabel,
  routeDecision,
  interestTag,
  routeSuggestion,
  confidence,
  reasonCodes,
  tiebreakerUsed
}
```

Invariantes:

- `learningStage` ∈ `00..03`;
- `routeSuggestion !== null` somente com `SUGGEST_ROUTE`;
- Q7 não altera `learningStage` nem `routeDecision`;
- SELF/OTHER não altera o resultado estrutural;
- desempate não altera `routeDecision`;
- não existe score total.

## 10. Reason codes

Mantêm-se os códigos positivos e de limite da V1 quando semanticamente compatíveis.

Mudanças:

- remover `USES_HYPOTHESIS_AND_SOURCE`;
- adicionar `USES_HYPOTHESIS_AND_TEST`;
- adicionar `NEEDS_EXPLORATION_FIRST`;
- adicionar `NEEDS_PROJECT_REDUCTION`;
- adicionar `NEEDS_PROJECT_STRUCTURE`;
- adicionar `ROUTE_SUGGESTION_AVAILABLE`;
- manter `OPEN_EXPLORATION_IS_VALID`;
- manter `TIEBREAKER_USED`;
- adicionar `SOFT_INCONSISTENCY_DETECTED`.

A UI continua limitada a poucos motivos em linguagem humana; códigos internos não devem ser exibidos diretamente.

## 11. Bateria de regressão V1.1

Os 20 perfis históricos são preservados como casos de regressão, mas a expectativa passa a ser tripla:

`learningStage + routeDecision + routeSuggestion`.

Resumo esperado:

| Perfil | learningStage | routeDecision | routeSuggestion |
|---:|:---:|---|---|
| 1 | 00 | EXPLORE_FIRST | null |
| 2 | 00 | EXPLORE_FIRST | null |
| 3 | 01 | EXPLORE_FIRST | null |
| 4 | 01 | REDUCE_PROJECT | null |
| 5 | 02 | REDUCE_PROJECT | null |
| 6 | 02 | EXPLORE_FIRST | null |
| 7 | 03 | REDUCE_PROJECT | null |
| 8 | 03 | EXPLORE_FIRST | null |
| 9 | 03 | REDUCE_PROJECT | null |
| 10 | 03 | SUGGEST_ROUTE | automation |
| 11 | 03 | SUGGEST_ROUTE | web |
| 12 | 03 | SUGGEST_ROUTE | open_exploration |
| 13 | 03 | SUGGEST_ROUTE | ai_data |
| 14 | 02 | SUGGEST_ROUTE | apps |
| 15 | 03 | SUGGEST_ROUTE | games |
| 16 | 02 | REDUCE_PROJECT | null |
| 17 | 03 | SUGGEST_ROUTE | automation |
| 18 | 02 | SUGGEST_ROUTE | games |
| 19 | 00 | EXPLORE_FIRST | null |
| 20 | 03 | SUGGEST_ROUTE | apps |

Perfil 18 deixa de exigir desempate na V1.1: `E4 + M0 + D0` passa a ser inconsistência suave e permanece conservador no eixo de aprendizagem.

## 12. Auditoria exaustiva esperada

Espaço base: **30.720** combinações.

Como somente H2 exige desempate, existem **3.072** núcleos de hard conflict. Expandindo esses núcleos por três respostas de TB, a V1.1 possui **36.864 cenários classificáveis**.

Distribuição esperada:

### learningStage

- 00: 576
- 01: 12.912
- 02: 19.248
- 03: 4.128

### routeDecision

- EXPLORE_FIRST: 18.432
- REDUCE_PROJECT: 9.216
- STRUCTURE_PROJECT: 2.304
- SUGGEST_ROUTE: 6.912

A distribuição combinatória não representa prevalência real de usuários nem acurácia do diagnóstico.

## 13. Critérios usados para substituir a V1 — registro histórico

Os critérios abaixo orientaram a promoção da V1.1 antes de ela se tornar a versão implementada. São preservados para rastreabilidade histórica:

1. testes da bateria regressiva passarem;
2. auditoria exaustiva confirmar determinismo e invariantes;
3. nenhuma regressão de `learningStage` em pares ordinais adjacentes não conflitantes;
4. revisão semântica final da copy de Q5, TB e resultados;
5. atualização da UI e testes de contrato;
6. QA manual em navegador, teclado e responsividade;
7. decisão explícita de publicação.

A promoção posterior foi concluída: a produção atual carrega `diagnostic-rules-v1-1.js`, `diagnostic-copy-v1-1.js` e `diagnostico-v1-1.js`. Os arquivos V1 permanecem no repositório como histórico técnico e suporte à rastreabilidade.
