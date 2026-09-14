# ROTA ZERO ZERO — Diagnóstico determinístico V1.0.0

## Status

Especificação implementável do diagnóstico gratuito.

O diagnóstico responde:

> **Qual é o próximo passo mais provável para esta pessoa agora?**

Não é teste psicométrico, prova, avaliação escolar nem medição científica de habilidade. O resultado é orientativo e deve aparecer como **“ponto de partida provável”**.

A base editorial sustenta os sinais usados pelo sistema — autoria, modificação, previsão, depuração, busca de informação, conclusão de algo pequeno e flexibilidade da jornada. Os gates abaixo são uma **decisão de produto da ROTA ZERO ZERO**, não uma escala validada externamente.

---

## 1. Regras de produto

1. Mesmas respostas = mesmo resultado.
2. Não usar soma, média ou score global.
3. Etapa e interesse são eixos independentes.
4. A preferência por jogo/site/app etc. nunca eleva etapa.
5. A rota só é ativada no 04.
6. `Ainda não sei` é uma saída válida e nunca reduz etapa.
7. Idade não entra no algoritmo; pode existir futuramente apenas para filtrar recursos com restrição etária.
8. Certificado, número de cursos e horas de tela não são gates.
9. Em conflito, usar pergunta de desempate e classificação conservadora.
10. Não coletar dados pessoais de menores no MVP.

---

## 2. Saída do motor

```js
{
  algorithmVersion: "R00-DIAG-1.0.0",
  context: "SELF" | "OTHER",
  stage: "00" | "01" | "02" | "03" | "04",
  stageLabel: string,
  interestTag: "I_WEB" | "I_AUTOMATION" | "I_GAMES" | "I_APPS" | "I_AI_DATA" | "I_UNSURE",
  route: null | "web" | "automation" | "games" | "apps" | "ai_data" | "open_exploration",
  routeMode: "context" | "route",
  confidence: "HIGH" | "MEDIUM" | "LOW",
  reasonCodes: string[],
  tiebreakerUsed: boolean
}
```

---

## 3. Perguntas

### Contexto — não classifica

**C0 — Você está respondendo por quem?**

- `SELF` — Por mim.
- `OTHER` — Por outra pessoa.

Só adapta a linguagem da interface.

### Q1 — Experiência prática

**Qual destas frases descreve melhor o que já foi feito com programação?**

- `E0_NONE` — Ainda não criou nada com programação.
- `E1_FOLLOWED` — Já assistiu a aulas ou seguiu exemplos passo a passo.
- `E2_MODIFIED_VISUAL` — Já modificou um projeto com blocos ou ferramenta visual.
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
- `S3_CONSEQUENCES` — Também consegue prever o que uma mudança de regra afetaria.

### Q4 — Modificação e autoria

**Quando segue um exemplo ou tutorial e quer mudar alguma coisa, o que costuma acontecer?**

- `M0_COPY_ONLY` — Precisa continuar seguindo os passos para não se perder.
- `M1_SMALL_HELP` — Consegue fazer uma pequena mudança com alguma ajuda.
- `M2_SMALL_INDEPENDENT` — Consegue fazer uma pequena mudança sozinho e testar o efeito.
- `M3_TRANSFER` — Consegue adaptar uma ideia aprendida para outra situação ou projeto.

### Q5 — Resposta ao erro

**Quando o resultado não é o esperado, qual situação mais se aproxima do que acontece?**

- `D0_STOP` — Para ou espera alguém dizer o que fazer.
- `D1_TRIAL` — Tenta mudanças até alguma funcionar, sem hipótese muito clara.
- `D2_COMPARE` — Compara o esperado com o resultado e testa uma mudança de cada vez.
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

## 4. Comparação ordinal

A implementação pode atribuir ordens internas dentro de cada pergunta para facilitar `>=`, mas nunca somar categorias.

