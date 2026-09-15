# ROTA ZERO ZERO — Auditoria cega por pares mínimos V1

## Objetivo

Esta fase compara o julgamento humano do ponto de partida com a saída do algoritmo sem mostrar previamente o resultado determinístico.

A intenção não é provar que o humano está certo nem que o motor está certo. Uma divergência indica uma **fronteira que merece revisão**.

A bateria foi construída a partir dos achados da auditoria exaustiva V1, com foco especial em:

- saltos `02 → 04` provocados por uma única mudança adjacente em Q3;
- saltos `02 → 04` provocados por uma única mudança adjacente em Q4;
- equivalência de etapa entre `T0_NOT_YET` e `T1_WITH_HELP`;
- fronteira entre `T1_WITH_HELP` e `T2_YES`;
- demais transições importantes entre 00, 01, 02, 03 e 04;
- invariantes de contexto e interesse.

---

## Como executar

Na raiz do repositório:

```bash
node diagnostico/diagnostic-blind-audit.js
```

Para salvar o relatório ao final:

```bash
node diagnostico/diagnostic-blind-audit.js --out=diagnostico/audit-human-results.json
```

O arquivo de saída não contém nome, e-mail nem qualquer dado pessoal. Ele registra somente julgamentos sobre os perfis fictícios da bateria.

---

## Como responder

Para cada par A/B:

1. leia o perfil completo;
2. escolha a etapa que **você indicaria como próximo ponto de partida provável** para A;
3. faça o mesmo para B;
4. avalie se a diferença textual entre A e B representa uma diferença de capacidade suficientemente clara:
   - `0` — não está clara / parece a mesma coisa;
   - `1` — parcialmente clara;
   - `2` — claramente diferente;
5. opcionalmente registre o motivo.

Não tente adivinhar o algoritmo. Julgue a pessoa descrita.

### Etapas disponíveis

- `00` — Descobrir
- `01` — Pensar
- `02` — Criar visualmente
- `03` — Escrever lógica
- `04` — Escolher um caminho

---

## Regra de cegamento

O script só revela os resultados do motor **depois que os 12 pares forem respondidos**.

Para preservar a auditoria, não consulte antes:

- `diagnostic-blind-audit-tests.js`;
- gates em `diagnostic-rules.js`;
- relatórios anteriores que indiquem o resultado específico dos pares.

Depois da bateria, esses arquivos podem e devem ser usados para a análise.

---

## Os 12 focos da bateria

| ID | Mudança isolada | O que estamos auditando |
|---|---|---|
| B01 | Q3: separar partes com ajuda → descrever passos/regras | se a fronteira de estrutura está forte demais |
| B02 | Q4: modificar com ajuda → modificar sozinho | se a fronteira de autoria está forte demais |
| B03 | TB: ainda não → sim, com alguma ajuda | se duas respostas semanticamente diferentes deveriam produzir efeitos distintos |
| B04 | TB: com alguma ajuda → sim | quão forte deve ser a autonomia declarada no desempate |
| B05 | Q3: vaga → separar partes com ajuda | fronteira 01/02 |
| B06 | Q4: passo a passo → modificar com ajuda | fronteira 00/01 |
| B07 | Q5: tentativa e erro → comparação sistemática | fronteira 02/03 |
| B08 | Q6: ler/modificar → escrever pequeno programa | fronteira 03/04 |
| B09 | Q1: experiência visual → experiência textual | fronteira 03/04 por experiência prévia |
| B10 | Q2: área de interesse → ideia concreta | fronteira 00/01 |
| B11 | Q7: jogos → web | invariante: interesse não deve mudar etapa |
| B12 | C0: por mim → por outra pessoa | invariante: contexto não deve mudar classificação |

---

## Como interpretar o relatório

O script informa duas medidas simples:

### Acerto exato de etapa

Compara a etapa escolhida pelo auditor com a etapa retornada pelo motor para cada perfil.

Isto **não é uma nota de qualidade do auditor**. Serve apenas para localizar discordâncias.

### Concordância sobre manter ou mudar etapa

Compara se humano e motor concordam sobre a relação do par:

- A e B deveriam permanecer na mesma etapa; ou
- a mudança isolada deveria alterar a etapa.

Essa medida costuma ser mais útil que o acerto exato porque avalia diretamente o peso da fronteira.

---

## Critérios de revisão após a bateria

Uma fronteira deve entrar em revisão quando ocorrer pelo menos uma destas situações:

1. o auditor mantém A e B na mesma etapa, mas o motor muda;
2. o auditor muda A e B, mas o motor mantém;
3. o auditor atribui clareza semântica `0` ou `1` a uma alternativa que tem alto poder classificatório;
4. a justificativa humana mostra que a pergunta foi interpretada de forma diferente do construto pretendido;
5. mais de um auditor independente apresenta a mesma divergência.

Nenhum desses itens autoriza uma mudança automática no gate. Primeiro classificar a causa como:

- **copy** — o conceito é válido, mas o texto não o comunica bem;
- **gate** — a diferença existe, mas recebe peso classificatório inadequado;
- **modelo** — duas dimensões que deveriam ser independentes estão sendo tratadas como equivalentes;
- **sem problema** — a divergência é justificável e a regra continua coerente.

---

## Próxima etapa recomendada

Depois de uma primeira rodada com o autor do produto, repetir a mesma bateria com 3–5 pessoas sem acesso aos gates, idealmente misturando:

- alguém com experiência em programação;
- um pai/responsável leigo;
- um jovem ou adulto iniciante;
- alguém com experiência em ensino ou mentoria, se disponível.

O objetivo não é obter significância estatística. É detectar **interpretações recorrentes** antes de validar o diagnóstico com usuários reais em maior escala.
