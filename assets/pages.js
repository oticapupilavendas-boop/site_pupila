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
    "maps": "https://www.google.com/maps/search/?api=1&query=%C3%93tica%20Pupila%20Rua%20Abdon%20Batista%2059%20Joinville%20SC",
    "googleProfile": "https://maps.app.goo.gl/fx92AvEfJ51patQ48",
    "siteUrl": "",
    "instagram": ""
  },
  "products": [],
  "brands": []
};

const story = `<section class="story-block wrap">
<figure class="story-photo reveal">
<img class="" src="pupila-asset:assets/images/fachada.webp" sizes="(max-width: 700px) 100vw, 50vw" width="1152" height="1536" alt="Fachada e entrada da Ótica Pupila, na Rua Abdon Batista, 59" loading="lazy" decoding="async">
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

const reviews = `<section class="section wrap reviews-section" id="avaliacoes" aria-labelledby="reviews-title">
<div class="section-heading">
<div>
<p class="eyebrow">QUEM CONHECE, RECOMENDA</p>
<h2 id="reviews-title">O cuidado, nas palavras<br>de quem já veio.</h2>
</div>
<a href="https://maps.app.goo.gl/fx92AvEfJ51patQ48" class="text-link" target="_blank" rel="noopener noreferrer">Ver avaliações no Google <span aria-hidden="true">↗</span>
</a>
</div>
<div class="testimonials-grid">
<figure class="testimonial">
<span class="testimonial-mark" aria-hidden="true">“</span>
<blockquote>
<p>Quero agradecer imensamente pelo atendimento maravilhoso na ótica. A equipe foi super atenciosa, esclareceu todas as minhas dúvidas e me ajudou a escolher a armação perfeita. Recomendo de olhos fechados, sem trocadilho!</p>
</blockquote>
<figcaption>Depoimento de cliente</figcaption>
</figure>
<figure class="testimonial">
<span class="testimonial-mark" aria-hidden="true">“</span>
<blockquote>
<p>Eu amo essa Ótica, saio de Curitiba pra fazer meus óculos nela, super bem atendida, atendimento nota mil, sem forçar compra, deixando super a vontade na escolha, só óculos top das galáxias e ainda o melhor preço! SUPER INDICO</p>
</blockquote>
<figcaption>Depoimento de cliente</figcaption>
</figure>
</div>
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
<a href="https://www.zeiss.com/vision-care/en/eye-health-and-care/health-prevention/how-should-i-take-care-of-my-prescription-spectacle-lenses.html" class="source-link" target="_blank" rel="noopener noreferrer">Referência técnica ↗</a>
</div>
</details>
<details>
<summary>Posso limpar os óculos na roupa?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Evite. O tecido e a poeira podem riscar as lentes. Prefira uma microfibra própria e limpa, retirando a sujeira antes de esfregar.</p>
<a href="https://www.zeiss.com/vision-care/en/eye-health-and-care/health-prevention/how-should-i-take-care-of-my-prescription-spectacle-lenses.html" class="source-link" target="_blank" rel="noopener noreferrer">Referência técnica ↗</a>
</div>
</details>
<details>
<summary>Lentes escuras garantem proteção UV?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>A cor, sozinha, não comprova proteção. Ao escolher os óculos solares, verifique a indicação de proteção UVA e UVB do fabricante, como 100% UV ou UV400.</p>
<a href="https://aao.org/eye-health/tips-prevention/sun" class="source-link" target="_blank" rel="noopener noreferrer">Referência técnica ↗</a>
</div>
</details>
<details>
<summary>Como guardar meus óculos?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Use um estojo adequado e evite apoiar as lentes diretamente nas superfícies. Não deixe os óculos expostos ao calor intenso, como no painel de um carro.</p>
<a href="https://www.zeiss.com/vision-care/en/eye-health-and-care/health-prevention/how-should-i-take-care-of-my-prescription-spectacle-lenses.html" class="source-link" target="_blank" rel="noopener noreferrer">Referência técnica ↗</a>
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
<dd>Até 12h30</dd>
</div>
<div>
<dt>Domingo</dt>
<dd>Fechado</dd>
</div>
</dl>
<div class="button-row">
<a href="https://www.google.com/maps/search/?api=1&amp;query=%C3%93tica%20Pupila%20Rua%20Abdon%20Batista%2059%20Joinville%20SC" class="button primary" target="_blank" rel="noopener noreferrer">Como chegar <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
<img class="" src="pupila-asset:assets/images/fachada-frontal.webp" sizes="(max-width: 700px) 100vw, 50vw" width="1536" height="1152" alt="Vista frontal da vitrine e da entrada da Ótica Pupila" loading="lazy" decoding="async">
</figure>
</section>`;

const existing = {

"lentes/index.html": { title: "Lentes oftálmicas em Joinville | Ótica Pupila", content: `<nav class="breadcrumb wrap" aria-label="Caminho da página">
<a href="#/index.html" class="" >Início</a>
<span aria-hidden="true">/</span>
<span>Lentes oftálmicas</span>
</nav>
<section class="page-intro wrap">
<p class="eyebrow">ORIENTAÇÃO & PRECISÃO</p>
<h1>Lentes para o seu olhar.</h1>
<p class="lede">A escolha começa com você: sua prescrição, suas atividades e suas necessidades visuais.</p>
</section>
<section class="wrap lens-editorial">
<figure>
<img class="" src="pupila-asset:assets/images/atendimento.webp" sizes="(max-width: 700px) 100vw, 50vw" width="1152" height="1536" alt="Balcão de atendimento com expositores de relógios e semijoias" loading="lazy" decoding="async">
</figure>
<div>
<h2>Atenção em cada escolha.</h2>
<p>Leve sua prescrição e converse com nossa equipe. Armação, medidas e rotina são parte dessa conversa.</p>
<div class="numbered-row">
<span>01</span>
<div>
<h3>Sua prescrição</h3>
<p>O ponto de partida para a orientação sobre suas lentes.</p>
</div>
</div>
<div class="numbered-row">
<span>02</span>
<div>
<h3>Seu dia a dia</h3>
<p>Conte como e onde você utiliza seus óculos.</p>
</div>
</div>
<div class="numbered-row">
<span>03</span>
<div>
<h3>Informação clara</h3>
<p>Conheça as especificações antes de escolher.</p>
</div>
</div>
</div>
</section>
<section class="wrap section">
<div class="care-note">
<p class="eyebrow">UMA ESCOLHA COM ORIENTAÇÃO</p>
<h2>Vamos encontrar suas lentes?</h2>
<p>Traga sua prescrição. Nossa equipe explica as opções disponíveis e ajuda você a escolher com clareza.</p>
<button type="button" class="button primary" data-whatsapp="Olá! Gostaria de orientação sobre lentes oftálmicas.">Conversar sobre lentes <span aria-hidden="true">↗</span>
</button>
</div>
</section>` },

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
<img class="" src="pupila-asset:assets/images/fachada.webp" sizes="(max-width: 700px) 100vw, 50vw" width="1152" height="1536" alt="Fachada e entrada da Ótica Pupila, na Rua Abdon Batista, 59" loading="lazy" decoding="async">
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
<img class="" src="pupila-asset:assets/images/balcoes.webp" sizes="(max-width: 700px) 100vw, 50vw" width="1152" height="1536" alt="Balcões e cadeiras de atendimento da Ótica Pupila" loading="lazy" decoding="async">
<img class="" src="pupila-asset:assets/images/interior.webp" sizes="(max-width: 700px) 100vw, 50vw" width="1152" height="1536" alt="Vista interna da Ótica Pupila em direção à entrada" loading="lazy" decoding="async">
<img class="" src="pupila-asset:assets/images/ambiente.webp" sizes="(max-width: 700px) 100vw, 50vw" width="1152" height="1536" alt="Expositor de óculos e equipamento de medição na Ótica Pupila" loading="lazy" decoding="async">
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
<div class="contact-item">
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
</svg>
<div>
<h2>Nosso endereço</h2>
<p>Rua Abdon Batista, 59<br>Centro · Joinville/SC</p>
<a href="https://www.google.com/maps/search/?api=1&amp;query=%C3%93tica%20Pupila%20Rua%20Abdon%20Batista%2059%20Joinville%20SC" class="text-link" target="_blank" rel="noopener noreferrer">Abrir no Google Maps <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M4 12h16M13 5l7 7-7 7"/>
</svg>
</a>
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
<dd>Até 12h30</dd>
</div>
<div>
<dt>Domingo</dt>
<dd>Fechado</dd>
</div>
</dl>
</div>
</div>
<div class="contact-item">
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z"/>
</svg>
<div>
<h2>Fale com a Pupila</h2>
<a href="tel:+554734223223" class="contact-phone" >(47) 3422-3223</a>
<div class="button-row">
<button type="button" class="button primary" data-whatsapp="Olá! Conheci a Ótica Pupila pelo site e gostaria de atendimento.">
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.4-4.5a9 9 0 1 1 16.6-5ZM8 11h8M8 7h5M8 15h5"/>
</svg>Falar pelo WhatsApp</button>
</div>
<p class="small">Atendimento pelo WhatsApp: (47) 3422-3223.</p>
</div>
</div>
</div>
<div>
<figure class="contact-photo">
<img class="" src="pupila-asset:assets/images/fachada.webp" sizes="(max-width: 700px) 100vw, 50vw" width="1152" height="1536" alt="Fachada e entrada da Ótica Pupila, na Rua Abdon Batista, 59" loading="eager" decoding="async" fetchpriority="high">
</figure>
<div class="map-card">
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
</svg>
<div>
<h3>Seu caminho até a Pupila.</h3>
<p>Veja a localização e trace sua rota no Google Maps.</p>
<a href="https://www.google.com/maps/search/?api=1&amp;query=%C3%93tica%20Pupila%20Rua%20Abdon%20Batista%2059%20Joinville%20SC" class="text-link" target="_blank" rel="noopener noreferrer">Ver mapa e rotas <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M4 12h16M13 5l7 7-7 7"/>
</svg>
</a>
<small>O mapa abre no Google somente quando você clicar.</small>
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
<a href="https://www.zeiss.com/vision-care/en/eye-health-and-care/health-prevention/how-should-i-take-care-of-my-prescription-spectacle-lenses.html" class="source-link" target="_blank" rel="noopener noreferrer">Referência técnica ↗</a>
</div>
</details>
<details>
<summary>Posso limpar os óculos na roupa?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Evite. O tecido e a poeira podem riscar as lentes. Prefira uma microfibra própria e limpa, retirando a sujeira antes de esfregar.</p>
<a href="https://www.zeiss.com/vision-care/en/eye-health-and-care/health-prevention/how-should-i-take-care-of-my-prescription-spectacle-lenses.html" class="source-link" target="_blank" rel="noopener noreferrer">Referência técnica ↗</a>
</div>
</details>
<details>
<summary>Lentes escuras garantem proteção UV?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>A cor, sozinha, não comprova proteção. Ao escolher os óculos solares, verifique a indicação de proteção UVA e UVB do fabricante, como 100% UV ou UV400.</p>
<a href="https://aao.org/eye-health/tips-prevention/sun" class="source-link" target="_blank" rel="noopener noreferrer">Referência técnica ↗</a>
</div>
</details>
<details>
<summary>Como guardar meus óculos?<span aria-hidden="true">+</span>
</summary>
<div class="faq-answer">
<p>Use um estojo adequado e evite apoiar as lentes diretamente nas superfícies. Não deixe os óculos expostos ao calor intenso, como no painel de um carro.</p>
<a href="https://www.zeiss.com/vision-care/en/eye-health-and-care/health-prevention/how-should-i-take-care-of-my-prescription-spectacle-lenses.html" class="source-link" target="_blank" rel="noopener noreferrer">Referência técnica ↗</a>
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
<p>Estamos na Rua Abdon Batista, 59, Centro, Joinville/SC. Atendemos de segunda a sexta, das 08h30 às 18h; aos sábados, até 12h30. Aos domingos, a loja está fechada.</p>
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
<article class="wrap prose">
<p>Atualizada em 27 de outubro de 2026.</p>
<h2>O que este site faz</h2>
<p>O site apresenta informações da Ótica Pupila e sua vitrine. Não há contas de usuários, compras, pagamentos ou formulários para coletar dados pessoais.</p>
<h2>Cookies e armazenamento</h2>
<p>O código desta versão não utiliza cookies, análise de audiência, pixels de publicidade, armazenamento local ou tecnologias para acompanhar visitantes. Os filtros funcionam apenas durante a navegação. O provedor de hospedagem poderá registrar dados técnicos, como endereço IP, data e página acessada, conforme suas políticas; o provedor e suas condições serão informados antes da publicação.</p>
<h2>Links para outros serviços</h2>
<p>Ao clicar em um link para Google Maps, perfil do Google ou WhatsApp, você acessa um serviço externo, sujeito às políticas desse serviço. Nenhum mapa, avaliação ou rastreador externo é carregado automaticamente.</p>
<p>Ao escolher o atendimento pelo WhatsApp, a mensagem preparada será aberta no aplicativo ou no site do WhatsApp; o envio dependerá de você. O site não armazena a conversa.</p>
<h2>Contato sobre privacidade</h2>
<p>Para dúvidas sobre este site, entre em contato com a Ótica Pupila pelo telefone <a href="tel:+554734223223" class="" >(47) 3422-3223</a> ou na Rua Abdon Batista, 59, Centro, Joinville/SC.</p>
<h2>Próxima revisão</h2>
<p>Antes da publicação, esta política deverá incorporar os dados oficiais do responsável e as informações da hospedagem. Qualquer futura integração será avaliada antes de ser adicionada.</p>
</article>` },

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
    lens: 'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0ZM8 6c-3 3-3 9 0 12M12 3c7 4 7 14 0 18',
    chat: 'M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L3 21l1.4-4.5a9 9 0 1 1 16.6-5ZM8 9h8M8 13h5'
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
  const chat = (label = 'Fale com a Pupila', message = 'Olá! Conheci a Ótica Pupila pelo site e gostaria de atendimento.', classes = 'button primary') => `<button type="button" class="${classes}" data-whatsapp="${message}">${label}${icon('diagonal')}</button>`;
  const crumb = label => `<nav class="breadcrumb wrap" aria-label="Caminho da página">
<a href="#/index.html">Início</a>
<span aria-hidden="true">/</span>
<span aria-current="page">${label}</span>
</nav>`;
  const categories = [
    ['oculos-de-grau', 'Óculos de grau', 'Conforto para ver. Liberdade para ser.', 'glasses'],
    ['oculos-de-sol', 'Óculos de sol', 'Seu estilo sob uma nova luz.', 'sun'],
    ['relogios', 'Relógios', 'O seu tempo merece um detalhe a mais.', 'watch'],
    ['semijoias', 'Semijoias', 'Pequenos detalhes. Grandes significados.', 'gem'],
    ['lentes', 'Lentes para óculos', 'Tecnologia e cuidado para cada olhar.', 'lens']
  ];
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
        <details class="nav-group">
