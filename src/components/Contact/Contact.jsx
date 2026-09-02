import { useState } from 'react'
import { img, contactForm } from '../../data/content'
import { useLocale, pathForPage } from '../../i18n/LocaleContext'
import SocialIcons from '../shared/SocialIcons'
import ImageButton from '../shared/ImageButton'
import DrawnSelect from '../shared/DrawnSelect'
import DrawnField from '../shared/DrawnField'
import Reveal from '../shared/Reveal'
import './Contact.css'

export default function Contact() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formKey, setFormKey] = useState(0)
  const { t, lang, navigate } = useLocale()

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
        setFormKey((key) => key + 1)
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
                <DrawnField key={`${formKey}-name`} name="Имя" type="text" required />
              </label>
              <div className="contact__field">
                <span className="contact__label">{t.contact.messenger}</span>
                <DrawnSelect
                  key={`${formKey}-messenger`}
                  name="Месенджер"
                  required
                  placeholder={t.contact.choose}
                  options={contactForm.messengerOptions.map((option) => ({
                    value: option,
                    label: option,
                  }))}
                />
              </div>
            </div>

            <div className="contact__row">
              <label className="contact__field">
                <span className="contact__label">{t.contact.nick}</span>
                <DrawnField key={`${formKey}-nick`} name="Ваш ник в мессенджере" type="text" required />
              </label>
              <div className="contact__field">
                <span className="contact__label">{t.contact.service}</span>
                <DrawnSelect
                  key={`${formKey}-service`}
                  name="Услуга"
                  required
                  placeholder={t.contact.choose}
                  options={contactForm.serviceOptions.map((option, i) => ({
                    value: option,
                    label: t.contact.serviceOptions[i],
                  }))}
                />
              </div>
            </div>

            <label className="contact__field">
              <span className="contact__label">{t.contact.message}</span>
              <DrawnField key={`${formKey}-message`} as="textarea" name="Сообщение" required rows={4} />
            </label>

            <label className="contact__consent">
              <input
                type="checkbox"
                name="Согласие с политикой конфиденциальности"
                value="да"
                required
              />
              <span>
                {t.contact.consent}
                <br />
                <a
                  href={pathForPage(lang, 'privacy')}
                  onClick={(event) => {
                    event.preventDefault()
                    navigate(pathForPage(lang, 'privacy'))
                  }}
                >
                  {t.contact.consentLink}
                </a>
              </span>
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
