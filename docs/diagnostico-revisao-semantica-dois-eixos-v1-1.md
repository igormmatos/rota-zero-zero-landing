# Diagnóstico ROTA ZERO ZERO — revisão semântica da arquitetura em dois eixos

**Status:** revisão editorial/semântica; não altera o motor de produção nem a UI.

## 1. Pergunta desta fase

O experimento anterior separou:

- `learningStage`: onde parece mais útil começar a aprender agora;
- `routeReadiness`: se já seria possível sugerir uma direção de projeto/tecnologia.

A hipótese líder era `B_PROJECT_STRUCTURE`:

```text
READY se Q2 = P2/P3 e Q3 != S0.
```

Esta revisão pergunta se esse corte faz sentido quando confrontado com o Livro-fonte V2.1, o Documento-base e perfis concretos.

## 2. Regra canônica usada na revisão

O Livro-fonte V2.1 estabelece a sequência:

> interesse → projeto → tecnologia

Antes de escolher linguagem/ferramenta, o material pede que a ideia seja reduzida à menor versão útil. O próprio Livro-fonte define:

- primeiro descobrir o que se quer ver funcionando;
- depois reduzir a ideia à menor versão útil;
- só então escolher a ferramenta;
- prontidão para escolher caminho aparece quando há um projeto pequeno e uma expectativa clara de funcionamento.

Isso é mais específico do que a hipótese B.

No questionário atual:

- `P2_IDEA` = existe uma ideia concreta, **mas ela ainda não foi reduzida**;
- `P3_MINIMUM` = a pessoa consegue explicar uma versão pequena e dizer o que ela precisa fazer.

Logo, tratar P2 e P3 como equivalentes para liberar rota contradiz a ordem editorial do próprio produto.

## 3. Amostra manual

Foram revisados 24 perfis intencionais, cobrindo:

- 02 + NOT_READY;
- 02 + READY;
- 03 + NOT_READY;
- 03 + READY;
- V1=04 mas hipótese B=NOT_READY;
- V1!=04 mas hipótese B=READY.

A amostra não é estatística. Ela serve para localizar incoerências semânticas antes de alterar produção.

### 3.1 learningStage 02 + NOT_READY

Os quatro perfis revisados tinham P0/P1: curiosidade/área de interesse, mas sem projeto concreto. Variavam em experiência visual/textual e estruturação.

**Veredito:** coerente manter sem sugestão de tecnologia. O interesse pode contextualizar exemplos, mas o Livro-fonte orienta a não escolher ferramenta antes de existir projeto suficientemente concreto.

### 3.2 learningStage 02 + READY na hipótese B

Quatro perfis foram revisados:

- dois com `P2_IDEA`;
- dois com `P3_MINIMUM`.

Nos casos P2, a pessoa já tinha ideia concreta e alguma estrutura, mas declarava explicitamente que ainda não sabia reduzi-la.

**Veredito:** classificar P2 como READY é permissivo demais. A próxima decisão correta é **reduzir o projeto**, não selecionar tecnologia.

Nos casos P3, mesmo sem experiência técnica avançada, já havia uma versão pequena e pelo menos alguma capacidade de separar partes.

**Veredito:** é coerente sugerir uma direção sem interpretar isso como avanço de competência. Um resultado `02 + sugestão de rota` é legítimo justamente porque os eixos são independentes.

### 3.3 learningStage 03 + NOT_READY

Quatro perfis tinham sinais de autoria/estrutura/debugging suficientes para 03, mas P0/P1.

**Veredito:** coerente. Capacidade técnica não cria automaticamente um projeto. Uma pessoa pode estar confortável com lógica/código e ainda não ter definido o que quer construir agora.

### 3.4 learningStage 03 + READY na hipótese B

Quatro perfis foram revisados:

- dois com P2;
- dois com P3.

O mesmo padrão da célula 02 reapareceu.

**Veredito:** P2 ainda pede redução do projeto; P3 permite sugestão de rota. O nível técnico não deve alterar esse limite editorial.

### 3.5 Casos V1=04, mas B=NOT_READY

Foram revisados quatro perfis com boa experiência textual, autoria, estrutura e debugging, porém com P0/P1.

