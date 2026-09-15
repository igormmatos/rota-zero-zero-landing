# ROTA ZERO ZERO — Auditoria semântica do questionário V1

## Objetivo

A auditoria lógica responde se o algoritmo faz aquilo que foi programado.

Esta auditoria responde outra pergunta:

> **A pessoa entende cada pergunta e cada alternativa no mesmo sentido que o algoritmo pressupõe?**

É aqui que procuramos sobreposição semântica, falsas equivalências, termos vagos e diferenças entre “o que a alternativa parece dizer” e “a evidência que o motor entende que ela representa”.

Não é revisão gramatical. Uma frase pode estar correta em português e ainda medir o conceito errado.

---

## 1. Regra de teste

Para cada pergunta, testar quatro capacidades:

1. **Paráfrase:** a pessoa consegue explicar com as próprias palavras o que a alternativa significa?
2. **Exemplo:** consegue dar um exemplo real que caberia naquela alternativa?
3. **Contraste:** entende por que a alternativa vizinha é diferente?
4. **Escolha:** diante de duas alternativas próximas, sabe qual descreve melhor a situação sem precisar interpretar intenção escondida?

Não explicar o que “queríamos dizer” antes da resposta.

---

## 2. Mapa de riscos semânticos

| Pergunta | Evidência pretendida | Fronteira de risco | Possível falsa equivalência |
|---|---|---|---|
| Q1 — Experiência prática | histórico de construção/autoria | E1 × E2; E3 × E4 | concluir tutorial pode ser entendido como “projeto próprio” |
| Q2 — Clareza do projeto | definição e redução do que quer criar | P1 × P2; P2 × P3 | “ter uma ideia concreta” pode soar igual a “saber explicar a menor versão” |
| Q3 — Estrutura da ideia | decomposição e previsão | S1 × S2; S2 × S3 | “separar em partes” e “descrever passos/regras” podem parecer a mesma habilidade |
| Q4 — Modificação/autoria | independência para alterar e transferir | M1 × M2; M2 × M3 | “sozinho” pode ser interpretado como sem professor, mas com tutorial aberto |
| Q5 — Resposta ao erro | qualidade da investigação | D1 × D2; D2 × D3 | “testar uma mudança” pode ser escolhido mesmo sem hipótese clara |
| Q6 — Forma de criação | conforto atual com representação | R1 × R2; R2 × R3 | “ler/modificar código” pode ser confundido com experiência passada de Q1 |
| Q7 — Interesse atual | direção desejada, não capacidade | todas | interesse pode ser confundido com competência ou recomendação |
| TB — Desempate | autonomia sem tutorial | T0 × T1 × T2 | “com alguma ajuda” não define quanto nem qual tipo de ajuda |

---

## 3. Pontos prioritários encontrados pela auditoria lógica

### Q3 — S1 × S2

A auditoria lógica mostrou que, em 288 pares, a única mudança `S1_PARTS_HELP → S2_STEPS_RULES` leva de 02 para 04 quando as demais evidências já são fortes.

Portanto, não basta que as duas frases “pareçam diferentes”. Precisamos confirmar que usuários realmente distinguem:

- **separar algumas partes com ajuda**;
- **descrever passos, regras ou decisões principais**.

Teste cognitivo:

> “Imagine alguém que marcou a segunda opção. O que essa pessoa consegue fazer que alguém da primeira opção ainda não consegue?”

Sinal de problema: resposta equivalente a “faz mais sozinho” sem mencionar estrutura, passos, regras ou decisões.

### Q4 — M1 × M2

Também existem 288 pares em que `M1_SMALL_HELP → M2_SMALL_INDEPENDENT` leva de 02 para 04.

Teste cognitivo:

> “Quando você lê ‘sozinho’, isso significa sem uma pessoa ao lado, sem tutorial aberto, sem pesquisar na internet ou apenas que ninguém fez a mudança por você?”

Sinal de problema: participantes usam definições muito diferentes de “sozinho”.

Possível ajuste futuro, se confirmado o problema: trocar “sozinho” por uma descrição comportamental que diga quais tipos de apoio continuam permitidos.

### TB — T0 × T1

Na V1, `T0_NOT_YET` e `T1_WITH_HELP` nunca mudam a etapa nos 7.968 conflitos possíveis; só alteram evidência/reason codes.

Teste cognitivo:

> “Na prática, qual diferença você percebe entre ‘ainda não’ e ‘sim, com alguma ajuda’ nesta pergunta?”

Se usuários também não enxergarem diferença útil, há forte evidência de redundância. Se enxergarem uma diferença importante, pode ser correto manter as duas alternativas mesmo sem mudança de etapa, porque a explicação do resultado pode ganhar precisão.

