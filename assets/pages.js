/* Conteúdo e páginas. Fotografias e informações fornecidas pela Ótica Pupila. */
(function () {
  'use strict';

window.PUPILA_ASSETS = {
  "assets/images/logo-pupila.webp": "assets/image-01.webp",
  "assets/images/fachada-frontal.webp": "assets/image-02.webp",
  "assets/images/fachada.webp": "assets/image-03.webp",
  "assets/images/ambiente.webp": "assets/image-04.webp",
  "assets/images/atendimento.webp": "assets/image-05.webp",
  "assets/images/balcoes.webp": "assets/image-06.webp",
  "assets/images/interior.webp": "assets/image-07.webp"
};

window.PUPILA_DATA = {
  "company": {
    "name": "Ótica Pupila",
    "founded": 1992,
    "phone": "+554734223223",
    "phoneDisplay": "(47) 3422-3223",
    "whatsapp": "554734223223",
    "address": "Rua Abdon Batista, 59 — Centro, Joinville/SC",
    "siteUrl": "",
    "instagram": ""
  },
  "products": []
};

const company = window.PUPILA_DATA.company;
const whatsappIcon = '<img class="whatsapp-icon" src="assets/whatsapp.svg" width="26" height="26" alt="">';

const story = `<section class="story-block wrap">
<figure class="story-photo reveal">
<img class="" src="pupila-asset:assets/images/fachada.webp" width="1152" height="1536" alt="Fachada e entrada da Ótica Pupila, na Rua Abdon Batista, 59" loading="lazy" decoding="async">
<span class="photo-note">NOSSA CASA, EM JOINVILLE.</span>
</figure>
<div class="story-copy reveal">
<p class="eyebrow">TRADIÇÃO & CONFIANÇA</p>
<h2>O tempo passa.<br>O cuidado fica.
</h2>
<p>Desde 1992, fazemos parte de Joinville. Na nossa loja, você encontra espaço para experimentar, tirar dúvidas e escolher com calma.</p>
<p>Nossa equipe escuta o que você procura e orienta sobre os detalhes de cada peça, o ajuste e as opções de lentes.</p>
<a href="#/nossa-historia/index.html" class="text-link" >Nossa história <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M4 12h16M13 5l7 7-7 7"/>
</svg>
</a>
<div class="since">
<span>1992</span>
<p>O ano em que<br>tudo começou.</p>
</div>
</div>
</section>`;

const reviewQuotes = [
  'Quero agradecer imensamente pelo atendimento maravilhoso na ótica. A equipe foi super atenciosa, esclareceu todas as minhas dúvidas e me ajudou a escolher a armação perfeita. Recomendo de olhos fechados, sem trocadilho!',
  'Eu amo essa Ótica, saio de Curitiba pra fazer meus óculos nela, super bem atendida, atendimento nota mil, sem forçar compra, deixando super a vontade na escolha [...]'
];
const testimonial = quote => `<figure class="testimonial">
<span class="testimonial-mark" aria-hidden="true">“</span>
<blockquote><p>${quote}</p></blockquote>
<figcaption>Trecho de avaliação de cliente</figcaption>
</figure>`;
const reviews = `<section class="section wrap reviews-section" id="avaliacoes" aria-labelledby="reviews-title">
<div class="section-heading">
<div>
<p class="eyebrow">EXPERIÊNCIAS DE CLIENTES</p>
<h2 id="reviews-title">Conheça as avaliações<br>da nossa loja.</h2>
</div>
</div>
<div class="testimonials-grid">${reviewQuotes.map(testimonial).join('')}</div>
</section>`;

const faq = `<section class="section faq-section">
<div class="wrap faq-layout">
<div>
<p class="eyebrow">BOM SABER</p>
<h2>Um pouco mais<br>de clareza.</h2>
<p>Respostas simples para cuidar<br>dos seus óculos e do seu olhar.</p>
<a href="#/perguntas-frequentes/index.html" class="text-link" >Todas as perguntas <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M4 12h16M13 5l7 7-7 7"/>
</svg>
</a>
</div>
<div class="faq-list">
<details>
<summary>Como limpar as lentes dos meus óculos?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Enxágue para retirar partículas, use um produto indicado para suas lentes ou uma pequena quantidade de detergente neutro, enxágue e seque com uma microfibra limpa. Evite água quente e siga as orientações do fabricante.</p>
</div>
</details>
<details>
<summary>Posso limpar os óculos na roupa?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Evite. O tecido e a poeira podem riscar as lentes. Prefira uma microfibra própria e limpa, retirando a sujeira antes de esfregar.</p>
</div>
</details>
<details>
<summary>Lentes escuras garantem proteção UV?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>A cor, sozinha, não comprova proteção. Ao escolher os óculos solares, verifique a indicação de proteção UVA e UVB do fabricante, como 100% UV ou UV400.</p>
</div>
</details>
<details>
<summary>Como guardar meus óculos?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Use um estojo adequado e evite apoiar as lentes diretamente nas superfícies. Não deixe os óculos expostos ao calor intenso, como no painel de um carro.</p>
</div>
</details>
<details>
<summary>Como escolher lentes e armações?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Leve sua prescrição e conte à equipe como usa os óculos no dia a dia. A escolha deve considerar as orientações do profissional que acompanha sua visão, o ajuste e o conforto da armação.</p>
</div>
</details>
</div>
</div>
</section>`;

const location = `<section class="section wrap location-layout">
<div class="reveal">
<p class="eyebrow">PERTINHO DE VOCÊ</p>
<h2>Seu novo olhar<br>começa aqui.
</h2>
<p class="address">Rua Abdon Batista, 59<br>Centro · Joinville/SC</p>
<dl class="hours">
<div>
<dt>Segunda a sexta</dt>
<dd>08h30 às 18h</dd>
</div>
<div>
<dt>Sábado</dt>
<dd>08h30 às 12h30</dd>
</div>
<div>
<dt>Domingo</dt>
<dd>Fechado</dd>
</div>
</dl>
<div class="button-row">
<a href="#/contato/index.html#localizacao" class="button primary">Como chegar <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M4 12h16M13 5l7 7-7 7"/>
</svg>
</a>
<a href="tel:+554734223223" class="text-link" >
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z"/>
</svg>(47) 3422-3223</a>
</div>
</div>
<figure class="location-photo">
<img class="" src="pupila-asset:assets/images/fachada-frontal.webp" width="1536" height="1152" alt="Vista frontal da vitrine e da entrada da Ótica Pupila" loading="lazy" decoding="async">
</figure>
</section>`;

const existing = {

"nossa-historia/index.html": { title: "Nossa história desde 1992 | Ótica Pupila", content: `<nav class="breadcrumb wrap" aria-label="Caminho da página">
<a href="#/index.html" class="" >Início</a>
<span aria-hidden="true">/</span>
<span>Nossa história</span>
</nav>
<section class="page-intro wrap">
<p class="eyebrow">JOINVILLE · DESDE 1992</p>
<h1>Uma história de confiança.</h1>
<p class="lede">Conheça um pouco da nossa trajetória e do espaço onde recebemos você.</p>
</section>
<section class="wrap history-spread">
<figure>
<img class="" src="pupila-asset:assets/images/fachada.webp" width="1152" height="1536" alt="Fachada e entrada da Ótica Pupila, na Rua Abdon Batista, 59" loading="lazy" decoding="async">
</figure>
<div>
<span class="history-year">1992</span>
<h2>O começo da nossa trajetória.</h2>
<p>Fundada em 1992, a Ótica Pupila atua no segmento óptico em Joinville, Santa Catarina.</p>
<p>Ao longo dessa trajetória, seguimos valorizando a conversa com cada cliente, a orientação na escolha e a atenção aos detalhes.</p>
<p>Hoje, nossa loja está na Rua Abdon Batista, 59, no Centro de Joinville. Um espaço para conhecer os produtos, conversar e escolher com atenção.</p>
</div>
</section>
<section class="wrap section">
<div class="section-heading">
<div>
<p class="eyebrow">NOSSA LOJA, HOJE</p>
<h2>Um espaço para receber você.</h2>
</div>
</div>
<div class="history-gallery">
<img class="" src="pupila-asset:assets/images/balcoes.webp" width="1152" height="1536" alt="Balcões e cadeiras de atendimento da Ótica Pupila" loading="lazy" decoding="async">
<img class="" src="pupila-asset:assets/images/interior.webp" width="1152" height="1536" alt="Vista interna da Ótica Pupila em direção à entrada" loading="lazy" decoding="async">
<img class="" src="pupila-asset:assets/images/ambiente.webp" width="1152" height="1536" alt="Expositor de óculos e equipamento de medição na Ótica Pupila" loading="lazy" decoding="async">
</div>
</section>` },

"contato/index.html": { title: "Contato e localização | Ótica Pupila em Joinville", content: `<nav class="breadcrumb wrap" aria-label="Caminho da página">
<a href="#/index.html" class="" >Início</a>
<span aria-hidden="true">/</span>
<span>Contato</span>
</nav>
<section class="page-intro wrap">
<p class="eyebrow">ESTAMOS POR PERTO</p>
<h1>Vamos conversar?</h1>
<p class="lede">Visite nossa loja ou entre em contato. Será um prazer receber você.</p>
</section>
<section class="wrap contact-layout">
<div>
<div class="contact-item" id="localizacao">
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
</svg>
<div>
<h2>Nosso endereço</h2>
<p>Rua Abdon Batista, 59<br>Centro · Joinville/SC</p>
</div>
</div>
<div class="contact-item">
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM12 7v5l4 2"/>
</svg>
<div>
<h2>Horários</h2>
<dl class="hours">
<div>
<dt>Segunda a sexta</dt>
<dd>08h30 às 18h</dd>
</div>
<div>
<dt>Sábado</dt>
<dd>08h30 às 12h30</dd>
</div>
<div>
<dt>Domingo</dt>
<dd>Fechado</dd>
</div>
</dl>
</div>
</div>
<div class="contact-item" id="atendimento">
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z"/>
</svg>
<div>
<h2>Fale com a Pupila</h2>
<a href="tel:${company.phone}" class="contact-phone">${company.phoneDisplay}</a>
<p class="small">Use esse número para ligar ou conversar pelo WhatsApp.</p>
<button type="button" class="button primary" data-copy-whatsapp="+${company.whatsapp}" hidden>${whatsappIcon} Copiar número do WhatsApp</button>
<p class="copy-status" role="status"></p>
</div>
</div>
</div>
<div>
<figure class="contact-photo">
<img class="" src="pupila-asset:assets/images/fachada.webp" width="1152" height="1536" alt="Fachada e entrada da Ótica Pupila, na Rua Abdon Batista, 59" loading="eager" decoding="async" fetchpriority="high">
</figure>
<div class="map-card">
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
</svg>
<div>
<h3>Seu caminho até a Pupila.</h3>
<p>Procure a fachada azul e vermelha na Rua Abdon Batista, 59, no Centro de Joinville.</p>
</div>
</div>
</div>
</section>` },

"perguntas-frequentes/index.html": { title: "Perguntas frequentes | Ótica Pupila", content: `<nav class="breadcrumb wrap" aria-label="Caminho da página">
<a href="#/index.html" class="" >Início</a>
<span aria-hidden="true">/</span>
<span>Perguntas frequentes</span>
</nav>
<section class="page-intro wrap">
<p class="eyebrow">CLAREZA PARA ESCOLHER</p>
<h1>Perguntas frequentes.</h1>
<p class="lede">Orientações simples sobre óculos, lentes e atendimento.</p>
</section>
<section class="wrap faq-full">
<div class="faq-list">
<details>
<summary>Como limpar as lentes dos meus óculos?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Enxágue para retirar partículas, use um produto indicado para suas lentes ou uma pequena quantidade de detergente neutro, enxágue e seque com uma microfibra limpa. Evite água quente e siga as orientações do fabricante.</p>
</div>
</details>
<details>
<summary>Posso limpar os óculos na roupa?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Evite. O tecido e a poeira podem riscar as lentes. Prefira uma microfibra própria e limpa, retirando a sujeira antes de esfregar.</p>
</div>
</details>
<details>
<summary>Lentes escuras garantem proteção UV?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>A cor, sozinha, não comprova proteção. Ao escolher os óculos solares, verifique a indicação de proteção UVA e UVB do fabricante, como 100% UV ou UV400.</p>
</div>
</details>
<details>
<summary>Como guardar meus óculos?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Use um estojo adequado e evite apoiar as lentes diretamente nas superfícies. Não deixe os óculos expostos ao calor intenso, como no painel de um carro.</p>
</div>
</details>
<details>
<summary>Como escolher lentes e armações?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Leve sua prescrição e conte à equipe como usa os óculos no dia a dia. A escolha deve considerar as orientações do profissional que acompanha sua visão, o ajuste e o conforto da armação.</p>
</div>
</details>
<details>
<summary>O site substitui uma avaliação da visão?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Não. As informações aqui são educativas e não oferecem diagnóstico. Dúvidas ou alterações na visão precisam ser avaliadas por um profissional habilitado.</p>
</div>
</details>
<details>
<summary>Posso comprar pelo site?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Este site é uma vitrine da Ótica Pupila. Para conhecer os modelos e receber atendimento, entre em contato ou visite nossa loja em Joinville.</p>
</div>
</details>
<details>
<summary>Onde fica a loja e quais são os horários?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Estamos na Rua Abdon Batista, 59, Centro, Joinville/SC. Atendemos de segunda a sexta, das 08h30 às 18h; aos sábados, das 08h30 às 12h30. Aos domingos, a loja está fechada.</p>
</div>
</details>
</div>
<p class="small">Conteúdo educativo. Não substitui avaliação individual por profissional habilitado.</p>
</section>` },

"privacidade/index.html": { title: "Política de privacidade | Ótica Pupila", content: `<nav class="breadcrumb wrap" aria-label="Caminho da página">
<a href="#/index.html" class="" >Início</a>
<span aria-hidden="true">/</span>
<span>Privacidade</span>
</nav>
<section class="page-intro wrap">
<p class="eyebrow">TRANSPARÊNCIA</p>
<h1>Política de privacidade.</h1>
<p class="lede">Informações sobre o funcionamento desta versão do site.</p>
</section>
<article class="wrap prose"><p>Esta prévia aguarda os dados oficiais da empresa e da hospedagem para concluir a política de privacidade.</p></article>` },

"404.html": { title: "Página não encontrada | Ótica Pupila", content: `<section class="page-intro wrap">
<p class="eyebrow">404</p>
<h1>Vamos encontrar o caminho.</h1>
<p class="lede">A página que você procura não está disponível.</p>
</section>
<div class="wrap section-tight">
<a href="#/index.html" class="button primary" >Voltar ao início <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M4 12h16M13 5l7 7-7 7"/>
</svg>
</a>
</div>` },

};
  const paths = {
    arrow: 'M4 12h16M13 5l7 7-7 7',
    diagonal: 'M6 18 18 6M6 6h12v12',
    chevron: 'm8 10 4 4 4-4',
    menu: 'M4 7h16M4 12h16M4 17h16',
    glasses: 'M2 13a4 4 0 1 0 8 0 4 4 0 0 0-8 0ZM14 13a4 4 0 1 0 8 0 4 4 0 0 0-8 0ZM10 12c1-1 3-1 4 0M2 12l2-7h3M22 12l-2-7h-3',
    sun: 'M7 12a5 5 0 1 0 10 0 5 5 0 0 0-10 0ZM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5',
    watch: 'M7 7 8 1h8l1 6M7 17l1 6h8l1-6M5 12a7 7 0 1 0 14 0 7 7 0 0 0-14 0ZM12 8v4l3 2',
    gem: 'M3 7l4-5h10l4 5-9 15L3 7ZM3 7h18M7 2l5 20 5-20',
    lens: 'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM8 6c-3 3-3 9 0 12M12 3c7 4 7 14 0 18'
  };
  const icon = name => `<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="${paths[name] || paths.arrow}"/>
</svg>`;
  const lensPaths = {
    lentes: 'lentes/',
    'lentes/hoya': 'lentes/hoya/',
    'lentes/zeiss': 'lentes/zeiss/',
    'lentes/essilor': 'lentes/essilor/',
    'lentes/contato': 'lentes/contato/'
  };
  const link = (route, label, classes = '') => `<a class="${classes}" href="${lensPaths[route] || `#/${route}/index.html`}">${label}</a>`;
  const chat = (label, classes = 'button primary') => `<a class="${classes}" href="#/contato/index.html#atendimento">${label}${icon('arrow')}</a>`;
  const crumb = (label, parent) => `<nav class="breadcrumb wrap" aria-label="Caminho da página">
<a href="#/index.html">Início</a>
<span aria-hidden="true">/</span>${parent ? `
${link(parent[0], parent[1])}<span aria-hidden="true">/</span>` : ''}
<span aria-current="page">${label}</span>
</nav>`;
  const categories = [
    ['oculos-de-grau', 'Óculos de grau', 'Conforto para ver. Liberdade para ser.', 'glasses'],
    ['oculos-de-sol', 'Óculos de sol', 'Seu estilo sob uma nova luz.', 'sun'],
    ['relogios', 'Relógios', 'O seu tempo merece um detalhe a mais.', 'watch'],
    ['semijoias', 'Semijoias', 'Pequenos detalhes. Grandes significados.', 'gem'],
    ['lentes', 'Lentes para óculos', 'Tecnologia e cuidado para cada olhar.', 'lens']
  ];
  const catalogFaqs = {
    'oculos-de-grau': [
      ['O que devo levar para escolher meus óculos de grau?', 'Traga sua receita médica e, se já usa óculos, leve o par atual. Conte à equipe em quais atividades você mais usa as lentes.'],
      ['Qualquer armação funciona com a minha receita?', 'A combinação depende da prescrição, do tamanho e do formato da armação. A equipe pode conferir as opções de lente e montagem com você.'],
      ['Posso experimentar as armações na loja?', 'Sim. Consulte a disponibilidade antes da visita e experimente as armações para comparar o peso e o ajuste.']
    ],
    'oculos-de-sol': [
      ['Como conferir a proteção UV dos óculos de sol?', 'Confira na descrição do fabricante a indicação de proteção UVA e UVB, como UV400 ou 100% UV. A cor da lente, por si só, não comprova proteção.'],
      ['Lente polarizada e proteção UV são a mesma coisa?', 'A polarização reduz o brilho refletido em superfícies como água e asfalto. A proteção UV é uma característica separada que deve ser conferida na lente escolhida.'],
      ['Posso fazer um óculos de sol com grau?', 'Depende da prescrição e da armação. Traga sua receita para a equipe conferir quais modelos e opções de lentes podem ser combinados.']
    ],
    relogios: [
      ['Como saber se um relógio pode molhar?', 'A resistência à água depende do modelo. Confira a indicação do fabricante e as orientações de uso antes de molhar o relógio.'],
      ['Posso experimentar o relógio antes de escolher?', 'Consulte os modelos na loja e experimente para comparar o tamanho da caixa e o ajuste da pulseira no pulso.'],
      ['Como consultar modelos e preços de relógios?', 'Fale com a Pupila ou visite a loja. A equipe pode informar quais modelos estão disponíveis e os valores de cada peça.']
    ],
    semijoias: [
      ['Como consultar o material e o acabamento de uma peça?', 'Pergunte à equipe sobre a composição e o acabamento da peça escolhida. As características variam conforme o modelo.'],
      ['Como guardar minhas semijoias?', 'Guarde as peças secas e separadas para evitar atrito. Siga as orientações de cuidado indicadas para cada acabamento.'],
      ['Como saber quais semijoias estão disponíveis?', 'Consulte a equipe da Pupila ou visite a loja para conhecer as peças, tamanhos e acabamentos disponíveis.']
    ]
  };

  function carousel({ id, heading, kicker, description, slides, previous, next }) {
    return `<section class="section product-carousel${id === 'produto-perguntas' ? ' faq-section' : ''}" id="${id}" data-carousel aria-labelledby="${id}-title">
<div class="wrap carousel-layout">
<div><p class="eyebrow">${kicker}</p><h2 id="${id}-title">${heading}</h2>${description ? `<p class="carousel-description">${description}</p>` : ''}</div>
<div>
<div class="carousel-slides" id="${id}-slides">${slides.map(slide => `<div class="carousel-slide">${slide}</div>`).join('')}</div>
<div class="carousel-controls" hidden>
<button class="carousel-control" type="button" data-carousel-step="-1" aria-controls="${id}-slides" aria-label="${previous}">${icon('arrow')}</button>
<span class="carousel-position" data-carousel-position aria-hidden="true"></span>
<button class="carousel-control" type="button" data-carousel-step="1" aria-controls="${id}-slides" aria-label="${next}">${icon('arrow')}</button>
</div>
</div>
</div>
</section>`;
  }

  const productReviews = carousel({
    id: 'produto-avaliacoes', heading: 'Avaliações da nossa loja.', kicker: 'EXPERIÊNCIAS DE CLIENTES',
    description: 'O que os clientes contam sobre o atendimento na Pupila.',
    slides: reviewQuotes.map(testimonial), previous: 'Avaliação anterior', next: 'Próxima avaliação'
  });
  const productHelp = questions => productReviews + carousel({
    id: 'produto-perguntas', heading: 'Perguntas frequentes.', kicker: 'BOM SABER',
    slides: questions.map(([question, answer]) => `<article class="carousel-question"><h3>${question}</h3><p>${answer}</p></article>`),
    previous: 'Pergunta anterior', next: 'Próxima pergunta'
  });

  const header = `
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
    <aside class="topline" aria-label="Informações da loja">
<div class="wrap">
<span>Há mais de 30 anos, olhando por você.</span>
<a href="#/contato/index.html">Centro de Joinville, SC ${icon('diagonal')}</a>
</div>
</aside>
    <header class="site-header">
<div class="header-main wrap">
      <a href="#/index.html" class="brand" aria-label="Ótica Pupila — início">
<img src="assets/image-01.webp" width="650" height="318" alt="Ótica Pupila" class="brand-logo" decoding="async">
</a>
      <nav id="main-nav" class="main-nav" aria-label="Navegação principal">
        <a href="#/index.html" class="nav-link">Início</a>
        <details class="nav-group">
<summary>Óculos ${icon('chevron')}</summary>
<div class="submenu">${link('oculos-de-grau', 'Óculos de grau')}${link('oculos-de-sol', 'Óculos de sol')}</div>
</details>
        ${link('relogios', 'Relógios', 'nav-link')}${link('semijoias', 'Semijoias', 'nav-link')}
        <details class="nav-group nav-lenses">
<summary>Lentes ${icon('chevron')}</summary>
<div class="submenu">${link('lentes', 'Lentes para óculos')}${link('lentes/contato', 'Lentes de contato')}</div>
</details>
        <details class="nav-group nav-about">
<summary>A Pupila ${icon('chevron')}</summary>
<div class="submenu">${link('nossa-historia', 'Nossa história')}${link('perguntas-frequentes', 'Perguntas frequentes')}</div>
</details>
        ${link('contato', 'Visite a loja', 'nav-link mobile-visit')}
      </nav>
      <div class="header-actions">${link('contato', `Visite a loja ${icon('diagonal')}`, 'button outline header-visit')}<button type="button" class="menu-toggle" aria-controls="main-nav" aria-expanded="false">${icon('menu')}<span>Menu</span>
</button>
</div>
    </div>
</header>`;
  const footer = `
    <section class="visit-cta" aria-label="Planeje sua visita">
<div class="wrap">
<div>
<p class="eyebrow">VAMOS ENCONTRAR O SEU PRÓXIMO OLHAR?</p>
<h2>Experimente. Sinta. <span class="brand-accent">Escolha.</span>
</h2>
<p>De perto, cada detalhe faz a diferença. Venha para a Pupila.</p>
</div>${link('contato', `Esperamos você ${icon('diagonal')}`, 'button white')}</div>
</section>
    <footer class="site-footer">
<div class="wrap footer-grid">
      <div>
<a href="#/index.html" class="footer-brand">
<img src="assets/logo-pupila-branco.webp" width="1767" height="842" alt="Ótica Pupila" loading="lazy" decoding="async">
</a>
<p>Um novo olhar.<br>A mesma confiança, desde 1992.</p>
<span class="footer-city">JOINVILLE · SANTA CATARINA</span>
</div>
      <div>
<h2>Encontre seu estilo</h2>${categories.map(c => link(c[0], c[1])).join('')}</div>
      <div>
<h2>Conheça a Pupila</h2>${link('nossa-historia', 'Nossa história')}${link('perguntas-frequentes', 'Perguntas frequentes')}${link('contato', 'Contato')}</div>
      <div>
<h2>Vamos nos encontrar</h2>
<p>Rua Abdon Batista, 59<br>Centro · Joinville/SC</p>
<a href="tel:+554734223223">(47) 3422-3223</a>
<a class="text-link" href="#/contato/index.html#localizacao">Como chegar ${icon('arrow')}</a>
</div>
    </div>
<div class="wrap footer-bottom">
<span>Ótica Pupila · Desde 1992</span>${link('privacidade', 'Política de privacidade')}<a href="#/index.html">Feito para olhar de perto. ↑</a>
</div>
    <a class="floating-contact" href="#/contato/index.html#atendimento">${whatsappIcon}<span>Fale com a Pupila</span>
</a>
</footer>`;

  const productBrands = `<div class="product-brands"><span class="rayban-name">Ray-Ban</span><img class="meta-brand-logo" src="assets/logo-meta-small.webp" width="336" height="68" alt="Meta" loading="lazy" decoding="async"></div>`;
  const productName = 'RAY-BAN META WAYFARER GEN 3';
  const home = `
    <section class="hero wrap" aria-labelledby="hero-title">
      <div class="hero-copy">
<p class="eyebrow">ÓTICA PUPILA · DESDE 1992</p>
<h1 id="hero-title">Um novo olhar.<br>A mesma<br>
<em>confiança.</em>
</h1>
<p class="hero-description">O estilo é seu. O cuidado é nosso.<br>Óculos, relógios e semijoias para acompanhar<br class="desktop-break"> quem você é, em cada momento.</p>
<div class="hero-buttons">
<a href="#/index.html#categorias" class="button primary">Encontre seu estilo ${whatsappIcon}</a>${chat('Converse com a gente', 'button accent')}</div>
<div class="hero-signature">
<span class="signature-line">
</span>
<span>Escolha com calma.<br>A gente cuida dos detalhes.</span>
</div>
</div>
      <figure class="hero-photo">
<img src="assets/image-04.webp" width="1152" height="1536" alt="Expositor de óculos e espaço de atendimento da Ótica Pupila" fetchpriority="high" decoding="async">
<figcaption>
<div>
<span>EM JOINVILLE, DESDE 1992.</span>
<strong>Bem-vindo à Pupila.</strong>
</div>
<a href="#/contato/index.html" class="round-link" aria-label="Conheça a loja">${icon('diagonal')}</a>
</figcaption>
</figure>
      <div class="hero-footnote">
<span>OLHAR COM CUIDADO. ESCOLHER COM CONFIANÇA.</span>
<a href="#/index.html#categorias">Explore a Pupila <span aria-hidden="true">↓</span>
</a>
</div>
    </section>
    <section class="section wrap categories-section" id="categorias" aria-labelledby="categories-title">
<div class="section-heading">
<div>
<p class="eyebrow">DO SEU JEITO, EM CADA DETALHE</p>
<h2 id="categories-title">Para ver e se reconhecer.
</h2>
</div>
<p>Escolhas que fazem parte<br>de quem você é.</p>
</div>
<div class="categories-grid">${categories.map((c, i) => `<a href="${lensPaths[c[0]] || `#/${c[0]}/index.html`}" class="category-card">
<div class="category-top">
<span class="category-index">0${i + 1}</span>${icon(c[3])}</div>
<h3>${c[1]}</h3>
<p>${c[2]}</p>
<span class="category-arrow" aria-hidden="true">${icon('diagonal')}</span>
</a>`).join('')}</div>
</section>
    <section class="home-select-section" aria-labelledby="home-select-title">
<div class="wrap section lens-select-feature">
<div><p class="eyebrow">UM RECONHECIMENTO DA ESSILORLUXOTTICA</p><h2 id="home-select-title">Essilor Varilux<br><em>Especialista Select 2026.</em></h2><p>A Ótica Pupila de Joinville recebeu a certificação Essilor Varilux Especialista Select 2026. Conheça as lentes e tecnologias Essilor com que trabalhamos.</p><a class="text-link" href="lentes/essilor/">Conheça as lentes Essilor ${icon('diagonal')}</a></div>
<figure><img src="assets/lenses/essilor-select-2026-1600.webp" width="1600" height="1078" alt="Certificado Essilor Varilux Especialista Select 2026 da Ótica Pupila de Joinville" loading="lazy" decoding="async"><figcaption>Certificado EssilorLuxottica · 2026</figcaption></figure>
</div>
</section>
    <section class="meta-feature" aria-labelledby="meta-feature-title">
<div class="wrap">
<div class="feature-topline">
<p class="eyebrow">UM CLÁSSICO. OUTRA PERSPECTIVA.</p>
<span>SELEÇÃO PUPILA / 01</span>
</div>
<div class="meta-feature-grid">
<div class="meta-feature-copy">
${productBrands}
<h2 id="meta-feature-title">Um clássico.<br>Uma nova <span class="brand-accent">perspectiva.</span>
</h2>
<p class="product-name">${productName}</p>
<p>Registre fotos e vídeos sem usar as mãos, ouça músicas e faça chamadas com áudio aberto. O estilo icônico do Wayfarer encontra a tecnologia. Consulte os recursos de IA disponíveis para seu país e idioma.</p>
<a class="button white" href="#/ray-ban-meta/index.html">Conheça o modelo ${icon('diagonal')}</a>
</div>
<figure class="meta-feature-art">
<img src="assets/0RW4011__601SSB__P21__shad__qt.webp" width="720" height="386" alt="RAY-BAN META WAYFARER GEN 3 preto fosco visto em três quartos" loading="lazy" decoding="async">
<figcaption>
<span>${productName}</span>
<span>RW4011 601SSB ${icon('diagonal')}</span>
</figcaption>
</figure>
</div>
</div>
</section>
    ${story}
    <section class="care-section">
<div class="wrap care-layout">
<div>
<p class="eyebrow">LENTES & CUIDADO</p>
<h2>Seu olhar é único.<br>O cuidado também.
</h2>
</div>
<div>
<p>Sua prescrição, sua rotina e o que importa para você. É assim que começa a conversa para encontrar suas lentes.</p>${link('lentes', `Conheça nossas orientações ${icon('diagonal')}`, 'text-link')}</div>
</div>
<div class="wrap care-steps">
<div>
<span>01</span>
<h3>Ouvir você.</h3>
<p>Entender sua rotina e o que você procura.</p>
</div>
<div>
<span>02</span>
<h3>Olhar os detalhes.</h3>
<p>Conversar sobre lentes, armações e ajuste.</p>
</div>
<div>
<span>03</span>
<h3>Escolher com calma.</h3>
<p>Experimentar e encontrar o que faz sentido.</p>
</div>
</div>
</section>
    ${reviews}${faq}${location}`;

  const metaViews = [
    { image: 'assets/0RW4011__601SSB__P21__shad__qt.webp', label: 'Três quartos', alt: 'RAY-BAN META WAYFARER GEN 3: vista de três quartos com haste direita' },
    { image: 'assets/0RW4011__601SSB__P21__shad__fr.webp', label: 'Frente', alt: 'RAY-BAN META WAYFARER GEN 3: vista frontal da armação preta' },
    { image: 'assets/0RW4011__601SSB__P21__shad__al2.webp', label: 'Outro lado', alt: 'RAY-BAN META WAYFARER GEN 3: vista de três quartos com haste esquerda' },
    { image: 'assets/0RW4011__601SSB__P21__shad__lt.webp', label: 'Lateral', alt: 'RAY-BAN META WAYFARER GEN 3: vista lateral da haste' },
    { image: 'assets/0RW4011__601SSB__P21__shad__bk.webp', label: 'Traseira', alt: 'RAY-BAN META WAYFARER GEN 3: vista posterior da armação' },
    { image: 'assets/0RW4011__601SSB__P21__shad__cfr.webp', label: 'Interior', alt: 'RAY-BAN META WAYFARER GEN 3: vista frontal pelo interior da armação' }
  ];
  const catalogAngles = {
    frente: ['Frente', 'vista frontal'],
    lateral: ['Lateral', 'vista lateral'],
    detalhe: ['Detalhe', 'detalhe da armação'],
    perspectiva: ['Perspectiva', 'vista em perspectiva'],
    'com-clip': ['Com clip', 'com clip solar'],
    'clip-levantado': ['Clip levantado', 'com clip solar levantado'],
    'clip-oliva': ['Clip oliva', 'com clip solar oliva']
  };
  const catalogProducts = window.PUPILA_CATALOG_MODELS.map(({ category, brand, slug, description, facts, story, catalogUrl, identificationPending, audience, angles = ['frente', 'lateral', 'detalhe'] }) => {
    const brandKey = brand.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
    const views = angles.map(angle => {
      const [label, detail] = catalogAngles[angle];
      return {
        image: `assets/catalogo/${brandKey}/${category}/${slug}-${angle}.webp`,
        label,
        alt: `${brand}, ${detail}`
      };
    });
    return {
      slug, route: `${category}/${slug}`, description, brand,
      facts, story, identificationPending, catalogUrl,
      categories: [category], audiences: audience ? [audience] : ['feminino', 'masculino'],
      label: category === 'oculos-de-grau' ? 'ARMAÇÃO DE GRAU' : 'ÓCULOS DE SOL',
      image: views[0].image, imageAlt: views[0].alt, views, width: 960, height: 640
    };
  });
  const products = [{
    slug: 'ray-ban-meta',
    route: 'ray-ban-meta',
    brand: 'Ray-Ban',
    categories: ['oculos-de-grau'],
    audiences: ['feminino', 'masculino'],
    label: 'ÓCULOS INTELIGENTES',
    image: metaViews[0].image,
    imageAlt: metaViews[0].alt,
    views: metaViews,
    width: 720,
    height: 386,
    eyebrow: 'O CLÁSSICO, EM UMA NOVA PERSPECTIVA',
    description: 'O design icônico do Wayfarer com tecnologia para acompanhar sua rotina. Capture fotos com a câmera de 12 MP e grave vídeos em 3K sem usar as mãos. Ouça músicas e podcasts, faça chamadas com áudio aberto e consulte os recursos de IA para seu país e idioma.',
    facts: [
      ['Modelo', 'RW4011 601SSB'],
      ['Armação', 'Preto fosco'],
      ['Câmera e vídeo', '12 MP · gravação em 3K Ultra HD'],
      ['Áudio', 'Alto-falantes abertos e seis microfones'],
      ['Autonomia', 'Até 9 horas de uso por carga']
    ],
    support: 'Recursos de IA variam conforme país, idioma e atualizações. A autonomia varia com o uso.',
    faq: [
      ['Posso fazer lentes de grau para esta armação Ray-Ban?', 'Traga sua receita médica para a equipe conferir a compatibilidade e as opções de montagem.'],
      ['Quais recursos posso usar na armação inteligente?', 'O modelo permite registrar fotos e vídeos e usar o áudio aberto para chamadas e músicas. Os recursos de IA variam conforme o país, o idioma e as atualizações.'],
      ['Posso conhecer a armação de perto?', 'Consulte a disponibilidade com a Pupila antes de visitar a loja.']
    ]
  }, ...catalogProducts];
  window.PUPILA_META_VIEWS = metaViews;
  window.PUPILA_DATA.products = products;

  function productCard(product) {
    return `<a class="catalog-card" data-catalog-card data-audience="${product.audiences.join(' ')}" data-brand="${product.brand}" href="#/${product.route}/index.html">
<figure><img src="${product.image}" width="${product.width}" height="${product.height}" alt="${product.imageAlt}" loading="lazy" decoding="async"></figure>
<div class="catalog-card-copy"><h3>${product.brand}</h3><span class="text-link">Ver detalhes ${icon('diagonal')}</span></div>
</a>`;
  }

  function eyewearCatalog(category, availableProducts) {
    const [route, name, description] = category;
    const brands = [...new Set(availableProducts.map(product => product.brand))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    return `${crumb(name)}<section class="page-intro eyewear-intro wrap">
<div>
<p class="eyebrow">NOSSA SELEÇÃO</p>
<h1>${name}, do seu jeito.</h1>
<p class="lede">${description} Conheça os modelos em destaque e consulte a disponibilidade com a equipe.</p>
</div>
<div class="eyewear-photo-space" aria-hidden="true"></div>
</section>
<section class="wrap catalog-section catalog-listing" data-catalog data-category="${route}" aria-labelledby="catalog-title">
<div class="catalog-heading"><div><p class="eyebrow">MODELOS EM DESTAQUE</p><h2 id="catalog-title">Escolha pelo seu olhar.</h2></div><p>Consulte modelos, cores e disponibilidade com a equipe da loja.</p></div>
<div class="catalog-toolbar">
<div class="catalog-audience" role="group" aria-label="Filtrar por público"><button type="button" class="catalog-filter" data-catalog-filter="todos" aria-pressed="true">Todos</button><button type="button" class="catalog-filter" data-catalog-filter="feminino" aria-pressed="false">Feminino</button><button type="button" class="catalog-filter" data-catalog-filter="masculino" aria-pressed="false">Masculino</button></div>
<div class="catalog-brand-filter"><span id="catalog-brand-label">Marca</span><details data-catalog-brand>
<summary aria-labelledby="catalog-brand-label catalog-brand-value"><span id="catalog-brand-value">Todas as marcas</span></summary>
<div class="catalog-brand-options" role="group" aria-label="Filtrar por marca">
<button type="button" data-catalog-brand-option="todas" aria-pressed="true">Todas as marcas</button>
${brands.map(brand => `<button type="button" data-catalog-brand-option="${brand}" aria-pressed="false">${brand}</button>`).join('')}
</div></details></div>
</div>
<p class="catalog-result" data-catalog-result aria-live="polite">${availableProducts.length} modelos em destaque</p>
<div class="catalog-grid" data-catalog-grid>${availableProducts.map(productCard).join('')}</div>
<p class="catalog-empty" data-catalog-empty hidden>Nenhum modelo corresponde a estes filtros. Experimente outra combinação ou fale com a Pupila.</p>
<div class="button-row catalog-contact">${chat('Consultar a seleção')}${link('contato', 'Planeje sua visita', 'text-link')}</div>
</section>`;
  }

  function catalog(category) {
    const [route, name, description, symbol] = category;
    const availableProducts = products.filter(product => product.categories.includes(route));
    if ((route === 'oculos-de-grau' || route === 'oculos-de-sol') && availableProducts.length >= 2) return eyewearCatalog(category, availableProducts);
    const accessories = route === 'relogios' || route === 'semijoias';
    return `${crumb(name)}<section class="page-intro wrap">
<p class="eyebrow">NOSSA SELEÇÃO</p>
<h1>${name}, do seu jeito.
</h1>
<p class="lede">${description} Conheça de perto as opções da Pupila, com atenção aos detalhes e orientação em cada escolha.</p>
</section>
<section class="wrap catalog-section">
<div class="catalog-editorial">
<figure>
<img src="assets/${accessories ? 'image-05' : 'image-04'}.webp" width="1152" height="1536" alt="${accessories ? 'Balcão com expositores de relógios e semijoias da Pupila' : 'Expositor de óculos da Ótica Pupila'}" decoding="async">
</figure>
<div>
<span class="catalog-symbol">${icon(symbol)}</span>
<p class="eyebrow">A MELHOR ESCOLHA COMEÇA DE PERTO</p>
<h2>Seu próximo detalhe<br>está na Pupila.
</h2>
<p>Modelos, cores e disponibilidade mudam. Nossa equipe apresenta as opções atuais e ajuda você a encontrar o que combina com o seu estilo.</p>
<p class="catalog-note">Estamos preparando o catálogo online. Enquanto isso, conheça a seleção na loja ou peça mais informações pelo WhatsApp.</p>
<div class="button-row">${chat('Consultar a seleção')}${link('contato', 'Planeje sua visita', 'text-link')}</div>
</div>
</div>
${availableProducts.length ? `<div class="catalog-grid">${availableProducts.map(productCard).join('')}</div>` : ''}
</section>`;
  }
  function productPage(product) {
    const catalogCategory = categories.find(([route]) => route === product.categories[0]);
    const facts = `<dl class="product-facts">${product.facts.map(([term, detail]) => `<div><dt>${term}</dt><dd>${detail}</dd></div>`).join('')}</dl>`;
    const questions = product.faq || [
      [`Posso experimentar a armação ${product.brand} das fotos?`, 'Consulte a disponibilidade da peça com a Pupila antes de visitar a loja.'],
      ...catalogFaqs[catalogCategory[0]].slice(0, 2)
    ];
    return `${crumb(product.brand, catalogCategory)}
    <section class="product-page wrap" aria-labelledby="product-title">
<div class="product-gallery" role="group" data-product-gallery="${product.slug}" aria-label="Galeria de imagens — ${product.brand}">
<div class="product-gallery-main">
<span class="gallery-label">SELEÇÃO PUPILA</span>
<img id="product-main-image" src="${product.image}" width="${product.width}" height="${product.height}" alt="${product.imageAlt}" fetchpriority="high" decoding="async">
<span class="meta-gallery-count" aria-live="polite">01 / ${String(product.views.length).padStart(2, '0')}</span>
</div>
<div class="product-gallery-controls" role="group" aria-label="Escolha um ângulo">${product.views.map((view, i) => `<button type="button" class="product-view" data-product-view="${i}" data-view-alt="${view.alt}" aria-pressed="${i === 0}" aria-label="Ver ângulo ${i + 1}: ${view.label}">
<img src="${view.image}" width="${product.width}" height="${product.height}" alt="" loading="lazy" decoding="async">
<span>${view.label}</span>
</button>`).join('')}</div>
<p class="product-gallery-help">Explore os ângulos. Você também pode usar ← e → nos botões.</p>
</div>
    <div class="product-page-heading">
<p class="eyebrow">${product.eyebrow || product.label}</p>
<h1 id="product-title">${product.brand}</h1>
<p>${product.description}</p>
${chat('Quero conhecer de perto')}<p class="availability-note">Tamanho, preço e disponibilidade sob consulta à loja.</p>
${link(catalogCategory[0], `Voltar para ${catalogCategory[1].toLowerCase()}`, 'text-link')}
<section class="product-details" aria-labelledby="product-details-title">
<h2 id="product-details-title">Ficha do modelo</h2>
${product.identificationPending ? `<p class="product-identification-note">${product.catalogUrl ? 'Referência sugerida por comparação visual. Confirme a peça com a loja.' : 'Confirme o nome comercial e a referência desta peça com a loja.'}</p>` : ''}
${facts}
${product.support ? `<p class="product-support-note">${product.support}</p>` : ''}
${product.story ? `<h3>O desenho da linha</h3><p>${product.story}</p>` : ''}
</section></div>
</section>${productHelp(questions)}`;
  }
  const pages = {
    ...existing,
    'index.html': { title: 'Ótica Pupila | Ótica em Joinville desde 1992', content: home }
  };
  products.forEach(product => {
    pages[`${product.route}/index.html`] = {
      title: `${product.brand} | Ótica Pupila`,
      description: `${product.description} Ótica Pupila, Joinville.`,
      content: productPage(product)
    };
  });
  categories.filter(c => c[0] !== 'lentes').forEach(c => {
    pages[`${c[0]}/index.html`] = { title: `${c[1]} | Ótica Pupila`, content: catalog(c) + productHelp(catalogFaqs[c[0]]) };
  });
  window.PUPILA_CHROME = { header, footer, chat, productHelp };
  window.PUPILA_PAGES = Object.fromEntries(Object.entries(pages).map(([route, page]) => [route, {
    title: page.title,
    description: page.description,
    html: `${header}<main id="conteudo" tabindex="-1">${page.content}</main>${footer}`
  }]));
})();
