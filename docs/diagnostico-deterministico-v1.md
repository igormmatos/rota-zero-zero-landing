# Diagnóstico determinístico ROTA ZERO ZERO — especificação V1

## 1. Objetivo

O diagnóstico responde a uma pergunta única:

> **Qual é o próximo passo mais provável para esta pessoa agora?**

Ele não é teste psicométrico, avaliação escolar, prova de conhecimento nem instrumento de seleção. O resultado é **orientativo** e deve ser apresentado como “ponto de partida provável”.

A base editorial do produto estabelece que a jornada é flexível e que o mapa organiza decisões sem substituir a observação. A prontidão não é definida por conclusão de cursos, e sim por sinais observáveis como explicar o que tentou, modificar exemplos, prever parte do resultado, tolerar erros, procurar informação e concluir algo pequeno. A idade é contexto, não eixo de classificação.

A V1 do algoritmo é uma **decisão de produto derivada dessas fontes**. Os gates abaixo não são reivindicados como instrumento cientificamente validado.

---

## 2. Princípios obrigatórios

1. **Determinístico:** as mesmas respostas sempre produzem o mesmo resultado.
2. **Sem pontuação agregada:** não existe “Web 72 pontos” ou “Etapa 3 = 18 pontos”. A decisão ocorre por regras e gates explícitos.
3. **Etapa e interesse são eixos independentes.** Querer criar jogos não coloca automaticamente alguém na rota Jogos.
4. **A rota só é ativada no 04.** Antes disso, a preferência funciona como contexto para exemplos e linguagem do resultado.
5. **“Ainda não sei” é legítimo.** No 04, torna-se exploração aberta; não rebaixa a pessoa para 00.
6. **Idade não determina etapa.** Caso seja coletada futuramente, serve apenas para filtrar recursos e restrições institucionais.
7. **Autoria pesa mais que consumo.** Assistir, copiar ou concluir curso não é evidência suficiente de prontidão.
8. **Erro é informação.** O comportamento diante de um resultado inesperado ajuda a diferenciar reprodução, investigação e autonomia.
9. **Conservador em conflito.** Quando há respostas incompatíveis, o sistema faz uma pergunta de desempate e evita classificar acima da evidência disponível.
10. **Sem dados pessoais de menores no MVP.** Sem nome, e-mail do jovem, escola, data de nascimento, localização ou cadastro.

---

## 3. Modelo conceitual

O motor produz dois eixos:

- `stage`: 00, 01, 02, 03 ou 04;
- `interestTag`: web, automação, jogos, aplicativos, IA/dados ou ainda não sei.

Quando `stage < 04`, `interestTag` é apenas contexto.

Quando `stage === 04`, o interesse se transforma em `route`:

- `web`
- `automation`
- `games`
- `apps`
- `ai_data`
- `open_exploration`

---

## 4. Fluxo do questionário

### Tela de contexto — não entra na classificação

**C0 — Você está respondendo por quem?**

- `SELF` — Por mim.
- `OTHER` — Por outra pessoa.

Função: adaptar pronomes e microcopy. Não altera etapa nem rota.

### Q1 — Experiência prática

**Qual destas frases descreve melhor o que já foi feito com programação?**

- `E0_NONE` — Ainda não criou nada com programação.
- `E1_FOLLOWED` — Já assistiu a aulas ou seguiu exemplos passo a passo.
- `E2_MODIFIED_VISUAL` — Já modificou um projeto feito com blocos ou ferramenta visual.
- `E3_WRITTEN_SMALL` — Já escreveu ou modificou pequenos trechos de código textual.
- `E4_OWN_PROJECT` — Já concluiu um pequeno projeto próprio, mesmo simples ou imperfeito.

### Q2 — Clareza do projeto

**Hoje existe alguma coisa que gostaria de criar?**

- `P0_NONE` — Ainda não sabe o que gostaria de criar.
- `P1_AREA` — Sabe a área que interessa, mas ainda não tem uma ideia concreta.
- `P2_IDEA` — Tem uma ideia concreta, mas ainda não sabe reduzi-la.
- `P3_MINIMUM` — Consegue explicar uma versão pequena e dizer o que ela precisa fazer.