<summary>Óculos ${icon('chevron')}</summary>
<div class="submenu">${link('oculos-de-grau', 'Óculos de grau')}${link('oculos-de-sol', 'Óculos de sol')}${link('ray-ban-meta', 'Ray-Ban Meta ↗')}</div>
</details>
        ${link('relogios', 'Relógios', 'nav-link')}${link('semijoias', 'Semijoias', 'nav-link')}
        <details class="nav-group nav-lenses">
<summary>Lentes ${icon('chevron')}</summary>
<div class="submenu">${link('lentes', 'Lentes para óculos')}${link('lentes/contato', 'Lentes de contato')}</div>
</details>
        <details class="nav-group nav-about">
<summary>A Pupila ${icon('chevron')}</summary>
<div class="submenu">${link('nossa-historia', 'Nossa história')}${link('marcas', 'Nossas marcas')}<a href="#/index.html#avaliacoes">Avaliações</a>${link('perguntas-frequentes', 'Perguntas frequentes')}</div>
</details>
        ${link('ray-ban-meta', 'Ray-Ban Meta', 'nav-link meta-nav-link')}${link('contato', 'Visite a loja', 'nav-link mobile-visit')}
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
<h2>Encontre seu estilo</h2>${categories.map(c => link(c[0], c[1])).join('')}${link('ray-ban-meta', 'Ray-Ban Meta')}</div>
      <div>
