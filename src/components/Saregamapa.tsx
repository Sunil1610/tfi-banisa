'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Alert, ProgressBar, Badge } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { PlayFill, PauseFill, MusicNote, Clock, Star, Trophy, ArrowClockwise, VolumeUp } from 'react-bootstrap-icons';

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
      <div className="text-center py-5">
        <div className="loading mb-3">
          <MusicNote size={40} className="text-primary" />
        </div>
        <p className="text-muted">Loading new song challenge...</p>
      </div>
    );
  }

  if (!song.url) {
    return <div className="text-center py-5 text-muted">Failed to load game. Please try again.</div>;
  }

  const progressPercentage = ((5 - guessesLeft) / 5) * 100;

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
        🎵 Listen to the audio clip and guess the Telugu song
      </p>

      {/* Audio Player */}
      <div className="text-center mb-4 p-4 rounded" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <audio ref={audioRef} src={song.url} />
        <Button
          onClick={playSongClip}
          variant="primary"
          size="lg"
          className="rounded-circle mb-3"
          style={{width: '80px', height: '80px'}}
        >
          {isPlaying ? <PauseFill size={40} /> : <PlayFill size={40} />}
        </Button>
        <div className="d-flex align-items-center justify-content-center mb-2">
          <VolumeUp className="me-2 text-primary" size={20} />
          <span className="fw-semibold">Audio Duration: {clipDuration}s</span>
        </div>
        <ProgressBar
          now={progress}
          className="mt-2"
          animated={isPlaying}
          variant="info"
        />
      </div>

      {/* Revealed Clues */}
      {revealedClues.length > 0 && (
        <div className="mb-4">
          <h6 className="text-center mb-3">🔍 Clues Revealed</h6>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            {revealedClues.map((clue, idx) => (
              <Badge
                key={idx}
                bg="info"
                className="p-2 slide-in"
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
        <Alert
          variant={gameOver && message.includes('🎵') ? 'success' : 'danger'}
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
              id="song-typeahead"
              options={songOptions}
              onChange={(selected) => setGuess(selected as string[])}
              selected={guess}
              placeholder="Start typing a song name..."
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
            {message.includes('🎵') && (
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

export default Saregamapa;