# Diagnóstico ROTA ZERO ZERO — experimento de arquitetura em dois eixos

**Status:** experimento de produto; não altera o motor de produção nem a UI.

## 1. Problema que este experimento tenta resolver

A revisão científica e a amostra estratificada mostraram que o campo `stage` da V1 mistura duas perguntas diferentes:

1. **qual é o melhor ponto de partida para aprender agora?**
2. **já há clareza suficiente para sugerir uma direção de projeto/tecnologia?**

Na V1, a Etapa 04 — “Escolher um caminho” — aparece como se fosse um nível posterior à Etapa 03. Porém, o Livro-fonte define a sequência como flexível e a Etapa 04 funciona sobretudo como uma bifurcação entre caminhos reais. Isso torna inadequado tratar todo `02→04` como salto de competência.

Este experimento separa as duas decisões.

```text
learningStage: 00 | 01 | 02 | 03
routeReadiness: NOT_READY | READY
interestTag: WEB | AUTOMATION | GAMES | APPS | AI_DATA | UNSURE
routeSuggestion: null | web | automation | games | apps | ai_data | open_exploration
```

A Etapa 04 deixa de existir como `learningStage` neste experimento. Ela passa a ser representada pela combinação `routeReadiness + routeSuggestion`.

---

## 2. learningStage

O eixo de aprendizagem reutiliza as regras já existentes para 00–03:

- 03: construção + estrutura S2/S3 + autoria M2/M3 + debugging suficiente;
- 02: material concreto/experiência + começo de estruturação;
- 01: algum sinal de ideia, experiência, estrutura ou modificação;
- 00: fallback.

O Gate04 é ignorado para esse eixo.

### Distribuição exaustiva

Nos 46.656 cenários classificáveis:

| learningStage | cenários |
|---|---:|
| 00 | 288 |
| 01 | 16.176 |
| 02 | 23.520 |
| 03 | 6.672 |

Os 768 casos que eram `stage 04` na V1 passam a integrar `learningStage 03`, pois todos já satisfazem o Gate03.

### Monotonicidade

Em pares adjacentes não conflitantes:

- nenhuma pergunta Q1–Q6 produziu regressão de `learningStage`;
- nenhuma pergunta produziu salto maior que 1;
- o problema de saltos `02→04` desaparece do eixo de aprendizagem porque “escolher rota” deixa de ser tratado como nível de competência.

Isso não prova validade; apenas mostra coerência lógica melhor.

---

## 3. Três hipóteses de routeReadiness

O objetivo não é escolher um threshold por conveniência. As três variantes representam interpretações distintas de “estar pronto para escolher uma rota”.

### A — PROJECT_CLARITY

```text
READY se Q2 = P2 ou P3
```

Interpretação: basta haver uma ideia/projeto concreto para a rota já poder ser sugerida.

Resultado:

- READY: 23.328 / 46.656 = 50,0%
- permite 5.832 casos `learningStage 01 + READY`;
- não depende de TB.

Leitura: útil como limite inferior, mas provavelmente permissiva demais. Uma ideia concreta ainda pode estar pouco estruturada.

### B — PROJECT_STRUCTURE

```text
READY se:
- Q2 = P2 ou P3;
- Q3 != S0.
```

Interpretação: existe algo concreto para criar e a pessoa já consegue pelo menos começar a separar partes, passos ou regras.

Resultado:

- READY: 17.496 / 46.656 = 37,5%
- learningStage 00 + READY: 0
- learningStage 01 + READY: 0
- learningStage 02 + READY: 14.160
- learningStage 03 + READY: 3.336
- nenhum dos 7.968 perfis-base conflitantes muda READY/NOT_READY apenas pelo TB.

Essa variante é a hipótese líder desta rodada.

### C — CAPABILITY_EVIDENCE

```text
READY se:
- houve alguma construção;
- Q2 = P2/P3;
- Q3 = S2/S3;
- Q4Effective = M2/M3;
- Q5Effective = D2/D3.
```

Resultado:

- READY: 3.144 / 46.656 = 6,7%
- READY ocorre apenas em `learningStage 03`;
- 1.800 perfis-base conflitantes mudam READY/NOT_READY conforme o TB.

Leitura: esta variante volta a transformar “escolher rota” em uma medida de capacidade avançada e herda a fragilidade do TB. Por isso, reproduz parte do problema arquitetural da V1.

---

## 4. Achado importante sobre a V1

A V1 classifica 768 cenários como Etapa 04.

Na hipótese B:

- 384 desses 768 são `READY`;
- 384 são `NOT_READY`.

