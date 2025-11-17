'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  {
    name: 'Games',
    href: '/',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    subItems: [
      { name: 'Katha Vintaava', href: '/games/katha-vintaava' },
      { name: 'Saregamapa', href: '/games/saregamapa' }
    ]
  },
  {
    name: 'Fandom',
    href: '/fandom',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
      </svg>
    )
  },
  {
    name: 'Store',
    href: '/store',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )
  },
  {
    name: 'Recommendations',
    href: '/recommendations',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  }
]

export const Sidebar: React.FC = () => {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Games'])

  const toggleExpand = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]
    )
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 bg-bg-secondary border-r border-border-primary min-h-screen p-6 hidden md:block">
      <Link href="/">
        <h1 className="text-xl font-semibold mb-8 text-text-primary">
          Telugu Cinema Hub
        </h1>
      </Link>

      <nav className="space-y-2">
        {navigation.map((item) => (
          <div key={item.name}>
            <Link
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-bg-tertiary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              }`}
              onClick={(e) => {
                if (item.subItems) {
                  e.preventDefault()
                  toggleExpand(item.name)
                }
              }}
            >
              <div className="flex items-center space-x-3">
                {item.icon}
                <span>{item.name}</span>
              </div>
              {item.subItems && (
                <svg
                  className={`w-4 h-4 transition-transform ${
                    expandedItems.includes(item.name) ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </Link>

            {item.subItems && expandedItems.includes(item.name) && (
              <div className="ml-6 mt-2 space-y-2">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                      pathname === subItem.href
                        ? 'bg-bg-tertiary text-text-primary'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
                    }`}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}
