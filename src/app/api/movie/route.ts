import { NextResponse } from 'next/server';
import { movies } from '@/lib/movies';

export async function GET() {
  const movie = movies[Math.floor(Math.random() * movies.length)];

  const { title, ...clues } = movie;

  // In a real app, you'd want to encrypt or otherwise obscure the title
  const response = {
    clues,
    title, // Sending title for now for easier debugging
  };

  return NextResponse.json(response);
}