# Diagnóstico V1.1 — Experimentos de Gate04, Q5/D3 e desempate

**Status:** pesquisa / auditoria. Não altera o motor de produção `R00-DIAG-1.0.0` nem a UI.

## 1. Objetivo

A auditoria científica V1 concluiu que os construtos centrais do diagnóstico são defensáveis como sinais relevantes, mas que os thresholds exatos são heurísticas editoriais. Três pontos ficaram prioritários:

1. Gate04 não deve depender universalmente de representação textual nem de D3;
2. Q5/D3 mistura hipótese, consulta a fonte e teste;
3. o TB atual mistura autonomia, autoria, teste e explicação, e ainda reescreve Q4 e Q5 ao mesmo tempo.

Este experimento compara alternativas sem tocar na produção.

A pergunta não é “qual regra parece mais bonita?”. É:

> Qual alternativa reduz fragilidades identificadas pela literatura, preserva explicabilidade e produz comportamento combinatório menos abrupto?

## 2. Base científica que limita o desenho

O mapa de evidências já aprovado classifica:

- Q3 decomposição/estrutura como construto **A**, mas o corte S1→S2 como **R**;
- Q4 autonomia/transferência como **A**, mas M1→M2 como **R**;
- Q5 debugging sistemático como **A**, mas D3 atual como **R** por misturar construtos;
- Q6 visual/textual como **B**, mas texto obrigatório em Gate04 como **R**;
- TB como **R** tanto no construto quanto no threshold;
- Gate04 como **R**, sendo o maior risco científico/editorial.

Portanto, nenhuma variante abaixo é “validada cientificamente”. Elas são heurísticas de produto comparadas à luz da evidência disponível.

## 3. Espaço testado

Mantivemos o mesmo universo da auditoria exaustiva:

- 30.720 combinações base de Q1–Q7;
- conflitos H1–H4 expandidos pelas três respostas de TB da V1;
- 46.656 cenários classificáveis;
- teste de fronteira por mudança de uma única alternativa ordinal em Q1–Q6;
- regressão = subir uma evidência e cair de etapa;
- salto >1 = uma única mudança adjacente fazer a etapa avançar dois níveis.

A distribuição combinatória não representa prevalência real de usuários.

## 4. Regra comum experimental `core04`

As alternativas V1.1 retiram dois requisitos universais do Gate04 atual:

- **texto não é mais obrigatório**;
- **D3 não é mais obrigatório**.

O núcleo comum passa a exigir:

- alguma experiência de construção (`Q1 != E0` ou `Q6 != R0`);
- projeto reduzido a uma versão mínima (`P3`);
- estruturação suficiente (`S2` ou `S3`);
- modificação autônoma/transferência (`M2` ou `M3`);
- debugging pelo menos sistemático (`D2` ou `D3`).

Esse núcleo continua sendo heurístico. A vantagem é que ele deixa de transformar texto e busca de fontes em requisitos universais de prontidão para escolher uma rota.

## 5. Alternativas testadas

### A — `A_CORE04`

Usa apenas o núcleo comum.

**Vantagem:** regra simples.

**Problema:** fica permissiva demais. Como S2, M2 ou D2 podem ser o último requisito faltante, surgem mais saltos 02→04.

### B — `B_TWO_STRONG_SIGNALS`

Núcleo comum + pelo menos 2 sinais fortes entre:

- E4 projeto próprio;
- S3 previsão de consequências;
- M3 transferência;
- D3 hipótese/teste;
- R3 escrita textual.

**Vantagem:** reduz saltos.

**Problema:** cria uma contagem latente de sinais. Mesmo sendo determinística, ela se aproxima de um score escondido e perde explicabilidade.

### C — `C_PROJECT_AUTHORSHIP`

Núcleo comum + pelo menos um de:

- E4 projeto próprio;
- S3 previsão de consequências;
- M3 transferência.

**Vantagem:** regra fácil de explicar.

**Problema:** ainda deixa muitas fronteiras abruptas, principalmente quando D1→D2 se torna o último requisito.

### D — `D_AGENCY_REPRESENTATION` — candidato líder

Núcleo comum + duas famílias explícitas:

**Agência:**
- E4 projeto próprio **ou**
- M3 transferência de uma ideia para outra situação.

**Profundidade de representação:**
- S3 prever consequências de uma mudança **ou**
- R3 escrever um pequeno programa e explicar suas partes.

Esse desenho não torna texto obrigatório: S3 pode satisfazer a segunda família. Também não transforma D3 em hard gate ou sinal especial obrigatório.

## 6. Resultado dos 46.656 cenários

| Modelo | 00 | 01 | 02 | 03 | 04 | Cenários que mudam vs V1 | Saltos >1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| V1 | 288 | 16.176 | 23.520 | 5.904 | 768 | 0 | 576 |
| A_CORE04 | 288 | 16.176 | 23.520 | 5.100 | 1.572 | 1.956 | 912 |
| B_TWO_STRONG_SIGNALS | 288 | 16.176 | 23.520 | 5.790 | 882 | 1.278 | 408 |
| C_PROJECT_AUTHORSHIP | 288 | 16.176 | 23.520 | 5.472 | 1.200 | 1.668 | 600 |
| **D_AGENCY_REPRESENTATION** | **288** | **16.176** | **23.520** | **6.168** | **504** | **1.092** | **180** |
| D + TB targeted | 768 | 16.320 | 24.672 | 4.524 | 372 | 4.608 | 180 |