```js
const rank = {
  experience: ["E0_NONE", "E1_FOLLOWED", "E2_MODIFIED_VISUAL", "E3_WRITTEN_SMALL", "E4_OWN_PROJECT"],
  project: ["P0_NONE", "P1_AREA", "P2_IDEA", "P3_MINIMUM"],
  structure: ["S0_VAGUE", "S1_PARTS_HELP", "S2_STEPS_RULES", "S3_CONSEQUENCES"],
  modification: ["M0_COPY_ONLY", "M1_SMALL_HELP", "M2_SMALL_INDEPENDENT", "M3_TRANSFER"],
  debug: ["D0_STOP", "D1_TRIAL", "D2_COMPARE", "D3_HYPOTHESIS_SOURCE"],
  representation: ["R0_NONE", "R1_VISUAL", "R2_READ_MODIFY_TEXT", "R3_WRITE_TEXT"]
};
```

---

## 5. Conflitos e desempate

### Conflitos duros

```text
H1: E0_NONE + (R2_READ_MODIFY_TEXT ou R3_WRITE_TEXT)
H2: E0_NONE + (M2_SMALL_INDEPENDENT ou M3_TRANSFER)
H3: E4_OWN_PROJECT + M0_COPY_ONLY + D0_STOP
H4: (E3_WRITTEN_SMALL ou E4_OWN_PROJECT) + R0_NONE
```

Não interpretar como mentira; pode ser diferença de entendimento das perguntas.

### TB — pergunta de desempate

**Sem um tutorial aberto, você consegue pegar uma ideia bem pequena, mudar alguma coisa, testar e explicar o que aconteceu?**

- `T0_NOT_YET` — Ainda não.
- `T1_WITH_HELP` — Sim, com alguma ajuda.
- `T2_YES` — Sim.

### Normalização

`T0_NOT_YET`
- autoria efetiva no máximo `M1_SMALL_HELP`;
- depuração efetiva no máximo `D1_TRIAL`;
- no conflito H3, aplicar teto de etapa 02.

`T1_WITH_HELP`
- autoria efetiva no máximo `M1_SMALL_HELP`;
- depuração efetiva pode chegar a `D2_COMPARE`;
- não concede 04.

`T2_YES`
- autoria efetiva no mínimo `M2_SMALL_INDEPENDENT`;
- depuração efetiva no mínimo `D2_COMPARE`;
- não concede `D3_HYPOTHESIS_SOURCE` por si só.

Depois da normalização, executar os gates novamente.

---

## 6. Gates de classificação

Executar do 04 para o 00. O primeiro gate satisfeito vence.

### 04 — Escolher um caminho

Todas as condições:

```text
1. Experiência textual/projeto:
   E3_WRITTEN_SMALL ou E4_OWN_PROJECT ou R3_WRITE_TEXT

2. Estrutura:
   S2_STEPS_RULES ou S3_CONSEQUENCES

3. Autoria:
   M2_SMALL_INDEPENDENT ou M3_TRANSFER

4. Investigação autônoma:
   D3_HYPOTHESIS_SOURCE

5. Representação textual:
   R2_READ_MODIFY_TEXT ou R3_WRITE_TEXT
```

O 04 exige a combinação mais próxima do critério editorial de prontidão ao final da escrita lógica: explicar intenção, localizar desvio, consultar fonte e testar hipótese sem solução completa.

### 03 — Escrever lógica

Todas as condições:

```text
1. Alguma experiência de construção:
   Q1 != E0_NONE ou Q6 != R0_NONE

2. Estrutura:
   S2_STEPS_RULES ou S3_CONSEQUENCES

3. Autoria:
   M2_SMALL_INDEPENDENT ou M3_TRANSFER

4. Depuração:
   D2_COMPARE ou D3_HYPOTHESIS_SOURCE
   OU, se R3_WRITE_TEXT, D1_TRIAL já é suficiente para manter a pessoa no 03
```

A exceção de `R3_WRITE_TEXT + D1_TRIAL` evita regressão artificial para 02 de alguém que já escreve pequenos programas de forma independente, mas ainda precisa qualificar sua depuração.

