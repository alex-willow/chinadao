import { useState } from 'react'
import { img, contactForm } from '../../data/content'
import { useLocale } from '../../i18n/LocaleContext'
import SocialIcons from '../shared/SocialIcons'
import ImageButton from '../shared/ImageButton'
import Reveal from '../shared/Reveal'
import './Contact.css'

export default function Contact() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const { t } = useLocale()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch(contactForm.formspreeUrl, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact" id="cta">
      <div className="contact__inner">
        <Reveal className="contact__form-col">
          <h2 className="contact__title">{t.contact.title}</h2>

          <form className="contact__form" onSubmit={handleSubmit}>
            <div className="contact__row">
              <label className="contact__field">
                <span className="contact__label">{t.contact.name}</span>
                <input name="Имя" type="text" required />
              </label>
              <label className="contact__field">
                <span className="contact__label">{t.contact.messenger}</span>
                <span className="contact__select">
                  <select name="Месенджер" required defaultValue="">
                    <option value="" disabled>
                      {t.contact.choose}
                    </option>
                    {contactForm.messengerOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </div>

            <div className="contact__row">
              <label className="contact__field">
                <span className="contact__label">{t.contact.nick}</span>
                <input name="Ваш ник в мессенджере" type="text" required />
              </label>
              <label className="contact__field">
                <span className="contact__label">{t.contact.service}</span>
                <span className="contact__select">
                  <select name="Услуга" required defaultValue="">
                    <option value="" disabled>
                      {t.contact.choose}
                    </option>
                    {contactForm.serviceOptions.map((o, i) => (
                      <option key={o} value={o}>
                        {t.contact.serviceOptions[i]}
                      </option>
                    ))}
                  </select>
                </span>
              </label>
            </div>

            <label className="contact__field">
              <span className="contact__label">{t.contact.message}</span>
              <textarea name="Сообщение" required rows={4} />
            </label>

            <div className="contact__submit-row">
              <ImageButton type="submit" className="contact__submit" disabled={loading}>
                {loading ? t.contact.sending : t.contact.submit}
              </ImageButton>
            </div>

            {status === 'success' && (
              <p className="contact__msg contact__msg--ok">{t.contact.success}</p>
            )}
            {status === 'error' && (
              <p className="contact__msg contact__msg--err">{t.contact.error}</p>
            )}
          </form>

          <div className="contact__alt">
            <p>{t.contact.altText}</p>
            <SocialIcons variant="contact" />
          </div>
        </Reveal>

        <Reveal className="contact__photo-col" delay={120}>
          <div className="contact__photo-frame drawn-photo">
            <span className="drawn-photo__back" aria-hidden="true" />
            <div className="contact__photo-wrap drawn-photo__frame">
              <img
                src={img('contact-photo.jpg')}
                alt={t.hero.photoAlt}
                className="contact__photo"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
