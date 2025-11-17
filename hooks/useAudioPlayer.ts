'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Howl } from 'howler'

interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  loading: boolean
  error: string | null
}

interface AudioPlayerControls {
  play: () => void
  pause: () => void
  stop: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  load: (url: string) => void
}

export function useAudioPlayer(
  initialUrl?: string
): [AudioPlayerState, AudioPlayerControls] {
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    loading: false,
    error: null,
  })

  const howlRef = useRef<Howl | null>(null)
  const animationFrameRef = useRef<number>()

  // Update current time while playing
  const updateTime = useCallback(() => {
    if (howlRef.current && state.isPlaying) {
      setState((prev) => ({
        ...prev,
        currentTime: howlRef.current?.seek() as number || 0,
      }))
      animationFrameRef.current = requestAnimationFrame(updateTime)
    }
  }, [state.isPlaying])

  useEffect(() => {
    if (state.isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateTime)
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [state.isPlaying, updateTime])

  // Load initial URL
  useEffect(() => {
    if (initialUrl) {
      load(initialUrl)
    }

    return () => {
      if (howlRef.current) {
        howlRef.current.unload()
      }
    }
  }, [])

  const load = useCallback((url: string) => {
    // Unload previous audio
    if (howlRef.current) {
      howlRef.current.unload()
    }

    setState((prev) => ({ ...prev, loading: true, error: null }))

    const howl = new Howl({
      src: [url],
      html5: true,
      preload: true,
      onload: () => {
        setState((prev) => ({
          ...prev,
          loading: false,
          duration: howl.duration(),
        }))
      },
      onloaderror: (_id, error) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error?.toString() || 'Failed to load audio',
        }))
      },
      onplay: () => {
        setState((prev) => ({ ...prev, isPlaying: true }))
      },
      onpause: () => {
        setState((prev) => ({ ...prev, isPlaying: false }))
      },
      onstop: () => {
        setState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }))
      },
      onend: () => {
        setState((prev) => ({ ...prev, isPlaying: false }))
      },
    })

    howlRef.current = howl
  }, [])

  const play = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.play()
    }
  }, [])

  const pause = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.pause()
    }
  }, [])

  const stop = useCallback(() => {
    if (howlRef.current) {
      howlRef.current.stop()
    }
  }, [])

  const seek = useCallback((time: number) => {
    if (howlRef.current) {
      howlRef.current.seek(time)
      setState((prev) => ({ ...prev, currentTime: time }))
    }
  }, [])

  const setVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume))
    if (howlRef.current) {
      howlRef.current.volume(clampedVolume)
    }
    setState((prev) => ({ ...prev, volume: clampedVolume }))
  }, [])

  return [
    state,
    {
      play,
      pause,
      stop,
      seek,
      setVolume,
      load,
    },
  ]
}
