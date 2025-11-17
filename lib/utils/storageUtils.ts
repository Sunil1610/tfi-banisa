/**
 * Type-safe local storage utilities
 */

export const storage = {
  /**
   * Get an item from local storage
   */
  get<T>(key: string, defaultValue?: T): T | null {
    if (typeof window === 'undefined') {
      return defaultValue || null
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return defaultValue || null
    }
  },

  /**
   * Set an item in local storage
   */
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
    }
  },

  /**
   * Remove an item from local storage
   */
  remove(key: string): void {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  },

  /**
   * Clear all items from local storage
   */
  clear(): void {
    if (typeof window === 'undefined') {
      return
    }

    try {
      window.localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },

  /**
   * Check if a key exists in local storage
   */
  has(key: string): boolean {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem(key) !== null
  },

  /**
   * Get all keys from local storage
   */
  keys(): string[] {
    if (typeof window === 'undefined') {
      return []
    }

    return Object.keys(window.localStorage)
  },
}

/**
 * Hook-like function to sync state with local storage
 */
export function createStorageManager<T>(key: string, defaultValue: T) {
  return {
    get: () => storage.get<T>(key, defaultValue),
    set: (value: T) => storage.set(key, value),
    remove: () => storage.remove(key),
    subscribe: (callback: (value: T) => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key && e.newValue) {
          try {
            callback(JSON.parse(e.newValue))
          } catch (error) {
            console.error('Error parsing storage event:', error)
          }
        }
      }

      window.addEventListener('storage', handler)
      return () => window.removeEventListener('storage', handler)
    },
  }
}