<h2>Conheça a Pupila</h2>${link('nossa-historia', 'Nossa história')}${link('marcas', 'Nossas marcas')}${link('perguntas-frequentes', 'Perguntas frequentes')}${link('contato', 'Contato')}</div>
      <div>
<h2>Vamos nos encontrar</h2>
<p>Rua Abdon Batista, 59<br>Centro · Joinville/SC</p>
<a href="tel:+554734223223">(47) 3422-3223</a>
<a class="text-link" href="${window.PUPILA_DATA.company.maps.replaceAll('&', '&amp;')}" target="_blank" rel="noopener noreferrer">Como chegar ${icon('diagonal')}</a>
</div>
    </div>
<div class="wrap footer-bottom">
<span>© ${new Date().getFullYear()} Ótica Pupila · Desde 1992</span>${link('privacidade', 'Política de privacidade')}<a href="#/index.html">Feito para olhar de perto. ↑</a>
</div>
</footer>
    <button type="button" class="floating-contact" data-whatsapp="Olá! Conheci a Ótica Pupila pelo site e gostaria de atendimento." aria-label="Falar com a Pupila pelo WhatsApp">${icon('chat')}<span>Fale com a Pupila</span>
</button>`;

  const productBrands = `<div class="product-brands"><span class="rayban-name">Ray-Ban</span><img class="meta-brand-logo" src="assets/logo-meta.png" width="3840" height="774" alt="Meta" decoding="async"></div>`;
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
<a href="#/index.html#categorias" class="button primary">Encontre seu estilo ${icon('diagonal')}</a>${chat('Converse com a gente', undefined, 'text-link')}</div>
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
<figure><img src="assets/lenses/essilor-select-2026.jpeg" width="3956" height="2666" alt="Certificado Essilor Varilux Especialista Select 2026 da Ótica Pupila de Joinville" loading="lazy" decoding="async"><figcaption>Certificado EssilorLuxottica · 2026</figcaption></figure>
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
<h2 id="meta-feature-title">O próximo<br>olhar já <span class="brand-accent">chegou.</span>
</h2>
<p class="product-name">${productName}</p>
<p>Registre fotos e vídeos sem usar as mãos, ouça músicas e faça chamadas com áudio aberto. O estilo icônico do Wayfarer encontra os recursos da Meta AI.</p>
<a class="button white" href="#/ray-ban-meta/index.html">Conheça o modelo ${icon('diagonal')}</a>
</div>
<figure class="meta-feature-art">
<img src="assets/0RW4011__601SSB__P21__shad__qt.avif" width="720" height="386" alt="RAY-BAN META WAYFARER GEN 3 preto fosco visto em três quartos" loading="lazy" decoding="async">
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
    { image: 'assets/0RW4011__601SSB__P21__shad__qt.avif', label: 'Três quartos', alt: 'RAY-BAN META WAYFARER GEN 3: vista de três quartos com haste direita' },
    { image: 'assets/0RW4011__601SSB__P21__shad__fr.avif', label: 'Frente', alt: 'RAY-BAN META WAYFARER GEN 3: vista frontal da armação preta' },
    { image: 'assets/0RW4011__601SSB__P21__shad__al2.avif', label: 'Outro lado', alt: 'RAY-BAN META WAYFARER GEN 3: vista de três quartos com haste esquerda' },
    { image: 'assets/0RW4011__601SSB__P21__shad__lt.avif', label: 'Lateral', alt: 'RAY-BAN META WAYFARER GEN 3: vista lateral da haste' },
    { image: 'assets/0RW4011__601SSB__P21__shad__bk.avif', label: 'Traseira', alt: 'RAY-BAN META WAYFARER GEN 3: vista posterior da armação' },
    { image: 'assets/0RW4011__601SSB__P21__shad__cfr.avif', label: 'Interior', alt: 'RAY-BAN META WAYFARER GEN 3: vista frontal pelo interior da armação' }
  ];
  const products = [{
    slug: 'ray-ban-meta',
    route: 'ray-ban-meta',
    name: productName,
    brand: 'Ray-Ban',
    categories: ['oculos-de-sol'],
    audiences: ['todos'],
    label: 'ÓCULOS INTELIGENTES',
    image: metaViews[0].image,
    imageAlt: metaViews[0].alt,
    views: metaViews,
    branding: productBrands,
    description: 'O design icônico do Wayfarer com tecnologia para acompanhar sua rotina. Capture fotos com a câmera de 12 MP e grave vídeos em 3K sem usar as mãos. Ouça músicas e podcasts, faça chamadas com áudio aberto e acesse a Meta AI por comandos de voz.',
    facts: [
      ['Modelo', 'RW4011 601SSB'],
      ['Armação', 'Preto fosco'],
      ['Câmera e vídeo', '12 MP · gravação em 3K Ultra HD'],
      ['Áudio', 'Alto-falantes abertos e seis microfones'],
      ['Autonomia', 'Até 9 horas de uso por carga']
    ],
    support: 'Recursos de IA variam conforme país, idioma e atualizações. A autonomia varia com o uso.',
    source: { href: 'https://about.fb.com/news/2026/09/introducing-ray-ban-meta-audio-glasses-new-styles-plus-muse/', label: 'Conheça os recursos no site da Meta ↗' },
    whatsapp: 'Olá! Gostaria de saber mais sobre o RAY-BAN META WAYFARER GEN 3 RW4011 601SSB.'
  }];
  window.PUPILA_META_VIEWS = metaViews;
  window.PUPILA_DATA.products = products;

  function productCard(product) {
    return `<a class="catalog-card" data-catalog-card data-audience="${product.audiences.join(' ')}" data-brand="${product.brand}" href="#/${product.route}/index.html">
