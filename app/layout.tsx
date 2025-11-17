import type { Metadata } from 'next'
import './globals.css'
import { Layout } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Telugu Cinema Hub',
  description: 'Telugu Cinema Hub - Games, Fandom, Store, and Recommendations',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
