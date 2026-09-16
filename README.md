# ROTA ZERO ZERO — Landing Page

Landing page oficial da **ROTA ZERO ZERO**, mantida como site simples, portátil e sem etapa de build.

> **Estado atual e próximos passos:** [`PROJECT_STATUS.md`](./PROJECT_STATUS.md)

## Stack

- HTML5 semântico
- CSS3
- JavaScript puro (Vanilla JS)
- SVG para identidade, ícones e ilustrações
- PNG para card social/Open Graph
- PHP somente para o endpoint mínimo de coleta de feedback do diagnóstico

Não há React, Vite, Node.js, npm ou etapa de build para publicação.

## Arquitetura

```text
.
├── index.html
├── PROJECT_STATUS.md
├── favicon.ico
├── api/
│   └── diagnostico-feedback.php
├── diagnostico/
│   └── index.html
├── css/
│   ├── styles.css
│   └── idv-static.css
├── js/
│   └── main.js
├── docs/
└── assets/
    ├── brand/
    ├── idv/
    ├── idv-svg/
    ├── illustrations/
    └── social/
```

### Responsabilidades

- `PROJECT_STATUS.md`: estado canônico resumido do projeto, fase atual e próximos passos.
- `index.html`: conteúdo, estrutura, SEO, Open Graph e composição visual essencial.
- `diagnostico/`: motor, copy, interface e testes do diagnóstico.
- `api/diagnostico-feedback.php`: endpoint mínimo para registrar feedback e sinais de uso do diagnóstico.
- `docs/`: decisões, auditorias e documentação técnica que explicam o porquê das escolhas do projeto.
- `css/styles.css`: sistema visual geral e responsividade.
- `css/idv-static.css`: regras específicas da identidade e salvaguardas de progressive enhancement.
- `js/main.js`: somente comportamento — menu móvel, ano corrente e animações de entrada.
- `assets/idv-svg/`: pacote consolidado da biblioteca SVG da marca.
- `assets/illustrations/`: composições específicas da landing que não fazem parte da biblioteca atômica da IDV.

A página deve continuar legível e reconhecível mesmo se o JavaScript não executar. A coleta de feedback, quando habilitada no servidor, depende de PHP.

## Desenvolvimento local

Para navegar pelas páginas estáticas, basta servir a pasta raiz com qualquer servidor HTTP local.

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

O teste do endpoint de feedback exige um servidor com PHP.

## Deploy

Publique o conteúdo da raiz diretamente no diretório público do servidor. Não é necessário executar `npm install` nem `npm run build`.

A coleta de feedback do diagnóstico depende de suporte a PHP e grava os dados em uma pasta privada fora de `public_html`, conforme documentado em `docs/diagnostico-feedback-validacao-v1.1.md`.

## Rotas

- `/` — landing page
- `/diagnostico/` — diagnóstico V1.1; permanece com `noindex` durante a validação
- `/api/diagnostico-feedback.php` — endpoint de coleta mínima de validação

## Identidade visual

A landing utiliza os ativos oficiais da ROTA ZERO ZERO para assinatura de marca, trilhas, nós, setas, ícones editoriais e assinatura do produto Roadmap. Composições completas específicas da interface permanecem fora da biblioteca canônica.

## Organização do trabalho

- `PROJECT_STATUS.md` responde **onde o projeto está e o que vem depois**.
- GitHub Issues registram trabalho executável, pendências e validações.
- `docs/` preserva decisões, evidências e documentação técnica.
- Pull Requests registram mudanças concretas de código ou documentação.

## QA

As decisões e verificações da fase final de QA ficam registradas em `QA-V5.md`. O diagnóstico também possui documentação específica em `docs/` e Issues abertas de validação.