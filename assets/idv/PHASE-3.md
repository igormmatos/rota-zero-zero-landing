# Fase 3 — integração digital da IDV

## Objetivo

Fechar lacunas de aplicação digital da identidade sem transformar a biblioteca SVG em um repositório de layouts completos.

## Implementado

- símbolo institucional `brand_symbol-ring-bar` exposto como ativo web;
- `favicon.ico` na raiz como fallback automático de navegador;
- imagem social 1200×630 em `assets/social/og-rota-zero-zero.png`;
- mapa `00 → 04 → seis rotas` externalizado para `assets/illustrations/map-00-04-six-routes.svg`;
- mapa consumido pela landing como ilustração específica de produto;
- superfícies editoriais receberam raio discreto de 12 px nos cards compatíveis;
- metadados OG/Twitter e favicon SVG são adicionados em runtime como camada de compatibilidade da landing atual.

## Decisão sobre o mapa completo

O mapa `00 → 04 → seis rotas` **não entra na biblioteca SVG canônica**.

O próprio guia P3 estabelece que layouts completos, cards, textos, legendas, números, progresso, grids e molduras permanecem fora da biblioteca. O mapa é uma composição editorial específica da landing/produto e deve continuar em `assets/illustrations/`.

Isso também evita forçar T06, que representa somente três alternativas, sobre uma arquitetura que possui seis saídas.

## Superfícies e raios

O raio foi aplicado somente a elementos que já funcionam semanticamente como cards:

- hero/trilha;
- mapa;
- card de pergunta;
- cards de público;
- cards de etapas.

Não foi aplicado globalmente a botões, seções, chips ou blocos editoriais apenas para modernizar a interface.

## Metadados sociais

A imagem social rasterizada está pronta no repositório. Nesta fase, os metadados são adicionados pelo JavaScript porque a landing ainda carrega parte da integração da IDV em runtime.

Para máxima compatibilidade com crawlers de redes sociais, a etapa seguinte deve mover `og:image`, dimensões, `twitter:card`, `twitter:image` e o favicon SVG diretamente para o `<head>` estático do `index.html`.

## Próximo refino técnico recomendado

Eliminar gradualmente a montagem visual via JavaScript e deixar no HTML/CSS estático:

1. assinatura reduzida no mobile;
2. assinatura reversa no footer;
3. composição do hero;
4. ícones de processo e público;
5. assinatura do Roadmap;
6. metadados sociais.

O JavaScript deve voltar a cuidar principalmente de comportamento: menu, ano e reveal.