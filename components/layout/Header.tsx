'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-bg-secondary border-b border-border-primary md:hidden">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-lg font-semibold text-text-primary">
              Telugu Cinema Hub
            </h1>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-text-primary p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="mt-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Games
            </Link>
            <Link
              href="/fandom"
              className="block px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Fandom
            </Link>
            <Link
              href="/store"
              className="block px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Store
            </Link>
            <Link
              href="/recommendations"
              className="block px-4 py-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Recommendations
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