### Q3 — Estrutura da ideia

**Quando pensa em uma ideia, até onde consegue organizá-la?**

- `S0_VAGUE` — Ainda é difícil separar a ideia em partes.
- `S1_PARTS_HELP` — Consegue separar algumas partes com ajuda.
- `S2_STEPS_RULES` — Consegue descrever passos, regras ou decisões principais.
- `S3_CONSEQUENCES` — Além disso, consegue prever o que uma mudança de regra afetaria.

### Q4 — Modificação e autoria

**Quando segue um exemplo ou tutorial e quer mudar alguma coisa, o que costuma acontecer?**

- `M0_COPY_ONLY` — Precisa continuar seguindo os passos para não se perder.
- `M1_SMALL_HELP` — Consegue fazer uma pequena mudança com alguma ajuda.
- `M2_SMALL_INDEPENDENT` — Consegue fazer uma pequena mudança sozinho e testar o efeito.
- `M3_TRANSFER` — Consegue adaptar uma ideia aprendida para outra situação ou projeto.

### Q5 — Resposta ao erro

**Quando o resultado não é o esperado, qual situação se aproxima mais do que acontece?**

- `D0_STOP` — Para ou espera alguém dizer o que fazer.
- `D1_TRIAL` — Tenta mudanças até alguma funcionar, sem uma hipótese muito clara.
- `D2_COMPARE` — Compara o esperado com o que aconteceu e testa uma mudança de cada vez.
- `D3_HYPOTHESIS_SOURCE` — Formula uma hipótese, consulta uma fonte quando precisa e testa a solução.

### Q6 — Forma de criação

**Qual destas formas de criação já parece mais confortável hoje?**

- `R0_NONE` — Ainda nenhuma.
- `R1_VISUAL` — Blocos, fluxos ou ferramentas visuais.
- `R2_READ_MODIFY_TEXT` — Ler e modificar pequenos trechos de código escrito.
- `R3_WRITE_TEXT` — Escrever um pequeno programa e explicar o que as partes fazem.

### Q7 — Interesse atual

**O que mais gostaria de criar agora?**

- `I_WEB` — Um site ou página na web.
- `I_AUTOMATION` — Um programa ou automação.
- `I_GAMES` — Um jogo.
- `I_APPS` — Um aplicativo.
- `I_AI_DATA` — Algo com IA ou dados.
- `I_UNSURE` — Ainda não sabe.

---

## 5. Ordem semântica das respostas

A implementação pode usar rankings internos **somente para comparação ordinal**, nunca para somar pontos.

```js
const rank = {
  experience: {
    E0_NONE: 0,
    E1_FOLLOWED: 1,
    E2_MODIFIED_VISUAL: 2,
    E3_WRITTEN_SMALL: 3,
    E4_OWN_PROJECT: 4,
  },
  project: {
    P0_NONE: 0,
    P1_AREA: 1,
    P2_IDEA: 2,
    P3_MINIMUM: 3,
  },
  structure: {
    S0_VAGUE: 0,
    S1_PARTS_HELP: 1,
    S2_STEPS_RULES: 2,
    S3_CONSEQUENCES: 3,
  },
  modification: {
    M0_COPY_ONLY: 0,
    M1_SMALL_HELP: 1,
    M2_SMALL_INDEPENDENT: 2,
    M3_TRANSFER: 3,
  },
  debug: {
    D0_STOP: 0,
    D1_TRIAL: 1,
    D2_COMPARE: 2,
    D3_HYPOTHESIS_SOURCE: 3,
  },
  representation: {
    R0_NONE: 0,
    R1_VISUAL: 1,
    R2_READ_MODIFY_TEXT: 2,
    R3_WRITE_TEXT: 3,
  },
};
```

Nenhuma soma entre categorias é permitida na V1.

---

## 6. Detecção de contradições

