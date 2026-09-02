import { useEffect } from 'react'
import site from '../data/site-content.json'
import { useLocale } from '../i18n/LocaleContext'

export const SITE_URL = 'https://www.chinadao.ru'
const OG_IMAGE = `${SITE_URL}/og.jpg`

function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value))
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export default function Seo() {
  const { lang, t } = useLocale()

  useEffect(() => {
    const title = t.meta.title
    const description = t.meta.description
    document.title = title
    document.documentElement.lang = lang

    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: lang === 'en' ? 'en_US' : 'ru_RU' })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    upsertLink('canonical', `${SITE_URL}/`)
  }, [lang, t])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#organization`,
        name: 'ChinaDao',
        url: `${SITE_URL}/`,
        image: OG_IMAGE,
        logo: `${SITE_URL}/images/logo.png`,
        description: t.meta.description,
        inLanguage: ['ru', 'en'],
        areaServed: 'Worldwide',
        sameAs: [
          'https://www.instagram.com/chinadao.ru/',
          'https://vk.com/chinadaoru',
          'https://t.me/chinadao_katya',
        ],
        founder: { '@id': `${SITE_URL}/#person` },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: String(site.testimonials.length),
          bestRating: '5',
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Екатерина Гантимурова',
        alternateName: 'Ekaterina Gantimurova',
        jobTitle: lang === 'en' ? 'Admission curator for universities in China' : 'Куратор поступления в вузы Китая',
        url: `${SITE_URL}/`,
        image: `${SITE_URL}/images/hero-photo.jpg`,
        worksFor: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: 'ChinaDao',
        inLanguage: lang === 'en' ? 'en' : 'ru',
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: site.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
