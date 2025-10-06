import { NextResponse } from 'next/server';
import { songs } from '@/lib/songs';

export async function GET() {
  const titles = songs.map(song => song.title);
  return NextResponse.json(titles);
}