### Leitura

O modelo D altera 1.092 de 46.656 cenários, ou aproximadamente **2,34%** do espaço testado.

Ao mesmo tempo, reduz saltos de duas etapas de 576 para 180: redução de **68,75%**.

Isso não prova que D é correto. Mostra apenas que ele é o melhor candidato encontrado nesta rodada em três critérios simultâneos:

1. não exige texto universalmente;
2. não exige D3 universalmente;
3. reduz bastante descontinuidades sem introduzir contagem oculta de sinais.

## 7. Onde os saltos restantes ficam no modelo D

| Pergunta | V1 | Modelo D |
|---|---:|---:|
| Q1 | 0 | 0 |
| Q2 | 0 | 0 |
| Q3 | 288 | 60 |
| Q4 | 288 | 48 |
| Q5 | 0 | 72 |
| Q6 | 0 | 0 |

Q3 e Q4 melhoram fortemente.

Q5 passa a ter 72 saltos possíveis porque `D1→D2` pode se tornar o último requisito do núcleo comum. Isso é um sinal para auditoria futura: não deve ser tratado como problema resolvido.

Nenhuma alternativa testada apresentou regressão monotônica em pares não conflitantes.

## 8. Q5/D3 — proposta semântica V1.1

A escala pode continuar com quatro níveis, mas D3 precisa medir debugging, não busca de informação.

### D0

> Para ou precisa que alguém indique o próximo passo.

### D1

> Tenta mudanças diferentes, mas sem comparar de forma sistemática o que esperava com o que aconteceu.

### D2

> Compara o esperado com o resultado e testa uma mudança de cada vez.

### D3 proposto

> Formula uma hipótese sobre a causa e faz um teste específico para tentar confirmá-la ou descartá-la.

**Mudança central:** “consultar uma fonte” deixa de fazer parte do construto D3.

Buscar documentação, ajuda ou exemplos continua sendo um comportamento positivo de aprendizagem, mas não é tratado como condição necessária para uma estratégia de debugging ser classificada no nível superior.

Para compatibilidade técnica, a renomeação do código `D3_HYPOTHESIS_SOURCE` para algo como `D3_HYPOTHESIS_TEST` deve ocorrer apenas quando houver decisão de versão do motor.

## 9. TB — proposta atômica

O TB atual não deve ser levado intacto para uma V1.1. Ele mistura várias habilidades e altera simultaneamente Q4 e Q5.

A alternativa testada é usar desempate somente para H2:

> **Sem seguir um passo a passo, até onde você consegue fazer uma pequena modificação em algo que já existe?**

- T0: Ainda não consigo fazer essa modificação.
- T1: Consigo com alguma ajuda.
- T2: Consigo sozinho.

Mapeamento experimental:

- T0 → M0;
- T1 → M1;
- T2 → M2.

O TB não altera Q5.

H1, H3 e H4 seriam tratados como **inconsistências suaves**, não como contradições que exigem automaticamente uma pergunta extra.

## 10. Por que o novo TB não deve ser aplicado junto com Gate04 nesta fase

Quando aplicamos o modelo D e a política targeted de TB simultaneamente, **4.608 de 46.656 cenários mudam em relação à V1**, cerca de **9,88%**.

Essa mudança é grande demais para ser misturada ao ajuste de Gate04 se quisermos saber qual alteração causou cada efeito.

### Decisão experimental

**Não combinar as duas mudanças agora.**

Sequência recomendada:

1. validar Gate04-D mantendo a normalização V1;
2. alterar apenas a semântica/copy de Q5-D3;
3. depois testar TB targeted em uma rodada própria;
4. só então considerar uma versão de produção `R00-DIAG-1.1.x`.

## 11. O que o experimento não resolve

- não valida psicometricamente as etapas;
- não substitui avaliação de conteúdo por especialistas;
- não prova que D é melhor para usuários reais;
- não resolve sozinho autorrelato versus desempenho real;
- não elimina todos os saltos de fronteira;
- não define ainda os futuros microcenários de desempenho.

## 12. Próxima validação antes de produção

Antes de mexer em `diagnostic-rules.js`, revisar manualmente uma amostra estratificada de perfis que mudam entre V1 e D:

- V1 04 → D 03;
- V1 03 → D 04;
- casos Q3 que ainda saltam 02→04;
- casos Q4 que ainda saltam 02→04;
- casos Q5 D1→D2 que saltam 02→04.

A revisão deve responder:

> O resultado D parece uma consequência defensável dos construtos do roadmap, ou estamos apenas trocando um threshold arbitrário por outro?

Só depois dessa inspeção o candidato D deve ir para bateria humana/semântica e eventual implementação.
