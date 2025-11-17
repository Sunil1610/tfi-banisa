import { Suspense } from 'react'
import { prisma } from '@/lib/db/prisma'
import { GameBoard } from '@/components/games/KathaVintaava'
import { Spinner } from '@/components/ui'

async function getMovies() {
  const movies = await prisma.movie.findMany({
    orderBy: {
      popularity: 'desc',
    },
  })
  return movies
}

export const metadata = {
  title: 'Katha Vintaava - Movie Guessing Game | Telugu Cinema Hub',
  description:
    'Test your Telugu cinema knowledge! Guess the movie from progressive clues in this fun daily challenge.',
}

export default async function KathaVintaavaPage() {
  const movies = await getMovies()

  return (
    <div className="max-w-7xl mx-auto py-8">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Spinner size="lg" />
          </div>
        }
      >
        <GameBoard mode="practice" allMovies={movies} />
      </Suspense>
    </div>
  )
}
