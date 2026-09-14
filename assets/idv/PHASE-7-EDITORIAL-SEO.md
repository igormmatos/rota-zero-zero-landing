# Fase 7 — revisão editorial e SEO alinhado à marca

Objetivo: aplicar o Juiz de Português e Estilo à landing e fortalecer a camada de SEO sem transformar o texto em uma coleção de palavras-chave.

## Fontes normativas usadas

- Livro-fonte V2.1 como referência de conteúdo;
- Juiz de Português e Estilo V1 para clareza, naturalidade, concisão e intervenção mínima;
- posicionamento da ROTA ZERO ZERO definido para o Instagram e para o funil de entrada;
- síntese estratégica editorial do projeto.

## Princípios editoriais

- melhorar a forma sem alterar o conteúdo;
- preservar o H1 principal da marca;
- evitar linguagem promocional, exageros, clichês tecnológicos e promessas de carreira;
- falar com quem começa e com quem acompanha alguém nesse começo;
- reforçar a lógica verbal da marca: interesse → primeiro projeto → próximo passo;
- manter o CTA principal: “Descubra seu próximo passo”.

## Ajustes de texto

- hero deixa de abrir pela persona “seu filho” e passa a incluir quem quer começar e quem acompanha;
- “Por onde começar?” passa a “Por onde começar em programação?”, aproximando o conteúdo da intenção de busca sem alterar sua função editorial;
- a abertura da dúvida inicial usa “interesse por programação” em vez de uma formulação genérica;
- o card central adota a frase de marca “Primeiro o projeto. Depois a tecnologia.”;
- linguagem de acompanhamento evita pronome masculino genérico em “Ele tentou de novo?”;
- a seção “O que importa” passa a falar diretamente de quem aprende.

## Camada SEO

### Intenção principal

**por onde começar em programação**

### Intenções secundárias naturais

- programação para iniciantes;
- primeiro projeto de programação;
- qual linguagem aprender primeiro;
- como acompanhar alguém começando em programação.

Esses termos não são repetidos mecanicamente. Entram apenas onde coincidem com a tese e com a linguagem já definida para a marca.

## Implementação técnica

- title reorganizado para começar pela intenção de busca;
- meta description reescrita com a promessa real da marca;
- Open Graph e Twitter Card alinhados ao mesmo posicionamento;
- `og:locale` e `twitter:image:alt` adicionados;
- `robots` meta explícito para a landing;
- `hreflang` pt-BR autorreferente;
- JSON-LD com `WebSite` e `WebPage`, sem criar FAQ, curso, avaliação ou organização educacional não comprovados;
- `robots.txt` criado;
- `sitemap.xml` criado apenas com a homepage indexável.

## Limites

Não foram adicionados `meta keywords`, FAQ estruturado, estrelas, avaliações, promessas de resultado, marcação de curso ou outras entidades não sustentadas pelo conteúdo atual.

O `/diagnostico/` permanece fora do sitemap e com `noindex,follow` enquanto estiver em construção.

Quando houver domínio definitivo, canonical, Open Graph, JSON-LD, sitemap e robots devem ser atualizados em conjunto.
