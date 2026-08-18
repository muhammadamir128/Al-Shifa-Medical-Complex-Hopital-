import * as React from "react"

/**
 * Brand glyph — a medical cross. Uses `currentColor` so it inherits text color.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="12.4" y="3" width="7.2" height="26" rx="2.6" />
      <rect x="3" y="12.4" width="26" height="7.2" rx="2.6" />
    </svg>
  )
}

/**
 * Decorative medical illustration for auth pages — a stylised patient-portal
 * screen surrounded by floating health badges. Purely decorative SVG.
 */
export function MedicalIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 460 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <defs>
        <filter id="mi-shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#0b1220" floodOpacity="0.22" />
        </filter>
        <linearGradient id="mi-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f6f9f7" />
        </linearGradient>
      </defs>

      {/* Decorative back circles */}
      <circle cx="230" cy="210" r="190" fill="#ffffff" fillOpacity="0.07" />
      <circle cx="230" cy="210" r="142" fill="#ffffff" fillOpacity="0.07" />

      {/* Scattered plus marks */}
      <g stroke="#ffffff" strokeOpacity="0.45" strokeWidth="3.4" strokeLinecap="round">
        <path d="M52 250 v14 M45 257 h14" />
        <path d="M404 246 v12 M398 252 h12" />
        <path d="M86 392 v12 M80 398 h12" />
      </g>

      {/* App screen card */}
      <g filter="url(#mi-shadow)">
        <rect x="130" y="52" width="200" height="320" rx="26" fill="url(#mi-screen)" />
      </g>

      {/* Header */}
      <rect x="150" y="74" width="40" height="40" rx="12" fill="#dcfce7" />
      <rect x="166.5" y="82" width="7" height="24" rx="2.4" fill="#16a34a" />
      <rect x="158" y="90.5" width="24" height="7" rx="2.4" fill="#16a34a" />
      <rect x="200" y="80" width="86" height="9" rx="4.5" fill="#16a34a" fillOpacity="0.30" />
      <rect x="200" y="96" width="54" height="7" rx="3.5" fill="#cbd5e1" />

      {/* Heartbeat hero card */}
      <rect x="150" y="128" width="160" height="88" rx="16" fill="#16a34a" />
      <rect x="164" y="142" width="48" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.55" />
      <path
        d="M164 184 H187 L196 164 L209 206 L221 176 L228 184 H296"
        stroke="#ffffff"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="296" cy="184" r="4.6" fill="#ffffff" />

      {/* Stat card — left */}
      <rect x="150" y="230" width="75" height="62" rx="14" fill="#f0fdf4" />
      <circle cx="169" cy="251" r="11" fill="#bbf7d0" />
      <path
        d="M164.5 251 L168 254.5 L174 248"
        stroke="#16a34a"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="162" y="270" width="52" height="6" rx="3" fill="#86efac" />
      <rect x="162" y="280" width="34" height="6" rx="3" fill="#bbf7d0" />

      {/* Stat card — right */}
      <rect x="235" y="230" width="75" height="62" rx="14" fill="#f0fdf4" />
      <circle cx="254" cy="251" r="11" fill="#bbf7d0" />
      <rect x="250.6" y="245.4" width="6.8" height="11.2" rx="2" fill="#16a34a" />
      <rect x="248.4" y="247.6" width="11.2" height="6.8" rx="2" fill="#16a34a" />
      <rect x="247" y="270" width="52" height="6" rx="3" fill="#86efac" />
      <rect x="247" y="280" width="34" height="6" rx="3" fill="#bbf7d0" />

      {/* CTA bar */}
      <rect x="150" y="306" width="160" height="42" rx="12" fill="#16a34a" />
      <rect x="200" y="323" width="60" height="8" rx="4" fill="#ffffff" fillOpacity="0.85" />

      {/* Floating badge — cross (top-left) */}
      <g filter="url(#mi-shadow)">
        <circle cx="88" cy="148" r="34" fill="#ffffff" />
      </g>
      <g transform="translate(88,148)">
        <rect x="-4" y="-13" width="8" height="26" rx="2.6" fill="#16a34a" />
        <rect x="-13" y="-4" width="26" height="8" rx="2.6" fill="#16a34a" />
      </g>

      {/* Floating badge — heart (top-right) */}
      <g filter="url(#mi-shadow)">
        <circle cx="372" cy="112" r="30" fill="#ffffff" />
      </g>
      <path
        transform="translate(372,114)"
        d="M0 11 C0 11 -12 3.4 -12 -5 C-12 -9.4 -8.6 -12 -5 -12 C-2.1 -12 0 -9.6 0 -7.4 C0 -9.6 2.1 -12 5 -12 C8.6 -12 12 -9.4 12 -5 C12 3.4 0 11 0 11 Z"
        fill="#f43f5e"
      />

      {/* Floating badge — shield check (bottom-left) */}
      <g filter="url(#mi-shadow)">
        <circle cx="92" cy="320" r="32" fill="#ffffff" />
      </g>
      <g transform="translate(92,320)">
        <path d="M0 -14 L13 -9 V3 C13 11 0 16 0 16 C0 16 -13 11 -13 3 V-9 Z" fill="#16a34a" />
        <path
          d="M-6 0 L-2 4.5 L6 -4.8"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Floating badge — pill (bottom-right) */}
      <g filter="url(#mi-shadow)">
        <circle cx="372" cy="312" r="32" fill="#ffffff" />
      </g>
      <g transform="translate(372,312) rotate(45)">
        <rect x="-17" y="-9.5" width="34" height="19" rx="9.5" fill="#16a34a" />
        <path
          d="M-17 0 a9.5 9.5 0 0 1 9.5 -9.5 h7.5 v19 h-7.5 a9.5 9.5 0 0 1 -9.5 -9.5 z"
          fill="#bbf7d0"
        />
        <line x1="0" y1="-9.5" x2="0" y2="9.5" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" />
      </g>
    </svg>
  )
}