<figure><img src="${product.image}" width="720" height="386" alt="${product.imageAlt}" loading="lazy" decoding="async"></figure>
<div class="catalog-card-copy"><p class="eyebrow">${product.brand}</p><h2>${product.name}</h2><p>${product.label}</p><span class="text-link">Ver detalhes ${icon('diagonal')}</span></div>
</a>`;
  }

  function eyewearCatalog(category) {
    const [route, name, description] = category;
    const availableProducts = products.filter(product => product.categories.includes(route));
    const brands = [...new Set(availableProducts.map(product => product.brand))];
    return `${crumb(name)}<section class="page-intro wrap">
<p class="eyebrow">NOSSA SELEÇÃO</p>
<h1>${name}, do seu jeito.</h1>
<p class="lede">${description} Explore os modelos que já estão disponíveis para conhecer com mais calma.</p>
</section>
<section class="wrap catalog-section catalog-listing" data-catalog data-category="${route}" aria-labelledby="catalog-title">
<div class="catalog-heading"><div><p class="eyebrow">MODELOS EM DESTAQUE</p><h2 id="catalog-title">Escolha pelo seu olhar.</h2></div><p>As peças publicadas aqui já têm imagens e informações confirmadas pela loja.</p></div>
<div class="catalog-toolbar"><div class="catalog-audience" role="group" aria-label="Filtrar por público"><button type="button" class="catalog-filter" data-catalog-filter="todos" aria-pressed="true">Todos</button><button type="button" class="catalog-filter" data-catalog-filter="feminino" aria-pressed="false">Feminino</button><button type="button" class="catalog-filter" data-catalog-filter="masculino" aria-pressed="false">Masculino</button></div><label class="catalog-brand-filter"><span>Marca</span><select data-catalog-brand aria-label="Filtrar por marca"><option value="todas">Todas as marcas</option>${brands.map(brand => `<option value="${brand}">${brand}</option>`).join('')}</select></label></div>
<p class="catalog-result" data-catalog-result aria-live="polite">${availableProducts.length === 1 ? '1 modelo disponível' : `${availableProducts.length} modelos disponíveis`}</p>
<div class="catalog-grid" data-catalog-grid>${availableProducts.map(productCard).join('')}</div>
<p class="catalog-empty" data-catalog-empty${availableProducts.length ? ' hidden' : ''}>Nenhum modelo publicado corresponde a estes filtros no momento. Fale com a Pupila para conhecer outras opções.</p>
</section>`;
  }

  function catalog(category) {
    const [route, name, description, symbol] = category;
    if (route === 'oculos-de-grau' || route === 'oculos-de-sol') return eyewearCatalog(category);
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
<div class="button-row">${chat('Consultar a seleção', `Olá! Gostaria de conhecer a seleção de ${name.toLowerCase()} da Ótica Pupila.`)}${link('contato', 'Planeje sua visita', 'text-link')}</div>
</div>
</div>
</section>`;
  }
  function productPage(product) {
    return `${crumb(product.brand)}
    <section class="product-page wrap" aria-labelledby="product-title">
<div class="product-gallery" data-product-gallery="${product.slug}" aria-label="Galeria de imagens do ${product.name}">
<div class="product-gallery-main">
<span class="gallery-label">SELEÇÃO PUPILA</span>
<img id="product-main-image" src="${product.views[0].image}" width="720" height="386" alt="${product.views[0].alt}" fetchpriority="high" decoding="async">
<span class="meta-gallery-count" aria-live="polite">01 / ${String(product.views.length).padStart(2, '0')}</span>
</div>
<div class="product-gallery-controls" role="group" aria-label="Escolha um ângulo">${product.views.map((view, i) => `<button type="button" class="product-view" data-product-view="${i}" aria-pressed="${i === 0}" aria-label="Ver ângulo ${i + 1}: ${view.label}">
<img src="${view.image}" width="720" height="386" alt="" loading="lazy" decoding="async">
<span>${view.label}</span>
</button>`).join('')}</div>
<p class="product-gallery-help">Explore os ângulos. Você também pode usar ← e → nos botões.</p>
</div>
    <div class="product-page-heading">
<p class="eyebrow">O CLÁSSICO, EM UMA NOVA PERSPECTIVA</p>
${product.branding || `<p class="product-brand">${product.brand}</p>`}
<h1 id="product-title">${product.name}</h1>
<p>${product.description}</p>
<dl class="product-facts">${product.facts.map(([term, detail]) => `<div><dt>${term}</dt><dd>${detail}</dd></div>`).join('')}</dl>${product.support ? `<p class="product-support-note">${product.support}</p>` : ''}${product.source ? `<a class="source-link" href="${product.source.href}" target="_blank" rel="noopener noreferrer">${product.source.label}</a>` : ''}
${chat('Quero conhecer de perto', product.whatsapp)}<p class="availability-note">Tamanho, preço e disponibilidade sob consulta à loja.</p>${link('contato', 'Experimente na Pupila', 'text-link')}</div>
</section>`;
  }
  const brands = `${crumb('Nossas marcas')}<section class="page-intro wrap">
<p class="eyebrow">DESIGN, IDENTIDADE & ESCOLHA</p>
<h1>Encontre sua assinatura.
</h1>
<p class="lede">Marcas e peças que você conhece de perto, com a orientação de quem cuida de cada escolha.</p>
</section>
<section class="wrap brands-editorial">
<a class="brand-highlight" href="#/ray-ban-meta/index.html">
<div>
<p class="eyebrow">EM DESTAQUE NA PUPILA</p>
${productBrands}
<h2>${productName}</h2>
<span class="text-link">Explore o modelo ${icon('diagonal')}</span>
</div>
<img src="assets/0RW4011__601SSB__P21__shad__qt.avif" width="720" height="386" alt="RAY-BAN META WAYFARER GEN 3 preto fosco" decoding="async">
</a>
<div class="care-note">
<h2>Uma marca em mente?</h2>
<p>Fale com a nossa equipe para consultar as marcas, os modelos e as opções disponíveis hoje na loja.</p>${chat('Consultar uma marca', 'Olá! Gostaria de consultar as marcas disponíveis na Ótica Pupila.')}</div>
</section>`;
  const pages = {
    ...existing,
    'index.html': { title: 'Ótica Pupila | Ótica em Joinville desde 1992', content: home },
    'marcas/index.html': { title: 'Nossas marcas | Ótica Pupila', content: brands },
    'marcas/modelo/index.html': { title: 'Nossas marcas | Ótica Pupila', content: brands }
  };
  products.forEach(product => {
    pages[`${product.route}/index.html`] = { title: `${product.name} | Ótica Pupila`, content: productPage(product) };
  });
  categories.filter(c => c[0] !== 'lentes').forEach(c => {
    pages[`${c[0]}/index.html`] = { title: `${c[1]} | Ótica Pupila`, content: catalog(c) };
  });
  window.PUPILA_PAGES = Object.fromEntries(Object.entries(pages).map(([route, page]) => [route, {
    title: page.title,
    html: `${header}<main id="conteudo" tabindex="-1">${page.content}</main>${footer}`
  }]));
})();
