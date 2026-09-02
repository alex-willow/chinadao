import { useLocale } from '../../i18n/LocaleContext'
import './Privacy.css'

export default function Privacy() {
  const { t } = useLocale()

  return (
    <article className="privacy">
      <div className="privacy__inner">
        <h1 className="privacy__title">{t.privacy.title}</h1>
        <p className="privacy__updated">{t.privacy.updated}</p>
        {t.privacy.sections.map((section) => (
          <section key={section.heading} className="privacy__section">
            <h2>{section.heading}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
