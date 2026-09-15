# Diagnóstico ROTA ZERO ZERO — copy pública V1.1

**Status:** revisão semântica final da copy. Não altera a UI de produção.

## 1. Objetivo

Esta fase traduz a especificação `R00-DIAG-1.1.0` para linguagem pública sem mudar as regras do motor.

Fontes de decisão:

- Livro-fonte V2.1: sequência flexível, sinais observáveis, `interesse → projeto → tecnologia`, projeto pequeno antes da ferramenta;
- Creative Direction: orientação, não pré-requisitos rígidos; “Ainda não sei” como saída legítima;
- Juiz de Português e Estilo: clareza, naturalidade, concisão e preservação de sentido;
- Limite de Intervenção Editorial: alterar apenas onde a V1.1 realmente criou uma necessidade nova.

A copy não deve transformar a heurística em teste de competência, certificação ou escala validada.

## 2. O que permanece

Por intervenção mínima, C0, Q1, Q2, Q3, Q4 e Q6 permanecem essencialmente iguais à V1.

As mudanças necessárias estão em:

1. Q5/D3, porque o construto mudou;
2. Q7/helper, porque a rota agora é uma decisão separada do estágio;
3. TB, porque o desempate passou a esclarecer somente autoria;
4. resultado público, porque `stage 04` foi removido e entrou `routeDecision`.

## 3. Q5 — resposta ao erro

Título preservado:

> Quando o resultado não é o esperado, qual situação mais se aproxima do que acontece?

D3 passa a ser:

> **Formula uma hipótese sobre a causa e faz um teste específico para confirmá-la ou descartá-la.**

A expressão “consulta uma fonte” foi removida. Consultar documentação continua sendo um comportamento útil, mas não faz parte do construto D3 na V1.1.

## 4. Q7 — interesse atual

O helper passa a ser:

> **Seu interesse ajuda a definir a direção quando o projeto já está suficientemente claro. Ele não muda sozinho seu ponto de partida.**

Isso preserva duas ideias:

- Q7 não altera `learningStage` nem `routeDecision`;
- quando `routeDecision = SUGGEST_ROUTE`, Q7 orienta `routeSuggestion`.

## 5. TB — autoria

Pergunta normativa:

> **Sem seguir um passo a passo, até onde você consegue fazer uma pequena modificação em algo que já existe?**

Helper público:

> **Suas respostas sobre experiência e autonomia ficaram em tensão. Esta pergunta esclarece apenas o nível de ajuda necessário para modificar algo.**

Respostas:

- Ainda não consegue fazer essa modificação sem seguir o passo a passo.
- Consegue com alguma ajuda.
- Consegue sozinho.

A pergunta não menciona erro, debugging, explicação do resultado ou investigação. Isso evita voltar ao desempate genérico da V1.

## 6. Copy dos quatro learningStage

### 00 — Descobrir

> O ponto de partida é aproximar curiosidade e criação. Vale experimentar algo pequeno e observável antes de transformar a escolha de linguagem ou curso na principal decisão.

### 01 — Pensar

> Já existe algum sinal de experiência, ideia ou modificação. O próximo ganho vem de organizar melhor o problema: partes, regras, decisões e resultado esperado.

### 02 — Criar visualmente

> Já há material concreto e algum começo de estruturação. O próximo passo é construir, modificar e testar com resultado visível, sem fazer da sintaxe a primeira barreira.

### 03 — Escrever lógica

> Já há sinais de estrutura, autoria e investigação. O próximo passo é levar essa lógica para instruções escritas e usar erros como pistas durante a construção.

Os textos descrevem uma orientação de próximo passo. Não afirmam que a pessoa “dominou” a etapa anterior.

## 7. Copy dos quatro routeDecision

Os códigos internos não aparecem para o usuário.

### EXPLORE_FIRST

**Título público**

> Primeiro, transforme o interesse em uma ideia concreta.

**Corpo**

