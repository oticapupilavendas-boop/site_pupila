# Pendências para concluir o site

Atualizado em 04/11/2026 — Issue #12. As correções técnicas possíveis já foram aplicadas. O site está em prévia e não foi publicado.

## Envie estes dados em uma resposta

Copie e preencha os campos abaixo. Se ainda não souber algum, escreva “a definir”.

```text
DADOS DA EMPRESA
Razão social:
CNPJ:
Endereço completo da empresa (incluindo CEP):
E-mail ou canal responsável por solicitações de privacidade:
Nome/cargo de quem revisa e aprova a política de privacidade:

DADOS QUE APARECEM NO SITE — confirmar ou corrigir
Nome: Ótica Pupila
Fundação: 1992
Endereço da loja: Rua Abdon Batista, 59 — Centro, Joinville/SC
Telefone: (47) 3422-3223
WhatsApp: +55 47 3422-3223
Segunda a sexta: 08h30 às 18h
Sábado: ____ às 12h30 (falta o horário de abertura)
Domingo: fechado
Feriados: qual orientação devemos mostrar?

WHATSAPP E GOOGLE
Abri https://wa.me/554734223223 no celular e apareceu a conversa da Pupila: sim/não
Se não, número correto com DDD:
Abri https://maps.app.goo.gl/fx92AvEfJ51patQ48 e é o perfil correto da loja: sim/não
Se não, link correto do perfil no Google Maps:

PUBLICAÇÃO — ainda não escolhidos
Domínio desejado ou já registrado (ex.: https://...):
Serviço de hospedagem escolhido:
Acesso à hospedagem por convite/conector disponível: sim/não/a definir
Link da documentação/política da hospedagem sobre dados e logs:
País/região de armazenamento/processamento, se informado pelo serviço:
Prazo de retenção e finalidade dos logs, se informados pelo serviço:
```

O CNPJ e a razão social podem ser enviados como texto ou por comprovante cadastral. O endereço legal pode ser diferente do endereço da loja; informe ambos nesse caso. Para os logs, basta inicialmente o nome do serviço e o link da política: eu verifico a documentação pública e identifico o que depender de configuração da conta.

Com essas respostas, finalizo `site-config.json`, o horário em todas as páginas, os dados empresariais e a política de privacidade. A loja deve revisar o texto final antes da publicação. Depois gero canonical, `og:url`, `og:image` e sitemap com o domínio real, preparo `dist/` e os ajustes específicos da hospedagem. O deploy segue a aprovação do PR prevista em `AGENTS.md`.

## Só envie se quiser restaurar ou ampliar estes conteúdos

- **“Revendedora autorizada” de HOYA/ZEISS/Essilor:** envie comprovação vigente de cada marca (contrato, credenciamento ou confirmação escrita do representante que permita essa afirmação). Enquanto isso, o site usa “Trabalhamos com lentes...”. O certificado Select 2026 continua exibido porque a imagem foi fornecida pela loja.
- **Depoimentos no próprio site:** envie o link individual da avaliação, texto autorizado, nome que pode aparecer, data e confirmação de autorização para republicar. Por enquanto, há somente o link para as avaliações no Google.
- **Catálogo de armações:** para cada modelo, envie fotos autorizadas e a identificação oficial (marca, modelo/referência, cor, medidas se conhecidas, grau/solar, público se aplicável). Diga se devemos mostrar apenas “sob consulta” ou alguma informação comercial confirmada. Fotos sem identificação podem ser enviadas, mas não vou deduzir marca ou modelo. Não é necessário completar o catálogo para publicar: as categorias já funcionam com atendimento e visita.
- **Textos de miopia infantil:** peça ao representante os materiais brasileiros atuais de MiYOSMART, MyoCare e Stellest e, se houver, a redação aprovada para revendedores. Envie PDFs ou links oficiais e qualquer orientação de revisão da loja. Os textos atuais continuam breves, condicionados à avaliação/prescrição do oftalmologista e sem promessa de resultado.
- **Ray-Ban/Meta:** se houver regra específica para revendedores, envie o manual de uso das marcas ou a orientação do representante. O logo fornecido foi preservado em versão otimizada; a IA é apresentada como dependente de país/idioma, sem garantir disponibilidade em português no Brasil.
- **Logos de fabricantes de lentes de contato:** PNG transparente ou SVG oficial, com autorização de uso. Os nomes já aparecem em texto, então isso não impede a conclusão.

