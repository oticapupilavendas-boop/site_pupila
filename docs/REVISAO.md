# Revisão após auditoria — 04/11/2026

Acompanhamento: Issue #12. A auditoria recebida foi `auditoria-site-pupila.md`, de 04/11/2026. O projeto local já continha refinamentos de lentes não commitados, que foram preservados e incorporados às páginas geradas. Nenhum deploy foi feito.

## Mudanças

- 18 páginas HTML completas, com URLs reais e metadados próprios; home pré-renderizada e imagem principal pré-carregada.
- Endereços antigos por hash redirecionam para as páginas atuais. Chaves como `constructor` e `__proto__` chegam ao 404 sem acesso ao protótipo de objetos.
- Categorias sem seleção suficiente usam apresentação editorial. Sem filtros/contadores vazios; o Ray-Ban Meta continua na categoria solar. Filtro universal corrigido para futuras seleções maiores.
- WhatsApp por links nativos; navegação móvel acessível sem JS. Menu, galeria e comparador usam o mesmo arquivo de interações.
- Cabeçalho/rodapé compartilhados diretamente entre os templates; removida a dependência da página legada de lentes e removido `lens-ui.js`.
- Rodapé com “Desde 1992”; build idêntico em 2027 e 2028. CI usa Node 24, versão LTS conforme o [calendário oficial](https://nodejs.org/en/about/previous-releases).
- Promessas de estoque, depoimentos sem comprovação e título de revenda autorizada retirados. O certificado Essilor Select 2026 e as marcas fornecidas pela loja foram preservados.
- Certificado otimizado: 20.852 bytes (800 px), 53.886 bytes (1600 px); logo Meta: 6.072 bytes. Fachada móvel: 43.638 bytes. Originais guardados.
- Foco claro em seções escuras, galeria com `role="group"`, textos informativos com mínimo de 11 px nos cenários testados. Correção de overflow da ilustração de lentes em tablets.
- Imagens responsivas com `srcset` real e fotos do produto em WebP.
- Gerador de canonical, Open Graph e sitemap preparado; imagem social local criada. URLs absolutas aguardam o domínio real.
- Pacote de publicação separado em `dist/`, condicionado ao preenchimento do domínio e dos dados de privacidade.

## Validação reproduzível

- `npm test`: 18 páginas HTML, 74 referências de imagens, recursos locais, títulos/descrições, links/âncoras, mensagens de WhatsApp, sintaxe, limites de tamanho, build em 2027/2028 e configuração de publicação em fixture isolada.
- `npm run test:browser`, com Edge e Chrome reais: 108 cenários de layout por navegador, seis larguras de 320 a 1440 px; sem rolagem horizontal, imagens quebradas ou erros de JavaScript/rede.
- Interações: menu/Escape e retorno do foco, links e histórico, galeria por clique/teclado, comparador, 13 URLs legadas incluindo cinco chaves de protótipo.
- Contexto sem JavaScript: conteúdo, navegação visível e links de WhatsApp nas 18 páginas; link interno acionado para confirmar navegação.
- axe-core 4.10.3: nove páginas em 375 px; zero violações WCAG A/AA e best practices, sem pendência `aria-prohibited-attr`.
- Rede lenta em laboratório (Chrome, 375 × 900, latência 150 ms, download 1,6 Mbps, upload 750 Kbps, CPU 4×): na última execução local, LCP de aproximadamente 1,5 s na home e 1,6 s em contato, CLS 0 em ambas. É uma medição isolada, não uma garantia na hospedagem. Navegação progressiva ativada antes de renderizar o corpo para evitar deslocamento do menu; fontes e imagem principal responsiva pré-carregadas.
- Inspeção visual de capturas da home em desktop/celular e da categoria de óculos de grau.

Os cenários estão versionados em `scripts/check-browser.mjs`; o teste de navegador é separado do estático e depende de Playwright instalado. As 25 imagens em `docs/previews/` são um arquivo histórico, não evidência desta execução. Relatórios e capturas desta execução ficam em `test-results/` e podem ser regenerados.

## O que permanece pendente

- Razão social, CNPJ, endereço legal, contato de privacidade e revisão do texto pela empresa.
- Domínio, hospedagem, país/processamento e prazo/política de logs. A página de privacidade da prévia explicita a ausência desses dados; não foi apresentada como política final.
- Confirmação comercial do WhatsApp, endereço, telefone e horários. A abertura aos sábados não foi presumida.
- Safari iOS, Firefox, leitores de tela, aparelhos físicos e abertura do WhatsApp em aplicativos como Instagram/Facebook.
- Validação na hospedagem real: HTTP 404, cache, cabeçalhos, HTTPS, sitemap, compartilhamento social e PageSpeed/CrUX. Não se atribui nota de produção a testes locais.

Dados estruturados de negócio local e as melhorias opcionais de apresentação ficam para depois da confirmação dos dados comerciais. Catálogo com mais produtos exige identificação e informações fornecidas pela loja. O detalhamento está em `docs/PENDENCIAS.md`.
