import siteContent from './site-content.json'

export const img = (filename) => `/images/${filename.replace(/\.(png|jpe?g)$/i, '.webp')}`

export const navLinks = [
  { label: 'Обо мне', href: '#obo-mne' },
  { label: 'Услуги', href: '#uslugi' },
  { label: 'Этапы работы', href: '#process' },
  { label: 'Цены', href: '#pricing' },
  { label: 'Отзывы', href: '#testimonials' },
]

export const socialLinks = [
  { platform: 'Instagram', url: 'https://www.instagram.com/chinadao.ru/' },
  { platform: 'VK', url: 'https://vk.com/chinadaoru' },
  { platform: 'Telegram', url: 'https://t.me/chinadao_katya' },
]

export const hero = {
  title: ['Помогу осуществить', 'мечту обучаться', 'в Китае'],
  paragraphs: [
    '你好，我的朋友! Меня зовут Екатерина Гантимурова, и уже более 5 лет я помогаю студентам поступать в лучшие вузы Китая.',
    'Если вы тоже мечтаете учиться в Китае, я с радостью стану вашим личным куратором. Мы вместе пройдём весь путь: от выбора программ обучения и подготовки документов до успешного зачисления в университет.',
    'Обучение в Китае — это уникальная возможность получить качественное международное образование, и я готова сделать путь к поступлению максимально простым и понятным для вас. Доверьтесь моему опыту, и вместе мы достигнем вашей цели!',
  ],
  cta: 'Связаться со мной',
  badge: '+110 успешных поступлений',
  photo: img('hero-portrait.png'),
  chinaText: img('hero-china.png'),
  mainImage: img('hero-photo.jpg'),
  lanterns: img('hero-lanterns.png'),
  avatars: [
    img('hero-avatar-1.png'),
    img('hero-avatar-2.png'),
    img('hero-avatar-3.png'),
  ],
}

export const offers = {
  title: 'Более 130 офферов на бюджетное обучение в Китае',
  text: 'Мои клиенты из разных стран уже обладатели более 130 офферов на обучение в Китае с полными стипендиями, и уже сейчас получают высшее образование в Поднебесной.',
  doodle: img('offers-doodle.png'),
  images: [
    'offer-01.png',
    'offer-02.png',
    'offer-03.png',
    'offer-04.jpg',
    'offer-05.png',
    'offer-06.jpg',
    'offer-07.png',
    'offer-08.jpg',
    'offer-09.png',
    'offer-10.png',
    'offer-11.jpg',
    'offer-12.png',
    'offer-13.png',
    'offer-14.png',
  ].map(img),
}

export const about = {
  title: 'Обо мне',
  paragraphs: [
    'Привет! Меня зовут Екатерина Гантимурова, и моя цель — помочь вам поступить в один из ведущих университетов Китая. Я сама прошла этот путь: обучалась на языковых курсах и на магистратуре в Shanghai International Studies University по специальности «China Studies», а после в Shanghai Jiao Tong University по направлению «Translation and Interpreting», получив три престижные стипендии — Confucius Institute Scholarship, Chinese Government Scholarship и стипендию от SJTU.',
    'Более 5-ти лет помогаю студентам поступать в Китай. Работала в сфере образования в компании Univibes, где являлась топовым куратором по Китаю. Оказывала помощь в поступлении в учебные заведения Китая, консультируя иностранных студентов, помогая с подбором программ, подготовкой документов и подачей заявок.',
  ],
  cta: 'Подробнее',
  photo: img('about-photo.jpg'),
  doodle: img('about-doodle.png'),
  sticker: img('about-sticker.png'),
  bgMap: img('about-map.png'),
  extraTitle: 'Мой опыт и достижения',
  stacks: {
    block1: [
      '/about/gallery-1.webp',
      '/about/gallery-2.webp',
      '/about/gallery-3.webp',
      '/about/gallery-4.webp',
      '/about/gallery-5.webp',
      '/about/gallery-6.webp',
    ],
    block2: [
      '/about/gallery-7.webp',
      '/about/gallery-8.webp',
      '/about/gallery-9.webp',
      '/about/gallery-10.webp',
      '/about/gallery-11.webp',
      '/about/gallery-12.webp',
    ],
    block3: [
      '/about/gallery-13.webp',
      '/about/gallery-14.webp',
      '/about/gallery-15.webp',
      '/about/gallery-16.webp',
      '/about/gallery-17.webp',
      '/about/gallery-18.webp',
    ],
  },
}

