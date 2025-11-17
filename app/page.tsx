import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold mb-4">Telugu Cinema Hub</h1>
      <p className="text-text-secondary mb-8">
        Welcome to Telugu Cinema Hub - Your destination for Telugu cinema games, fandom pages, merchandise, and daily recommendations.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/games/katha-vintaava">
          <div className="border border-border-primary rounded-lg p-6 hover:border-border-secondary transition-colors cursor-pointer h-full">
            <h2 className="text-2xl font-semibold mb-2">Katha Vintaava</h2>
            <p className="text-text-secondary mb-4">Movie Guessing Game</p>
            <div className="space-y-2">
              <div className="text-sm text-text-tertiary">• 6 attempts to guess</div>
              <div className="text-sm text-text-tertiary">• Progressive clues</div>
              <div className="text-sm text-text-tertiary">• Daily challenges</div>
            </div>
          </div>
        </Link>

        <Link href="/games/saregamapa">
          <div className="border border-border-primary rounded-lg p-6 hover:border-border-secondary transition-colors cursor-pointer h-full">
            <h2 className="text-2xl font-semibold mb-2">Saregamapa</h2>
            <p className="text-text-secondary mb-4">Song Guessing Game</p>
            <div className="space-y-2">
              <div className="text-sm text-text-tertiary">• Guess from audio clips</div>
              <div className="text-sm text-text-tertiary">• Unlock more seconds</div>
              <div className="text-sm text-text-tertiary">• Telugu movie songs</div>
            </div>
          </div>
        </Link>

        <Link href="/fandom">
          <div className="border border-border-primary rounded-lg p-6 hover:border-border-secondary transition-colors cursor-pointer h-full">
            <h2 className="text-2xl font-semibold mb-2">Fandom</h2>
            <p className="text-text-secondary mb-4">Explore Telugu cinema</p>
            <div className="space-y-2">
              <div className="text-sm text-text-tertiary">• Browse movies</div>
              <div className="text-sm text-text-tertiary">• Detailed information</div>
              <div className="text-sm text-text-tertiary">• Ratings and reviews</div>
            </div>
          </div>
        </Link>

        <Link href="/store">
          <div className="border border-border-primary rounded-lg p-6 hover:border-border-secondary transition-colors cursor-pointer h-full">
            <h2 className="text-2xl font-semibold mb-2">Store</h2>
            <p className="text-text-secondary mb-4">Movie merchandise</p>
            <div className="space-y-2">
              <div className="text-sm text-text-tertiary">• Posters</div>
              <div className="text-sm text-text-tertiary">• Apparel</div>
              <div className="text-sm text-text-tertiary">• Collectibles</div>
            </div>
          </div>
        </Link>

        <Link href="/recommendations">
          <div className="border border-border-primary rounded-lg p-6 hover:border-border-secondary transition-colors cursor-pointer h-full">
            <h2 className="text-2xl font-semibold mb-2">Recommendations</h2>
            <p className="text-text-secondary mb-4">Daily movie picks</p>
            <div className="space-y-2">
              <div className="text-sm text-text-tertiary">• Curated selections</div>
              <div className="text-sm text-text-tertiary">• Expert recommendations</div>
              <div className="text-sm text-text-tertiary">• Watch history</div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
