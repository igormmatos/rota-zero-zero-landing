# Auditoria Científica do Diagnóstico ROTA ZERO ZERO — V1

**Status:** revisão de fundamentação; não altera o motor.

**Objetivo:** separar três camadas que não devem ser confundidas:

1. o que a literatura sustenta sobre aprendizagem e avaliação de programação;
2. o que a literatura sustenta apenas sobre os construtos, mas não sobre os cortes usados pelo produto;
3. o que é regra editorial/heurística da ROTA ZERO ZERO.

A pergunta auditada não é “o algoritmo parece razoável?”. A pergunta é:

> **Quais partes do instrumento podem ser defendidas por evidência acadêmica e quais partes precisam permanecer explicitamente como heurísticas editoriais?**

---

## 1. Conclusão executiva

O diagnóstico V1 possui **boa base conceitual para os sinais que observa**, especialmente decomposição/estruturação, autoria/modificação, depuração, autonomia progressiva e distinção entre experiência visual e textual.

Porém, **a literatura localizada não valida a sequência 00→04 nem os thresholds determinísticos usados pelos gates**. O produto não deve ser apresentado como teste psicométrico, prova de competência ou instrumento validado de prontidão.

A evidência é mais forte para dizer:

> “estes comportamentos são sinais relevantes para observar aprendizagem em programação”.

Ela é muito mais fraca para dizer:

> “esta combinação exata de respostas significa que a pessoa está na etapa 03 e não na 02 ou 04”.

A distinção é central.

### Resultado geral da auditoria

- **Manter:** arquitetura multidimensional; separação entre interesse e etapa; caráter orientativo; ausência de score total; uso de sinais de autoria, estrutura, depuração e autonomia.
- **Revisar antes de tratar como versão estável:** Gate04 como regra universal, sobretudo a exigência textual; TB como desempate composto; D3 como requisito que combina hipótese + consulta a fonte; saltos 02→04 produzidos por S1→S2 e M1→M2.
- **Não afirmar:** que o instrumento mede competência, prontidão, talento ou nível real de programação.

---

## 2. Método da revisão

Foram usados dois grupos de fontes.

### 2.1 Fontes internas do projeto

O Livro-fonte V2.1 e a Matriz de Evidências já estabelecem que:

- a sequência do roadmap é editorial, não uma ordem universal;
- apoio deve ser contingente e progressivamente retirado;
- decomposição e abstração são construtos centrais de pensamento computacional;
- blocos podem reduzir barreiras, mas a transferência para texto não é automática;
- modificar, explicar, prever e transferir são sinais mais informativos do que apenas assistir ou copiar;
- prontidão deve ser inferida por sinais observáveis, não por certificados ou tempo de curso.

Essas bases foram preservadas.

### 2.2 Literatura externa consultada

Foram priorizados artigos revisados por pares, revisões sistemáticas e estudos empíricos diretamente relacionados a:

- avaliação de pensamento computacional;
- avaliação formativa em programação;
- depuração;
- transição entre blocos e texto;
- scaffolding/autonomia;
- leitura, explicação e escrita de código;
- construção de artefatos e avaliação baseada em desempenho.

A literatura foi usada para **delimitar o que pode ser afirmado**, não para fabricar um grau de certeza que os estudos não oferecem.

---

## 3. Regra de classificação da evidência

| Classe | Significado |
|---|---|
| **A — suporte direto ao construto** | Há evidência consistente de que o comportamento/construto é relevante para aprendizagem ou avaliação de programação/CT. |
| **B — suporte indireto/adjacente** | O construto é sustentado, mas em população, modalidade ou contexto diferente do diagnóstico. |
| **C — heurística editorial** | A literatura não valida o corte, a ordem ou a regra determinística específica. Pode existir como decisão de produto, desde que identificada como tal. |
| **R — requer revisão** | A regra mistura construtos, transforma uma relação não hierárquica em hierarquia, ou corre risco de produzir interpretação científica mais forte que a evidência disponível. |

