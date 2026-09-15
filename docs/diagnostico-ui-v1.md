# Diagnóstico ROTA ZERO ZERO — interface V1

## Objetivo

Transformar o motor `R00-DIAG-1.0.0` em um fluxo utilizável sem duplicar regras de classificação na interface.

A interface apenas coleta códigos, chama `RotaZeroZeroDiagnostic` e traduz o resultado com `diagnostic-copy.js`.

## Fluxo

1. abertura: promessa curta, 7 perguntas, sem cadastro, resultado orientativo;
2. contexto `SELF/OTHER`;
3. Q1–Q7, uma pergunta por tela;
4. pergunta `TB` somente quando o motor detectar conflito H1–H4;
5. resultado com etapa, direção atual, até 2 sinais positivos e 1 limite;
6. CTA para o Roadmap e opção de refazer.

## Decisões de UX

- sem score, ranking ou porcentagem de afinidade;
- progresso indica apenas avanço no questionário, não desempenho;
- respostas permanecem somente em memória durante a sessão;
- nenhum nome, e-mail, escola, idade ou dado pessoal é solicitado;
- botão Continuar só é habilitado após uma alternativa;
- Voltar preserva a resposta anterior;
- mudar Q7 não muda a etapa porque a regra continua exclusivamente no motor;
- conflito nunca é resolvido silenciosamente: a UI mostra a pergunta extra;
- `/diagnostico/` permanece `noindex,follow` enquanto a experiência ainda estiver em validação.

## IDV

A interface reutiliza a paleta Papel/Tinta/Jornada/Terra/Azul e os assets oficiais:

- `icon_compass-cover` para direção;
- `path_main-ascending` na abertura;
- nós circulares como marcador de etapa.

A identidade é aplicada como orientação visual, não como decoração. Não foram adicionados mapas, ramificações ou ícones sem função.

## Arquitetura

- `diagnostic-rules.js`: motor puro e versionado;
- `diagnostic-copy.js`: perguntas, alternativas, textos de resultado e reason codes;
- `diagnostico.js`: navegação, estado em memória, acessibilidade e renderização;
- `diagnostico.css`: apresentação específica;
- `diagnostic-tests.js`: regressão do motor;
- `diagnostic-ui-contract-tests.js`: contrato entre os códigos expostos pela UI e o motor.

## QA antes de retirar `noindex`

- executar `node diagnostico/diagnostic-tests.js`;
- executar `node diagnostico/diagnostic-ui-contract-tests.js`;
- testar os 20 perfis da especificação em pelo menos uma passada manual representativa;
- validar teclado completo: Tab, Shift+Tab, setas nos radios, Enter/Espaço;
- validar leitor de tela em introdução, pergunta, progresso, desempate e resultado;
- testar 320, 375, 768, 1024 e desktop;
- confirmar que Voltar não perde respostas;
- confirmar que refazer zera todo o estado;
- confirmar que nenhum request de dados do questionário sai do navegador;
- revisar o CTA final e a fronteira gratuito x produto completo.
