'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/raids', label: 'Raids' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-gold/10 bg-[#0d0b0e]/80 px-6 py-4 shadow-[0_1px_12px_rgba(201,168,76,0.06)] backdrop-blur-xl">
      <span className="font-display text-xl font-bold tracking-wider text-gold-light">Happy Hour Heroes</span>

      {/* Desktop links */}
      <ul className="hidden gap-8 md:flex">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={pathname === href
                ? 'font-display font-semibold tracking-wide text-gold-light'
                : 'font-display tracking-wide text-off-white transition-colors duration-300 hover:text-gold-light'}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger button */}
      <button
        aria-label="Menu"
        className="text-off-white md:hidden"
        onClick={() => setMobileMenuOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div data-testid="mobile-menu" className="fixed inset-0 z-50 flex flex-col bg-[#0d0b0e]/95 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg font-bold tracking-wider text-gold">Happy Hour Heroes</span>
            <button
              aria-label="Close"
              className="text-off-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <ul className="mt-8 flex flex-col gap-6">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={pathname === href
                    ? 'font-display text-xl font-semibold tracking-wide text-gold'
                    : 'font-display text-xl tracking-wide text-off-white transition-colors duration-300 hover:text-gold-light'}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