Nenhuma classe significa “verdade absoluta”.

---

# 4. Auditoria por pergunta

## C0 — SELF / OTHER

**Função atual:** ajustar microcopy sem mudar classificação.

**Classificação:** **C — editorial, adequada.**

Não há necessidade de fundamentação acadêmica específica porque C0 não mede habilidade nem altera o resultado.

**Decisão recomendada:** manter como está.

---

## Q1 — Experiência prática

Escala:

- E0_NONE
- E1_FOLLOWED
- E2_MODIFIED_VISUAL
- E3_WRITTEN_SMALL
- E4_OWN_PROJECT

### O que a literatura sustenta

A distinção entre **consumir/copiar** e **produzir/modificar artefatos** é consistente com abordagens de avaliação de pensamento computacional baseadas em projetos, processos e práticas. Brennan & Resnick propõem portfólios, entrevistas baseadas em artefatos e cenários de design justamente para observar práticas, não apenas conhecimento declarado. Zhang & Nouri mostram que Scratch pode desenvolver múltiplas habilidades de CT e que a avaliação dessas habilidades é multidimensional.

Papavlasopoulou et al. também dão suporte ao valor de experiências construcionistas baseadas em criação de artefatos.

### O que a literatura não sustenta

Não há evidência localizada de que a sequência E0<E1<E2<E3<E4 seja uma **escala psicométrica unidimensional** de competência.

“Ter concluído um projeto próprio” não implica automaticamente competência maior em todos os construtos do que alguém que escreveu e depurou pequenos programas bem compreendidos.

Além disso, Q1 é **autorrelato**. Tang et al. mostram que avaliações de habilidades de CT frequentemente usam testes de desempenho e artefatos, enquanto surveys são mais usados para disposições. Portanto, a resposta a Q1 deve ser tratada como **contexto autorrelatado**, não demonstração de domínio.

**Classificação:** **B para o construto; C para os cortes.**

**Recomendação:** manter, mas nunca usar Q1 isoladamente para declarar competência.

---

## Q2 — Clareza do projeto

Escala:

- P0_NONE
- P1_AREA
- P2_IDEA
- P3_MINIMUM

### O que a literatura sustenta

Abordagens construcionistas dão valor a projetos significativos e à criação de artefatos. A decomposição de um objetivo em algo executável também é coerente com pensamento computacional.

### Limite da evidência

Não foi localizada evidência que valide “ter uma ideia concreta” ou “conseguir reduzi-la à menor versão” como **nível de competência em programação** ou como critério universal para progressão.

Isto é principalmente uma boa decisão de design do produto ROTA ZERO ZERO: começar pelo que se quer criar e reduzir escopo antes de escolher tecnologia.

**Classificação:** **C — heurística editorial informada por teoria.**

**Recomendação:** manter como eixo de orientação, não como prova de habilidade.

---

## Q3 — Estrutura da ideia

Escala:

- S0_VAGUE
- S1_PARTS_HELP
- S2_STEPS_RULES
- S3_CONSEQUENCES

### O que a literatura sustenta

Decomposição, abstração, pensamento algorítmico e previsão de comportamento aparecem repetidamente em frameworks e avaliações de pensamento computacional. Tang et al. encontraram que avaliações de CT frequentemente cobrem programação/computação e construtos como pensamento algorítmico, lógica, abstração e resolução de problemas. Zhang & Nouri também identificam pensamento preditivo entre as habilidades observadas em estudos com Scratch.

O Livro-fonte já usa decomposição e a capacidade de alterar uma regra e explicar efeitos como sinal observável.

### Ponto crítico

A auditoria exaustiva mostrou que, em certos perfis, mudar apenas **S1→S2** permite salto **02→04** porque S2 é o último requisito faltante do Gate04.