Antes da classificação, o sistema testa incompatibilidades fortes.

### Conflitos duros

Disparam a pergunta de desempate:

```text
H1: E0_NONE + (R2_READ_MODIFY_TEXT ou R3_WRITE_TEXT)
H2: E0_NONE + (M2_SMALL_INDEPENDENT ou M3_TRANSFER)
H3: E4_OWN_PROJECT + M0_COPY_ONLY + D0_STOP
H4: (E3_WRITTEN_SMALL ou E4_OWN_PROJECT) + R0_NONE
```

Essas combinações não são tratadas como mentira. Podem ser diferença de interpretação entre “programar”, “projeto”, “sozinho” ou “com ajuda”.

### Pergunta de desempate

**TB — Sem um tutorial aberto, você consegue pegar uma ideia bem pequena, mudar alguma coisa, testar e explicar o que aconteceu?**

- `T0_NOT_YET` — Ainda não.
- `T1_WITH_HELP` — Sim, com alguma ajuda.
- `T2_YES` — Sim.

### Como o desempate afeta a evidência

`T0_NOT_YET`
- limita autoria efetiva a `M1_SMALL_HELP`;
- limita investigação efetiva a `D1_TRIAL`;
- não apaga experiência declarada, mas impede que ela sozinha eleve a etapa.

`T1_WITH_HELP`
- autoria efetiva: no máximo `M1_SMALL_HELP`;
- investigação efetiva: pode chegar a `D2_COMPARE`;
- não concede autonomia suficiente para 04.

`T2_YES`
- garante pelo menos `M2_SMALL_INDEPENDENT`;
- garante pelo menos `D2_COMPARE`;
- não concede `D3_HYPOTHESIS_SOURCE`; portanto, sozinho não pode elevar para 04.

Após aplicar o desempate, os gates são executados novamente.

---

## 7. Algoritmo de classificação

A classificação é feita **de cima para baixo**. O primeiro gate satisfeito vence.

### Gate 04 — Escolher um caminho

Resultado `04` quando **todas** as condições forem verdadeiras:

```text
A. experiência textual ou projeto próprio:
   E3_WRITTEN_SMALL ou E4_OWN_PROJECT ou R3_WRITE_TEXT

B. estrutura suficiente:
   S2_STEPS_RULES ou S3_CONSEQUENCES

C. autoria independente:
   M2_SMALL_INDEPENDENT ou M3_TRANSFER

D. investigação autônoma:
   D3_HYPOTHESIS_SOURCE

E. representação textual:
   R2_READ_MODIFY_TEXT ou R3_WRITE_TEXT
```

Justificativa editorial: o Livro-fonte define a prontidão ao final da escrita lógica pela capacidade de explicar o que pretendia, localizar o desvio, consultar uma fonte e testar uma hipótese sem depender da solução completa.

### Gate 03 — Escrever lógica

Se o Gate 04 falhar, resultado `03` quando **todas** forem verdadeiras:

```text
A. já existe alguma experiência de construção:
   E2_MODIFIED_VISUAL ou E3_WRITTEN_SMALL ou E4_OWN_PROJECT
   OU R1_VISUAL/R2_READ_MODIFY_TEXT/R3_WRITE_TEXT

B. estrutura:
   S2_STEPS_RULES ou S3_CONSEQUENCES

C. autoria:
   M2_SMALL_INDEPENDENT ou M3_TRANSFER

D. depuração observável:
   D2_COMPARE ou D3_HYPOTHESIS_SOURCE
```

Interpretação: a pessoa já consegue modificar, testar e raciocinar sobre comportamento; o próximo passo provável é consolidar a passagem para instruções escritas e depuração textual.

### Gate 02 — Criar visualmente

Se 04 e 03 falharem, resultado `02` quando **todas** forem verdadeiras:

```text
A. existe material concreto para trabalhar:
   P2_IDEA ou P3_MINIMUM
   OU E1_FOLLOWED/E2_MODIFIED_VISUAL/E3_WRITTEN_SMALL/E4_OWN_PROJECT

B. consegue começar a estruturar:
   S1_PARTS_HELP ou S2_STEPS_RULES ou S3_CONSEQUENCES
```

