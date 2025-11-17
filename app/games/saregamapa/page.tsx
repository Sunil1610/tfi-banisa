import { Suspense } from 'react'
import { prisma } from '@/lib/db/prisma'
import { SongGameBoard } from '@/components/games/Saregamapa'
import { Spinner } from '@/components/ui'

async function getSongs() {
  const songs = await prisma.song.findMany({
    orderBy: {
      popularity: 'desc',
    },
  })
  return songs
}

export const metadata = {
  title: 'Saregamapa - Song Guessing Game | Telugu Cinema Hub',
  description:
    'Test your Telugu cinema music knowledge! Guess the song from progressive audio clips in this fun daily challenge.',
}

export default async function SaregamapaPage() {
  const songs = await getSongs()

  return (
    <div className="max-w-7xl mx-auto py-8">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[400px]">
            <Spinner size="lg" />
          </div>
        }
      >
        <SongGameBoard mode="practice" allSongs={songs} />
      </Suspense>
    </div>
  )
}
