/* Conteúdo e páginas. Fotografias e informações fornecidas pela Ótica Pupila. */
(function () {
  'use strict';

window.PUPILA_ASSETS = {
  "assets/images/logo-pupila.webp": "assets/image-01.webp",
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
    "address": "Rua Abdon Batista, 59, Centro, Joinville - SC, 89201-010",
    "siteUrl": "",
    "instagram": ""
  },
  "products": []
};

const company = window.PUPILA_DATA.company;
const whatsappIcon = '<img class="whatsapp-icon" src="assets/whatsapp.svg" width="26" height="26" alt="">';
const whatsappSolidIcon = '<img class="whatsapp-icon" src="assets/whatsapp-solid.svg" width="26" height="26" alt="">';
const defaultMessage = 'Olá! Vim pelo site da Ótica Pupila e gostaria de falar com a equipe.';
const homeMessage = 'Olá! Vi a seleção da Ótica Pupila no site e gostaria de ajuda para escolher um produto.';
const whatsappLink = message => `href="https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}" rel="noreferrer"`;
const mapsDestination = encodeURIComponent(`${company.name}, ${company.address}`);
const mapsDirections = `https://www.google.com/maps/dir/?api=1&amp;destination=${mapsDestination}&amp;dir_action=navigate`;
const mapsEmbed = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.6436999401462!2d-48.8445055!3d-26.3056482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deb04c3e6785c3%3A0xd08598bb97196043!2s%C3%93tica%20Pupila!5e0!3m2!1spt-BR!2sbr!4v1794361869100!5m2!1spt-BR!2sbr';

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
// Trechos adicionais conferidos no perfil da loja de Joinville: https://maps.app.goo.gl/fx92AvEfJ51patQ48
const additionalReviewQuotes = [
  '[…] informações claras, excelência em óculos e lentes.',
  '[…] me ajudou a escolher os óculos ideais para o meu perfil.',
  'Ótimo atendimento e produtos de qualidade.'
];
const testimonial = quote => `<figure class="testimonial">
<span class="testimonial-mark" aria-hidden="true">“</span>
<blockquote><p>${quote}</p></blockquote>
<figcaption>Trecho de avaliação de cliente</figcaption>
</figure>`;
// Seleção de avaliações de cinco estrelas conferida em 11/11/2026:
// https://maps.app.goo.gl/fx92AvEfJ51patQ48
const selectedGoogleReviews = [
  ['excelência em óculos e lentes', 'Um cliente conta que sua família frequenta a Pupila há mais de 25 anos e elogia a clareza das informações.'],
  ['esclareceu todas as minhas dúvidas', 'Um cliente elogia a atenção da equipe ao ajudá-lo a encontrar a armação que procurava.'],
  ['excelente qualidade dos produtos', 'Uma cliente destaca o cuidado da equipe do primeiro contato ao pós-venda.'],
  ['os óculos ideais para o meu perfil', 'Uma cliente relata que a equipe a acolheu desde a chegada e a ajudou na escolha. Também elogia a organização da loja.'],
  ['Conquistaram nossa confiança', 'Uma cliente destaca a atenção com que sua mãe foi atendida, o profissionalismo e a qualidade dos produtos.']
];

const faqGroups = {
  'oculos-de-grau': { title: 'Óculos de grau', questions: [
    ['O que devo levar para escolher meus óculos de grau?', 'Traga sua receita médica e, se já usa óculos, leve o par atual.'],
    ['Qualquer armação funciona com a minha receita?', 'A combinação depende da prescrição, do tamanho e do formato da armação. A equipe pode conferir as opções de lente e montagem com você.'],
    ['Como escolher lentes e armações?', 'Leve sua prescrição e conte à equipe como usa os óculos no dia a dia. A escolha deve considerar as orientações do profissional que acompanha sua visão, o ajuste e o conforto da armação.']
  ] },
  'oculos-de-sol': { title: 'Óculos de sol', questions: [
    ['Lentes escuras garantem proteção UV?', 'A cor, sozinha, não comprova proteção. Ao escolher os óculos solares, verifique a indicação de proteção UVA e UVB do fabricante, como 100% UV ou UV400.'],
    ['Lente polarizada e proteção UV são a mesma coisa?', 'A polarização reduz o brilho refletido em superfícies como água e asfalto. A proteção UV é uma característica separada que deve ser conferida na lente escolhida.'],
    ['Posso fazer um óculos de sol com grau?', 'Depende da prescrição e da armação. Traga sua receita para a equipe conferir quais modelos e opções de lentes podem ser combinados.']
  ] },
  cuidados: { title: 'Cuidados com os óculos', questions: [
    ['Como limpar as lentes dos meus óculos?', 'Enxágue para retirar partículas, use um produto indicado para suas lentes ou uma pequena quantidade de detergente neutro, enxágue e seque com uma microfibra limpa. Evite água quente e siga as orientações do fabricante.'],
    ['Posso limpar os óculos na roupa?', 'Evite. O tecido e a poeira podem riscar as lentes. Prefira uma microfibra própria e limpa, retirando a sujeira antes de esfregar.'],
    ['Como guardar meus óculos?', 'Use um estojo adequado e evite apoiar as lentes diretamente nas superfícies. Não deixe os óculos expostos ao calor intenso, como no painel de um carro.']
  ] },
  relogios: { title: 'Relógios', questions: [
    ['Como saber se um relógio pode molhar?', 'A resistência à água depende do modelo. Confira a indicação do fabricante e as orientações de uso antes de molhar o relógio.'],
    ['Posso experimentar o relógio antes de escolher?', 'Consulte os modelos na loja e experimente para comparar o tamanho da caixa e o ajuste da pulseira no pulso.']
  ] },
  semijoias: { title: 'Semijoias', questions: [
    ['Como consultar o material e o acabamento de uma semijoia?', 'Pergunte à equipe sobre a composição e o acabamento da peça escolhida. As características variam conforme o modelo.'],
    ['Como guardar minhas semijoias?', 'Guarde as peças secas e separadas para evitar atrito. Siga as orientações de cuidado indicadas para cada acabamento.']
  ] },
  lentes: { title: 'Lentes para óculos', questions: [
    ['Preciso de receita para comprar lentes para óculos?', 'Sim. Traga sua receita médica para a equipe consultar as lentes e os tratamentos compatíveis com a prescrição.'],
    ['Qual a diferença entre monofocal e multifocal progressiva?', 'A monofocal corrige uma distância principal. A multifocal progressiva reúne correções para longe, distância intermediária e perto na mesma lente.'],
    ['Posso trocar as lentes e manter a minha armação?', 'Leve a armação à Pupila para conferir seu estado e se ela comporta as lentes indicadas na receita.']
  ] },
  'lentes/hoya': { title: 'Lentes HOYA', questions: [
    ['O que são as lentes Hoyalux?', 'Hoyalux é uma família de lentes multifocais progressivas da HOYA para visão de perto, intermediária e de longe.'],
    ['Qual a diferença entre Sensity e Hi-Vision?', 'Sensity é a linha fotocromática da HOYA. Hi-Vision reúne tratamentos de superfície, incluindo opções antirreflexo.']
  ] },
  'lentes/zeiss': { title: 'Lentes ZEISS', questions: [
    ['O que diferencia ZEISS Office de DriveSafe?', 'A linha Office é voltada a atividades de perto e a distâncias intermediárias. DriveSafe foi desenvolvida para as demandas visuais ao dirigir.'],
    ['O que é PhotoFusion X?', 'É uma tecnologia fotocromática da ZEISS. As lentes mudam de tonalidade conforme a luz.']
  ] },
  'lentes/essilor': { title: 'Lentes Essilor', questions: [
    ['Qual é a diferença entre Varilux e Eyezen?', 'Varilux reúne lentes multifocais progressivas. Eyezen é uma linha de visão simples. A escolha depende da sua prescrição.'],
    ['O que é Crizal?', 'É uma família de tratamentos Essilor para a superfície das lentes, com opções antirreflexo. A compatibilidade depende da lente escolhida.']
  ] },
  'lentes/contato': { title: 'Lentes de contato', questions: [
    ['Posso comprar lentes de contato com a receita dos meus óculos?', 'Traga a prescrição médica para lentes de contato. O oftalmologista avalia a indicação e as características necessárias para a adaptação.'],
    ['A Pupila faz adaptação de lentes de contato?', 'A loja consulta linhas e prazos conforme a prescrição. A adaptação e os exames são realizados com o oftalmologista.'],
    ['Como consultar uma lente de contato de uma linha específica?', 'Informe à equipe a marca e a linha indicadas na receita. A Pupila pode verificar as configurações disponíveis e o prazo.']
  ] },
  'ray-ban-meta': { title: 'Ray-Ban Meta', questions: [
    ['Posso colocar lentes de grau no Ray-Ban Meta?', 'Traga sua receita médica para a equipe conferir a compatibilidade com a armação e as opções de montagem.'],
    ['O que posso fazer com o Ray-Ban Meta?', 'O modelo permite registrar fotos e vídeos e usar o áudio aberto para chamadas e músicas. Os recursos de IA variam conforme o país, o idioma e as atualizações.']
  ] },
  atendimento: { title: 'Atendimento na Pupila', questions: [
    ['Posso comprar pelo site?', 'O site apresenta a seleção da Ótica Pupila. Para consultar disponibilidade, valores e formas de compra, fale com a equipe pelo WhatsApp ou visite a loja.'],
    ['Posso experimentar os produtos antes de comprar?', 'Consulte a disponibilidade da peça que você quer experimentar e passe na loja para comparar opções com a equipe.'],
    ['Onde fica a loja e quais são os horários?', 'Estamos na Rua Abdon Batista, 59, Centro, Joinville/SC. Atendemos de segunda a sexta, das 08h30 às 18h, e aos sábados, das 08h30 às 12h30. Aos domingos, a loja está fechada.']
  ] }
};
const faqTopics = Object.entries(faqGroups).map(([key, group]) => ({ ...group, id: `faq-${key.replace('/', '-')}` }));
const faqTotal = faqTopics.reduce((total, topic) => total + topic.questions.length, 0);
const faqItems = questions => questions.map(([question, answer]) => `<details>
<summary>${question}<span aria-hidden="true">+</span></summary>
<div class="faq-answer"><p>${answer}</p></div>
</details>`).join('\n');
const [cleaning, clothing, storage] = faqGroups.cuidados.questions;
const homeQuestions = [cleaning, clothing, faqGroups['oculos-de-sol'].questions[0], storage, faqGroups['oculos-de-grau'].questions[2]];

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
<div class="faq-list">${faqItems(homeQuestions)}</div>
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
<a href="${mapsDirections}" class="button primary">Como chegar <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M4 12h16M13 5l7 7-7 7"/>
</svg>
</a>
<a href="tel:+554734223223" class="text-link" >
<svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
<path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a15 15 0 0 1-7-7l2-2-2-5Z"/>
</svg>(47) 3422-3223</a>
</div>
</div>
<div class="location-map">
<iframe src="${mapsEmbed}" title="Mapa da Ótica Pupila em Joinville" width="600" height="450" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
</section>`;

const existing = {

"nossa-historia/index.html": { message: "Olá! Conheci a história da Pupila no site e gostaria de falar com a equipe.", title: "Nossa história desde 1992 | Ótica Pupila", content: `<nav class="breadcrumb wrap" aria-label="Caminho da página">
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
<a href="${mapsDirections}" class="button outline">Traçar rota até a loja <span aria-hidden="true">↗</span></a>
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
<div class="button-row"><a class="button primary" ${whatsappLink(defaultMessage)}>${whatsappIcon} Falar pelo WhatsApp</a></div>
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
<div class="location-map contact-map">
<iframe src="${mapsEmbed}" title="Mapa da Ótica Pupila na Rua Abdon Batista, 59, em Joinville" width="600" height="450" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
</div>
</section>` },

"perguntas-frequentes/index.html": { title: "Perguntas frequentes | Ótica Pupila",
message: 'Olá! Li as perguntas frequentes da Pupila no site e gostaria de tirar uma dúvida com a equipe.',
content: `<nav class="breadcrumb wrap" aria-label="Caminho da página">
<a href="#/index.html">Início</a><span aria-hidden="true">/</span><span>Perguntas frequentes</span>
</nav>
<section class="page-intro wrap">
<p class="eyebrow">CLAREZA PARA ESCOLHER</p>
<h1>Perguntas frequentes.</h1>
<p class="lede">${faqTotal} respostas sobre óculos, lentes, acessórios e atendimento.</p>
</section>
<div class="wrap faq-full">
<nav class="faq-topics" aria-label="Temas das perguntas">${faqTopics.map(topic => `<a href="#${topic.id}">${topic.title}</a>`).join('')}</nav>
${faqTopics.map(topic => `<section class="faq-group" aria-labelledby="${topic.id}">
<h2 id="${topic.id}">${topic.title}</h2>
<div class="faq-list">${faqItems(topic.questions)}</div>
</section>`).join('')}
<p class="small">Dúvidas sobre a visão devem ser avaliadas por um profissional habilitado.</p>
</div>` },

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
  const chat = (label, message = defaultMessage, classes = 'button primary') => `<a class="${classes}" ${whatsappLink(message)}>${label}${icon('arrow')}</a>`;
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
  function carousel({ id, heading, kicker, description, slides, previous, next, autoplay = false }) {
    return `<section class="section product-carousel${id === 'produto-perguntas' ? ' faq-section' : ''}" id="${id}" data-carousel${autoplay ? ' data-carousel-autoplay' : ''} aria-labelledby="${id}-title">
<div class="wrap carousel-layout">
<div><p class="eyebrow">${kicker}</p><h2 id="${id}-title">${heading}</h2>${description ? `<p class="carousel-description">${description}</p>` : ''}</div>
<div>
<div class="carousel-slides" id="${id}-slides">${slides.map(slide => `<div class="carousel-slide">${slide}</div>`).join('')}</div>
<div class="carousel-controls" hidden>
<button class="carousel-control" type="button" data-carousel-step="-1" aria-controls="${id}-slides" aria-label="${previous}">${icon('arrow')}</button>
<span class="carousel-position" data-carousel-position aria-hidden="true"></span>
<button class="carousel-control" type="button" data-carousel-step="1" aria-controls="${id}-slides" aria-label="${next}">${icon('arrow')}</button>
${autoplay ? `<button class="motion-control" type="button" data-motion-toggle aria-controls="${id}-slides" hidden>Pausar</button>` : ''}
</div>
</div>
</div>
</section>`;
  }

  const reviews = carousel({
    id: 'avaliacoes', heading: 'O que dizem sobre a Pupila.', kicker: 'AVALIAÇÕES DE CLIENTES',
    description: '<span class="review-source"><span class="review-source-mark" aria-hidden="true"></span>Seleção do Google</span>',
    slides: selectedGoogleReviews.map(([excerpt, summary]) => `<article class="google-testimonial">
<span class="review-stars" role="img" aria-label="5 de 5 estrelas"><span aria-hidden="true">★★★★★</span></span>
<h3>“${excerpt}”</h3><p>${summary}</p><span class="review-caption">Trecho e resumo de avaliação do Google</span>
</article>`),
    previous: 'Avaliação anterior', next: 'Próxima avaliação', autoplay: true
  });

  // Seleção do Drive com Carrera e Tommy Hilfiger atualizados pela Pupila.
  const eyewearLogos = [
    ['adidas', 'adidas.png', 545, 366], ['Cacharel', 'cacharel.png', 350, 350],
    ['Carmim', 'carmim.png', 592, 337], ['Carrera', 'carrera.png', 320, 320],
    ['Emporio Armani', 'emporio-armani.png', 447, 447], ['Evoke', 'evoke.png', 738, 303],
    ['Guess', 'guess.png', 320, 320], ['HB', 'hb.jpg', 372, 372],
    ['Maresia', 'maresia.png', 299, 185], ['MAX&Co.', 'max-co.png', 738, 414],
    ['Miraflex', 'miraflex.png', 300, 100], ['Oakley', 'oakley.png', 320, 320],
    ['Polo Ralph Lauren', 'polo.png', 318, 159], ['Ray-Ban', 'ray-ban.png', 512, 512],
    ['Signus', 'signus.png', 549, 230], ['Stepper', 'stepper.png', 320, 320],
    ['Timberland', 'timberland.png', 320, 320], ['Tommy Hilfiger', 'tommy.png', 320, 320],
    ['Vogue Eyewear', 'vogue.png', 447, 447], ['X-Treme', 'x-treme.png', 738, 279]
  ];
  const brandCarousel = `<section class="section brand-strip" id="marcas-de-oculos" data-brand-carousel aria-labelledby="brand-strip-title">
<div class="wrap">
<div class="brand-strip-heading"><h2 id="brand-strip-title">Marcas de óculos na Pupila.</h2>
<button class="motion-control" type="button" data-motion-toggle aria-controls="brand-strip-logos" hidden>Pausar</button></div>
<div class="brand-strip-layout">
<button class="carousel-control brand-arrow brand-arrow-back" type="button" data-brand-step="-1" aria-controls="brand-strip-logos" aria-label="Logos anteriores" hidden>${icon('arrow')}</button>
<div class="brand-strip-window" id="brand-strip-logos"><div class="brand-strip-track">
<ul class="brand-strip-list" aria-label="Marcas de óculos">${eyewearLogos.map(([name, file, width, height]) => `<li><img src="assets/marcas/${file}" width="${width}" height="${height}" alt="${name}" loading="lazy" decoding="async"></li>`).join('')}</ul>
</div></div>
<button class="carousel-control brand-arrow" type="button" data-brand-step="1" aria-controls="brand-strip-logos" aria-label="Próximos logos" hidden>${icon('arrow')}</button>
</div></div></section>`;

  const productReviews = carousel({
    id: 'produto-avaliacoes', heading: 'Avaliações da nossa loja.', kicker: 'EXPERIÊNCIAS DE CLIENTES',
    description: 'O que os clientes contam sobre o atendimento na Pupila.',
    slides: [...reviewQuotes, ...additionalReviewQuotes].map(testimonial), previous: 'Avaliação anterior', next: 'Próxima avaliação'
  });
  const productHelp = (topic, related) => productReviews + carousel({
    id: 'produto-perguntas', heading: 'Perguntas frequentes.', kicker: 'BOM SABER',
    description: link('perguntas-frequentes', `Ver todas as ${faqTotal} perguntas`, 'text-link'),
    slides: [...faqGroups[topic].questions, ...faqGroups[related].questions].map(([question, answer]) => `<article class="carousel-question"><h3>${question}</h3><p>${answer}</p></article>`),
    previous: 'Pergunta anterior', next: 'Próxima pergunta'
  });

  const header = `
    <a href="#conteudo" class="skip-link">Pular para o conteúdo</a>
    <aside class="topline" aria-label="Informações da loja">
<div class="wrap">
<span>Há mais de 30 anos, olhando por você.</span>
<a href="${mapsDirections}">Centro de Joinville, SC ${icon('diagonal')}</a>
</div>
</aside>
    <header class="site-header">
<div class="header-main wrap">
      <a href="#/index.html" class="brand" aria-label="Ótica Pupila — início">
<img src="assets/image-01.webp" width="650" height="318" alt="Ótica Pupila" class="brand-logo" decoding="async">
</a>
      <nav id="main-nav" class="main-nav" aria-label="Navegação principal">
        <a href="#/index.html" class="nav-link">Início</a>
        <details class="nav-group nav-products">
<summary>Produtos ${icon('chevron')}</summary>
<div class="submenu">${categories.map(([route, name]) => link(route, name)).join('')}${link('lentes/contato', 'Lentes de contato')}</div>
</details>
        <details class="nav-group nav-about">
<summary>A Pupila ${icon('chevron')}</summary>
<div class="submenu">${link('nossa-historia', 'Nossa história')}${link('perguntas-frequentes', 'Perguntas frequentes')}</div>
</details>
        ${link('visioffice-3', 'Visioffice 3', 'nav-link')}
        ${link('contato', 'Visite a loja', 'nav-link mobile-visit')}
      </nav>
      <div class="header-actions">${link('contato', `Visite a loja ${icon('diagonal')}`, 'button outline header-visit')}<button type="button" class="menu-toggle" aria-controls="main-nav" aria-expanded="false">${icon('menu')}<span>Menu</span>
</button>
</div>
    </div>
</header>`;
  const footer = (message = defaultMessage) => `
    <section class="visit-cta" aria-labelledby="visit-banner-title">
<div class="wrap">
<p class="eyebrow">VAMOS ENCONTRAR O SEU PRÓXIMO OLHAR?</p>
<h2 id="visit-banner-title">Experimente. Sinta. <span class="brand-accent">Escolha.</span>
</h2>
<p>De perto, cada detalhe faz a diferença. Venha para a Pupila.</p>
</div>
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
<a class="text-link" href="${mapsDirections}">Como chegar ${icon('arrow')}</a>
</div>
    </div>
<div class="wrap footer-bottom">
<span>Ótica Pupila · Desde 1992</span>${link('privacidade', 'Política de privacidade')}<a href="#/index.html">Feito para olhar de perto. ↑</a>
</div>
    <a class="floating-contact" ${whatsappLink(message)}>${whatsappSolidIcon}<span>Fale com a Pupila</span>
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
<a href="#/index.html#categorias" class="button primary">Encontre seu estilo</a>${chat('Converse com a gente', homeMessage, 'button accent')}</div>
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
<a href="#/ray-ban-meta/index.html" aria-label="Conheça o Ray-Ban Meta Wayfarer Gen 3">
<img src="assets/0RW4011__601SSB__P21__shad__qt.webp" width="720" height="386" alt="RAY-BAN META WAYFARER GEN 3 preto fosco visto em três quartos" loading="lazy" decoding="async">
</a>
<figcaption>
<span>${productName}</span>
</figcaption>
</figure>
</div>
</div>
</section>
    ${story}
    <section class="care-section" aria-labelledby="lens-steps-title">
<div class="wrap care-layout">
<div>
<p class="eyebrow">LENTES & CUIDADO</p>
<h2 id="lens-steps-title">Como funciona a<br>escolha das lentes.
</h2>
</div>
<div>
<p>Veja o passo a passo na Pupila, da receita médica à escolha das lentes para a sua rotina. Conheça também a <a href="#/visioffice-3/index.html" class="visioffice-inline-link">medição digital com o Visioffice 3</a>.</p>${link('lentes', `Conheça nossas orientações ${icon('diagonal')}`, 'text-link')}</div>
</div>
<ol class="wrap care-steps" role="list">
<li>
<span aria-hidden="true">01</span>
<h3>Traga sua receita.</h3>
<p>A equipe começa pela sua prescrição médica para saber quais lentes pode apresentar.</p>
</li>
<li>
<span aria-hidden="true">02</span>
<h3>Conte como usa os óculos.</h3>
<p>Fale sobre leitura, trabalho, direção e outras atividades que fazem parte do seu dia.</p>
</li>
<li>
<span aria-hidden="true">03</span>
<h3>Compare as opções.</h3>
<p>A equipe explica as diferenças entre as lentes compatíveis e informa valores e prazos para você escolher.</p>
</li>
</ol>
</section>
    ${reviews}${faq}${brandCarousel}${location}`;

  const visioffice = `${crumb('Visioffice 3')}
<section class="wrap visioffice-hero" aria-labelledby="visioffice-title">
<div>
<p class="eyebrow">TECNOLOGIA ESSILOR · JOINVILLE</p>
<h1 id="visioffice-title">Visioffice 3 na Ótica Pupila</h1>
<p class="visioffice-lead">Medição digital para personalizar suas lentes.</p>
<p class="lede">Na Pupila, em Joinville, usamos a torre de medição da Essilor com a armação escolhida no rosto. O Visioffice 3 registra a posição dos olhos e da armação para ajudar a definir onde as lentes devem ficar em relação às pupilas.</p>
<a class="text-link" href="#como-funciona">Como fazemos a medição ${icon('arrow')}</a>
</div>
<figure class="visioffice-photo"><img src="assets/visioffice/visioffice-3-torre.png" width="447" height="447" fetchpriority="high" decoding="async" alt="Torre de medição digital Essilor Visioffice 3 com tela lateral">
<figcaption>Visioffice 3, da Essilor Instruments.</figcaption></figure>
</section>
<section class="visioffice-measures section" aria-labelledby="medidas-title">
<div class="wrap">
<h2 id="medidas-title">O que o Visioffice 3 mede</h2>
<dl class="visioffice-measure-grid">
<div><dt>Distância entre as pupilas</dt><dd>Ajuda a posicionar as lentes horizontalmente em relação aos olhos.</dd></div>
<div><dt>Altura de montagem</dt><dd>Indica a posição vertical da pupila na armação escolhida.</dd></div>
<div><dt>Posição da armação</dt><dd>A distância entre o olho e a lente, a inclinação e a curvatura ajudam a descrever como os óculos ficam no rosto.</dd></div>
</dl>
</div></section>
<section class="wrap section visioffice-features" aria-labelledby="visioffice-features-title">
<h2 id="visioffice-features-title">Tecnologias que usamos na Pupila</h2>
<dl class="visioffice-measure-grid">
<div><dt>Eyecode®</dt><dd>Localiza em três dimensões o centro de rotação de cada olho. Essa medida pode ser usada no cálculo das lentes compatíveis com a tecnologia.</dd></div>
<div><dt>H3D</dt><dd>Analisa a postura natural da cabeça ao olhar para longe. A equipe considera essa postura ao medir como a armação se posiciona no rosto.</dd></div>
<div><dt>Comportamento visual de perto</dt><dd>Avalia como você usa a visão de perto em uma tarefa como a leitura. O protocolo ajuda a personalizar modelos compatíveis da linha Varilux® XR.</dd></div>
</dl>
<p class="visioffice-note">A equipe aplica as medições conforme sua receita, a armação e o modelo de lente escolhido.</p>
<div class="visioffice-photo-pair">
<img src="assets/visioffice/visioffice-3-frontal.png" width="365" height="547" alt="Vista frontal da torre Visioffice 3 com base e tela lateral" loading="lazy" decoding="async">
<img src="assets/visioffice/visioffice-3-tela.png" width="378" height="432" alt="Detalhe da tela de controle e do espelho iluminado do Visioffice 3" loading="lazy" decoding="async">
</div>
</section>
<section class="wrap section visioffice-steps" id="como-funciona" aria-labelledby="visioffice-steps-title">
<div>
<h2 id="visioffice-steps-title">Como funciona na loja</h2>
<ol>
<li><h3>Traga sua receita</h3><p>A equipe confere a prescrição e conversa com você sobre sua rotina.</p></li>
<li><h3>Experimente a armação</h3><p>Com os óculos ajustados, você olha para o equipamento seguindo a orientação da equipe.</p></li>
<li><h3>Converse sobre as lentes</h3><p>A equipe confere as medidas e orienta as opções de montagem e lentes compatíveis.</p></li>
</ol>
<p class="visioffice-note">A medição ajuda no ajuste das lentes e complementa a receita do seu oftalmologista.</p>
${link('lentes/essilor', `Conheça as lentes Essilor e Varilux ${icon('arrow')}`, 'text-link')}
</div>
<figure class="visioffice-photo visioffice-store-photo"><img src="assets/visioffice/torre-1000.webp" srcset="assets/visioffice/torre-560.webp 560w, assets/visioffice/torre-1000.webp 1000w" sizes="(max-width: 760px) 90vw, 45vw" width="1000" height="1778" alt="Visioffice 3 instalado no espaço de atendimento da Ótica Pupila em Joinville" loading="lazy" decoding="async">
<figcaption>Nosso equipamento na Ótica Pupila, no Centro de Joinville.</figcaption></figure>
</section>`;

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
  const catalogProducts = window.PUPILA_CATALOG_MODELS.map(({ category, brand, slug, modelDetail, description, facts, story, catalogUrl, identificationPending, audience, angles = ['frente', 'lateral', 'detalhe'] }) => {
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
      slug, route: `${category}/${slug}`, description, brand, modelDetail,
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
    support: 'Recursos de IA variam conforme país, idioma e atualizações. A autonomia varia com o uso.'
  }, ...catalogProducts];
  window.PUPILA_META_VIEWS = metaViews;
  window.PUPILA_DATA.products = products;

  function productCard(product) {
    return `<a class="catalog-card" data-catalog-card data-audience="${product.audiences.join(' ')}" data-brand="${product.brand}" href="#/${product.route}/index.html">
<figure><img src="${product.image}" width="${product.width}" height="${product.height}" alt="${product.imageAlt}" loading="lazy" decoding="async"></figure>
<div class="catalog-card-copy"><h3>${product.brand}</h3><span class="text-link">Ver detalhes ${icon('diagonal')}</span></div>
</a>`;
  }

  function eyewearCatalog(category, availableProducts, message) {
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
<div class="button-row catalog-contact">${chat('Consultar a seleção', message)}</div>
</section>`;
  }

  const watchBrands = [
    { name: 'Orient', id: 'orient', logo: 'orient-logo.png', intro: 'Mostradores e acabamentos para quem gosta de marcar presença com discrição.', watches: [
      ['orient-18.webp', 'Automático com mostrador verde'],
      ['orient-14.webp', 'Cronógrafo prateado'],
      ['orient-15.webp', 'Automático prateado'],
      ['orient-16.webp', 'Crystal dourado'],
      ['orient-17.webp', 'Dourado com mostrador escuro'],
      ['orient-19.webp', 'Dourado com mostrador claro'],
      ['orient-20.webp', 'Cronógrafo preto']
    ] },
    { name: 'Lince', id: 'lince', logo: 'lince-logo.png', intro: 'Do brilho do dourado ao contraste do preto, detalhes para diferentes momentos.', watches: [
      ['lince-08.webp', 'Dourado com submostradores'],
      ['lince-05.webp', 'Dourado com mostrador preto'],
      ['lince-06.webp', 'Dourado com mostrador claro'],
      ['lince-07.webp', 'Preto com mostrador estampado'],
      ['lince-09.webp', 'Dourado com pulseira de malha'],
      ['lince-10.webp', 'Pulseira de malha e mostrador preto'],
      ['lince-11.webp', 'Dourado com pulseira de elos'],
      ['lince-12.webp', 'Digital prateado'],
      ['lince-13.webp', 'Dual Time com pulseira verde']
    ] },
    { name: 'X-Games', id: 'x-games', logo: 'x-game-logo.png', intro: 'Pulseiras marcantes, mostradores digitais e desenho esportivo.', watches: [
      ['x-game-03.webp', 'Preto com pulseira verde'],
      ['x-game-00.webp', 'Digital com detalhes verdes'],
      ['x-game-01.webp', 'Smartwatch preto'],
      ['x-game-02.webp', 'Dourado com mostrador escuro'],
      ['x-game-04.webp', 'Prateado com mostrador azul']
    ] }
  ];
  const watchCard = (brand, [image, description], index) => `<article class="watch-card${index === 0 ? ' watch-card-featured' : ''}">
<figure><img src="assets/relogios/${image}" width="720" height="960" alt="Relógio ${brand.name}: ${description.toLowerCase()}" loading="lazy" decoding="async"></figure>
<div class="watch-card-copy"><span class="watch-card-number">${String(index + 1).padStart(2, '0')} / ${String(brand.watches.length).padStart(2, '0')}</span><p>${brand.name}</p><h3>${description}</h3><a class="text-link" ${whatsappLink(`Olá! Vi o relógio ${brand.name}, ${description.toLowerCase()}, no site da Pupila. Qual o preço e a disponibilidade?`)}>Consultar este relógio ${icon('diagonal')}</a></div>
</article>`;
  const watchPage = `${crumb('Relógios')}
<section class="watch-hero wrap" aria-labelledby="watch-title">
<div class="watch-hero-copy"><p class="eyebrow">RELÓGIOS · SELEÇÃO PUPILA</p><h1 id="watch-title">O tempo também tem <em>estilo.</em></h1>
<p class="lede">Descubra relógios Orient, Lince e X-Games na Ótica Pupila, em Joinville. Explore formatos e acabamentos, depois consulte a peça escolhida com nossa equipe.</p>
<a class="text-link" href="#colecao-relogios">Explorar a seleção ${icon('arrow')}</a></div>
<figure class="watch-hero-photo"><img src="assets/relogios/orient-18.webp" width="720" height="960" alt="Relógio Orient automático prateado com mostrador verde" fetchpriority="high" decoding="async"><figcaption>Três marcas. Muitos jeitos de acompanhar o dia.</figcaption></figure>
</section>
<section class="watch-collection wrap" id="colecao-relogios" aria-labelledby="watch-collection-title">
<div class="watch-collection-heading"><p class="eyebrow">ESCOLHA PELOS DETALHES</p><h2 id="watch-collection-title">Encontre o seu ritmo.</h2><p>As fotos mostram a seleção enviada pela loja. Preço e disponibilidade são confirmados no atendimento.</p></div>
<nav class="watch-brand-nav" aria-label="Ir para uma marca de relógios">${watchBrands.map(brand => `<a href="#relogios-${brand.id}" aria-label="Ver relógios ${brand.name}"><img src="assets/relogios/${brand.logo}" width="160" height="160" alt="" loading="lazy" decoding="async"><span>${brand.name} ${icon('arrow')}</span></a>`).join('')}</nav>
${watchBrands.map((brand, i) => `<section class="watch-chapter" id="relogios-${brand.id}" aria-labelledby="watch-${brand.id}-title"><div class="watch-chapter-heading"><span class="watch-chapter-index">0${i + 1} / 03</span><div><h2 id="watch-${brand.id}-title">${brand.name}</h2><p>${brand.intro}</p></div><span class="watch-chapter-count">${brand.watches.length} relógios</span></div><div class="watch-grid">${brand.watches.map((watch, index) => watchCard(brand, watch, index)).join('')}</div></section>`).join('')}
<p class="watch-selection-note">As imagens apresentam os relógios da seleção da Pupila. Confirme a referência, as características, o preço e a disponibilidade da peça com a equipe da loja.</p>
</section>`;

  function catalog(category, message) {
    const [route, name, description, symbol] = category;
    const availableProducts = products.filter(product => product.categories.includes(route));
    if ((route === 'oculos-de-grau' || route === 'oculos-de-sol') && availableProducts.length >= 2) return eyewearCatalog(category, availableProducts, message);
    if (route === 'relogios') return watchPage;
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
<div class="button-row">${chat('Consultar a seleção', message)}</div>
</div>
</div>
${availableProducts.length ? `<div class="catalog-grid">${availableProducts.map(productCard).join('')}</div>` : ''}
</section>`;
  }
  function productPage(product, message) {
    const catalogCategory = categories.find(([route]) => route === product.categories[0]);
    const facts = `<dl class="product-facts">${product.facts.map(([term, detail]) => `<div><dt>${term}</dt><dd>${detail}</dd></div>`).join('')}</dl>`;
    const help = product.slug === 'ray-ban-meta' ? productHelp('ray-ban-meta', 'oculos-de-grau') : productHelp(catalogCategory[0], 'cuidados');
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
${chat('Quero conhecer de perto', message)}<p class="availability-note">Tamanho, preço e disponibilidade sob consulta à loja.</p>
${link(catalogCategory[0], `Voltar para ${catalogCategory[1].toLowerCase()}`, 'text-link')}
<section class="product-details" aria-labelledby="product-details-title">
<h2 id="product-details-title">Ficha do modelo</h2>
${product.identificationPending ? `<p class="product-identification-note">${product.catalogUrl ? 'Referência sugerida por comparação visual. Confirme a peça com a loja.' : 'Confirme o nome comercial e a referência desta peça com a loja.'}</p>` : ''}
${facts}
${product.support ? `<p class="product-support-note">${product.support}</p>` : ''}
${product.story ? `<h3>O desenho da linha</h3><p>${product.story}</p>` : ''}
</section></div>
</section>${help}${brandCarousel}`;
  }
  const pages = {
    ...existing,
    'index.html': { title: 'Ótica Pupila | Ótica em Joinville desde 1992', content: home, message: homeMessage },
    'visioffice-3/index.html': {
      title: 'Visioffice 3 e medição digital em Joinville | Ótica Pupila',
      description: 'Veja como a Ótica Pupila, em Joinville, usa o Visioffice 3 da Essilor, Eyecode, H3D e a medição de perto para personalizar lentes compatíveis.',
      content: visioffice
    }
  };
  products.forEach(product => {
    const prescription = product.categories[0] === 'oculos-de-grau';
    const type = prescription ? 'Armação de grau' : 'Óculos de sol';
    const model = product.modelDetail ? `${product.brand} ${product.modelDetail}` : product.brand;
    const isMeta = product.slug === 'ray-ban-meta';
    const title = isMeta ? 'Ray-Ban Meta Wayfarer Gen 3' : `${type} ${model}`;
    const item = isMeta ? `o ${title}` : `${prescription ? 'a' : 'os'} ${type.toLowerCase()} ${model}`;
    const message = `Olá! Vi ${item} no site da Pupila. Qual o preço e a disponibilidade?`;
    pages[`${product.route}/index.html`] = {
      title: `${title} | Ótica Pupila`,
      description: `${product.description} Ótica Pupila em Joinville.`,
      content: productPage(product, message), message
    };
  });
  categories.filter(c => c[0] !== 'lentes').forEach(c => {
    const message = `Olá! Vi a seleção de ${c[1].toLowerCase()} no site da Pupila. Gostaria de consultar as opções disponíveis e os preços.`;
    const related = c[0].startsWith('oculos-') ? 'cuidados' : 'atendimento';
    const brands = c[0].startsWith('oculos-') ? brandCarousel : '';
    pages[`${c[0]}/index.html`] = { title: c[0] === 'relogios' ? 'Relógios Orient, Lince e X-Games em Joinville | Ótica Pupila' : `${c[1]} | Ótica Pupila`, content: catalog(c, message) + productHelp(c[0], related) + brands, message };
  });
  window.PUPILA_CHROME = { header, footer, chat, productHelp };
  window.PUPILA_PAGES = Object.fromEntries(Object.entries(pages).map(([route, page]) => [route, {
    title: page.title,
    description: page.description,
    html: `${header}<main id="conteudo" tabindex="-1">${page.content}</main>${footer(page.message)}`
  }]));
})();