Isto acontece porque o Gate04 atual **não usa Q2**. Assim, a V1 pode ativar uma rota mesmo quando a pessoa ainda respondeu `P0_NONE` ou `P1_AREA` — isto é, quando ainda não há uma ideia/projeto concreto.

Esse resultado reforça que o Gate04 atual mede uma combinação de competência técnica, não exatamente a prontidão decisória descrita no próprio roadmap.

Ao mesmo tempo, a hipótese B identifica 17.112 cenários `READY` que a V1 não classifica como 04. Isso não deve ser lido como “17 mil promoções”. É consequência direta de separar:

- **onde começar a aprender**;
- **se já é possível sugerir uma direção**.

Um resultado como este passa a ser válido:

```text
Ponto de partida para aprender: 02 — Criar visualmente
Direção de projeto: Jogos
Prontidão de rota: READY
```

Isso não afirma que a pessoa “pulou” a Etapa 03.

---

## 5. Por que B é a hipótese líder

B é preferida nesta rodada por quatro motivos.

### 5.1 Usa construtos coerentes com a função da decisão

Escolher uma rota requer principalmente que exista algo suficientemente concreto para orientar a escolha e que o projeto não seja totalmente nebuloso.

B usa:

- clareza de projeto;
- começo de estruturação.

Ela não exige domínio textual, debugging avançado ou transferência como pré-condições universais para simplesmente escolher uma direção.

### 5.2 Não reintroduz um score oculto

A regra pode ser explicada em linguagem comum:

> “Já existe algo concreto que a pessoa quer criar e ela consegue começar a explicar como isso se organiza?”

### 5.3 É imune ao TB atual

Q2 e Q3 não são reescritos pelo desempate. Portanto, os conflitos atuais não alteram `routeReadiness` em B.

Isso evita que uma pergunta criada para resolver inconsistências de autoria/representação mude indiretamente a recomendação de rota.

### 5.4 Mantém os eixos realmente separados

Em B, 14.160 cenários são `learningStage 02 + READY` e 3.336 são `learningStage 03 + READY`.

Isso é desejável no experimento: prontidão para escolher direção deixa de ser sinônimo de maior nível técnico.

---

## 6. O que B ainda NÃO prova

B continua sendo uma heurística editorial.

O experimento não demonstra que `P2/P3 + Q3 != S0` seja um threshold cientificamente validado. A literatura e as fontes canônicas sustentam o uso de sinais observáveis e a flexibilidade da progressão, mas não fornecem este corte exato.

Portanto, B deve ser tratada como hipótese de produto a ser testada semanticamente e com usuários.

---

## 7. routeSuggestion

No experimento:

- se `routeReadiness = READY`, `Q7` ativa a sugestão de rota;
- `I_UNSURE` continua válido e gera `open_exploration`;
- se `NOT_READY`, Q7 permanece apenas como contexto e `routeSuggestion = null`.

Interesse não altera `learningStage` nem `routeReadiness`.

---

## 8. Q5 e TB continuam separados

Esta fase **não implementa** ainda as duas correções já identificadas:

1. D3 deve passar a representar “formular hipótese + testar”, sem exigir consultar uma fonte;
2. o TB deve deixar de reescrever dimensões não conflitantes.

Essas mudanças não foram misturadas aqui para preservar causalidade experimental.

A principal vantagem de B é que `routeReadiness` já fica independente do TB atual.

---

## 9. Decisão recomendada após este experimento

**Não alterar produção ainda.**

A arquitetura em dois eixos resolve conceitualmente o maior problema observado até agora e B é a melhor hipótese de routeReadiness desta rodada.

Próxima validação recomendada:

1. montar amostra manual de perfis nas quatro células principais:
   - 02 + NOT_READY;
   - 02 + READY;
   - 03 + NOT_READY;
   - 03 + READY;
2. incluir casos que hoje são V1=04 mas B=NOT_READY;
3. incluir casos V1!=04 mas B=READY;
4. revisar se o resultado combinado produz uma orientação que um pai/jovem consegue entender sem interpretar `READY` como “domínio técnico”;
5. somente depois desenhar a saída pública e decidir se a V1.1 substitui `stage 04` pela arquitetura 2D.

---

## 10. Arquivos do experimento

- `diagnostico/diagnostic-two-axis-experiment.js`
- `diagnostico/diagnostic-two-axis-experiment-snapshot.json`
- `diagnostico/diagnostic-two-axis-experiment-tests.js`

Nenhum arquivo de produção foi alterado.
