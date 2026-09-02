import { useState } from 'react'
import './DrawnField.css'

export default function DrawnField({
  as = 'input',
  className = '',
  onInput,
  ...props
}) {
  const [filled, setFilled] = useState(false)
  const Tag = as

  return (
    <div
      className={`drawn-field${filled ? ' is-filled' : ''}${as === 'textarea' ? ' drawn-field--area' : ''} ${className}`.trim()}
    >
      <span className="drawn drawn--outline" aria-hidden="true" />
      <Tag
        {...props}
        onInput={(event) => {
          setFilled(event.currentTarget.value.trim() !== '')
          onInput?.(event)
        }}
      />
    </div>
  )
}
