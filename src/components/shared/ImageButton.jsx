import { scrollToHref } from '../../utils/scrollTo'
import './ImageButton.css'

const bgDefault = '/images/button.png'
const bgHover = '/images/button-hover.png'

function ButtonInner({ children }) {
  return (
    <>
      <img src={bgDefault} alt="" className="image-btn__bg" decoding="async" />
      <img src={bgHover} alt="" className="image-btn__bg image-btn__bg--hover" decoding="async" />
      <span className="image-btn__text">{children}</span>
    </>
  )
}

export default function ImageButton({ href, children, className = '', type, disabled, onClick }) {
  const sharedClass = `image-btn ${className}`

  if (type === 'submit' || type === 'button') {
    return (
      <button type={type} className={sharedClass} disabled={disabled} onClick={onClick}>
        <ButtonInner>{children}</ButtonInner>
      </button>
    )
  }

  return (
    <a
      href={href}
      className={sharedClass}
      onClick={(event) => {
        if (href?.startsWith('#')) scrollToHref(event, href)
      }}
    >
      <ButtonInner>{children}</ButtonInner>
    </a>
  )
}