> Antes de escolher tecnologia, descubra algo pequeno que valha tentar criar. O objetivo agora é sair de um interesse amplo e chegar a uma ideia que possa ser experimentada.

### REDUCE_PROJECT

**Título público**

> Agora, reduza a ideia à menor versão útil.

**Corpo**

> A ideia já existe. Antes de escolher a ferramenta, defina a menor versão que ainda seria interessante e o que precisa acontecer para dizer que ela funcionou.

### STRUCTURE_PROJECT

**Título público**

> Organize a versão pequena antes de escolher a ferramenta.

**Corpo**

> A versão pequena já existe, mas ainda precisa ficar mais clara em partes, passos ou regras. Estruture o que deve acontecer antes de decidir a tecnologia.

### SUGGEST_ROUTE

**Título público**

> Já dá para sugerir uma direção para este projeto.

**Corpo**

> Existe uma versão pequena e já há algum começo de estruturação. A direção abaixo orienta o próximo experimento; ela não é uma certificação de domínio técnico.

## 8. Direção sugerida

Quando `routeDecision != SUGGEST_ROUTE`, a UI mostra apenas o interesse atual como contexto:

> Interesse atual: jogos. Ele pode orientar exemplos enquanto o projeto avança para a próxima decisão.

Quando `routeDecision = SUGGEST_ROUTE`, a UI mostra:

> Direção sugerida: Jogos.

Para `open_exploration`:

> Direção sugerida: exploração aberta. Ainda não escolher uma categoria é válido; compare pequenas formas de construir a versão definida antes de se especializar.

“Exploração aberta” não deve receber tratamento visual de erro, rota inferior ou ausência de resposta.

## 9. Confiança

`HIGH` não precisa de nota pública.

Para `MEDIUM` com TB:

> A pergunta extra foi usada apenas para esclarecer o nível de autonomia na modificação. O resultado continua sendo uma orientação, não uma prova de competência.

Para `MEDIUM` sem TB, causado por inconsistência suave:

> Algumas respostas descrevem experiências diferentes entre si. Use o resultado como orientação e confirme-o observando a próxima tentativa.

A UI não deve expor nomes como `hard conflict`, `soft inconsistency`, H2 ou códigos internos.

## 10. Motivos públicos

Mantém-se o limite visual de até dois sinais positivos e um ponto a desenvolver.

Mudança obrigatória:

- remover “hipótese, consulta a fontes e teste”;
- usar: **“Diante de um erro, já formula uma hipótese e testa uma causa específica.”**

Os reason codes de decisão (`NEEDS_*`, `ROUTE_SUGGESTION_AVAILABLE`) não precisam virar cards redundantes, porque a própria seção “próxima decisão” já comunica essa informação.

## 11. Contrato de apresentação

A tela de resultado V1.1 deve ser lida nesta ordem:

1. **Ponto de partida provável** — `learningStage`;
2. breve explicação desse ponto;
3. **Próxima decisão sobre o projeto** — `routeDecision` em linguagem humana;
4. interesse atual ou direção sugerida;
5. até três motivos observáveis;
6. nota de confiança somente quando necessária;
7. CTA para o roadmap.

Não apresentar `routeDecision` como segundo nível, nota, selo ou barra de progresso.

## 12. Testes semânticos

O módulo paralelo `diagnostic-copy-v1-1.js` e seus testes congelam os seguintes pontos:

- apenas learningStage 00–03;
- quatro decisões de projeto;
- D3 sem consulta a fonte;
- TB restrito a autoria;
- SELF/OTHER altera somente a frase de abertura;
- `open_exploration` é tratado como direção válida;
- até dois motivos positivos + um limite;
- nenhum texto público usa `READY`, `NOT_READY`, “Etapa 04” ou o desempate antigo.

## 13. Próxima fase

Após aprovação desta copy, adaptar a UI em branch separada para consumir `diagnostic-rules-v1-1.js` e `diagnostic-copy-v1-1.js`.

A UI V1 atual continua intacta até essa fase.