Não é obrigatório já saber depurar. O objetivo desta etapa é tornar a ideia e o comportamento observáveis sem colocar sintaxe como primeira barreira.

### Gate 01 — Pensar

Se 04, 03 e 02 falharem, resultado `01` quando pelo menos uma condição for verdadeira:

```text
P2_IDEA ou P3_MINIMUM
OU E1_FOLLOWED/E2_MODIFIED_VISUAL/E3_WRITTEN_SMALL/E4_OWN_PROJECT
OU S1_PARTS_HELP/S2_STEPS_RULES/S3_CONSEQUENCES
OU M1_SMALL_HELP/M2_SMALL_INDEPENDENT/M3_TRANSFER
```

Interpretação: já existe algum material de autoria, experiência ou ideia concreta, mas a estrutura ainda não sustenta o próximo gate.

### Gate 00 — Descobrir

Se nenhum gate anterior for satisfeito, resultado `00`.

É a saída padrão para curiosidade ampla, consumo, interesse por área sem projeto concreto ou ausência de experiência de criação.

---

## 8. Regra da rota

### Se `stage` for 00–03

```js
route = null;
routeMode = "context";
interestTag = answer.Q7;
```

Exemplo:

```json
{
  "stage": "02",
  "interestTag": "I_GAMES",
  "route": null,
  "routeMode": "context"
}
```

A interface pode dizer:

> Interesse atual: jogos. Isso pode orientar os exemplos, mas seu próximo passo ainda é criar visualmente.

### Se `stage` for 04

```text
I_WEB        -> route = web
I_AUTOMATION -> route = automation
I_GAMES      -> route = games
I_APPS       -> route = apps
I_AI_DATA    -> route = ai_data
I_UNSURE     -> route = open_exploration
```

`I_UNSURE` nunca rebaixa a etapa.

---

## 9. Confiança do resultado

A confiança também é determinística e não representa probabilidade estatística.

### `HIGH`

- nenhum conflito duro;
- nenhum desempate necessário;
- classificação deriva diretamente dos gates.

### `MEDIUM`

- houve conflito duro;
- a pergunta de desempate resolveu a incompatibilidade.

### `LOW`

- houve conflito duro;
- mesmo após desempate, permanecem sinais muito distantes entre si;
- o sistema aplica o gate conservador e rotula o resultado como “provisório”.

Na V1, `LOW` deve ser raro e nunca bloquear o resultado.

---

## 10. Reason codes

O motor retorna códigos explicáveis, sem expor uma “nota”.

### Positivos

- `HAS_CONCRETE_IDEA`
- `CAN_DEFINE_MINIMUM_PROJECT`
- `CAN_SPLIT_INTO_PARTS`
- `CAN_DESCRIBE_RULES`
- `CAN_PREDICT_CONSEQUENCES`
- `CAN_MODIFY_WITH_HELP`
- `CAN_MODIFY_INDEPENDENTLY`
- `CAN_TRANSFER_IDEA`
- `COMPARES_EXPECTED_RESULT`
- `USES_HYPOTHESIS_AND_SOURCE`
- `HAS_VISUAL_EXPERIENCE`
- `HAS_TEXTUAL_EXPERIENCE`
- `COMPLETED_SMALL_PROJECT`

### Limites observados

- `NO_CREATION_EXPERIENCE_YET`
- `INTEREST_NOT_CONCRETE_YET`
- `PROJECT_NOT_REDUCED_YET`
- `STRUCTURE_STILL_VAGUE`
- `DEPENDS_ON_STEP_BY_STEP`
- `DEBUGGING_STILL_TRIAL_AND_ERROR`
- `TEXTUAL_LOGIC_NOT_COMFORTABLE_YET`

### Sistema

- `TIEBREAKER_USED`
- `CONSERVATIVE_CLASSIFICATION`
- `OPEN_EXPLORATION_IS_VALID`

