# ROTA ZERO ZERO — Landing Page

Landing page oficial da **ROTA ZERO ZERO**, convertida para uma arquitetura estática simples e portátil.

## Stack

- HTML5
- CSS3
- JavaScript puro (Vanilla JS)
- SVG para o ativo de marca e os diagramas

Não há React, Vite, Node.js, npm ou etapa de build.

## Estrutura

```text
.
├── index.html
├── diagnostico/
│   └── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    └── brand/
        └── rota-zero-zero-completa.svg
```

## Desenvolvimento local

Por ser um site estático, basta servir a pasta raiz com qualquer servidor HTTP local.

Exemplo com Python:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Deploy

Publique o conteúdo da raiz diretamente no diretório público do servidor. Não é necessário executar `npm install` nem `npm run build`.

## Rotas

- `/` — landing page
- `/diagnostico/` — página provisória do diagnóstico

## Origem

Esta versão foi convertida a partir do export original da landing page, preservando conteúdo, identidade visual, responsividade e interações essenciais, mas removendo a dependência de React/Vite.