A literatura sustenta que descrever passos/regras é um sinal relevante. **Não sustenta que essa fronteira específica tenha poder suficiente para representar um salto de duas etapas.**

**Classificação:** **A para o construto; C/R para S1→S2 como threshold de Gate04.**

**Recomendação:** manter Q3; reavaliar o peso determinístico de S2 no Gate04.

---

## Q4 — Modificação e autoria

Escala:

- M0_COPY_ONLY
- M1_SMALL_HELP
- M2_SMALL_INDEPENDENT
- M3_TRANSFER

### O que a literatura sustenta

Apoio contingente e redução progressiva da ajuda estão bem estabelecidos em scaffolding. Mermelshtine descreve intervenções parentais ajustadas às capacidades observadas da criança com o objetivo de possibilitar trabalho independente. Wood, Bruner & Ross são a base clássica desse conceito.

Brennan & Resnick tratam práticas como remixing/iterating e desenvolvimento de práticas computacionais como parte relevante do aprendizado. A Matriz V2.1 também sustenta, com grau moderado-alto, que modificar, explicar, prever e transferir são mais informativos do que apenas assistir/copiar.

### Ponto crítico

A literatura sustenta **autonomia progressiva**, mas não valida M1→M2 como um corte universal entre “ainda não pronto” e “pronto”.

Na auditoria exaustiva, M1→M2 também pode produzir salto 02→04 quando é o último requisito faltante.

**Classificação:** **A/B para autonomia e transferência; C/R para M1→M2 como threshold rígido.**

**Recomendação:** manter o construto; reduzir a interpretação categórica do corte.

---

## Q5 — Resposta ao erro

Escala:

- D0_STOP
- D1_TRIAL
- D2_COMPARE
- D3_HYPOTHESIS_SOURCE

### O que a literatura sustenta

Debugging é uma habilidade central e difícil para iniciantes. McCauley et al. já tratavam depuração como um problema complexo de aprendizagem. A revisão sistemática de Yang et al. (2024), cobrindo intervenções de 2010–2022, reforça que depuração envolve modelos mentais do código, localização de falhas, estratégias e experiência, além de dimensões não cognitivas. A revisão também observa sucesso limitado em fazer estudantes adotarem estratégias sistemáticas de debugging.

Logo, a progressão de “parar” → “tentativa sem hipótese” → “comparar esperado e observado” → “formular hipótese e testar” é pedagogicamente defensável como descrição de estratégias cada vez mais sistemáticas.

### Ponto crítico 1 — D3 mistura comportamentos

D3 atualmente exige:

> formular hipótese + consultar uma fonte quando necessário + testar solução.

A literatura sustenta fortemente hipótese, teste, comparação e investigação sistemática. **Consultar uma fonte** é uma estratégia útil de autorregulação, mas não foi encontrada evidência para tratá-la como componente obrigatório de competência de debugging.

### Ponto crítico 2 — D3 é gargalo do Gate04

Gate04 exige D3. Isso transforma uma estratégia avançada de debugging em requisito universal para “escolher um caminho”. Não há validação localizada para esse threshold.

**Classificação:** **A para debugging sistemático; R para D3 como composto e como requisito universal do Gate04.**

**Recomendação:** separar conceitualmente “formular hipótese e testar” de “consultar fonte”; reavaliar D3 como requisito obrigatório.

---

## Q6 — Forma de criação

Escala:

- R0_NONE
- R1_VISUAL
- R2_READ_MODIFY_TEXT
- R3_WRITE_TEXT

### O que a literatura sustenta

Há evidência de que leitura, tracing, explicação e escrita de código são habilidades relacionadas em iniciantes, especialmente em estudos de CS1. Trabalhos de Lister e de Venables/Tan/Lister mostram relações entre tracing, explicação e escrita, embora os próprios autores alertem para sensibilidade ao tipo de questão e ao contexto.