A interface seleciona no máximo 2 motivos positivos e 1 próximo limite. Não mostrar uma lista técnica ao usuário final.

---

## 11. Contrato de saída

```js
{
  algorithmVersion: "R00-DIAG-1.0.0",
  context: "SELF" | "OTHER",
  stage: "00" | "01" | "02" | "03" | "04",
  stageLabel: string,
  interestTag: string,
  route: null | "web" | "automation" | "games" | "apps" | "ai_data" | "open_exploration",
  routeMode: "context" | "route",
  confidence: "HIGH" | "MEDIUM" | "LOW",
  reasonCodes: string[],
  tiebreakerUsed: boolean
}
```

Nenhum dado pessoal precisa compor esse objeto.

---

## 12. Copy dos cinco resultados

### 00 — Descobrir

**Seu ponto de partida provável é 00 — Descobrir.**

A curiosidade já pode existir, mas ainda vale transformar interesse em uma pequena hipótese de criação antes de escolher curso ou linguagem.

### 01 — Pensar

**Seu ponto de partida provável é 01 — Pensar.**

Já existe algo para explorar. O próximo ganho vem de tornar a ideia menos nebulosa: separar partes, regras, decisões e o que precisa acontecer.

### 02 — Criar visualmente

**Seu ponto de partida provável é 02 — Criar visualmente.**

A ideia já pode começar a produzir comportamento visível. O objetivo aqui é construir, modificar e testar sem fazer da sintaxe a primeira barreira.

### 03 — Escrever lógica

**Seu ponto de partida provável é 03 — Escrever lógica.**

Já existem sinais de autoria e investigação. O próximo passo é levar a mesma lógica para instruções escritas, lendo erros como pistas e preservando projetos pequenos.

### 04 — Escolher um caminho

**Seu ponto de partida provável é 04 — Escolher um caminho.**

Já há evidências suficientes para deixar o projeto orientar a tecnologia. Primeiro a menor versão que se quer ver funcionando; depois a ferramenta que reduz a distância até ela.

### Sufixo de interesse para 00–03

> **Interesse atual:** {rota}. Isso ajuda a escolher exemplos e projetos, mas não muda sozinho o ponto de partida.

### Sufixo para 04

> **Rota provável:** {rota}.

Para `open_exploration`:

> **Rota provável:** exploração aberta. Ainda não saber o que criar é uma resposta válida; o próximo passo é comparar pequenas experiências antes de se especializar.

---

## 13. O que o resultado gratuito não entrega

O diagnóstico pode mostrar:

- ponto de partida provável;
- explicação curta da etapa;
- interesse/rota;
- 2 motivos do resultado;
- visão geral do que vem depois.

Ele não deve entregar integralmente:

- missão completa;
- critérios detalhados de prontidão;
- escada de ajuda;
- curadoria completa de recursos;
- comparação de ferramentas;
- protocolos detalhados de erro;
- primeiros projetos completos;
- orientação detalhada sobre investimento.

A fronteira permanece:

> **Gratuito:** onde estamos e para onde podemos ir.

> **Completo:** o que fazer agora, como fazer e o que observar.

---

## 14. Perfis de teste — 20 casos obrigatórios

Legenda: `Q1/Q2/Q3/Q4/Q5/Q6/Q7`.

