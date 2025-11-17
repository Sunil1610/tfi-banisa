import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db/prisma'
import { Badge, Button, Spinner } from '@/components/ui'

async function getMovie(id: string) {
  const movie = await prisma.movie.findUnique({
    where: { id },
  })

  if (!movie) {
    return null
  }

  return movie
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const movie = await getMovie(params.id)

  if (!movie) {
    return {
      title: 'Movie Not Found | Telugu Cinema Hub',
    }
  }

  return {
    title: `${movie.title} (${movie.year}) | Telugu Cinema Hub`,
    description: movie.description || movie.plotHint,
  }
}

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const movie = await getMovie(params.id)

  if (!movie) {
    notFound()
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Spinner size="lg" />
          </div>
        }
      >
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <Link
                href="/fandom"
                className="text-text-tertiary hover:text-text-primary transition-colors"
              >
                Fandom
              </Link>
            </li>
            <li className="text-text-tertiary">/</li>
            <li className="text-text-primary font-medium">{movie.title}</li>
          </ol>
        </nav>

        {/* Movie Detail */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-bg-tertiary border border-border-primary">
                {movie.posterUrl ? (
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                    <svg
                      className="w-24 h-24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                      />
                    </svg>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-bg-primary/90 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-lg font-semibold text-text-primary">
                      {movie.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trailer Button */}
              {movie.trailerUrl && (
                <div className="mt-4">
                  <a
                    href={movie.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="primary" size="md" className="w-full">
                      Watch Trailer
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                      </svg>
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-text-primary mb-2">
                {movie.title}
              </h1>
              <p className="text-2xl text-text-secondary mb-4">
                {movie.titleTelugu}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-text-secondary">{movie.year}</span>
                {movie.imdbRating && (
                  <>
                    <span className="text-text-tertiary">•</span>
                    <div className="flex items-center gap-1">
                      <span className="text-text-secondary">IMDb:</span>
                      <span className="text-text-primary font-semibold">
                        {movie.imdbRating.toFixed(1)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2">
                {movie.genre.map((genre) => (
                  <Badge key={genre} variant="primary" size="md">
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-bg-secondary border border-border-primary rounded-xl p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-3">
                Synopsis
              </h2>
              <p className="text-text-secondary leading-relaxed">
                {movie.description || movie.plotHint}
              </p>
            </div>

            {/* Cast & Crew */}
            <div className="bg-bg-secondary border border-border-primary rounded-xl p-6">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Cast & Crew
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-text-tertiary min-w-[120px]">
                    Director:
                  </span>
                  <span className="text-text-primary font-medium">
                    {movie.director}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-text-tertiary min-w-[120px]">
                    Lead Actor:
                  </span>
                  <span className="text-text-primary font-medium">
                    {movie.leadActor}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-text-tertiary min-w-[120px]">
                    Lead Actress:
                  </span>
                  <span className="text-text-primary font-medium">
                    {movie.leadActress}
                  </span>
                </div>
              </div>
            </div>

            {/* Trivia */}
            {movie.trivia && movie.trivia.length > 0 && (
              <div className="bg-bg-secondary border border-border-primary rounded-xl p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Trivia
                </h2>
                <ul className="space-y-2">
                  {movie.trivia.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-text-secondary"
                    >
                      <span className="text-accent-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {movie.tags && movie.tags.length > 0 && (
              <div className="bg-bg-secondary border border-border-primary rounded-xl p-6">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {movie.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" size="sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Fandom */}
        <div className="mt-12">
          <Link href="/fandom">
            <Button variant="secondary" size="md">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Fandom
            </Button>
          </Link>
        </div>
      </Suspense>
    </div>
  )
}
