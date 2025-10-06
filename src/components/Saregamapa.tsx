'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Clock, Star, Trophy, RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Autocomplete } from '@/components/ui/autocomplete';

interface Song {
  title: string;
  movie?: string;
  singer?: string;
  musicDirector?: string;
  url: string;
}

const Saregamapa = () => {
  const [song, setSong] = useState<Song>({ title: '', url: '' });
  const [guess, setGuess] = useState<string[]>([]);
  const [guessesLeft, setGuessesLeft] = useState(5);
  const [revealedClues, setRevealedClues] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [clipDuration, setClipDuration] = useState(5);
  const [songOptions, setSongOptions] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadNewGame();
  }, []);

  const loadNewGame = async () => {
    setIsLoading(true);
    try {
      const [songRes, songsRes] = await Promise.all([
        fetch('/api/song'),
        fetch('/api/songs')
      ]);

      const songData = await songRes.json();
      const songsData = await songsRes.json();

      setSong(songData);
      setSongOptions(songsData);
    } catch (error) {
      console.error('Error loading game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playSongClip = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        return;
      }

      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((prev) => prev + 100 / clipDuration);
      }, 1000);
      progressIntervalRef.current = interval;

      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
          clearInterval(interval);
          setProgress(100);
        }
      }, clipDuration * 1000);
    }
  };

  const revealClue = () => {
    const clueOrder: (keyof Song)[] = ['movie', 'singer', 'musicDirector'];
    const nextClueIndex = revealedClues.length;

    if (nextClueIndex < clueOrder.length) {
      const clueKey = clueOrder[nextClueIndex];
      const clueValue = song[clueKey];
      if (clueValue) {
        const clueLabel = clueKey === 'musicDirector' ? 'Music Director' : clueKey.charAt(0).toUpperCase() + clueKey.slice(1);
        const newClue = `${clueLabel}: ${clueValue}`;
        setRevealedClues([...revealedClues, newClue]);
      }
    }
  };

  const handleGuess = () => {
    const selectedGuess = guess[0];
    if (selectedGuess && selectedGuess.toLowerCase() === song.title.toLowerCase()) {
      const currentScore = guessesLeft * 15 + Math.max(0, 30 - clipDuration);
      setScore(score + currentScore);
      setMessage(`🎵 Correct! The song is "${song.title}". You earned ${currentScore} points!`);
      setGameOver(true);
    } else {
      setGuessesLeft(guessesLeft - 1);
      if (guessesLeft - 1 === 0) {
        setMessage(`😔 You ran out of guesses! The song was "${song.title}".`);
        setGameOver(true);
      } else {
        setMessage('❌ Incorrect. Try again!');
        setClipDuration(clipDuration + 5);
        revealClue();
      }
    }
    setGuess([]);
  };

  const restartGame = () => {
    setGuessesLeft(5);
    setMessage('');
    setGameOver(false);
    setGuess([]);
    setClipDuration(5);
    setProgress(0);
    setIsPlaying(false);
    setRevealedClues([]);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    loadNewGame();
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Music size={40} className="mx-auto text-primary mb-3 animate-pulse" />
        <p className="text-muted-foreground">Loading new song challenge...</p>
      </div>
    );
  }

  if (!song.url) {
    return <div className="text-center py-12 text-muted-foreground">Failed to load game. Please try again.</div>;
  }

  const progressPercentage = ((5 - guessesLeft) / 5) * 100;

  return (
    <div className="slide-in space-y-6">
      {/* Game Stats */}
      <Card>
        <CardContent className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="text-primary" size={20} />
            <span className="font-semibold">Guesses Left:</span>
            <Badge variant="default">{guessesLeft}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Star className="text-yellow-500" size={20} />
            <span className="font-semibold">Score:</span>
            <Badge variant="secondary">{score}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Game Progress</span>
          <span className="text-muted-foreground">{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <p className="text-center text-muted-foreground">
        🎵 Listen to the audio clip and guess the Telugu song
      </p>

      {/* Audio Player */}
      <Card className="border-2 border-primary">
        <CardContent className="p-6 text-center space-y-4">
          <audio ref={audioRef} src={song.url} />
          <Button
            onClick={playSongClip}
            variant="default"
            size="lg"
            className="rounded-full w-20 h-20"
          >
            {isPlaying ? <Pause size={40} /> : <Play size={40} />}
          </Button>
          <div className="flex items-center justify-center gap-2">
            <Volume2 className="text-primary" size={20} />
            <span className="font-semibold">Audio Duration: {clipDuration}s</span>
          </div>
          <Progress
            value={progress}
            className={`h-2 ${isPlaying ? 'animate-pulse' : ''}`}
          />
        </CardContent>
      </Card>

      {/* Revealed Clues */}
      {revealedClues.length > 0 && (
        <div className="space-y-3">
          <h6 className="text-center font-semibold">🔍 Clues Revealed</h6>
          <div className="flex flex-wrap gap-2 justify-center">
            {revealedClues.map((clue, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="px-3 py-1 text-sm slide-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {clue}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Message Alert */}
      {message && (
        <Card className={`border-2 ${gameOver && message.includes('🎵') ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'}`}>
          <CardContent className="p-4 text-center font-semibold">
            {message}
          </CardContent>
        </Card>
      )}

      {/* Game Form */}
      {!gameOver && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGuess();
          }}
          className="space-y-4 slide-in"
        >
          <div className="space-y-3">
            <Label className="text-base font-semibold">Your Guess:</Label>
            <Autocomplete
              id="song-typeahead"
              options={songOptions}
              onChange={(selected) => setGuess(selected)}
              selected={guess}
              placeholder="Start typing a song name..."
              disabled={gameOver}
            />
          </div>
          <Button
            type="submit"
            disabled={guess.length === 0}
            className="w-full h-12 text-base font-bold"
            size="lg"
          >
            🎯 Submit Guess
          </Button>
        </form>
      )}

      {/* Game Over Actions */}
      {gameOver && (
        <div className="text-center space-y-4 slide-in">
          <Button
            variant="secondary"
            onClick={restartGame}
            size="lg"
            className="w-full h-12 text-base font-bold"
          >
            <RotateCcw className="mr-2" size={20} />
            Play Again
          </Button>
          {message.includes('🎵') && (
            <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
              <CardContent className="p-4 flex items-center justify-center gap-2">
                <Trophy className="text-yellow-500" size={24} />
                <span className="font-bold">Great job! Share your score with friends!</span>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default Saregamapa;
