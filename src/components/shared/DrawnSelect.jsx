import { useEffect, useId, useRef, useState } from 'react'
import './DrawnSelect.css'

function Chevron({ open }) {
  const path = open
    ? 'M9.99956 9.121L6.28706 12.8335L5.22656 11.773L9.99956 7L14.7726 11.773L13.7121 12.8335L9.99956 9.121Z'
    : 'M9.99956 10.879L13.7121 7.1665L14.7726 8.227L9.99956 13L5.22656 8.227L6.28706 7.1665L9.99956 10.879Z'

  return (
    <svg className="drawn-select__chevron" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  )
}

export default function DrawnSelect({ name, options, placeholder, required = false, className = '' }) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  const rootRef = useRef(null)
  const listId = useId()
  const selected = options.find((item) => item.value === value)

  useEffect(() => {
    function onPointerDown(event) {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    function onKeyDown(event) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <div className={`drawn-select ${className}`.trim()} ref={rootRef}>
      <select
        className="drawn-select__native"
        name={name}
        required={required}
        value={value}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => setValue(event.target.value)}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <button
        type="button"
        className={`drawn-select__trigger${open ? ' is-open' : ''}${value ? ' is-filled' : ' is-placeholder'}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
      >
        <span className="drawn drawn--outline" aria-hidden="true" />
        <span className="drawn-select__value">{selected?.label || placeholder}</span>
        <Chevron open={open} />
      </button>

      <ul
        id={listId}
        className={`drawn-select__menu${open ? ' is-open' : ''}`}
        role="listbox"
        aria-hidden={!open}
      >
        {options.map((item) => (
          <li key={item.value}>
            <button
              type="button"
              className={`drawn-select__option${item.value === value ? ' is-active' : ''}`}
              role="option"
              aria-selected={item.value === value}
              tabIndex={open ? 0 : -1}
              onClick={() => {
                setValue(item.value)
                setOpen(false)
              }}
            >
              <span className="drawn drawn--outline drawn-select__option-hover" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
