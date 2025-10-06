import { NextResponse } from 'next/server';
import { movies } from '@/lib/movies';

export async function GET() {
  const titles = movies.map(movie => movie.title);
  return NextResponse.json(titles);
}
