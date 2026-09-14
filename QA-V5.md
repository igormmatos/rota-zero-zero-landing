# QA V5 — Fechamento da Landing ROTA ZERO ZERO

Data: 2026-09-14

## Escopo

Revisão final de arquitetura estática, responsividade por breakpoint, acessibilidade estrutural, SEO básico, referências de assets e comportamento sem JavaScript.

## Correções aplicadas

### 1. Conteúdo não depende mais de JavaScript

Foi identificado um problema real: a classe `.reveal` do CSS legado deixava blocos com `opacity: 0` por padrão. Se o JavaScript falhasse, grande parte da landing permaneceria invisível.

Correção:
- conteúdo passa a ser visível por padrão;
- somente quando o JS confirma suporte a `IntersectionObserver` e ausência de `prefers-reduced-motion` os elementos recebem `will-animate`;
- animação permanece progressiva e não é requisito para leitura da página.

Resultado: a regra da Fase 4 passa a ser cumprida de fato — conteúdo e identidade essenciais existem sem JavaScript.

### 2. Diagnóstico provisório fora do índice

A rota `/diagnostico/` ainda é uma página de "Em construção".

Correção:
- adicionado `meta name="robots" content="noindex,follow"`;
- removidos `main.js` e `idv-static.css` dessa página, pois não eram necessários para seu funcionamento atual.

Quando o diagnóstico real for publicado, o `noindex` deverá ser removido.

### 3. Documentação do repositório atualizada

O `README.md` anterior descrevia uma estrutura antiga e citava apenas um SVG de marca. Agora documenta a arquitetura estática atual, biblioteca de identidade, ilustrações, card social e separação de responsabilidades entre HTML, CSS e JS.

## Validações estáticas

### Assets

A árvore do repositório confirma a presença dos assets utilizados pela landing:
- assinaturas completa, reduzida, reversa e do produto Roadmap;
- símbolo institucional;
- trilha ascendente, ramo de pausa e junção de três alternativas;
- nó Terra;
- ícones de observação, construção, critério, rota e família;
- seta de CTA;
- mapa 00→04→seis rotas;
- imagem Open Graph;
- `favicon.ico`.

### Navegação interna

Os destinos internos usados no header existem:
- `#como-funciona`
- `#o-mapa`
- `#para-quem`
- `#roadmap`
- `#conteudo`
- `/diagnostico/`

### Responsividade por regra CSS

A estrutura possui tratamento explícito para:
- desktop;
- até 1023 px: hero em uma coluna, grids reduzidos e menu móvel habilitado;
- até 767 px: assinatura reduzida, CTA de header oculto, grids principais em uma coluna;
- até 520 px: botões em largura total, redução de padding e grids finais em uma coluna.

Não foi adicionada lógica responsiva em JavaScript.

### Acessibilidade estrutural

Confirmado no código:
- skip link para `#conteudo`;
- `:focus-visible` explícito;
- labels de navegação;
- controle de menu com `aria-expanded` e `aria-controls`;
- SVGs/ícones decorativos com `aria-hidden`/`alt=""`;
- ilustração do mapa com texto alternativo descritivo;
- suporte a `prefers-reduced-motion`;
- conteúdo essencial permanece disponível sem JS.

### SEO e compartilhamento

Confirmado no HTML principal:
- `title` e `description`;
- canonical;
- Open Graph;
- imagem 1200×630;
- Twitter Card grande;
- favicon SVG e fallback `.ico`.

## Pendências antes de lançamento público definitivo

### P0 — links de rodapé ainda são placeholders

`Instagram`, `Privacidade` e `Contato` ainda estão com `href="#"` no HTML atual.

Isso não quebra a renderização, mas é inadequado para lançamento público. Não foi inventado destino para Privacidade ou Contato porque essas URLs/canais ainda não estão definidos no repositório.

Ação recomendada antes do lançamento:
- apontar Instagram para o perfil oficial;
- publicar ou remover Privacidade até existir uma política real;
- definir canal/página de Contato ou remover o link.

### P1 — canonical está ligado ao domínio Hostinger atual

O canonical e `og:url` usam o endereço atual da Hostinger. Quando houver domínio definitivo da ROTA ZERO ZERO, atualizar ambos e a URL absoluta do `og:image`.

### P1 — verificação visual em navegador real

A revisão desta fase cobre código e regras responsivas. Antes do anúncio público, ainda vale executar uma inspeção visual rápida em 320, 375, 768, 1024 e desktop no ambiente publicado para detectar diferenças específicas de renderização de fonte/navegador.

## Critério de fechamento

A landing pode ser considerada tecnicamente consolidada em arquitetura e identidade quando:
1. este PR for revisado/mesclado;
2. os links de rodapé forem resolvidos;
3. o domínio canônico for confirmado;
4. houver uma passada visual final no ambiente publicado.
