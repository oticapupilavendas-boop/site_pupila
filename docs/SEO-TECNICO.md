# SEO técnico — Issue #43

Domínio configurado: https://oticapupilajlle.com.br. As 34 páginas são HTML estático; as 33 URLs destinadas à indexação têm canonical próprio e estão no sitemap. A página 404 usa noindex, follow e não integra o sitemap. Os links internos usam href real; a navegação e o conteúdo principal funcionam sem JavaScript.

## Headings, metadados e dados estruturados

Cada página tem um H1 com o tema da página e a linha visível “Sua ótica em Joinville”. A frase faz parte do heading para todos os visitantes, sem texto oculto para mecanismos de busca. As fichas preservam a marca e acrescentam o modelo/referência ou detalhe quando esse dado já existe na fonte; não se deduzem códigos de modelos pelas fotos. H2/H3 seguem a hierarquia do conteúdo. Cada URL tem title e meta description próprios.

Não foi adicionado JSON-LD: não é um requisito para rastrear o site e esta entrega não precisa introduzir marcação de produtos, preços ou avaliações. Ao acrescentar dados estruturados futuramente, representar somente dados reais que também estejam visíveis e seguir as [diretrizes do Google](https://developers.google.com/search/docs/appearance/structured-data/sd-policies). Não marcar as avaliações da própria loja como promessa de estrelas em resultados.

## Bloqueador observado na publicação atual

Em 27/11/2026 às 17:36:14 UTC, a auditoria pública do Maestro obteve HTTP 200 e conteúdo sem login em https://oticapupilavendas-boop.github.io/site_pupila/. Essa versão aponta canonical e as 33 URLs do sitemap para oticapupilajlle.com.br, mas o Chrome não resolveu esse domínio. O DNS público do Google retornou Status 0 sem respostas A, AAAA ou CNAME para a raiz; www retornou Status 3 (NXDOMAIN). O controle google.com abriu no mesmo navegador. Esta evidência indica falta de endereçamento no resolver consultado, não uma confirmação global sobre todos os resolvedores.

A raiz do host legado, https://oticapupilavendas-boop.github.io/robots.txt, respondeu 404; isso não proíbe o rastreamento. O robots em /site_pupila/robots.txt respondeu 200 e allow, mas está fora da raiz que controla esse host.

O DNS e a associação/HTTPS do domínio precisam ser resolvidos pelo responsável antes da aprovação de SEO em produção. Esta entrega preserva o domínio confirmado e não altera DNS, hospedagem ou canônicas para o endereço legado sem decisão de Mateus. Não há comprovação de visita real do Googlebot ou de indexação no Search Console.

## Verificação no Search Console

1. Na conta Google responsável pela empresa, abrir [Search Console](https://search.google.com/search-console). Adicionar a propriedade **Domínio**, informando oticapupilajlle.com.br sem protocolo ou caminho. Essa opção cobre protocolos e subdomínios, mas exige verificação por DNS.
2. Copiar o registro TXT fornecido pelo próprio Google e adicioná-lo à zona DNS autoritativa do domínio. Preservar os registros existentes e manter o TXT depois da confirmação. O código é específico da propriedade: esta entrega não inventa nem publica um valor de verificação. Não foi alterado nenhum DNS.
3. Se a equipe não administra o DNS, usar a alternativa **Prefixo do URL** com https://oticapupilajlle.com.br/. Escolher um método oferecido pelo Google. Para arquivo HTML, incluir exatamente o arquivo fornecido na raiz do pacote publicado; para meta tag, incluir o valor real no head da home do gerador e regenerar. Revisar via Issue/PR antes de publicar. Meta tag não verifica propriedade Domínio.
4. Confirmar a verificação no Search Console. Esta preparação não afirma que a propriedade já está verificada. Ver [métodos oficiais de verificação](https://support.google.com/webmasters/answer/9008080).

## Validação depois da publicação autorizada

Publicar exige aprovação e merge do PR conforme AGENTS.md. Prévia privada de revisão ou página protegida por login não equivale a lançamento público. Não foi feito deploy nesta entrega.

- Abrir a URL HTTPS em janela anônima, sem cookies/login. Conferir home, categoria, ficha, lentes e contato: resposta HTTP 200, conteúdo principal presente no HTML e navegação funcional.
- Na raiz do domínio, conferir https://oticapupilajlle.com.br/robots.txt: User-agent: *, Allow: / e Sitemap: https://oticapupilajlle.com.br/sitemap.xml. O robots de uma subpasta não controla o host: [posição correta do arquivo](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt).
- Verificar ausência de X-Robots-Tag: noindex nas páginas públicas e de login/redirecionamento para autenticação. A URL inexistente deve responder 404; não devolver home com status 200.
- Conferir HTTPS, redirects HTTP/www/URL antiga e destino canônico. As URLs /index.html e variantes não devem competir com os endereços com barra final. Redirecionamentos de host dependem da hospedagem, não do HTML.
- Enviar https://oticapupilajlle.com.br/sitemap.xml em Sitemaps no Search Console. O sitemap contém somente URLs canônicas públicas; a submissão ajuda a descoberta e não garante indexação.
- Em Inspeção de URL, analisar a home e URLs representativas. Executar **Testar URL publicada**, conferir acesso permitido, resposta, conteúdo renderizado, recursos e canonical declarado; então solicitar indexação, quando disponível. O relatório de URL indexada e o teste ao vivo representam estados diferentes: [Inspeção de URL](https://support.google.com/webmasters/answer/9012289/).
- Acompanhar Indexação de páginas e Estatísticas de rastreamento. Para dizer que o Googlebot realmente visitou, usar esses relatórios ou logs do host com identificação validada do crawler. Trocar o user agent de um cliente de teste para Googlebot avalia a resposta do servidor, mas não prova uma visita do Google.

O [Google exige acesso público e conteúdo indexável](https://developers.google.com/search/docs/essentials/technical). Atendimento aos requisitos torna a URL elegível; não garante inclusão ou posição.

## Carregamento e contraste

O logo do cabeçalho tem fetchpriority=high. app.js agora é defer, depois do mapa de rotas; sua inicialização continua em DOMContentLoaded. Um bootstrap estático no head aplica a mesma classe js antes do corpo, evitando o flash do menu móvel expandido. A atribuição idempotente no app externo foi preservada. Se o recurso app.js falhar, o listener estático restaura o menu sem JavaScript removendo a classe; ele atua somente no script marcado data-pupila-app.

Nenhuma política CSP foi criada ou afrouxada. A busca nas fontes, scripts, configuração e workflows não encontrou CSP incompatível. Se a hospedagem adotar CSP futuramente, deverá autorizar o conteúdo estático do bootstrap sem acrescentar unsafe-inline. Hash SHA-256 exato do bloco atual (inclui sua indentação/quebras): sha256-Tx6a+LAsrRtTWY6csRoKPXFkamxis4FTOiFWJUYaRiI=. Regenerar o hash se o conteúdo mudar; esse registro não configura uma política na hospedagem.

Os textos de destaque sobre fundo navy nas seções Meta e convite à visita passaram de vermelho para paper, com sublinhado decorativo no vermelho original. Isso preserva a paleta e eleva o contraste textual calculado de 2,235:1 para 12,072:1, sem mudar o token global de vermelho.

## PageSpeed e verificações

Meta solicitada: 100 em Performance, Acessibilidade, Boas Práticas e SEO, em mobile e desktop. Registrar todas as quatro notas reais, URL, horário, versão e ambiente. Lighthouse local é diagnóstico do código; PageSpeed na URL final mede também rede/hospedagem/terceiros. Não transferir uma nota de laboratório para produção. A [pontuação de Performance pode variar](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring). CrUX depende de dados de uso suficientes.

Comandos locais: npm run build e npm test. O teste valida H1 local, hierarquia, descrições/títulos únicos, canonical exato, sitemap sem páginas excedentes/404, robots e páginas alcançáveis por links nativos a partir da home, além das verificações preexistentes. npm run test:browser cobre navegação, responsividade e conteúdo sem JavaScript; os módulos do navegador podem ser fornecidos por PLAYWRIGHT_MODULE sem adicionar dependências ao projeto.
