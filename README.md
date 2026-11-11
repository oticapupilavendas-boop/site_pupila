# Ótica Pupila

Site estático da Ótica Pupila em Joinville/SC. Mantém o logo, a paleta azul-marinho/vermelho, as fontes locais e as fotografias da loja.

## Desenvolvimento

Use Node.js 24 ou superior. Não é necessário instalar dependências para gerar o site ou executar os testes estáticos.

```sh
npm run build
npm test
python -m http.server 4173 --bind 127.0.0.1
```

Abra `http://127.0.0.1:4173/`. Sempre execute `npm run build` após alterar conteúdo ou configuração: os arquivos HTML gerados são versionados e `npm test` confere se estão atualizados. `npm run build:lenses` continua disponível como alias do build completo.

## Estrutura e navegação

- `assets/pages.js`: conteúdo, dados comerciais, cabeçalho e rodapé compartilhados; usado apenas na geração.
- `assets/catalog-products.js`: modelos do acervo, público no catálogo, fichas, fontes e ângulos; usado apenas na geração.
- `assets/lens-pages.js`: conteúdo de lentes; compartilha o cabeçalho/rodapé sem extrair HTML de uma página antiga.
- `scripts/build-site.mjs`: gera home, categorias, fichas de produto, história, FAQ, contato, privacidade e lentes, com títulos e descrições próprios.
- `assets/app.js`: menu, teclado, galeria, filtros, carrosséis, entrada dos cartões e comparador de lentes. O conteúdo é gerado no HTML.
- `assets/routes.js`: mapa gerado para redirecionar endereços antigos `#/rota`, com ou sem `/index.html`, para os arquivos estáticos.
- `404.html`: página da marca. A resposta HTTP 404 e sua ativação dependem da configuração da hospedagem.
- `site-config.json`: domínio e dados empresariais/de hospedagem para finalizar a privacidade.
- `docs/REVISAO.md`: validação desta revisão. `docs/PENDENCIAS.md`: dados ainda necessários.
- `docs/previews/`: 25 capturas históricas de versões anteriores; não representam automaticamente a versão atual e não são incluídas no pacote de publicação.

Cada página funciona sem JavaScript, inclusive a navegação no celular, os links de WhatsApp e a leitura de todos os itens dos carrosséis. O WhatsApp é o único destino web externo. Os botões de conversa abrem o aplicativo com uma mensagem sugerida sobre o produto ou a categoria consultada. Rotas por hash usam JavaScript para o redirecionamento legado. Os links atuais são URLs normais.

## Conteúdo

Relógios e semijoias usam apresentação editorial, contato e visita. Consulte produtos, cores, configurações e disponibilidade com a loja. As categorias e fichas de produto exibem cinco trechos de avaliações reais da loja e seleções de perguntas frequentes. A página de FAQ reúne as 30 perguntas por tema. Na home, as duas avaliações ficam lado a lado no desktop e as cinco perguntas usam uma lista expansível.

O catálogo inclui 18 armações, uma por marca no total, distribuídas entre 12 modelos de grau e 6 solares. O Ray-Ban Meta representa a Ray-Ban. Cada conjunto tem galeria WebP e ficha. Os filtros de marca e público podem ser combinados. A classificação segue o catálogo do fabricante quando disponível e a seleção da loja nos demais casos. Modelos unissex e peças sem público definido na seleção aparecem nos dois filtros.

Para identificar novos modelos, confira primeiro o código da haste ou etiqueta no catálogo oficial. A busca visual ajuda a encontrar candidatos. Compare frente, perfil e detalhes com as fotos do fabricante. Registre a fonte e sinalize identificações que ainda dependam de confirmação da loja. Inclua tamanho, material ou tratamento das lentes somente quando houver evidência para a variante.

As lentes exigem receita médica. Não se oferece consulta ou adaptação médica na loja. As fontes de linhas e tecnologias, a origem das marcas e o certificado Select 2026 estão em `docs/LENTES.md`. O ano da certificação é histórico e não é atualizado automaticamente. O rodapé usa “Desde 1992”, sem depender do relógio do build.

As seis fotos fornecidas do Ray-Ban Meta foram preservadas também em WebP para compatibilidade. O logo original continua guardado, com versão compacta para uso no site. Os recursos descritos têm como referência o [anúncio oficial da Meta](https://about.fb.com/news/2026/09/introducing-ray-ban-meta-audio-glasses-new-styles-plus-muse/); recursos de IA dependem do país e do idioma.

## Testes reproduzíveis

`npm test` verifica o HTML das 33 páginas, imagens e variantes responsivas, metadados, links internos e âncoras, seleção de armações, limites de tamanho de imagens e sintaxe. Também simula o build em 2027/2028 e testa publicação em uma fixture isolada com domínio reservado `.invalid`.

Para os testes opcionais de navegador, instale Playwright e axe-core em um ambiente de testes (sem mudar as dependências do projeto):

```sh
npm install --no-save --package-lock=false playwright axe-core@4.10.3
npx playwright install chromium
npm run test:browser
```

Para incluir a análise axe, defina `AXE_SCRIPT` como caminho absoluto de `node_modules/axe-core/axe.min.js`. O teste informa no JSON se axe foi executado. Aceita `BROWSER=chromium|firefox|webkit`, `BROWSER_CHANNEL=chrome|msedge` e `PLAYWRIGHT_MODULE` com o caminho absoluto do módulo Playwright, permitindo usar a instalação isolada local. Os motores devem estar instalados. O teste inicia seu próprio servidor e salva resultados em `test-results/` (ignorado pelo Git).

O navegador cobre as 33 páginas em 320, 375, 768, 901, 1024 e 1440 px. Verifica imagens, tamanho de texto, menu/Escape, galerias por teclado, filtros combinados, carrosséis, movimento reduzido, histórico, comparador, URLs legadas e navegação sem JavaScript. Axe verifica páginas representativas quando configurado.

## Preparação para publicação

O domínio e a hospedagem ainda não foram escolhidos. Na prévia, não há canonical, `og:url`, `og:image` absoluto ou sitemap com domínio inventado. `robots.txt` e a imagem social de 1200 × 630 já existem.

Depois de preencher `site-config.json` com os dados confirmados, execute:

```sh
npm run build
npm test
npm run build:publish
```

Com domínio HTTPS configurado, o build emite canonical, `og:url`, `og:image` e `sitemap.xml` com as 32 páginas principais, excluindo a página 404. `build:publish` exige também todos os campos de privacidade e produz `dist/`, sem documentação interna, scripts de geração, configuração ou originais pesados. Esse comando prepara arquivos e não envia nada para uma hospedagem. A adequação da política deve ser revisada pelo responsável da empresa.

Configure o diretório publicado como `dist/` e a página de erro como `404.html`. Cabeçalhos de segurança, cache e redirecionamentos de servidor serão definidos conforme a hospedagem escolhida. Depois do deploy, conferir os canais reais da loja, o domínio HTTPS, as prévias sociais e o PageSpeed/CrUX.

Siga `AGENTS.md`: Issue antes das alterações, branch própria, testes no PR e publicação somente após aprovação e merge.
