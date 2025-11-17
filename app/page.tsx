import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Telugu Cinema Hub - Games, Fandom, Store & Recommendations',
  description: 'Immerse yourself in Telugu cinema with interactive games like Katha Vintaava and Saregamapa, explore movie details, shop exclusive merchandise, and get daily movie recommendations.',
  keywords: ['Telugu cinema', 'Telugu movies', 'movie games', 'Katha Vintaava', 'Saregamapa', 'Telugu film merchandise', 'movie recommendations'],
  openGraph: {
    title: 'Telugu Cinema Hub',
    description: 'Your ultimate destination for Telugu cinema - games, movies, merchandise, and daily recommendations',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Telugu Cinema Hub',
    description: 'Interactive Telugu cinema experience with games, fandom, and recommendations',
  },
}

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 text-text-primary">
          Telugu Cinema Hub
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Immerse yourself in Telugu cinema with interactive games, detailed movie info, exclusive merchandise, and personalized recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Katha Vintaava */}
        <Link href="/games/katha-vintaava" className="group">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-8 hover:border-border-hover hover:bg-bg-tertiary transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-text-primary">Katha Vintaava</h2>
            </div>
            <p className="text-text-secondary mb-6">
              Test your Telugu cinema knowledge by guessing movies from progressive clues
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>6 attempts to guess the movie</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Progressive clue reveals</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>New daily challenges</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Saregamapa */}
        <Link href="/games/saregamapa" className="group">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-8 hover:border-border-hover hover:bg-bg-tertiary transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-text-primary">Saregamapa</h2>
            </div>
            <p className="text-text-secondary mb-6">
              Identify Telugu songs from audio clips that progressively get longer
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Listen to audio snippets</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Unlock more seconds per guess</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Popular Telugu movie songs</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Fandom */}
        <Link href="/fandom" className="group">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-8 hover:border-border-hover hover:bg-bg-tertiary transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-text-primary">Fandom</h2>
            </div>
            <p className="text-text-secondary mb-6">
              Explore comprehensive information about Telugu movies, cast, and crew
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Browse extensive movie catalog</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Detailed cast & crew info</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Ratings and reviews</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Store */}
        <Link href="/store" className="group">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-8 hover:border-border-hover hover:bg-bg-tertiary transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-text-primary">Store</h2>
            </div>
            <p className="text-text-secondary mb-6">
              Shop for exclusive Telugu movie merchandise and collectibles
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Movie posters</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Apparel & accessories</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Rare collectibles</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Recommendations - Full Width */}
        <Link href="/recommendations" className="group md:col-span-2">
          <div className="bg-bg-secondary border border-border-primary rounded-xl p-8 hover:border-border-hover hover:bg-bg-tertiary transition-all duration-200 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-text-primary">Daily Recommendations</h2>
            </div>
            <p className="text-text-secondary mb-6">
              Discover handpicked Telugu movies curated just for you every day
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Expert-curated picks</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Personalized suggestions</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <svg className="w-4 h-4 text-accent-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Watch history tracking</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