---

## 4. Roteiro de entrevista cognitiva

Aplicar o questionário normalmente. Depois de cada resposta, em uma versão de pesquisa — nunca na experiência final — usar perguntas neutras como:

- “O que essa opção quer dizer para você?”
- “Consegue lembrar de uma situação em que isso aconteceu?”
- “Qual seria a diferença para a opção imediatamente acima?”
- “Teve alguma palavra que ficou vaga?”
- “Você ficou entre duas respostas? Quais?”
- “Que informação faltou para decidir?”

Evitar:

- “Você entendeu que ‘sozinho’ quer dizer sem tutorial, certo?”
- “Não acha que essa opção combina mais?”
- explicar a lógica das etapas antes de a pessoa responder.

Essas intervenções contaminam o teste.

---

## 5. Pares mínimos para auditoria humana

Os pares abaixo mudam uma única evidência. O objetivo é perguntar se a diferença percebida pelo leitor é forte o bastante para justificar a diferença algorítmica.

### P1 — Estrutura

```text
Perfil A: E1 / P0 / S1 / M2 / D3 / R3 / I_WEB → 02
Perfil B: E1 / P0 / S2 / M2 / D3 / R3 / I_WEB → 04
```

Pergunta ao auditor:

> Essa mudança em Q3 representa uma mudança real de prontidão ou apenas uma mudança de formulação percebida?

### P2 — Autoria

```text
Perfil A: E1 / P0 / S2 / M1 / D3 / R3 / I_WEB → 02
Perfil B: E1 / P0 / S2 / M2 / D3 / R3 / I_WEB → 04
```

Pergunta ao auditor:

> A fronteira “com ajuda” × “sozinho” é observável e consistente o suficiente para carregar esse peso?

### P3 — Interesse não pode virar competência

```text
Mesmo perfil, Q7 varia entre Web / Jogos / Apps / IA / Automação / Ainda não sei.
```

Esperado:

> a etapa permanece idêntica; apenas contexto/rota pode mudar conforme a regra do 04.

Pergunta ao auditor:

> A redação de Q7 deixa claro que estamos perguntando o que a pessoa quer criar, e não no que ela é melhor?

### P4 — Experiência × conforto atual

```text
Q1: “já escreveu/modificou código”
Q6: “ler/modificar código parece confortável hoje”
```

Pergunta ao auditor:

> A pessoa entende que Q1 pergunta o que já aconteceu e Q6 pergunta qual representação já é confortável hoje?

Se usuários respondem Q6 apenas repetindo Q1, os dois itens podem estar parcialmente redundantes na prática.

---

## 6. Formulário de registro por participante

Não registrar nome de criança/adolescente. Usar apenas um identificador anônimo de sessão.

| Campo | Registro |
|---|---|
| session_id | código anônimo |
| contexto | SELF / OTHER |
| pergunta | Q1–Q7 / TB |
| resposta escolhida | código |
| ficou entre alternativas? | sim / não |
| alternativa concorrente | código, se houver |
| paráfrase | texto curto |
| exemplo dado | texto curto |
| termo ambíguo | texto curto |
| observação do pesquisador | texto curto |

Não coletar escola, nome, endereço, data de nascimento ou contato do jovem para esta validação.

---

## 7. Critérios para abrir uma issue de revisão

Uma alternativa entra em revisão quando ocorrer pelo menos uma destas condições:

- participantes diferentes dão interpretações incompatíveis para o mesmo termo central;
- a maioria não consegue explicar a diferença entre duas alternativas vizinhas;
- uma pessoa escolhe uma alternativa por um conceito que pertence a outra pergunta;
- “projeto próprio”, “sozinho”, “ajuda”, “ideia concreta”, “testar” ou outro termo crítico mostra interpretação instável;
- o resultado surpreende a pessoa por uma evidência que ela não reconhece na própria resposta;
- um par mínimo produz um salto de etapa que auditores humanos não conseguem justificar sem conhecer o algoritmo.

Não alterar texto após um único relato isolado sem verificar se o problema se repete.

---

## 8. Ordem da validação

```text
1. Auditoria exaustiva do motor
2. Auditoria dos pares mínimos
3. Entrevistas cognitivas das perguntas
4. Teste do questionário completo sem explicar o algoritmo
5. Pergunta pós-resultado: “isso descreve onde você está?”
6. Revisão conjunta de copy + gates somente se houver evidência
```

O objetivo não é fazer usuários concordarem com o resultado. É descobrir se o sistema está usando evidências que eles interpretam de forma consistente e que nós conseguimos justificar editorialmente.