### 02 — Criar visualmente

Todas as condições:

```text
1. Material concreto:
   P2_IDEA ou P3_MINIMUM
   OU Q1 != E0_NONE

2. Começa a estruturar:
   Q3 != S0_VAGUE
```

Não é obrigatório já depurar bem. A função do 02 é transformar ideia em comportamento observável sem fazer da sintaxe a primeira barreira.

### 01 — Pensar

Se os gates anteriores falharem, basta uma evidência:

```text
P2_IDEA ou P3_MINIMUM
OU Q1 != E0_NONE
OU Q3 != S0_VAGUE
OU Q4 efetivo != M0_COPY_ONLY
```

Há algo para organizar, mas a estrutura ainda não sustenta o 02.

### 00 — Descobrir

Fallback quando nenhum gate anterior passa.

É adequado para curiosidade ampla, interesse em uma área sem projeto concreto e ausência de autoria prática.

---

## 7. Regra da rota

### Etapas 00–03

```js
route = null;
routeMode = "context";
interestTag = Q7;
```

Exemplo de mensagem:

> Interesse atual: jogos. Isso pode orientar os exemplos, mas não muda sozinho seu ponto de partida.

### Etapa 04

```text
I_WEB        -> web
I_AUTOMATION -> automation
I_GAMES      -> games
I_APPS       -> apps
I_AI_DATA    -> ai_data
I_UNSURE     -> open_exploration
```

`I_UNSURE` nunca altera `stage`.

---

## 8. Confiança

`HIGH`
- sem conflito duro;
- sem desempate.

`MEDIUM`
- conflito duro resolvido por TB.

`LOW`
- conflito duro permanece semanticamente estranho após TB;
- usar classificação conservadora e mostrar “resultado provisório”.

Isto não é probabilidade estatística.

---

## 9. Reason codes

Positivos:

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

Limites:

- `NO_CREATION_EXPERIENCE_YET`
- `INTEREST_NOT_CONCRETE_YET`
- `PROJECT_NOT_REDUCED_YET`
- `STRUCTURE_STILL_VAGUE`
- `DEPENDS_ON_STEP_BY_STEP`
- `DEBUGGING_STILL_TRIAL_AND_ERROR`
- `TEXTUAL_LOGIC_NOT_COMFORTABLE_YET`

Sistema:

- `TIEBREAKER_USED`
- `CONSERVATIVE_CLASSIFICATION`
- `OPEN_EXPLORATION_IS_VALID`

Na interface: no máximo 2 razões positivas + 1 limite. Não mostrar código técnico nem score.

---

## 10. Copy de resultado

### 00 — Descobrir

**Seu ponto de partida provável é 00 — Descobrir.**

A curiosidade já pode existir, mas ainda vale transformá-la em uma pequena hipótese de criação antes de escolher curso ou linguagem.

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

### Sufixo 00–03

> **Interesse atual:** {interesse}. Isso ajuda a escolher exemplos e projetos, mas não muda sozinho o ponto de partida.

### Sufixo 04

> **Rota provável:** {rota}.

Para `open_exploration`:

> **Rota provável:** exploração aberta. Ainda não saber o que criar é uma resposta válida; compare pequenas experiências antes de se especializar.

---

## 11. Fronteira gratuito x completo

O diagnóstico gratuito pode mostrar:

- ponto de partida provável;
- explicação curta;
- interesse/rota;
- até 2 motivos;
- visão geral do próximo trecho do mapa.

Não entregar integralmente:

- missão completa;
- critérios detalhados de prontidão;
- escada de ajuda;
- curadoria completa de recursos;
- comparação de ferramentas;
- protocolos detalhados de erro;
- projetos completos;
- orientação detalhada de investimento.

Fronteira:

> **Gratuito:** onde estamos e para onde podemos ir.

> **Completo:** o que fazer agora, como fazer e o que observar.

---

## 12. 20 perfis de regressão