| # | Perfil | Respostas | Resultado esperado |
|---|---|---|---|
| 01 | Iniciante absoluto, sem direção | `E0/P0/S0/M0/D0/R0/I_UNSURE` | `00`, contexto `I_UNSURE`, HIGH |
| 02 | Gosta de jogos, mas nunca tentou criar | `E0/P1/S0/M0/D0/R0/I_GAMES` | `00`, contexto Jogos, HIGH |
| 03 | Só seguiu tutoriais | `E1/P0/S0/M0/D0/R0/I_WEB` | `01`, contexto Web, HIGH |
| 04 | Tem uma ideia de site, mas não sabe dividir | `E0/P2/S0/M0/D0/R0/I_WEB` | `01`, contexto Web, HIGH |
| 05 | Ideia concreta + separa partes com ajuda | `E0/P2/S1/M0/D0/R0/I_APPS` | `02`, contexto Apps, HIGH |
| 06 | Seguiu Scratch + organiza partes com ajuda | `E1/P1/S1/M1/D1/R1/I_GAMES` | `02`, contexto Jogos, HIGH |
| 07 | Modifica Scratch sozinho e compara resultado | `E2/P2/S2/M2/D2/R1/I_GAMES` | `03`, contexto Jogos, HIGH |
| 08 | Visual forte, ainda sem rota | `E2/P0/S2/M3/D2/R1/I_UNSURE` | `03`, contexto Ainda não sei, HIGH |
| 09 | Lê/modifica código, mas ainda não consulta fonte de forma autônoma | `E3/P2/S2/M2/D2/R2/I_WEB` | `03`, contexto Web, HIGH |
| 10 | Escreve pequenos códigos, mas depura por tentativa | `E3/P3/S2/M2/D1/R3/I_AUTOMATION` | `03`, contexto Automação, HIGH |
| 11 | Código textual + autoria + hipótese + fonte | `E3/P3/S2/M2/D3/R3/I_WEB` | `04`, rota Web, HIGH |
| 12 | Projeto próprio concluído, mas ainda não sabe a área | `E4/P3/S3/M3/D3/R3/I_UNSURE` | `04`, rota Exploração aberta, HIGH |
| 13 | Projeto próprio e quer IA/dados | `E4/P3/S3/M3/D3/R3/I_AI_DATA` | `04`, rota IA/dados, HIGH |
| 14 | Nunca programou, mas já consegue reduzir e estruturar uma ideia | `E0/P3/S2/M0/D0/R0/I_APPS` | `02`, contexto Apps, HIGH |
| 15 | Muito autônomo no visual, ainda sem escrita confortável | `E2/P3/S3/M3/D3/R1/I_GAMES` | `03`, contexto Jogos, HIGH |
| 16 | Experiência textual declarada, mas ainda dependente de passo a passo | `E3/P2/S1/M0/D0/R2/I_WEB` | `02`, contexto Web, HIGH |
| 17 | Contradição: declara nunca ter criado, mas escreve e investiga | `E0/P3/S2/M2/D3/R3/I_AUTOMATION` + `TB=T2` | `04`, rota Automação, MEDIUM |
| 18 | Contradição: diz ter projeto próprio, mas não consegue agir sem tutorial | `E4/P3/S2/M0/D0/R3/I_GAMES` + `TB=T0` | classificação conservadora `02`, contexto Jogos, MEDIUM |
| 19 | Quer Web, mas ainda só existe interesse amplo | `E0/P1/S0/M0/D0/R0/I_WEB` | `00`, contexto Web, HIGH |
| 20 | Responsável responde por alguém com evidências de 04 | mesmo perfil do caso 11, `context=OTHER` | mesmo `04/Web`; só muda a linguagem da interface |

### Casos que não podem ocorrer

- Q7 nunca pode elevar a etapa.
- `I_UNSURE` nunca pode reduzir a etapa.
- idade nunca pode elevar ou reduzir a etapa.
- certificado nunca pode ser usado como gate.
- quantidade de cursos nunca pode ser usada como gate.
- “horas de tela” nunca pode ser usada como gate.

---

## 15. Pseudocódigo de referência

