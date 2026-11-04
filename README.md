# Ótica Pupila

Site estático da Ótica Pupila em Joinville/SC. Mantém o logo, a paleta azul-marinho/vermelho, as fontes locais e as fotografias da loja.

## Desenvolvimento

Use Node.js 24 ou superior. Não é necessário instalar dependências para gerar o site ou executar os testes estáticos.

```sh
npm run build
npm test
python -m http.server 4173 --bind 127.0.0.1
```

Abra `http://127.0.0.1:4173/`. Sempre execute `npm run build` após alterar conteúdo ou configuração: os 18 arquivos HTML gerados são versionados e `npm test` confere se estão atualizados. `npm run build:lenses` continua disponível como alias do build completo.

## Estrutura e navegação

- `assets/pages.js`: conteúdo, dados comerciais, cabeçalho e rodapé compartilhados; usado apenas na geração.
- `assets/lens-pages.js`: conteúdo de lentes; compartilha o cabeçalho/rodapé sem extrair HTML de uma página antiga.
- `scripts/build-site.mjs`: gera home, categorias, marcas, produto, história, FAQ, contato, privacidade e lentes, com títulos e descrições próprios.
- `assets/app.js`: menu, teclado, galeria, filtros quando há seleção suficiente e comparador de lentes. Não recria o conteúdo da página.
- `assets/routes.js`: mapa gerado para redirecionar endereços antigos `#/rota`, com ou sem `/index.html`, para os arquivos estáticos.
- `404.html`: página da marca. A resposta HTTP 404 e sua ativação dependem da configuração da hospedagem.
- `site-config.json`: domínio e dados empresariais/de hospedagem para finalizar a privacidade.
- `docs/REVISAO.md`: validação desta revisão. `docs/PENDENCIAS.md`: dados ainda necessários.
- `docs/previews/`: 25 capturas históricas de versões anteriores; não representam automaticamente a versão atual e não são incluídas no pacote de publicação.

Cada página funciona sem JavaScript, inclusive o acesso à navegação no celular e os links de WhatsApp. Scripts acrescentam menu recolhível, galeria e comparador. Rotas por hash exigem JavaScript apenas para o redirecionamento legado; os links atuais são URLs normais. `marcas/modelo/` é um alias com `noindex` e canonical para `marcas/` quando o domínio está definido.

## Conteúdo

Categorias com menos de dois produtos usam apresentação editorial, contato e visita; os destaques reais existentes são mantidos. Produtos, cores, configurações e disponibilidade devem ser consultados com a loja. Não há checkout ou preços. As citações de avaliações e a afirmação de revenda autorizada foram removidas enquanto não há comprovação; o link para as avaliações permanece.

As lentes exigem receita médica. Não se oferece consulta ou adaptação médica na loja. As fontes de linhas e tecnologias, a origem das marcas e o certificado Select 2026 estão em `docs/LENTES.md`. O ano da certificação é histórico e não é atualizado automaticamente. O rodapé usa “Desde 1992”, sem depender do relógio do build.

As seis fotos fornecidas do Ray-Ban Meta foram preservadas também em WebP para compatibilidade. O logo original continua guardado, com versão compacta para uso no site. Os recursos descritos têm como referência o [anúncio oficial da Meta](https://about.fb.com/news/2026/09/introducing-ray-ban-meta-audio-glasses-new-styles-plus-muse/); recursos de IA dependem do país e do idioma.

## Testes reproduzíveis

`npm test` verifica o HTML das 18 páginas, imagens e variantes responsivas, metadados, links e âncoras, mensagens de WhatsApp, limites de tamanho de imagens e sintaxe. Também simula o build em 2027/2028 e testa publicação em uma fixture isolada com domínio reservado `.invalid`.

Para os testes opcionais de navegador, instale Playwright e axe-core em um ambiente de testes (sem mudar as dependências do projeto):

```sh
npm install --no-save --package-lock=false playwright axe-core@4.10.3
npx playwright install chromium
npm run test:browser
```

Para incluir a análise axe, defina `AXE_SCRIPT` como caminho absoluto de `node_modules/axe-core/axe.min.js`. O teste informa no JSON se axe foi executado. Aceita `BROWSER=chromium|firefox|webkit`, `BROWSER_CHANNEL=chrome|msedge` e `PLAYWRIGHT_MODULE` com o caminho absoluto do módulo Playwright, permitindo usar a instalação isolada local. Os motores devem estar instalados. O teste inicia seu próprio servidor e salva resultados em `test-results/` (ignorado pelo Git).

O navegador cobre 18 páginas em 320, 375, 768, 901, 1024 e 1440 px, imagens, tamanho de texto, menu/Escape, galeria por teclado, histórico, comparador, URLs legadas e 18 páginas sem JavaScript. Axe verifica nove páginas quando configurado. Testes automatizados não substituem leitores de tela e aparelhos reais.

## Preparação para publicação

O domínio e a hospedagem ainda não foram escolhidos. Na prévia, não há canonical, `og:url`, `og:image` absoluto ou sitemap com domínio inventado. `robots.txt` e a imagem social de 1200 × 630 já existem.

Depois de preencher `site-config.json` com os dados confirmados, execute:

```sh
npm run build
npm test
npm run build:publish
```

Com domínio HTTPS configurado, o build emite canonical, `og:url`, `og:image` e `sitemap.xml` com as 16 páginas principais; exclui 404 e o alias de marcas. `build:publish` exige também todos os campos de privacidade e produz `dist/`, sem documentação interna, scripts de geração, configuração ou originais pesados. Esse comando prepara arquivos e não envia nada para uma hospedagem. A adequação da política deve ser revisada pelo responsável da empresa.

Configure o diretório publicado como `dist/` e a página de erro como `404.html`. Cabeçalhos de segurança, cache e redirecionamentos de servidor serão definidos conforme a hospedagem escolhida. Depois do deploy, conferir os canais reais da loja, o domínio HTTPS, as prévias sociais e o PageSpeed/CrUX.

Siga `AGENTS.md`: Issue antes das alterações, branch própria, testes no PR e publicação somente após aprovação e merge.
