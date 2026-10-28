# Ótica Pupila

Site estático da Ótica Pupila, em Joinville/SC. A direção visual combina o logo original, azul-marinho, vermelho e fundo claro, com tipografia editorial e fotografias reais da loja.

## Desenvolvimento

Node.js 20 ou superior para as verificações:

```sh
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
- `assets/app.js`: navegação pelo hash, histórico, foco, menu, galeria e abertura do WhatsApp.
- `assets/site.css`: cores, tipografia, componentes, responsividade, foco e movimento reduzido.
- `assets/fonts/`: fontes WOFF2 locais DM Sans e Cormorant Garamond, com licenças OFL; aproximadamente 61 KB no total.
- `scripts/check-site.mjs`: valida as 14 rotas, imagens, dimensões, links, âncoras, IDs, sintaxe e recursos locais.
- `.github/workflows/quality.yml`: executa `npm test` em PRs e em `main`.
- `docs/REVISAO.md`: escopo, validação e limitações da revisão.
- `docs/previews/`: capturas da home e da página de produto.

## Conteúdo comercial

As quatro categorias apresentam a seleção da loja e direcionam para atendimento. Os cartões de produtos fictícios e filtros sem estoque foram removidos. O catálogo com produtos individuais depende do envio de fotografias, modelos e informações oficiais. Não há preços, estoque, checkout ou promessas de disponibilidade inventados.

As rotas antigas continuam acessíveis. Links com filtros legados abrem a categoria correspondente; a antiga página-modelo de marca agora apresenta a página de marcas.

Endereço, telefone, horários, depoimentos e orientações existentes foram preservados. Os depoimentos não receberam nomes ou notas inventados. Antes de publicar, a loja deve confirmar os dados comerciais e concluir as informações da hospedagem na política de privacidade.

### Ray-Ban Meta

A página `#/ray-ban-meta/index.html` usa as seis fotografias fornecidas do RW4011 601SSB. Modelo, armação preto fosco e lentes transparentes foram conferidos no [catálogo oficial da Ray-Ban Brasil](https://www.ray-ban.com/brazil/electronics/RW4011ray-ban%20meta%20gen%203%20wayfarer-preto/8056266191008). Preço, tamanho e disponibilidade ficam sob consulta.

A galeria responde a clique, setas esquerda/direita, Home e End. Imagem, descrição, seleção e contador mudam juntos, sem dependência de GSAP ou CDN. As fotos de 720 × 386 px são apresentadas como uma galeria de ângulos; não há simulação de 3D.

## Privacidade e publicação

O carregamento usa apenas arquivos locais. Não há cookies, rastreadores, formulários ou fontes externas. Google Maps, avaliações no Google e WhatsApp abrem somente após uma ação da pessoa. A mensagem no WhatsApp depende de envio pelo próprio usuário.

Siga `AGENTS.md`: Issue antes de alterar, branch de trabalho, testes no PR e publicação somente após aprovação e merge.