**Veredito:** a arquitetura 2D corrige a V1. O Gate04 atual pode ativar uma tecnologia mesmo sem projeto concreto porque não usa Q2. Isso está desalinhado de `interesse → projeto → tecnologia`.

### 3.6 Casos V1!=04, mas B=READY

Foram revisados quatro perfis nos quais havia P3 e estrutura suficiente, mas faltavam requisitos técnicos do Gate04 atual, como D3 ou representação textual.

**Veredito:** vários desses casos devem receber sugestão de rota. Escolher uma direção não exige dominar código textual ou debugging avançado. A rota serve para orientar o próximo projeto, não para certificar competência.

Um caso P2 incluído como controle voltou a mostrar o problema de B: ter uma ideia concreta não equivale a tê-la reduzido.

## 4. Quatro pares mínimos

A revisão também usou quatro fronteiras semânticas.

### Par 1 — P1 → P2, mantendo S1

- P1: sabe a área, sem ideia concreta;
- P2: tem ideia concreta, mas ainda não sabe reduzi-la.

**Leitura recomendada:** `EXPLORE_FIRST → REDUCE_PROJECT`.

A passagem cria uma tarefa nova e útil, mas ainda não deveria liberar tecnologia.

### Par 2 — P2 → P3, mantendo S1

- P2: ideia concreta ainda não reduzida;
- P3: versão pequena e expectativa do que precisa fazer.

**Leitura recomendada:** `REDUCE_PROJECT → SUGGEST_ROUTE`.

Este é o limite mais diretamente sustentado pelo Livro-fonte.

### Par 3 — P3 + S0 → P3 + S1

A versão pequena existe nos dois casos. A diferença é que, no primeiro, ainda é difícil separar a ideia em partes; no segundo, algumas partes já podem ser separadas com ajuda.

**Leitura recomendada:** `STRUCTURE_PROJECT → SUGGEST_ROUTE`.

Não é necessário exigir S2/S3 como prova de competência para sugerir uma direção, mas S0 ainda indica que a ideia está nebulosa demais para escolher ferramenta com confiança.

### Par 4 — mudança apenas em Q7

Mantendo P3 + S1 ou superior, trocar jogos por web/aplicativos/automação altera apenas a direção sugerida.

**Leitura recomendada:** `learningStage` e a decisão de rota permanecem iguais; somente `routeSuggestion` muda.

Isso preserva o princípio de que interesse não é medida de habilidade.

## 5. Resultado exaustivo do refinamento

A hipótese B atual classifica 17.496/46.656 cenários como READY.

Metade desses casos usa P2:

| Q2 entre os READY de B | cenários |
|---|---:|
| P2 — ideia concreta, ainda não reduzida | 8.748 |
| P3 — versão pequena definida | 8.748 |

A leitura canônica indica que os 8.748 casos P2 não deveriam receber tecnologia ainda.

Em vez de um booleano READY/NOT_READY, a revisão propõe quatro decisões:

| routeDecision | regra | cenários |
|---|---|---:|
| `EXPLORE_FIRST` | P0/P1 | 23.328 |
| `REDUCE_PROJECT` | P2 | 11.664 |
| `STRUCTURE_PROJECT` | P3 + S0 | 2.916 |
| `SUGGEST_ROUTE` | P3 + Q3 != S0 | 8.748 |

Esse modelo transforma o diagnóstico em sequência de decisões, não em certificação.

## 6. Cruzamento com learningStage

| learningStage | EXPLORE_FIRST | REDUCE_PROJECT | STRUCTURE_PROJECT | SUGGEST_ROUTE |
|---|---:|---:|---:|---:|
| 00 | 288 | 0 | 0 | 0 |
| 01 | 10.344 | 2.916 | 2.916 | 0 |
| 02 | 9.360 | 7.080 | 0 | 7.080 |
| 03 | 3.336 | 1.668 | 0 | 1.668 |

Dois resultados merecem destaque:

1. `02 + SUGGEST_ROUTE` ocorre 7.080 vezes. Isso não é salto de competência; significa que a pessoa ainda pode se beneficiar de criação visual, mas já possui um projeto pequeno suficiente para orientar a escolha de tecnologia.
2. `03 + EXPLORE_FIRST` ocorre 3.336 vezes. Isso mostra o inverso: capacidade técnica não substitui definição de projeto.

