import { useId } from 'react'
import './CountryFlag.css'

export default function CountryFlag({ country, size = 20, className = '' }) {
  const normalizedCountry = country?.toLowerCase()
  const clipId = useId()

  return (
    <svg
      className={`country-flag ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {normalizedCountry === 'ru' ? <RussiaFlag /> : <UnitedStatesFlag />}
      </g>
    </svg>
  )
}

function RussiaFlag() {
  return (
    <>
      <rect width="24" height="24" fill="#F0F0F0" />
      <rect y="7.83" width="24" height="9.39" fill="#0052B4" />
      <rect y="16.17" width="24" height="7.83" fill="#D80027" />
    </>
  )
}

function UnitedStatesFlag() {
  return (
    <>
      <rect width="24" height="24" fill="#F0F0F0" />
      <rect y="2.61" width="24" height="3.13" fill="#D80027" />
      <rect y="8.87" width="24" height="3.13" fill="#D80027" />
      <rect y="15.13" width="24" height="3.13" fill="#D80027" />
      <rect y="21.39" width="24" height="2.61" fill="#D80027" />
      <rect width="12" height="12" fill="#0052B4" />
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 4 }).map((__, column) => (
          <circle
            key={`${row}-${column}`}
            cx={2 + column * 2.6}
            cy={2 + row * 2.6}
            r="0.45"
            fill="#F0F0F0"
          />
        )),
      )}
    </>
  )
}