Também há boa evidência de que blocos são uma forma legítima de programação introdutória. Weintrop & Wilensky encontraram, em estudo quase-experimental de ensino médio, maiores ganhos iniciais no grupo de blocos; após a transição para Java, diferenças entre grupos desapareceram. Isso não sustenta uma hierarquia simples em que “texto” representa sempre estágio superior de aprendizagem.

Zhang & Nouri e Fagerlund et al. mostram que ambientes como Scratch permitem desenvolver e avaliar ampla gama de habilidades de CT.

### Ponto crítico — Gate04

O Gate04 exige R2/R3 e, adicionalmente, experiência textual/projeto via E3/E4/R3.

Isso significa que um aprendiz com forte autoria, estrutura, depuração e experiência visual pode não chegar à etapa “Escolher um caminho” apenas porque ainda não usa texto.

A literatura revisada **não justifica texto como requisito universal para escolher uma rota tecnológica**. Ao contrário, a evidência sobre blocos→texto recomenda cautela com essa hierarquização.

**Classificação:** **B para relação leitura/escrita; R para texto como hard gate universal de 04.**

**Recomendação prioritária:** reavaliar a exigência textual do Gate04. Texto pode ser requisito para certos caminhos ou um sinal adicional, não necessariamente um pré-requisito universal para escolher a próxima rota.

---

## Q7 — Interesse atual

### Função atual

Escolhe contexto nos estágios 00–03 e rota no estágio 04, sem alterar a etapa.

### Avaliação

Separar interesse de competência é conceitualmente prudente. Interesse, motivação e afinidade não equivalem a domínio técnico.

A literatura de avaliação de CT também distingue habilidades de disposições/atitudes. Tang et al. observam que surveys são frequentemente usados para disposições, enquanto habilidades são avaliadas com outras formas de evidência.

**Classificação:** **B/C — arquitetura editorial coerente.**

**Recomendação:** manter o invariante “Q7 sozinho não muda stage”.

---

## TB — Pergunta de desempate

Pergunta atual:

> Sem um tutorial aberto, você consegue pegar uma ideia bem pequena, mudar alguma coisa, testar e explicar o que aconteceu?

Alternativas:

- T0_NOT_YET
- T1_WITH_HELP
- T2_YES

### Problema de construto

A pergunta reúne ao menos quatro dimensões:

1. independência de tutorial;
2. modificação/autoria;
3. teste/depuração;
4. explicação/compreensão.

Luxton-Reilly et al. alertam que avaliações que combinam muitos conceitos heterogêneos tornam difícil diagnosticar qual dificuldade está sendo medida; eles defendem decompor avaliações complexas em elementos mais atômicos.

### Problema funcional

A auditoria exaustiva mostrou que T0 e T1 resultam na mesma etapa em todos os conflitos avaliados, embora possam mudar reason codes. Logo, a pergunta apresenta três alternativas, mas duas não têm poder classificatório distinto sobre `stage`.

### Relação com scaffolding

Scaffolding sustenta que “ainda não”, “com ajuda” e “sozinho” são conceitualmente diferentes. Portanto, a equivalência atual T0≈T1 pode ser aceitável como decisão conservadora, mas não deve ser descrita como se a pergunta estivesse refinando três níveis de prontidão.

**Classificação:** **R — revisar antes de estabilizar.**

**Recomendação:** ou (a) reduzir o TB a uma distinção que realmente altera a decisão, ou (b) preservar três respostas apenas para confiança/copy, deixando explícito que não são três thresholds de stage.

---

# 5. Auditoria dos gates

## Gate00 — Descobrir

Fallback quando não há sinais suficientes para gates superiores.

**Evidência:** não há literatura que valide a categoria 00 como nível científico.

**Status:** **C — arquitetura editorial.**

Pode permanecer desde que seja apresentado como orientação de produto.

---

## Gate01 — Pensar

Ativado por qualquer sinal de ideia, experiência, estrutura ou autoria.

