import { NextResponse } from 'next/server';
import { songs } from '@/lib/songs';

export async function GET() {
  const song = songs[Math.floor(Math.random() * songs.length)];
  return NextResponse.json(song);
}
