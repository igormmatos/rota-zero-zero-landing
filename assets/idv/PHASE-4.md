# Fase 4 — Arquitetura estática da identidade

## Objetivo

Retirar do JavaScript a responsabilidade de montar identidade visual, assets de marca e metadados de compartilhamento.

## Decisão

A landing passa a usar como fonte de renderização:

- **HTML estático** para composição visual, conteúdo, imagens, ícones, assinaturas, favicon e metadados SEO/social;
- **CSS estático** para apresentação da IDV e ajustes de superfície;
- **JavaScript apenas para comportamento**: menu móvel, ano corrente e entrada progressiva de elementos.

## Alterações

- `index.html` contém diretamente as assinaturas correta de desktop/mobile/rodapé.
- Hero contém diretamente os componentes SVG T02, T03, T06, N02 e bússola.
- Processo, público e Roadmap contêm diretamente os ícones editoriais utilizados.
- O mapa completo é carregado como `assets/illustrations/map-00-04-six-routes.svg`.
- Open Graph, Twitter Card, canonical e favicons ficam declarados no `<head>`.
- A camada visual específica da fase está em `css/idv-static.css`.
- `js/main.js` não altera mais conteúdo, marca, SEO nem composição visual.

## Regra daqui em diante

Qualquer elemento essencial para a primeira renderização, indexação, compartilhamento ou reconhecimento visual da marca deve existir sem depender de execução de JavaScript.

JavaScript não deve ser usado para corrigir ou completar a identidade visual da página.