**Evidência:** os construtos são relevantes, mas a regra OR e seus thresholds não são validados.

**Status:** **C.**

---

## Gate02 — Criar visualmente

Exige algum material concreto e começo de estrutura.

**Evidência:** ambientes de blocos têm amplo suporte como ferramenta de introdução e podem apoiar desenvolvimento de CT. Contudo, a literatura não estabelece que todo aprendiz com esse conjunto de sinais deva passar por uma etapa visual antes de texto.

**Status:** **B para blocos como caminho útil; C para obrigatoriedade/posição.**

A flexibilidade declarada do roadmap reduz esse risco.

---

## Gate03 — Escrever lógica

Exige construção prévia, estrutura, autoria e algum nível de depuração.

**Evidência:** combinação conceitualmente coerente. Literatura sobre iniciantes relaciona compreensão/leitura/escrita e confirma que debugging e estruturação são centrais.

**Limite:** não há estudo localizado que valide exatamente S2 + M2 + D2 como corte de prontidão.

**Status:** **B para arquitetura; C para thresholds.**

---

## Gate04 — Escolher um caminho

Exige simultaneamente:

1. experiência textual/projeto;
2. S2/S3;
3. M2/M3;
4. D3;
5. R2/R3.

### Diagnóstico da auditoria

Este é o gate com maior distância entre fundamentação conceitual e validação da regra concreta.

Cada construto individual possui justificativa razoável. O problema é a conclusão de que **todos são requisitos universais e simultâneos** para escolher uma rota.

Especialmente frágeis como hard gates:

- obrigatoriedade de representação textual;
- D3 completo como requisito;
- S2 e M2 como cortes binários capazes de produzir salto 02→04.

**Status:** **R — requer revisão científica/editorial antes de congelar.**

Isso não significa que Gate04 esteja “errado”; significa que ele é uma **heurística conservadora não validada**, e deve ser tratado como tal.

---

# 6. Auditoria do formato do instrumento

## 6.1 Autorrelato não equivale a avaliação de habilidade

O diagnóstico usa respostas sobre o que a pessoa acredita conseguir fazer. Isso é adequado para um instrumento leve de orientação, mas limita inferências sobre competência.

Tang et al. revisaram 96 estudos de avaliação de CT e encontraram uso frequente de avaliações de desempenho/tradicionais para habilidades, enquanto surveys são usados para disposições; também encontraram lacunas substanciais em evidências de confiabilidade e validade.

Brennan & Resnick propõem métodos mais ricos, como:

- análise de portfólio/projeto;
- entrevista baseada em artefato;
- cenário de design.

**Implicação:** o produto deve continuar afirmando “ponto de partida provável”, nunca “nível real” ou “competência comprovada”.

---

## 6.2 Um score total seria pior

A decisão de não somar tudo em um score único é defensável.

A literatura de CT mostra que o campo é multidimensional e que avaliações combinam diferentes conceitos, práticas e perspectivas. Luxton-Reilly et al. também mostram o risco de avaliações compostas demais impedirem diagnóstico específico.

**Implicação:** manter gates por dimensões é melhor do que criar “72% de prontidão”.

---

## 6.3 Um mini-item de desempenho aumentaria a validade de conteúdo

Sem transformar o produto em prova, uma futura V2 pode substituir ou complementar um dos autorrelatos mais críticos por um **microcenário de desempenho**.

Exemplos possíveis:

- Q3: mostrar uma regra simples e perguntar qual parte muda quando a regra muda;
- Q5: mostrar resultado esperado × observado e pedir qual próximo teste é mais informativo;
- Q6: mostrar trecho mínimo e pedir previsão do comportamento.

Isso seria mais próximo das formas de avaliação de CT/programação descritas na literatura do que depender exclusivamente de autorrelato.

**Importante:** isso ainda não tornaria o instrumento “validado”; apenas melhoraria sua validade de conteúdo e reduziria erro de interpretação.

