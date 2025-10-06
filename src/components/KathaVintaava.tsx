'use client';

import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Badge, ProgressBar } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Question, Clock, Star, Trophy, ArrowClockwise } from 'react-bootstrap-icons';

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
      <div className="text-center py-5">
        <div className="loading mb-3">
          <Question size={40} className="text-primary" />
        </div>
        <p className="text-muted">Loading new movie challenge...</p>
      </div>
    );
  }

  if (!clues) {
    return <div className="text-center py-5 text-muted">Failed to load game. Please try again.</div>;
  }

  const clueData = [
    revealedClues[0],
    revealedClues.length > 1 ? revealedClues[1] : 'Year',
    revealedClues.length > 2 ? revealedClues[2] : 'Actors',
    revealedClues.length > 3 ? revealedClues[3] : 'Director',
  ];

  const progressPercentage = ((6 - guessesLeft) / 6) * 100;

  return (
    <div className="slide-in">
      {/* Game Stats */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded" 
           style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="d-flex align-items-center">
          <Clock className="me-2 text-primary" size={20} />
          <span className="fw-semibold">Guesses Left: </span>
          <Badge bg="primary" className="ms-2">{guessesLeft}</Badge>
        </div>
        <div className="d-flex align-items-center">
          <Star className="me-2 text-warning" size={20} />
          <span className="fw-semibold">Score: </span>
          <Badge bg="warning" text="dark" className="ms-2">{score}</Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="small text-muted">Game Progress</span>
          <span className="small text-muted">{Math.round(progressPercentage)}%</span>
        </div>
        <ProgressBar 
          now={progressPercentage} 
          className="mb-2"
          style={{ height: '6px' }}
        />
      </div>

      <p className="text-center text-muted mb-4">
        🎬 Guess the Telugu movie based on the clues below
      </p>

      {/* Clue Tiles */}
      <div className="tile-container">
        {clueData.map((clue, idx) => (
          <div key={idx} className={`tile ${flippedTiles[idx] ? 'flipped' : ''} slide-in`}
               style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className="tile-face tile-front">
              <Question size={32} />
            </div>
            <div className="tile-face tile-back">
              <div className="text-center">
                {clue}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Alert */}
      {message && (
        <Alert 
          variant={gameOver && message.includes('🎉') ? 'success' : 'danger'}
          className="text-center fw-semibold"
        >
          {message}
        </Alert>
      )}

      {/* Game Form */}
      {!gameOver && (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleGuess();
          }}
          className="slide-in"
        >
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold mb-3">Your Guess:</Form.Label>
            <Typeahead
              id="movie-typeahead"
              options={movieOptions}
              onChange={(selected) => setGuess(selected as string[])}
              selected={guess}
              placeholder="Start typing a movie name..."
              size="lg"
              className="typeahead-input"
              disabled={gameOver}
            />
          </Form.Group>
          <div className="d-grid">
            <Button 
              variant="primary" 
              type="submit" 
              size="lg"
              disabled={guess.length === 0}
              className="py-3 fw-bold"
            >
              🎯 Submit Guess
            </Button>
          </div>
        </Form>
      )}

      {/* Game Over Actions */}
      {gameOver && (
        <div className="text-center slide-in">
          <div className="d-grid gap-2">
            <Button 
              variant="secondary" 
              onClick={restartGame} 
              size="lg"
              className="py-3 fw-bold"
            >
              <ArrowClockwise className="me-2" size={20} />
              Play Again
            </Button>
            {message.includes('🎉') && (
              <div className="mt-3 p-3 rounded" style={{ background: 'var(--card-bg)' }}>
                <Trophy className="text-warning me-2" size={24} />
                <span className="fw-bold">Great job! Share your score with friends!</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KathaVintaava;
