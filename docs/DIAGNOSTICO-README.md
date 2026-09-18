# Mapa documental do diagnóstico

Este arquivo define **como ler** a documentação existente. Ele não move nem reescreve o histórico.

## CURRENT — estado normativo/operacional

- `diagnostico-deterministico-v1.1.0.md` — especificação normativa de `R00-DIAG-1.1.0`;
- `diagnostico-copy-publica-v1.1.md` — copy pública V1.1;
- `diagnostico-ui-v1-1.md` — contrato de interface V1.1;
- `diagnostico-feedback-validacao-v1.1.md` — coleta e validação comportamental.

Para estado geral e pendências, prevalece `../PROJECT_STATUS.md`.

## EVIDENCE — fundamentação e auditoria

- `diagnostico-auditoria-cientifica-v1.md`;
- `diagnostico-auditoria-logica-v1.md`;
- `diagnostico-auditoria-semantica-v1.md`;
- `diagnostico-auditoria-cega-v1.md`.

Esses documentos explicam por que certos construtos foram mantidos e por que thresholds continuam sendo heurísticas editoriais. Não substituem a especificação V1.1.

## HISTORY / P&D — caminho até a V1.1

Inclui a especificação V1.0, decisão pós-auditoria, experimentos de Gate04, arquitetura de dois eixos, revisões semânticas/estratificadas, snapshots e scripts experimentais.

São úteis para rastreabilidade e investigação de regressão, mas não devem ser carregados como contexto padrão para implementar o produto atual.

## Código

Em `diagnostico/`, arquivos com sufixo `v1-1` formam a implementação atual. Arquivos V1 sem esse sufixo e scripts/snapshots de experimento permanecem versionados como legado técnico enquanto sua movimentação física não demonstrar benefício suficiente para compensar o risco de quebrar dependências internas.

## Regra de precedência

1. decisão explícita posterior do autor;
2. `PROJECT_STATUS.md` para estado operacional;
3. especificação normativa V1.1 para regras do diagnóstico;
4. copy/UI/feedback V1.1 para seus domínios;
5. evidências e auditorias;
6. histórico e experimentos.