---

# 7. Itens prioritários para decisão de produto

## P0 — antes de congelar algoritmo V1

### P0.1 — Gate04 e texto

**Pergunta:** alguém com forte estrutura, autoria e debugging em ambiente visual precisa obrigatoriamente ler/modificar código textual para estar pronto para escolher Web, Jogos, Apps, Automação ou IA/Dados?

**Evidência atual:** não.

**Recomendação:** remover o status de hard gate universal de R2/R3 ou tornar exigência dependente da rota.

### P0.2 — D3

**Pergunta:** consultar fonte deve fazer parte do requisito mínimo de investigação?

**Evidência atual:** hipótese/teste sistemático sim; consulta a fonte como requisito universal, não demonstrado.

**Recomendação:** separar os comportamentos e rever o papel de D3 no Gate04.

### P0.3 — TB

**Pergunta:** o desempate mede uma coisa ou várias?

**Evidência atual:** várias.

**Recomendação:** simplificar ou usar TB para confiança/copy em vez de fingir três níveis classificatórios.

### P0.4 — saltos 02→04

**Pergunta:** uma única mudança S1→S2 ou M1→M2 deve permitir salto de duas etapas quando todos os demais critérios já estão presentes?

**Evidência atual:** não há validação acadêmica desse corte.

**Recomendação:** tratar esses pares como casos obrigatórios de calibração antes de congelar V1.

---

## P1 — melhoria metodológica futura

1. adicionar 1–2 microcenários de desempenho;
2. testar interpretação cognitiva das alternativas com usuários;
3. registrar taxa de mudança entre respostas e resultado percebido;
4. comparar autorrelato com comportamento real em uma pequena tarefa;
5. só depois considerar calibrar thresholds com dados empíricos próprios.

---

# 8. O que pode ser afirmado publicamente

## Formulações defensáveis

- “O resultado é orientativo.”
- “O questionário organiza sinais de experiência, autonomia, estrutura e investigação.”
- “Ele não é prova nem teste psicométrico.”
- “O ponto de partida é provável, não definitivo.”
- “O interesse ajuda a escolher exemplos e rotas, mas não mede habilidade.”

## Formulações a evitar

- “cientificamente validado”;
- “mede seu nível de programação”;
- “comprova que você está pronto”;
- “diagnóstico de competência”;
- “avaliação precisa de habilidade”;
- “resultado baseado em algoritmo científico”.

---

# 9. Implicação para a bateria cega

A bateria por pares mínimos continua útil, mas sua função muda.

Ela não deve decidir qual gate é correto com base em opinião humana. Ela deve testar:

1. se as alternativas são semanticamente distinguíveis;
2. se o usuário interpreta o construto como o modelo pretende;
3. se fronteiras editoriais produzem saltos intuitivamente absurdos;
4. se a copy precisa ser corrigida antes de calibrar regras.

A sequência recomendada passa a ser:

**literatura → construto → regra editorial explícita → teste semântico humano → dados reais de uso → eventual calibração.**

---

# 10. Referências acadêmicas principais

## Avaliação de CT e programação

- Tang, X.; Yin, Y.; Lin, Q.; Hadad, R.; Zhai, X. (2020). *Assessing computational thinking: A systematic review of empirical studies*. Computers & Education, 148, 103798. DOI: https://doi.org/10.1016/j.compedu.2019.103798
- Thangaraj, J.; Ward, M.; O’Riordan, F. (2023). *A Systematic Review of Formative Assessment to Support Students Learning Computer Programming*. OASIcs ICPEC 2023. DOI: https://doi.org/10.4230/OASIcs.ICPEC.2023.7
- Luxton-Reilly, A. et al. (2018). *Developing Assessments to Determine Mastery of Programming Fundamentals*. ITiCSE-WGR. DOI: https://doi.org/10.1145/3174781.3174784
- Brennan, K.; Resnick, M. (2012). *New frameworks for studying and assessing the development of computational thinking*. AERA 2012. https://www.media.mit.edu/publications/new-frameworks-for-studying-and-assessing-the-development-of-computational-thinking/

