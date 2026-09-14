# ROTA ZERO ZERO — Landing Page

Landing page oficial da **ROTA ZERO ZERO**, mantida como site estático simples, portátil e sem etapa de build.

## Stack

- HTML5 semântico
- CSS3
- JavaScript puro (Vanilla JS)
- SVG para identidade, ícones e ilustrações
- PNG para card social/Open Graph

Não há React, Vite, Node.js, npm ou etapa de build.

## Arquitetura

```text
.
├── index.html
├── favicon.ico
├── diagnostico/
│   └── index.html
├── css/
│   ├── styles.css
│   └── idv-static.css
├── js/
│   └── main.js
└── assets/
    ├── brand/
    ├── idv/
    ├── idv-svg/
    ├── illustrations/
    └── social/
```

### Responsabilidades

- `index.html`: conteúdo, estrutura, SEO, Open Graph e composição visual essencial.
- `css/styles.css`: sistema visual geral e responsividade.
- `css/idv-static.css`: regras específicas da identidade e salvaguardas de progressive enhancement.
- `js/main.js`: somente comportamento — menu móvel, ano corrente e animações de entrada.
- `assets/idv-svg/`: pacote consolidado da biblioteca SVG da marca.
- `assets/illustrations/`: composições específicas da landing que não fazem parte da biblioteca atômica da IDV.

A página deve continuar legível e reconhecível mesmo se o JavaScript não executar.

## Desenvolvimento local

Por ser um site estático, basta servir a pasta raiz com qualquer servidor HTTP local.

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Deploy

Publique o conteúdo da raiz diretamente no diretório público do servidor. Não é necessário executar `npm install` nem `npm run build`.

## Rotas

- `/` — landing page
- `/diagnostico/` — página provisória do diagnóstico; permanece com `noindex` até o produto estar funcional

## Identidade visual

A landing utiliza os ativos oficiais da ROTA ZERO ZERO para assinatura de marca, trilhas, nós, setas, ícones editoriais e assinatura do produto Roadmap. Composições completas específicas da interface permanecem fora da biblioteca canônica.

## QA

As decisões e verificações da fase final de QA ficam registradas em `QA-V5.md`.