Legenda: `Q1/Q2/Q3/Q4/Q5/Q6/Q7`.

| # | Perfil | Respostas | Esperado |
|---|---|---|---|
| 01 | Iniciante absoluto | `E0/P0/S0/M0/D0/R0/I_UNSURE` | `00`, Ainda não sei, HIGH |
| 02 | Gosta de jogos, só consumo | `E0/P1/S0/M0/D0/R0/I_GAMES` | `00`, Jogos contexto, HIGH |
| 03 | Só seguiu tutoriais | `E1/P0/S0/M0/D0/R0/I_WEB` | `01`, Web contexto, HIGH |
| 04 | Ideia de site ainda nebulosa | `E0/P2/S0/M0/D0/R0/I_WEB` | `01`, Web contexto, HIGH |
| 05 | Ideia + separa partes com ajuda | `E0/P2/S1/M0/D0/R0/I_APPS` | `02`, Apps contexto, HIGH |
| 06 | Scratch guiado + estrutura inicial | `E1/P1/S1/M1/D1/R1/I_GAMES` | `02`, Jogos contexto, HIGH |
| 07 | Modifica Scratch e compara resultado | `E2/P2/S2/M2/D2/R1/I_GAMES` | `03`, Jogos contexto, HIGH |
| 08 | Visual forte, sem rota definida | `E2/P0/S2/M3/D2/R1/I_UNSURE` | `03`, Ainda não sei contexto, HIGH |
| 09 | Lê/modifica código, depura por comparação | `E3/P2/S2/M2/D2/R2/I_WEB` | `03`, Web contexto, HIGH |
| 10 | Escreve código, mas depura por tentativa | `E3/P3/S2/M2/D1/R3/I_AUTOMATION` | `03`, Automação contexto, HIGH |
| 11 | Código + autoria + fonte + hipótese | `E3/P3/S2/M2/D3/R3/I_WEB` | `04`, Web, HIGH |
| 12 | Projeto próprio + ainda não sabe a rota | `E4/P3/S3/M3/D3/R3/I_UNSURE` | `04`, Exploração aberta, HIGH |
| 13 | Projeto próprio + interesse em IA/dados | `E4/P3/S3/M3/D3/R3/I_AI_DATA` | `04`, IA/dados, HIGH |
| 14 | Nunca programou, mas reduz e estrutura ideia | `E0/P3/S2/M0/D0/R0/I_APPS` | `02`, Apps contexto, HIGH |
| 15 | Forte no visual, ainda sem escrita confortável | `E2/P3/S3/M3/D3/R1/I_GAMES` | `03`, Jogos contexto, HIGH |
| 16 | Experiência textual, mas dependente de passo a passo | `E3/P2/S1/M0/D0/R2/I_WEB` | `02`, Web contexto, HIGH |
| 17 | Contradição E0 x R3/M2/D3 | `E0/P3/S2/M2/D3/R3/I_AUTOMATION + TB=T2` | `04`, Automação, MEDIUM |
| 18 | Contradição projeto próprio x dependência total | `E4/P3/S2/M0/D0/R3/I_GAMES + TB=T0` | teto `02`, Jogos contexto, MEDIUM |
| 19 | Quer Web, mas só há interesse amplo | `E0/P1/S0/M0/D0/R0/I_WEB` | `00`, Web contexto, HIGH |
| 20 | Mesmo perfil do caso 11 respondido por responsável | caso 11 + `OTHER` | mesmo `04/Web`; só muda microcopy |

### Invariantes

- Alterar apenas Q7 nunca muda `stage`.
- Alterar `SELF` para `OTHER` nunca muda `stage` nem `route`.
- `I_UNSURE` em um perfil 04 sempre retorna `open_exploration`.
- Idade, certificado, cursos e horas de tela não participam da decisão.

---

## 13. Pseudocódigo

