# Diagnóstico V1.1 — feedback de validação humana

## Objetivo

Coletar sinais mínimos de utilidade percebida e interesse real depois do resultado, sem transformar o feedback em requisito para acessar o Roadmap.

## Eventos

O navegador envia somente três eventos:

- `result_viewed`: resultado foi exibido;
- `feedback_submitted`: nota 0–10 e comentário opcional foram enviados;
- `roadmap_clicked`: CTA do Roadmap foi acionado.

Todos compartilham um `runId` aleatório criado apenas em memória para relacionar eventos da mesma execução. Não há cookie, `localStorage`, nome, e-mail, idade, escola, IP ou user-agent gravados pela aplicação.

## Pergunta principal

> De 0 a 10, quanto este resultado ajudou você a entender qual pode ser o próximo passo?

Comentário opcional:

> Quer contar o que faltou ou o que poderia melhorar?

A interface orienta explicitamente a não inserir nomes, e-mails ou outros dados pessoais.

## Dados gravados

```json
{
  "schemaVersion": "1",
  "serverTimestamp": "2026-09-15T22:00:00+00:00",
  "event": "feedback_submitted",
  "runId": "...",
  "algorithmVersion": "R00-DIAG-1.1.0",
  "learningStage": "02",
  "routeDecision": "REDUCE_PROJECT",
  "routeSuggestion": null,
  "score": 8,
  "comment": "Exemplo opcional"
}
```

`score` e `comment` existem apenas em `feedback_submitted`.

## Armazenamento

Endpoint: `/api/diagnostico-feedback.php`.

Em hospedagem PHP, o endpoint cria uma pasta `r00-private-data` **um nível acima do document root** e grava `diagnostico-feedback.jsonl`. Isso mantém o arquivo fora de `public_html` e evita que o deploy estático o sobrescreva ou exponha por URL.

O endpoint:

- aceita somente `POST` JSON;
- limita payload a 4 KB;
- valida enums e nota 0–10;
- limita comentários a 800 caracteres;
- usa honeypot simples contra bots;
- usa `flock` para escrita concorrente;
- não grava IP nem user-agent.

## Verificação no Hostinger

Antes de divulgar:

1. confirmar que o plano/site executa PHP;
2. abrir o diagnóstico e concluir uma execução;
3. enviar uma nota de teste;
4. clicar no Roadmap;
5. no File Manager, localizar `r00-private-data/diagnostico-feedback.jsonl` fora de `public_html`;
6. confirmar três linhas com o mesmo `runId`: `result_viewed`, `feedback_submitted` e `roadmap_clicked`.

Se o endpoint retornar erro de armazenamento, a UI informa que o feedback não foi enviado e mantém o CTA normalmente disponível.

## Leitura dos dados

Métricas iniciais úteis:

- média e mediana da nota;
- distribuição 0–10;
- taxa `feedback_submitted / result_viewed`;
- taxa `roadmap_clicked / result_viewed`;
- taxa de clique por `learningStage` e `routeDecision`;
- temas recorrentes nos comentários.

Não usar a nota isoladamente para alterar o algoritmo. Mudanças de regra exigem padrão recorrente e análise qualitativa dos comentários/casos.
