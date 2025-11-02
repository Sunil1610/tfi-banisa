'use client';

import React, { useState, useEffect } from 'react';
import { HelpCircle, Clock, Star, Trophy, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';
import { Autocomplete } from '@/components/ui/autocomplete';

interface Clues {
  year: string;
  actors: string;
  director: string;
  description: string;
}

const KathaVintaava = () => {
  const [movieTitle, setMovieTitle] = useState('');
  const [clues, setClues] = useState<Clues | null>(null);
  const [guess, setGuess] = useState<string[]>([]);
  const [guessesLeft, setGuessesLeft] = useState(6);
  const [revealedClues, setRevealedClues] = useState<string[]>([]);
  const [flippedTiles, setFlippedTiles] = useState<boolean[]>([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [movieOptions, setMovieOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);

  useEffect(() => {
    loadNewGame();
  }, []);

  const loadNewGame = async () => {
    setIsLoading(true);
    try {
      const [movieRes, moviesRes] = await Promise.all([
        fetch('/api/movie'),
        fetch('/api/movies')
      ]);

      const movieData = await movieRes.json();
      const moviesData = await moviesRes.json();

      setMovieTitle(movieData.title);
      setClues(movieData.clues);
      const initialClues = [`Description: ${movieData.clues.description}`];
      setRevealedClues(initialClues);
      setFlippedTiles([true, false, false, false]);
      setMovieOptions(moviesData);
    } catch (error) {
      console.error('Error loading game:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuess = () => {
    const selectedGuess = guess[0];
    if (selectedGuess && selectedGuess.toLowerCase() === movieTitle.toLowerCase()) {
      const currentScore = guessesLeft * 10 + (4 - revealedClues.length) * 5;
      setScore(score + currentScore);
      setMessage(`🎉 Correct! The movie is "${movieTitle}". You earned ${currentScore} points!`);
      setGameOver(true);
    } else {
      setGuessesLeft(guessesLeft - 1);
      if (guessesLeft - 1 === 0) {
        setMessage(`😔 You ran out of guesses! The movie was "${movieTitle}".`);
        setGameOver(true);
      } else {
        setMessage('❌ Incorrect. Try again!');
        revealClue();
      }
    }
    setGuess([]);
  };

  const revealClue = () => {
    if (!clues) return;

    const clueOrder: (keyof Clues)[] = ['year', 'actors', 'director'];
    const nextClueIndex = revealedClues.length;

    if (nextClueIndex <= clueOrder.length) {
      const clueKey = clueOrder[nextClueIndex - 1];
      const newClue = `${clueKey.charAt(0).toUpperCase() + clueKey.slice(1)}: ${clues[clueKey]}`;
      setRevealedClues([...revealedClues, newClue]);
      const newFlipped = [...flippedTiles];
      newFlipped[nextClueIndex] = true;
      setFlippedTiles(newFlipped);
    }
  };

  const restartGame = () => {
    setGuessesLeft(6);
    setMessage('');
    setGameOver(false);
    setGuess([]);
    setRevealedClues([]);
    setFlippedTiles([]);
    loadNewGame();
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <HelpCircle size={40} className="mx-auto text-primary mb-3 animate-pulse" />
        <p className="text-muted-foreground">Loading new movie challenge...</p>
      </div>
    );
  }

  if (!clues) {
    return <div className="text-center py-12 text-muted-foreground">Failed to load game. Please try again.</div>;
  }

  const clueData = [
    revealedClues[0],
    revealedClues.length > 1 ? revealedClues[1] : 'Year',
    revealedClues.length > 2 ? revealedClues[2] : 'Actors',
    revealedClues.length > 3 ? revealedClues[3] : 'Director',
  ];

  const progressPercentage = ((6 - guessesLeft) / 6) * 100;

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
        🎬 Guess the Telugu movie based on the clues below
      </p>

      {/* Clue Tiles */}
      <div className="grid grid-cols-2 gap-4">
        {clueData.map((clue, idx) => (
          <Card
            key={idx}
            className={`transition-all duration-300 ${flippedTiles[idx] ? 'border-primary' : 'border-muted'} slide-in`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <CardContent className="p-6 text-center min-h-[100px] flex items-center justify-center">
              {flippedTiles[idx] ? (
                <p className="text-sm font-medium">{clue}</p>
              ) : (
                <HelpCircle size={32} className="text-muted-foreground" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Message Alert */}
      {message && (
        <Card className={`border-2 ${gameOver && message.includes('🎉') ? 'border-green-500 bg-green-50 dark:bg-green-950' : 'border-red-500 bg-red-50 dark:bg-red-950'}`}>
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
              id="movie-typeahead"
              options={movieOptions}
              onChange={(selected) => setGuess(selected)}
              selected={guess}
              placeholder="Start typing a movie name..."
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
          {message.includes('🎉') && (
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

export default KathaVintaava;
