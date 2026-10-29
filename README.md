# Ótica Pupila

Site estático da Ótica Pupila, em Joinville/SC. A direção visual combina o logo original, azul-marinho, vermelho e fundo claro, com tipografia editorial e fotografias reais da loja.

## Desenvolvimento

Node.js 20 ou superior para as verificações:

```sh
npm test
```

Quando alterar textos ou navegação de lentes, gere novamente as cinco páginas estáticas antes de testar:

```sh
npm run build:lenses
npm test
```

Sirva a pasta com qualquer servidor estático. Com Python:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Abra `http://127.0.0.1:4173`. Não há build, instalação de dependências ou serviços externos necessários para o site funcionar.

## Estrutura

- `index.html`: metadados, carregamento local e contato acessível mesmo sem JavaScript.
- `assets/pages.js`: conteúdo das páginas, cabeçalho/rodapé compartilhados, informações da loja e seis ângulos do Ray-Ban Meta.
- `assets/lens-pages.js`: conteúdo editorial das lentes para óculos e de contato.
- `lentes/`: cinco páginas HTML com endereços próprios, conteúdo e metadados indexáveis sem JavaScript.
- `assets/lens-ui.js`: menu e WhatsApp nas páginas estáticas de lentes.
- `assets/app.js`: navegação pelo hash, histórico, foco, menu, galeria e abertura do WhatsApp.
- `assets/site.css`: cores, tipografia, componentes, responsividade, foco e movimento reduzido.
- `assets/fonts/`: fontes WOFF2 locais DM Sans e Cormorant Garamond, com licenças OFL; aproximadamente 61 KB no total.
- `scripts/build-lens-pages.mjs`: gera as páginas estáticas a partir do conteúdo compartilhado.
- `scripts/check-site.mjs`: valida rotas, imagens, dimensões, links, âncoras, IDs, sintaxe e recursos locais.
- `.github/workflows/quality.yml`: executa `npm test` em PRs e em `main`.
- `docs/REVISAO.md`: escopo, validação e limitações da revisão.
- `docs/previews/`: capturas da home e da página de produto.

## Conteúdo comercial

As quatro categorias apresentam a seleção da loja e direcionam para atendimento. Os cartões de produtos fictícios e filtros sem estoque foram removidos. O catálogo com produtos individuais depende do envio de fotografias, modelos e informações oficiais. Não há preços, estoque, checkout ou promessas de disponibilidade inventados.

As rotas antigas continuam acessíveis. Links com filtros legados abrem a categoria correspondente; a antiga página-modelo de marca agora apresenta a página de marcas.

### Lentes

O menu **Lentes** abre **Lentes para óculos** e **Lentes de contato**. As páginas de óculos, HOYA, ZEISS, Essilor e contato têm endereços reais sob `lentes/`. Qualquer venda de lentes exige receita médica. O site apresenta famílias e tecnologias, sem preços, estoque, aconselhamento médico, consulta ou adaptação. O certificado original da loja destaca o reconhecimento **Essilor Varilux Especialista Select 2026**.

As fontes dos nomes e famílias estão registradas em [`docs/LENTES.md`](docs/LENTES.md). Os fabricantes de lentes de contato aparecem em texto até a loja enviar logotipos PNG transparentes. O conteúdo é gerado a partir de `assets/lens-pages.js`; execute `npm run build:lenses` ao editá-lo.

Endereço, telefone, horários, depoimentos e orientações existentes foram preservados. Os depoimentos não receberam nomes ou notas inventados. Antes de publicar, a loja deve confirmar os dados comerciais e concluir as informações da hospedagem na política de privacidade.

### RAY-BAN META WAYFARER GEN 3

A página `#/ray-ban-meta/index.html` usa as seis fotografias fornecidas do RW4011 601SSB. Modelo e armação preto fosco foram conferidos no [catálogo oficial da Ray-Ban Brasil](https://www.ray-ban.com/brazil/electronics/RW4011ray-ban%20meta%20gen%203%20wayfarer-preto/8056266191008). Preço, tamanho e disponibilidade ficam sob consulta.

A galeria responde a clique, setas esquerda/direita, Home e End. Imagem, descrição, seleção e contador mudam juntos, sem dependência de GSAP ou CDN. As fotos de 720 × 386 px são apresentadas como uma galeria de ângulos; não há simulação de 3D.

A descrição dos recursos da geração 3 usa também o [anúncio oficial da Meta](https://about.fb.com/news/2026/09/introducing-ray-ban-meta-audio-glasses-new-styles-plus-muse/), consultado em 28 de outubro de 2026. A apresentação utiliza o logo Meta fornecido pelo proprietário, preservado em `assets/logo-meta.png`.

## Privacidade e publicação

O carregamento usa apenas arquivos locais. Não há cookies, rastreadores, formulários ou fontes externas. Google Maps, avaliações no Google e WhatsApp abrem somente após uma ação da pessoa. A mensagem no WhatsApp depende de envio pelo próprio usuário.

Siga `AGENTS.md`: Issue antes de alterar, branch de trabalho, testes no PR e publicação somente após aprovação e merge.
