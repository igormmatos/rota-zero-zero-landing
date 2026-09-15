# Decisão pós-auditoria científica — Diagnóstico V1

## Estado

O motor `R00-DIAG-1.0.0` permanece **inalterado nesta fase**.

A auditoria científica não autoriza uma mudança automática de gate. Ela altera a forma como as regras devem ser tratadas e define os pontos que precisam de revisão antes de uma V1 congelada para público amplo.

## Definição operacional correta

Enquanto não houver validação empírica própria, o diagnóstico é:

> **uma heurística determinística de orientação baseada em construtos informados por literatura.**

Não é:

> teste psicométrico, avaliação de competência, prova de conhecimento ou instrumento cientificamente validado de prontidão.

## Decisões mantidas

1. manter dois eixos separados: `stage` e `interestTag`;
2. manter Q7 incapaz de alterar `stage` sozinho;
3. manter ausência de score agregado;
4. manter resultado como “ponto de partida provável”;
5. manter `SELF/OTHER` apenas como microcopy;
6. manter arquitetura de múltiplos sinais em vez de idade, certificado, número de cursos ou horas de estudo.

## Regras em revisão obrigatória

### Gate04 — representação textual

A exigência de `R2/R3` como hard gate universal não está suficientemente sustentada. Evidência de blocos e transição para texto não sustenta tratar texto como estágio universalmente superior ou como condição necessária para escolher uma rota.

**Status:** revisar antes de congelar.

### Gate04 — D3

Debugging sistemático é bem sustentado. A regra atual, porém, combina hipótese, consulta a fonte e teste, e transforma o pacote inteiro em requisito universal para 04.

**Status:** revisar antes de congelar.

### Q3 S1→S2 e Q4 M1→M2

Os construtos são relevantes, mas os thresholds conseguem funcionar como último requisito de um salto 02→04.

**Status:** manter perguntas; auditar peso dos cortes.

### TB

A pergunta mistura independência, autoria, depuração e explicação. Além disso, T0 e T1 não diferenciam etapa na implementação atual.

**Status:** não congelar como desempate definitivo.

## Próxima sequência de trabalho

1. revisar Gate04, Q5/D3 e TB com base na matriz científica;
2. produzir alternativas de regra sem ainda alterar o motor;
3. rodar novamente a matriz exaustiva em cada alternativa;
4. comparar efeitos sobre os 20 perfis canônicos e fronteiras sensíveis;
5. só então retomar a bateria humana cega;
6. após estabilização, realizar teste com usuários reais;
7. considerar microcenários de desempenho em versão futura.

## Critério para qualquer mudança

Uma alteração de algoritmo só deve ser aceita se atender simultaneamente a:

- não contradizer evidência acadêmica forte;
- reduzir uma inconsistência conhecida;
- preservar explicabilidade;
- não depender de score opaco;
- passar regressão exaustiva;
- não transformar preferência/interesse em competência;
- continuar compatível com a proposta de orientação leve do produto.

## Regra de comunicação

Mesmo após revisão, a interface deve preservar mensagem equivalente a:

> Este resultado é uma orientação de próximo passo. Ele não mede talento, inteligência ou competência de forma definitiva.