export const services = {
  title: 'Услуги, которые я предлагаю',
  doodle: img('services-doodle.png'),
  tabs: ['Языковые курсы', 'Высшее образование', 'Консультации', 'Подбор программ'],
  items: [
    {
      title: 'Языковые курсы',
      photo: img('service-language.jpg'),
      deco: img('service-deco-a.png'),
      decoFit: 'contain',
      text: 'Полностью сопровождаю процесс поступления на языковые курсы в университеты Китая, включая программы длительностью 1 год (Long-term course) или на полгода (Short-term course). Эти курсы подойдут как для начинающих, так и для тех, кто хочет улучшить свой уровень языка для сдачи экзамена HSK и для успешного поступления на бакалавриат и магистратуру. Я помогу вам выбрать подходящую программу, правильно оформить документы и пройти все этапы поступления.',
    },
    {
      title: 'Высшее образование',
      photo: img('service-degree.jpg'),
      deco: img('service-deco-b.png'),
      decoFit: 'contain',
      subsections: [
        {
          subtitle: 'Поступление на бакалавриат',
          text: 'Для поступления на бакалавриат выберем программы, которые соответствуют вашим академическим целям, интересам, карьерным планам и уровню языка. Также подберу подходящие стипендии и помогу на каждом этапе подачи документов для успешного поступления в лучшие университеты Китая.',
        },
        {
          subtitle: 'Поступление на магистратуру',
          text: 'Для поступления на магистратуру я не только подберу подходящие программы и стипендии, но и помогу с подготовкой ключевых документов, включая план диссертации. Также я окажу поддержку в поиске научного руководителя, который соответствует вашим интересам и тематике исследования. Моя задача — сделать этот процесс поступления максимально понятным и комфортным для вас.',
        },
      ],
    },
    {
      title: 'Консультации',
      photo: img('service-consult.jpg'),
      deco: img('service-deco-c.png'),
      decoFit: 'contain',
      text: 'Индивидуальная консультация — это основа для успешного выбора образовательной траектории. Перед встречей я изучу вашу анкету, чтобы понять ваши цели, опыт и академические достижения. Во время консультации дам ответы на ваши вопросы. Также мы детально разберем ваши сильные стороны, академический опыт, чтобы оценить ваши шансы на поступление. Обсудим наиболее подходящие программы и возможности, учитывая ваши интересы и перспективы. Вы получите рекомендации, адаптированные под ваш индивидуальный случай, а также четкий план дальнейших шагов для успешного поступления.',
    },
    {
      title: 'Подбор программ',
      photo: img('service-programs.jpg'),
      deco: img('service-deco-a.png'),
      decoFit: 'contain',
      text: 'Подбор программ требует тщательного анализа ваших целей, академической подготовки и карьерных планов. Я учитываю все важные детали, чтобы предложить оптимальные варианты обучения, включая программы с возможностью получения стипендии. Вы получите персонализированный список подходящих вариантов, который максимально соответствует вашим требованиям и критериям.',
    },
  ],
  whyTitle: 'Почему стоит обратиться ко мне?',
  whyItems: [
    { title: 'Индивидуальный подход к каждому студенту', text: 'Я лично сопровождаю вас на всех этапах поступления, вникаю в ваши цели и помогаю раскрыть потенциал. Каждый документ составляется, чтобы подчеркнуть ваши сильные стороны и выделить среди других кандидатов.' },
    { title: 'Многолетний опыт в сфере образования', text: 'Более 5 лет я успешно помогаю студентам поступать в ведущие университеты Китая.' },
    { title: 'Личный опыт обучения и жизни в Китае', text: '3 года проживания в Шанхае по стипендиям, обучение на двух магистратурах и участие в международных конференциях.' },
    { title: 'Глубокое знание системы образования Китая', text: 'Знаю все нюансы поступления, выбора программ и взаимодействия с университетами.' },
    { title: 'Работа с топовыми университетами Китая', text: 'Сотрудничаю только с ведущими государственными вузами, включая стипендиальные программы.' },
    { title: 'Профессиональная коммуникация с вузами', text: 'Свободное владение китайским и английским языками позволяет эффективно взаимодействовать с университетами.' },
  ],
}

export const processSteps = siteContent.processSteps

const pricingMeta = {
  'Пакет 1+1': { price: '₽100.000', duration: '/ до 9 месяцев' },
  'Пакет 3+3': { price: '₽150.000', duration: '/ до 9 месяцев', popular: true },
  'Пакет 5+5': { price: '₽190.000', duration: '/ до 9 месяцев' },
}

export const pricingPackages = Object.entries(siteContent.pricing).map(([name, data]) => ({
  name,
  price: pricingMeta[name].price,
  duration: pricingMeta[name].duration,
  popular: pricingMeta[name].popular,
  summary: data.summary,
  features: data.features,
  paymentNote: 'Поэтапная оплата в 4-5 платежей',
}))

export const otherServices = siteContent.otherServices

function mapTestimonial(t) {
  return {
    ...t,
    photo: t.photo ? img(t.photo) : null,
    avatar: t.avatar ? img(t.avatar) : null,
  }
}

export const testimonials = siteContent.testimonials.map(mapTestimonial)
export const modalTestimonials = siteContent.modalTestimonials.map(mapTestimonial)

export const faqItems = siteContent.faq

export const contactForm = {
  title: 'Оставить заявку:',
  altText: 'Или напишите мне в мессенджере:',
  messengerOptions: ['Telegram', 'WhatsApp', 'Instagram'],
  serviceOptions: ['Пакет 1+1', 'Пакет 3+3', 'Пакет 5+5', 'Консультация', 'Подбор программ', 'Языковые курсы'],
  formspreeUrl: 'https://formspree.io/f/xwvbkepn',
}

export const footer = {
  brand: 'ChinaDao',
  description:
    'В китайской философии 道 dào означает путь, который отражает естественное течение жизни и гармонию вселенной. В контексте пути к знаниям, дао символизирует стремление к истине, постоянному развитию и самосовершенствованию, подчеркивая важность следования своему внутреннему пути в поисках глубоких знаний и понимания мира.',
  copyright: 'Copyright © 2026. All right reserved to ChinaDao',
}