## Scratch, blocos e transição para texto

- Zhang, L.; Nouri, J. (2019). *A systematic review of learning computational thinking through Scratch in K-9*. Computers & Education, 141, 103607. DOI: https://doi.org/10.1016/j.compedu.2019.103607
- Fagerlund, J.; Häkkinen, P.; Vesisenaho, M.; Viiri, J. (2020/2021). *Computational thinking in programming with Scratch in primary schools: A systematic review*. Computer Applications in Engineering Education, 29(1), 12–28. DOI: https://doi.org/10.1002/cae.22255
- Weintrop, D.; Wilensky, U. (2017). *Comparing Block-Based and Text-Based Programming in High School Computer Science Classrooms*. ACM Transactions on Computing Education, 18(1), Article 3. DOI: https://doi.org/10.1145/3089799
- Weintrop, D.; Wilensky, U. (2019). *Transitioning from introductory block-based and text-based environments to professional programming languages in high school computer science classrooms*. Computers & Education, 142, 103646. DOI: https://doi.org/10.1016/j.compedu.2019.103646

## Debugging, metacognição e dificuldades de iniciantes

- Yang, S.; Baird, M.; O’Rourke, E.; Brennan, K.; Schneider, B. (2024). *Decoding Debugging Instruction: A Systematic Literature Review of Debugging Interventions*. ACM Transactions on Computing Education, 24(4), Article 45. DOI: https://doi.org/10.1145/3690652
- McCauley, R. et al. (2008). *Debugging: a review of the literature from an educational perspective*. Computer Science Education, 18(2), 67–92. DOI: https://doi.org/10.1080/08993400802114581
- Qian, Y.; Lehman, J. (2017). *Students’ Misconceptions and Other Difficulties in Introductory Programming: A Literature Review*. ACM Transactions on Computing Education, 18(1). DOI: https://doi.org/10.1145/3077618
- Loksa, D. et al. (2022). *Metacognition and Self-Regulation in Programming Education: Theories and Exemplars of Use*. ACM Transactions on Computing Education, 22(4), Article 39. DOI: https://doi.org/10.1145/3487050

## Autonomia e scaffolding

- Wood, D.; Bruner, J. S.; Ross, G. (1976). *The role of tutoring in problem solving*. Journal of Child Psychology and Psychiatry, 17(2), 89–100. DOI: https://doi.org/10.1111/j.1469-7610.1976.tb00381.x
- Mermelshtine, R. (2017). *Parent–child learning interactions: A review of the literature on scaffolding*. British Journal of Educational Psychology, 87(2), 241–254. DOI: https://doi.org/10.1111/bjep.12147

## Criação e artefatos

- Papavlasopoulou, S.; Giannakos, M. N.; Jaccheri, L. (2019). *Exploring children’s learning experience in constructionism-based coding activities through design-based research*. Computers in Human Behavior, 99, 415–427. DOI: https://doi.org/10.1016/j.chb.2019.01.008

## Leitura, explicação e escrita de código

- Venables, A.; Tan, G.; Lister, R. (2009). *A closer look at tracing, explaining and code writing skills in the novice programmer*. ICER ’09, 117–128. DOI: https://doi.org/10.1145/1584322.1584336
- Lister, R. et al. (2004). *A multi-national study of reading and tracing skills in novice programmers*. DOI: https://doi.org/10.1145/1041624.1041673

---

# 11. Decisão recomendada para V1

Até existir validação empírica própria, o algoritmo deve ser tratado internamente como:

> **heurística determinística de orientação baseada em construtos informados por literatura**.

Não como:

> **instrumento científico validado de classificação de competência**.

Essa formulação preserva o valor do produto sem extrapolar a evidência.