```js
function classify(raw) {
  const normalized = resolveContradictions(raw);

  if (gate04(normalized)) return buildResult("04", normalized);
  if (gate03(normalized)) return buildResult("03", normalized);
  if (gate02(normalized)) return buildResult("02", normalized);
  if (gate01(normalized)) return buildResult("01", normalized);
  return buildResult("00", normalized);
}

function gate04(a) {
  const expText = ["E3_WRITTEN_SMALL", "E4_OWN_PROJECT"].includes(a.Q1)
    || a.Q6 === "R3_WRITE_TEXT";
  const structured = ["S2_STEPS_RULES", "S3_CONSEQUENCES"].includes(a.Q3);
  const authors = ["M2_SMALL_INDEPENDENT", "M3_TRANSFER"].includes(a.Q4_effective);
  const investigates = a.Q5_effective === "D3_HYPOTHESIS_SOURCE";
  const textRepresentation = ["R2_READ_MODIFY_TEXT", "R3_WRITE_TEXT"].includes(a.Q6);
  return expText && structured && authors && investigates && textRepresentation;
}

function gate03(a) {
  const builtSomething = a.Q1 !== "E0_NONE" || a.Q6 !== "R0_NONE";
  const structured = ["S2_STEPS_RULES", "S3_CONSEQUENCES"].includes(a.Q3);
  const authors = ["M2_SMALL_INDEPENDENT", "M3_TRANSFER"].includes(a.Q4_effective);
  const debugs = ["D2_COMPARE", "D3_HYPOTHESIS_SOURCE"].includes(a.Q5_effective);
  return builtSomething && structured && authors && debugs;
}

function gate02(a) {
  const material = ["P2_IDEA", "P3_MINIMUM"].includes(a.Q2) || a.Q1 !== "E0_NONE";
  const canStructure = a.Q3 !== "S0_VAGUE";
  return material && canStructure;
}

function gate01(a) {
  return ["P2_IDEA", "P3_MINIMUM"].includes(a.Q2)
    || a.Q1 !== "E0_NONE"
    || a.Q3 !== "S0_VAGUE"
    || a.Q4_effective !== "M0_COPY_ONLY";
}
```

### Regra adicional para o caso 17

Quando um conflito `E0_NONE` é resolvido por `T2_YES`, a experiência declarada deixa de ser usada como bloqueio. Evidência direta de `R3_WRITE_TEXT + M2 + D3` pode satisfazer o 04. O reason code deve incluir `TIEBREAKER_USED`.

### Regra adicional para o caso 18

Quando `E4_OWN_PROJECT` entra em conflito com `M0 + D0` e o desempate é `T0_NOT_YET`, a experiência histórica não pode elevar o resultado acima de 02. Aplicar `CONSERVATIVE_CLASSIFICATION`.

---

## 16. Critérios de aceitação para implementação

A V1 só deve ser considerada pronta quando:

- os 20 perfis acima passarem como testes automatizados;
- alterar apenas Q7 nunca alterar `stage`;
- trocar `SELF` por `OTHER` nunca alterar `stage` ou `route`;
- `I_UNSURE` em um perfil 04 retornar `open_exploration`;
- nenhum cálculo de soma ou média existir no código;
- nenhuma idade for necessária para classificar;
- nenhum dado pessoal for necessário para executar o algoritmo;
- o resultado continuar disponível sem backend;
- JavaScript desabilitado não expuser dados incompletos como se fossem resultado;
- a página declarar que o resultado é orientativo, não uma avaliação definitiva.

---

## 17. Implementação recomendada no MVP

Arquitetura:

```text
diagnostico/
  index.html
  diagnostico.css
  diagnostico.js
  diagnostic-rules.js
  diagnostic-copy.js
  diagnostic-tests.js   // desenvolvimento, não precisa ir para produção
```

`diagnostic-rules.js` contém somente regras e não conhece o DOM.

`diagnostico.js` controla navegação, estado e renderização.

`diagnostic-copy.js` contém textos dos resultados e adaptações SELF/OTHER.

O estado pode existir apenas em memória durante a sessão. `localStorage` é opcional e, se usado, deve armazenar somente respostas/códigos não identificáveis.

---

## 18. Próxima validação de produto

Antes de alterar gates por intuição, testar a V1 com pessoas reais.

Para cada teste registrar apenas:

- respostas anônimas;
- resultado do algoritmo;
- “Esse resultado parece descrever onde você está?” — sim / parcialmente / não;
- “Qual etapa você esperava?” — opcional;
- observação curta.

Qualquer mudança posterior deve gerar nova versão (`R00-DIAG-1.1.0`, etc.) e novos casos de regressão.
