'use client'

import React, { useState, useEffect, useRef } from 'react'
import type { Movie } from '@/types/movie'
import { Button } from '@/components/ui'

interface GuessInputProps {
  onGuess: (guess: string) => void
  disabled: boolean
  movies: Movie[]
}

export const GuessInput: React.FC<GuessInputProps> = ({
  onGuess,
  disabled,
  movies,
}) => {
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<Movie[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (input.length >= 2) {
      const filtered = movies
        .filter(
          (movie) =>
            movie.title.toLowerCase().includes(input.toLowerCase()) ||
            movie.titleTelugu.includes(input) ||
            movie.alternativeTitles.some((alt) =>
              alt.toLowerCase().includes(input.toLowerCase())
            )
        )
        .slice(0, 5)

      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [input, movies])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onGuess(input.trim())
      setInput('')
      setSuggestions([])
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handleSelectSuggestion = (movie: Movie) => {
    setInput(movie.title)
    setShowSuggestions(false)
    onGuess(movie.title)
    setInput('')
    setSelectedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case 'Enter':
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          e.preventDefault()
          handleSelectSuggestion(suggestions[selectedIndex])
        }
        break
      case 'Escape':
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => input.length >= 2 && setShowSuggestions(true)}
            placeholder="Type a movie name..."
            disabled={disabled}
            className="w-full px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-primary transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            autoComplete="off"
          />

          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-2 bg-bg-secondary border border-border-primary rounded-lg shadow-2xl max-h-64 overflow-y-auto z-50"
            >
              {suggestions.map((movie, index) => (
                <button
                  key={movie.id}
                  type="button"
                  onClick={() => handleSelectSuggestion(movie)}
                  className={`w-full text-left px-4 py-3 hover:bg-bg-tertiary transition-colors border-b border-border-primary last:border-b-0 ${
                    index === selectedIndex ? 'bg-bg-tertiary' : ''
                  }`}
                >
                  <div className="font-medium text-text-primary">
                    {movie.title}
                  </div>
                  <div className="text-sm text-text-tertiary mt-0.5">
                    {movie.year} • {movie.leadActor}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          variant="primary"
          className="px-8"
        >
          Guess
        </Button>
      </div>

      <p className="text-xs text-text-muted mt-2">
        Start typing to see suggestions. Use arrow keys to navigate.
      </p>
    </form>
  )
}