## Testes que dependem do celular ou de publicação

1. No iPhone/Safari e em um Android, abra a futura URL, navegue por óculos, lentes e contato, abra/feche o menu e teste a galeria do Ray-Ban Meta. Em Instagram e Facebook, abra o site e toque no WhatsApp. Confirme que abriu a conversa certa; não precisa enviar uma mensagem.
2. Se algo falhar, envie URL completa, aparelho, sistema, navegador/aplicativo, o que tocou e o que aconteceu. Uma gravação curta ou captura ajuda a reproduzir. Se tudo funcionar, diga quais aparelhos e aplicativos testou.
3. Se você ou alguém puder usar NVDA/VoiceOver, teste menu, título principal, links, perguntas frequentes e galeria. Envie a sequência de teclas/gestos e qualquer trecho anunciado incorretamente. Sem acesso a esses recursos, informe essa limitação; os testes automatizados já estão incluídos.
4. Assim que existir URL pública, me envie o endereço e o nome da hospedagem. Eu verifico HTTPS, status HTTP/404, arquivos, cache/cabeçalhos, sitemap, prévia social e desempenho. Dados de CrUX dependem de tráfego suficiente; PageSpeed pode ser executado logo após a publicação.

## Situação de cada achado da auditoria

| Achado | Situação |
|---|---|
| 1 — Privacidade | Estrutura e dados configuráveis preparados; falta empresa/hospedagem/revisão. A prévia informa isso. |
| 2 — Páginas apenas por hash | Corrigido: 18 HTML completos e URLs próprias. |
| 3 — Categoria vazia | Corrigido: apresentação editorial e atendimento. |
| 4 — Ano/CI | Corrigido: “Desde 1992”; testes com 2027/2028. |
| 5 — SEO absoluto | Robots e imagem social presentes; gerador de canonical/OG/sitemap testado. Ativação aguarda domínio. |
| 6 — Filtros | Corrigido: ocultos com menos de dois produtos; público universal corrigido. |
| 7 — Estoque contraditório | Corrigido: retiradas as promessas de estoque. |
| 8 — Navegação/WhatsApp sem JS | Corrigido nas 18 páginas. |
| 9 — Certificado pesado | Corrigido: variantes de 21 KB e 54 KB. |
| 10 — Home via JS | Corrigido: HTML completo e preload. Métricas finais dependem de teste no host. |
| 11 — Foco em fundo escuro | Corrigido: contorno claro. |
| 12 — Logo Meta pesado | Corrigido: 6 KB, lazy loading. |
| 13 — Rotas curtas/404 | Hash curto redirecionado e 404 da marca criado. Ativação HTTP depende do host. |
| 14 — Chaves de protótipo | Corrigido; cinco casos testados sem erro. |
| 15 — Lentes legadas/comparador | Corrigido: redirecionamento e interação compartilhada. |
| 16 — ARIA da galeria | Corrigido; análise axe sem esse erro. |
| 17 — Textos pequenos | Corrigido nos 108 cenários de layout. |
| 18 — Manutenção | Interações e cabeçalho/rodapé unificados; dependência da página legada removida. Reescrita geral dos templates/CSS não é necessária para concluir. |
| 19 — Documentação/testes | Atualizados; testes de navegador versionados. Capturas antigas identificadas como históricas. |
| 20 — Imagens responsivas | Corrigido com srcset e WebP; fachada móvel com 44 KB. |
| 21 — Abertura no sábado | Falta confirmar horário; não foi inventado. |
| P1/P3/P11 | Falta confirmação dos canais e dados da loja. |
| P2/P4 | Afirmações/citações retiradas; comprovação só é necessária para restaurá-las. |
| P5/P6 | Linguagem cautelosa mantida; materiais específicos/revisão comercial opcionais conforme acima. |
| P7/P8 | Edge, Chrome e testes automatizados feitos; faltam testes nos aparelhos/aplicativos indicados. |
| P9 | CI atualizado para Node 24. |
| P10 | Pacote separado preparado; cache/cabeçalhos dependem do host. |