## 7. O que acontece com a antiga Etapa 04

Dos 768 cenários V1=04:

| decisão de rota refinada | cenários |
|---|---:|
| EXPLORE_FIRST | 384 |
| REDUCE_PROJECT | 192 |
| STRUCTURE_PROJECT | 0 |
| SUGGEST_ROUTE | 192 |

Assim, apenas 192/768 casos que hoje ativam a Etapa 04 já possuem, segundo as próprias respostas do diagnóstico, uma versão pequena do projeto e algum começo de estruturação.

Isso não significa que os outros 576 sejam “menos capazes”. Significa que a V1 usa competência técnica para responder uma pergunta que deveria ser principalmente sobre projeto e decisão.

Também existem 8.556 cenários V1!=04 que satisfazem `SUGGEST_ROUTE`. Esse resultado é esperado na arquitetura em dois eixos: sugerir uma direção deixa de equivaler a ocupar um nível técnico superior.

## 8. Desempate

O refinamento usa apenas Q2 e Q3 para decidir a próxima ação de rota.

Nos 7.968 perfis-base conflitantes, nenhum muda de `routeDecision` em função de T0/T1/T2.

**Veredito:** isso é desejável. O desempate atual pode continuar sendo revisado para o eixo de aprendizagem, mas deixa de contaminar a decisão sobre projeto/tecnologia.

## 9. Decisão de arquitetura desta fase

A arquitetura em dois eixos fica **aprovada conceitualmente para especificação V1.1**, com uma correção importante:

**rejeitar o booleano público `READY/NOT_READY` como modelo principal.**

Ele é fácil de interpretar como “pronto tecnicamente” e perde uma decisão útil que existe entre ter interesse e escolher tecnologia.

A hipótese recomendada passa a ser:

```text
learningStage:
  00 | 01 | 02 | 03

routeDecision:
  EXPLORE_FIRST
  REDUCE_PROJECT
  STRUCTURE_PROJECT
  SUGGEST_ROUTE

interestTag:
  I_WEB | I_AUTOMATION | I_GAMES | I_APPS | I_AI_DATA | I_UNSURE

routeSuggestion:
  null quando routeDecision != SUGGEST_ROUTE
  rota derivada de Q7 quando routeDecision = SUGGEST_ROUTE
```

`I_UNSURE` continua válido. Quando `SUGGEST_ROUTE`, gera exploração aberta; antes disso, ele serve como contexto para pequenas experiências, sem obrigar especialização.

## 10. Linguagem pública recomendada

Evitar mostrar ao usuário algo como:

> Prontidão de rota: READY

Preferir uma decisão legível:

- `EXPLORE_FIRST`: **Antes de escolher uma tecnologia, transforme o interesse em uma ideia concreta.**
- `REDUCE_PROJECT`: **A ideia já existe. Agora reduza para a menor versão que vale testar.**
- `STRUCTURE_PROJECT`: **A versão pequena já existe. Organize as partes principais antes de escolher a ferramenta.**
- `SUGGEST_ROUTE`: **Já dá para sugerir uma direção para este projeto: [rota].**

O resultado principal continua sendo:

> **Seu ponto de partida provável é...**

A decisão de rota aparece como orientação secundária, não como nota, nível ou certificado.

## 11. Próxima ação recomendada

A próxima fase já pode sair de pesquisa arquitetural e virar **especificação V1.1**, ainda sem publicar:

1. formalizar o novo contrato de saída (`learningStage + routeDecision + routeSuggestion`);
2. redefinir Q5/D3 para hipótese + teste, retirando consulta a fonte do construto;
3. substituir o TB composto por uma política que nunca reescreva dimensões não conflitantes;
4. definir compatibilidade/migração dos 20 perfis de regressão V1;
5. implementar motor V1.1 em módulo separado e rodar auditoria exaustiva antes de tocar a UI.

## 12. Limites

Esta revisão não valida psicometricamente o instrumento e não transforma os cortes em regras científicas. O refinamento é uma decisão editorial mais fiel às fontes canônicas e mais explicável do que o booleano B.

Nenhum arquivo de produção foi alterado nesta fase.
