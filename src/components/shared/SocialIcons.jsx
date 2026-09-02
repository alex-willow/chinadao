import { img, socialLinks } from '../../data/content'
import './SocialIcons.css'

const vkDefault = img('vk.png')
const vkHover = img('vk-hover.png')
const vkFooter = img('vk-footer.png')

function InstagramIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className="social-icons__icon" aria-hidden="true">
      <path
        d="M176,32H80A48,48,0,0,0,32,80v96a48,48,0,0,0,48,48h96a48,48,0,0,0,48-48V80A48,48,0,0,0,176,32ZM128,168a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"
        opacity="0.2"
      />
      <path d="M176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm64-84a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z" />
    </svg>
  )
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className="social-icons__icon" aria-hidden="true">
      <path
        d="M223.41,32.09,80,134.87,21,123.3A6.23,6.23,0,0,1,20,111.38L222.63,32.07A1,1,0,0,1,223.41,32.09ZM80,200a8,8,0,0,0,13.76,5.56l30.61-31.76L80,134.87Z"
        opacity="0.2"
      />
      <path d="M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19ZM78.15,126.35l-49.61-9.73,139.2-54.48ZM88,200V152.52l24.79,21.74Zm87.53,8L92.85,135.5l119-85.29Z" />
    </svg>
  )
}

const variantOrder = {
  header: ['Instagram', 'VK', 'Telegram'],
  contact: ['Telegram', 'VK', 'Instagram'],
  footer: ['Telegram', 'VK', 'Instagram'],
}

export default function SocialIcons({ className = '', variant = 'header' }) {
  const vkSrc = variant === 'footer' ? vkFooter : vkDefault
  const order = variantOrder[variant] || variantOrder.header
  const links = [...socialLinks].sort(
    (a, b) => order.indexOf(a.platform) - order.indexOf(b.platform),
  )

  return (
    <div className={`social-icons social-icons--${variant} ${className}`}>
      {links.map((s) => (
        <a
          key={s.platform}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-icons__link social-icons__link--${s.platform.toLowerCase()}`}
          aria-label={s.platform}
        >
          {s.platform === 'Instagram' && <InstagramIcon />}
          {s.platform === 'Telegram' && <TelegramIcon />}
          {s.platform === 'VK' && (
            <span className="social-icons__vk-wrap">
              <img src={vkSrc} alt="" className="social-icons__vk" />
              {variant === 'header' && (
                <img src={vkHover} alt="" className="social-icons__vk social-icons__vk--hover" />
              )}
            </span>
          )}
        </a>
      ))}
    </div>
  )
}
