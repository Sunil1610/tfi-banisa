import type { Metadata } from 'next'
import './globals.css'
import { Layout } from '@/components/layout'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://telugu-cinema-hub.vercel.app'),
  title: {
    default: 'Telugu Cinema Hub - Games, Fandom, Store & Recommendations',
    template: '%s | Telugu Cinema Hub',
  },
  description:
    'Immerse yourself in Telugu cinema with interactive games, explore comprehensive movie information, shop exclusive merchandise, and discover daily movie recommendations.',
  keywords: [
    'Telugu cinema',
    'Telugu movies',
    'Tollywood',
    'movie games',
    'Katha Vintaava',
    'Saregamapa',
    'Telugu film',
    'movie merchandise',
    'movie recommendations',
  ],
  authors: [{ name: 'Telugu Cinema Hub' }],
  creator: 'Telugu Cinema Hub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://telugu-cinema-hub.vercel.app',
    title: 'Telugu Cinema Hub',
    description:
      'Your ultimate destination for Telugu cinema - interactive games, movie information, merchandise, and daily recommendations',
    siteName: 'Telugu Cinema Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telugu Cinema Hub',
    description:
      'Interactive Telugu cinema experience with games, fandom, and personalized recommendations',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