```js
function classify(raw) {
  const a = resolveContradictions(raw);

  if (gate04(a)) return buildResult("04", a);
  if (gate03(a)) return buildResult("03", a);
  if (gate02(a)) return buildResult("02", a);
  if (gate01(a)) return buildResult("01", a);
  return buildResult("00", a);
}

function gate04(a) {
  const expText = ["E3_WRITTEN_SMALL", "E4_OWN_PROJECT"].includes(a.Q1)
    || a.Q6 === "R3_WRITE_TEXT";
  const structured = ["S2_STEPS_RULES", "S3_CONSEQUENCES"].includes(a.Q3);
  const authors = ["M2_SMALL_INDEPENDENT", "M3_TRANSFER"].includes(a.Q4Effective);
  const investigates = a.Q5Effective === "D3_HYPOTHESIS_SOURCE";
  const textRep = ["R2_READ_MODIFY_TEXT", "R3_WRITE_TEXT"].includes(a.Q6);
  return expText && structured && authors && investigates && textRep;
}

function gate03(a) {
  const built = a.Q1 !== "E0_NONE" || a.Q6 !== "R0_NONE";
  const structured = ["S2_STEPS_RULES", "S3_CONSEQUENCES"].includes(a.Q3);
  const authors = ["M2_SMALL_INDEPENDENT", "M3_TRANSFER"].includes(a.Q4Effective);
  const debugEnough = ["D2_COMPARE", "D3_HYPOTHESIS_SOURCE"].includes(a.Q5Effective)
    || (a.Q6 === "R3_WRITE_TEXT" && a.Q5Effective === "D1_TRIAL");
  return built && structured && authors && debugEnough;
}

function gate02(a) {
  const material = ["P2_IDEA", "P3_MINIMUM"].includes(a.Q2) || a.Q1 !== "E0_NONE";
  const startsToStructure = a.Q3 !== "S0_VAGUE";
  return material && startsToStructure;
}

function gate01(a) {
  return ["P2_IDEA", "P3_MINIMUM"].includes(a.Q2)
    || a.Q1 !== "E0_NONE"
    || a.Q3 !== "S0_VAGUE"
    || a.Q4Effective !== "M0_COPY_ONLY";
}
```

### Exceções de conflito

- H1/H2 + `T2_YES`: a declaração `E0_NONE` não bloqueia evidência direta de capacidade; ainda é necessário cumprir todos os demais requisitos do 04.
- H3 + `T0_NOT_YET`: teto de etapa 02 e reason code `CONSERVATIVE_CLASSIFICATION`.

---

## 14. Critérios de aceitação

A implementação V1 só é aprovada quando:

- os 20 perfis passam como testes automatizados;
- não existe soma/média de respostas;
- alterar apenas Q7 não muda a etapa;
- SELF/OTHER não muda classificação;
- `I_UNSURE + stage 04` retorna exploração aberta;
- nenhum dado pessoal é obrigatório;
- o motor funciona localmente, sem backend;
- a interface informa que o resultado é orientativo;
- a versão do algoritmo aparece internamente no objeto de saída.

---

## 15. Arquitetura recomendada

```text
diagnostico/
  index.html
  diagnostico.css
  diagnostico.js
  diagnostic-rules.js
  diagnostic-copy.js
  diagnostic-tests.js
```

- `diagnostic-rules.js`: regras puras; não conhece DOM.
- `diagnostico.js`: fluxo e renderização.
- `diagnostic-copy.js`: textos e variações SELF/OTHER.
- `diagnostic-tests.js`: regressão dos 20 casos; pode ficar fora do build final.

Estado apenas em memória. `localStorage`, se usado, deve guardar somente códigos não identificáveis.

---

## 16. Validação posterior

Antes de alterar gates por sensação, testar a V1 com pessoas reais.

Registrar apenas:

- respostas anônimas;
- resultado;
- “Esse resultado parece descrever onde você está?” — sim / parcialmente / não;
- etapa esperada, opcional;
- observação curta.

Mudanças de regra geram nova versão (`R00-DIAG-1.1.0`) e novos testes de regressão.
