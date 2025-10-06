'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Alert, ProgressBar, Badge } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import { PlayFill, PauseFill, MusicNote, Clock, Star, Trophy, ArrowClockwise, VolumeUp } from 'react-bootstrap-icons';

const Saregamapa = () => {
  const [song, setSong] = useState({ title: '', url: '' });
  const [guess, setGuess] = useState<string[]>([]);
  const [guessesLeft, setGuessesLeft] = useState(5);
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
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    loadNewGame();
  };

  if (!song.url) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="mt-4">
        <p className="text-center text-muted">
          Guess the song from the audio clip. You have {guessesLeft} guesses.
        </p>

        <div className="text-center mb-4 p-4 border rounded">
          <audio ref={audioRef} src={song.url} />
          <Button onClick={playSongClip} variant="primary" size="lg" className="rounded-circle" style={{width: '80px', height: '80px'}}>
            {isPlaying ? <PauseFill size={40} /> : <PlayFill size={40} />}
          </Button>
          <p className="mt-3 mb-0">Play Song Clip ({clipDuration}s)</p>
          <ProgressBar now={progress} className="mt-2" />
        </div>

        {message && <Alert variant={gameOver && message.includes('Correct') ? 'success' : 'danger'}>{message}</Alert>}

        {!gameOver && (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleGuess();
            }}
          >
            <Form.Group className="mb-3">
              <Typeahead
                id="song-typeahead"
                options={songOptions}
                onChange={setGuess}
                selected={guess}
                placeholder="Choose a song..."
                size="lg"
                className="typeahead-input"
              />
            </Form.Group>
            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Guess
              </Button>
            </div>
          </Form>
        )}

        {gameOver && (
          <div className="d-grid">
            <Button variant="secondary" onClick={restartGame} size="lg">
              Play Again
            </Button>
          </div>
        )}
    </div>
  );
};

export default Saregamapa;